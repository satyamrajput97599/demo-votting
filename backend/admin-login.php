<?php
header("Access-Control-Allow-Origin: https://digitaldemomachine.com"); // Allow React App
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true"); // Allow session cookies

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'config/connection.php';
session_start();

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode(["status" => "error", "message" => "Missing username or password"]);
    exit;
}

$username = $data['username']; // Use 'username' instead of 'email'
$password = $data['password'];

// Prepare and execute SQL statement
$sql = "SELECT id, username, password FROM admin WHERE username=?";
$stmt = $con->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($id, $username, $hashed_password);
    $stmt->fetch();

    // Verify password
    if (password_verify($password, $hashed_password)) {
        $_SESSION['user_id'] = $id;
        $_SESSION['username'] = $username;

        echo json_encode(["status" => "success", "message" => "Login successful", "user" => ["id" => $id, "username" => $username]]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
}

$stmt->close();
?>
