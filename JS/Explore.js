document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const searchForm = document.querySelector('.search-bar');
    const movieGrids = document.querySelectorAll('.movie-grid');
    const genreHeadings = document.querySelectorAll('.genre-name');

    function filterContent(searchTerm) {
        movieGrids.forEach((grid, index) => {
            const cards = grid.querySelectorAll('.movie-card');
            let hasResults = false;

            cards.forEach(card => {
                const title = card.querySelector('h3').innerText.toLowerCase();
                const info = card.querySelector('p').innerText.toLowerCase();

                if (title.includes(searchTerm) || info.includes(searchTerm)) {
                    card.style.display = 'block';
                    hasResults = true;
                } else {
                    card.style.display = 'none';
                }
            });

            if (hasResults) {
                grid.style.display = 'grid';
                if (genreHeadings[index]) genreHeadings[index].style.display = 'flex';
            } else {
                grid.style.display = 'none';
                if (genreHeadings[index]) genreHeadings[index].style.display = 'none';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const term = searchInput.value.toLowerCase().trim();
            filterContent(term);
        });
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => e.preventDefault());
    }

    const userAvatar = document.querySelector('.user-avatar');
    if (userAvatar) {
        userAvatar.addEventListener('click', () => {
            alert('Welcome to The Verdict! Profile settings coming soon.');
        });
    }
});