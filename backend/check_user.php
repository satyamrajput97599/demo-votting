<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Content-Type: text/html; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection
include 'config/connection.php';
if (!$con) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . mysqli_connect_error()]));
}

// Get username from URL
if (!isset($_GET['username']) || empty(trim($_GET['username']))) {
    echo json_encode(["status" => "error", "message" => "Username parameter is missing or empty"]);
    exit;
}

$username = trim(strtolower($_GET['username']));

// Prepared Statement to prevent SQL Injection
$stmt = $con->prepare("SELECT 
sa.name, sa.party_symbol, sa.election_symbol, sa.date, sa.start_time, sa.end_time, sa.month_hindi, sa.year, sa.status, sa.address,
c.id AS candidate_id, c.candidate_name, c.candidate_image, c.candidate_symbol_image, c.candidate_index, c.button_checked
FROM sub_admins sa
LEFT JOIN candidates c ON sa.id = c.user_id
WHERE TRIM(LOWER(sa.name)) = ?");

$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $userData = [];
    $accessDenied = false;
    $candidates = array_fill(0, 16, null); // Initialize an array with 16 empty slots

    while ($row = $result->fetch_assoc()) {
        if ($row['status'] == 1) {
            $accessDenied = true;
            continue;
        }

        if (empty($userData)) {
            $userData = [
                "status" => "success",
                "message" => "User found",
                "username" => $row['name'],
                "address" => $row['address'],
                "election_symbol" => $row['election_symbol'], // Ensure full URL
                "party_symbol" => $row['party_symbol'],
                "date" => $row['date'],
                "start_time" => $row['start_time'],
                "end_time" => $row['end_time'],
                "month_hindi" => $row['month_hindi'],
                "year" => $row['year'],
                "candidates" => []
            ];
        }

        if (!empty($row['candidate_id']) && is_numeric($row['candidate_index'])) {
            $index = intval($row['candidate_index']) - 1; // Convert to zero-based index
            if ($index >= 0 && $index < 16) {
                $candidates[$index] = [
                    "id" => $row['candidate_id'],
                    "name" => $row['candidate_name'],
                    "image" => $row['candidate_image'],
                    "symbol" => $row['candidate_symbol_image'],
                    "index" => $row['candidate_index'],
                    "button_checked" => strval($row['button_checked']) // Ensure it's a string
                ];
            }
        }
    }

    if ($accessDenied && empty($userData)) {
        echo json_encode(["status" => "error", "message" => "Access denied"]);
        exit;
    }

    // Ensure 16 rows are always sent
    for ($i = 0; $i < 16; $i++) {
        if ($candidates[$i] === null) {
            $candidates[$i] = [
                "id" => null,
                "name" => null,
                "image" => null,
                "symbol" => null,
                "index" => $i + 1
            ];
        }
    }

    $userData["candidates"] = $candidates;
    echo json_encode($userData);
} else {
    echo json_encode(["status" => "error", "message" => "User Not Found"]);
}

$stmt->close();
$con->close();