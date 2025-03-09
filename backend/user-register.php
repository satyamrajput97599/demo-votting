<?php
include 'config/connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Get the raw POST data
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->email) && !empty($data->password) && !empty($data->phone)) {
    $username = $con->real_escape_string($data->username);
    $email = $con->real_escape_string($data->email);
    $phone = $con->real_escape_string($data->phone);
    $password = $data->password;

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Check if user already exists
    $checkQuery = "SELECT * FROM userlogin WHERE email='$email'";
    $result = $con->query($checkQuery);

    if ($result->num_rows > 0) {
        echo json_encode(["error" => "User already exists!"]);
    } else {
        // Insert user into the database
        $sql = "INSERT INTO userlogin (username, email, phone, password) VALUES ('$username', '$email', '$phone', '$hashedPassword')";
        if ($con->query($sql)) {
            echo json_encode(["message" => "Registration Successful!"]);
        } else {
            echo json_encode(["error" => "Registration failed. Try again!"]);
        }
    }
} else {
    echo json_encode(["error" => "All fields are required!"]);
}
?>