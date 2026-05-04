document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search-bar');
    const searchInput = document.querySelector('.search-bar input');

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                window.location.href = `Movies.html?search=${encodeURIComponent(searchTerm)}`;
            } else {
                window.location.href = 'Movies.html';
            }
        });
    }

    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(6, 6, 8, 0.98)';
                navbar.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.8)';
            } else {
                navbar.style.background = 'rgba(17, 17, 22, 0.95)';
                navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            }
        });
    }

    const tickerTrack = document.querySelector('.ticker-track');
    if (tickerTrack) {
        tickerTrack.addEventListener('mouseenter', () => {
            tickerTrack.style.animationPlayState = 'paused';
        });
        tickerTrack.addEventListener('mouseleave', () => {
            tickerTrack.style.animationPlayState = 'running';
        });
    }

    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #3AADFC;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
        box-shadow: 0 5px 15px rgba(0,0,0,0.5);
        z-index: 1000;
        transition: 0.3s;
    `;
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const userAvatar = document.querySelector('.user-avatar');
    if(userAvatar) {
        userAvatar.addEventListener('click', () => {
            alert('Welcome to The Verdict! Profile settings coming soon.');
        });
    }
});