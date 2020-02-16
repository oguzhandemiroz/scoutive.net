<?php
$errorMSG = "";


if (empty($_POST["name"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["name"];
}

if (empty($_POST["email"])) {
    $errorMSG = "Email is required ";
} else {
    $email = $_POST["email"];
}

if (empty($_POST["message"])) {
    $errorMSG = "Message is required ";
} else {
    $message = $_POST["message"];
}

if (empty($_POST["terms"])) {
    $errorMSG = "Terms is required ";
} else {
    $terms = $_POST["terms"];
}
if (empty($_POST["location"])) {
    $errorMSG = "location is required ";
} else {
    $location = $_POST["location"];
}
if (empty($_POST["referrer"])) {
    $errorMSG = "referrer is required ";
} else {
    $referrer = $_POST["referrer"];
}

$EmailTo = "info@scoutive.net";
$ContactEmail = "contact@scoutive.net";
$Subject = $ContactEmail . " Adresinden Mesaj Geldi!";

// prepare email body text
$Body = "";
$Body .= "Ad Soyad: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Mesaj: ";
$Body .= $message;
$Body .= "\n";
$Body .= "İzin: ";
$Body .= $terms;
$Body .= "\n";
$Body .= "\n";
$Body .= "------------";
$Body .= "\n";
$Body .= "Web Site Adresi: ";
$Body .= $location;
$Body .= "\n";
$Body .= "Nerden Geldi?: ";
$Body .= $referrer;
$Body .= "\n";

//captcha
        $response=$_POST["g-recaptcha-response"];
        $secret="6Lex1tcUAAAAAD_jeOqPSPTxX15jK85nQJ0fo0NI";
        $remoteip=$_SERVER["REMOTE_ADDR"];
        $captcha=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&response=".$response."&remoteip=".$remoteip);
        print_r($captcha, $response);
        $result=json_decode($captcha);

        if($result->success==1) {
// send email
if($_POST["email"]){
$success = mail($EmailTo, $Subject, $Body, "From:".$ContactEmail);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "Mesaj Gönderimi Başarılı";
}else{
    if($errorMSG == ""){
        echo "Hay aksi, bir şeyler ters gitti. :(";
    } else {
        echo $errorMSG;
    }
}}}
else {echo "Lütfen güvenlik işlemini tamamlayınız";}
?>