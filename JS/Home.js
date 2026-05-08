document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search-bar');
    const searchInput = document.querySelector('.search-bar input');

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
                window.location.href = 'Movies.html';
            }
)};

    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        let currentScroll = window.scrollY;

        if (navbar) {
            if (currentScroll > 50) {
                navbar.style.background = 'rgba(6, 6, 8, 0.98)';
                navbar.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.8)';
            } else {
                navbar.style.background = 'rgba(17, 17, 22, 0.95)';
                navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            }
        }

        if (backToTopBtn) {
            if (currentScroll > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const userAvatar = document.querySelector('.user-avatar');
    
    if (userAvatar) {
        userAvatar.addEventListener('click', () => {
            alert('Welcome to The Verdict! Profile settings coming soon.');
        });
    }
});