<?php
session_start();

header("Access-Control-Allow-Origin: https://digitaldemomachine.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Debugging: Check if session is working
error_log("Session Data: " . print_r($_SESSION, true));

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        "logged_in" => true,
        "user" => [
            "id" => $_SESSION['user_id'],
            "username" => $_SESSION['username'],
        ]
    ]);
} else {
    echo json_encode(["logged_in" => false]);
}
?>