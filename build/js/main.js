var tabnum = "Free";
$(document).ready(function() {
    $('.w-tab-menu .w-tab-link').click(function() {
        tabnum = $(this).attr('data-w-tab');
        $('.w-tab-menu .w-tab-link').removeClass('w--current');
        $(this).addClass('w--current');
        $('.w-tab-pane').removeClass('w--tab-active');
        $('.w-tab-pane[data-w-tab='+tabnum+']').addClass('w--tab-active');
    });
});
