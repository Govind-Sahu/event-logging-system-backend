// controllers/eventLogController.js
const EventLog = require('../models/eventLog');
const { generateHash } = require('../utils/hashUtils');

// Create a new event log
const createEventLog = async (req, res) => {
  const { eventType, sourceAppId, dataPayload } = req.body;
  
  if (!eventType || !sourceAppId || !dataPayload) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const lastEvent = await EventLog.findOne().sort({ timestamp: -1 }).exec();
    const previousHash = lastEvent ? lastEvent.hash : '';
    const hash = generateHash(`${eventType}${sourceAppId}${JSON.stringify(dataPayload)}${previousHash}`);

    const newEventLog = new EventLog({
      eventType,
      sourceAppId,
      dataPayload,
      previousHash,
      hash,
    });

    await newEventLog.save();
    res.status(201).json({ message: 'Event log created successfully', data: newEventLog });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event log', error: error.message });
  }
};

// Query event logs with filters and pagination
const queryEventLogs = async (req, res) => {
  const { eventType, sourceAppId, startDate, endDate, page = 1, limit = 10 } = req.query;

  const query = {};
  if (eventType) query.eventType = eventType;
  if (sourceAppId) query.sourceAppId = sourceAppId;
  if (startDate && endDate) {
    query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  try {
    const eventLogs = await EventLog.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();
    res.status(200).json(eventLogs);
  } catch (error) {
    res.status(500).json({ message: 'Error querying event logs', error: error.message });
  }
};

module.exports = { createEventLog, queryEventLogs };
