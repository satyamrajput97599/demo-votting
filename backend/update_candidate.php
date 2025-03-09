<?php
include 'config/connection.php';

header("Access-Control-Allow-Origin: https://digitaldemomachine.com");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Check if the required keys exist in the POST data
if (isset($_POST['candidate_name'], $_POST['candidate_index'], $_POST['user_id'])) {
    $candidate_name = $_POST['candidate_name'];
    $candidate_index = $_POST['candidate_index'];
    $user_id = $_POST['user_id'];

    // Initialize image variables to null
    $candidate_image_path = null;
    $symbol_image_path = null;

    // Check if the candidate image is being uploaded
    if (isset($_FILES['candidate_image'])) {
        $candidate_image = $_FILES['candidate_image'];
        // Define the upload directory
        $upload_dir = 'uploads/';
        $candidate_image_name = basename($candidate_image['name']);  // Get only the file name

        // Define the full path where the file will be stored
        $candidate_image_path = $upload_dir . $candidate_image_name;

        // Move uploaded file to the designated folder
        if (!move_uploaded_file($candidate_image['tmp_name'], $candidate_image_path)) {
            echo json_encode(['status' => 'error', 'message' => 'Candidate image upload failed']);
            exit;
        }
    }

    // Check if the symbol image is being uploaded
    if (isset($_FILES['candidate_symbol_image'])) {
        $symbol_image = $_FILES['candidate_symbol_image'];
        // Define the upload directory
        $upload_dir = 'uploads/';
        $symbol_image_name = basename($symbol_image['name']);  // Get only the file name

        // Define the full path where the file will be stored
        $symbol_image_path = $upload_dir . $symbol_image_name;

        // Move uploaded file to the designated folder
        if (!move_uploaded_file($symbol_image['tmp_name'], $symbol_image_path)) {
            echo json_encode(['status' => 'error', 'message' => 'Symbol image upload failed']);
            exit;
        }
    }

    // Prepare the SQL query to update the database
    $update_fields = [
        "candidate_name = '$candidate_name'"
    ];

    if ($candidate_image_path) {
        $update_fields[] = "candidate_image = '$candidate_image_name'";  // Store only the image name
    }

    if ($symbol_image_path) {
        $update_fields[] = "candidate_symbol_image = '$symbol_image_name'";  // Store only the symbol image name
    }

    $sql = "UPDATE candidates SET " . implode(", ", $update_fields) . " WHERE user_id = '$user_id' AND candidate_index = '$candidate_index'";

    // Execute the SQL query to update the database
    if (mysqli_query($con, $sql)) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Database update failed']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
}