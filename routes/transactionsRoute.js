const express = require('express');
const Transaction = require('../models/Transaction');
const moment = require('moment');

const router = express.Router();

router.post('/add-transaction', async function(request, response) {
    try {
        const { amount, type, category, date, description, user_id } = request.body;

        if (!amount || !type || !category || !date || !user_id) {
            return response.status(400).send('Missing fields!');
        }

        if (isNaN(amount)) {
            return response.status(400).send('Amount must be a number!');
        }

        if (amount <= 0) {
            return response.status(400).send('Amount must be greater than 0!');
        }

        const transaction = new Transaction({ amount, type, category, date, description, user_id });
        await transaction.save();
        response.status(201).send('Transaction added successfully!');
    } catch (error) {
        response.status(500).json(error);
        console.log('Add-Transaction API Error:', error);
    }
});

router.post('/edit-transaction', async function(request, response) {
    try {
        const { amount, type, category, date, description, user_id } = request.body;

        if (!amount || !type || !category || !date || !user_id) {
            return response.status(400).send('Missing fields!');
        }

        if (isNaN(amount)) {
            return response.status(400).send('Amount must be a number!');
        }

        if (amount <= 0) {
            return response.status(400).send('Amount must be greater than 0!');
        }

        const transaction = await Transaction.findOneAndUpdate({ _id: request.body._id }, { amount, type, category, date, description, user_id });

        if (!transaction) {
            return response.status(400).send('Transaction does not exist!');
        }

        response.status(200).send('Transaction updated successfully!');
    } catch (error) {
        response.status(500).json(error);
        console.log('Edit-Transaction API Error:', error);
    }
});

router.post('/delete-transaction', async function(request, response) {
    try {
        const transaction = await Transaction.findOneAndDelete({ _id: request.body._id });

        if (!transaction) {
            return response.status(400).send('Transaction does not exist!');
        }

        response.status(200).send('Transaction deleted successfully!');
    } catch (error) {
        response.status(500).json(error);
        console.log('Delete-Transaction API Error:', error);
    }
});

// .get() changed to .post() because we are sending the user_id in the request body
router.post('/get-all-transactions', async function(request, response) {
    try {
        // Frequency received from the client is either '7', '30', '90', or 'all'
        const frequency = request.body.frequency;
        const type = request.body.type;
        // console.log('frequency: ', frequency)
        // console.log('type: ', type)

        // Run a query on the database to get the specified transactions
        const transactions = await Transaction.find({ 
            ...(frequency !== 'all' && // If frequency is not 'all', then its value is either '7', '30', or '90'
            {
                date: {
                    $gte: moment().subtract(Number(frequency), 'days').toDate(),
                    $lte: moment().toDate()
                },
            }
        ),
            user_id: request.body.user_id, // Regardless of the frequency, the transactions queried are filtered by the user_id
        
            ...(type !== 'all' && { type }) // If type is not 'all', then filter the transactions by the type
        });
        response.status(200).send(transactions);
    } catch (error) {
        response.status(500).json(error);
        console.log('Get-All-Transactions API Error:', error);
    }
});

module.exports = router;