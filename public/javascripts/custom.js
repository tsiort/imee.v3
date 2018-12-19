// On document ready event
$(function() {

  $("#imee-mega-nav").hover(function() {
    $("#imee-prog").addClass("active");
  }, function() {
    $("#imee-prog").removeClass("active");
  });


  $("#imee-mega-nav-seminars").hover(function() {
    $("#imee-seminars").addClass("active");
  }, function() {
    $("#imee-seminars").removeClass("active");
  });

});
