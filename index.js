const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require("./modules/users");
const crypto = require('crypto');
const postQuestion = require("./controllers/postQuestion");
const secretKey = crypto.randomBytes(32).toString('hex');
const { addUser, MONGODB_URI } = require('./controllers/addusers');
const CheckSession = require('./controllers/auth');
const login = require('./controllers/login.js');
const Question = require('./modules/question.js');
const Response = require("./modules/response");

const app = express();

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
}))


mongoose.connect(MONGODB_URI);


app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.render('home.pug',{user:req.session.user})
})

app.get('/question', (req, res) => {
    res.render('question.pug',{user:req.session.user})
})

app.get('/login', (req, res) => {
    res.render('login.pug',{user:req.session.user})
})

app.post("/login", login);

app.get('/signup', (req, res) => {
    res.render('register.pug',{user:req.session.user})
})

app.post("/signup", addUser);

app.post('/post-question', CheckSession, postQuestion);

app.get('/question_list' ,async (req, res) => {
    try {
      const questions = await Question.find({}).populate("user");
      res.render('Question_list' ,{ questions , user:req.session.user });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/login'); // Redirect to the login page or another destination
    });
  });


app.get('/respond/:questionId',async (req, res) => {
    const questionId = req.params.questionId;
    const full_question = await Question.findOne({_id : questionId});
    const responses = await Response.find({question : questionId});
    // const user = await getUserDetails(response.user);
    // Fetch the question details based on questionId and pass it to the response rendering
    res.render('respond.pug', {full_question : full_question , responses : responses});
  });

app.post('/respond/:questionId', async (req, res) => {
    const questionId = req.params.questionId;
    const  response  = req.body;
    const userid=req.session.user;
  
    try {
        console.log('****************************************************')
        let newResponse = new Response({
            user: userid,
            question: questionId,
            responseContent: response.response,
            date:Date.now()
            });
            await newResponse.save();
            return res.redirect(`/respond/${questionId}`)  
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  });

app.listen(3000, () => {
    console.log("Le serveur est en cours d'exécution sur http://localhost:3000");
});
