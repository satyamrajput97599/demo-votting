<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins (Use specific domain in production)
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include 'config/connection.php';

// Get JSON Input
$data = json_decode(file_get_contents("php://input"), true);

// Validate Input
if (!isset($data["username"]) || !isset($data["email"]) || !isset($data["password"])) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

$username = $data["username"];
$email = $data["email"];
$password = password_hash($data["password"], PASSWORD_BCRYPT); // Secure password hashing

// Insert Data
$stmt = $con->prepare("INSERT INTO admin (username, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $password);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "User registered successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}

// Close Connection
$stmt->close();
$con->close();
?>