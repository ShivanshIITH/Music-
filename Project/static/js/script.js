const audio = document.getElementById('audio');
        const playPauseButton = document.getElementById('playPause');
        const seekbar = document.getElementById('seekbar');
        const currentTimeSpan = document.getElementById('currentTime');
        const durationSpan = document.getElementById('duration');
        let isShuffle = false;
        let currentSongIndex = 0;
        const totalSongs = 43; // Change this to the total number of your songs

        function togglePlayPause() {
            if (audio.paused) {
                audio.play();
                playPauseButton.textContent = 'Pause';
            } else {
                audio.pause();
                playPauseButton.textContent = 'Play';
            }
        }

        function playSong() {
            audio.src = `/media/${currentSongIndex + 1}.mp3`; // Adjust the file naming convention
            audio.play();
            playPauseButton.textContent = 'Pause';
        }

        function nextSong() {
            if (isShuffle) {
                currentSongIndex = getRandomIndex();
            } else {
                currentSongIndex = (currentSongIndex + 1) % totalSongs;
            }
            playSong();
        }

        function prevSong() {
            if (isShuffle) {
                currentSongIndex = getRandomIndex();
            } else {
                currentSongIndex = (currentSongIndex - 1 + totalSongs) % totalSongs;
            }
            playSong();
        }

        function getRandomIndex() {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * totalSongs);
            } while (newIndex === currentSongIndex);
            return newIndex;
        }

        function toggleShuffle() {
            isShuffle = !isShuffle;
            const shuffleButton = document.getElementById('shuffle');
            shuffleButton.classList.toggle('active', isShuffle);

            if (isShuffle) {
                shuffleSongs();
            }
        }

        function shuffleSongs() {
            for (let i = totalSongs - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [songs[i], songs[j]] = [songs[j], songs[i]];
            }
            currentSongIndex = 0;
        }

        audio.addEventListener('timeupdate', updateSeekbar);

        function updateSeekbar() {
            if (audio.duration > 0) {
                const percentage = (audio.currentTime / audio.duration) * 100;
                seekbar.value = percentage;
                currentTimeSpan.textContent = formatTime(audio.currentTime);
                durationSpan.textContent = formatTime(audio.duration);
            }
        }

        seekbar.addEventListener('input', () => {
            const seekTime = (seekbar.value / 100) * audio.duration;
            audio.currentTime = seekTime;
        });

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }

        // Play the first song on load
        playSong();