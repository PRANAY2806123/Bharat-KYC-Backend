const KycRecord = require('../models/KycRecord');
const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');

exports.uploadDoc = async (req, res, next) => {
  try {
    const files = req.files || {};
    const doc = files.document ? files.document[0] : null;
    const selfie = files.selfie ? files.selfie[0] : null;

    if (!doc) {
      return res.status(400).json({ success: false, message: "Document file is required" });
    }

    // Save record in DB
    const record = await KycRecord.create({
      documentPath: doc ? doc.path : null,
      selfiePath: selfie ? selfie.path : null,
      status: 'PENDING'
    });

    // Run OCR on uploaded Aadhaar
    const ocrResult = await Tesseract.recognize(doc.path, 'eng+hin'); // Hindi + English
    const text = ocrResult.data.text;

    // Very basic Aadhaar extraction (can be improved with regex)
    const extracted = {
      aadhaarNumber: (text.match(/\d{4}\s\d{4}\s\d{4}/) || [])[0] || null,
      name: (text.split("\n")[0] || "").trim(), // naive: usually first line
      dob: (text.match(/DOB[:\s]*(\d{2}\/\d{2}\/\d{4})/) || [])[1] || null,
      address: (text.match(/Address[\s:]*([\s\S]+)/) || [])[1] || null,
      rawText: text // full OCR for debugging
    };

    // Return response
    res.json({
      success: true,
      id: record._id,
      message: 'Document uploaded & processed',
      details: extracted
    });
  } catch (err) {
    console.error("OCR error:", err);
    next(err);
  }
};
