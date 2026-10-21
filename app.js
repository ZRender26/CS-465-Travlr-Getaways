const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB using the existing database module
const db = require('./app_server/models/db');

db.connect().catch((err) => {
    console.error('Unable to connect to the database:', err);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static website files
app.use(express.static(path.join(__dirname, 'public')));

// Register the REST API
const apiRoutes = require('./app_api/routes');
app.use('/api', apiRoutes);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        message: 'Resource not found'
    });
});

// Start the server
app.listen(port, () => {
    console.log(
        `Travlr Getaways server running at http://localhost:${port}`
    );
});

module.exports = app;
