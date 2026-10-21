<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Start the existing animation/interaction layer only after Vue renders the page.
  if (document.querySelector('script[data-portfolio-effects]')) return
  const script = document.createElement('script')
  script.src = '/script.js'
  script.defer = true
  script.dataset.portfolioEffects = 'true'
  document.body.appendChild(script)
})


function movePhoto(event) {
  const photo = event.currentTarget;
  const rect = photo.getBoundingClientRect();

  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  photo.style.setProperty('--photo-x', `${x * 40}px`);
  photo.style.setProperty('--photo-y', `${y * 40}px`);
}

function resetPhoto(event) {
  event.currentTarget.style.setProperty('--photo-x', '0px');
  event.currentTarget.style.setProperty('--photo-y', '0px');
}

</script>

<template>
<a class="skip-link" href="#main">Skip to content</a>
<div aria-hidden="true" id="intro">
<div class="lights"><i></i><i></i><i></i><i></i><i></i></div>
<span class="mono">Lights out and away we go</span>
<button class="intro-skip" type="button">Skip intro <span aria-hidden="true">↗</span></button>
</div>
<div aria-hidden="true" id="bar"></div>
<div aria-hidden="true" id="cur"></div>
<nav aria-label="Main navigation">
<div class="wrap nav-wrap">
<a aria-label="Rafael Madayag, home" class="logo" href="#top">Rafael<i>/</i>Madayag</a>
<button aria-controls="nav-links" aria-expanded="false" aria-label="Open navigation" class="menu-toggle" type="button"><span></span><span></span></button>
<ul id="nav-links">
<li><a href="#work">Work</a></li><li><a href="#skills">Skills</a></li><li><a href="#career">Career</a></li><li><a href="#contact">Contact</a></li>
</ul>
<a class="pill" href="#contact">Hire me</a>
</div>
</nav>
<main id="main">
<header class="hero" id="top">
<canvas aria-hidden="true" id="fx"></canvas>
<img alt="Portrait of John Rafael B. Madayag" height="500" id="me"  src="/photo.jpg" @pointermove="movePhoto" @pointerleave="resetPhoto"width="500"/>
<div aria-hidden="true" class="slash"></div>
<i aria-hidden="true" class="br a"></i><i aria-hidden="true" class="br b"></i><i aria-hidden="true" class="br c"></i><i aria-hidden="true" class="br d"></i>
<div aria-label="Decorative telemetry" class="tele mono">
<span><i class="live-dot"></i> Live</span><span>UTC <b id="clk">--:--:--</b></span><span>Latency <b id="lat">42</b> ms</span><span>Uptime <b>99.98%</b></span>
</div>
<div aria-hidden="true" class="sticker"><svg viewBox="0 0 120 120"><defs><path d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" id="cp"></path></defs><circle cx="60" cy="60" fill="var(--lime)" r="58"></circle><g class="spin"><text fill="#000" font-family="JetBrains Mono,monospace" font-size="10.5"><textPath href="#cp" lengthAdjust="spacing" textLength="282">AVAILABLE FOR WORK • HIRE ME • </textPath></text></g><path d="M60 40l6 14 14 6-14 6-6 14-6-14-14-6 14-6z" fill="#000"></path></svg></div>

<div class="wrap hero-content">
<p class="eyebrow mono">Computer Engineer / Builder / Problem Solver</p>
<h1><span class="l"><span>RAFAEL</span></span><span class="l"><span>MADAYAG</span></span></h1>
<div class="foot"><p>ENGINEER SA UMAGA, GINGINEER SA GABI.</p><div class="btns"><a class="btn p" href="#work">Explore work <span aria-hidden="true">↘</span></a><a class="btn" href="#contact">Contact me <span aria-hidden="true">↗</span></a></div></div>
</div>
<div aria-hidden="true" class="hero-bottom mono"><span>Scroll to explore</span><span>01 / 04</span></div>
</header>
<div aria-hidden="true" class="chk"></div>
<div class="mq"><div aria-label="Technical interests" class="tr" id="t1"></div></div>
<section data-n="01" id="work"><div class="wrap">
<div class="sec mono rv">Sector 01 — Accomplishment</div><h2 class="rv">PROJECTS</h2>
<!-- Replace the sample projects below with your real projects, descriptions, and links. -->
<div class="cards">
<a aria-label="Realtime Analytics project, contact for details" class="card rv" href="#contact"><span class="n">01</span><svg aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 200 60"><polyline pathLength="1" points="0,50 20,42 40,46 60,30 80,34 100,18 120,26 140,12 160,20 180,6 200,10"></polyline></svg><h3>ARMED DRONE PROPOSAL</h3><p>Proposed a defense drone innovation in collaboration with the 17th Infantry Battalion and CSU CARIG CEO during our OJT, exploring drone technology for surveillance, monitoring, and operational support.</p><div class="chips"><i>DEFENSE</i><i>INNOVATION</i><i>ARMED DRONE</i></div><span aria-hidden="true" class="card-arrow">↗</span></a>
<a aria-label="AI Code Review Bot project, contact for details" class="card rv" href="#contact" style="--d:.1s"><span class="n">02</span><svg aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 200 60"><polyline pathLength="1" points="0,40 25,44 50,22 75,30 100,14 125,38 150,20 175,8 200,16"></polyline></svg><h3>"FALCON X" MEDICAL DRONE-THESIS PROJECT</h3><p>Developed Falcon X as our thesis project, applying computer engineering principles, system design, and technical problem-solving to create an innovative technology-based solution.</p><div class="chips"><i>CRISIS RESPONSE</i><i>FAST AND RELIABLE</i><i>MEDICAL DELIVERY DRONE</i></div><span aria-hidden="true" class="card-arrow">↗</span></a>
<a aria-label="Deploy CLI Toolkit project, contact for details" class="card rv" href="#contact"><span class="n">03</span><svg aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 200 60"><polyline pathLength="1" points="0,52 30,48 60,50 90,34 120,36 150,22 180,24 200,8"></polyline></svg><h3>Smart Surveillance System</h3><p>Designed a concept for an intelligent monitoring system that integrates cameras, sensors, and real-time data processing to improve situational awareness and automated monitoring.</p><div class="chips"><i>IoT</i><i>Real-Time Analysis</i><i>Sensors</i></div><span aria-hidden="true" class="card-arrow">↗</span></a>
<a aria-label="Edge Rendering Engine project, contact for details" class="card rv" href="#contact" style="--d:.1s"><span class="n">04</span><svg aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 200 60"><polyline pathLength="1" points="0,30 20,14 45,36 70,12 95,40 120,18 150,44 175,16 200,28"></polyline></svg><h3>Embedded Systems & IoT Automation</h3><p>Explored embedded systems and Internet of Things technologies to develop automation concepts using microcontrollers, electronic sensors, and connected devices for practical engineering applications.</p><div class="chips"><i>Microcontrollers</i><i>Automation</i><i>Hardware</i></div><span aria-hidden="true" class="card-arrow">↗</span></a>
</div>
</div></section>
<div aria-hidden="true" class="chk"></div>
<div class="mq r band"><div aria-hidden="true" class="tr" id="t2"></div></div>
<section data-n="02" id="skills"><div class="wrap">
<div class="sec mono rv">Sector 02 — Skills</div><h2 class="rv">MY<br/>SKILLS</h2>
<!-- Update skill names and levels to match your real experience. -->
<div class="bars">
<div class="bar rv" style="--v:95%"><div class="mono"><span>Software Programming</span><span>92</span></div><span aria-label="Software Programming skill level 92 percent" class="bar-track"><i></i></span></div>
<div class="bar rv" style="--v:90%;--d:.05s"><div class="mono"><span>Computer Hardware & Troubleshooting</span><span>95</span></div><span aria-label="Computer Hardware & Troubleshooting skill level 95 percent" class="bar-track"><i></i></span></div>
<div class="bar rv" style="--v:88%;--d:.1s"><div class="mono"><span>Networking & System Configuration</span><span>93</span></div><span aria-label="Networking & System Configuration skill level 93 percent" class="bar-track"><i></i></span></div>
<div class="bar rv" style="--v:80%;--d:.15s"><div class="mono"><span>Database Management (PostgreSQL)</span><span>80</span></div><span aria-label="Database Management (PostgreSQL) skill level 80 percent" class="bar-track"><i></i></span></div>
<div class="bar rv" style="--v:76%;--d:.2s"><div class="mono"><span>Web Development (HTML, CSS, JavaScript)</span><span>82</span></div><span aria-label="Web Development (HTML, CSS, JavaScript) skill level 82 percent" class="bar-track"><i></i></span></div>
<div class="bar rv" style="--v:70%;--d:.25s"><div class="mono"><span>Embedded Systems & IoT</span><span>88</span></div><span aria-label="Embedded Systems & IoT skill level 88 percent" class="bar-track"><i></i></span></div>
</div>
<!-- These counters are examples. Replace them with verified personal stats or remove this block. -->
<div class="grid rv"><div><b data-c="4">0</b><span class="mono">Years</span></div><div><b data-c="10">0</b><span class="mono">Projects </span></div><div><b data-c="10">0</b><span class="mono">Approved Proposals</span></div><div><b data-c="34">0</b><span class="mono">Awards/Certificates</span></div></div>
</div></section>
<section data-n="03" id="career"><div class="wrap">
<div class="sec mono rv">Sector 03 — School/University Career</div><h2 class="rv">My<br/>Journey</h2>
<!-- Replace the sample roles, companies, dates, and achievements with your actual history. -->
<div class="tl" id="tl">
<div class="lap rv"><b style="--c:var(--p)">S1</b><span class="mono">2025 — 2027</span><h3>Cagayan State University- Carig Campus</h3><p>3rdt year - 4th year Computer Engineering student</p></div>
<div class="lap rv"><b style="--c:var(--g)">S2</b><span class="mono">2023 — 2025</span><h3>University of Cagayan Valley</h3><p>1st year - 2nd year Computer Engineering student</p></div>
<div class="lap rv"><b style="--c:var(--y)">S3</b><span class="mono">2016 — 2023</span><h3>Magsaysay Memorial High School</h3><p>Junior - Senior High School</p></div>
</div>
</div></section>
<section class="contact" data-n="04" id="contact"><div class="wrap">
<div class="sec mono rv">Finish line — Contacts</div><h2 class="rv">Contact<br/>Me!</h2>
<!-- Replace these sample contact details and # links with your real accounts. -->
<a class="mail rv" href="mailto:madayagjohnrafael782@gmail.com">madayagjohnrafael782@gmail.com <span aria-hidden="true">→</span></a>

<div class="links mono rv">
  <a
    href="https://github.com/"
    target="_blank"
    rel="noopener noreferrer"
  >GitHub ↗</a>

  <a
    href="https://www.linkedin.com/"
    target="_blank"
    rel="noopener noreferrer"
  >LinkedIn ↗</a>

  <a
    href="/resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
  >Resume ↗</a>
</div>

</div></section>
</main>
<div aria-hidden="true" class="chk"></div>
<footer><div class="wrap mono"><span>© <span id="year">2026</span> John Rafael B. Madayag</span><span>Built for speed <span aria-hidden="true">↗</span></span></div></footer>
</template>
