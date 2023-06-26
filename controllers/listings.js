import CarListing from '../models/CarListing.js';


async function createSalePost(req, res) {
  try {
    const postData = req.body;

    console.log("------------------------------images--------------------------")
    console.log(req.body);

    const images = req?.files?.map(file => 'uploads/compressed/' + file.filename);
    // console.log('Received request to create a new sale post:', postData);
    // console.log('Uploaded images:', images);
    const carListing = new CarListing({ ...postData, images });
    // console.log('New car listing object:', carListing);
    await carListing.save();
    // console.log('Car listing saved successfully:', carListing);
    res.status(201).json(carListing);
  } catch (error) {
    console.error('Error creating sale post:', error);
    res.status(500).json({ error: 'Failed to create sale post' });
  }
}

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

    // Handle image upload if necessary
    if (req.files && req.files.length > 0) {
      const images = req.files.map(file => 'uploads/compressed/' + file.filename);
      updatedData.images = images;
    }

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