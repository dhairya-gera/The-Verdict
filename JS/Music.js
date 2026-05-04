const trackContainer = document.getElementById('track-container');
const searchInput = document.getElementById('searchInput');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const playerImg = document.getElementById('player-img');
const playerTitle = document.getElementById('player-title');
const playerArtist = document.getElementById('player-artist');
const listHeading = document.getElementById('list-heading');

let currentAudio = new Audio();
let isPlaying = false;
let progressInterval;

async function fetchMusic(query) {
    trackContainer.innerHTML = '<p style="padding: 20px; color: #888;">Fetching tracks...</p>';
    listHeading.innerText = `Results for "${query}"`;
    
    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=15`);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            renderTracks(data.results);
        } else {
            trackContainer.innerHTML = '<p style="padding: 20px;">No songs found. Try another search.</p>';
        }
    } catch (error) {
        trackContainer.innerHTML = '<p style="padding: 20px; color: #ff4b4b;">Network error. Please try again.</p>';
    }
}

function renderTracks(tracks) {
    trackContainer.innerHTML = '';
    
    tracks.forEach((track, index) => {
        if (!track.previewUrl) return; 

        const img = track.artworkUrl100.replace('100x100bb', '400x400bb');
        const row = document.createElement('div');
        row.className = 'track-row';
        
        row.innerHTML = `
            <div class="col-num">${index + 1}</div>
            <div class="title-wrapper">
                <img src="${img}" class="track-thumb" alt="Cover">
                <div>
                    <span class="track-title">${track.trackName}</span>
                    <span class="track-artist">${track.artistName}</span>
                </div>
            </div>
            <div class="col-album">${track.collectionName || 'Single'}</div>
            <div class="col-duration"><i class="fa-solid fa-play"></i></div>
        `;
        
        row.onclick = () => playSong(track.trackName, track.artistName, img, track.previewUrl, row);
        trackContainer.appendChild(row);
    });
}

function playSong(title, artist, img, url, row) {
    currentAudio.src = url;
    
    playerTitle.innerText = title;
    playerArtist.innerText = artist;
    playerImg.src = img;
    playerImg.classList.add('spin');
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    
    currentAudio.play().then(() => {
        isPlaying = true;
        setupTimer();
    }).catch((err) => {
        console.error("Playback blocked:", err);
        alert("Please click anywhere on the page first to allow audio playback.");
    });

    document.querySelectorAll('.track-row').forEach(r => r.classList.remove('playing'));
    row.classList.add('playing');
}

function setupTimer() {
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
        if (!currentAudio.paused) {
            const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
            progressBar.value = progress || 0;
            currentTimeEl.innerText = formatTime(currentAudio.currentTime);
            totalTimeEl.innerText = formatTime(currentAudio.duration);
        }
    }, 1000);
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    let m = Math.floor(seconds / 60);
    let s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

playPauseBtn.onclick = () => {
    if (!currentAudio.src) return;
    
    if (isPlaying) {
        currentAudio.pause();
        playerImg.classList.remove('spin');
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        currentAudio.play();
        playerImg.classList.add('spin');
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    isPlaying = !isPlaying;
};

progressBar.oninput = () => {
    if (currentAudio.duration) {
        currentAudio.currentTime = (progressBar.value / 100) * currentAudio.duration;
    }
};

volumeBar.oninput = () => {
    currentAudio.volume = volumeBar.value / 100;
};

searchInput.onkeypress = (e) => {
    if (e.key === 'Enter' && searchInput.value.trim() !== '') {
        fetchMusic(searchInput.value.trim());
    }
};

currentAudio.onended = () => {
    isPlaying = false;
    playerImg.classList.remove('spin');
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    progressBar.value = 0;
    currentTimeEl.innerText = "0:00";
};

window.onload = () => fetchMusic('Top Bollywood Hits 2026');