import express from 'express';
import salePostController from '../controllers/listings.js';
import { uploadToCloudinary } from '../controllers/uploadController.js';  // your Cloudinary logic
import { upload } from '../middleware/multer.js'; // your multer setup

const router = express.Router();

// Sale post routes
router.post('/saleposts', upload.array('images', 5), uploadToCloudinary, salePostController.createSalePost);
router.get('/saleposts/:id', salePostController.getSalePostById);
router.get('/saleposts', salePostController.getAllSalePosts);
router.put('/saleposts/:id', salePostController.updateSalePost);
router.delete('/saleposts/:id', salePostController.deleteSalePost);

// New route for creating a car listing
router.post('/new-listing', async (req, res) => {
    try {
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
});

export default router;
