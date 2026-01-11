const express = require('express');
const router = express.Router();
const {
  getAllPlans,
  getPlanById,
  getPlansByLevel,
  createPlan,
  updatePlan,
  deletePlan,
} = require('../controllers/plans/planController');


router.get('/plans', getAllPlans);


router.get('/plans/:id', getPlanById);

router.get('/plans/level/:level', getPlansByLevel);

router.post('/plans', createPlan);

router.put('/plans/:id', updatePlan);

router.delete('/plans/:id', deletePlan);

module.exports = router;