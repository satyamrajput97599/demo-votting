<?php
session_start();

header("Access-Control-Allow-Origin: https://digitaldemomachine.com"); // Adjust to your React app URL
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Unset session variables
$_SESSION = array();
session_destroy();

// Remove session cookie
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}

// Send response
echo json_encode(["status" => "success"]);
exit();
?>