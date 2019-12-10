const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');



router.get('/getPost', (req, res) => {
    posts.find().then(response => {
        if (response) {
            res.send({
                status: 200,
                response: response
            });
        }
    })
});


module.exports = router;