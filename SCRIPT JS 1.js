// script.js - Nusantara Budaya Interactive Features

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll untuk semua links dengan href="#"
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced Card Hover Animations
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03)';
            this.querySelector('.card-img::after').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Card button click - Modal preview (placeholder)
        const cardBtn = this.querySelector('.card-btn');
        cardBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const cardTitle = this.closest('.card').querySelector('h3').textContent;
            showCardModal(cardTitle);
        });
    });

    // Hero CTA Button Animation
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function() {
            document.getElementById('highlights').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }

    // Intersection Observer untuk Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });

        <body></body>
    }, observerOptions);

    // Observe cards dan sections
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(card);
    });

    // Navbar scroll effect (jika ada navbar nanti)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        if (parallax) {
            parallax.style.transform = `translateY(${rate}px)`;
        }
    });

    

    // Loading Animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

});

// Modal Function untuk Card Detail
function showCardModal(title) {
    // Buat modal dinamis
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h2>${title}</h2>
            <p>Halaman detail budaya ${title.toLowerCase()} akan ditampilkan di sini dengan galeri foto, video, dan informasi lengkap.</p>
            <div class="modal-actions">
                <button class="modal-btn primary">Lihat Galeri</button>
                <button class="modal-btn secondary">Tutup</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.querySelector('.modal-btn.secondary').addEventListener('click', () => {
        modal.remove();
    });
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Search Functionality (untuk masa depan)
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Parallax Effect untuk Cards
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const cards = document.querySelectorAll('.card');
        
        cards.forEach((card, index) => {
            const speed = 0.3;
            const yPos = -(scrolled * speed * (index + 1)) / 100;
            card.style.transform += `translateY(${yPos}px)`;
        });
    });
}

// Initialize saat load
initSearch();
initParallax();

// PWA Service Worker (untuk offline capability)
if ('serviceWorker' in navigator) 
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    })
