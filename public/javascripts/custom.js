// On document ready event
$(function() {
  // $('.loader').fadeOut("slow");

  // Open navbarSide when button is clicked
  $('#navbarSideButton').on('click', function() {
    $('#navbarSide').addClass('reveal');
    $('.overlay').show();
  });

  // Close navbarSide when the outside of menu is clicked
  $('.overlay').on('click', function() {
    $('#navbarSide').removeClass('reveal');
    $('.overlay').hide();
  });
  $('#navbarSideClose').on('click', function() {
    $('#navbarSide').removeClass('reveal');
    $('.overlay').hide();
  });

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
