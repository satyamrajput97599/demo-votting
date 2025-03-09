<?php

include 'config/connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Order by ID in descending order to show the latest entry first
$sql = "SELECT id, name, password, address, phone_number, election_symbol, party_symbol, date, start_time, end_time, user_link, month_hindi, status 
        FROM sub_admins 
        ORDER BY id DESC"; // Latest entry will appear first

$result = $con->query($sql);

$subAdmins = [];
while ($row = $result->fetch_assoc()) {
    $subAdmins[] = $row;
}

echo json_encode($subAdmins);

$con->close();

?>