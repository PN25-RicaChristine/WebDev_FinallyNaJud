const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer')

const app = express();

// Initializing middleware

// Form Data middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

// Json Body middleware
app.use(bodyParser.json());

//Cors middleware
app.use(cors());

app.use('/files', express.static('uploads'))

//Setting a static path
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());

require('./config/passport')(passport);

const user = require('./routes/users');
const post = require('./routes/posts');

app.use('/users', user);
app.use('/bloggers', post)

mongoose.Promise = global.Promise;
//Connecting to database

const db = require('./config/keys').mongoURI;
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {

        console.log(`Connected to database ${db}`);
    }).catch(err => {
        console.log(`Unable to connect to database ${err}`);
    });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Now listening to port ${PORT}`);
})


