<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

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
    $sifreTekrar = $_POST['confirmPassword'];

    if ($sifre !== $sifreTekrar) {
        die("Şifreler eşleşmiyor!");
    }

    $sqlCheck = "SELECT * FROM sil_users WHERE username = ?";
    $stmtCheck = $conn->prepare($sqlCheck);
    $stmtCheck->bind_param("s", $kullaniciAdi);
    $stmtCheck->execute();
    $resultCheck = $stmtCheck->get_result();

    if ($resultCheck->num_rows > 0) {
        die("Bu kullanıcı adı zaten mevcut!");
    }

    $hashedPassword = password_hash($sifre, PASSWORD_DEFAULT);

    $sqlInsert = "INSERT INTO sil_users (username, password) VALUES (?, ?)";
    $stmtInsert = $conn->prepare($sqlInsert);
    $stmtInsert->bind_param("ss", $kullaniciAdi, $hashedPassword);

    if ($stmtInsert->execute()) {
        echo "Kayıt başarılı! <a href='index.html'>Giriş yapmak için tıklayın.</a>";
    } else {
        echo "Kayıt sırasında bir hata oluştu: " . $stmtInsert->error;
    }

    $stmtCheck->close();
    $stmtInsert->close();
}

$conn->close();
?>
