document.getElementById('loginForm').addEventListener('submit', function(e) {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === "" || password === "") {
        alert("Kullanıcı adı ve şifre boş bırakılamaz!");
        e.preventDefault();
    }
});
document.getElementById('registerForm').addEventListener('submit', function(e) {
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (password !== confirmPassword) {
        alert("Şifreler eşleşmiyor!");
        e.preventDefault();
    }
});
