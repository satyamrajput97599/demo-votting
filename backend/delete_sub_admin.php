<?php
include 'config/connection.php'; // Include database connection

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $id = $data['id']; // sub_admin ID

    // Start a transaction for safe execution
    $con->begin_transaction();

    try {
        // Delete all candidates linked to the sub_admin
        $deleteCandidatesQuery = "DELETE FROM candidates WHERE user_id = ?";
        $stmt1 = $con->prepare($deleteCandidatesQuery);
        $stmt1->bind_param("i", $id);
        $stmt1->execute();
        $stmt1->close();

        // Now delete the sub_admin
        $deleteSubAdminQuery = "DELETE FROM sub_admins WHERE id = ?";
        $stmt2 = $con->prepare($deleteSubAdminQuery);
        $stmt2->bind_param("i", $id);
        $stmt2->execute();
        $stmt2->close();

        // Commit transaction
        $con->commit();
        echo json_encode(["message" => "Sub-admin and related candidates deleted successfully"]);
    } catch (Exception $e) {
        $con->rollback();
        echo json_encode(["error" => "Error deleting sub-admin: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Invalid request"]);
}

$con->close();
?>