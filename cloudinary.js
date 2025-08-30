const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
       cloud_name: process.env.CLOUD_NAME,
       api_key: process.env.CLOUD_API_KEY,
       api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
       cloudinary: cloudinary,
       params: {
              folder: 'some-folder-name', // Make sure this matches Cloudinary's folder name
              allowedFormats: ["png", "jpg", "jpeg"], // Corrected typo
       },
});

module.exports = {
       cloudinary,
       storage
}