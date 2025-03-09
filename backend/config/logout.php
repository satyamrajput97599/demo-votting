<?php
session_start(); // Start the session

header("Access-Control-Allow-Origin: https://digitaldemomachine.com"); // Allow frontend domain
header("Access-Control-Allow-Credentials: true"); // Allow cookies/sessions
header("Content-Type: application/json");

// Destroy session and unset user data
session_unset();
session_destroy();

echo json_encode(["message" => "Logout successful!"]);
?>