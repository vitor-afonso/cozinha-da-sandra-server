// jshint esversion:9

const router = require('express').Router();
const { isAuthenticated } = require('./../middleware/jwt.middleware');
const fileUploader = require('./../config/cloudinary.config');

router.post('/upload', isAuthenticated, fileUploader.single('imageUrl'), (req, res, next) => {
  try {
    // Get the URL of the uploaded file and send it as a response.
    // 'imageUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

    res.status(200).json({ fileUrl: req.file.path });
  } catch (error) {
    res.status(500).status({ message: `Could not upload file! =>`, error });
  }
});

module.exports = router;
