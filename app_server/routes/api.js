const express = require('express');
const router = express.Router();
const Trip = require('../models/travlr');
const authenticateJWT = require('../middleware/auth');

// PUBLIC: Retrieve all trips
router.get('/trips', async (req, res) => {
    try {
        const trips = await Trip.find({}).lean();
        res.status(200).json(trips);
    } catch (err) {
        console.error('Error retrieving trips:', err.message);
        res.status(500).json({
            message: 'Error retrieving trip data'
        });
    }
});

// PUBLIC: Retrieve one trip
router.get('/trips/:tripCode', async (req, res) => {
    try {
        const trip = await Trip.findOne({
            code: req.params.tripCode
        }).lean();

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        res.status(200).json(trip);
    } catch (err) {
        res.status(500).json({
            message: 'Error retrieving trip'
        });
    }
});

// PROTECTED: Create a trip
router.post('/trips', authenticateJWT, async (req, res) => {
    try {
        const trip = await Trip.create(req.body);
        res.status(201).json(trip);
    } catch (err) {
        console.error('Error creating trip:', err.message);
        res.status(400).json({
            message: 'Error creating trip',
            error: err.message
        });
    }
});

// PROTECTED: Update a trip
router.put('/trips/:tripCode', authenticateJWT, async (req, res) => {
    try {
        const trip = await Trip.findOneAndUpdate(
            { code: req.params.tripCode },
            req.body,
            { new: true, runValidators: true }
        );

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        res.status(200).json(trip);
    } catch (err) {
        console.error('Error updating trip:', err.message);
        res.status(400).json({
            message: 'Error updating trip',
            error: err.message
        });
    }
});

// PROTECTED: Delete a trip
router.delete('/trips/:tripCode', authenticateJWT, async (req, res) => {
    try {
        const trip = await Trip.findOneAndDelete({
            code: req.params.tripCode
        });

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        res.status(200).json({
            message: 'Trip deleted',
            trip
        });
    } catch (err) {
        console.error('Error deleting trip:', err.message);
        res.status(500).json({
            message: 'Error deleting trip'
        });
    }
});

module.exports = router;
