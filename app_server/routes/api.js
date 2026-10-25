
const express = require('express');
const router = express.Router();
const Trip = require('../models/travlr');

// GET: Retrieve all trips
router.get('/trips', async (req, res) => {
    try {
        const trips = await Trip.find({}).lean();
        res.status(200).json(trips);
    } catch (err) {
        console.error('Error retrieving trips:', err);
        res.status(500).json({
            message: 'Error retrieving trip data',
            error: err.message
        });
    }
});

// GET: Retrieve one trip
router.get('/trips/:tripCode', async (req, res) => {
    try {
        const trip = await Trip.findOne({ code: req.params.tripCode }).lean();
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json(trip);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving trip', error: err.message });
    }
});

// POST: Create a trip
router.post('/trips', async (req, res) => {
    try {
        const trip = await Trip.create(req.body);
        res.status(201).json(trip);
    } catch (err) {
        res.status(400).json({ message: 'Error creating trip', error: err.message });
    }
});

// PUT: Update a trip by its code
router.put('/trips/:tripCode', async (req, res) => {
    try {
        const trip = await Trip.findOneAndUpdate(
            { code: req.params.tripCode },
            req.body,
            { new: true, runValidators: true }
        );
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json(trip);
    } catch (err) {
        res.status(400).json({ message: 'Error updating trip', error: err.message });
    }
});

// DELETE: Delete a trip by its code
router.delete('/trips/:tripCode', async (req, res) => {
    try {
        const trip = await Trip.findOneAndDelete({ code: req.params.tripCode });
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json({ message: 'Trip deleted', trip });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting trip', error: err.message });
    }
});

module.exports = router;
