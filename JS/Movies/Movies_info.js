document.addEventListener('DOMContentLoaded', () => {
    const watchedBtn = document.getElementById('primary-btn');
    const playlistBtn = document.getElementById('secondary-btn');

    function showPopup(message) {
        const existingPopup = document.querySelector('.verdict-popup');
        if (existingPopup) existingPopup.remove();

        const popup = document.createElement('div');
        popup.className = 'verdict-popup'; 
        popup.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent);"></i> ${message}`;
        popup.style.transform = 'translateY(80px)';
        popup.style.opacity = '0';
        
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.style.transform = 'translateY(0)';
            popup.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            popup.style.transform = 'translateY(80px)';
            popup.style.opacity = '0';
            setTimeout(() => popup.remove(), 400);
        }, 3000);
    }

    if (watchedBtn) {
        watchedBtn.addEventListener('click', () => {
            const isActive = watchedBtn.classList.toggle('btn-active');
            if (isActive) {
                watchedBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Watched';
                showPopup('Movie marked as watched!');
            } else {
                watchedBtn.innerHTML = '<i class="fa-regular fa-eye"></i> Mark as Watched';
                showPopup('Removed from watched list.');
            }
        });
    }

    if (playlistBtn) {
        playlistBtn.addEventListener('click', () => {
            const isActive = playlistBtn.classList.toggle('btn-active');
            if (isActive) {
                playlistBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i> Added to Playlist';
                showPopup('Added to your playlist!');
            } else {
                playlistBtn.innerHTML = '<i class="fa-regular fa-bookmark"></i> Add to Playlist';
                showPopup('Removed from playlist.');
            }
        });
    }
});