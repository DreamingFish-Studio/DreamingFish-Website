(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Pixel art ----------
  // Each sprite is a list of rows; every character maps to a palette color ('.' is transparent).
  function pixelSvg(rows, palette, className) {
    const rects = [];
    rows.forEach((row, y) => {
      [...row].forEach((key, x) => {
        if (palette[key]) rects.push(`<rect x="${x}" y="${y}" width="1" height="1" fill="${palette[key]}"/>`);
      });
    });
    return `<svg class="${className || ''}" viewBox="0 0 ${rows[0].length} ${rows.length}" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${rects.join('')}</svg>`;
  }

  const sprites = {
    house: {
      rows: [
        '................', '.......RR.......', '......RRRR......', '.....RRDDRR.....', '....RRRRRRRR....', '...RRRRRRRRRR...',
        '..RRDDDDDDDDRR..', '...WWWWWWWWWW...', '...WVVWWWWWWW...', '...WGGWWWDDWW...', '...WGGWWWDDWW...', '...WWWWWWDHWW...',
        '...WWWWWWDDWW...', '...WWWWWWDDWW...', '...SSSSSSSSSS...', '................'
      ],
      palette: { R: '#b3452f', D: '#7d2c1e', W: '#c9a36b', V: '#a68550', G: '#8fd3ff', H: '#e8c14a', S: '#6f6f6f' }
    },
    map: {
      rows: [
        '................', '.PPPPPPPPPPPPPP.', '.PBBBBGGGGGBBBP.', '.PBBBGGGGGGGBBP.', '.PBBGGGSSGGGGBP.', '.PBGGGSSSSGGGBP.',
        '.PBGGGGSSGGGBBP.', '.PBBGGGGGGGBBBP.', '.PBBBGGGGGBBBBP.', '.PBBGGGGBBBBBBP.', '.PBGGGGGGBBBBBP.', '.PBBGGGGGGBBBBP.',
        '.PBBBBGGGBBBBBP.', '.PBBBBBBBBBBBBP.', '.PPPPPPPPPPPPPP.', '................'
      ],
      palette: { P: '#e3d19c', B: '#4f7ae0', G: '#5a9e2f', S: '#e8dca0' }
    },
    book: {
      rows: [
        '................', '...KKKKKKKKKK...', '..KBBBBBBBBBBK..', '..KBBBBBBBBBWK..', '..KBBYYYYYBBWK..', '..KBBBBBBBBBWK..',
        '..KBBYYYYBBBWK..', '..KBBBBBBBBBWK..', '..KBBBBBBBBBWK..', '..KBBBBBBBBBWK..', '..KBBBBBBBBBWK..', '..KBBBBBBBBBWK..',
        '..KKKKKKKKKKWK..', '...KWWWWWWWWWK..', '....KKKKKKKKK...', '................'
      ],
      palette: { K: '#3b2210', B: '#7a4a25', W: '#f0e6c8', Y: '#e8c14a' }
    },
    sword: {
      rows: [
        '..............KK', '.............KCK', '............KCWK', '...........KCWK.', '..........KCWK..', '.........KCWK...',
        '....KK..KCWK....', '....KDKKCWK.....', '.....KDCWK......', '......KDK.......', '.....KHKDK......', '....KHK.KDK.....',
        '...KHK...KK.....', '..KHK...........', '..KK............', '................'
      ],
      palette: { K: '#123736', C: '#33ebcb', W: '#a8fff0', D: '#0e8f7e', H: '#6b4a2a' }
    },
    door: {
      rows: [
        '....KKKKKKKK....', '....KWWWWWWK....', '....KWGGGGWK....', '....KWGGGGWK....', '....KWWWWWWK....', '....KVWWWWVK....',
        '....KWWWWWWK....', '....KWWWWWHK....', '....KWWWWWHK....', '....KWWWWWWK....', '....KVWWWWVK....', '....KWWWWWWK....',
        '....KWWWWWWK....', '....KWWWWWWK....', '....KKKKKKKK....', '................'
      ],
      palette: { K: '#5c4020', W: '#a2824e', V: '#8c6c3c', G: '#8fd3ff', H: '#2b2b2b' }
    },
    fish: {
      rows: [
        '................', '................', '................', '.....DDDD.......', '...DDDDDDDD..DD.', '..DDDDDDDDDDDDD.',
        '..DD.DDDDDDDDD..', '..DDDDDDDDDDDD..', '..DDDDDDDDDDDDD.', '...DDDDDDDD..DD.', '.....DDDD.......', '................',
        '................', '................', '................', '................'
      ],
      palette: { D: '#3a2400' }
    }
  };

  document.querySelectorAll('[data-icon]').forEach((slot) => {
    const sprite = sprites[slot.dataset.icon];
    if (sprite) slot.insertAdjacentHTML('afterbegin', pixelSvg(sprite.rows, sprite.palette, 'slot-icon'));
  });
  const toastIcon = document.querySelector('.adv-toast-icon');
  if (toastIcon) toastIcon.innerHTML = pixelSvg(sprites.fish.rows, sprites.fish.palette);

  // Hanging banner: red cloth with a golden sun, for the "逐光" faction.
  const bannerCloth = document.querySelector('.banner-cloth');
  if (bannerCloth) {
    const width = 20;
    const height = 40;
    const rows = [];
    for (let y = 0; y < height; y += 1) {
      let row = '';
      for (let x = 0; x < width; x += 1) {
        const dx = x - 9.5;
        const dy = y - 15.5;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const onRay = distance > 5.6 && distance < 8.2 && (Math.abs(dx) < 1 || Math.abs(dy) < 1 || Math.abs(Math.abs(dx) - Math.abs(dy)) < 1);
        if (distance < 4.2 || onRay) row += 'Y';
        else if (y >= 30 && y <= 31) row += 'Y';
        else if (y >= 34 && y <= 35 && x % 4 < 2) row += 'Y';
        else if (x === 0 || x === width - 1 || y === 0) row += 'D';
        else row += (x + y) % 7 === 0 ? 'S' : 'R';
      }
      rows.push(row);
    }
    bannerCloth.innerHTML = pixelSvg(rows, { R: '#9b2226', S: '#8a1d21', D: '#6d1519', Y: '#f2c14e' });
  }

  // HUD hearts: seven full, one half, two empty.
  const hearts = document.querySelector('.hud-hearts');
  if (hearts) {
    const heart = ['.KK.KK.', 'KRRKRRK', 'KRWRRRK', 'KRRRRRK', '.KRRRK.', '..KRK..', '...K...'];
    const half = ['.KK.KK.', 'KRRKEEK', 'KRWKEEK', 'KRRREEK', '.KRREK.', '..KRK..', '...K...'];
    const empty = ['.KK.KK.', 'KEEKEEK', 'KEEEEEK', 'KEEEEEK', '.KEEEK.', '..KEK..', '...K...'];
    const palette = { K: '#1a0505', R: '#e0231b', W: '#ffc2c2', E: '#3b1414' };
    hearts.innerHTML = [...Array(7).fill(heart), half, empty, empty].map((rows) => pixelSvg(rows, palette)).join('');
  }

  // Drifting spores (infection particles).
  document.querySelectorAll('.spores').forEach((layer) => {
    const count = layer.classList.contains('is-dense') ? 26 : 14;
    for (let i = 0; i < count; i += 1) {
      const spore = document.createElement('i');
      spore.style.left = `${Math.random() * 100}%`;
      spore.style.top = `${20 + Math.random() * 80}%`;
      spore.style.animationDelay = `${Math.random() * -14}s`;
      spore.style.animationDuration = `${10 + Math.random() * 8}s`;
      if (Math.random() > 0.55) spore.classList.add('is-green');
      layer.appendChild(spore);
    }
  });

  // ---------- Top bar, hotbar, XP bar ----------
  const topbar = document.getElementById('topbar');
  const dock = document.getElementById('hotbarDock');
  const slots = [...document.querySelectorAll('.hotbar-slot')];
  const sections = slots.map((slot) => document.querySelector(slot.getAttribute('href')));
  const heldName = document.getElementById('heldName');
  const xpLevel = document.getElementById('xpLevel');
  const xpFill = document.getElementById('xpFill');
  let activeIndex = -1;
  let heldTimer = null;

  function selectSlot(index, announce) {
    if (index === activeIndex) return;
    activeIndex = index;
    slots.forEach((slot, i) => {
      slot.classList.toggle('is-selected', i === index);
      if (i === index) slot.setAttribute('aria-current', 'location');
      else slot.removeAttribute('aria-current');
    });
    xpLevel.textContent = String(index + 1);
    heldName.textContent = slots[index].querySelector('.slot-tip').textContent;
    if (!announce) return;
    heldName.classList.add('is-visible');
    clearTimeout(heldTimer);
    heldTimer = setTimeout(() => heldName.classList.remove('is-visible'), 1800);
  }

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    xpFill.style.transform = `scaleX(${docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0})`;
    const inWorld = scrollTop > window.innerHeight * 0.55;
    topbar.classList.toggle('is-shown', inWorld);
    dock.classList.toggle('is-shown', inWorld);

    let current = 0;
    sections.forEach((section, i) => {
      if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.35) current = i;
    });
    selectSlot(current, inWorld);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  window.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
    const slot = Number(event.key);
    if (!Number.isInteger(slot) || slot < 1 || slot > sections.length || !sections[slot - 1]) return;
    event.preventDefault();
    sections[slot - 1].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  // ---------- Reveal on scroll ----------
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.16 });

  document.documentElement.classList.add('reveal-ready');
  document.querySelectorAll('.reveal').forEach((element, index) => {
    element.style.setProperty('--rd', `${Math.min(index % 4, 3) * 90}ms`);
    revealObserver.observe(element);
  });

  // ---------- Copy address ----------
  const copyIp = document.getElementById('copyIp');
  const serverIp = document.getElementById('serverIp');
  const toast = document.getElementById('toast');
  const toastDetail = document.getElementById('toastDetail');
  let toastTimer = null;

  copyIp.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(serverIp.value);
    } catch {
      serverIp.select();
      document.execCommand('copy');
    }
    toastDetail.textContent = serverIp.value;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  });

  // ---------- Experience orbs on click ----------
  const orbLayer = document.getElementById('orbLayer');
  if (!reduceMotion) {
    window.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      for (let i = 0; i < 4; i += 1) {
        const orb = document.createElement('span');
        orb.className = 'xp-orb';
        orb.style.left = `${event.clientX}px`;
        orb.style.top = `${event.clientY}px`;
        orb.style.setProperty('--dx', `${Math.random() * 56 - 28}px`);
        orb.style.setProperty('--rise', `${-(42 + Math.random() * 38)}px`);
        orb.style.setProperty('--size', `${6 + Math.round(Math.random() * 4)}px`);
        orb.style.animationDelay = `${Math.random() * 0.12}s`;
        orb.addEventListener('animationend', () => orb.remove());
        orbLayer.appendChild(orb);
      }
    }, { passive: true });
  }

  // ---------- Background music (shared playback state with the main site) ----------
  const musicWidget = document.getElementById('musicWidget');
  const musicButton = document.getElementById('musicButton');
  const musicIcon = document.getElementById('musicIcon');
  const musicNotes = document.getElementById('musicNotes');
  const notes = ['♪', '♫', '♬', '♩', '♭'];
  const noteColors = ['#55ff55', '#ffff55', '#ff7f50', '#ff55ff', '#55ffff', '#8f8fff'];
  const audio = new Audio('../audio/bg_music.mp3');
  const musicStateKey = 'dreamingfish:bg-music-state';
  let isMusicPlaying = false;
  let wantsAutoplay = true;
  let noteTimer = null;

  audio.loop = true;
  audio.preload = 'metadata';
  audio.volume = 0.42;

  function readMusicState() {
    try {
      const saved = window.localStorage.getItem(musicStateKey);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }

  function saveMusicState() {
    try {
      window.localStorage.setItem(musicStateKey, JSON.stringify({
        currentTime: audio.currentTime,
        playing: !audio.paused,
        updatedAt: Date.now()
      }));
    } catch {
      // Playback still works when storage is unavailable.
    }
  }

  const savedMusicState = readMusicState();
  if (savedMusicState && typeof savedMusicState.currentTime === 'number' && Number.isFinite(savedMusicState.currentTime)) {
    audio.currentTime = savedMusicState.currentTime;
  }
  if (savedMusicState && savedMusicState.playing === false) {
    wantsAutoplay = false;
  }

  function updateMusicUi(needsGesture = false) {
    musicWidget.classList.toggle('needs-gesture', needsGesture && !isMusicPlaying);
    musicButton.classList.toggle('is-playing', isMusicPlaying);
    musicButton.setAttribute('aria-pressed', String(isMusicPlaying));
    musicButton.setAttribute('aria-label', isMusicPlaying ? '暂停背景音乐' : '播放背景音乐');
    musicIcon.textContent = isMusicPlaying ? 'Ⅱ' : '♪';
  }

  function spawnNote() {
    const note = document.createElement('span');
    note.className = 'jukebox-note';
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    note.style.color = noteColors[Math.floor(Math.random() * noteColors.length)];
    note.style.setProperty('--x', `${Math.random() * 54 - 27}px`);
    note.style.setProperty('--drift', `${Math.random() * 44 - 22}px`);
    note.style.setProperty('--duration', `${Math.random() * 0.55 + 1.45}s`);
    note.style.fontSize = `${Math.random() * 10 + 16}px`;
    musicNotes.appendChild(note);
    note.addEventListener('animationend', () => note.remove());
  }

  function startNotes() {
    if (noteTimer || reduceMotion) return;
    spawnNote();
    noteTimer = setInterval(spawnNote, 560);
  }

  function stopNotes() {
    if (noteTimer) {
      clearInterval(noteTimer);
      noteTimer = null;
    }
  }

  async function playMusic() {
    try {
      await audio.play();
      isMusicPlaying = true;
      wantsAutoplay = false;
      updateMusicUi(false);
      saveMusicState();
      startNotes();
    } catch {
      isMusicPlaying = false;
      updateMusicUi(true);
    }
  }

  function pauseMusic() {
    audio.pause();
    isMusicPlaying = false;
    wantsAutoplay = false;
    stopNotes();
    updateMusicUi(false);
    saveMusicState();
  }

  function playAfterFirstGesture() {
    if (!wantsAutoplay || !audio.paused) return;
    playMusic();
  }

  musicButton.addEventListener('click', () => {
    if (isMusicPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });

  window.addEventListener('pointerdown', playAfterFirstGesture, { passive: true });
  window.addEventListener('keydown', playAfterFirstGesture);
  window.addEventListener('touchstart', playAfterFirstGesture, { passive: true });
  window.addEventListener('wheel', playAfterFirstGesture, { passive: true });
  audio.addEventListener('timeupdate', saveMusicState);
  window.addEventListener('pagehide', saveMusicState);
  window.addEventListener('beforeunload', saveMusicState);

  if (wantsAutoplay) {
    playMusic();
  }
})();
