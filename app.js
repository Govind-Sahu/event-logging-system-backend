// app.js
const express = require('express');
const connectDB = require('./config/db');
const eventLogRoutes = require('./routes/events');

const app = express();

// Middleware
app.use(express.json());

// Connect to the database
connectDB();

// Use the event log routes
app.use('/api', eventLogRoutes);

module.exports = app;
