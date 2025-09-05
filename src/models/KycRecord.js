const mongoose = require('mongoose');

const KycSchema = new mongoose.Schema({
  documentPath: { type: String },
  selfiePath: { type: String },
  status: { type: String, enum: ['PENDING','PROCESSING','APPROVED','REJECTED'], default:'PENDING' },
  meta: { type: Object }
}, { timestamps:true });

module.exports = mongoose.model('KycRecord', KycSchema);
