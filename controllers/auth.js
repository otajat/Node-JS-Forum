const User = require('../modules/users');
const CheckSession= async(req,res,next)=>{
  if (req.session.user){
    next();
  }else{
    return res.redirect("/login")
  }
};

module.exports = CheckSession;

