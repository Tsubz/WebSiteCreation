// Script for the ADMIN PAGE

$(document).ready(function(e) {
  $('.checkFeatured').hide();

  $('.img-check').click(function() {
    console.log('This was clicked');
    $(this).toggleClass("check");
//    $('.checkFeatured').next().toggle();
  $(this).closest('.display_img').nextAll('.checkFeatured').toggle();
  });

//  $('.thumb').click(function() {
//    console.log('Clicked');
//    $(this).toggleClass('.checkFeatured');
//  });
});
