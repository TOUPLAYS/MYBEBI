/* =========================================================
   FOR MY BEBI
   Vanilla JavaScript
   ========================================================= */

// ---------------------------------------------------------
// DOM HELPERS
// ---------------------------------------------------------

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) =>
  Array.from(parent.querySelectorAll(selector));


// ---------------------------------------------------------
// BACKGROUND PARTICLES
// ---------------------------------------------------------

const particleField = $("#particleField");

function createBackgroundParticles() {
  if (!particleField) return;

  const particleCount = window.innerWidth < 700 ? 12 : 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");

    particle.className = "bg-particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.setProperty(
      "--duration",
      `${5 + Math.random() * 8}s`
    );
    particle.style.setProperty(
      "--delay",
      `${Math.random() * -8}s`
    );
    particle.style.setProperty(
      "--drift",
      `${-20 + Math.random() * 40}px`
    );

    particleField.appendChild(particle);
  }
}

createBackgroundParticles();


// ---------------------------------------------------------
// FLOATING HEART SYSTEM
// ---------------------------------------------------------

const heartField = $("#floatingHeartField");
const heartCharacters = ["♡", "♥", "❤", "🤍", "💗", "💕"];
const heartColors = ["#ffd5e2", "#f4aac1", "#eec9da", "#fff0f5"];

function createFloatingHeart({
  left = Math.random() * 100,
  size = 0.8 + Math.random() * 1.1,
  duration = 5.5 + Math.random() * 4,
  drift = -70 + Math.random() * 140,
  rotate = -24 + Math.random() * 48,
  life = null
} = {}) {
  if (!heartField) return;

  const heart = document.createElement("span");

  heart.className = "floating-heart";
  heart.textContent =
    heartCharacters[Math.floor(Math.random() * heartCharacters.length)];

  heart.style.setProperty("--left", `${left}%`);
  heart.style.setProperty("--size", `${size}rem`);
  heart.style.setProperty("--duration", `${duration}s`);
  heart.style.setProperty("--drift", `${drift}px`);
  heart.style.setProperty("--rotate", `${rotate}deg`);
  heart.style.setProperty(
    "--heart-color",
    heartColors[Math.floor(Math.random() * heartColors.length)]
  );

  heartField.appendChild(heart);

  const removeAfter = life || duration * 1000 + 400;

  window.setTimeout(() => {
    heart.remove();
  }, removeAfter);
}

function createHeartBurst(count = 7, centerLeft = 50) {
  for (let i = 0; i < count; i++) {
    createFloatingHeart({
      left: centerLeft + (-7 + Math.random() * 14),
      size: 0.7 + Math.random() * 0.8,
      duration: 3.2 + Math.random() * 2.2,
      drift: -120 + Math.random() * 240,
      rotate: -50 + Math.random() * 100
    });
  }
}

setInterval(() => {
  if (document.visibilityState === "visible") {
    createFloatingHeart({
      size: 0.55 + Math.random() * 0.75,
      duration: 7 + Math.random() * 4
    });
  }
}, 4300);


// ---------------------------------------------------------
// GENERAL REVEAL
// ---------------------------------------------------------

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.13
  }
);

$$(".reveal").forEach((element) => {
  revealObserver.observe(element);
});


// ---------------------------------------------------------
// COMFORT CARDS
// IntersectionObserver + staggered timing
// ---------------------------------------------------------

const cardObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const cards = $$(".comfort-card");
      const currentCard = entry.target;
      const index = cards.indexOf(currentCard);

      window.setTimeout(() => {
        currentCard.classList.add("visible");
      }, index * 140);

      observer.unobserve(currentCard);
    });
  },
  {
    threshold: 0.15
  }
);

$$(".reveal-card").forEach((card) => {
  cardObserver.observe(card);
});


// ---------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------

const navLinks = $$(".nav-link");
const navBrand = $(".nav-brand");
const navMenuToggle = $("#navMenuToggle");
const navLinksContainer = $("#navLinks");

function scrollToSection(id) {
  const target = document.getElementById(id);

  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  navLinksContainer?.classList.remove("open");

  if (navMenuToggle) {
    navMenuToggle.setAttribute("aria-expanded", "false");
  }
}

$$("[data-scroll-target]").forEach((button) => {
  button.addEventListener("click", () => {
    scrollToSection(button.dataset.scrollTarget);
  });
});

navMenuToggle?.addEventListener("click", () => {
  const isOpen = navLinksContainer.classList.toggle("open");
  navMenuToggle.setAttribute("aria-expanded", String(isOpen));
});

const sectionIds = ["home", "message", "memories", "breathe"];

const navSectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleEntry) return;

    navLinks.forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.scrollTarget === visibleEntry.target.id
      );
    });
  },
  {
    threshold: [0.25, 0.5, 0.75],
    rootMargin: "-15% 0px -55% 0px"
  }
);

sectionIds.forEach((id) => {
  const section = document.getElementById(id);
  if (section) navSectionObserver.observe(section);
});


// ---------------------------------------------------------
// HERO BUTTON
// ---------------------------------------------------------

const heroButton = $("#heroButton");

heroButton?.addEventListener("click", () => {
  createHeartBurst(10, 50);
  scrollToSection("message");
});


// ---------------------------------------------------------
// ENVELOPE + LETTER
// ---------------------------------------------------------

const envelope = $("#envelope");
const envelopeTrigger = $("#envelopeTrigger");
const waxSeal = $("#waxSeal");

const letterModal = $("#letterModal");
const letterBackdrop = $("#letterBackdrop");
const modalLetterWrap = $("#modalLetterWrap");
const letterCloseButton = $("#letterCloseButton");
const typedMessage = $("#typedMessage");
const typingCursor = $("#typingCursor");
const letterCopy = $("#letterCopy");
const modalHearts = $("#modalHearts");

let typingTimer = null;
let letterIsOpen = false;

const letterText = letterCopy?.textContent.trim() || "";

function openLetter() {
  if (letterIsOpen) return;

  letterIsOpen = true;

  envelope?.classList.add("is-opening");
  envelope?.classList.add("is-open");

  if (waxSeal) {
    waxSeal.animate(
      [
        { transform: "translate(-50%, -50%) scale(1)" },
        { transform: "translate(-50%, -50%) scale(1.2)" },
        { transform: "translate(-50%, -50%) scale(1)" }
      ],
      {
        duration: 650,
        easing: "ease-out"
      }
    );
  }

  envelopeTrigger.textContent = "Close Letter";

  createHeartBurst(12, 50);

  // Let the envelope visibly open before showing the full letter.
  window.setTimeout(() => {
    letterModal.classList.add("is-open");
    letterModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open", "no-scroll");

    typedMessage.textContent = "";
    typingCursor.style.display = "inline-block";

    createModalHeartBurst(10);
    typeLetter();

    window.setTimeout(() => {
      letterCloseButton.focus();
    }, 250);
  }, 420);

  envelope?.classList.remove("is-opening");
}

function closeLetter() {
  if (!letterIsOpen) return;

  letterIsOpen = false;

  clearTimeout(typingTimer);

  letterModal.classList.remove("is-open");
  letterModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open", "no-scroll");

  typingCursor.style.display = "none";

  envelope?.classList.remove("is-open");

  envelopeTrigger.textContent = "Open my message 💌";

  window.setTimeout(() => {
    typedMessage.textContent = "";
  }, 400);
}

function typeLetter() {
  if (!typedMessage) return;

  const characters = Array.from(letterText);
  let index = 0;

  const speedForCharacter = (character) => {
    if (character === "\n") return 55;
    if (/[.!?]/.test(character)) return 100;
    if (character === ",") return 65;
    return 24;
  };

  function typeNextCharacter() {
    if (!letterIsOpen) return;

    if (index >= characters.length) {
      typingCursor.style.display = "none";
      return;
    }

    typedMessage.textContent += characters[index];
    index += 1;

    typingTimer = window.setTimeout(
      typeNextCharacter,
      speedForCharacter(characters[index - 1])
    );
  }

  typeNextCharacter();
}

function createModalHeartBurst(count = 8) {
  if (!modalHearts) return;

  modalHearts.innerHTML = "";

  const symbols = ["♡", "🤍", "♥", "💗"];

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");

    heart.className = "modal-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${15 + Math.random() * 70}%`;
    heart.style.bottom = `${12 + Math.random() * 12}%`;
    heart.style.setProperty("--duration", `${3.8 + Math.random() * 2.5}s`);
    heart.style.setProperty("--drift", `${-100 + Math.random() * 200}px`);
    heart.style.setProperty("--rotate", `${-35 + Math.random() * 70}deg`);
    heart.style.fontSize = `${0.8 + Math.random() * 1.1}rem`;

    modalHearts.appendChild(heart);
  }

  window.setTimeout(() => {
    modalHearts.innerHTML = "";
  }, 7000);
}

envelope?.addEventListener("click", () => {
  if (!letterIsOpen) {
    openLetter();
  }
});

envelopeTrigger?.addEventListener("click", () => {
  if (letterIsOpen) {
    closeLetter();
  } else {
    openLetter();
  }
});

letterCloseButton?.addEventListener("click", closeLetter);

letterBackdrop?.addEventListener("click", closeLetter);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && letterIsOpen) {
    closeLetter();
  }
});


// ---------------------------------------------------------
// GALLERY
// ---------------------------------------------------------

const gallery = $("#memoryGallery");
const showMoreButton = $("#showMoreButton");
const extraMemories = $$(".extra-memory");

const galleryItems = $$(".memory-card");

let galleryShown = false;

function revealExtraMemories() {
  extraMemories.forEach((card, index) => {
    card.classList.remove("hide-ready");
    card.classList.add("is-revealing");

    // Reset reveal state to allow the CSS transition to see the change.
    card.style.opacity = "0";
    card.style.transform = "translateY(28px) scale(0.985)";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0) scale(1)";
      });
    });

    window.setTimeout(() => {
      card.style.opacity = "";
      card.style.transform = "";
      card.classList.add("visible");
    }, 720 + index * 45);
  });

  showMoreButton.textContent = "Show Less Memories";
  galleryShown = true;
}

function hideExtraMemories() {
  extraMemories.forEach((card, index) => {
    card.classList.add("hide-ready");

    window.setTimeout(() => {
      card.classList.remove("is-revealing", "hide-ready", "visible");
      card.style.opacity = "";
      card.style.transform = "";
    }, 430 + index * 15);
  });

  showMoreButton.textContent = "Show More Memories";
  galleryShown = false;
}

showMoreButton?.addEventListener("click", () => {
  if (galleryShown) {
    hideExtraMemories();
  } else {
    revealExtraMemories();
  }
});


// ---------------------------------------------------------
// GALLERY REVEAL OBSERVER
// ---------------------------------------------------------

const photoObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.08
  }
);

galleryItems.forEach((card, index) => {
  // Hide extra cards from the observer until requested.
  if (card.classList.contains("extra-memory")) return;

  card.style.transitionDelay = `${Math.min(index * 70, 450)}ms`;
  photoObserver.observe(card);
});


// ---------------------------------------------------------
// LIGHTBOX
// ---------------------------------------------------------

const lightbox = document.createElement("div");
lightbox.className = "photo-lightbox";
lightbox.setAttribute("aria-hidden", "true");

lightbox.innerHTML = `
  <div class="lightbox-backdrop"></div>

  <div class="lightbox-content" role="dialog" aria-modal="true" aria-label="Photo viewer">
    <div class="lightbox-image-wrap">
      <img class="lightbox-image" src="" alt="" />
      <button class="lightbox-close" type="button" aria-label="Close image">✕</button>
      <button class="lightbox-prev" type="button" aria-label="Previous image">‹</button>
      <button class="lightbox-next" type="button" aria-label="Next image">›</button>
    </div>

    <p class="lightbox-caption"></p>
  </div>
`;

document.body.appendChild(lightbox);

const lightboxImage = $(".lightbox-image", lightbox);
const lightboxCaption = $(".lightbox-caption", lightbox);
const lightboxClose = $(".lightbox-close", lightbox);
const lightboxPrev = $(".lightbox-prev", lightbox);
const lightboxNext = $(".lightbox-next", lightbox);
const lightboxBackdrop = $(".lightbox-backdrop", lightbox);

let currentPhotoIndex = 0;

function getCurrentGalleryCards() {
  return $$(".memory-card.is-revealing, .memory-card:not(.extra-memory)");
}

function openLightbox(index) {
  const cards = getCurrentGalleryCards();

  if (!cards.length) return;

  currentPhotoIndex =
    (index + cards.length) % cards.length;

  const card = cards[currentPhotoIndex];
  const image = $("img", card);

  if (!image) return;

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent =
    card.dataset.caption || $("figcaption", card)?.textContent || "";

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");

  createHeartBurst(6, 50);

  lightboxImage.animate(
    [
      {
        transform: "scale(0.94)",
        opacity: 0.65
      },
      {
        transform: "scale(1)",
        opacity: 1
      }
    ],
    {
      duration: 450,
      easing: "cubic-bezier(.2,.8,.2,1)"
    }
  );

  window.setTimeout(() => {
    lightboxClose.focus();
  }, 100);
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");

  if (!letterIsOpen) {
    document.body.classList.remove("no-scroll");
  }
}

function changeLightboxPhoto(direction) {
  const cards = getCurrentGalleryCards();

  if (!cards.length) return;

  currentPhotoIndex =
    (currentPhotoIndex + direction + cards.length) % cards.length;

  const card = cards[currentPhotoIndex];
  const image = $("img", card);

  lightboxImage.animate(
    [
      {
        opacity: 0,
        transform:
          direction > 0
            ? "translateX(18px) scale(0.97)"
            : "translateX(-18px) scale(0.97)"
      },
      {
        opacity: 1,
        transform: "translateX(0) scale(1)"
      }
    ],
    {
      duration: 300,
      easing: "ease-out"
    }
  );

  window.setTimeout(() => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent =
      card.dataset.caption || $("figcaption", card)?.textContent || "";
  }, 50);

  createHeartBurst(4, 50);
}

gallery?.addEventListener("click", (event) => {
  const card = event.target.closest(".memory-card");

  if (!card) return;

  const cards = getCurrentGalleryCards();
  const index = cards.indexOf(card);

  if (index === -1) return;

  openLightbox(index);
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxBackdrop.addEventListener("click", closeLightbox);

lightboxPrev.addEventListener("click", () => {
  changeLightboxPhoto(-1);
});

lightboxNext.addEventListener("click", () => {
  changeLightboxPhoto(1);
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    changeLightboxPhoto(-1);
  }

  if (event.key === "ArrowRight") {
    changeLightboxPhoto(1);
  }
});


// ---------------------------------------------------------
// BREATHING SYSTEM
// ---------------------------------------------------------

const breathCircle = $("#breathCircle");
const breathPhase = $("#breathPhase");
const breathProgressBar = $("#breathProgressBar");
const breathStart = $("#breathStart");
const breathPause = $("#breathPause");

const breathPhases = [
  {
    name: "Breathe in…",
    duration: 4000,
    className: "breathe-in"
  },
  {
    name: "Hold…",
    duration: 2000,
    className: "breathe-hold"
  },
  {
    name: "Breathe out…",
    duration: 4000,
    className: "breathe-out"
  }
];

let breathing = false;
let breathAnimationFrame = null;
let breathStartedAt = 0;
let breathPhaseIndex = 0;
let breathPhaseElapsed = 0;

function setBreathPhase(index) {
  const phase = breathPhases[index];

  if (!phase) return;

  breathCircle.classList.remove(
    "breathe-in",
    "breathe-hold",
    "breathe-out"
  );

  breathCircle.classList.add(phase.className);
  breathPhase.textContent = phase.name;
}

function updateBreath(now) {
  if (!breathing) return;

  const phase = breathPhases[breathPhaseIndex];
  const elapsed =
    now - breathStartedAt + breathPhaseElapsed;

  const progress = Math.min(elapsed / phase.duration, 1);

  breathProgressBar.style.width = `${progress * 100}%`;

  if (progress >= 1) {
    breathPhaseIndex =
      (breathPhaseIndex + 1) % breathPhases.length;

    breathPhaseElapsed = 0;
    breathStartedAt = now;

    setBreathPhase(breathPhaseIndex);
  }

  breathAnimationFrame = requestAnimationFrame(updateBreath);
}

function startBreathing() {
  if (breathing) return;

  breathing = true;
  breathStartedAt = performance.now();
  setBreathPhase(breathPhaseIndex);

  breathAnimationFrame = requestAnimationFrame(updateBreath);
}

function pauseBreathing() {
  if (!breathing) return;

  const now = performance.now();

  breathPhaseElapsed += now - breathStartedAt;
  breathing = false;

  cancelAnimationFrame(breathAnimationFrame);
}

breathStart?.addEventListener("click", startBreathing);
breathPause?.addEventListener("click", pauseBreathing);


// ---------------------------------------------------------
// HUG FEATURE
// ---------------------------------------------------------

const hugButton = $("#hugButton");
const hugCard = $("#hugCard");
const hugMessage = $("#hugMessage");
const hugHeart = $("#hugHeart");
const hugBurst = $("#hugBurst");
const screenPulse = $("#screenPulse");

let hugMessageTimer = null;

function createHugBurst() {
  if (!hugBurst) return;

  hugBurst.innerHTML = "";

  const symbols = ["♡", "🤍", "💗", "♥", "✦"];

  for (let i = 0; i < 14; i++) {
    const particle = document.createElement("span");

    particle.className = "hug-particle";
    particle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    particle.style.setProperty(
      "--x",
      `${-180 + Math.random() * 360}px`
    );
    particle.style.setProperty(
      "--y",
      `${-150 + Math.random() * 300}px`
    );
    particle.style.setProperty(
      "--rot",
      `${-180 + Math.random() * 360}deg`
    );

    hugBurst.appendChild(particle);
  }
}

hugButton?.addEventListener("click", () => {
  clearTimeout(hugMessageTimer);

  hugCard.classList.remove("hug-active");

  requestAnimationFrame(() => {
    hugCard.classList.add("hug-active");
  });

  screenPulse.classList.remove("active");

  requestAnimationFrame(() => {
    screenPulse.classList.add("active");
  });

  createHugBurst();

  if (hugHeart) {
    hugHeart.animate(
      [
        { transform: "scale(0.92)" },
        { transform: "scale(1.18)" },
        { transform: "scale(1)" }
      ],
      {
        duration: 900,
        easing: "ease-out"
      }
    );
  }

  hugMessage.textContent = "Sending you a big virtual hug. 🤍";

  createHeartBurst(9, 50);

  hugMessageTimer = window.setTimeout(() => {
    hugMessage.style.opacity = "0";

    window.setTimeout(() => {
      hugMessage.textContent = "Whenever you need one, okay?";
      hugMessage.style.opacity = "1";
    }, 300);
  }, 3500);
});


// ---------------------------------------------------------
// MUSIC
// ---------------------------------------------------------

const musicButton = $("#musicButton");
const musicStatus = $("#musicStatus");
const bgMusic = $("#bgMusic");

let musicStatusTimer = null;

function showMusicStatus(message) {
  clearTimeout(musicStatusTimer);

  musicStatus.textContent = message;
  musicStatus.classList.add("show");

  musicStatusTimer = window.setTimeout(() => {
    musicStatus.classList.remove("show");
  }, 2600);
}

musicButton?.addEventListener("click", async () => {
  if (!bgMusic) return;

  const source =
    bgMusic.querySelector("source")?.getAttribute("src") || "";

  const isPlaceholder =
    !source ||
    source.includes("your-music-file.mp3") ||
    source.includes("example.com");

  if (isPlaceholder) {
    showMusicStatus(
      "Replace “your-music-file.mp3” in the HTML with your own song."
    );
    return;
  }

  try {
    if (bgMusic.paused) {
      await bgMusic.play();
      musicButton.textContent = "♫ Music On";
      showMusicStatus("Music is playing softly. 🤍");
    } else {
      bgMusic.pause();
      musicButton.textContent = "♪ Music";
      showMusicStatus("Music paused.");
    }
  } catch (error) {
    showMusicStatus(
      "Your browser blocked the audio. Tap the button again."
    );
  }
});


// ---------------------------------------------------------
// CLOSE MOBILE NAV WHEN CLICKING OUTSIDE
// ---------------------------------------------------------

document.addEventListener("click", (event) => {
  if (!navLinksContainer?.classList.contains("open")) return;

  const clickedInsideNav =
    event.target.closest(".floating-nav");

  if (!clickedInsideNav) {
    navLinksContainer.classList.remove("open");
    navMenuToggle?.setAttribute("aria-expanded", "false");
  }
});


// ---------------------------------------------------------
// INITIAL ACCESSIBILITY STATE
// ---------------------------------------------------------

if (typingCursor) {
  typingCursor.style.display = "none";
}

if (letterModal) {
  letterModal.setAttribute("aria-hidden", "true");
}

if (lightbox) {
  lightbox.setAttribute("aria-hidden", "true");
}


// ---------------------------------------------------------
// SMALL STARTUP HEARTS
// ---------------------------------------------------------

window.setTimeout(() => {
  createHeartBurst(4, 50);
}, 1200);