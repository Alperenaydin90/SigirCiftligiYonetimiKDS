<?php
$host = 'localhost';
$dbname = 'testdb';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Bağlantı başarısız: " . $e->getMessage());
}

$inek_adi = $_POST['inek_adi'];
$yem_miktari = $_POST['yem_miktari'];
$yem_turu = $_POST['yem_turu'];
$saglik_durumu = $_POST['saglik_durumu'];
$yas = $_POST['yas'];
$cevre = $_POST['cevre'];
$sut_miktari = $_POST['sut_miktari'];
$kilo = $_POST['kilo'];

$query = "INSERT INTO sil_kategori1 (inek_adi,yem_miktari, yem_turu, saglik_durumu, yas, cevre, sut_miktari, kilo)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $pdo->prepare($query);
$stmt->execute([$inek_adi, $yem_miktari, $yem_turu, $saglik_durumu, $yas, $cevre, $sut_miktari, $kilo]);

echo "Veri başarıyla kaydedildi!" 
?>
<a href="http://localhost/sayfa/dashboard.html" > Kontrol et </a>; 