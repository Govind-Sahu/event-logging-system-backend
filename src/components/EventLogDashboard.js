import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './event.css'; // Ensure the CSS file exists

const EventLogDashboard = () => {
    const [eventLogs, setEventLogs] = useState([]);
    const [filters, setFilters] = useState({
        eventType: '',
        sourceAppId: '',
        startDate: '',
        endDate: '',
        page: 1,
        limit: 10
    });
    const [pagination, setPagination] = useState({
        totalPages: 0,
        currentPage: 1,
        totalLogs: 0
    });
    const [eventData, setEventData] = useState({
        eventType: '',
        sourceAppId: '',
        timestamp: '',
        dataPayload: {}
    });

    useEffect(() => {
        const fetchEventLogs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/event-logs', {
                    params: filters
                });
                setEventLogs(response.data.eventLogs);
                setPagination({
                    totalPages: response.data.totalPages,
                    currentPage: response.data.currentPage,
                    totalLogs: response.data.totalLogs
                });
            } catch (error) {
                console.error('Error fetching event logs:', error);
            }
        };

        fetchEventLogs();
    }, [filters]);

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value, page: 1 })); // Reset to first page on filter change
    };

    // Handle pagination change
    const handlePageChange = (newPage) => {
        setFilters(prev => ({ ...prev, page: newPage }));
    };

    // Handle form input changes for submission
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/event-logs', eventData);
            console.log('Data submitted successfully:', response.data);
            alert('Event data submitted successfully!');
        } catch (error) {
            console.error('Error submitting event data:', error);
            alert('Failed to submit event data.');
        }
    };

    return (
        <div className="dashboard-container">
            <h1>Event Log Dashboard</h1>

            {/* Filter Form */}
            <div className="filter-form">
                <input
                    type="text"
                    name="eventType"
                    placeholder="Filter by Event Type"
                    value={filters.eventType}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="sourceAppId"
                    placeholder="Filter by Source App ID"
                    value={filters.sourceAppId}
                    onChange={handleFilterChange}
                />
                <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                />
                <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                />
            </div>

            {/* Event Logs List */}
            <ul className="event-log-list">
                {eventLogs.map((log, index) => (
                    <li key={index} className="event-log-item">
                        <strong>Type:</strong> {log.eventType} <br />
                        <strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()} <br />
                        <strong>Source App ID:</strong> {log.sourceAppId} <br />
                        <strong>Data:</strong> {JSON.stringify(log.dataPayload)} <br />
                        <strong>Hash:</strong> {log.hash} <br />
                        <strong>Previous Hash:</strong> {log.previousHash} <br />
                    </li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                >
                    Previous
                </button>
                <span> Page {pagination.currentPage} of {pagination.totalPages} </span>
                <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                >
                    Next
                </button>
            </div>

            {/* Submit Event Form */}
            <div className="submit-event-form">
                <h2>Submit Event Data</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="eventType"
                        placeholder="Event Type"
                        value={eventData.eventType}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="sourceAppId"
                        placeholder="Source App ID"
                        value={eventData.sourceAppId}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="datetime-local"
                        name="timestamp"
                        value={eventData.timestamp}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="dataPayload"
                        placeholder="Enter Data Payload"
                        value={JSON.stringify(eventData.dataPayload)}
                        onChange={(e) =>
                            setEventData(prev => ({
                                ...prev,
                                dataPayload: JSON.parse(e.target.value || '{}')
                            }))
                        }
                    />
                    <button type="submit">Send Data</button>
                </form>
            </div>
        </div>
    );
};

export default EventLogDashboard;
