<?php

use PHPMailer\PHPMailer\PHPMailer;

require_once 'PHPMailer/src/PHPMailer.php';
require_once 'PHPMailer/src/Exception.php';
require_once 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);


if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $contact = $_POST['contact_number'];
    $query_type = $_POST['query_type'];
    $message = $_POST['message'];

    function adminEmailBody($email, $name, $contact, $message, $query_type)
    {
        return
            "<div> Hi you have a $query_type from $name.
        <br>
        Please find the contact information below :
        <br>
        Name : $name <br>
        Email : $email <br>
        Contact : $contact <br>
        Message : $message <br>
        </div>";
    }

    function userEmailBody($email, $name, $contact, $message, $query_type)
    {
        return
            "<div>Thank you for registering
        <br>
        We will contact you back in 3 working days.
        <br>
        </div>";
    }

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 587;
        $mail->Username = '5c7ba2a11b4971';
        $mail->Password = '5f06766c633d11';
        $mail->SMTPSecure = 'tls';

        // To Admin
        $mail->setFrom('kunal@40bears.com');
        $mail->addAddress('sethikunal0108@gmail.com');
        $mail->isHTML(true);
        $mail->Subject = "New Enquiry from Caniasset";
        $mail->Body = adminEmailBody($email, $name, $contact, $message, $query_type);

        $mail->send();
        $mail->ClearAllRecipients();

        // To User
        // $mail->setFrom('shahina@40bears.com');
        // $mail->addAddress('shahina@gmail.com');
        // $mail->isHTML(true);
        // $mail->Subject = "Testing";
        // $mail->Body = userEmailBody($email, $name, $contact, $message, $query_type);

        // $mail->send();
        // $mail->ClearAllRecipients();
        $alert = '<div><span> Thank you for the enquiry, we will get back to you shortly. </span></div>';
        header('Location: https://caniasset.canaris.in/#contact?status=true');
    } catch (Exception $e) {
        $alert = '<div><span>Message not sent, Please try again later</span></div>';
        header('Location: https://caniasset.canaris.in/#contact?status=false');
    }
}
