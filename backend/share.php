<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html");

// Get username and image from URL parameters
$username = isset($_GET['username']) ? htmlspecialchars($_GET['username']) : "Unknown";
$imagePath = isset($_GET['image']) ? htmlspecialchars($_GET['image']) : "default.jpg";

// Fix: Construct the full image URL correctly
$baseImageUrl = "https://digitaldemomachine.com/backend/"; // Ensure this is correct
$fullImageUrl = $baseImageUrl . $imagePath . "?" . time(); // Add timestamp to prevent caching

// Fix: Ensure the preview URL is constructed properly
$previewUrl = "https://digitaldemomachine.com/backend/share-preview.php?candidate=" . urlencode($username) . "&symbol=" . urlencode($fullImageUrl);

// Fix: Assign correct URL
$url = "https://digitaldemomachine.com/" . urlencode($username);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- ✅ Open Graph Meta Tags (Fix Image URL) -->
    <meta property="og:title" content="मैंने डेमो मतदान किया, आप भी कीजिए!">
    <meta property="og:description" content="डेमो मतदान में <?php echo htmlspecialchars($username); ?> का समर्थन करें!">
    <meta property="og:image" content="<?php echo $fullImageUrl; ?>">
    <meta property="og:image:width" content="800">
    <meta property="og:image:height" content="800">
    <meta property="og:url" content="<?php echo $url; ?>">
    <meta property="og:type" content="website">

    <!-- ✅ Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="मैंने डेमो मतदान किया, आप भी कीजिए!">
    <meta name="twitter:description"
        content="डेमो मतदान में <?php echo htmlspecialchars($username); ?> का समर्थन करें!">
    <meta name="twitter:image" content="<?php echo $fullImageUrl; ?>">

    <title>Demo Voting</title>

    <script>
    // ✅ एड्रेस बार से share.php?username=... हटाएँ
    window.history.replaceState({}, "", "<?php echo $url; ?>");

    // ✅ 1 सेकंड बाद सही पेज पर रीडायरेक्ट करें
    setTimeout(function() {
        window.location.href = "<?php echo $url; ?>";
    }, 500);
    </script>
</head>

<body>
    <h2>Redirecting to Demo Voting...</h2>
</body>

</html>