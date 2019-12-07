const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    }
});

userSchema.statics.updateUser = async function(username, newname, newPassword) {
    return await this.updateOne({"username" : username}, {$set : {"name" : newname, "password" : newPassword}})
}

userSchema.statics.getUserByUsername = async function(username) {
    return await this.findOne({"username" : username})
}

module.exports = mongoose.model('users', userSchema);