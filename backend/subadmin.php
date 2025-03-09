<?php
include 'config/connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $electionSymbolPath = "";
    if (!empty($_FILES['electionSymbol']['name'])) {
        $fileName = time() . '_' . basename($_FILES['electionSymbol']['name']);
        $targetFilePath = $uploadDir . $fileName;

        if (move_uploaded_file($_FILES['electionSymbol']['tmp_name'], $targetFilePath)) {
            $electionSymbolPath = $targetFilePath;
        } else {
            echo json_encode(["error" => "File upload failed."]);
            exit();
        }
    }

    if (!isset($_POST['name'], $_POST['password'], $_POST['date'], $_POST['startTime'], $_POST['endTime'], $_POST['party_symbol'])) {
        echo json_encode(["error" => "Missing required fields."]);
        exit();
    }

    $name = $_POST['name'];
    $password = $_POST['password'];  // Use the password as it is (no hashing)
    $address = $_POST['address'];
    $phone_number = $_POST['phoneNumber']; // Fetch the phone number from POST
    $date = $_POST['date'];
    $party_symbol = $_POST['party_symbol'];
    // $last_three_digits = substr($phone_number, -3); // Extract last 3 digits

    $timestamp = strtotime($date);
    $hindi_months = ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
    $month_hindi = $hindi_months[date("n", $timestamp) - 1];
    $year = date("Y", $timestamp);

    $start_time = date("h:i A", strtotime($_POST['startTime']));
    $end_time = date("h:i A", strtotime($_POST['endTime']));

    // $user_link = "https://digitaldemomachine.com/" . strtolower(str_replace(" ", "-", $name)) . $last_three_digits;
    $user_link = "https://digitaldemomachine.com/" . strtolower(str_replace(" ", "-", $name));

    $sql = "INSERT INTO sub_admins (name, password, address, phone_number, election_symbol, party_symbol, date, month_hindi, year, start_time, end_time, user_link) 
            VALUES ('$name', '$password', '$address', '$phone_number', '$electionSymbolPath', '$party_symbol', '$date', '$month_hindi', '$year', '$start_time', '$end_time', '$user_link')";

    if ($con->query($sql) === TRUE) {
        echo json_encode(["message" => "Sub-Admin created successfully", "user_link" => $user_link]);
    } else {
        echo json_encode(["error" => "Database error: " . $con->error]);
    }
}

$con->close();