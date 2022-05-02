require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const product = require('./src/routes/product.route.js');
const user = require('./src/routes/user.route.js');

const app = express();

const mongoose = require('mongoose');

let dev_db_url = "mongodb://localhost:27017/react-app";

const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB); 
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', console.error.bind(console, 'MongoDB connected'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', product);
app.use('/users', user);

let port = 4003;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});