const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var imageSchema = new Schema({
    postID :{
        type: Object,
        required: false
    },
    image:{
        type:Buffer,
        required:true
    },
    date_time: {
        type: Date,
        default: Date.now(),
        required: true
    }

});
module.exports = mongoose.model('Images', imageSchema);