<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html");

// Fetch username from URL
$username = isset($_GET['username']) ? htmlspecialchars($_GET['username']) : "Guest";
$previewImage = "https://digitaldemomachine.com/backend/uploads/preview.jpg"; // Ensure this is a valid image URL

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vote for <?php echo $username; ?></title>

    <!-- WhatsApp Open Graph Meta Tags -->
    <meta property="og:image" content="<?php echo $previewImage; ?>" />
    <meta property="og:image:secure_url" content="<?php echo $previewImage; ?>" />
    <meta property="og:title" content="Vote for <?php echo $username; ?>" />
    <meta property="og:description" content="मैंने <?php echo $username; ?> को वोट किया। आप भी कीजिए!" />
    <meta property="og:url" content="https://digitaldemomachine.com/<?php echo $username; ?>" />
</head>

<body>
    <h1>Vote for <?php echo $username; ?></h1>
    <img src="<?php echo $previewImage; ?>" alt="Preview Image" width="200px">
</body>

</html>