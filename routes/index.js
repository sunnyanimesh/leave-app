var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('user');


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.redirect('/dashboard');

  }
  res.render('index');
});

//new user save
router.post('/signup',function(req,res){
  var new_user = new user(req.body);
new_user.save(function(err, chap) {
  if (err)
    res.json({error: 'true', message: err });
  res.redirect('/');
});

});
// check if session already exist
function checkSignIn(req, res,next){
   if(req.session.user){
      next();
   } else {
      var err = new Error("Not logged in!");
      console.log(req.session.user);
      next(err);
   }
}
//login
router.post('/login',function (req,res) {
  if(!req.body.username|| !req.body.password){
     res.render('index', {message: "Please enter both id and password"});
  } else {
    user.findOne({'username' : req.body.username,'password' : req.body.password}, function(err,user){
   if(err || (user==null)) {
     res.redirect('/');
   }
   else{
      req.session.user = user;

      res.redirect('/dashboard');
    }

    });
  }

});
//redirect to dashboard after login
router.get('/dashboard', checkSignIn, function(req, res){
   res.render('dashboard', {user: req.session.user})
});
//logout
router.get('/logout', function(req, res){
   req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/');
});


//not authenticateda
router.use('/dashboard', function(err, req, res, next){
console.log(err);
   //User should be authenticated! Redirect him to log in.
   res.redirect('/');
});

module.exports = router;
