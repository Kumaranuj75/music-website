// ==========================================================
// VIBELY - MUSIC PLAYER (Step 7)
// The "songs" list comes from songs.js, which loads first.
// ==========================================================

// ---------- 1. FIND THE ELEMENTS ON THE PAGE ----------
const audio = document.getElementById("audio-player");
const playerArt = document.getElementById("player-art");
const playerTitle = document.getElementById("player-song-title");
const playerArtist = document.getElementById("player-song-artist");
const prevButton = document.getElementById("prev-btn");
const playButton = document.getElementById("play-btn");
const nextButton = document.getElementById("next-btn");
const currentTimeText = document.getElementById("current-time");
const totalTimeText = document.getElementById("total-time");
const progressBar = document.getElementById("progress-bar");
const volumeBar = document.getElementById("volume-bar");
const trendingGrid = document.getElementById("trending-grid");
const trendingTitle = document.getElementById("trending-title");   // (NEW)
const searchInput = document.getElementById("search-input");       // (NEW)

// ---------- 2. KEEP TRACK OF THE CURRENT SONG ----------
let currentSongIndex = 0;

// ---------- 3. HELPER FUNCTION: turn seconds into m:ss ----------
function formatTime(seconds) {
    if (isNaN(seconds)) {
        return "0:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return minutes + ":" + String(remainingSeconds).padStart(2, "0");
}

// ---------- 4. BUILD THE SONG CARDS FROM A LIST ----------
// (CHANGED) This function now receives the list of songs to show.
// Before, it always used the full "songs" list.
function renderSongCards(songList) {
    trendingGrid.innerHTML = "";   // start with an empty grid

    // (NEW) If there is nothing to show, display a friendly message
    if (songList.length === 0) {
        trendingGrid.innerHTML =
            '<p class="no-results">No songs found. Try a different search.</p>';
        return;
    }

    for (let i = 0; i < songList.length; i++) {
        const song = songList[i];

        const card = document.createElement("div");
        card.className = "music-card";
        card.dataset.songId = song.id;

        card.innerHTML = `
            <div class="card-art-wrapper">
                <div class="card-art ${song.artClass}">${song.emoji}</div>
                <button class="card-play-btn" aria-label="Play ${song.title}">▶</button>
            </div>
            <h3 class="card-title">${song.title}</h3>
            <p class="card-subtitle">${song.artist}</p>
        `;

        card.addEventListener("click", function () {
            handleCardClick(song.id);
        });

        trendingGrid.appendChild(card);
    }

    // (NEW) Re-apply the green highlight to the song that is playing
    updateActiveCard();
}

// ---------- 5. HIGHLIGHT THE CURRENT SONG'S CARD ----------
function updateActiveCard() {
    const currentSong = songs[currentSongIndex];
    const allCards = document.querySelectorAll(".music-card");

    for (let i = 0; i < allCards.length; i++) {
        const card = allCards[i];
        if (Number(card.dataset.songId) === currentSong.id) {
            card.classList.add("playing");
        } else {
            card.classList.remove("playing");
        }
    }
}

// ---------- 6. LOAD A SONG (does not play it yet) ----------
function loadSong(index) {
    const song = songs[index];

    audio.src = song.file;
    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;
    playerArt.textContent = song.emoji;
    playerArt.className = "player-art " + song.artClass;

    progressBar.value = 0;
    currentTimeText.textContent = "0:00";
    totalTimeText.textContent = "0:00";

    updateActiveCard();
}

// ---------- 7. PLAY, PAUSE, NEXT, PREVIOUS ----------
function playSong() {
    audio.play();
}

function pauseSong() {
    audio.pause();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

// ---------- 8. WHAT HAPPENS WHEN A CARD IS CLICKED ----------
function handleCardClick(songId) {
    const clickedIndex = songs.findIndex(function (song) {
        return song.id === songId;
    });

    if (clickedIndex === currentSongIndex) {
        if (audio.paused) {
            playSong();
        } else {
            pauseSong();
        }
    } else {
        currentSongIndex = clickedIndex;
        loadSong(currentSongIndex);
        playSong();
    }
}

// ---------- 9. (NEW) SEARCH ----------
// Runs every time the text in the search box changes.
function searchSongs() {
    const typedText = searchInput.value.trim();     // remove extra spaces
    const searchText = typedText.toLowerCase();     // "LUNA" becomes "luna"

    // If the box is empty, go back to showing every song
    if (searchText === "") {
        trendingTitle.textContent = "Trending Songs";
        renderSongCards(songs);
        return;
    }

    // Keep only the songs that match the typed text
    const results = songs.filter(function (song) {
        return (
            song.title.toLowerCase().includes(searchText) ||
            song.artist.toLowerCase().includes(searchText) ||
            song.album.toLowerCase().includes(searchText)
        );
    });

    trendingTitle.textContent = 'Results for "' + typedText + '"';
    renderSongCards(results);
}

searchInput.addEventListener("input", searchSongs);

// ---------- 10. BUTTON CLICKS ----------
playButton.addEventListener("click", function () {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", previousSong);

// ---------- 11. KEEP THE PLAY BUTTON ICON CORRECT ----------
audio.addEventListener("play", function () {
    playButton.textContent = "⏸";
});

audio.addEventListener("pause", function () {
    playButton.textContent = "▶";
});

// ---------- 12. PROGRESS BAR ----------
audio.addEventListener("loadedmetadata", function () {
    totalTimeText.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", function () {
    if (!isNaN(audio.duration)) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
        currentTimeText.textContent = formatTime(audio.currentTime);
    }
});

progressBar.addEventListener("input", function () {
    if (!isNaN(audio.duration)) {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    }
});

audio.addEventListener("ended", nextSong);

// ---------- 13. VOLUME ----------
volumeBar.addEventListener("input", function () {
    audio.volume = volumeBar.value / 100;
});

// ---------- 14. START-UP ----------
audio.volume = volumeBar.value / 100;
renderSongCards(songs);       // (CHANGED) we now pass in the full list
loadSong(currentSongIndex);