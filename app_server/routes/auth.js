const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Register a new user.
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Name, email, and password are required.'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters.'
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(409).json({
                message: 'An account with this email already exists.'
            });
        }

        const user = new User({
            name: name.trim(),
            email: normalizedEmail
        });

        user.setPassword(password);
        await user.save();

        return res.status(201).json({
            token: user.generateJWT()
        });
    } catch (err) {
        console.error('Registration error:', err.message);

        if (err.code === 11000) {
            return res.status(409).json({
                message: 'An account with this email already exists.'
            });
        }

        return res.status(500).json({
            message: 'Unable to register user.'
        });
    }
});

// Log in an existing user.
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required.'
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user || !user.validPassword(password)) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        return res.status(200).json({
            token: user.generateJWT()
        });
    } catch (err) {
        console.error('Login error:', err.message);
        return res.status(500).json({
            message: 'Unable to log in.'
        });
    }
});

module.exports = router;
