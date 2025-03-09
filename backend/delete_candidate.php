<?php
header("Access-Control-Allow-Origin: https://digitaldemomachine.com"); // Allow your frontend's origin
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); // Allow cookies/session handling

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'config/connection.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->user_id) || !isset($data->candidate_index)) {
    echo json_encode(["status" => "error", "message" => "Missing parameters"]);
    exit();
}

$user_id = intval($data->user_id);
$candidate_index = intval($data->candidate_index);

$query = "DELETE FROM candidates WHERE user_id = ? AND candidate_index = ?";
$stmt = $con->prepare($query);
$stmt->bind_param("ii", $user_id, $candidate_index);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Candidate deleted"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to delete"]);
}

$stmt->close();
$con->close();
?>