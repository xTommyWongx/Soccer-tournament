const express = require('express');
const app = express();
const port = 3000;
const hb = require('express-handlebars');

// General Initialization
require('dotenv').config();
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379
const NODE_ENV = process.env.NODE_ENV || 'development' 

const knexFile = require('./knexfile')[NODE_ENV]
const knex = require('knex')(knexFile)

const redis = require('redis');
const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT
})

app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


const ViewRouter = require('./ViewRouter');

app.use('/', new ViewRouter().router());

app.listen(port,  () => {
    console.log(`Server listening on ${port}`);
})

