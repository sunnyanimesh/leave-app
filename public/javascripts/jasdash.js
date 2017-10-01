$(document).ready(function(){
  if($("#userType").text() == "student"){
    $("#teacher").hide();

  $.getJSON("/api/studentleave/" + $("#userId").text(),function(data){
    var leave_data= '';
    $.each(data,function(key,value){
      leave_data += '<tr>';
      leave_data += '<td>' + value.startdate + '</td>';
      leave_data += '<td>' + value.endDate + '</td>';
      leave_data += '<td>' + value.leavetype + '</td>';
      leave_data += '<td>' + value.reason + '</td>';
      leave_data += '<td>' + value.approvalstatus + '</td>';
      leave_data += '</tr>';
    });
    $('#student_table').append(leave_data);
  });

}
else{
  $("#student").hide();

$.getJSON("/api/all",function(data){
  var leave_data = '';
  $.each(data,function(key,value){
    leave_data += '<tr>';
    leave_data += '<td>' + value.startdate + '</td>';
    leave_data += '<td>' + value.endDate + '</td>';
    leave_data += '<td>' + value.leavetype + '</td>';
    leave_data += '<td>' + value.requestedby + '</td>';
    leave_data += '<td>' + value.reason + '</td>';
    leave_data += '<td>' + value.approvalstatus + '</td>';
    leave_data += '<td>' + '<form action="/api/updatestatus" method="post">'+'<input type="text" name="id" value="'+value._id +'"style="display:none" >';
    leave_data += '<select name="status">';
    leave_data +=' <option disabled selected value> -- select an option -- </option>';
    leave_data += '<option>pending</option>';
    leave_data += '<option>approved</option>';
    leave_data += '<option>rejected</option>';
    leave_data += '</select >';
    leave_data += '  <input type="submit" value="update">';
    leave_data += '</form></td>';
    leave_data += '</tr>';

  });
  $('#teacher_table').append(leave_data);
});

}

});
