  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-fixed");
      $("#logo")[0].src = "https://scoutive-others.s3.eu-central-1.amazonaws.com/sites/logo.svg"
    } else {
      $("#mainNav").removeClass("navbar-fixed");
      $("#logo")[0].src = "https://scoutive-others.s3.eu-central-1.amazonaws.com/sites/logo_white.svg"

    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
