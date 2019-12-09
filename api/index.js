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
app.use('/bloggers', post);


//for user prof image
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        console.log(req)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
app.get('/images/:filename', (req, res) => {
    res.sendFile(__dirname + '/public/images/' + req.params.filename)
})

app.post('/images/upload/:id', upload.single('file'), (req, res) => {
    console.log(`new upload = ${req.file.filename}\n`);
    console.log(req.file);
    // res.json({ route: 'images/' + req.file.filename});
    //res.send({ route: 'images/' + req.file.filename});
    res.send('images/' + req.file.filename);
})


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


