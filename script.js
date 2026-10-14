/* =====================================================
   For My Mommy ♡ — script.js
   Beginner-friendly guide:
   1. CONFIG ........ ALL the words, names, photos and dates you can edit
   2. Helpers ....... small tools used everywhere
   3. Effects ....... hearts & sparkles
   4+ Features ...... intro, countdown, timeline, letter, garden, gallery,
                      reasons, messages, heart button, dreams, surprise
                      sequence, secret, music, navigation
   ===================================================== */
(() => {
  'use strict';

  /* =====================================================
     1. CONFIG — EDIT THIS PART TO MAKE IT YOURS ♡
     ===================================================== */
  const CONFIG = {
    mommyName: 'Mommy',          // what you call her in the page
    myName: 'Your Name',         // your name (letter sign-off + footer)

    // Month is 1-12. Uses the visitor's own local time.
    targetDate: { year: 2026, month: 10, day: 25 },

    // Put your own song here (only use music you have permission to use).
    audioSrc: 'assets/our-song.mp3',

    welcomeMessage: 'I hope this little corner of the internet makes you smile. Take your time — everything here was made thinking of you.',

    // ---- Our Little Story (edit title/date/text/image for each) ----
    timeline: [
      { icon: '✦', title: 'Where Our Story Began', date: 'Add our date here',
        text: 'Every story starts somewhere. Replace this text with how ours began — the first message, the first smile, the moment I knew you were special.',
        image: 'assets/images/story-1.jpg' },
      { icon: '♡', title: 'My Favorite Memories With You', date: 'Add a date',
        text: 'Write about a memory you treasure. Even a small one counts — maybe especially the small ones.',
        image: 'assets/images/story-2.jpg' },
      { icon: '☺', title: 'The Moments You Made Me Smile', date: 'Add a date',
        text: 'Think of a time you made my day lighter. Tell her about it here, in your own words.',
        image: 'assets/images/story-3.jpg' },
      { icon: '❀', title: 'Challenges We Got Through', date: 'Add a date',
        text: 'Not every day is easy, and that is okay. Share something we worked through together and what it taught us.',
        image: 'assets/images/story-4.jpg' },
      { icon: '✿', title: 'Things I Appreciate About You', date: 'Add a date',
        text: 'List the little things you are thankful for — the way you check in, the way you listen, anything that is truly her.',
        image: 'assets/images/story-5.jpg' },
      { icon: '☆', title: 'Dreams I Want to Share With You', date: 'Add a date',
        text: 'Write a gentle hope for the future — something realistic, something warm, something we can look forward to together.',
        image: 'assets/images/story-6.jpg' }
    ],

    // ---- The love letter. Each string is one line/paragraph ----
    letter: {
      greeting: 'My dearest Mommy,',
      paragraphs: [
        'I wanted to give you something more than a quick text, so I made this for you. It took some time, but every little part of it was me thinking about you.',
        'You matter so much to me. I\'m really grateful to have you, and I don\'t say it enough. Thank you for being someone I can talk to, laugh with, and just be myself around.',
        'I know the distance isn\'t easy. Some days I wish I could just be there. But I want you to know the miles don\'t make what I feel any smaller. If anything, they make me notice how much I value every message, every call, and every moment we get.',
        'I want to keep listening to you properly, and to make time for you even when school and life get busy. If I get things wrong, I hope you\'ll tell me, and I\'ll try my best to understand. I\'m still learning, and I\'d love for us to keep learning and growing together.',
        'I also notice the little things you do: the small efforts, the kind words, the way you check in on me. They are not small to me.',
        'For our October 25, 2026 monthsary, I wish us a happy and peaceful day, and many more like it. I hope you feel loved today and every day.'
      ],
      closing: 'With all my love,'
    },

    // ---- Photos. Drop your pictures in assets/images/ and match the names ----
    photos: [
      { src: 'assets/images/photo-1.jpg', caption: 'Our little moment #1' },
      { src: 'assets/images/photo-2.jpg', caption: 'Our little moment #2' },
      { src: 'assets/images/photo-3.jpg', caption: 'Our little moment #3' },
      { src: 'assets/images/photo-4.jpg', caption: 'Our little moment #4' },
      { src: 'assets/images/photo-5.jpg', caption: 'Our little moment #5' },
      { src: 'assets/images/photo-6.jpg', caption: 'Our little moment #6' }
    ],

    // ---- Reasons deck (add or remove freely) ----
    reasons: [
      'You make ordinary days feel a little softer just by being part of them.',
      'Talking with you feels comfortable, like I don\'t have to try so hard to be myself.',
      'Your kindness shows up in small ways, and I notice them more than you might know.',
      'You\'re patient with me, even on the days I\'m not at my best.',
      'You make me want to be more honest, because honesty matters so much between us.',
      'Even the plain, boring moments are better when I get to share them with you.',
      'I\'m learning from you, and I love that we get to learn from each other.',
      'You put in effort, and I see it. Thank you for it.',
      'Trust with you feels natural, and I never want to take that for granted.',
      'Your understanding makes hard conversations feel safer.',
      'Even with the distance, you make me feel close.',
      'I love that we can talk things through together, calmly and honestly.',
      'A message from you can change the mood of my whole day.',
      'I\'m grateful that we both keep choosing to try.'
    ],

    // ---- Message generator ----
    messageCategories: [
      { id: 'sweet', label: 'Sweet' },
      { id: 'reassuring', label: 'Reassuring' },
      { id: 'thankful', label: 'Thankful' },
      { id: 'missing', label: 'Missing You' },
      { id: 'monthsary', label: 'Monthsary Wishes' }
    ],
    messages: {
      sweet: [
        'You make my ordinary days feel softer, Mommy. Thank you for that.',
        'Just thinking of you is enough to make me smile today.',
        'I hope your day feels as gentle as you make mine feel.',
        'You\'re one of my favorite people to talk to, and I really mean that.',
        'Being yours is one of the happiest parts of my life right now.',
        'If I could, I\'d send you a hug through the screen. Consider this one delivered.'
      ],
      reassuring: [
        'I\'m here, Mommy. Even when life gets busy, I\'m still choosing you.',
        'If you\'re feeling unsure today, you don\'t have to carry it alone. Talk to me.',
        'Distance is hard, but it doesn\'t change how much you matter to me.',
        'We can take things one day at a time. I\'m not going anywhere.',
        'You\'re allowed to have off days. I\'ll still be on your side.',
        'Whatever you\'re worried about, we can talk it through together, calmly and honestly.'
      ],
      thankful: [
        'Thank you for your patience with me. It means more than I usually say.',
        'Thank you for the little efforts you make. I notice every one of them.',
        'Thank you for being someone I can be honest with.',
        'I\'m grateful for every message, call, and moment we share.',
        'Thank you for understanding me, even on the days I\'m hard to understand.',
        'Thank you for being you. That\'s honestly all I need to say.'
      ],
      missing: [
        'I miss you today, Mommy, especially in the quiet little moments.',
        'I wish I could be next to you right now, even just to sit in silence.',
        'The distance feels long on the days I miss you, but thinking of you makes it feel shorter.',
        'I miss your voice, your messages, and just knowing you\'re there.',
        'Missing you is a reminder of how lucky I am to have someone worth missing.',
        'Find me in your thoughts today. I\'ll be thinking of you too.'
      ],
      monthsary: [
        'Happy monthsary, Mommy! I\'m so glad we get to celebrate another month together. ♡',
        'Wishing us a peaceful, happy October 25, and many more months to come.',
        'Another month of you and me. Thank you for making it a good one.',
        'Happy monthsary! I hope today brings you something that makes you smile.',
        'To us, to the distance we\'re getting through, and to the little things that make us stronger. Happy monthsary!',
        'I hope today feels like a hug, even from far away. Happy monthsary, my Mommy.'
      ]
    },

    heartResponses: [
      'Aww, that one landed right in my heart ♡',
      'Another heart, another smile.',
      'Sending a warm hug right back to you.',
      'You\'re so sweet — keep them coming!',
      'My heart did a little flip.',
      'Received with so much love ♡',
      'That\'s the kind of thing that makes a day better.',
      'Hearts like these are my favorite.'
    ],

    // ---- Dreams ----
    dreams: [
      { icon: '☾', title: 'Spending Quality Time Together',
        text: 'Time together doesn\'t have to be fancy. Even a simple call, where we\'re both fully there, is something I want to keep making space for.' },
      { icon: '✿', title: 'Making More Happy Memories',
        text: 'I\'d love for us to keep collecting little memories: the funny ones, the quiet ones, and the ones we don\'t expect.' },
      { icon: '✎', title: 'Supporting Each Other\'s Studies & Goals',
        text: 'I want to cheer you on with your goals, and I hope you\'ll do the same for me. We can be each other\'s biggest fans.' },
      { icon: '☁', title: 'Communicating Honestly',
        text: 'I want us to be able to say how we really feel, kindly and honestly, even when it\'s not easy.' },
      { icon: '✈', title: 'Planning a Visit, When Possible',
        text: 'Someday, when time and situation allow, I\'d love for us to plan a visit together. For now, I\'m happy to dream about it with you.' },
      { icon: '❀', title: 'Growing Together & Individually',
        text: 'I hope we both keep growing, on our own and together, at a pace that feels right for us.' }
    ],

    // ---- Special surprise sequence text ----
    surprise: {
      intro: 'Mommy, before anything else: thank you for being you. This little surprise is my way of saying so.',
      heartLine: 'Here\'s a little love, sent your way…',
      gardenLine: 'And a garden, just for you.',
      note: 'Distance can\'t change how much you mean to me. I\'m grateful for you today and every day.',
      finalTitle: 'HAPPY MONTHSARY, MY MOMMY! ♡',
      finalText: 'October 25, 2026 — I hope this day feels warm and special.'
    },

    // ---- Hidden secret letter (tap the footer heart 3 times) ----
    secret: {
      title: 'You found it ♡',
      paragraphs: [
        'You found my little secret, Mommy. I hid this here because some things feel better said quietly.',
        'Thank you for being patient with me, for listening, and for choosing to keep growing with me. I\'m so thankful for you.',
        'Whatever today looks like for you, I hope you feel loved.'
      ],
      closing: 'Always yours,'
    }
  };

  /* =====================================================
     2. HELPERS
     ===================================================== */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const reduceMotionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  const prefersReducedMotion = () => reduceMotionQuery.matches;

  const rand = (min, max) => Math.random() * (max - min) + min;

  /** Creates an element: el('div', {class:'x', text:'hi'}, child1, child2) */
  function el(tag, attrs, ...kids) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([key, value]) => {
      if (value === false || value == null) return;
      if (key === 'text') node.textContent = value;
      else node.setAttribute(key, value === true ? '' : value);
    });
    kids.flat().forEach((kid) => node.append(kid));
    return node;
  }

  function shuffle(list) {
    const arr = list.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /** Gives random items without repeats until every item has been used. */
  function createBag(items) {
    let pool = [];
    let last = null;
    return {
      next() {
        if (!pool.length) {
          pool = shuffle(items);
          if (pool.length > 1 && pool[pool.length - 1] === last) {
            [pool[0], pool[pool.length - 1]] = [pool[pool.length - 1], pool[0]];
          }
        }
        last = pool.pop();
        return last;
      }
    };
  }

  /** Mixes two hex colours: mixColor('#d6455f', '#ffffff', 0.4) */
  function mixColor(hexA, hexB, amount) {
    const parse = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    const a = parse(hexA);
    const b = parse(hexB);
    return '#' + a.map((v, i) => Math.round(v + (b[i] - v) * amount).toString(16).padStart(2, '0')).join('');
  }

  /** Remembers & clears timers so nothing keeps running by accident. */
  function createTimerBox() {
    let ids = [];
    return {
      after(ms, fn) {
        const id = setTimeout(() => { ids = ids.filter((x) => x !== id); fn(); }, ms);
        ids.push(id);
        return id;
      },
      clear() { ids.forEach(clearTimeout); ids = []; }
    };
  }

  function scrollToEl(target) {
    if (!target) return;
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) { /* fall through to the older method */ }
    try {
      const area = el('textarea', { 'aria-hidden': 'true' });
      area.value = text;
      area.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
      document.body.append(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      return ok;
    } catch (err) { return false; }
  }

  /** Shows a photo, or a pretty placeholder if the file is missing. */
  function createPhoto(src, alt, label) {
    const wrap = el('span', { class: 'photo' });
    wrap.append(el('span', { class: 'photo__placeholder', 'aria-hidden': 'true' },
      el('span', { class: 'photo__heart', text: '♡' }),
      el('span', { class: 'photo__label', text: label })));
    if (src) {
      const img = new Image();
      img.className = 'photo__img';
      img.alt = alt || '';
      img.decoding = 'async';
      img.addEventListener('load', () => wrap.classList.add('is-loaded'));
      img.addEventListener('error', () => { img.remove(); wrap.classList.add('is-missing'); });
      img.src = src;
      wrap.append(img);
    }
    return wrap;
  }

  /* ---- Focus management for dialogs ---- */
  const dialogState = { opener: null };
  function focusables(root) {
    return $$('button, [href], input, [tabindex]:not([tabindex="-1"])', root).filter((n) => !n.disabled && n.offsetParent !== null);
  }
  function trapFocus(event, root) {
    if (event.key !== 'Tab') return;
    const list = focusables(root);
    if (!list.length) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  /* Fill in names wherever data-bind is used */
  $$('[data-bind]').forEach((node) => { node.textContent = CONFIG[node.dataset.bind] || node.textContent; });
  document.documentElement.classList.remove('no-js');

  /* =====================================================
     3. EFFECTS — floating hearts & sparkles
     ===================================================== */
  const fxLayer = $('#fx');
  let fxActive = 0;
  const FX_MAX = 140;
  const FX_COLORS = ['#d6455f', '#e8607b', '#f3a6c1', '#b79be8', '#f6c85f'];

  function spawnFx(className, x, y, vars, duration, glyph) {
    if (prefersReducedMotion() || fxActive >= FX_MAX) return;
    const node = el('span', { class: `fx ${className}`, text: glyph });
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.style.color = vars.color || '';
    Object.entries(vars).forEach(([k, v]) => { if (k.startsWith('--')) node.style.setProperty(k, v); });
    node.style.animationDuration = `${duration}ms`;
    if (vars.delay) node.style.animationDelay = `${vars.delay}ms`;
    fxActive++;
    node.addEventListener('animationend', () => { node.remove(); fxActive--; }, { once: true });
    fxLayer.append(node);
  }

  /** Burst of little hearts and sparkles from a point on screen */
  function burst(x, y, count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = rand(0, Math.PI * 2);
      const dist = rand(40, 120);
      spawnFx('fx--burst', x, y, {
        '--dx': `${Math.cos(angle) * dist}px`,
        '--dy': `${Math.sin(angle) * dist - 20}px`,
        '--rot': `${rand(-90, 90)}deg`,
        '--size': `${rand(12, 24)}px`,
        color: FX_COLORS[i % FX_COLORS.length]
      }, rand(700, 1100), i % 3 === 0 ? '✦' : '♥');
    }
  }
  function burstFrom(node, count) {
    const r = node.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, count);
  }
  /** Hearts that rise up the screen */
  function floatingHearts(count = 24) {
    for (let i = 0; i < count; i++) {
      spawnFx('fx--rise', rand(0, window.innerWidth), window.innerHeight + 10, {
        '--drift': `${rand(-60, 60)}px`,
        '--size': `${rand(16, 32)}px`,
        color: FX_COLORS[i % FX_COLORS.length],
        delay: i * 110
      }, rand(3800, 6200), i % 4 === 0 ? '✦' : '♥');
    }
  }

  /* =====================================================
     4. INTRO + OPENING SEQUENCE
     ===================================================== */
  const introEl = $('#intro');
  const introSky = $('#introSky');
  const welcomeEl = $('#welcome');
  const welcomeTimers = createTimerBox();
  let isOpened = false;

  function buildIntroSky() {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 46; i++) {
      const star = el('span', { class: 'star' + (i % 4 === 0 ? ' star--twinkle' : '') });
      star.style.cssText = `--x:${rand(0, 100)}%;--y:${rand(0, 90)}%;--s:${rand(1.5, 3.5).toFixed(1)}px;--t:${rand(1.8, 4).toFixed(1)}s;--d:${(-rand(0, 4)).toFixed(1)}s`;
      frag.append(star);
    }
    if (!prefersReducedMotion()) {
      for (let i = 0; i < 12; i++) {
        const petal = el('span', { class: 'petal' });
        petal.style.cssText = `--x:${rand(0, 100)}%;--s:${rand(10, 18).toFixed(0)}px;--t:${rand(9, 16).toFixed(1)}s;--d:${(-rand(0, 14)).toFixed(1)}s`;
        frag.append(petal);
      }
    }
    introSky.append(frag);
  }

  function showWelcome() {
    $('#welcomeText').textContent = CONFIG.welcomeMessage;
    welcomeEl.hidden = false;
    welcomeTimers.clear();
    welcomeTimers.after(8000, hideWelcome);
  }
  function hideWelcome() { welcomeTimers.clear(); welcomeEl.hidden = true; }

  function openMainSite() {
    if (isOpened) return;
    isOpened = true;
    $('#openBtn').disabled = true;
    introEl.classList.add('is-leaving');
    burstFrom($('.intro__heart'), 16);
    setTimeout(() => {
      introEl.hidden = true;
      introSky.replaceChildren();
      document.body.classList.remove('is-locked');
      document.body.classList.add('is-opened');
      $$('[inert]').forEach((node) => node.removeAttribute('inert'));
      window.scrollTo(0, 0);
      showWelcome();
      const title = $('#heroTitle');
      if (title) title.focus({ preventScroll: true });
    }, prefersReducedMotion() ? 50 : 1100);
  }

  $('#openBtn').addEventListener('click', openMainSite);
  $('#welcomeClose').addEventListener('click', hideWelcome);
  buildIntroSky();

  /* =====================================================
     5. COUNTDOWN
     ===================================================== */
  const target = new Date(CONFIG.targetDate.year, CONFIG.targetDate.month - 1, CONFIG.targetDate.day, 0, 0, 0, 0);
  const cd = {
    days: $('#cdDays'), hours: $('#cdHours'), minutes: $('#cdMinutes'), seconds: $('#cdSeconds'),
    grid: $('#cdGrid'), celebrate: $('#cdCelebrate'), celebrateText: $('#cdCelebrateText'),
    interval: null, wasCounting: false
  };
  const pad2 = (n) => String(n).padStart(2, '0');
  const setText = (node, value) => { if (node.textContent !== value) node.textContent = value; };

  function showCelebration() {
    const today = new Date();
    const sameDay = today.getFullYear() === target.getFullYear() && today.getMonth() === target.getMonth() && today.getDate() === target.getDate();
    cd.grid.hidden = true;
    cd.celebrate.hidden = false;
    cd.celebrateText.textContent = sameDay
      ? 'Today is our day. I hope it\'s filled with happiness, Mommy.'
      : 'Our monthsary was on October 25, 2026. I hope it made you feel loved.';
    if (cd.interval) { clearInterval(cd.interval); cd.interval = null; }
    if (cd.wasCounting) {
      cd.wasCounting = false;
      burstFrom(cd.celebrate, 20);
      floatingHearts(18);
    }
  }

  function updateCountdown() {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) { showCelebration(); return; }
    cd.wasCounting = true;
    const total = Math.floor(diff / 1000);
    setText(cd.days, String(Math.floor(total / 86400)));
    setText(cd.hours, pad2(Math.floor((total % 86400) / 3600)));
    setText(cd.minutes, pad2(Math.floor((total % 3600) / 60)));
    setText(cd.seconds, pad2(total % 60));
  }
  updateCountdown();
  if (target.getTime() > Date.now()) cd.interval = setInterval(updateCountdown, 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && cd.interval) updateCountdown(); });

  /* =====================================================
     6. TIMELINE
     ===================================================== */
  (function renderTimeline() {
    const list = $('#timelineList');
    CONFIG.timeline.forEach((item) => {
      const photoWrap = el('div', { class: 'timeline__photo' }, createPhoto(item.image, `${item.title} photo`, `Add photo: ${item.image}`));
      const card = el('div', { class: 'timeline__card glass-card' },
        photoWrap,
        el('span', { class: 'timeline__date', text: item.date }),
        el('h3', { class: 'timeline__title', text: item.title }),
        el('p', { class: 'timeline__text', text: item.text }));
      const icon = el('span', { class: 'timeline__icon', 'aria-hidden': 'true' }, el('span', { text: item.icon }));
      list.append(el('article', { class: 'timeline__item reveal' }, icon, card));
    });
  })();

  /* =====================================================
     7. LOVE LETTER
     ===================================================== */
  const letterUi = {
    stage: $('#letterStage'), envelope: $('#envelopeBtn'), sheet: $('#letterSheet'), paper: $('#letterPaper'),
    openBtn: $('#letterOpen'), revealBtn: $('#letterReveal'), closeBtn: $('#letterClose'),
    lines: [], isOpen: false, timers: createTimerBox()
  };

  (function buildLetter() {
    const L = CONFIG.letter;
    const add = (text, cls) => { const p = el('p', { class: `letter__line ${cls || ''}`, text }); letterUi.paper.append(p); letterUi.lines.push(p); };
    add(L.greeting);
    L.paragraphs.forEach((t) => add(t));
    add(L.closing, 'letter__sign');
    add(CONFIG.myName, 'letter__sign');
  })();

  function updateLetterButtons() {
    const allShown = letterUi.lines.every((p) => p.classList.contains('is-shown'));
    letterUi.openBtn.disabled = letterUi.isOpen;
    letterUi.revealBtn.disabled = !letterUi.isOpen || allShown;
    letterUi.closeBtn.disabled = !letterUi.isOpen;
  }
  function revealAllLetter() {
    letterUi.timers.clear();
    letterUi.lines.forEach((p) => p.classList.add('is-shown'));
    updateLetterButtons();
  }
  function openLetter() {
    if (letterUi.isOpen) return;
    letterUi.isOpen = true;
    letterUi.envelope.classList.add('is-open');
    letterUi.envelope.setAttribute('aria-expanded', 'true');
    letterUi.envelope.setAttribute('aria-label', 'The love letter is open');
    letterUi.sheet.classList.add('is-open');
    letterUi.sheet.setAttribute('aria-hidden', 'false');
    burstFrom(letterUi.envelope, 14);
    if (prefersReducedMotion()) {
      revealAllLetter();
    } else {
      letterUi.lines.forEach((p, i) => {
        letterUi.timers.after(1000 + i * 1300, () => { p.classList.add('is-shown'); updateLetterButtons(); });
      });
    }
    updateLetterButtons();
  }
  function closeLetter() {
    if (!letterUi.isOpen) return;
    letterUi.timers.clear();
    letterUi.isOpen = false;
    letterUi.envelope.classList.remove('is-open');
    letterUi.envelope.setAttribute('aria-expanded', 'false');
    letterUi.envelope.setAttribute('aria-label', 'Open the love letter');
    letterUi.sheet.classList.remove('is-open');
    letterUi.sheet.setAttribute('aria-hidden', 'true');
    letterUi.lines.forEach((p) => p.classList.remove('is-shown'));
    updateLetterButtons();
  }
  letterUi.envelope.addEventListener('click', () => (letterUi.isOpen ? closeLetter() : openLetter()));
  letterUi.openBtn.addEventListener('click', openLetter);
  letterUi.revealBtn.addEventListener('click', revealAllLetter);
  letterUi.closeBtn.addEventListener('click', closeLetter);
  updateLetterButtons();

  /* =====================================================
     8. FLOWER GARDEN
     ===================================================== */
  const FLOWERS = [
    { x: 4, h: 150, type: 'daisy', c: '#f6c85f' },
    { x: 15, h: 225, type: 'rose', c: '#d6455f' },
    { x: 27, h: 170, type: 'blossom', c: '#f3a6c1' },
    { x: 38, h: 250, type: 'rose', c: '#e0607e' },
    { x: 50, h: 190, type: 'blossom', c: '#b79be8' },
    { x: 61, h: 235, type: 'rose', c: '#c2185b' },
    { x: 72, h: 160, type: 'daisy', c: '#f6c85f' },
    { x: 82, h: 215, type: 'blossom', c: '#f7b6c8' },
    { x: 92, h: 175, type: 'rose', c: '#e46a86' }
  ];
  const garden = {
    field: $('#gardenField'), petals: $('#gardenPetals'), message: $('#gardenMessage'),
    flowers: [], timers: createTimerBox(), petalCount: 0
  };

  function flowerHeadSvg(type) {
    let body = '';
    if (type === 'rose') {
      for (let i = 0; i < 8; i++) body += `<ellipse class="p1" cx="0" cy="-20" rx="15" ry="23" transform="rotate(${i * 45})"/>`;
      for (let i = 0; i < 6; i++) body += `<ellipse class="p2" cx="0" cy="-12" rx="11" ry="16" transform="rotate(${i * 60 + 20})"/>`;
      body += '<circle class="p1" r="12"/><circle class="p2" r="7"/><circle class="core" r="3"/>';
    } else if (type === 'daisy') {
      for (let i = 0; i < 12; i++) body += `<ellipse class="p2" cx="0" cy="-25" rx="6" ry="20" transform="rotate(${i * 30})"/>`;
      body += '<circle class="p1" r="10"/><circle class="core" r="4"/>';
    } else {
      for (let i = 0; i < 5; i++) body += `<circle class="p1" cx="0" cy="-20" r="17" transform="rotate(${i * 72})"/>`;
      body += '<circle class="p2" r="11"/><circle class="core" r="5"/>';
    }
    return `<svg class="flower__head" viewBox="-50 -50 100 100" aria-hidden="true" focusable="false">${body}</svg>`;
  }

  function buildGarden() {
    FLOWERS.forEach((f, i) => {
      const btn = el('button', { class: 'flower', type: 'button', 'aria-pressed': 'false', 'aria-label': `Flower ${i + 1} of ${FLOWERS.length}. Tap to bloom.` });
      btn.style.cssText = `--x:${f.x}%;--h:${f.h}px;--c:${f.c};--c2:${mixColor(f.c, '#ffffff', 0.45)};--c3:${f.type === 'daisy' ? '#fff3c4' : '#fff0c9'};--d:${(-i * 0.7).toFixed(1)}s`;
      btn.innerHTML = '<span class="flower__stem"></span><span class="flower__leaf flower__leaf--l"></span><span class="flower__leaf flower__leaf--r"></span>' + flowerHeadSvg(f.type);
      btn.addEventListener('click', () => bloomFlower(btn));
      garden.field.insertBefore(btn, garden.petals);
      garden.flowers.push(btn);
    });
  }

  function spawnGardenPetals(count) {
    if (prefersReducedMotion()) return;
    const fall = garden.field.clientHeight + 30;
    for (let i = 0; i < count && garden.petalCount < 30; i++) {
      const petal = el('span', { class: 'petal petal--garden' });
      petal.style.cssText = `--x:${rand(2, 96)}%;--s:${rand(9, 15).toFixed(0)}px;--t:${rand(5, 8).toFixed(1)}s;--d:${rand(0, 1.8).toFixed(1)}s;--drift:${rand(-50, 50).toFixed(0)}px;--fall:${fall}px`;
      garden.petalCount++;
      petal.addEventListener('animationend', () => { petal.remove(); garden.petalCount--; }, { once: true });
      garden.petals.append(petal);
    }
  }

  function bloomedCount() { return garden.flowers.filter((f) => f.classList.contains('is-bloom')).length; }

  function showGardenMessage() { garden.message.classList.add('is-shown'); }

  function bloomFlower(btn) {
    if (btn.classList.contains('is-bloom')) { burstFrom(btn, 6); return; }
    btn.classList.add('is-bloom');
    btn.setAttribute('aria-pressed', 'true');
    const r = btn.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.width / 2, 8);
    spawnGardenPetals(3);
    if (bloomedCount() === garden.flowers.length) garden.timers.after(prefersReducedMotion() ? 0 : 700, showGardenMessage);
  }

  function bloomAllFlowers() {
    garden.timers.clear();
    const closed = garden.flowers.filter((f) => !f.classList.contains('is-bloom'));
    if (!closed.length) { showGardenMessage(); return; }
    closed.forEach((f, i) => garden.timers.after(prefersReducedMotion() ? 0 : i * 260, () => bloomFlower(f)));
  }

  function resetGarden() {
    garden.timers.clear();
    garden.flowers.forEach((f) => { f.classList.remove('is-bloom'); f.setAttribute('aria-pressed', 'false'); });
    garden.message.classList.remove('is-shown');
  }
  buildGarden();
  $('#bloomBtn').addEventListener('click', bloomAllFlowers);
  $('#gardenReset').addEventListener('click', resetGarden);

  /* =====================================================
     9. GALLERY + LIGHTBOX
     ===================================================== */
  const lb = { root: $('#lightbox'), stage: $('#lbStage'), caption: $('#lbCaption'), count: $('#lbCount'), index: 0, timer: null, touchX: null };

  (function renderGallery() {
    const grid = $('#galleryGrid');
    CONFIG.photos.forEach((p, i) => {
      const btn = el('button', { class: 'gcard__btn', type: 'button', 'aria-label': `Open photo ${i + 1}: ${p.caption}` },
        el('span', { class: 'gcard__frame' }, createPhoto(p.src, p.caption, `Add photo: ${p.src}`)));
      btn.addEventListener('click', () => openLightbox(i, btn));
      const fig = el('figure', { class: 'gcard reveal' }, btn, el('figcaption', { text: p.caption }));
      fig.style.setProperty('--delay', `${(i % 3) * 0.1}s`);
      grid.append(fig);
    });
  })();

  function renderLightbox() {
    const p = CONFIG.photos[lb.index];
    lb.stage.replaceChildren(createPhoto(p.src, p.caption, `Add photo: ${p.src}`));
    lb.caption.textContent = p.caption;
    lb.count.textContent = `${lb.index + 1} / ${CONFIG.photos.length}`;
    lb.stage.classList.remove('is-changing');
  }
  function openLightbox(index, opener) {
    lb.index = index;
    dialogState.opener = opener || document.activeElement;
    renderLightbox();
    lb.root.hidden = false;
    $('#lbClose').focus();
  }
  function closeLightbox() {
    if (lb.root.hidden) return;
    clearTimeout(lb.timer);
    lb.root.hidden = true;
    if (dialogState.opener && dialogState.opener.focus) dialogState.opener.focus();
  }
  function stepLightbox(delta) {
    const n = CONFIG.photos.length;
    lb.index = (lb.index + delta + n) % n;
    lb.stage.classList.add('is-changing');
    clearTimeout(lb.timer);
    lb.timer = setTimeout(renderLightbox, prefersReducedMotion() ? 0 : 180);
  }
  $('#lbPrev').addEventListener('click', () => stepLightbox(-1));
  $('#lbNext').addEventListener('click', () => stepLightbox(1));
  $('#lbClose').addEventListener('click', closeLightbox);
  lb.root.querySelector('[data-close]').addEventListener('click', closeLightbox);
  lb.root.addEventListener('touchstart', (e) => { lb.touchX = e.changedTouches[0].clientX; }, { passive: true });
  lb.root.addEventListener('touchend', (e) => {
    if (lb.touchX == null) return;
    const dx = e.changedTouches[0].clientX - lb.touchX;
    lb.touchX = null;
    if (Math.abs(dx) > 50) stepLightbox(dx < 0 ? 1 : -1);
  }, { passive: true });

  /* =====================================================
     10. REASONS DECK
     ===================================================== */
  const rs = {
    card: $('#reasonCard'), back: $('#reasonBack'), num: $('#reasonNum'), btn: $('#reasonBtn'),
    bar: $('#reasonProgressBar'), progress: $('#reasonProgress'), count: $('#reasonCount'), dots: $('#reasonDots'), live: $('#reasonLive'),
    order: [], shown: 0, busy: false, timers: createTimerBox()
  };
  const reasonTotal = CONFIG.reasons.length;

  function updateReasonProgress() {
    rs.bar.style.transform = `scaleX(${rs.shown / reasonTotal})`;
    rs.progress.setAttribute('aria-valuemax', String(reasonTotal));
    rs.progress.setAttribute('aria-valuenow', String(rs.shown));
    rs.count.textContent = `${rs.shown} of ${reasonTotal} reasons shown`;
    Array.from(rs.dots.children).forEach((d, i) => d.classList.toggle('is-on', i < rs.shown));
    rs.btn.textContent = rs.shown >= reasonTotal ? 'Restart the Deck' : (rs.shown === 0 ? 'Give Me a Reason' : 'Give Me Another Reason');
  }
  function resetDeck() {
    rs.timers.clear();
    rs.order = shuffle(CONFIG.reasons.map((_, i) => i));
    rs.shown = 0;
    rs.busy = false;
    rs.card.classList.remove('is-flipped');
    rs.card.setAttribute('aria-label', 'Reveal a reason');
    updateReasonProgress();
  }
  function giveReason() {
    if (rs.busy) return;
    if (rs.shown >= reasonTotal) { resetDeck(); return; }
    rs.busy = true;
    const showNext = () => {
      const text = CONFIG.reasons[rs.order[rs.shown]];
      rs.shown++;
      rs.num.textContent = `Reason ${rs.shown}`;
      rs.back.textContent = text;
      rs.live.textContent = `Reason ${rs.shown}: ${text}`;
      rs.card.classList.add('is-flipped');
      rs.card.setAttribute('aria-label', 'Reveal another reason');
      updateReasonProgress();
      rs.timers.after(prefersReducedMotion() ? 0 : 700, () => { rs.busy = false; });
    };
    if (rs.card.classList.contains('is-flipped')) {
      rs.card.classList.remove('is-flipped');
      rs.timers.after(prefersReducedMotion() ? 0 : 450, showNext);
    } else {
      showNext();
    }
    burstFrom(rs.card, 5);
  }
  CONFIG.reasons.forEach(() => rs.dots.append(el('i')));
  resetDeck();
  rs.btn.addEventListener('click', giveReason);
  rs.card.addEventListener('click', giveReason);

  /* =====================================================
     11. MESSAGE GENERATOR
     ===================================================== */
  const mg = {
    chips: $('#msgChips'), btn: $('#msgBtn'), out: $('#msgOutput'), copy: $('#msgCopy'), status: $('#msgCopyStatus'),
    category: CONFIG.messageCategories[0].id, bags: {}, current: '', copyTimer: null
  };
  CONFIG.messageCategories.forEach((cat, i) => {
    const chip = el('button', { class: 'chip', type: 'button', role: 'radio', 'aria-checked': i === 0 ? 'true' : 'false', 'data-cat': cat.id, text: cat.label });
    chip.addEventListener('click', () => selectCategory(cat.id));
    mg.chips.append(chip);
    mg.bags[cat.id] = createBag(CONFIG.messages[cat.id]);
  });
  function selectCategory(id) {
    mg.category = id;
    $$('.chip', mg.chips).forEach((c) => c.setAttribute('aria-checked', c.dataset.cat === id ? 'true' : 'false'));
  }
  mg.btn.addEventListener('click', () => {
    mg.current = mg.bags[mg.category].next();
    mg.out.classList.remove('is-revealed');
    void mg.out.offsetWidth; // restarts the CSS animation
    mg.out.textContent = mg.current;
    mg.out.classList.add('is-revealed');
    mg.copy.disabled = false;
    mg.status.textContent = '';
  });
  mg.copy.addEventListener('click', async () => {
    if (!mg.current) return;
    const ok = await copyText(mg.current);
    mg.status.textContent = ok ? 'Copied ♡' : 'Press and hold to copy';
    clearTimeout(mg.copyTimer);
    mg.copyTimer = setTimeout(() => { mg.status.textContent = ''; }, 2200);
  });

  /* =====================================================
     12. HEART BUTTON
     ===================================================== */
  const hb = { btn: $('#heartBtn'), count: $('#heartCount'), resp: $('#heartResponse'), total: 0, glowTimer: null, bag: createBag(CONFIG.heartResponses) };
  hb.btn.addEventListener('click', () => {
    hb.total++;
    hb.count.textContent = String(hb.total);
    hb.resp.textContent = hb.bag.next();
    hb.btn.classList.add('is-glow');
    clearTimeout(hb.glowTimer);
    hb.glowTimer = setTimeout(() => hb.btn.classList.remove('is-glow'), 900);
    burstFrom(hb.btn, 10);
  });
  $('#heartReset').addEventListener('click', () => {
    hb.total = 0;
    hb.count.textContent = '0';
    hb.resp.textContent = 'Tap the heart ♡';
    hb.btn.classList.remove('is-glow');
  });

  /* =====================================================
     13. DREAMS
     ===================================================== */
  (function renderDreams() {
    const grid = $('#dreamGrid');
    CONFIG.dreams.forEach((d, i) => {
      const id = `dreamText${i}`;
      const card = el('button', { class: 'dream glass-card reveal', type: 'button', 'aria-expanded': 'false', 'aria-controls': id },
        el('span', { class: 'dream__icon', 'aria-hidden': 'true', text: d.icon }),
        el('span', { class: 'dream__title', text: d.title }),
        el('span', { class: 'dream__more' }, el('span', { id, text: d.text })),
        el('span', { class: 'dream__hint', 'aria-hidden': 'true', text: 'Tap to read ♡' }));
      card.style.setProperty('--delay', `${(i % 3) * 0.1}s`);
      card.addEventListener('click', () => {
        const open = card.getAttribute('aria-expanded') === 'true';
        card.setAttribute('aria-expanded', open ? 'false' : 'true');
        card.querySelector('.dream__hint').textContent = open ? 'Tap to read ♡' : 'Tap to close';
        if (!open) burstFrom(card.querySelector('.dream__icon'), 6);
      });
      grid.append(card);
    });
  })();

  /* =====================================================
     14. SPECIAL SURPRISE SEQUENCE
     ===================================================== */
  const seq = {
    root: $('#sequence'), title: $('#seqTitle'), text: $('#seqText'), actions: $('#seqActions'), skip: $('#seqSkip'),
    startBtn: $('#startSeqBtn'), running: false, timers: createTimerBox()
  };

  function setSeqMessage(title, text) {
    seq.title.textContent = title;
    seq.text.textContent = text;
    [seq.title, seq.text].forEach((n) => { n.classList.remove('is-swap'); void n.offsetWidth; n.classList.add('is-swap'); });
  }
  function centerBurst(count) { burst(window.innerWidth / 2, window.innerHeight / 2, count); }

  function finishSequenceMessage() {
    seq.timers.clear();
    const S = CONFIG.surprise;
    seq.root.classList.add('is-final');
    setSeqMessage(S.finalTitle, S.finalText);
    seq.skip.hidden = true;
    seq.actions.hidden = false;
    centerBurst(20);
    floatingHearts(14);
  }
  function endSequence() {
    seq.timers.clear();
    seq.running = false;
    seq.root.classList.remove('is-active', 'is-final');
    seq.startBtn.disabled = false;
    seq.startBtn.textContent = 'Watch It Again';
    setTimeout(() => { if (!seq.running) seq.root.hidden = true; }, prefersReducedMotion() ? 0 : 900);
  }
  function startSequence() {
    if (seq.running) return; // prevents overlapping sequences
    seq.running = true;
    seq.startBtn.disabled = true;
    seq.actions.hidden = true;
    seq.skip.hidden = false;
    seq.title.textContent = '';
    seq.text.textContent = '';
    seq.root.classList.remove('is-final');
    seq.root.hidden = false;
    void seq.root.offsetWidth;
    seq.root.classList.add('is-active'); // step 1: gentle dim

    const S = CONFIG.surprise;
    seq.timers.after(900, () => setSeqMessage('Just for you', S.intro)); // step 2
    seq.timers.after(6500, () => { // step 3
      setSeqMessage('A little love', S.heartLine);
      floatingHearts(26);
      centerBurst(14);
    });
    seq.timers.after(11000, () => { // step 4
      setSeqMessage('Our garden', S.gardenLine);
      scrollToEl(garden.field);
      seq.timers.after(1200, bloomAllFlowers);
    });
    seq.timers.after(18500, () => setSeqMessage('A short note', S.note)); // step 5
    seq.timers.after(25000, finishSequenceMessage); // step 6 + 7
  }
  seq.startBtn.addEventListener('click', startSequence);
  seq.skip.addEventListener('click', finishSequenceMessage);
  $('#seqClose').addEventListener('click', endSequence);
  $('#seqLetter').addEventListener('click', () => { endSequence(); scrollToEl($('#letter')); });
  $('#seqGallery').addEventListener('click', () => { endSequence(); scrollToEl($('#gallery')); });
  $('#seqReasons').addEventListener('click', () => { endSequence(); scrollToEl($('#reasons')); });

  /* =====================================================
     15. HIDDEN SECRET (tap the footer heart 3 times)
     ===================================================== */
  const sc = {
    root: $('#secret'), body: $('#secretBody'), heart: $('#secretHeart'), taps: 0, tapTimer: null,
    lines: [], timers: createTimerBox()
  };
  (function buildSecret() {
    $('#secretTitle').textContent = CONFIG.secret.title;
    const add = (text, cls) => { const p = el('p', { class: `letter__line ${cls || ''}`, text }); sc.body.append(p); sc.lines.push(p); };
    CONFIG.secret.paragraphs.forEach((t) => add(t));
    add(CONFIG.secret.closing, 'letter__sign');
    add(CONFIG.myName, 'letter__sign');
  })();

  function playSecret() {
    sc.timers.clear();
    sc.lines.forEach((p) => p.classList.remove('is-shown'));
    void sc.body.offsetWidth;
    sc.lines.forEach((p, i) => sc.timers.after(prefersReducedMotion() ? 0 : 500 + i * 1100, () => p.classList.add('is-shown')));
    const r = sc.root.querySelector('.modal__card').getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + 40, 16);
  }
  function openSecret() {
    dialogState.opener = sc.heart;
    sc.root.hidden = false;
    playSecret();
    $('#secretClose').focus();
  }
  function closeSecret() {
    if (sc.root.hidden) return;
    sc.timers.clear();
    sc.root.hidden = true;
    if (dialogState.opener && dialogState.opener.focus) dialogState.opener.focus();
  }
  sc.heart.addEventListener('click', () => {
    sc.taps++;
    sc.heart.classList.add('is-tap');
    setTimeout(() => sc.heart.classList.remove('is-tap'), 220);
    clearTimeout(sc.tapTimer);
    sc.tapTimer = setTimeout(() => { sc.taps = 0; }, 2200);
    if (sc.taps >= 3) { sc.taps = 0; burstFrom(sc.heart, 10); openSecret(); }
  });
  $('#secretClose').addEventListener('click', closeSecret);
  $('#secretReplay').addEventListener('click', playSecret);
  sc.root.querySelector('[data-close]').addEventListener('click', closeSecret);

  /* =====================================================
     16. MUSIC & AMBIENT MODE
     ===================================================== */
  const music = {
    audio: $('#audio'), status: $('#musicStatus'), playBtn: $('#playBtn'), muteBtn: $('#muteBtn'),
    volume: $('#volume'), ambientBtn: $('#ambientBtn'), introBtn: $('#introMusic'),
    toggle: $('#playerToggle'), panel: $('#playerPanel'),
    muted: false, vol: 0.6, ambient: null, songFailed: false
  };
  music.audio.src = CONFIG.audioSrc;
  music.audio.volume = music.vol;

  function setMusicStatus(text) { music.status.textContent = text; }
  function refreshMusicUi() {
    const songOn = !music.audio.paused;
    const ambientOn = !!music.ambient;
    music.playBtn.textContent = songOn ? 'Pause' : 'Play';
    music.ambientBtn.textContent = `Ambient mode: ${ambientOn ? 'on' : 'off'}`;
    music.ambientBtn.setAttribute('aria-pressed', String(ambientOn));
    music.muteBtn.textContent = music.muted ? 'Unmute' : 'Mute';
    music.muteBtn.setAttribute('aria-pressed', String(music.muted));
    const any = songOn || ambientOn;
    music.introBtn.textContent = `♪ Music: ${any ? 'on' : 'off'}`;
    music.introBtn.setAttribute('aria-pressed', String(any));
    if (songOn) setMusicStatus(music.muted ? 'Playing (muted)' : 'Playing ♪');
    else if (ambientOn) setMusicStatus(music.muted ? 'Ambient (muted)' : 'Ambient sound ♪');
  }

  async function playSong() {
    try {
      await music.audio.play();
      music.songFailed = false;
      return true;
    } catch (err) {
      music.songFailed = true;
      setMusicStatus('Add your song to assets/our-song.mp3 ♡');
      return false;
    }
  }
  function pauseSong() { music.audio.pause(); }

  function startAmbient() {
    if (music.ambient) return true;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) { setMusicStatus('Ambient sound is not supported here'); return false; }
    try {
      const ctx = new Ctx();
      if (ctx.resume) ctx.resume();
      const master = ctx.createGain();
      master.gain.value = 0;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 900;
      const tremolo = ctx.createGain();
      tremolo.gain.value = 0.8;
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.12;
      lfoGain.gain.value = 0.2;
      lfo.connect(lfoGain);
      lfoGain.connect(tremolo.gain);
      const oscs = [174.61, 220, 261.63, 329.63].map((freq, i) => {
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = freq;
        o.detune.value = (i - 1.5) * 4;
        const g = ctx.createGain();
        g.gain.value = 0.25;
        o.connect(g);
        g.connect(filter);
        o.start();
        return o;
      });
      filter.connect(tremolo);
      tremolo.connect(master);
      master.connect(ctx.destination);
      lfo.start();
      music.ambient = { ctx, master, oscs, lfo };
      applyAmbientVolume(3);
      return true;
    } catch (err) {
      music.ambient = null;
      setMusicStatus('Ambient sound could not start');
      return false;
    }
  }
  function applyAmbientVolume(seconds) {
    if (!music.ambient) return;
    const { ctx, master } = music.ambient;
    const level = music.muted ? 0 : music.vol * 0.22;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(level, ctx.currentTime, seconds / 3 || 0.1);
  }
  function stopAmbient() {
    if (!music.ambient) return;
    const amb = music.ambient;
    music.ambient = null;
    amb.master.gain.cancelScheduledValues(amb.ctx.currentTime);
    amb.master.gain.setTargetAtTime(0, amb.ctx.currentTime, 0.3);
    setTimeout(() => {
      try { amb.oscs.forEach((o) => o.stop()); amb.lfo.stop(); amb.ctx.close(); } catch (err) { /* already stopped */ }
    }, 1500);
    if (music.audio.paused) setMusicStatus('Music is off');
  }

  music.audio.addEventListener('play', refreshMusicUi);
  music.audio.addEventListener('pause', () => { if (!music.ambient) setMusicStatus('Paused'); refreshMusicUi(); });
  music.audio.addEventListener('error', () => { music.songFailed = true; setMusicStatus('Add your song to assets/our-song.mp3 ♡'); refreshMusicUi(); });

  music.playBtn.addEventListener('click', async () => {
    if (!music.audio.paused) { pauseSong(); return; }
    await playSong();
    refreshMusicUi();
  });
  music.muteBtn.addEventListener('click', () => {
    music.muted = !music.muted;
    music.audio.muted = music.muted;
    applyAmbientVolume(0.3);
    refreshMusicUi();
  });
  music.volume.addEventListener('input', () => {
    music.vol = Number(music.volume.value) / 100;
    music.audio.volume = music.vol;
    applyAmbientVolume(0.3);
  });
  music.ambientBtn.addEventListener('click', () => {
    if (music.ambient) { stopAmbient(); } else { startAmbient(); }
    refreshMusicUi();
  });
  /* Intro toggle: tries your song first, falls back to soft ambient sound */
  music.introBtn.addEventListener('click', async () => {
    if (!music.audio.paused || music.ambient) {
      pauseSong();
      stopAmbient();
      setMusicStatus('Music is off');
      refreshMusicUi();
      return;
    }
    const ok = await playSong();
    if (!ok) { startAmbient(); setMusicStatus('Song not found, playing soft ambient sound'); }
    refreshMusicUi();
  });
  music.toggle.addEventListener('click', () => {
    const open = music.panel.hidden;
    music.panel.hidden = !open;
    music.toggle.setAttribute('aria-expanded', String(open));
    music.toggle.setAttribute('aria-label', open ? 'Close music controls' : 'Open music controls');
  });
  refreshMusicUi();

  /* =====================================================
     17. NAVIGATION, PROGRESS, REVEALS, CURSOR
     ===================================================== */
  const header = $('#siteHeader');
  const nav = $('.nav');
  const navToggle = $('#navToggle');
  function setMenu(open) {
    nav.classList.toggle('nav--open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  navToggle.addEventListener('click', () => setMenu(!nav.classList.contains('nav--open')));
  $$('.nav__menu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  /* Scroll progress bar, header style and back-to-top button */
  const progressBar = $('#scrollProgress');
  const toTop = $('#toTop');
  let scrollQueued = false;
  function onScroll() {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      progressBar.style.transform = `scaleX(${max > 0 ? root.scrollTop / max : 0})`;
      toTop.classList.toggle('is-visible', root.scrollTop > 600);
      header.classList.toggle('is-scrolled', root.scrollTop > 20);
      scrollQueued = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' }));

  /* Scroll-triggered reveals and "in view" switches (IntersectionObserver) */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach((node) => revealObserver.observe(node));

    const viewObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('in-view', entry.isIntersecting));
    }, { threshold: 0.1 });
    $$('[data-inview]').forEach((node) => viewObserver.observe(node));

    const spyLinks = new Map($$('.nav__menu a').map((a) => [a.getAttribute('href').slice(1), a]));
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = spyLinks.get(entry.target.id);
        if (link && entry.isIntersecting) {
          spyLinks.forEach((a) => a.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spyLinks.forEach((_, id) => { const s = document.getElementById(id); if (s) spyObserver.observe(s); });
  } else {
    $$('.reveal').forEach((node) => node.classList.add('is-visible'));
    $$('[data-inview]').forEach((node) => node.classList.add('in-view'));
  }

  /* Soft glowing cursor ring — desktop only, native cursor stays visible */
  if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion()) {
    const ring = el('div', { class: 'cursor', 'aria-hidden': 'true' });
    document.body.append(ring);
    const pos = { x: 0, y: 0, tx: 0, ty: 0, running: false };
    const step = () => {
      pos.x += (pos.tx - pos.x) * 0.2;
      pos.y += (pos.ty - pos.y) * 0.2;
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (Math.abs(pos.tx - pos.x) > 0.3 || Math.abs(pos.ty - pos.y) > 0.3) requestAnimationFrame(step);
      else pos.running = false; // stops when the ring has caught up
    };
    window.addEventListener('mousemove', (e) => {
      pos.tx = e.clientX;
      pos.ty = e.clientY;
      if (!ring.classList.contains('is-on')) { pos.x = pos.tx; pos.y = pos.ty; ring.classList.add('is-on'); }
      if (!pos.running) { pos.running = true; requestAnimationFrame(step); }
    }, { passive: true });
    document.addEventListener('mouseleave', () => ring.classList.remove('is-on'));
    document.addEventListener('mouseover', (e) => {
      ring.classList.toggle('cursor--active', !!e.target.closest('a, button, input, [role="radio"]'));
    });
  }

  /* =====================================================
     18. KEYBOARD (Escape closes things, arrows move the lightbox)
     ===================================================== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (!lb.root.hidden) trapFocus(e, lb.root);
      else if (!sc.root.hidden) trapFocus(e, sc.root);
      return;
    }
    if (!lb.root.hidden) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') stepLightbox(-1);
      else if (e.key === 'ArrowRight') stepLightbox(1);
      return;
    }
    if (e.key === 'Escape') {
      if (!sc.root.hidden) closeSecret();
      else if (!welcomeEl.hidden) hideWelcome();
      else if (nav.classList.contains('nav--open')) setMenu(false);
      else if (seq.running) endSequence();
    }
  });
})();
