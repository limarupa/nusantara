// Batik Interactive Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Canvas dan konteks
    const canvas = document.getElementById('tshirtCanvas');
    const ctx = canvas.getContext('2d');
    
    // Data motif batik
    const batikPatterns = [
        { id: 1, name: "Parang", color: "#8b4513", pattern: "parang" },
        { id: 2, name: "Mega Mendung", color: "#1e3a8a", pattern: "mega-mendung" },
        { id: 3, name: "Kawung", color: "#000000", pattern: "kawung" },
        { id: 4, name: "Sekar Jagad", color: "#065f46", pattern: "sekar-jagad" },
        { id: 5, name: "Truntum", color: "#7c3aed", pattern: "truntum" },
        { id: 6, name: "Tambal", color: "#b91c1c", pattern: "tambal" },
        { id: 7, name: "Cuwiri", color: "#ca8a04", pattern: "cuwiri" },
        { id: 8, name: "Sido Mukti", color: "#0f766e", pattern: "sido-mukti" }
    ];
    
    // Warna baju
    const shirtColors = [
        { name: "Putih", value: "#ffffff" },
        { name: "Krem", value: "#f5e6d3" },
        { name: "Biru", value: "#3b82f6" },
        { name: "Merah", value: "#dc2626" },
        { name: "Hijau", value: "#10b981" },
        { name: "Hitam", value: "#000000" }
    ];
    
    // State aplikasi
    let currentPattern = batikPatterns[0];
    let currentShirtColor = shirtColors[0].value;
    let patternSize = 100;
    let patternRotation = 0;
    let patternImage = null;
    let isDrawing = false;
    let lastPatternPosition = { x: canvas.width / 2, y: canvas.height / 2 };
    
    // Inisialisasi canvas
    function initCanvas() {
        drawShirt();
        setupPatternGrid();
        setupColorOptions();
        setupEventListeners();
        
        // Buat gambar pattern default
        createPatternImage(currentPattern);
    }
    
    // Menggambar baju di canvas
    function drawShirt() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Warna baju
        ctx.fillStyle = currentShirtColor;
        
        // Gambar bentuk baju (T-shirt sederhana)
        // Tubuh baju
        ctx.beginPath();
        ctx.moveTo(150, 50);
        ctx.lineTo(450, 50);
        ctx.quadraticCurveTo(500, 100, 450, 150);
        ctx.lineTo(450, 350);
        ctx.quadraticCurveTo(450, 380, 420, 380);
        ctx.lineTo(180, 380);
        ctx.quadraticCurveTo(150, 380, 150, 350);
        ctx.lineTo(150, 150);
        ctx.quadraticCurveTo(100, 100, 150, 50);
        ctx.fill();
        
        // Tambahkan sedikit bayangan untuk efek kedalaman
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.beginPath();
        ctx.moveTo(150, 50);
        ctx.lineTo(450, 50);
        ctx.quadraticCurveTo(500, 100, 450, 150);
        ctx.lineTo(450, 350);
        ctx.quadraticCurveTo(450, 380, 420, 380);
        ctx.lineTo(180, 380);
        ctx.quadraticCurveTo(150, 380, 150, 350);
        ctx.lineTo(150, 150);
        ctx.quadraticCurveTo(100, 100, 150, 50);
        ctx.fill();
        
        // Gambar leher baju
        ctx.fillStyle = currentShirtColor;
        ctx.beginPath();
        ctx.ellipse(300, 70, 40, 25, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Tambahkan bayangan untuk leher
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.beginPath();
        ctx.ellipse(300, 72, 38, 23, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Jika ada pattern, gambarkan di posisi terakhir
        if (patternImage) {
            drawPattern(lastPatternPosition.x, lastPatternPosition.y);
        }
    }
    
    // Membuat gambar pattern berdasarkan data batik
    function createPatternImage(pattern) {
        // Buat canvas offscreen untuk pattern
        const patternCanvas = document.createElement('canvas');
        const patternCtx = patternCanvas.getContext('2d');
        patternCanvas.width = 100;
        patternCanvas.height = 100;
        
        // Warna dasar pattern
        patternCtx.fillStyle = pattern.color;
        patternCtx.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
        
        // Gambar pola berdasarkan jenis pattern
        patternCtx.fillStyle = "#f9f5f0"; // Warna motif
        
        switch(pattern.pattern) {
            case 'parang':
                // Pola parang (garis miring)
                for (let i = -10; i < patternCanvas.width; i += 15) {
                    patternCtx.beginPath();
                    patternCtx.moveTo(i, 0);
                    patternCtx.lineTo(i + 20, patternCanvas.height);
                    patternCtx.lineTo(i + 35, patternCanvas.height);
                    patternCtx.lineTo(i + 15, 0);
                    patternCtx.closePath();
                    patternCtx.fill();
                }
                break;
                
            case 'mega-mendung':
                // Pola mega mendung (awan)
                for (let i = 0; i < 5; i++) {
                    const x = 20 + i * 20;
                    const y = 20 + (i % 2) * 30;
                    patternCtx.beginPath();
                    patternCtx.arc(x, y, 15, 0, Math.PI * 2);
                    patternCtx.arc(x + 15, y + 10, 12, 0, Math.PI * 2);
                    patternCtx.arc(x - 5, y + 20, 10, 0, Math.PI * 2);
                    patternCtx.fill();
                }
                break;
                
            case 'kawung':
                // Pola kawung (bulatan teratur)
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        const x = 15 + i * 25;
                        const y = 15 + j * 25;
                        patternCtx.beginPath();
                        patternCtx.ellipse(x, y, 8, 10, 0, 0, Math.PI * 2);
                        patternCtx.fill();
                    }
                }
                break;
                
            case 'sekar-jagad':
                // Pola sekar jagad (bunga-bunga)
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        const x = 20 + i * 30;
                        const y = 20 + j * 30;
                        
                        // Gambar bunga sederhana
                        patternCtx.beginPath();
                        for (let k = 0; k < 8; k++) {
                            const angle = (k * Math.PI) / 4;
                            const petalX = x + 8 * Math.cos(angle);
                            const petalY = y + 8 * Math.sin(angle);
                            if (k === 0) {
                                patternCtx.moveTo(petalX, petalY);
                            } else {
                                patternCtx.lineTo(petalX, petalY);
                            }
                        }
                        patternCtx.closePath();
                        patternCtx.fill();
                        
                        // Tengah bunga
                        patternCtx.fillStyle = pattern.color;
                        patternCtx.beginPath();
                        patternCtx.arc(x, y, 4, 0, Math.PI * 2);
                        patternCtx.fill();
                        patternCtx.fillStyle = "#f9f5f0";
                    }
                }
                break;
                
            case 'truntum':
                // Pola truntum (bintang-bintang kecil)
                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 5; j++) {
                        const x = 10 + i * 20;
                        const y = 10 + j * 20;
                        
                        // Gambar bintang kecil
                        patternCtx.beginPath();
                        for (let k = 0; k < 5; k++) {
                            const angle = (k * 2 * Math.PI) / 5;
                            const radius = 4;
                            const starX = x + radius * Math.cos(angle - Math.PI/2);
                            const starY = y + radius * Math.sin(angle - Math.PI/2);
                            if (k === 0) {
                                patternCtx.moveTo(starX, starY);
                            } else {
                                patternCtx.lineTo(starX, starY);
                            }
                        }
                        patternCtx.closePath();
                        patternCtx.fill();
                    }
                }
                break;
                
            case 'tambal':
                // Pola tambal (patchwork)
                patternCtx.fillStyle = pattern.color;
                patternCtx.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
                
                // Gambar patch-patch dengan warna berbeda
                const patchColors = ["#f9f5f0", "#d4a574", "#a0522d"];
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        const x = (i % 2 === 0 ? 0 : 50);
                        const y = j * 25;
                        const width = 50;
                        const height = 25;
                        
                        patternCtx.fillStyle = patchColors[(i + j) % patchColors.length];
                        patternCtx.fillRect(x, y, width, height);
                        
                        // Garis tepi patch
                        patternCtx.strokeStyle = pattern.color;
                        patternCtx.lineWidth = 2;
                        patternCtx.strokeRect(x, y, width, height);
                    }
                }
                break;
                
            case 'cuwiri':
                // Pola cuwiri (titik-titik kecil)
                for (let i = 0; i < patternCanvas.width; i += 8) {
                    for (let j = 0; j < patternCanvas.height; j += 8) {
                        if ((i + j) % 16 === 0) {
                            patternCtx.beginPath();
                            patternCtx.arc(i, j, 2, 0, Math.PI * 2);
                            patternCtx.fill();
                        }
                    }
                }
                break;
                
            case 'sido-mukti':
                // Pola sido mukti (geometris kompleks)
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        const x = 15 + i * 35;
                        const y = 15 + j * 35;
                        
                        // Gambar bentuk berlian
                        patternCtx.beginPath();
                        patternCtx.moveTo(x, y - 10);
                        patternCtx.lineTo(x + 10, y);
                        patternCtx.lineTo(x, y + 10);
                        patternCtx.lineTo(x - 10, y);
                        patternCtx.closePath();
                        patternCtx.fill();
                        
                        // Gambar titik di setiap sudut
                        patternCtx.beginPath();
                        patternCtx.arc(x, y, 3, 0, Math.PI * 2);
                        patternCtx.fill();
                    }
                }
                break;
                
            default:
                // Pola default (kotak-kotak)
                for (let i = 0; i < patternCanvas.width; i += 20) {
                    for (let j = 0; j < patternCanvas.height; j += 20) {
                        if ((i + j) % 40 === 0) {
                            patternCtx.fillRect(i, j, 10, 10);
                        }
                    }
                }
        }
        
        // Simpan gambar pattern
        patternImage = new Image();
        patternImage.src = patternCanvas.toDataURL();
        patternImage.onload = function() {
            drawPattern(lastPatternPosition.x, lastPatternPosition.y);
        };
    }
    
    // Menggambar pattern pada posisi tertentu
    function drawPattern(x, y) {
        if (!patternImage) return;
        
        // Simpan konteks canvas
        ctx.save();
        
        // Pindah ke posisi yang diinginkan
        ctx.translate(x, y);
        
        // Rotasi pattern
        ctx.rotate(patternRotation * Math.PI / 180);
        
        // Skala pattern
        const scale = patternSize / 100;
        
        // Gambar pattern dengan ukuran yang disesuaikan
        const width = patternImage.width * scale;
        const height = patternImage.height * scale;
        
        // Gunakan globalCompositeOperation untuk menggambar hanya di area baju
        ctx.globalCompositeOperation = 'source-atop';
        ctx.drawImage(patternImage, -width/2, -height/2, width, height);
        
        // Kembalikan konteks
        ctx.restore();
    }
    
    // Setup grid pattern
    function setupPatternGrid() {
        const patternGrid = document.getElementById('patternGrid');
        patternGrid.innerHTML = '';
        
        batikPatterns.forEach(pattern => {
            const patternItem = document.createElement('div');
            patternItem.className = 'pattern-item';
            patternItem.dataset.id = pattern.id;
            
            if (pattern.id === currentPattern.id) {
                patternItem.classList.add('active');
            }
            
            // Buat thumbnail pattern
            const thumbnailCanvas = document.createElement('canvas');
            const thumbnailCtx = thumbnailCanvas.getContext('2d');
            thumbnailCanvas.width = 100;
            thumbnailCanvas.height = 80;
            
            // Isi background
            thumbnailCtx.fillStyle = pattern.color;
            thumbnailCtx.fillRect(0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
            
            // Gambar pola sederhana
            thumbnailCtx.fillStyle = "#f9f5f0";
            
            // Gambar pola kecil sebagai thumbnail
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 2; j++) {
                    const x = 15 + i * 35;
                    const y = 20 + j * 30;
                    
                    // Gambar bentuk berbeda berdasarkan pattern
                    if (pattern.pattern === 'parang') {
                        // Untuk parang, gambar garis miring
                        thumbnailCtx.beginPath();
                        thumbnailCtx.moveTo(x-10, y-10);
                        thumbnailCtx.lineTo(x+10, y+10);
                        thumbnailCtx.lineWidth = 3;
                        thumbnailCtx.stroke();
                    } else if (pattern.pattern === 'mega-mendung') {
                        // Untuk mega mendung, gambar bentuk awan
                        thumbnailCtx.beginPath();
                        thumbnailCtx.arc(x, y, 8, 0, Math.PI * 2);
                        thumbnailCtx.arc(x+6, y+5, 6, 0, Math.PI * 2);
                        thumbnailCtx.fill();
                    } else {
                        // Untuk lainnya, gambar bentuk dasar
                        thumbnailCtx.beginPath();
                        thumbnailCtx.arc(x, y, 8, 0, Math.PI * 2);
                        thumbnailCtx.fill();
                    }
                }
            }
            
            const img = document.createElement('img');
            img.src = thumbnailCanvas.toDataURL();
            img.alt = pattern.name;
            
            const patternName = document.createElement('div');
            patternName.className = 'pattern-name';
            patternName.textContent = pattern.name;
            
            patternItem.appendChild(img);
            patternItem.appendChild(patternName);
            
            patternItem.addEventListener('click', () => {
                document.querySelectorAll('.pattern-item').forEach(item => {
                    item.classList.remove('active');
                });
                patternItem.classList.add('active');
                
                currentPattern = pattern;
                createPatternImage(pattern);
            });
            
            patternGrid.appendChild(patternItem);
        });
    }
    
    // Setup opsi warna
    function setupColorOptions() {
        const colorOptions = document.getElementById('colorOptions');
        colorOptions.innerHTML = '';
        
        shirtColors.forEach((color, index) => {
            const colorOption = document.createElement('div');
            colorOption.className = 'color-option';
            colorOption.style.backgroundColor = color.value;
            colorOption.title = color.name;
            
            if (index === 0) {
                colorOption.classList.add('active');
            }
            
            colorOption.addEventListener('click', () => {
                document.querySelectorAll('.color-option').forEach(option => {
                    option.classList.remove('active');
                });
                colorOption.classList.add('active');
                
                currentShirtColor = color.value;
                drawShirt();
            });
            
            colorOptions.appendChild(colorOption);
        });
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Slider ukuran pattern
        const patternSizeSlider = document.getElementById('patternSize');
        const sizeValue = document.getElementById('sizeValue');
        
        patternSizeSlider.addEventListener('input', function() {
            patternSize = this.value;
            sizeValue.textContent = `${patternSize}%`;
            
            if (patternImage) {
                drawShirt();
            }
        });
        
        // Slider rotasi pattern
        const patternRotationSlider = document.getElementById('patternRotation');
        const rotationValue = document.getElementById('rotationValue');
        
        patternRotationSlider.addEventListener('input', function() {
            patternRotation = this.value;
            rotationValue.textContent = `${patternRotation}°`;
            
            if (patternImage) {
                drawShirt();
            }
        });
        
        // Klik pada canvas untuk menempatkan pattern
        canvas.addEventListener('click', function(event) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            // Skala koordinat ke ukuran canvas sebenarnya
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            
            lastPatternPosition = {
                x: x * scaleX,
                y: y * scaleY
            };
            
            drawShirt();
        });
        
        // Tombol terapkan pattern
        document.getElementById('applyPattern').addEventListener('click', function() {
            drawShirt();
            
            // Tampilkan pesan sukses
            showMessage('Motif batik berhasil diterapkan!', 'success');
        });
        
        // Tombol reset
        document.getElementById('resetDesign').addEventListener('click', function() {
            currentPattern = batikPatterns[0];
            currentShirtColor = shirtColors[0].value;
            patternSize = 100;
            patternRotation = 0;
            
            // Reset slider
            patternSizeSlider.value = 100;
            sizeValue.textContent = '100%';
            patternRotationSlider.value = 0;
            rotationValue.textContent = '0°';
            
            // Reset pilihan
            document.querySelectorAll('.pattern-item').forEach((item, index) => {
                item.classList.toggle('active', index === 0);
            });
            
            document.querySelectorAll('.color-option').forEach((item, index) => {
                item.classList.toggle('active', index === 0);
            });
            
            createPatternImage(currentPattern);
            drawShirt();
            
            showMessage('Desain berhasil direset!', 'info');
        });
        
        // Upload gambar pattern
        document.getElementById('uploadPattern').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            // Validasi tipe file
            if (!file.type.match('image.*')) {
                showMessage('Hanya file gambar yang diizinkan!', 'error');
                return;
            }
            
            // Validasi ukuran file (maks 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showMessage('Ukuran file maksimal 5MB!', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    // Resize gambar jika terlalu besar
                    const maxWidth = 500;
                    const maxHeight = 500;
                    
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }
                    
                    // Buat canvas untuk resize
                    const resizedCanvas = document.createElement('canvas');
                    const resizedCtx = resizedCanvas.getContext('2d');
                    resizedCanvas.width = width;
                    resizedCanvas.height = height;
                    
                    // Gambar ulang dengan ukuran baru
                    resizedCtx.drawImage(img, 0, 0, width, height);
                    
                    patternImage = new Image();
                    patternImage.src = resizedCanvas.toDataURL();
                    patternImage.onload = function() {
                        drawShirt();
                        showMessage('Motif batik Anda berhasil diunggah!', 'success');
                    };
                };
                img.src = e.target.result;
            };
            reader.onerror = function() {
                showMessage('Gagal membaca file!', 'error');
            };
            reader.readAsDataURL(file);
        });
        
        // Event untuk drag and drop (opsional)
        canvas.addEventListener('dragover', function(e) {
            e.preventDefault();
            canvas.style.borderColor = '#8b4513';
        });
        
        canvas.addEventListener('dragleave', function(e) {
            e.preventDefault();
            canvas.style.borderColor = '#ddd';
        });
        
        canvas.addEventListener('drop', function(e) {
            e.preventDefault();
            canvas.style.borderColor = '#ddd';
            
            const file = e.dataTransfer.files[0];
            if (file && file.type.match('image.*')) {
                // Simulasikan upload file
                const input = document.getElementById('uploadPattern');
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                input.files = dataTransfer.files;
                
                // Trigger change event
                const event = new Event('change', { bubbles: true });
                input.dispatchEvent(event);
            }
        });
    }
    
    // Fungsi untuk menampilkan pesan
    function showMessage(message, type) {
        // Hapus pesan sebelumnya jika ada
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Buat elemen pesan
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 6px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
        `;
        
        // Warna berdasarkan tipe pesan
        if (type === 'success') {
            messageEl.style.backgroundColor = '#10b981';
        } else if (type === 'info') {
            messageEl.style.backgroundColor = '#3b82f6';
        } else if (type === 'error') {
            messageEl.style.backgroundColor = '#dc2626';
        }
        
        document.body.appendChild(messageEl);
        
        // Hapus pesan setelah 3 detik
        setTimeout(() => {
            messageEl.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 300);
        }, 3000);
        
        // Tambahkan animasi CSS jika belum ada
        if (!document.querySelector('#message-animations')) {
            const style = document.createElement('style');
            style.id = 'message-animations';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Fitur tambahan: Unduh desain baju
    function addDownloadFeature() {
        const downloadBtn = document.createElement('button');
        downloadBtn.id = 'downloadDesign';
        downloadBtn.className = 'btn btn-primary';
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Unduh Desain';
        
        document.querySelector('.button-group').appendChild(downloadBtn);
        
        downloadBtn.addEventListener('click', function() {
            // Buat canvas sementara dengan resolusi tinggi
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            
            // Ukuran canvas untuk download (2x lebih besar untuk kualitas lebih baik)
            tempCanvas.width = canvas.width * 2;
            tempCanvas.height = canvas.height * 2;
            
            // Gambar baju dengan ukuran baru
            tempCtx.scale(2, 2);
            
            // Gambar background putih
            tempCtx.fillStyle = '#ffffff';
            tempCtx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Gambar baju
            tempCtx.fillStyle = currentShirtColor;
            
            // Gambar bentuk baju
            tempCtx.beginPath();
            tempCtx.moveTo(150, 50);
            tempCtx.lineTo(450, 50);
            tempCtx.quadraticCurveTo(500, 100, 450, 150);
            tempCtx.lineTo(450, 350);
            tempCtx.quadraticCurveTo(450, 380, 420, 380);
            tempCtx.lineTo(180, 380);
            tempCtx.quadraticCurveTo(150, 380, 150, 350);
            tempCtx.lineTo(150, 150);
            tempCtx.quadraticCurveTo(100, 100, 150, 50);
            tempCtx.fill();
            
            // Gambar pattern jika ada
            if (patternImage) {
                tempCtx.save();
                tempCtx.translate(lastPatternPosition.x, lastPatternPosition.y);
                tempCtx.rotate(patternRotation * Math.PI / 180);
                const scale = patternSize / 100;
                const width = patternImage.width * scale;
                const height = patternImage.height * scale;
                tempCtx.globalCompositeOperation = 'source-atop';
                tempCtx.drawImage(patternImage, -width/2, -height/2, width, height);
                tempCtx.restore();
            }
            
            // Buat link download
            const link = document.createElement('a');
            link.download = `batik-design-${Date.now()}.png`;
            link.href = tempCanvas.toDataURL('image/png');
            link.click();
            
            showMessage('Desain berhasil diunduh!', 'success');
        });
    }
    
    // Inisialisasi aplikasi
    initCanvas();
    
    // Tambahkan fitur download setelah semua komponen terinisialisasi
    setTimeout(addDownloadFeature, 1000);
    // Event listener untuk upload gambar
document.getElementById('uploadPattern').addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validasi tipe file
    if (!file.type.match('image.*')) {
        showMessage('Hanya file gambar yang diizinkan! (JPG, PNG, GIF)', 'error');
        return;
    }
    
    // Validasi ukuran file
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        showMessage('Ukuran file maksimal 5MB!', 'error');
        return;
    }
    
    // Tampilkan loading
    showMessage('Memproses gambar...', 'info');
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const img = new Image();
        
        img.onload = function() {
            // Resize gambar jika terlalu besar
            const maxDimension = 800;
            let width = img.width;
            let height = img.height;
            
            if (width > height && width > maxDimension) {
                height = (height * maxDimension) / width;
                width = maxDimension;
            } else if (height > maxDimension) {
                width = (width * maxDimension) / height;
                height = maxDimension;
            }
            
            // Buat canvas untuk resize dan konversi
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            tempCanvas.width = width;
            tempCanvas.height = height;
            
            // Gambar ke canvas dengan kualitas baik
            tempCtx.imageSmoothingEnabled = true;
            tempCtx.imageSmoothingQuality = 'high';
            tempCtx.drawImage(img, 0, 0, width, height);
            
            // Konversi ke pattern
            patternImage = new Image();
            patternImage.src = tempCanvas.toDataURL('image/png', 0.9);
            
            patternImage.onload = function() {
                // Simpan pattern custom ke state
                currentPattern = {
                    id: 999,
                    name: "Motif Custom",
                    color: "#8b4513",
                    pattern: "custom",
                    customImage: patternImage
                };
                
                // Update UI
                updatePatternSelection(999);
                drawShirt();
                
                showMessage('Gambar berhasil diunggah!', 'success');
                
                // Simpan ke localStorage (opsional)
                try {
                    localStorage.setItem('customBatikPattern', patternImage.src);
                } catch (e) {
                    console.log('Gagal menyimpan ke localStorage');
                }
            };
        };
        
        img.onerror = function() {
            showMessage('Gagal memuat gambar!', 'error');
        };
        
        img.src = e.target.result;
    };
    
    reader.onerror = function() {
        showMessage('Gagal membaca file!', 'error');
    };
    
    reader.readAsDataURL(file);
}

// Fungsi untuk update seleksi pattern di UI
function updatePatternSelection(patternId) {
    // Hapus seleksi dari semua pattern
    document.querySelectorAll('.pattern-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Tambahkan item untuk custom pattern jika belum ada
    const patternGrid = document.getElementById('patternGrid');
    let customPatternItem = document.querySelector('.pattern-item[data-id="999"]');
    
    if (!customPatternItem) {
        customPatternItem = document.createElement('div');
        customPatternItem.className = 'pattern-item';
        customPatternItem.dataset.id = 999;
        
        const img = document.createElement('img');
        img.src = patternImage.src;
        img.alt = "Motif Custom";
        
        const patternName = document.createElement('div');
        patternName.className = 'pattern-name';
        patternName.textContent = "Custom";
        
        customPatternItem.appendChild(img);
        customPatternItem.appendChild(patternName);
        
        customPatternItem.addEventListener('click', () => {
            currentPattern = {
                id: 999,
                name: "Motif Custom",
                color: "#8b4513",
                pattern: "custom",
                customImage: patternImage
            };
            drawShirt();
        });
        
        patternGrid.appendChild(customPatternItem);
    }
    
    // Update thumbnail jika ada gambar baru
    if (patternImage) {
        const img = customPatternItem.querySelector('img');
        img.src = download.img;
    }
    
    // Aktifkan custom pattern
    customPatternItem.classList.add('active');
}

// Load custom pattern dari localStorage saat halaman dimuat
function loadCustomPatternFromStorage() {
    try {
        const savedPattern = localStorage.getItem('customBatikPattern');
        if (savedPattern) {
            patternImage = new Image();
            patternImage.src = savedPattern;
            patternImage.onload = function() {
                currentPattern = {
                    id: 999,
                    name: "Motif Custom",
                    color: "#8b4513",
                    pattern: "custom",
                    customImage: patternImage
                };
                updatePatternSelection(999);
            };
        }
    } catch (e) {
        console.log('Tidak ada pattern tersimpan di localStorage');
    }
}

// Panggil di initCanvas
function initCanvas() {
    // ... kode lainnya
    loadCustomPatternFromStorage();
}
});