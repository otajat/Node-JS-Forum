const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');


const {addUser, MONGODB_URI} = require('./controllers/addusers');




const app= express()




app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));


app.get('/',(req,res)=>{
    res.render('home.pug')
})

app.get('/login',(req,res)=>{
    res.render('login.pug')
})


app.get('/signup',(req,res)=>{

    res.render('register.pug')
})

app.get('/question',(req,res)=>{
    res.render('question.pug')
})

app.post("/signup",addUser);

app.listen(3000,()=>{
    console.log("siuuu");
})