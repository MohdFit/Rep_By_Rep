const Order = require('../../models/order');
const OrderItem = require('../../models/orderItem');
const User = require('../../models/user');
const TShirt = require('../../models/merch');
const Plan = require('../../models/plan');
const mongoose = require('mongoose');

const statsController = {
  // GET DASHBOARD STATS
  getDashboardStats: async (req, res) => {
    try {
      // Total Orders
      const totalOrders = await Order.countDocuments();
      
      // Total Revenue (excluding cancelled orders)
      const revenueResult = await Order.aggregate([
        { $match: { status: { $ne: 'Cancelled' } } },
        { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
      ]);
      const totalRevenue = revenueResult[0]?.totalRevenue || 0;

      // New Users this week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const newUsersThisWeek = await User.countDocuments({
        createdAt: { $gte: oneWeekAgo }
      });

      // Best Selling Product (most ordered)
      const bestSellingProduct = await OrderItem.aggregate([
        {
          $lookup: {
            from: 'orders',
            localField: '_id',
            foreignField: 'orderItems',
            as: 'order'
          }
        },
        { $unwind: '$order' },
        { $match: { 'order.status': { $ne: 'Cancelled' } } },
        {
          $group: {
            _id: '$productId',
            productType: { $first: '$productType' },
            totalSold: { $sum: '$quantity' }
          }
        },
        { $sort: { totalSold: -1 } },
        { $limit: 1 }
      ]);

      let bestSellingName = 'N/A';
      if (bestSellingProduct.length > 0) {
        const productId = bestSellingProduct[0]._id;
        const productType = bestSellingProduct[0].productType;
        
        if (productType === 'TShirt') {
          const product = await TShirt.findById(productId);
          bestSellingName = product?.title || 'T-Shirt';
        } else if (productType === 'Plan') {
          const product = await Plan.findById(productId);
          bestSellingName = product?.title || 'Training Plan';
        }
      }

      // Order Status Breakdown
      const statusBreakdown = await Order.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);

      const statusData = {
        Pending: 0,
        Processing: 0,
        Shipping: 0,
        Delivered: 0,
        Cancelled: 0
      };

      statusBreakdown.forEach(item => {
        if (statusData.hasOwnProperty(item._id)) {
          statusData[item._id] = item.count;
        }
      });

      res.status(200).json({
        success: true,
        data: {
          totalOrders,
          totalRevenue: totalRevenue.toFixed(2),
          newUsersThisWeek,
          bestSellingProduct: bestSellingName,
          orderStatusBreakdown: statusData
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch dashboard stats',
        error: error.message
      });
    }
  },

  // GET SALES OVERVIEW (Monthly sales for chart)
  getSalesOverview: async (req, res) => {
    try {
      const { year } = req.query;
      const targetYear = year ? parseInt(year) : new Date().getFullYear();

      const monthlySales = await Order.aggregate([
        {
          $match: {
            status: { $ne: 'Cancelled' },
            createdAt: {
              $gte: new Date(`${targetYear}-01-01`),
              $lte: new Date(`${targetYear}-12-31`)
            }
          }
        },
        {
          $group: {
            _id: { $month: '$createdAt' },
            sales: { $sum: '$total' },
            orders: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);

      // Fill in missing months with 0
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const salesData = months.map((month, index) => {
        const monthData = monthlySales.find(item => item._id === index + 1);
        return {
          month,
          sales: monthData ? parseFloat(monthData.sales.toFixed(2)) : 0,
          orders: monthData ? monthData.orders : 0
        };
      });

      res.status(200).json({
        success: true,
        year: targetYear,
        data: salesData
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch sales overview',
        error: error.message
      });
    }
  },

  // GET PRODUCT STATS
  getProductStats: async (req, res) => {
    try {
      const totalTShirts = await TShirt.countDocuments();
      const activeTShirts = await TShirt.countDocuments({ isActive: true });
      const totalPlans = await Plan.countDocuments();
      const activePlans = await Plan.countDocuments({ isActive: true });

      // Top selling products
      const topProducts = await OrderItem.aggregate([
        {
          $lookup: {
            from: 'orders',
            localField: '_id',
            foreignField: 'orderItems',
            as: 'order'
          }
        },
        { $unwind: '$order' },
        { $match: { 'order.status': { $ne: 'Cancelled' } } },
        {
          $group: {
            _id: {
              productId: '$productId',
              productType: '$productType'
            },
            totalSold: { $sum: '$quantity' },
            revenue: { $sum: { $multiply: ['$unitPrice', '$quantity'] } }
          }
        },
        { $sort: { totalSold: -1 } },
        { $limit: 10 }
      ]);

      // Populate product details
      const topProductsWithDetails = await Promise.all(
        topProducts.map(async (item) => {
          let productDetails = null;
          if (item._id.productType === 'TShirt') {
            productDetails = await TShirt.findById(item._id.productId).select('title price image');
          } else if (item._id.productType === 'Plan') {
            productDetails = await Plan.findById(item._id.productId).select('title price level');
          }

          return {
            productId: item._id.productId,
            productType: item._id.productType,
            productName: productDetails?.title || 'Unknown',
            totalSold: item.totalSold,
            revenue: item.revenue.toFixed(2),
            ...(productDetails && { details: productDetails })
          };
        })
      );

      res.status(200).json({
        success: true,
        data: {
          totalTShirts,
          activeTShirts,
          totalPlans,
          activePlans,
          topProducts: topProductsWithDetails
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch product stats',
        error: error.message
      });
    }
  },

  // GET USER STATS
  getUserStats: async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const adminUsers = await User.countDocuments({ role: 'admin' });
      const regularUsers = totalUsers - adminUsers;

      // Users registered per month (last 6 months)
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const userGrowth = await User.aggregate([
        {
          $match: {
            createdAt: { $gte: sixMonthsAgo }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
      ]);

      res.status(200).json({
        success: true,
        data: {
          totalUsers,
          adminUsers,
          regularUsers,
          userGrowth
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user stats',
        error: error.message
      });
    }
  }
};

module.exports = statsController;
