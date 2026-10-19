
const express = require('express');
const router = express.Router();
const Trip = require('../models/travlr');

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

module.exports = router;
