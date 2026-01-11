const TShirt = require('../../models/merch');

const getAllTShirts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      isActive,
      minPrice,
      maxPrice,
      sizes,
      colors,
      search
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    if (sizes) {
      const sizeArray = sizes.split(',');
      filter.sizes = { $in: sizeArray };
    }
    
    if (colors) {
      const colorArray = colors.split(',');
      filter.colors = { $in: colorArray };
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with pagination
    const tshirts = await TShirt.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination info
    const totalCount = await TShirt.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / parseInt(limit));

    res.status(200).json({
      success: true,
      data: tshirts,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: totalCount,
        itemsPerPage: parseInt(limit),
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch T-shirts',
      error: error.message
    });
  }
};

const getTShirtById = async (req, res) => {
  try {
    const { id } = req.params;
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

    res.status(200).json({
      success: true,
      data: tshirt
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch T-shirt',
      error: error.message
    });
  }
};

const getActiveTShirts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const tshirts = await TShirt.findActive()
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const totalCount = await TShirt.countDocuments({ isActive: true });
    const totalPages = Math.ceil(totalCount / parseInt(limit));

    res.status(200).json({
      success: true,
      data: tshirts,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: totalCount,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch active T-shirts',
      error: error.message
    });
  }
};

const getAvailableOptions = async (req, res) => {
  try {
    // Get unique sizes and colors from active T-shirts
    const pipeline = [
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          allSizes: { $addToSet: "$sizes" },
          allColors: { $addToSet: "$colors" },
          priceRange: {
            $push: {
              min: { $min: "$price" },
              max: { $max: "$price" }
            }
          }
        }
      },
      {
        $project: {
          sizes: {
            $reduce: {
              input: "$allSizes",
              initialValue: [],
              in: { $setUnion: ["$$value", "$$this"] }
            }
          },
          colors: {
            $reduce: {
              input: "$allColors",
              initialValue: [],
              in: { $setUnion: ["$$value", "$$this"] }
            }
          },
          minPrice: { $min: "$priceRange.min" },
          maxPrice: { $max: "$priceRange.max" }
        }
      }
    ];

    const result = await TShirt.aggregate(pipeline);
    const options = result[0] || { sizes: [], colors: [], minPrice: 0, maxPrice: 0 };

    res.status(200).json({
      success: true,
      data: {
        availableSizes: options.sizes,
        availableColors: options.colors,
        priceRange: {
          min: options.minPrice,
          max: options.maxPrice
        }
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch available options',
      error: error.message
    });
  }
};

const searchTShirts = async (req, res) => {
  try {
    const { q: searchQuery } = req.query;
    const { page = 1, limit = 10 } = req.query;

    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const filter = {
      $and: [
        { isActive: true },
        {
          $or: [
            { title: { $regex: searchQuery, $options: 'i' } },
            { description: { $regex: searchQuery, $options: 'i' } }
          ]
        }
      ]
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const tshirts = await TShirt.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalCount = await TShirt.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: tshirts,
      searchQuery,
      totalResults: totalCount,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        totalItems: totalCount
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
};



module.exports = {
  getAllTShirts,
  getTShirtById,
  getActiveTShirts,
  getAvailableOptions,
  searchTShirts
};