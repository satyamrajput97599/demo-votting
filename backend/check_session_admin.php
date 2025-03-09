<?php
session_start(); // Start session before headers

header("Access-Control-Allow-Origin: https://digitaldemomachine.com"); // Allow frontend domain
header("Access-Control-Allow-Credentials: true"); // Allow cookies/sessions
header("Content-Type: application/json");

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        "status" => "logged_in",
        "user" => [
            "id" => $_SESSION['user_id'],
            "username" => $_SESSION['username'],
            
        ]
    ]);
} else {
    echo json_encode(["status" => "logged_out"]);
}
?>