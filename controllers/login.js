const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://127.0.0.1:27017/forum'
const User = require('../modules/users');
const bcrypt = require('bcryptjs');


const login = async (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username and password match a user in the database
    try {
      console.log("CHECKING");
      await mongoose.connect(MONGODB_URI);
      const user = await User.findOne({ username });
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch){
          // Successful login
          req.session.user=user;
          console.log("session filled");
          res.redirect("/question");
          // res.send(`Welcome, ${username}!`);
        }

        else {
          // Invalid credentials
          console.log("Seer t****");
          res.redirect("/login")
          // res.status(401).send('Invalid credentials');
      }
    }} catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

module.exports = login