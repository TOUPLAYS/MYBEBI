/* ======================================================
   FOR MY BEBI — vanilla JS
   Sections: HEARTS, PARTICLES, NAV, HERO, COMFORT CARDS,
   ENVELOPE + LETTER, GALLERY, LIGHTBOX, BREATHING, HUG, MUSIC
   ====================================================== */

/* ---------- FLOATING HEART SYSTEM ---------- */
// Small pool of heart symbols we pick from at random
const HEART_SYMBOLS = ['♡', '♥', '❤', '🤍', '💗', '💕'];
const heartLayer = document.getElementById('heartLayer');

// Spawns one heart that drifts upward and fades out, then removes itself
function spawnHeart(x) {
  const heart = document.createElement('span');
  heart.className = 'floaty-heart';
  heart.textContent = HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)];
  const left = x !== undefined ? x : Math.random() * 100;
  const size = 0.9 + Math.random() * 1.2;
  const duration = 4 + Math.random() * 3;
  heart.style.left = left + 'vw';
  heart.style.fontSize = size + 'rem';
  heart.style.animationDuration = duration + 's';
  heartLayer.appendChild(heart);
  heart.addEventListener('animationend', () => heart.remove());
}

// Spawns a little burst of hearts from roughly one spot
function heartBurst(count = 8, xCenter) {
  for (let i = 0; i < count; i++) {
    const spread = xCenter !== undefined ? xCenter + (Math.random() * 20 - 10) : undefined;
    setTimeout(() => spawnHeart(spread), i * 80);
  }
}

// A gentle, low-frequency ambient heart every few seconds (kept sparse on purpose)
setInterval(() => spawnHeart(), 3200);

/* ---------- BACKGROUND PARTICLES ---------- */
// A small, fixed number of twinkling particles created once (not hundreds of them)
const particleHost = document.getElementById('particles');
const PARTICLE_COUNT = 16;
for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = 2 + Math.random() * 4;
  p.style.width = p.style.height = size + 'px';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.setProperty('--dx', (Math.random() * 60 - 30) + 'px');
  p.style.animationDuration = (10 + Math.random() * 12) + 's';
  p.style.animationDelay = (Math.random() * 12) + 's';
  particleHost.appendChild(p);
}

/* ---------- NAVIGATION ---------- */
const navButtons = document.querySelectorAll('.nav-btn[data-target]');
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Highlight the nav item for whichever section is currently in view
const navSections = ['home', 'message', 'memories', 'breathe']
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navButtons.forEach(b => b.classList.remove('active'));
      const match = document.querySelector(`.nav-btn[data-target="${entry.target.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { threshold: 0.4 });

navSections.forEach(sec => navObserver.observe(sec));

/* ---------- HERO ---------- */
document.getElementById('heroBtn').addEventListener('click', (e) => {
  document.getElementById('message').scrollIntoView({ behavior: 'smooth' });
  heartBurst(10, 50);
});

/* ---------- COMFORT CARDS (fade in on scroll) ---------- */
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      cardObserver.unobserve(entry.target); // only animate once
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.comfort-card').forEach(card => cardObserver.observe(card));

/* ---------- ENVELOPE + LETTER ---------- */
// Edit this text to change what the letter says
const LETTER_TEXT = `Hi, Bebi. 🤍

I just want you to remember that you don't have to pretend that everything is okay all the time.

If you're tired, rest.
If you're overwhelmed, breathe.
If you need some time, take it.

You are doing better than you think.

I may not always know exactly what to say, but I hope this little page reminds you that someone cares about you and wants you to be okay.

So please take care of yourself, okay?

One step at a time, Bebi. 🤍`;

const envelope = document.getElementById('envelope');
const envelopeBtn = document.getElementById('envelopeBtn');
const letterOverlay = document.getElementById('letterOverlay');
const letterTextEl = document.getElementById('letterText');
let typingTimer = null;
let letterOpen = false;

function typeLetter() {
  letterTextEl.textContent = '';
  let i = 0;
  clearInterval(typingTimer);
  typingTimer = setInterval(() => {
    letterTextEl.textContent += LETTER_TEXT[i];
    i++;
    if (i >= LETTER_TEXT.length) clearInterval(typingTimer);
  }, 18);
}

function openEnvelope() {
  letterOpen = true;
  envelope.classList.add('open');
  heartBurst(6, 50);
  setTimeout(() => {
    letterOverlay.classList.add('show');
    typeLetter();
  }, 500); // wait for the flap animation before the letter rises
  envelopeBtn.textContent = 'Close Letter';
}

function closeEnvelope() {
  letterOpen = false;
  letterOverlay.classList.remove('show');
  clearInterval(typingTimer);
  setTimeout(() => envelope.classList.remove('open'), 300);
  envelopeBtn.textContent = 'Open my message 💌';
}

envelopeBtn.addEventListener('click', () => (letterOpen ? closeEnvelope() : openEnvelope()));
envelope.addEventListener('click', () => (letterOpen ? closeEnvelope() : openEnvelope()));
// clicking the dark backdrop (outside the paper) also closes the letter
letterOverlay.addEventListener('click', (e) => {
  if (e.target === letterOverlay) closeEnvelope();
});

/* ---------- PHOTO GALLERY ---------- */
// Replace these placeholder photos/captions with your own anytime
const PHOTOS = [
  { src: 'https://cdn.corenexis.com/f/jPWIEzzWlzw.jpg', caption: 'MY favorate Person 🤍' },
  { src: 'https://cdn.corenexis.com/f/hpMBMo0pFlj.jpg', caption: 'you looked so happy here' },
  { src: 'https://cdn.corenexis.com/f/2bG5HIHuepV.jpg', caption: 'ILOVE YOU BEBI' },
  { src: 'https://cdn.corenexis.com/f/faHuK5YJOkv.jpg', caption: 'BEBI' },
  { src: 'https://cdn.corenexis.com/f/txaCIdEoMyL.jpg', caption: 'FUTURE ASAWA KOYAN' },
  { src: 'https://cdn.corenexis.com/f/1OJuX3jiqRa.jpg', caption: 'MY ONE AND ONLY BEBI' },
  { src: 'https://cdn.corenexis.com/f/eN16OLjhwsE.jpg', caption: 'BEBI KO GANDA MO' },
  { src: 'https://cdn.corenexis.com/f/gbBzGSANfXE.jpg', caption: 'ASAWA KOYAN' },
];
const INITIAL_VISIBLE = 6;

const galleryEl = document.getElementById('gallery');
const showMoreBtn = document.getElementById('showMoreBtn');

PHOTOS.forEach((photo, i) => {
  const item = document.createElement('div');
  item.className = 'photo-item' + (i >= INITIAL_VISIBLE ? ' hidden-extra' : '');
  item.dataset.index = i;
  item.innerHTML = `<img src="${photo.src}" alt="${photo.caption}" loading="lazy">
    <div class="photo-caption">${photo.caption}</div>`;
  galleryEl.appendChild(item);
});

// Fade the visible photos in as they enter the viewport
const galleryObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      galleryObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.photo-item').forEach(item => galleryObserver.observe(item));

let extraShown = false;
showMoreBtn.addEventListener('click', () => {
  const extras = document.querySelectorAll('.photo-item.hidden-extra');
  if (!extraShown) {
    extras.forEach((item, i) => {
      item.classList.remove('hidden-extra');
      // slight stagger so photos animate up from the bottom one by one
      setTimeout(() => item.classList.add('show'), i * 100);
    });
    showMoreBtn.textContent = 'Show Less Memories';
  } else {
    document.querySelectorAll('.photo-item').forEach((item, i) => {
      if (i >= INITIAL_VISIBLE) {
        item.classList.remove('show');
        item.classList.add('hidden-extra');
      }
    });
    showMoreBtn.textContent = 'Show More Memories';
    document.getElementById('memories').scrollIntoView({ behavior: 'smooth' });
  }
  extraShown = !extraShown;
});

/* ---------- LIGHTBOX ---------- */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
let currentPhoto = 0;

function openLightbox(index) {
  currentPhoto = index;
  updateLightbox();
  lightbox.classList.add('show');
}
function updateLightbox() {
  lbImg.src = PHOTOS[currentPhoto].src;
  lbImg.alt = PHOTOS[currentPhoto].caption;
  lbCaption.textContent = PHOTOS[currentPhoto].caption;
}
function closeLightbox() {
  lightbox.classList.remove('show');
}
function nextPhoto() {
  currentPhoto = (currentPhoto + 1) % PHOTOS.length;
  updateLightbox();
}
function prevPhoto() {
  currentPhoto = (currentPhoto - 1 + PHOTOS.length) % PHOTOS.length;
  updateLightbox();
}

galleryEl.addEventListener('click', (e) => {
  const item = e.target.closest('.photo-item');
  if (!item) return;
  openLightbox(Number(item.dataset.index));
  heartBurst(4, 50);
});

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbNext').addEventListener('click', nextPhoto);
document.getElementById('lbPrev').addEventListener('click', prevPhoto);

// click outside the photo (on the dark backdrop) closes it
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('show')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextPhoto();
  if (e.key === 'ArrowLeft') prevPhoto();
});

/* ---------- BREATHING ---------- */
const breatheCircle = document.getElementById('breatheCircle');
const breatheText = document.getElementById('breatheText');
let breatheTimer = null;
let breathePhaseIndex = 0;
const BREATHE_PHASES = [
  { label: 'Breathe in…', className: 'in', duration: 4000 },
  { label: 'Hold…', className: 'in', duration: 3000 },
  { label: 'Breathe out…', className: 'out', duration: 4500 },
];

function runBreathePhase() {
  const phase = BREATHE_PHASES[breathePhaseIndex];
  breatheText.textContent = phase.label;
  breatheCircle.classList.remove('in', 'out');
  breatheCircle.classList.add(phase.className);
  breathePhaseIndex = (breathePhaseIndex + 1) % BREATHE_PHASES.length;
  breatheTimer = setTimeout(runBreathePhase, phase.duration);
}

document.getElementById('breatheStart').addEventListener('click', () => {
  if (breatheTimer) return; // already running
  breathePhaseIndex = 0;
  runBreathePhase();
});

document.getElementById('breathePause').addEventListener('click', () => {
  clearTimeout(breatheTimer);
  breatheTimer = null;
  breatheText.textContent = 'Paused';
  breatheCircle.classList.remove('in', 'out');
});

/* ---------- HUG BUTTON ---------- */
const hugOverlay = document.getElementById('hugOverlay');
document.getElementById('hugBtn').addEventListener('click', () => {
  hugOverlay.classList.add('show');
  heartBurst(14, 50);
  setTimeout(() => hugOverlay.classList.remove('show'), 2600);
});

/* ---------- MUSIC (manual only, never autoplays) ---------- */
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let musicPlaying = false;

musicBtn.addEventListener('click', () => {
  if (musicPlaying) {
    bgMusic.pause();
    musicBtn.textContent = '♪ Music';
  } else {
    bgMusic.play().catch(() => {}); // ignore if the placeholder source can't play
    musicBtn.textContent = '♪ Playing';
  }
  musicPlaying = !musicPlaying;
});
