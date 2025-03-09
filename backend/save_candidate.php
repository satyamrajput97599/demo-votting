<?php
// Include database connection
include 'config/connection.php';

header("Access-Control-Allow-Origin: https://digitaldemomachine.com");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if required fields are set
    if (!isset($_POST['user_id'], $_POST['candidate_name'], $_FILES['candidate_image'], $_FILES['candidate_symbol_image'], $_POST['candidate_index'], $_POST['button_checked'])) {
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit();
    }

    $user_id = intval($_POST['user_id']);
    $candidate_name = trim($_POST['candidate_name']);
    $candidate_index = intval($_POST['candidate_index']);
// Store only 0 or 1 based on selection
$button_checked = isset($_POST['button_checked']) && $_POST['button_checked'] == 1 ? 1 : 0;


    // Validate file upload
    if (empty($_FILES['candidate_image']['tmp_name']) || empty($_FILES['candidate_symbol_image']['tmp_name'])) {
        echo json_encode(["status" => "error", "message" => "File upload failed"]);
        exit();
    }

    // Set the upload directory
    $uploads_dir = "uploads/";
    if (!is_dir($uploads_dir)) {
        mkdir($uploads_dir, 0777, true); // Create directory if it doesn't exist
    }

    // Generate unique file names to prevent overwriting
    $candidate_image_ext = pathinfo($_FILES['candidate_image']['name'], PATHINFO_EXTENSION);
    $candidate_symbol_ext = pathinfo($_FILES['candidate_symbol_image']['name'], PATHINFO_EXTENSION);

    $candidate_image_name = "candidate_" . time() . rand(100, 999) . "." . $candidate_image_ext;
    $candidate_symbol_image_name = "symbol_" . time() . rand(100, 999) . "." . $candidate_symbol_ext;

    // Full paths
    $candidate_image_path = $uploads_dir . $candidate_image_name;
    $candidate_symbol_image_path = $uploads_dir . $candidate_symbol_image_name;

    // Move uploaded files
    if (!move_uploaded_file($_FILES['candidate_image']['tmp_name'], $candidate_image_path) ||
        !move_uploaded_file($_FILES['candidate_symbol_image']['tmp_name'], $candidate_symbol_image_path)) {
        echo json_encode(["status" => "error", "message" => "Failed to move uploaded files"]);
        exit();
    }

    // Check if candidate already exists
    $check_query = "SELECT * FROM candidates WHERE user_id = ? AND candidate_index = ?";
    $stmt = $con->prepare($check_query);
    $stmt->bind_param("ii", $user_id, $candidate_index);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "This candidate has already been added"]);
        exit();
    }

    // Insert candidate data
    $stmt = $con->prepare("INSERT INTO candidates (user_id, candidate_name, candidate_image, candidate_symbol_image, candidate_index, button_checked) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssii", $user_id, $candidate_name, $candidate_image_name, $candidate_symbol_image_name, $candidate_index, $button_checked);

    if (!$stmt->execute()) {
        echo json_encode(["status" => "error", "message" => "Failed to add candidate to the database"]);
        exit();
    }

    echo json_encode(["status" => "success", "message" => "Candidate added successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

$con->close();
?>