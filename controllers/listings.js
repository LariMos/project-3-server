import CarListing from '../models/CarListing.js';

async function createSalePost(req, res) {
  try {
    if (!Array.isArray(req.body.images) || req.body.images.some(url => typeof url !== 'string')) {
        return res.status(400).send("Invalid image URLs provided.");
    }

    const { Make, Model, Year, Category, Mileage, Condition, Description, user, images } = req.body;
    
    const newListing = new CarListing({
        Make, Model, Year, Category, Mileage, Condition, Description, user, images
    });

    await newListing.save();

    res.status(201).json(newListing);
} catch (error) {
    res.status(400).json({
        message: 'Error creating listing',
        error: error.message
    });
}
};

async function getSalePostById(req, res) {
  try {
    const { id } = req.params;
    const carListing = await CarListing.findById(id);
    if (!carListing) {
      res.status(404).json({ error: 'Sale post not found' });
    } else {
      res.json(carListing);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve sale post' });
  }
}

async function getAllSalePosts(req, res) {
  try {
    const salePosts = await CarListing.find();
    res.json(salePosts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve sale posts' });
  }
}

async function updateSalePost(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const carListing = await CarListing.findByIdAndUpdate(id, updatedData, { new: true });
    if (!carListing) {
      res.status(404).json({ error: 'Sale post not found' });
    } else {
      res.json(carListing);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sale post' });
  }
}

async function deleteSalePost(req, res) {
  try {
    const { id } = req.params;
    const carListing = await CarListing.findByIdAndRemove(id);
    if (!carListing) {
      res.status(404).json({ error: 'Sale post not found' });
    } else {
      res.json({ message: 'Sale post deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sale post' });
  }
}

export default {
  createSalePost,
  getSalePostById,
  getAllSalePosts,
  updateSalePost,
  deleteSalePost,
};