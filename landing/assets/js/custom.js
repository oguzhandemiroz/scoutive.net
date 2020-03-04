// Collapse Navbar
var navbarCollapse = function() {
    var srcImage = "https://scoutive-others.s3.eu-central-1.amazonaws.com/sites/";
    if ($("#mainNav").offset().top > 50) {
        $("#mainNav").addClass("navbar-fixed");
        $(".navbar-toggler-icon").addClass("navbar-fixed");
        $("#navbar_logo")[0].src = srcImage + "logo.svg";
    } else {
        $("#mainNav").removeClass("navbar-fixed");
        $("#navbar_logo")[0].src =
            srcImage + "logo_white.svg";
    }
};
// Collapse now if page is not at top
navbarCollapse();
// Collapse the navbar when page is scrolled
$(window).scroll(navbarCollapse);
