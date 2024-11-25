// routes/eventLogRoutes.js
const express = require('express');
const { createEventLog, queryEventLogs } = require('../Controllers/controllers');

const router = express.Router();

// Route for creating an event log
router.post('/logs', createEventLog);

// Route for querying event logs
router.get('/logs', queryEventLogs);

module.exports = router;
