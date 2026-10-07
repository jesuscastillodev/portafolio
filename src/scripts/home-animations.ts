/**
 * Animaciones de la home (GSAP). Un solo punto de entrada.
 * - El contenido final siempre existe en el HTML; aqui solo se revela.
 * - prefers-reduced-motion: reduce => no se hace nada (estado final).
 * - Efectos de puntero (spotlight, tilt) solo con hover + pointer fine.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

declare global {
  interface Window {
    __homeAnim?: boolean;
  }
}

const $ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/** Envuelve cada caracter visible en un <span> (los espacios quedan como texto). */
function splitChars(el: HTMLElement): HTMLElement[] {
  const chars: HTMLElement[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
    const text = node.nodeValue ?? '';
    if (!text.trim() && !text.includes(' ')) continue;
    const frag = document.createDocumentFragment();
    for (const ch of Array.from(text)) {
      if (ch === ' ' || ch === '\n') {
        frag.appendChild(document.createTextNode(ch));
      } else {
        const s = document.createElement('span');
        s.textContent = ch;
        s.style.opacity = '0';
        chars.push(s);
        frag.appendChild(s);
      }
    }
    node.replaceWith(frag);
  }
  return chars;
}

function makeCaret() {
  const c = document.createElement('span');
  c.className = 'type-caret';
  c.setAttribute('aria-hidden', 'true');
  return c;
}

/** Tween que revela caracteres uno a uno (y mueve el caret si se da). */
function typeTween(chars: HTMLElement[], perChar: number, caret?: HTMLElement) {
  const state = { n: 0 };
  let shown = 0;
  const place = () => {
    if (!caret || !chars.length) return;
    if (shown < chars.length) chars[shown].before(caret);
    else chars[chars.length - 1].after(caret);
  };
  return gsap.to(state, {
    n: chars.length,
    duration: Math.max(0.05, chars.length * perChar),
    ease: 'none',
    onStart: place,
    onUpdate() {
      const n = Math.floor(state.n);
      while (shown < n) chars[shown++].style.opacity = '1';
      place();
    },
    onComplete() {
      while (shown < chars.length) chars[shown++].style.opacity = '1';
      place();
    },
  });
}

function init() {
  if (window.__homeAnim) return;
  if (!document.querySelector('[data-hero]')) return;
  window.__homeAnim = true;

  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const root = document.documentElement;
    const disposers: Array<() => void> = [];

    heroIntro();
    heroPointer(disposers);
    sectionHeads();
    gitLog();
    gallery(disposers);
    techStack();

    ScrollTrigger.refresh();
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    root.classList.add('home-ready');

    return () => {
      disposers.forEach((d) => d());
      root.classList.remove('hero-fine');
    };
  });
}

/* ---------------------------------------------------------------- HERO */
function heroIntro() {
  const hero = document.querySelector<HTMLElement>('[data-hero]')!;
  const items = $('[data-reveal="hero"]', hero);
  const editor = hero.querySelector<HTMLElement>('[data-editor]');
  const others = items.filter((el) => el !== editor);

  const whoami = hero.querySelector<HTMLElement>('[data-type-line]');
  const whoamiChars = whoami ? splitChars(whoami) : [];

  // Lineas de codigo / terminal
  const codeLines = $('.code-line', hero).map((l) => splitChars(l));
  const termLines = $('.term-line', hero).map((l) => splitChars(l));
  const caret = makeCaret();

  // Bloquea el ancho de los elementos que cambian de texto (sin layout shift)
  const scrambles = $('[data-scramble]', hero);
  const originals = scrambles.map((el) => el.textContent ?? '');
  scrambles.forEach((el) => (el.style.minWidth = `${el.offsetWidth}px`));
  const counters = $('[data-count]', hero);
  counters.forEach((el) => (el.style.minWidth = `${el.offsetWidth}px`));
  counters.forEach((el) => (el.textContent = `0${(el.textContent ?? '').replace(/[0-9]/g, '')}`));

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.fromTo(others, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1, stagger: 0.09 }, 0.05);
  if (editor) {
    tl.fromTo(editor, { opacity: 0, y: 36, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 1.1 }, 0.25);
  }

  if (whoamiChars.length) tl.add(typeTween(whoamiChars, 0.045), 0.3);

  scrambles.forEach((el, i) => {
    tl.to(
      el,
      {
        duration: 1.2,
        ease: 'none',
        scrambleText: { text: originals[i], chars: '01{}<>/;=+*#', speed: 0.55, revealDelay: 0.25 + i * 0.25, tweenLength: false },
      },
      0.45,
    );
  });

  counters.forEach((el) => {
    const suffix = (el.textContent ?? '').replace(/[0-9]/g, '');
    const target = Number(el.dataset.count) || 0;
    const o = { v: 0 };
    tl.to(
      o,
      {
        v: target,
        duration: 1.3,
        ease: 'power3.out',
        onUpdate: () => (el.textContent = `${Math.round(o.v)}${suffix}`),
        onComplete: () => (el.textContent = `${target}${suffix}`),
      },
      0.7,
    );
  });

  // Tipeo del editor: lineas en secuencia, caret que se desplaza
  const type = gsap.timeline({ delay: 0.9 });
  codeLines.forEach((chars, i) => {
    if (!chars.length) return;
    type.add(typeTween(chars, 0.016, caret), i === 0 ? 0 : '+=0.16');
  });
  termLines.forEach((chars, i) => {
    if (!chars.length) return;
    type.add(typeTween(chars, i === 0 ? 0.045 : 0.012, caret), i === 0 ? '+=0.5' : '+=0.14');
  });
}

function heroPointer(disposers: Array<() => void>) {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!fine) return;
  const hero = document.querySelector<HTMLElement>('[data-hero]')!;
  document.documentElement.classList.add('hero-fine');

  const pos = { x: hero.clientWidth * 0.7, y: hero.clientHeight * 0.3 };
  const apply = () => {
    hero.style.setProperty('--mx', `${pos.x}px`);
    hero.style.setProperty('--my', `${pos.y}px`);
  };
  apply();
  const qx = gsap.quickTo(pos, 'x', { duration: 0.9, ease: 'power3', onUpdate: apply });
  const qy = gsap.quickTo(pos, 'y', { duration: 0.9, ease: 'power3', onUpdate: apply });
  const move = (e: PointerEvent) => {
    const r = hero.getBoundingClientRect();
    qx(e.clientX - r.left);
    qy(e.clientY - r.top);
  };
  hero.addEventListener('pointermove', move, { passive: true });
  disposers.push(() => hero.removeEventListener('pointermove', move));
}

/* --------------------------------------------------- SECTION HEADERS */
function sectionHeads() {
  $('[data-sec-head]').forEach((head) => {
    const tag = head.querySelector<HTMLElement>('[data-sec-tag]');
    const title = head.querySelector<HTMLElement>('[data-sec-title]');
    const sub = head.querySelector<HTMLElement>('[data-sec-sub]');

    const tagChars = tag ? splitChars(tag) : [];
    const words: HTMLElement[] = [];
    if (title) {
      const parts = (title.textContent ?? '').trim().split(/\s+/);
      title.textContent = '';
      parts.forEach((w, i) => {
        const outer = document.createElement('span');
        outer.className = 'sec-word';
        const inner = document.createElement('span');
        inner.textContent = w;
        outer.appendChild(inner);
        title.appendChild(outer);
        if (i < parts.length - 1) title.appendChild(document.createTextNode(' '));
        gsap.set(inner, { yPercent: 115 });
        words.push(inner);
      });
    }
    if (sub) gsap.set(sub, { opacity: 0, y: 14 });

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'expo.out' },
    });
    if (tagChars.length) tl.add(typeTween(tagChars, 0.035), 0);
    if (words.length) tl.to(words, { yPercent: 0, duration: 1, stagger: 0.07 }, 0.1);
    if (sub) tl.to(sub, { opacity: 1, y: 0, duration: 0.9 }, 0.35);

    ScrollTrigger.create({ trigger: head, start: 'top 85%', once: true, onEnter: () => tl.play() });
  });
}

/* ------------------------------------------------------------ GIT LOG */
function gitLog() {
  const log = document.querySelector<HTMLElement>('[data-git-log]');
  if (!log) return;

  const fill = log.querySelector<HTMLElement>('[data-git-fill]');
  if (fill) {
    gsap.fromTo(
      fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: log, start: 'top 65%', end: 'bottom 70%', scrub: 0.6 },
      },
    );
  }

  $('[data-commit]', log).forEach((commit) => {
    const node = commit.querySelector<HTMLElement>('[data-commit-node]');
    const hash = commit.querySelector<HTMLElement>('.commit-hash');
    const meta = commit.querySelector<HTMLElement>('[data-commit-meta]');
    const card = commit.querySelector<HTMLElement>('[data-commit-card]');
    if (!card) return;
    const dir = card.dataset.commitCard === 'left' ? -1 : 1;
    const hashChars = hash ? splitChars(hash) : [];

    gsap.set(card, { opacity: 0, x: 48 * dir });
    if (node) gsap.set(node, { scale: 0 });
    if (meta) gsap.set(meta, { opacity: 0, y: 8 });

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
    if (node) tl.to(node, { scale: 1, duration: 0.7, ease: 'back.out(2.2)' }, 0);
    if (meta) tl.to(meta, { opacity: 1, y: 0, duration: 0.6 }, 0.05);
    if (hashChars.length) tl.add(typeTween(hashChars, 0.05), 0.15);
    tl.to(card, { opacity: 1, x: 0, duration: 1 }, 0.12);

    ScrollTrigger.create({ trigger: commit, start: 'top 85%', once: true, onEnter: () => tl.play() });
  });
}

/* ------------------------------------------------------------ GALERIA */
function gallery(disposers: Array<() => void>) {
  const wraps = $('[data-card-wrap]');
  if (wraps.length) {
    gsap.set(wraps, { opacity: 0, y: 44 });
    ScrollTrigger.batch(wraps, {
      start: 'top 88%',
      once: true,
      onEnter: (els) =>
        gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.12, clearProps: 'transform' }),
    });
  }

  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!fine) return;

  $('[data-tilt]').forEach((card) => {
    gsap.set(card, { transformPerspective: 900 });
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3' });
    const ty = gsap.quickTo(card, 'y', { duration: 0.6, ease: 'power3' });
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * 6);
      rx(-py * 6);
      ty(-5);
    };
    const leave = () => {
      rx(0);
      ry(0);
      ty(0);
    };
    card.addEventListener('pointermove', move, { passive: true });
    card.addEventListener('pointerleave', leave);
    disposers.push(() => {
      card.removeEventListener('pointermove', move);
      card.removeEventListener('pointerleave', leave);
    });
  });
}

/* ---------------------------------------------------------- TECH STACK */
function techStack() {
  const cards = $('[data-reveal="tech"]');
  cards.forEach((card, i) => {
    const tools = $('[data-tools] > *', card);
    const importLine = card.querySelector<HTMLElement>('[data-type-line]');
    const importChars = importLine ? splitChars(importLine) : [];
    tools.forEach((t) => {
      t.style.transition = 'none';
    });
    gsap.set(tools, { opacity: 0, y: 14, scale: 0.85 });

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
    tl.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: i * 0.1 }, 0);
    if (importChars.length) tl.add(typeTween(importChars, 0.022), 0.3 + i * 0.1);
    tl.to(
      tools,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.05,
        ease: 'power3.out',
        onComplete: () => tools.forEach((t) => (t.style.transition = '')),
      },
      0.45 + i * 0.1,
    );

    ScrollTrigger.create({ trigger: card, start: 'top 88%', once: true, onEnter: () => tl.play() });
  });
}

init();
