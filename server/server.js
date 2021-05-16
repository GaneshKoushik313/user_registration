const express = require('express');
const path = require('path');
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
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}
const PORT = process.env.PORT || 5000;

//Connect to DB
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true},() =>
    console.log('Connected to DB')
);

exports.app = functions.https.onRequest(app);
//Listen Server
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));