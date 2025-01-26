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

$query = "SELECT * FROM sil_kategori1";  // Kategori 1 tablosu kullanılıyor
$stmt = $pdo->prepare($query);
$stmt->execute();

$veriler = $stmt->fetchAll(PDO::FETCH_ASSOC);

$html = '<table>
            <thead>
                <tr>
                    <th>İnek Adı</th>
                    <th>Yem Miktarı (kg)</th>
                    <th>Yem Türü</th>
                    <th>İnek Sağlık Durumu</th>
                    <th>Yaş</th>
                    <th>Çevre</th>
                    <th>Süt Miktarı (Litre)</th>
                    <th>Kilo (kg)</th>
                </tr>
            </thead>
            <tbody>';

if ($veriler) {
    foreach ($veriler as $veri) {
        $html .= '<tr>
                    <td>' . htmlspecialchars($veri['inek_adi']) . '</td>
                    <td>' . htmlspecialchars($veri['yem_miktari']) . '</td>
                    <td>' . htmlspecialchars($veri['yem_turu']) . '</td>
                    <td>' . htmlspecialchars($veri['saglik_durumu']) . '</td>
                    <td>' . htmlspecialchars($veri['yas']) . '</td>
                    <td>' . htmlspecialchars($veri['cevre']) . '</td>
                    <td>' . htmlspecialchars($veri['sut_miktari']) . '</td>
                    <td>' . htmlspecialchars($veri['kilo']) . '</td>
                  </tr>';
    }
} else {
    $html .= '<tr><td colspan="8">Henüz veri yok.</td></tr>';
}

$html .= '</tbody></table>';

echo $html;
?>
