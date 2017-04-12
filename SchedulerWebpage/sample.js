// Make text disappear
$(document).ready(function(){
    $("p").click(function(){
        $(this).hide();
    });
});

$( ".scheduler_form" ).submit(function( event ) {
  event.preventDefault();
  console.log( $( this ).serializeArray() );

});

$(document).ready(function() {
    $("#btnSubmit").click(function(){
      var fieldsArray = $( ".scheduler_form" ).serializeArray(),
          fields = {};
      $(fieldsArray).each(function(i, field){
        fields[field.name] = field.value;
      });

      data = {
        medium: fields['medium'],
        msg: fields['msg'],
        dest: fields['dest'],
        time: fields['time']
      }

      $.ajax({
        url: fields['url'],
        type: "POST",
        crossDomain: true,
        data: jQuery.param(data),
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (data, textStatus, xhr) {
          setResponseText(xhr);
        },
        error: function (xhr, status) {
          setResponseText(xhr);
        }
      });
    })
});

function setResponseText(xhr) {
  console.log(xhr.responseText);
  responseTextObj = JSON.parse(xhr.responseText);
  $('responsearea').text(JSON.stringify(responseTextObj, null, 2));
}