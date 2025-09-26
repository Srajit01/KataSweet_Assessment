const Sweet = require('../models/Sweet');
const { 
  createSweetSchema, 
  updateSweetSchema, 
  purchaseSchema, 
  restockSchema, 
  searchSchema 
} = require('../validation/sweet');

const createSweet = async (req, res) => {
  try {
    const { error, value } = createSweetSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const sweet = new Sweet(value);
    await sweet.save();

    res.status(201).json({
      message: 'Sweet created successfully',
      sweet
    });
  } catch (error) {
    console.error('Create sweet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getSweets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sweets = await Sweet.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Sweet.countDocuments();

    res.json({
      sweets,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get sweets error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const searchSweets = async (req, res) => {
  try {
    const { error, value } = searchSchema.validate(req.query);
    
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, category, minPrice, maxPrice } = value;
    const searchQuery = {};

    if (name) {
      searchQuery.name = { $regex: name, $options: 'i' };
    }

    if (category) {
      searchQuery.category = category;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      searchQuery.price = {};
      if (minPrice !== undefined) searchQuery.price.$gte = minPrice;
      if (maxPrice !== undefined) searchQuery.price.$lte = maxPrice;
    }

    const sweets = await Sweet.find(searchQuery).sort({ createdAt: -1 });

    res.json({ sweets });
  } catch (error) {
    console.error('Search sweets error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateSweet = async (req, res) => {
  try {
    const { error, value } = updateSweetSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    );

    if (!sweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    res.json({
      message: 'Sweet updated successfully',
      sweet
    });
  } catch (error) {
    console.error('Update sweet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);

    if (!sweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    res.json({ message: 'Sweet deleted successfully' });
  } catch (error) {
    console.error('Delete sweet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const purchaseSweet = async (req, res) => {
  try {
    const { error, value } = purchaseSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { quantity } = value;
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ 
        error: `Insufficient stock. Only ${sweet.quantity} items available.` 
      });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.json({
      message: 'Purchase successful',
      sweet,
      purchased: quantity,
      total: quantity * sweet.price
    });
  } catch (error) {
    console.error('Purchase sweet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const restockSweet = async (req, res) => {
  try {
    const { error, value } = restockSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { quantity } = value;
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    sweet.quantity += quantity;
    await sweet.save();

    res.json({
      message: 'Restock successful',
      sweet,
      restocked: quantity
    });
  } catch (error) {
    console.error('Restock sweet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
};