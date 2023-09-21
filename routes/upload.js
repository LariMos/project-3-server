import express from 'express';
import { upload } from '../middleware/multer.js'; // the multer setup
import { uploadToCloudinary } from '../controllers/uploadController.js'; // your Cloudinary logic


const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from the upload route!');
});

// Handle multiple image uploads
router.post('/upload', upload.array('images', 5), uploadToCloudinary);

export default router;
