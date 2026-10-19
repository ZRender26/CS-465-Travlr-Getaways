
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Trip = require('./travlr');

const dbURI = process.env.MONGODB_URI ||
    'mongodb://127.0.0.1:27017/travlr';

async function seedDatabase() {
    try {
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB');

        const tripsPath = path.join(__dirname, '../../data/trips.json');
        const trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

        const seedTrips = trips.map((trip, index) => ({
            code: `TRIP${index + 1}`,
            name: trip.name,
            length: '7 days',
            start: new Date('2027-06-01'),
            resort: trip.name,
            perPerson: 1000,
            image: trip.image,
            description: trip.description
        }));

        await Trip.deleteMany({});
        await Trip.insertMany(seedTrips);

        console.log(`Seed complete: ${seedTrips.length} trips inserted.`);
    } catch (error) {
        console.error('Seed failed:', error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seedDatabase();
