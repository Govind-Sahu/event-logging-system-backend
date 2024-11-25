const mongoose = require('mongoose');
// const crypto = require('crypto');

// Define schema
const eventLogSchema = new mongoose.Schema({
  eventType: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  sourceAppId: { type: String, required: true },
  dataPayload: { type: Object, required: true },
  previousHash: { type: String, required: true },
  hash: { type: String }
});

// // Pre-save middleware to generate hash
// eventLogSchema.pre('save', function (next) {
//   const dataToHash = `${this.eventType}${this.timestamp}${this.sourceAppId}${JSON.stringify(this.dataPayload)}${this.previousHash}`;
//   this.hash = crypto.createHash('sha256').update(dataToHash).digest('hex');
//   next();
// });

// Create model
const EventLog = mongoose.model('EventLog', eventLogSchema);
module.exports = EventLog;
