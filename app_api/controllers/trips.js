
const mongoose = require('mongoose');
const Trip = require('../models/trips');

// GET: return all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).lean();

        if (!trips) {
            return res.status(404).json({
                message: 'No trips found'
            });
        }

        return res.status(200).json(trips);
    } catch (err) {
        console.error('Error retrieving trips:', err);
        return res.status(500).json({
            message: 'Error retrieving trips'
        });
    }
};

// GET: return one trip by its trip code
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            code: req.params.tripCode
        }).lean();

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        return res.status(200).json(trip);
    } catch (err) {
        console.error('Error retrieving trip:', err);

        if (err instanceof mongoose.Error) {
            return res.status(400).json({
                message: 'Invalid trip request'
            });
        }

        return res.status(500).json({
            message: 'Error retrieving trip'
        });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};
