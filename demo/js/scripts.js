/* Template: Evolo - StartUp HTML Landing Page Template
   Author: Inovatik
   Created: June 2019
   Description: Custom JS file
*/

(function($) {
    "use strict";

    /* Preloader */
    $(window).on("load", function() {
        var preloaderFadeOutTime = 500;
        function hidePreloader() {
            var preloader = $(".spinner-wrapper");
            setTimeout(function() {
                preloader.fadeOut(preloaderFadeOutTime);
            }, 500);
        }
        hidePreloader();
    });

    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on("scroll load", function() {
        if ($(".navbar").offset().top > 60) {
            $(".fixed-top").addClass("top-nav-collapse");
        } else {
            $(".fixed-top").removeClass("top-nav-collapse");
        }
    });

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function() {
        $(document).on("click", "a.page-scroll", function(event) {
            var $anchor = $(this);
            $("html, body")
                .stop()
                .animate(
                    {
                        scrollTop: $($anchor.attr("href")).offset().top
                    },
                    600,
                    "easeInOutExpo"
                );
            event.preventDefault();
        });
    });

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function(event) {
        if (
            !$(this)
                .parent()
                .hasClass("dropdown")
        )
            $(".navbar-collapse").collapse("hide");
    });

    /* Image Slider - Swiper */
    var imageSlider = new Swiper(".image-slider", {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        loop: true,
        spaceBetween: 30,
        slidesPerView: 5,
        breakpoints: {
            // when window is <= 580px
            580: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // when window is <= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window is <= 992px
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // when window is <= 1200px
            1200: {
                slidesPerView: 4,
                spaceBetween: 20
            }
        }
    });

    /* Card Slider - Swiper */
    var cardSlider = new Swiper(".card-slider", {
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });

    /* Video Lightbox - Magnific Popup */
    $(".popup-youtube, .popup-vimeo").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        iframe: {
            patterns: {
                youtube: {
                    index: "youtube.com/",
                    id: function(url) {
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if (!m || !m[1]) return null;
                        return m[1];
                    },
                    src: "https://www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: function(url) {
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if (!m || !m[5]) return null;
                        return m[5];
                    },
                    src: "https://player.vimeo.com/video/%id%?autoplay=1"
                }
            }
        }
    });

    /* Lightbox - Magnific Popup */
    $(".popup-with-move-anim").magnificPopup({
        type: "inline",
        fixedContentPos: false /* keep it false to avoid html tag shift with margin-right: 17px */,
        fixedBgPos: true,
        overflowY: "auto",
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: "my-mfp-slide-bottom"
    });

    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function() {
        if ($(this).val() != "") {
            $(this).addClass("notEmpty");
        } else {
            $(this).removeClass("notEmpty");
        }
    });

    /* Request Form */
    $("#requestForm")
        .validator()
        .on("submit", function(event) {
            if (event.isDefaultPrevented()) {
                // handle the invalid form...
                rformError();
                rsubmitMSG(false, "Lütfen Tüm Alanları Doldurun!");
            } else {
                // everything looks good!
                event.preventDefault();
                rsubmitForm();
            }
        });

    function rsubmitForm() {
        // initiate variables with form content
        var name = $("#rname").val();
        var email = $("#remail").val();
        var phone = $("#rphone").val();
        var select = $("#rselect").val();
        var terms = $("#rterms").val();

        $.ajax({
            type: "POST",
            url: "php/requestform-process.php",
            data: "name=" + name + "&email=" + email + "&phone=" + phone + "&select=" + select + "&terms=" + terms,
            success: function(text) {
                if (text == "success") {
                    rformSuccess();
                } else {
                    rformError();
                    rsubmitMSG(false, text);
                }
            }
        });
    }

    function rformSuccess() {
        $("#requestForm")[0].reset();
        rsubmitMSG(true, "İstek Gönderildi.");
        $("input").removeClass("notEmpty"); // resets the field label after submission
    }

    function rformError() {
        $("#requestForm")
            .removeClass()
            .addClass("shake animated")
            .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                $(this).removeClass();
            });
    }

    function rsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#rmsgSubmit")
            .removeClass()
            .addClass(msgClasses)
            .text(msg);
    }

    /* Contact Form */
    $("#contactForm")
        .validator()
        .on("submit", function(event) {
            if (event.isDefaultPrevented()) {
                // handle the invalid form...
                cformError();
                csubmitMSG(false, "Lütfen Tüm Alanları Doldurun!");
            } else {
                // everything looks good!
                event.preventDefault();
                csubmitForm();
            }
        });

    document.getElementById("permission").addEventListener("click", function() {
        if (document.getElementById("permission").checked) {
            document.getElementsByClassName("permission")[0].style.color = "#626262";
        } else {
            document.getElementsByClassName("permission")[0].style.color = "#cd201f";
        }
    });

    document.getElementById("onKayitGonder").addEventListener("click", function() {
        if (document.getElementById("permission").checked) {
            var ogrenci_adi = $("#ogrenci_adi").val();
            var ogrenci_soyadi = $("#ogrenci_soyadi").val();
            var ogrenci_dogum_tarih = $("#ogrenci_dogum_tarih")
                .val()
                .split("/")
                .reverse()
                .join("-");
            var ogrenci_cinsiyet = $("input[type=radio][id=ogrenci_cinsiyet]:checked").val();
            var ogrenci_telefon = $("#ogrenci_telefon").cleanVal();
            var ogrenci_email = $("#ogrenci_email").val();
            var lokasyon = $("select#lokasyon option:checked").val();
            var bolum = $("select#bolum option:checked").val();
            var veli_adi = $("#veli_adi").val();
            var veli_soyadi = $("#veli_soyadi").val();
            var veli_telefon = $("#veli_telefon").cleanVal();
            var veli_email = $("#veli_email").val();

            fetch("https://scoutive.online/api/v1/create/player/preregistration", {
                method: "post",
                body: JSON.stringify({
                    uid: "d7af01d7-f5b3-4dc8-ac5d-f91a6da10767",
                    player_name: ogrenci_adi,
                    player_surname: ogrenci_soyadi,
                    player_birthday: ogrenci_dogum_tarih,
                    gender: ogrenci_cinsiyet,
                    player_phone: ogrenci_telefon,
                    player_email: ogrenci_email,
                    location: lokasyon,
                    class_field: bolum,
                    parent_name: veli_adi,
                    parent_surname: veli_soyadi,
                    parent_phone: veli_telefon,
                    parent_email: veli_email
                })
            });
        } else {
            document.getElementsByClassName("permission")[0].style.color = "#cd201f";
        }
    });

    function csubmitForm() {
        // initiate variables with form content
        var name = $("#cname").val();
        var email = $("#cemail").val();
        var message = $("#cmessage").val();
        var terms = $("#cterms").val();
        var sc_location = $("#clocation").val();
        var sc_creferrer = $("#creferrer").val();
        var permission = $("#permission").val();

        $.ajax({
            type: "POST",
            url: "php/contactform-process.php",
            data:
                "name=" +
                name +
                "&email=" +
                email +
                "&message=" +
                message +
                "&terms=" +
                terms +
                "&location=" +
                sc_location +
                "&referrer=" +
                sc_creferrer +
                "&permission=" +
                permission,
            success: function(text) {
                if (text == "Gönderim Başarılı") {
                    cformSuccess();
                } else {
                    cformError();
                    csubmitMSG(false, text);
                }
            }
        });
    }

    function cformSuccess() {
        $("#contactForm")[0].reset();
        csubmitMSG(true, "Mesaj gönderimi başarılı!");
        $("input").removeClass("notEmpty"); // resets the field label after submission
        $("textarea").removeClass("notEmpty"); // resets the field label after submission
    }

    function cformError() {
        $("#contactForm")
            .removeClass()
            .addClass("shake animated")
            .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                $(this).removeClass();
            });
    }

    function csubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#cmsgSubmit")
            .removeClass()
            .addClass(msgClasses)
            .text(msg);
    }

    /* Privacy Form */
    $("#privacyForm")
        .validator()
        .on("submit", function(event) {
            if (event.isDefaultPrevented()) {
                // handle the invalid form...
                pformError();
                psubmitMSG(false, "Lütfen zorunlu alanları doldurunuz!");
            } else {
                // everything looks good!
                event.preventDefault();
                psubmitForm();
            }
        });

    function psubmitForm() {
        // initiate variables with form content
        var name = $("#pname").val();
        var email = $("#pemail").val();
        var select = $("#pselect").val();
        var terms = $("#pterms").val();

        $.ajax({
            type: "POST",
            url: "php/privacyform-process.php",
            data: "name=" + name + "&email=" + email + "&select=" + select + "&terms=" + terms,
            success: function(text) {
                if (text == "success") {
                    pformSuccess();
                } else {
                    pformError();
                    psubmitMSG(false, text);
                }
            }
        });
    }

    function pformSuccess() {
        $("#privacyForm")[0].reset();
        psubmitMSG(true, "İstek gönderildi!");
        $("input").removeClass("notEmpty"); // resets the field label after submission
    }

    function pformError() {
        $("#privacyForm")
            .removeClass()
            .addClass("shake animated")
            .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                $(this).removeClass();
            });
    }

    function psubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#pmsgSubmit")
            .removeClass()
            .addClass(msgClasses)
            .text(msg);
    }

    /* Back To Top Button */
    // create the back to top button
    $("body").prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $("a.back-to-top").fadeIn("500");
        } else {
            $("a.back-to-top").fadeOut("500");
        }
    });

    /* Removes Long Focus On Buttons */
    $(".button, a, button").mouseup(function() {
        $(this).blur();
    });
})(jQuery);
