// ==========================================================
// VIBELY - SONG DATA
// This file only stores information. It has no player logic.
// ==========================================================

// Each song is an object. Every song has the same properties (fields).
//   id       -> unique number that identifies the song
//   title    -> the song's name
//   artist   -> who performs it
//   album    -> the album it belongs to
//   genre    -> the style of music
//   emoji    -> temporary artwork symbol
//   artClass -> the CSS class that gives the artwork its colors
//   file     -> where the audio file is (free demo tracks from SoundHelix)

const songs = [
    {
        id: 1,
        title: "Midnight Drive",
        artist: "Luna Waves",
        album: "Night Roads",
        genre: "Synthwave",
        emoji: "🎧",
        artClass: "art-purple",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: 2,
        title: "Ocean Eyes",
        artist: "Blue Harbor",
        album: "Deep Blue",
        genre: "Chill",
        emoji: "🌊",
        artClass: "art-blue",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: 3,
        title: "Golden Hour",
        artist: "Sunset Club",
        album: "Afterglow",
        genre: "Indie Pop",
        emoji: "🔥",
        artClass: "art-orange",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        id: 4,
        title: "Neon Hearts",
        artist: "Pixel Pop",
        album: "Arcade Love",
        genre: "Pop",
        emoji: "💖",
        artClass: "art-pink",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        id: 5,
        title: "Quiet Forest",
        artist: "Green Echo",
        album: "Moss and Stone",
        genre: "Ambient",
        emoji: "🌿",
        artClass: "art-teal",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        id: 6,
        title: "Electric Road",
        artist: "The Voltage",
        album: "High Voltage",
        genre: "Rock",
        emoji: "🎸",
        artClass: "art-red",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    }
];