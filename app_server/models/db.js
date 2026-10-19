
const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI ||
    'mongodb://127.0.0.1:27017/travlr';

const connect = () => {
    return mongoose.connect(dbURI)
        .then(() => {
            console.log('Mongoose connected to MongoDB');
        })
        .catch((err) => {
            console.error('Mongoose connection failed:', err);
            throw err;
        });
};

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('Mongoose disconnected through app termination');
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
    } finally {
        process.exit(0);
    }
});

module.exports = { connect };

