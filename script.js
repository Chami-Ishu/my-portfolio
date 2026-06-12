// ── STAR CANVAS ──
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars() {
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.55 + 0.15,
      speed: Math.random() * 0.28 + 0.04,
      drift: (Math.random() - 0.5) * 0.18,
      color: Math.random() > 0.5 ? '#7dd3fc' : '#a5f3fc'
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle   = s.color;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    s.y -= s.speed;
    s.x += s.drift;
    if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
    if (s.x < 0 || s.x > canvas.width) s.x = Math.random() * canvas.width;
  });
  requestAnimationFrame(drawStars);
}

resizeCanvas();
createStars();
drawStars();
window.addEventListener('resize', () => { resizeCanvas(); createStars(); });

// ── TYPEWRITER ──
const roles = [
  'CS Undergraduate 🎓',
  'Web Developer 💻',
  'UI/UX Enthusiast 🎨',
  'Problem Solver 🚀',
  'Java Developer ☕'
];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl  = document.getElementById('typed-text');
const cursorEl = document.getElementById('cursor');

function typeLoop() {
  const word = roles[roleIndex];
  typedEl.textContent = deleting ? word.slice(0, charIndex--) : word.slice(0, charIndex++);
  if (!deleting && charIndex > word.length) {
    deleting = true;
    setTimeout(typeLoop, 1600);
    return;
  }
  if (deleting && charIndex < 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;
  }
  setTimeout(typeLoop, deleting ? 50 : 88);
}
typeLoop();
setInterval(() => {
  cursorEl.style.opacity = cursorEl.style.opacity === '0' ? '1' : '0';
}, 500);

// ── SCROLL REVEAL + SKILL BARS ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── ACTIVE NAV HIGHLIGHT ──
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = '#22d3ee';
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => navObserver.observe(s));

// ── SMOOTH SCROLL FOR NAV LINKS ──
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
