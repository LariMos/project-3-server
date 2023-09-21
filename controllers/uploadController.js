import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

const uploadToCloudinary = async (req, res) => {
    try {
        const uploader = async (path) => await cloudinary.uploader.upload(path);
        const urls = [];

        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path);
            urls.push(newPath.url);

            // Delete the temporary file
            fs.unlinkSync(path);
        }

        // Respond with Cloudinary URLs
        res.status(200).json({
            message: 'Images Uploaded Successfully',
            data: urls
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error while uploading images',
            error: error.message
        });
    }
};

export { uploadToCloudinary };
