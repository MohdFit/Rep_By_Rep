const express = require('express');
const router = express.Router();
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');
const {
  getAllPlans,
  getPlanById,
  getPlansByLevel,
  createPlan,
  updatePlan,
  deletePlan,
  togglePlanStatus,
} = require('../controllers/plans/planController');

// Public routes
router.get('/plans', getAllPlans);
router.get('/plans/:id', getPlanById);
router.get('/plans/level/:level', getPlansByLevel);

// Admin routes
router.post('/plans', authMiddleware, requireRole(['admin']), createPlan);
router.put('/plans/:id', authMiddleware, requireRole(['admin']), updatePlan);
router.delete('/plans/:id', authMiddleware, requireRole(['admin']), deletePlan);
router.patch('/plans/:id/toggle', authMiddleware, requireRole(['admin']), togglePlanStatus);

module.exports = router;