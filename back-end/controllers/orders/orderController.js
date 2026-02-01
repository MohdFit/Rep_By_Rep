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


      let totalAmount = 0;
      const createdOrderItems = [];
     for (const itemData of items) {
        const { productId, productType, quantity, unitPrice } = itemData;
        if (!productId || !productType || !quantity) {
          await session.abortTransaction();
          return res.status(400).json({
            success: false,
            message: 'Each item must have productId, productType, quantity, and unitPrice'
          });
        }

        if (productType !== 'Plan') {
          await session.abortTransaction();
          return res.status(400).json({
            success: false,
            message: 'Only training plans are supported'
          });
        }

        const orderItem = new OrderItem({
          productType,
          productId,
          quantity,
          unitPrice
        });

        const savedOrderItem = await orderItem.save({ session });
        createdOrderItems.push(savedOrderItem._id);
        totalAmount += savedOrderItem.totalPrice;
      }

      totalAmount += shippingCost;

       const year = new Date().getFullYear();
       const count = await Order.countDocuments();
       const orderNumber = `ORD-${year}-${String(count + 1).padStart(6, '0')}`;


       const order = new Order({
        userId,
        orderItems: createdOrderItems,
        orderNumber,
        shippingInfo: shippingInfo,
        shippingCost: shippingCost,
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

  // GET ALL ORDERS (Admin)
  getAllOrders: async (req, res) => {
    try {
      const { status, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
      
      const query = {};
      if (status) query.status = status;

      const orders = await Order.find(query)
        .populate('userId', 'name email')
        .populate({
          path: 'orderItems',
          populate: { path: 'productId' }
        })
        .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const count = await Order.countDocuments(query);

      res.status(200).json({
        success: true,
        data: orders,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalOrders: count
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: error.message
      });
    }
  },

  // GET USER ORDERS
  getUserOrders: async (req, res) => {
    try {
      const { userId } = req.params;
      
      const orders = await Order.find({ userId })
        .populate({
          path: 'orderItems',
          populate: { path: 'productId' }
        })
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: orders,
        count: orders.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user orders',
        error: error.message
      });
    }
  },

  // GET ORDER BY ID
  getOrderById: async (req, res) => {
    try {
      const { orderId } = req.params;
      
      const order = await Order.findById(orderId)
        .populate('userId', 'name email phone')
        .populate({
          path: 'orderItems',
          populate: { path: 'productId' }
        });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch order',
        error: error.message
      });
    }
  },

  // UPDATE ORDER STATUS (Admin)
  updateOrderStatus: async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const validStatuses = ['Pending', 'Processing', 'Shipping', 'Delivered', 'Cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
        });
      }

      const order = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true, runValidators: true }
      ).populate('userId', 'name email');

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Order status updated successfully',
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update order status',
        error: error.message
      });
    }
  },

  // DELETE ORDER (Admin)
  deleteOrder: async (req, res) => {
    const session = await mongoose.startSession();
    
    try {
      session.startTransaction();
      
      const { orderId } = req.params;
      
      const order = await Order.findById(orderId);
      if (!order) {
        await session.abortTransaction();
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      // Delete associated order items
      await OrderItem.deleteMany({ _id: { $in: order.orderItems } }, { session });
      
      // Delete the order
      await Order.findByIdAndDelete(orderId, { session });
      
      await session.commitTransaction();

      res.status(200).json({
        success: true,
        message: 'Order deleted successfully'
      });
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({
        success: false,
        message: 'Failed to delete order',
        error: error.message
      });
    } finally {
      session.endSession();
    }
  },

  // GET ORDER STATISTICS (Admin Dashboard)
  getOrderStats: async (req, res) => {
    try {
      const totalOrders = await Order.countDocuments();
      const pendingOrders = await Order.countDocuments({ status: 'Pending' });
      const processingOrders = await Order.countDocuments({ status: 'Processing' });
      const shippingOrders = await Order.countDocuments({ status: 'Shipping' });
      const deliveredOrders = await Order.countDocuments({ status: 'Delivered' });
      const cancelledOrders = await Order.countDocuments({ status: 'Cancelled' });

      // Calculate total revenue
      const revenueResult = await Order.aggregate([
        { $match: { status: { $ne: 'Cancelled' } } },
        { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
      ]);
      const totalRevenue = revenueResult[0]?.totalRevenue || 0;

      // Recent orders (last 5)
      const recentOrders = await Order.find()
        .populate('userId', 'name email')
        .populate({
          path: 'orderItems',
          populate: { path: 'productId' }
        })
        .sort({ createdAt: -1 })
        .limit(5);

      res.status(200).json({
        success: true,
        data: {
          totalOrders,
          pendingOrders,
          processingOrders,
          shippingOrders,
          deliveredOrders,
          cancelledOrders,
          totalRevenue: totalRevenue.toFixed(2),
          recentOrders,
          statusBreakdown: {
            Pending: pendingOrders,
            Processing: processingOrders,
            Shipping: shippingOrders,
            Delivered: deliveredOrders,
            Cancelled: cancelledOrders
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch order statistics',
        error: error.message
      });
    }
  }
}


module.exports = orderController;


