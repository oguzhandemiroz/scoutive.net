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
$Subject = $email . " Adresinden Mesaj Geldi!";

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

// send email
if($_POST["email"]){
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "Mesaj Gönderimi Başarılı";
}else{
    if($errorMSG == ""){
        echo "Hay aksi, bir şeyler ters gitti. :(";
    } else {
        echo $errorMSG;
    }
}}
?>