document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const searchForm = document.querySelector('.search-bar');
    const movieCards = document.querySelectorAll('.movie-card');
    const genreHeadings = document.querySelectorAll('.genre-name');
    const movieGrids = document.querySelectorAll('.movie-grid');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();

            movieGrids.forEach((grid, index) => {
                const cards = grid.querySelectorAll('.movie-card');
                let hasVisibleCards = false;

                cards.forEach(card => {
                    const title = card.querySelector('h3').innerText.toLowerCase();
                    const genreInfo = card.querySelector('p').innerText.toLowerCase();
                    
                    if (title.includes(searchTerm) || genreInfo.includes(searchTerm)) {
                        card.style.display = 'block';
                        hasVisibleCards = true;
                    } else {
                        card.style.display = 'none';
                    }
                });

                if (hasVisibleCards) {
                    if (genreHeadings[index]) genreHeadings[index].style.display = 'flex';
                    grid.style.display = 'grid';
                } else {
                    if (genreHeadings[index]) genreHeadings[index].style.display = 'none';
                    grid.style.display = 'none';
                }
            });
        });
    }
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    const userAvatar = document.querySelector('.user-avatar');
    if(userAvatar) {
        userAvatar.addEventListener('click', () => {
            alert('Welcome to The Verdict! Profile settings coming soon.');
        });
    }
    });