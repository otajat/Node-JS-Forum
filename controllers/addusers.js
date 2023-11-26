const mongoose = require('mongoose');
const express = require('express');
const User = require('../modules/users');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/forum'



const addUser = async (req, res) => {
    try{
        // console.log("hello");
        const {username, password, email} = req.body;
        const Username_1 = User.findOne({Username_1:req.body.username});
        if (Username_1){
            res.redirect("/signup");
        }
        await mongoose.connect(MONGODB_URI);
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

module.exports = {addUser, MONGODB_URI};

