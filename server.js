const express = require('express');
const dbConnect = require('./dbConnect');
const path = require('path');

const app = express();
app.use(express.json());

const userRoute = require('./routes/usersRoute');
app.use('/api/users', userRoute);

const transactionRoute = require('./routes/transactionsRoute');
app.use('/api/transactions', transactionRoute);

const port = process.env.PORT || 3001;

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build')); // serve the static react app (render frontend)
    app.get('*', (req, res) => { // for all get requests, send back the index.html file
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    })

}

app.listen(port, () => console.log(`NodeJS Server on Port ${port}!`));