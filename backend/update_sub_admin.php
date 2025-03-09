<?php
include 'config/connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $address = $_POST['address'];
    $phone_number = $_POST['phone_number'];
    $party_symbol = $_POST['party_symbol'];
    $date = $_POST['date'];
    $start_time = $_POST['start_time'];
    $end_time = $_POST['end_time'];
    
    // Directly use the plain password, no hashing
    $password = !empty($_POST['password']) ? $_POST['password'] : null;

    // Convert new date to Hindi month and extract year
    $timestamp = strtotime($date);
    $hindi_months = ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
    $month_hindi = $hindi_months[date("n", $timestamp) - 1]; // Get Hindi month
    $year = date("Y", $timestamp); // Extract year

    // Fetch existing image from the database
    $query = "SELECT election_symbol FROM sub_admins WHERE id=?";
    $stmt = $con->prepare($query);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->bind_result($existingImage);
    $stmt->fetch();
    $stmt->close();

    $query = "UPDATE sub_admins SET name=?, address=?, phone_number=?, party_symbol=?, date=?, month_hindi=?, year=?, start_time=?, end_time=?";
    $params = [$name, $address, $phone_number, $party_symbol, $date, $month_hindi, $year, $start_time, $end_time];

    // Add password to query only if provided
    if ($password !== null) {
        $query .= ", password=?";
        $params[] = $password;  // Store plain password
    }

    // Handle Image Upload
    if (isset($_FILES['election_symbol']) && $_FILES['election_symbol']['error'] == 0) {
        $imageName = time() . "_" . basename($_FILES["election_symbol"]["name"]);
        $targetDir = "uploads/";
        $targetFile = $targetDir . $imageName; // Full path to be stored in the database

        if (move_uploaded_file($_FILES["election_symbol"]["tmp_name"], $targetFile)) {
            // Delete old image if exists
            if (!empty($existingImage) && file_exists($existingImage)) {
                unlink($existingImage);
            }

            $query .= ", election_symbol=?";
            $params[] = $targetFile; // Store full path instead of just the file name
        } else {
            echo json_encode(["error" => "Failed to upload image"]);
            exit;
        }
    }

    $query .= " WHERE id=?";
    $params[] = $id;

    // Execute the update query
    $stmt = $con->prepare($query);
    $stmt->execute($params);

    echo json_encode(["message" => "Sub-admin updated successfully"]);
} else {
    echo json_encode(["error" => "Invalid request"]);
}

$con->close();
?>