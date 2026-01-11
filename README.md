const createPlan = async (req, res) => {
  try {
    const { title, description, price, level, duration, discountPercentage } = req.body;
    
    // Validate required fields
    if (!title || !description || !price || !level || !duration) {
      return res.status(400).json({
        success: false,
        message: 'All fields (title, description, price, level, duration) are required'
      });
    }

    // ✅ Handle image upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required'
      });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    
    // ✅ Build plan data - DON'T include originalPrice unless there's a discount
    const planData = {
      title,
      description,
      price: parseFloat(price),
      level,
      duration: parseInt(duration),
      image: imagePath,
      discountPercentage: parseFloat(discountPercentage) || 0
    };

    // ✅ Only add originalPrice if there's a discount
    if (planData.discountPercentage > 0) {
      planData.originalPrice = parseFloat(price) / (1 - planData.discountPercentage / 100);
    }
    
    const newPlan = new Plan(planData);
    const savedPlan = await newPlan.save();
    
    res.status(201).json({
      success: true,
      message: 'Plan created successfully',
      data: savedPlan
    });
  } catch (error) {
    console.error('Create plan error:', error);
    
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
