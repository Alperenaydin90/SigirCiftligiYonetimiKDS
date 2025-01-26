<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "testdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Bağlantı başarısız: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $kullaniciAdi = $_POST['username'];
    $sifre = $_POST['password'];

    $sql = "SELECT * FROM sil_users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $kullaniciAdi);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        if (password_verify($sifre, $user['password'])) {
            $_SESSION['username'] = $kullaniciAdi;
            header("Location: dashboard.html");
            exit();
        } else {
            echo "Şifre hatalı!";
        }
    } else {
        echo "Kullanıcı adı bulunamadı!";
    }
    $stmt->close();
}

$conn->close();
?>

