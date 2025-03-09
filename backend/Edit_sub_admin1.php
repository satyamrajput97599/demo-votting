<?php
include 'config/connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $con->prepare("SELECT id, name, password, address, phone_number, election_symbol, party_symbol, date, start_time, end_time, user_link FROM sub_admins WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        echo json_encode($row);
    } else {
        echo json_encode(["error" => "SubAdmin not found"]);
    }
} else {
    echo json_encode(["error" => "No ID provided"]);
}

$con->close();
?>