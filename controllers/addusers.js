const mongoose = require('mongoose');
const express = require('express');
// const router = express.Router();
const User = require('../modules/users'); // Update the path accordingly 

// Replace 'your_connection_string' with your actual MongoDB connection string
const MONGODB_URI = 'mongodb://127.0.0.1:27017/forum'



const addUser = async (req, res) => {
    try{
        console.log("hello");
        await mongoose.connect(MONGODB_URI);
        const {username, password, email} = req.body;
        let newUser = new User({
            username: username,
            password: password,
            email: email
        });
        await newUser.save();
        res.redirect("/login");
    } catch (err) {
        console.log(err);
    }
}

module.exports = {addUser, MONGODB_URI,router};

