const mongoose = require('mongoose');
const express = require('express');
const User = require('../modules/users');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const MONGODB_URI = 'mongodb://127.0.0.1:27017/forum'

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };

const addUser = async (req, res) => {
    try{
        // console.log("hello");
        const {username, password, email} = req.body;
        const Username_1 = User.findOne({Username_1:req.body.username});
        if (Username_1){
            res.redirect("/signup");
        }
        const hashedPassword = await hashPassword(password);
        await mongoose.connect(MONGODB_URI);
        let newUser = new User({
            username: username,
            password: hashedPassword,
            email: email
        });
        await newUser.save();
        res.redirect("/login");
    } catch (err) {
        console.log(err);
    }
}

module.exports = {addUser, MONGODB_URI};

