function validateForm() {
    // Ambil nilai dari input
    let fullName = document.getElementById('fullName').value;
    let username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let whatsapp = document.getElementById('whatsapp').value;
    const profileImage = document.getElementById('profileImage').files[0];

    // Validasi Nama (Proper Case dan hanya huruf dan spasi)
    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(fullName)) {
        alert("Nama lengkap hanya boleh mengandung huruf dan spasi.");
        return false;
    }

    // Mengubah Nama menjadi Proper Case
    const properCaseName = toProperCase(fullName);
    document.getElementById('fullName').value = properCaseName;

    // Validasi Username (Lowercase a-z dan 0-9, panjang 3-20)
    username = username.toLowerCase(); // Mengubah username menjadi lowercase
    const usernamePattern = /^[a-z0-9]{3,20}$/;
    if (!usernamePattern.test(username)) {
        alert("Username hanya boleh mengandung huruf kecil (a-z) dan angka (0-9), dan panjangnya antara 3 hingga 20 karakter.");
        return false;
    }
    document.getElementById('username').value = username;

    // Validasi Password (Harus mengandung huruf kecil, besar, angka, dan karakter spesial, panjang 6-20)
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,20}$/.test(password)) {
        alert("Password harus mengandung minimal satu huruf kecil, satu huruf besar, satu angka, dan satu karakter spesial (!@#$%^&*), dengan panjang antara 6 hingga 20 karakter.");
        return false;
    }

    // Validasi WhatsApp (Harus diawali dengan kode negara 62, panjang 11-14 digit)
    if (whatsapp.startsWith('0')) {
        whatsapp = '62' + whatsapp.slice(1); // Mengubah awalan 0 menjadi 62
    }

    if (!/^\+?62\d{9,14}$/.test(whatsapp)) {
        alert("Nomor WhatsApp tidak valid. Pastikan nomor diawali dengan +62 atau 62 dan panjangnya antara 11 hingga 14 digit.");
        return false;
    }
    document.getElementById('whatsapp').value = whatsapp;

    // Validasi Gambar Profil (Harus JPG, ukuran antara 50-500KB)
    if (profileImage) {
        const fileType = profileImage.type;
        const fileSize = profileImage.size;

        if (fileType !== 'image/jpeg') {
            alert("Hanya file JPG yang diperbolehkan untuk gambar profil.");
            return false;
        }

        const minSize = 50 * 1024; // 50 KB
        const maxSize = 500 * 1024; // 500 KB
        if (fileSize < minSize || fileSize > maxSize) {
            alert("Ukuran gambar harus antara 50 KB hingga 500 KB.");
            return false;
        }
    } else {
        alert("Gambar profil wajib diunggah.");
        return false;
    }

    // Jika validasi berhasil, tampilkan data yang dimasukkan dalam container
    const userData = `
        <div class="result-container">
            <h3>Data Pengguna yang Didaftarkan:</h3>
            <ul>
                <li><strong>Nama Lengkap:</strong> ${properCaseName}</li>
                <li><strong>Username:</strong> ${username}</li>
                <li><strong>Password:</strong> ${password}</li>
                <li><strong>WhatsApp:</strong> ${whatsapp}</li>
                <li><strong>Gambar Profil:</strong> ${profileImage.name}</li>
            </ul>
        </div>
    `;

    // Tampilkan hasil data pengguna
    const resultContainer = document.createElement('div');
    resultContainer.innerHTML = userData;
    document.body.appendChild(resultContainer); // Menambahkan data ke body di bawah form

    alert("Registrasi berhasil! Selamat datang, " + properCaseName);

    // Arahkan ke halaman index.html
    window.location.href = '../index.html';

    return false; // Prevent form submission for demonstration
}

// Fungsi untuk mengubah nama menjadi Proper Case
function toProperCase(str) {
    return str
        .toLowerCase()
        .replace(/\b\w/g, function (char) {
            return char.toUpperCase();
        });
}