
const Trip = require('../models/travlr');

const travel = async (req, res, next) => {
    try {
        const trips = await Trip.find({}).lean();

        res.render('travel', {
            title: 'Travlr Getaways',
            trips
        });
    } catch (err) {
        console.error('Error retrieving trips:', err);
        next(err);
    }
};

module.exports = {
    travel
};
