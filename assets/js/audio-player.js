/**
 * Cabañas Amor.es - Background Audio Controller (Optimized)
 * - Autoplay on open with smart browser policy fallback.
 * - Prevents reload/pause when clicking "Inicio" on index.
 * - Resolves race conditions: single-click activation, no accidental pause.
 * - Persists playback position and state across site navigation.
 */
(function () {
  'use strict';

  var STORAGE_KEY_PLAYING = 'amores_audio_playing';
  var STORAGE_KEY_TIME = 'amores_audio_time';

  function initAudioPlayer() {
    var audio = document.getElementById('bg-music');
    var toggleBtn = document.getElementById('audio-toggle-btn');
    var statusText = document.getElementById('audio-status-text');
    var container = document.getElementById('audio-container');
    var playIcon = document.getElementById('audio-play-icon');
    var eqBars = document.getElementById('audio-eq-bars');
    var badge = document.querySelector('.amores-audio-badge');

    if (!audio || !container) return;

    // Ambient volume level (65%)
    audio.volume = 0.65;

    // Restore playback position if available
    var savedTime = parseFloat(sessionStorage.getItem(STORAGE_KEY_TIME));
    if (!isNaN(savedTime) && savedTime > 0 && isFinite(savedTime)) {
      try {
        audio.currentTime = savedTime;
      } catch (e) {}
    }

    // Save playback position periodically
    audio.addEventListener('timeupdate', function () {
      if (!audio.paused && audio.currentTime > 0) {
        sessionStorage.setItem(STORAGE_KEY_TIME, audio.currentTime.toFixed(1));
      }
    });

    var badgeTimeout = null;
    var lastPlaybackStartTime = 0;
    var lastActionTimestamp = 0;
    var isStarting = false;

    function showTemporaryBadge(text, duration) {
      if (statusText) statusText.textContent = text;
      if (badge) {
        badge.classList.add('visible');
        clearTimeout(badgeTimeout);
        badgeTimeout = setTimeout(function () {
          badge.classList.remove('visible');
        }, duration || 3500);
      }
    }

    function setPlayingUI(isPlaying) {
      if (isPlaying) {
        container.classList.add('amores-audio-playing');
        container.classList.remove('amores-audio-paused');
        container.classList.remove('amores-audio-attention');
        if (playIcon) playIcon.style.display = 'none';
        if (eqBars) eqBars.style.display = 'flex';
        if (toggleBtn) {
          toggleBtn.setAttribute('title', 'Pausar música');
          toggleBtn.setAttribute('aria-label', 'Pausar música ambiental');
        }
      } else {
        container.classList.remove('amores-audio-playing');
        container.classList.add('amores-audio-paused');
        if (playIcon) {
          playIcon.style.display = 'block';
          playIcon.className = 'fa fa-play';
        }
        if (eqBars) eqBars.style.display = 'none';
        if (toggleBtn) {
          toggleBtn.setAttribute('title', 'Reproducir música');
          toggleBtn.setAttribute('aria-label', 'Reproducir música ambiental');
        }
      }
    }

    function startPlayback(isUserInitiated) {
      if (isStarting) return;
      isStarting = true;
      lastPlaybackStartTime = Date.now();

      var playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(function () {
            isStarting = false;
            sessionStorage.setItem(STORAGE_KEY_PLAYING, 'true');
            setPlayingUI(true);
            removeInteractionListeners();
            if (isUserInitiated) {
              showTemporaryBadge('🎵 Música activada', 2500);
            }
          })
          .catch(function (error) {
            isStarting = false;
            // Autoplay blocked by browser policy
            setPlayingUI(false);
            container.classList.add('amores-audio-attention');
            if (!isUserInitiated) {
              showTemporaryBadge('Clic para escuchar música 🎵', 4500);
            }
          });
      } else {
        isStarting = false;
      }
    }

    function pausePlayback() {
      audio.pause();
      sessionStorage.setItem(STORAGE_KEY_PLAYING, 'false');
      setPlayingUI(false);
      showTemporaryBadge('Música pausada', 2000);
    }

    // Handles button click cleanly without double-triggering or accidental pause
    function handleButtonClick(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      var now = Date.now();
      // Debounce: ignore multiple rapid events within 450ms
      if (now - lastActionTimestamp < 450) {
        return;
      }
      lastActionTimestamp = now;

      // If audio was just started within the last 1.2s, confirm it continues playing
      if (now - lastPlaybackStartTime < 1200 && !audio.paused) {
        return;
      }

      if (audio.paused) {
        startPlayback(true);
      } else {
        pausePlayback();
      }
    }

    // Safe first user interaction anywhere on the document
    function onFirstUserInteraction(e) {
      // If clicking inside the audio controller, let handleButtonClick manage it
      if (e && e.target && container.contains(e.target)) {
        return;
      }

      // Check if user has explicitly muted in this session
      if (sessionStorage.getItem(STORAGE_KEY_PLAYING) === 'false') {
        removeInteractionListeners();
        return;
      }

      if (audio.paused) {
        startPlayback(false);
      }
      removeInteractionListeners();
    }

    var interactionEvents = ['pointerdown', 'touchstart', 'click', 'keydown'];

    function addInteractionListeners() {
      interactionEvents.forEach(function (eventName) {
        window.addEventListener(eventName, onFirstUserInteraction, { passive: true, once: true });
      });
    }

    function removeInteractionListeners() {
      interactionEvents.forEach(function (eventName) {
        window.removeEventListener(eventName, onFirstUserInteraction);
      });
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', handleButtonClick);
    }

    audio.addEventListener('play', function () {
      setPlayingUI(true);
      sessionStorage.setItem(STORAGE_KEY_PLAYING, 'true');
    });

    audio.addEventListener('pause', function () {
      setPlayingUI(false);
    });

    audio.addEventListener('ended', function () {
      audio.currentTime = 0;
      audio.play().catch(function () {});
    });

    // 1. If previously playing or first visit, try playing immediately
    var prevPlayingState = sessionStorage.getItem(STORAGE_KEY_PLAYING);
    if (prevPlayingState !== 'false') {
      startPlayback(false);
    } else {
      setPlayingUI(false);
    }

    // 2. Set up fallback interaction trigger
    addInteractionListeners();

    // 3. OPTIMIZATION FOR "INICIO" LINKS:
    // If the visitor is on index.html, clicking "Inicio" or the logo should scroll smoothly
    // to top instead of reloading the page, which would needlessly stop the audio!
    interceptInicioLinks();
  }

  function interceptInicioLinks() {
    var isIndexPage =
      window.location.pathname.endsWith('index.html') ||
      window.location.pathname === '/' ||
      window.location.pathname.endsWith('/');

    if (!isIndexPage) return;

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link) return;

      var href = link.getAttribute('href');
      if (!href) return;

      // Clean href
      var cleanHref = href.trim();
      if (cleanHref === 'index.html' || cleanHref === './index.html' || cleanHref === 'index.html#' || cleanHref === '#') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

        // Close mobile dropdown menu if opened
        var menuTrigger = document.querySelector('.menu-trigger');
        var navMenu = document.querySelector('.header-area .nav');
        if (menuTrigger && menuTrigger.classList.contains('active')) {
          menuTrigger.classList.remove('active');
          if (navMenu) {
            navMenu.style.display = 'none';
          }
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAudioPlayer);
  } else {
    initAudioPlayer();
  }
})();
