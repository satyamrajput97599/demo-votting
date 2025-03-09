<?php
include 'config/connection.php';

header("Access-Control-Allow-Origin: https://digitaldemomachine.com");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_GET['user_id'])) {
        echo json_encode(["status" => "error", "message" => "User ID missing"]);
        exit();
    }

    $user_id = $_GET['user_id'];

    // Fetch candidate data including button_checked value
    $query = "SELECT candidate_index, candidate_name, candidate_image, candidate_symbol_image, button_checked FROM candidates WHERE user_id = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $candidates = [];
    while ($row = $result->fetch_assoc()) {
        $candidates[$row['candidate_index'] - 1] = [
            "name" => $row['candidate_name'],
            "image" => $row['candidate_image'],
            "symbolImage" => $row['candidate_symbol_image'],
            "buttonChecked" => $row['button_checked'], // Store as is
            "noChecked" => $row['button_checked'] === 1 // Corrected
        ];
        
    }

    echo json_encode(["status" => "success", "candidates" => $candidates]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}

$con->close();
?>