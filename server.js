const express = require('express')
const fs = require('fs')
const util = require('util')

const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
const dotenv = require('dotenv')


const connectDB = require('./config/db')

//Routes
app.use('/', require('./routes/index'));
//Load Config
dotenv.config({ path: './config/config.env' });

connectDB();
const port = process.env.PORT || 8050;
app.listen(port, () => console.log("listening on port " + port))
