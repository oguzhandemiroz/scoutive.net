/* Contact Form */
$("#contactForm")
    .validator()
    .on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            csubmitMSG(false, "Lütfen Tüm Alanları Doldurun!");
        } else {
            // everything looks good!
            event.preventDefault();
            csubmitForm();
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
    $("#sendButton")
        .addClass("disabled")
        .attr("disabled");

    $.ajax({
        type: "POST",
        url: window.location.href.indexOf("blog-detay") > -1 ? "../php/contactform-process.php" : "php/contactform-process.php",
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
        complete: function() {
            $("#sendButton")
                .removeClass("disabled")
                .removeAttr("disabled");
        },
        success: function() {
                Swal.fire({
                    icon: "success",
                    title: "Başarılı",
                    text: "Mesajınız gönderildi. En kısa sürede iletişime geçilecektir.",
                    confirmButtonText: "Tamam"
                });
                $("#contactForm")[0].reset();
        },
        error: function() {
            Swal.fire({
                icon: "error",
                title: "Hata Oluştu",
                text: "Üzgünüz, bir hata ile karşılaştık lütfen tekrar deneyin!",
                confirmButtonText: "Tamam"
            });
        }
    });
}

function csubmitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "text-center tada animated";
    } else {
        var msgClasses = "text-center";
    }
    $("#cmsgSubmit")
        .removeClass()
        .addClass(msgClasses)
        .text(msg);
}
