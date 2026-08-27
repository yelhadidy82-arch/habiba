document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Memories progressive reveal
  if (currentPage === 'memories.html') {
    const albumPhotos = Array.from(document.querySelectorAll('.memory-photo'));
    const finalMessage = document.querySelector('.final-message');
    const introMessage = document.querySelector('.intro-message');

    if (introMessage) {
      introMessage.style.opacity = '1';
      introMessage.style.transform = 'translateY(0)';
      introMessage.style.filter = 'blur(0)';
    }

    const showPhotos = () => {
      albumPhotos.forEach((photo, index) => {
        const delay = index * 1000;
        setTimeout(() => {
          photo.classList.add('visible');
          photo.style.transitionDelay = `${index * 120}ms`;
        }, delay + 700);
      });

      setTimeout(() => {
        if (finalMessage) {
          finalMessage.classList.add('visible');
        }
      }, 1000 + (albumPhotos.length * 1000) + 600);
    };

    setTimeout(showPhotos, 600);

    // Memory image hover effect for touch screens
    albumPhotos.forEach((photo) => {
      photo.addEventListener('click', () => {
        photo.querySelector('.photo-frame').classList.toggle('photo-touch');
      });
    });

    // Music player
    const song = document.getElementById('memorySong');
    const musicToggle = document.getElementById('musicToggle');

    if (song && musicToggle) {
      musicToggle.addEventListener('click', () => {
        if (song.paused) {
          song.play().catch(() => {
            // Browsers may block autoplay, but playback starts after the interaction.
            musicToggle.querySelector('.music-text').textContent = 'Play our song';
          });
          musicToggle.classList.add('playing');
          musicToggle.querySelector('.music-text').textContent = 'Pause our song';
          musicToggle.querySelector('.music-icon').textContent = '⏸';
        } else {
          song.pause();
          musicToggle.classList.remove('playing');
          musicToggle.querySelector('.music-text').textContent = 'Play our song';
          musicToggle.querySelector('.music-icon').textContent = '🎵';
        }
      });
    }
  }

  // Eye interaction for a subtle tap animation
  if (currentPage === 'eyes.html') {
    const eyeImage = document.getElementById('eyeImage');
    if (eyeImage) {
      eyeImage.addEventListener('click', () => {
        eyeImage.animate([
          { transform: 'scale(1)', filter: 'brightness(1)' },
          { transform: 'scale(1.035)', filter: 'brightness(1.08) drop-shadow(0 0 16px rgba(215,142,145,0.85))' },
          { transform: 'scale(1)', filter: 'brightness(1)' }
        ], {
          duration: 700,
          easing: 'ease-out'
        });
      });
    }
  }
});
