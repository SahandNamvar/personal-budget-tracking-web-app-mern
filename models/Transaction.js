const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount : {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
    },
    user_id: {
        type: String,
        required: true,
    }
});

const transactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = transactionModel;