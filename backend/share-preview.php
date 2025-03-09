<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html");

// Get Parameters
$candidate = isset($_GET['candidate']) ? htmlspecialchars($_GET['candidate']) : "Unknown";
$symbol = isset($_GET['symbol']) ? htmlspecialchars($_GET['symbol']) : "default";
$image = isset($_GET['image']) ? htmlspecialchars($_GET['image']) : "default";

// Construct Image URL dynamically
$symbolUrl = "https://digitaldemomachine.com/backend/uploads/$image?" . time();
$previewUrl = "https://digitaldemomachine.com/backend/share-preview.php?candidate=" . urlencode($candidate) . "&symbol=" . urlencode($image);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vote for <?php echo $candidate; ?></title>

    <!-- WhatsApp & Facebook Meta Tags -->
    <meta property="og:image" content="<?php echo $symbolUrl; ?>" />
    <meta property="og:image:secure_url" content="<?php echo $symbolUrl; ?>" />
    <meta property="og:image:type" content="image/" />
    <meta property="og:image:width" content="600" />
    <meta property="og:image:height" content="314" />

    <meta property="og:title" content="Vote for <?php echo $candidate; ?>" />
    <meta property="og:description" content="मैंने <?php echo $candidate; ?> को वोट किया। आप भी कीजिए!" />

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Vote for <?php echo $candidate; ?>">
    <meta name="twitter:description" content="मैंने <?php echo $candidate; ?> को वोट किया। आप भी कीजिए!">
    <meta name="twitter:image" content="<?php echo $symbolUrl; ?>">
</head>

<body>
    <h1>Vote for <?php echo $candidate; ?></h1>
    <img src="<?php echo $symbolUrl; ?>" alt="Candidate Symbol" width="200px">
</body>

</html>