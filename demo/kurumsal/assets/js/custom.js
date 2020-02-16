/* 

1. Add your custom JavaScript code below
2. Place the this code in your template:

  

*/

document.getElementById("permission").addEventListener("click", function() {
    if (document.getElementById("permission").checked) {
        document.getElementsByClassName("permission")[0].style.color = "#626262";
    } else {
        document.getElementsByClassName("permission")[0].style.color = "#cd201f";
    }
});

var kdMail = new Array(
    "mail.com",
    "gmail.com",
    "hotmail.com",
    "yahoo.com",
    "superonline.com",
    "mynet.com",
    "myspace.com",
    "e-kolay.net",
    "windowslive.com",
    "msn.com"
);
kdMail.sort();

function Complete(obj, evt) {
    if (!obj || !evt || kdMail.length == 0) {
        return;
    }

    if (obj.value.length == 0) {
        return;
    }

    var elm = obj.setSelectionRange ? evt.which : evt.keyCode;

    if (elm < 32 || (elm >= 33 && elm <= 46) || (elm >= 112 && elm <= 123)) {
        return;
    }

    var txt = obj.value.replace(/;/gi, ",");
    elm = txt.split("@");
    txt = elm.pop();
    //txt = txt.replace(/^\s*/, "");

    if (txt.length == 0) {
        return;
    }

    if (obj.createTextRange) {
        var rng = document.selection.createRange();
        if (rng.parentElement() == obj) {
            elm = rng.text;
            var ini = obj.value.lastIndexOf(elm);
        }
    } else if (obj.setSelectionRange) {
        var ini = obj.selectionStart;
    }

    for (var i = 0; i < kdMail.length; i++) {
        elm = kdMail[i].toString();
        if (elm.toLowerCase().indexOf(txt.toLowerCase()) == 0) {
            obj.value += elm.substring(txt.length, elm.length);
            break;
        }
    }

    if (obj.createTextRange) {
        rng = obj.createTextRange();
        rng.moveStart("character", ini);
        rng.moveEnd("character", obj.value.length);
        rng.select();
    } else if (obj.setSelectionRange) {
        obj.setSelectionRange(ini, obj.value.length);
    }
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    //";
}

function ValidateRegister() {
    fillerror = false;

    if ($("#ogrenci_adi")) {
        formObj = $("#ogrenci_adi");
        formObj.css("border", "2px solid #ebebeb");
        item = formObj.val();
        if (item.length <= 2) {
            formObj.css("border", "2px solid #cd201f");
            fillerror = true;
        } else {
            formObj.css("border", "2px solid #ebebeb");
        }
    }

    if ($("#ogrenci_soyadi")) {
        formObj = $("#ogrenci_soyadi");
        formObj.css("border", "2px solid #ebebeb");
        item = formObj.val();
        if (item.length <= 2) {
            formObj.css("border", "2px solid #cd201f");
            fillerror = true;
        } else {
            formObj.css("border", "2px solid #ebebeb");
        }
    }

    if ($("#ogrenci_dogum_tarih")) {
        formObj = $("#ogrenci_dogum_tarih");
        formObj.css("border", "2px solid #ebebeb");
        item = formObj
            .val()
            .split("/")
            .reverse()
            .join("-");
        if (item.length < 10) {
            formObj.css("border", "2px solid #cd201f");
            fillerror = true;
        } else {
            formObj.css("border", "2px solid #ebebeb");
        }
    }

    if ($("#veli_adi")) {
        formObj = $("#veli_adi");
        formObj.css("border", "2px solid #ebebeb");
        item = formObj.val();
        if (item.length <= 2) {
            formObj.css("border", "2px solid #cd201f");
            fillerror = true;
        } else {
            formObj.css("border", "2px solid #ebebeb");
        }
    }

    if ($("#veli_soyadi")) {
        formObj = $("#veli_soyadi");
        formObj.css("border", "2px solid #ebebeb");
        item = formObj.val();
        if (item.length <= 2) {
            formObj.css("border", "2px solid #cd201f");
            fillerror = true;
        } else {
            formObj.css("border", "2px solid #ebebeb");
        }
    }

    if ($("#veli_telefon")) {
        formObj = $("#veli_telefon");
        formObj.css("border", "2px solid #ebebeb");
        item = formObj.cleanVal();
        item = "5" + item;
        if (item.length < 10) {
            formObj.css("border", "2px solid #cd201f");
            fillerror = true;
        } else {
            formObj.css("border", "2px solid #ebebeb");
        }
    }

    if (document.getElementById("permission")) {
        formObj = document.getElementById("permission");
        formObj.style.border = "";
        item = formObj.checked;
        if (!item) fillerror = true;
    }

    if (!fillerror) {
        Register();
    }
}

function Register() {
    var target = "https://scoutive.online/api/v1/create/player/preregistration";

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

    $.ajax({
        type: "POST",
        url: target,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
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
        }),
        success: function(response) {
            if (response.status.code === 1020) {
                Swal.fire({
                    icon: "success",
                    title: "Başarılı",
                    text: "Kaydınız alınmıştır. En kısa sürede iletişime geçilecektir.",
                    confirmButtonText: "Harika"
                });
                $("#preRegistrationForm")[0].reset()
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Hata Oluştu",
                    text: "Üzgünüz, bir hata ile karşılaştık lütfen tekrar deneyin!",
                    confirmButtonText: "Tamam"
                });
            }
        },
        error: function(response) {
            Swal.fire({
                icon: "error",
                title: "Hata Oluştu",
                text: "Üzgünüz, bir hata ile karşılaştık lütfen tekrar deneyin!",
                confirmButtonText: "Tamam"
            });
        }
    });
}
