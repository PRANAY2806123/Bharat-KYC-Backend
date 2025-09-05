const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadDoc } = require('../controllers/kycController');

// Aadhaar / PAN / VoterID upload + OCR extraction + save
router.post(
  '/upload-doc',
  upload.fields([
    { name: 'document', maxCount: 1 },
    { name: 'selfie', maxCount: 1 }
  ]),
  uploadDoc
);

module.exports = router;
