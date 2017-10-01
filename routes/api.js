var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var leave = mongoose.model('leave');
var user = mongoose.model('user');

//all leaves
router.get('/all', function(req, res) {
leave.find(function(err,leaves){
  if(err)
  res.json({error : 'true' , message :err});
  res.json(leaves);
});
});

//all Users
router.get('/allusers',function(req,res){
  user.find(function(err,user){
    if(err)
    res.json({error : 'true' , message :err});
    res.json(user);

  });
});

//user with parameter
router.get('/user/:id',function(req,res){
  user.findOne({_id : req.params.id})
  .exec(function(err,user){
    if(err)
    res.json({error : 'true' , message :err});
    res.json(user);

  });

});


//post new leave
router.post('/newleave',function(req,res){
  var new_leave = new leave(req.body);
  new_leave.save(function(err,leave){
    if(err)
    res.json({error : 'true' , message :err});
    res.redirect('/dashboard');

  });
});

//get leave with id
router.get('/leave/:id',function(req,res){
  leave.findOne({_id : req.params.id})
  .populate('leave.user')
  .exec(function(err,leave){
    if(err)
    res.json({error : 'true' , message :err});
    res.json(leave);

  });

});

//update status
router.post('/updatestatus',function(req,res){
  leave.update({_id : req.body.id},{$set: {"approvalstatus" : req.body.status }},function(err,leave){
    if(err)
    res.json({error : 'true' , message :err});
    res.redirect('/dashboard');

  });
});


//get all leaves of particular student
router.get('/studentleave/:id',function(req,res){
  leave.find({"requestedby" : req.params.id})
  .populate('leave.user')
  .exec(function(err,leave){
    if(err)
    res.json({error : 'true' , message :err});
    res.json(leave);

  });

});

module.exports = router;
