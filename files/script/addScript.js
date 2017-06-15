//Script adding Elements to collection


$(document).ready(function() {

    console.log('Script loaded');
    var nom, pwd;
    var collection = db.collection('try');

    $("form").submit(function() {
    var $this = $(this); // 'this' refers to the current form element
    var nom = $this.$('input[name=nom]').val();

});
})