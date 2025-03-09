<?php

header("Access-Control-Allow-Origin: https://digitaldemomachine.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'config/connection.php';
session_start();

// Set session timeout duration in seconds (15 minutes)
$session_timeout = 15 * 60; // 15 minutes

// Check if the session has expired
if (isset($_SESSION['login_time'])) {
    $elapsed_time = time() - $_SESSION['login_time'];
    if ($elapsed_time > $session_timeout) {
        // Session expired, log out the user
        session_unset(); // Unset all session variables
        session_destroy(); // Destroy the session
        echo json_encode(["status" => "error", "message" => "Session expired, please log in again."]);
        exit();
    }
}

// Update session login time after activity
$_SESSION['login_time'] = time();

// Check if JSON input is received
$data = json_decode(file_get_contents("php://input"), true);

// Validate if data is not null
if ($data === null) {
    echo json_encode(["status" => "error", "message" => "Invalid input data"]);
    exit();
}

// Check if necessary fields exist in the request
if (!isset($data['name']) || !isset($data['password'])) {
    echo json_encode(["status" => "error", "message" => "Missing username or password"]);
    exit();
}

$name = $data['name'];
$password = $data['password'];

// Query to check if user exists
$result = $con->query("SELECT * FROM sub_admins WHERE name='$name'");

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    // Compare password directly without hashing
    if ($password === $user['password']) {
        // Store user details in the session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['name'];

        echo json_encode(["status" => "success", "message" => "Login successful", "user" => $user]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
}