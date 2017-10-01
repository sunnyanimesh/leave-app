$(document).ready(function(){

$("#signup").hide();

$("#signupbtn").click(function(){
  $("#login").slideToggle(function(){
    $("#signup").slideToggle();

  });

});
$("#loginbtn").click(function(){
  $("#signup").slideToggle(function(){
    $("#login").slideToggle();
    
  });

});

});
