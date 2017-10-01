var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  startdate : {
    type : Date,
    required : true

  },
  endDate : {
    type : Date,
    required : true

  },
  leavetype : {
    type : String,
    required: true
  },
  reason :{
    type : String,
    required : true
  },
  requestedby :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required : true
  },
  approvalstatus : {
    type: String,
       enum : ['pending','approved','rejected'],
       default: 'pending'
  }


  });
  module.exports = mongoose.model('leave',schema);
