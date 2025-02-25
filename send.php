<?php
session_start();

$errors = [];

// Vérifications et définitions des messages d'erreurs
if (empty($_POST['name'])) {
    $errors['name'] = "Vous n'avez pas précisé votre nom";
}
if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = "Vous n'avez pas précisé votre email ou alors celui-ci n'est pas valide";
}
if (empty($_POST['object'])) {
    $errors['object'] = "Vous n'avez pas précisé votre objet";
}
if (empty($_POST['message'])) {
    $errors['message'] = "Vous n'avez pas précisé votre message";
}

// Si il y a des erreurs, on les stocke pour pouvoir les récupérer pour les afficher
if (!empty($errors)) {
    $_SESSION['monapp']['errors'] = $errors;
    $_SESSION['monapp']['data_memory'] = $_POST;
} else {
    $email_destinataire = 'jessica.deplanche@gmail.com'; // A CHANGER PAR VOTRE EMAIL
    $email = htmlspecialchars($_POST['email']);
    $object = "Formulaire de contact Portfolio : " . htmlspecialchars($_POST['object']);
    $message = "Nom : " . htmlspecialchars($_POST['name']);
    $message .= "\nMessage : " . htmlspecialchars($_POST['message']);
    $headers = 'From: ' . $email;

    if (mail($email_destinataire, $object, $message, $headers)) {
        $_SESSION['monapp']['success'] = 1;
    } else {
        $errors['fail'] = "L'envoi a échoué";
    }
}

// Redirection vers la page d'accueil
header('Location: index.php');
exit();
?>
