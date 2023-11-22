const mongoose = require('mongoose');

const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a specify username'],
        unique: true,
        lowercase: true 
    },
    email: {
        type: String,
        required: [true, 'Please enter a specify email'],
        unique: true,
        lowercase: true, 
        validate: [isEmail, 'Please enter a valide email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a specify password'],
        minlength: [5, 'The password must have at least five characters']
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;