<?php
// include 'config/connection.php';
session_start();

// Destroy session properly
session_unset();
session_destroy();
setcookie(session_name(), '', time() - 3600, '/'); // Delete session cookie

// Allow CORS
header("Access-Control-Allow-Origin: https://digitaldemomachine.com");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

echo json_encode(["status" => "success", "message" => "Logged out successfully"]);
exit;
?>