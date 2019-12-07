var express = require('express');
const router = express.Router();
const Post = require('../model/Post');
const Image = require('../model/Image');
const fs = require('fs');
const multer = require('multer')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

router.post('/uploadfile', upload.single('post_image'), (req, res, next) => {
    console.log(req.file)
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})

router.post('/createPost', (req, res) => {
    //let filename;
    console.log(req)

    const data = new Post({
        post_blogger: req.body.post_blogger,
        post_text: req.body.post_text,
        post_image: req.body.post_image,
    })

    // Define a JSONobject for the image attributes for saving to database 
    data.save()
        .then((err,post) => {
            console.log(err)
            if (err) return res.send(err)
            return res.send({ message: "Posted successfully" ,data:post})
        })
})

router.get('/getPost', (req, res) => {
    Post.find({}).then(response => {
        console.log(response)
        if(response){
            res.send({
                status: 200,
                response: response
            });
        }
    })
});

module.exports = router;