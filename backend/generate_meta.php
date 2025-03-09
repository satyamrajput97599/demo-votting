<?php

include 'config/connection.php';

header("Content-Type: text/html; charset=UTF-8");

if (!isset($_GET['candidate_id'])) {
    die("Candidate ID is missing.");
}

$candidateId = $_GET['candidate_id'];
// Fetch candidate details from the database
include 'config/connection.php';

$stmt = $con->prepare("SELECT candidate_name, candidate_image FROM candidates WHERE id = ?");
$stmt->bind_param("i", $candidateId);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    $imageUrl = "https://digitaldemomachine.com/backend/uploads/" . $row['candidate_image'];
    echo "
    <html>
    <head>
        <meta property='og:title' content='Vote for " . htmlspecialchars($row['candidate_name']) . "'>
        <meta property='og:image' content='" . $imageUrl . "'>
        <meta property='og:image:width' content='400'>
        <meta property='og:image:height' content='300'>
        <meta property='og:image:type' content='image/jpeg'>
    </head>
    <body>
        <p>Click the link to vote!</p>
    </body>
    </html>";
} else {
    echo "Candidate not found.";
}

$stmt->close();
$con->close();