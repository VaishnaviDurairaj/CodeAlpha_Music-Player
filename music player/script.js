// Music Player JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const volumeSlider = document.getElementById('volume-slider');
    const playlistList = document.getElementById('playlist-list');
    const trackTitle = document.getElementById('track-title');
    const artistName = document.getElementById('artist-name');
    const albumArt = document.getElementById('current-album-art');
    
    // Playlist data
    const playlist = [
        {
            title: "Summer Vibes",
            artist: "Ocean Waves",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            image: "https://picsum.photos/seed/music1/300/300.jpg"
        },
        {
            title: "Mountain High",
            artist: "Forest Echo",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            image: "https://picsum.photos/seed/music2/300/300.jpg"
        },
        {
            title: "Urban Dreams",
            artist: "City Lights",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            image: "https://picsum.photos/seed/music3/300/300.jpg"
        },
        {
            title: "Desert Wind",
            artist: "Sand Dunes",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
            image: "https://picsum.photos/seed/music4/300/300.jpg"
        },
        {
            title: "Night Sky",
            artist: "Star Gazer",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
            image: "https://picsum.photos/seed/music5/300/300.jpg"
        }
    ];
    
    let currentTrackIndex = 0;
    let isPlaying = false;
    
    // Initialize playlist
    function initializePlaylist() {
        playlistList.innerHTML = '';
        
        playlist.forEach((track, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('playlist-item');
            
            if (index === currentTrackIndex) {
                listItem.classList.add('active');
            }
            
            listItem.innerHTML = `
                <i class="fas fa-music"></i>
                <div>
                    <div class="track-title">${track.title}</div>
                    <div class="artist-name">${track.artist}</div>
                </div>
            `;
            
            listItem.addEventListener('click', () => {
                loadTrack(index);
                playTrack();
            });
            
            playlistList.appendChild(listItem);
        });
    }
    
    // Load track
    function loadTrack(index) {
        currentTrackIndex = index;
        const track = playlist[currentTrackIndex];
        
        audioPlayer.src = track.src;
        trackTitle.textContent = track.title;
        artistName.textContent = track.artist;
        albumArt.src = track.image;
        
        // Update active playlist item
        document.querySelectorAll('.playlist-item').forEach((item, i) => {
            item.classList.toggle('active', i === currentTrackIndex);
        });
        
        // Reset progress bar
        progressBar.style.width = '0%';
        currentTimeEl.textContent = '0:00';
        
        // Update duration when metadata loads
        audioPlayer.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(audioPlayer.duration);
        });
    }
    
    // Play track
    function playTrack() {
        audioPlayer.play();
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    // Pause track
    function pauseTrack() {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
    
    // Toggle play/pause
    function togglePlayPause() {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    }
    
    // Previous track
    function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) playTrack();
    }
    
    // Next track
    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) playTrack();
    }
    
    // Update progress bar
    function updateProgress() {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }
    
    // Set progress
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        
        audioPlayer.currentTime = (clickX / width) * duration;
    }
    
    // Format time (seconds to mm:ss)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
    
    // Set volume
    function setVolume() {
        audioPlayer.volume = volumeSlider.value / 100;
    }
    
    // Event listeners
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', nextTrack);
    progressBar.parentElement.addEventListener('click', setProgress);
    volumeSlider.addEventListener('input', setVolume);
    
    // Initialize
    initializePlaylist();
    loadTrack(currentTrackIndex);
    setVolume();
});