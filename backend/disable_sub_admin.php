<?php
// enable_sub_admin.php

header("Content-Type: application/json");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'config/connection.php';

// Get the data from the request
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id) || !isset($data->status)) {
    echo json_encode(['success' => false, 'message' => 'ID and Status are required.']);
    exit();
}

$id = $data->id;
$status = $data->status; // Status 1 for Enable, 0 for Disable

// SQL query to update the status of the sub-admin
$query = "UPDATE sub_admins SET status = ? WHERE id = ?";
$stmt = $con->prepare($query);
$stmt->bind_param("ii", $status, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Sub-admin status updated successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update sub-admin status.']);
}

$stmt->close();
$con->close();
