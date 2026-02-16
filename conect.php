<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "contact_form_db"; // ✅ yahi aapka DB name hai

$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// echo "Connected successfully"; // testing ke liye
?>
