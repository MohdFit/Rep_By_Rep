const TShirt = require('../../models/merch'); 


const addTShirt = async (req, res) => {
  try {
    const {
      title,
      description,
      sizes,
      colors,
      price,
      stock,
      image,
      isActive
    } = req.body;

    const newTShirt = new TShirt({
      title,
      description,
      sizes,
      colors,
      price,
      stock,
      image,
      isActive
    });

    const savedTShirt = await newTShirt.save();

    res.status(201).json({
      success: true,
      message: 'T-shirt added successfully',
      data: savedTShirt
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to add T-shirt',
      error: error.message
    });
  }
};

const toggleAllTShirts = async (req, res) => {
  try {
    const result = await TShirt.toggleAllActive();
    
    if (result.success) {
      res.status(200).json({
        success: true,
        message: result.message,
        modifiedCount: result.modifiedCount
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to toggle T-shirts status',
        error: result.error
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to toggle T-shirts status',
      error: error.message
    });
  }
};

const updateTShirt = async (req, res) => {
  try {
    const { id } = req.params; // Can be MongoDB _id or customId
    const updateData = req.body;
    let tshirt = null;

    // Try to find by customId first (only if id looks like a number)
    if (!isNaN(id)) {
      tshirt = await TShirt.findOne({ customId: parseInt(id) });
    }
    
    // If not found and id looks like MongoDB ObjectId, try findById
    if (!tshirt && id.match(/^[0-9a-fA-F]{24}$/)) {
      tshirt = await TShirt.findById(id);
    }

    if (!tshirt) {
      return res.status(404).json({
        success: false,
        message: 'T-shirt not found'
      });
    }

    // Update the T-shirt
    const updatedTShirt = await TShirt.findByIdAndUpdate(
      tshirt._id,
      updateData,
      { 
        new: true, // Return updated document
        runValidators: true // Run schema validations
      }
    );

    res.status(200).json({
      success: true,
      message: 'T-shirt updated successfully',
      data: updatedTShirt
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update T-shirt',
      error: error.message
    });
  }
};


const deleteTShirt = async (req, res) => {
  try {
    const { id } = req.params; // Can be MongoDB _id or customId
    let tshirt = null;

    // Try to find by customId first (only if id looks like a number)
    if (!isNaN(id)) {
      tshirt = await TShirt.findOne({ customId: parseInt(id) });
    }
    
    // If not found and id looks like MongoDB ObjectId, try findById
    if (!tshirt && id.match(/^[0-9a-fA-F]{24}$/)) {
      tshirt = await TShirt.findById(id);
    }

    if (!tshirt) {
      return res.status(404).json({
        success: false,
        message: 'T-shirt not found'
      });
    }

    // Delete the T-shirt
    await TShirt.findByIdAndDelete(tshirt._id);

    res.status(200).json({
      success: true,
      message: 'T-shirt deleted successfully',
      data: {
        deletedId: tshirt.customId,
        title: tshirt.title
      }
    });

  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete T-shirt',
      error: error.message
    });
  }
};


module.exports = {
  addTShirt,
  toggleAllTShirts,
  updateTShirt,
  deleteTShirt
};