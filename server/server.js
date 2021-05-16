const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('dotenv/config');
var cors = require('cors');

const userRoute = require('./routes/api/auth');

app.use(bodyParser.json());
app.use(cors({origin: 'https://react-auth-3d77f.web.app'}));
app.use('/auth',userRoute);

//ROUTES
app.get('/', (req,res) => {
    res.send('Home');
})

//Connect to DB
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true},() =>
    console.log('Connected to DB')
);

//Listen Server
app.listen(5000);