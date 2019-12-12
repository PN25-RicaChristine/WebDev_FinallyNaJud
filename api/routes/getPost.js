const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');



router.get('/getPost', (req, res) => {
    posts.find({}, {date_time: { $dateToString: { format: "%m-%d-%Y", date_time: "$date_time" } }, post_image:1,post_text:1,post_blogger:1, account_id:1
    }).then(response => {
        if (response) {
            res.send({
                status: 200,
                response: response
            });
        }
    })
});


module.exports = router;