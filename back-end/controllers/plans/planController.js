const Plan = require('../../models/plan');


// GET ALL PLANS
const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching plans',
      error: error.message
    });
  }
};

// GET PLAN BY ID
const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findById(id);
    
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: plan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching plan',
      error: error.message
    });
  }
};

// GET PLANS BY LEVEL
const getPlansByLevel = async (req, res) => {
  try {
    const { level } = req.params;
    
    // Validate level parameter
    const validLevels = ['Beginner', 'Intermediate', 'Pro'];
    if (!validLevels.includes(level)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid level. Must be Beginner, Intermediate, or Pro'
      });
    }
    
    const plans = await Plan.findByLevel(level);
    
    res.status(200).json({
      success: true,
      count: plans.length,
      level: level,
      data: plans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching plans by level',
      error: error.message
    });
  }
};

// CREATE NEW PLAN
const createPlan = async (req, res) => {
  try {
    const { title, description, price, level, duration } = req.body;
    
    // Validate required fields
    if (!title || !description || !price || !level || !duration) {
      return res.status(400).json({
        success: false,
        message: 'All fields (title, description, price, level, duration) are required'
      });
    }
    
    const newPlan = new Plan({
      title,
      description,
      price,
      level,
      duration
    });
    
    const savedPlan = await newPlan.save();
    
    res.status(201).json({
      success: true,
      message: 'Plan created successfully',
      data: savedPlan
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating plan',
      error: error.message
    });
  }
};

// UPDATE PLAN
const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Remove fields that shouldn't be updated directly
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;
    
    const updatedPlan = await Plan.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true, // Return updated document
        runValidators: true // Run schema validations
      }
    );
    
    if (!updatedPlan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Plan updated successfully',
      data: updatedPlan
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error updating plan',
      error: error.message
    });
  }
};



const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedPlan = await Plan.findByIdAndDelete(id);
    
    if (!deletedPlan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Plan permanently deleted',
      data: deletedPlan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error permanently deleting plan',
      error: error.message
    });
  }
};

// TOGGLE PLAN STATUS (Active/Inactive)
const togglePlanStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const plan = await Plan.findById(id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    plan.isActive = !plan.isActive;
    await plan.save();

    res.status(200).json({
      success: true,
      message: `Plan ${plan.isActive ? 'activated' : 'deactivated'} successfully`,
      data: plan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling plan status',
      error: error.message
    });
  }
};

module.exports = {
  getAllPlans,
  getPlanById,
  getPlansByLevel,
  createPlan,
  updatePlan,
  deletePlan,
  togglePlanStatus,
  getPlansByLevel,
  createPlan,
  updatePlan,
  deletePlan,
};