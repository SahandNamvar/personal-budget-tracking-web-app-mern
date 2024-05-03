const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const validator = require('validator');

const router = express.Router();

router.post('/login', async function(request, response) {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).send('Missing fields!');
        }

        if (!validator.isEmail(email)) {
            return response.status(400).send('Invalid email!');
        }

        const user = await User.findOne({ email });

        if (!user) {
            return response.status(400).send('Email does not exist!');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return response.status(400).send('Invalid password!');
        }
        // Send the user object (without the password) to the client
        response.status(200).json({ id: user._id, name: user.name, email: user.email });

        // response.status(200).send(user);
    } catch (error) {
        response.status(500).json(error);
        console.log('Login API Error:', error);
    }
});

router.post('/register', async function(request, response) {
    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return response.status(400).send('Missing fields!');
        }

        if (!validator.isEmail(email)) {
            return response.status(400).send('Invalid email!');
        }

        if (!validator.isStrongPassword(password)) {
            return response.status(400).send('Password is too weak!');
        }

        // Check if user already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(400).send('Email already exist!');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        response.status(201).send('Registration successful!');

    } catch (error) {
        response.status(500).json(error);
        console.log('Register API Error:', error);
    }
});

module.exports = router;