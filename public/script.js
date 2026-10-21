(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const S1 = ['TypeScript', 'React', 'Node.js', 'Go', 'Rust', 'PostgreSQL', 'AWS'];
  const S2 = ['Performance', 'Reliability', 'Precision', 'Scale', 'Design', 'Speed'];

  // Repeated ticker content creates a seamless loop.
  const fillTicker = (id, items, repeats) => {
    const el = $(id);
    if (!el) return;
    el.innerHTML = Array.from({ length: repeats }, () => items.map((item) => `<span>${item}</span>`).join('')).join('');
  };
  fillTicker('t1', S1, 2);
  fillTicker('t2', S2, 4);

  // Intro: skip button, click-to-skip, and reduced-motion support.
  const intro = $('intro');
  const lights = [...document.querySelectorAll('.lights i')];
  let introDone = false;
  let introTimers = [];
  function finishIntro() {
    if (introDone) return;
    introDone = true;
    introTimers.forEach(clearTimeout);
    lights.forEach((light) => light.classList.remove('on'));
    if (intro) intro.classList.add('off');
    document.body.classList.add('go');
    startGauge();
  }
  if (reducedMotion) {
    introDone = true;
    if (intro) intro.remove();
    document.body.classList.add('go');
  } else {
    lights.forEach((light, index) => {
      introTimers.push(setTimeout(() => light.classList.add('on'), 350 + index * 350));
    });
    introTimers.push(setTimeout(finishIntro, 350 + lights.length * 350 + 450));
    intro?.addEventListener('click', finishIntro);
    document.querySelector('.intro-skip')?.addEventListener('click', (event) => {
      event.stopPropagation();
      finishIntro();
    });
  }

  // Current year in footer.
  const year = $('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile navigation.
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = $('nav-links');
  function closeMenu() {
    if (!menuToggle || !navLinks) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    navLinks.classList.remove('open');
  }
  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navLinks?.classList.toggle('open', open);
  });
  navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

  // Scroll progress and timeline progress, throttled to animation frames.
  const progressBar = $('bar');
  const timeline = $('tl');
  let scrollTicking = false;
  function updateScroll() {
    const doc = document.documentElement;
    const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    if (progressBar) progressBar.style.transform = `scaleX(${Math.max(0, Math.min(1, window.scrollY / maxScroll))})`;
    if (timeline) {
      const rect = timeline.getBoundingClientRect();
      const range = Math.max(1, rect.height);
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.6 - rect.top) / range));
      timeline.style.setProperty('--p', String(progress));
    }
    document.querySelectorAll('section').forEach((section) => {
      section.style.setProperty('--py', `${section.getBoundingClientRect().top * 0.08}px`);
    });
    scrollTicking = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(updateScroll);
    }
  }, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();

  // Reveal-on-scroll and count-up stats, with a fallback for older browsers.
  const revealItems = [...document.querySelectorAll('.rv')];
  const animateCounter = (node) => {
    if (node.dataset.counted === 'true') return;
    node.dataset.counted = 'true';
    const target = Number(node.dataset.c);
    if (!Number.isFinite(target)) return;
    if (reducedMotion) { node.textContent = String(target); return; }
    const start = performance.now();
    const duration = 1200;
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      node.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };
  function reveal(node) {
    node.classList.add('in');
    node.querySelectorAll('[data-c]').forEach(animateCounter);
  }
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -20px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach(reveal);
  }

  // Project card tilt is desktop-only to avoid fighting touch scrolling.
  if (!reducedMotion && !coarsePointer) {
    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        card.style.transform = `perspective(900px) rotateX(${(0.5 - y / rect.height) * 5}deg) rotateY(${(x / rect.width - 0.5) * 5}deg)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
      card.addEventListener('blur', () => { card.style.transform = ''; });
    });
  }

  // Custom cursor only on fine pointers.
  const cursor = $('cur');
  if (cursor && !coarsePointer && !reducedMotion) {
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let mx = cx;
    let my = cy;
    window.addEventListener('pointermove', (event) => { mx = event.clientX; my = event.clientY; });
    document.addEventListener('pointerover', (event) => {
      cursor.classList.toggle('h', Boolean(event.target.closest('a, button, .card')));
    });
    (function cursorLoop() {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(cursorLoop);
    })();
  }

  // UTC clock and illustrative latency value.
  const pad2 = (number) => String(number).padStart(2, '0');
  function updateClock() {
    const clock = $('clk');
    if (clock) {
      const date = new Date();
      clock.textContent = `${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}:${pad2(date.getUTCSeconds())}`;
    }
    const latency = $('lat');
    if (latency) latency.textContent = String(38 + Math.floor(Math.random() * 9));
  }
  updateClock();
  window.setInterval(updateClock, 1000);

  // Animated RPM gauge; only run after intro completes and when motion is allowed.
  let gaugeStarted = false;
  function startGauge() {
    if (gaugeStarted || reducedMotion) return;
    gaugeStarted = true;
    const needle = $('nd');
    const arc = $('arc');
    const rpm = $('rpm');
    if (!needle || !arc || !rpm) return;
    const start = performance.now();
    function frame(now) {
      if (document.hidden) { requestAnimationFrame(frame); return; }
      const elapsed = (now - start) / 1000;
      const ramp = Math.min(elapsed / 1.8, 1);
      const value = ramp < 1 ? ramp : 0.82 + 0.12 * Math.sin(elapsed * 1.3) * Math.sin(elapsed * 0.7);
      needle.style.transform = `rotate(${-90 + value * 180}deg)`;
      arc.style.strokeDashoffset = String(157 * (1 - value));
      rpm.textContent = (value * 13).toFixed(1);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if (reducedMotion) {
    const rpm = $('rpm');
    if (rpm) rpm.textContent = '8.0';
    const arc = $('arc');
    if (arc) arc.style.strokeDashoffset = '60';
    const needle = $('nd');
    if (needle) needle.style.transform = 'rotate(20deg)';
  }

  // Animated point-cloud globe. The portrait is layered above the canvas.
  const canvas = $('fx');
  const context = canvas?.getContext('2d');
  if (canvas && context) {
    const points = [];
    const pointCount = 460;
    for (let i = 0; i < pointCount; i++) {
      const y = 1 - 2 * (i + 0.5) / pointCount;
      const radius = Math.sqrt(1 - y * y);
      const theta = i * 2.39996;
      points.push([Math.cos(theta) * radius, y, Math.sin(theta) * radius]);
    }
    const arcs = Array.from({ length: 8 }, (_, index) => ({
      a: points[Math.floor(Math.random() * pointCount)],
      b: points[Math.floor(Math.random() * pointCount)],
      offset: index * 0.35
    }));
    let width = 0;
    let height = 0;
    let radius = 0;
    let centerX = 0;
    let centerY = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let pointerX = 0;
    let pointerY = 0;
    let lastFrame = 0;
    const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      centerX = width > 800 ? width * 0.68 : width * 0.5;
      centerY = height * (width > 700 ? 0.43 : 0.31);
      radius = Math.min(width * (width > 800 ? 0.26 : 0.34), height * 0.32);
      // Keep the portrait centered over the globe, and don't overwrite its animation transform.
      const portrait = $('me');
      if (portrait) {
        portrait.style.left = `${centerX}px`;
        portrait.style.top = `${centerY}px`;
        const diameter = Math.max(120, radius * 1.7);
        portrait.style.width = `${diameter}px`;
        portrait.style.height = `${diameter}px`;
      }
    }
    function project(point, angleY, angleX, scale) {
      const x = point[0] * Math.cos(angleY) + point[2] * Math.sin(angleY);
      const z = -point[0] * Math.sin(angleY) + point[2] * Math.cos(angleY);
      const y = point[1] * Math.cos(angleX) - z * Math.sin(angleX);
      const z2 = point[1] * Math.sin(angleX) + z * Math.cos(angleX);
      return [centerX + x * radius * scale, centerY + y * radius * scale, z2];
    }
    function draw(timestamp) {
      if (document.hidden) { requestAnimationFrame(draw); return; }
      if (reducedMotion && timestamp - lastFrame < 1000) { requestAnimationFrame(draw); return; }
      lastFrame = timestamp;
      context.clearRect(0, 0, width, height);
      const foreground = cssVar('--fg') || '#f4f4f2';
      const angleY = (reducedMotion ? 0.3 : timestamp * 0.00022) + pointerX * 0.35;
      const angleX = 0.38 + pointerY * 0.2;
      context.globalAlpha = 0.9;
      context.strokeStyle = foreground;
      context.lineWidth = 1;
      for (let i = 0; i < 90; i++) {
        const angle = i / 90 * Math.PI * 2 + (reducedMotion ? 0 : timestamp * 0.0003);
        const tick = i % 5 ? 6 : 14;
        context.globalAlpha = i % 5 ? 0.25 : 0.6;
        context.beginPath();
        context.moveTo(centerX + Math.cos(angle) * radius * 1.18, centerY + Math.sin(angle) * radius * 1.18);
        context.lineTo(centerX + Math.cos(angle) * (radius * 1.18 + tick), centerY + Math.sin(angle) * (radius * 1.18 + tick));
        context.stroke();
      }
      context.globalAlpha = 0.3;
      context.setLineDash([3, 9]);
      context.beginPath();
      context.arc(centerX, centerY, radius * 1.42, 0, Math.PI * 2);
      context.stroke();
      context.setLineDash([]);
      context.fillStyle = foreground;
      points.forEach((point) => {
        const projected = project(point, angleY, angleX, 1);
        context.globalAlpha = projected[2] > 0 ? 0.25 + 0.6 * projected[2] : 0.07;
        context.fillRect(projected[0], projected[1], 1.7, 1.7);
      });
      context.strokeStyle = '#ff3b1f';
      context.fillStyle = '#ff3b1f';
      context.shadowColor = '#ff3b1f';
      context.shadowBlur = reducedMotion ? 0 : 10;
      arcs.forEach((arc) => {
        const progress = reducedMotion ? 0.6 : Math.min(((timestamp * 0.00035 + arc.offset) % 1.6), 1);
        const segments = 40;
        context.beginPath();
        let endPoint;
        for (let i = 0; i <= segments * progress; i++) {
          const s = i / segments;
          const v = [arc.a[0] + (arc.b[0] - arc.a[0]) * s, arc.a[1] + (arc.b[1] - arc.a[1]) * s, arc.a[2] + (arc.b[2] - arc.a[2]) * s];
          const length = Math.hypot(...v) || 1;
          const scale = (1 + 0.3 * Math.sin(Math.PI * s)) / length;
          const projected = project([v[0] * scale, v[1] * scale, v[2] * scale], angleY, angleX, 1);
          context.globalAlpha = projected[2] > -0.2 ? 0.9 : 0.12;
          if (i) context.lineTo(projected[0], projected[1]); else context.moveTo(projected[0], projected[1]);
          endPoint = projected;
        }
        context.stroke();
        if (endPoint) {
          context.beginPath();
          context.arc(endPoint[0], endPoint[1], 2.5, 0, Math.PI * 2);
          context.fill();
        }
      });
      context.shadowBlur = 0;
      const orbitAngle = reducedMotion ? 0.5 : timestamp * 0.0009;
      context.globalAlpha = 1;
      context.beginPath();
      context.arc(centerX + Math.cos(orbitAngle) * radius * 1.42, centerY + Math.sin(orbitAngle) * radius * 1.42, 4, 0, Math.PI * 2);
      context.fillStyle = '#fff';
      context.shadowColor = '#fff';
      context.shadowBlur = reducedMotion ? 0 : 12;
      context.fill();
      context.shadowBlur = 0;
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('pointermove', (event) => {
      if (coarsePointer || reducedMotion) return;
      pointerX = event.clientX / Math.max(1, window.innerWidth) - 0.5;
      pointerY = event.clientY / Math.max(1, window.innerHeight) - 0.5;
    }, { passive: true });
    resizeCanvas();
    requestAnimationFrame(draw);
  }
})();
