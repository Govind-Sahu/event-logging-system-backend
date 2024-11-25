Event Logging System
The Event Logging System is a scalable and tamper-proof backend system designed to provide a decentralized event logging platform for distributed applications. This system ensures data integrity and enables efficient storage, querying, and real-time updates.

Problem Statement
The system's objective is to:

Build a scalable backend for event logging.
Ensure tamper-proof storage using cryptographic techniques.
Provide efficient querying and real-time updates.
Simulate decentralization for enhanced reliability.
Features
Event Logging API
A RESTful API for receiving event logs.
Each event includes:
Event Type: Type of event (e.g., INFO, ERROR).
Timestamp: ISO-8601 formatted timestamp.
Source Application ID: Unique identifier for the client application.
Data Payload: Additional data as a JSON object.
Tamper-Proof Design
Cryptographic hashing to link logs, forming a lightweight blockchain-inspired structure.
Each log includes:
Its own hash.
The hash of the previous log for immutability.
Search and Query
Query logs by filters:
Timestamp range
Event type
Source application ID
Pagination for handling large datasets.
Scalability
Horizontal scalability using MongoDB's sharding and indexing features.
Ability to handle high volumes of event logs efficiently.
Error Handling and Validation
Validates incoming data against a schema.
Robust error handling for:
Missing or invalid data.
Conflicting hash chains.
Optional Features (Bonus)
Real-Time Streaming: WebSocket or SSE for real-time log updates.
Decentralization Simulation:
Multiple backend servers in semi-decentralized mode.
Consistency across servers via hash verification and leader election.
Dashboard Visualization:
Visualize the chain of logs.
Detect and display inconsistencies in the chain.
Technology Stack
Backend Framework: Node.js with Express.js
Database: MongoDB (Sharding and Indexing)
Hashing: SHA-256 for cryptographic integrity
Real-Time Updates (Optional): WebSocket or SSE
Dashboard: React.js (Optional)
Prerequisites
Node.js (>= 16.x)
MongoDB (with sharding enabled)
Postman (for API testing) or equivalent tools



Getting Started
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/event-logging-system.git
cd event-logging-system
Install dependencies:

bash
Copy code
npm install
Configure environment variables: Create a .env file with the following details:

env
Copy code
PORT=3000
MONGODB_URI=mongodb://localhost:27017/eventLogs
Start the server:

bash
Copy code
npm start
Access the API at http://localhost:3000.

API Endpoints
1. Log Event
Endpoint: POST /api/event-logs
Request Body:
json
Copy code
{
    "eventType": "INFO",
    "timestamp": "2024-11-23T12:00:00Z",
    "sourceAppId": "app-123",
    "dataPayload": { "key": "value" }
}
Response:
json
Copy code
{
    "message": "Event logged successfully",
    "hash": "abc123...",
    "previousHash": "xyz456..."
}
2. Query Event Logs
Endpoint: GET /api/event-logs
Query Parameters:
eventType (optional)
sourceAppId (optional)
startDate (optional)
endDate (optional)
page (default: 1)
limit (default: 10)
Response:
json
Copy code
{
    "eventLogs": [...],
    "pagination": {
        "currentPage": 1,
        "totalPages": 5,
        "totalLogs": 50
    }
}
3. Real-Time Streaming (Bonus)
Endpoint: ws://localhost:3000/api/event-logs/stream
Description: Provides real-time event log updates via WebSocket or SSE.
Architecture Overview
Tamper-Proof Logging
Each event log is hashed using SHA-256.
Logs reference the hash of the previous log, ensuring an immutable chain.
Scalability
MongoDB's sharding and indexing manage high-volume data efficiently.
The system is designed for horizontal scaling, allowing deployment across multiple servers.
Error Handling
Invalid or missing fields return appropriate error messages.
Conflicts in the hash chain trigger alerts for manual resolution.
Testing