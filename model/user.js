var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
	firstname : {
    type : String,
    required : 'kindly enter the name '
	},
	lastname : {
type : String
  },
username :{
  type : String,
  unique: true,
  required : true
},
password : {
  type : String,
  required : true
},
type:{
  type : String,
  required : true
}
});


module.exports = mongoose.model('user',schema);
