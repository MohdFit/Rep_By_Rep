const Order = require('../../models/order')
const OrderItem = require('../../models/orderItem')
const mongoose = require('mongoose');
const User = require('../../models/user'); 


const orderController = {
     createOrder: async (req, res) => {
    const session = await mongoose.startSession();
    
    try {
      session.startTransaction();
      
      const { 
        userId, 
        items, 
        shippingInfo,
        shippingCost = 0
      } = req.body;

      // Validate required fields
      if (!userId || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'User ID and items are required'
        });
      }
      const user = await User.findById(userId);
      if (!user) {
      return res.status(404).json({ error: 'User not found' });
      }


       const hasTShirt = items.some(item => item.productType === 'TShirt');

       if (hasTShirt) {
        if (!shippingInfo || !shippingInfo.street || !shippingInfo.city || 
            !shippingInfo.state || !shippingInfo.zipCode) {
          return res.status(400).json({
            success: false,
            message: 'Shipping information is required for merchandise orders (street, city, state, zipCode)'
          });
        }
      }
    let totalAmount = 0;
      const createdOrderItems = [];
     for (const itemData of items) {
        const { productId, productType, quantity, unitPrice, selectedSize, selectedColor } = itemData;
         if (!productId || !productType || !quantity) {
          await session.abortTransaction();
          return res.status(400).json({
            success: false,
            message: 'Each item must have productId, productType, quantity, and unitPrice'
          });
        }

        const orderItem = new OrderItem({
          productType,
          productId,
          quantity,
          unitPrice,
          selectedSize: productType === 'TShirt' ? selectedSize : undefined,
          selectedColor: productType === 'TShirt' ? selectedColor : undefined
        });

        const savedOrderItem = await orderItem.save({ session });
        createdOrderItems.push(savedOrderItem._id);
        totalAmount += savedOrderItem.totalPrice;
      }

       if (hasTShirt) {
        totalAmount += shippingCost;
      }

       const year = new Date().getFullYear();
       const count = await Order.countDocuments();
       const orderNumber = `ORD-${year}-${String(count + 1).padStart(6, '0')}`;


       const order = new Order({
        userId,
        orderItems: createdOrderItems,
        orderNumber,
        shippingInfo: hasTShirt ? shippingInfo : undefined,
        shippingCost: hasTShirt ? shippingCost : 0,
        total: totalAmount
      });

      const savedOrder = await order.save({ session });
      await session.commitTransaction();

      
      const populatedOrder = await Order.findById(savedOrder._id)
        .populate({
          path: 'orderItems',
          populate: {
            path: 'productId'
          }
        })
        .populate('userId', 'name email');

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: populatedOrder
      });

    } catch (error) {
      await session.abortTransaction();
      console.error('Create order error:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: Object.values(error.errors).map(err => err.message)
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Failed to create order',
        error: error.message
      });
    } finally {
      session.endSession();
    }
  },
}


module.exports = orderController;

