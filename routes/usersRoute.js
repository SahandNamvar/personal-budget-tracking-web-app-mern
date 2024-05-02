const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/login', async function(request, response) {
    try {
        const { email, password } = request.body;
        const result = await User.findOne({ email, password });
        if (result) {
            response.status(200).send(result);
        } else {
            response.status(401).send('Invalid credentials');
        }
    } catch (error) {
        response.status(500).json(error);
    }
});

router.post('/register', async function(request, response) {
    try {
        const { name, email, password } = request.body;
        const user = new User({ name, email, password });
        await user.save();
        response.status(201).send('User registered');
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = router;