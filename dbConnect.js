const mongoose = require('mongoose');

const connect = mongoose.connect(
    'mongodb+srv://sahand_admin:cQHUTx0Ztnu0M7HL@personal-budget-trackin.omtnh3j.mongodb.net/personal-budget-tracking-DB');

const connection = mongoose.connection;
connection.on('error', err => console.log(`Connection Error: ${err}`));
connection.on('connected', () => console.log('MongoDB Connection Established!'));

// sahand_admin: cQHUTx0Ztnu0M7HL