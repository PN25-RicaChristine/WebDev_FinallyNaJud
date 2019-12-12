const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Post schema
const postSchema = new Schema({
    account_id: {
        type: Schema.Types.ObjectId, ref: 'User', sparse: true
    },
    post_blogger: {
        type: String,
        required: true
    },post_category: {
        type: String,
        required: true
    },
    post_text: {
        type: String,
        required: false
    },
    post_image: {
        type: String,
        required: true
    },
    date_time: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

module.exports = mongoose.model('posts', postSchema);