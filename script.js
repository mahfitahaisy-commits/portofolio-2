// ========== AOS ==========
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60
});

// ========== Navbar scroll effect ==========
const navbar = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========== Parallax Hero ==========
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.35}px)`;
  }
});

// ========== Animated Counter ==========
const counters = document.querySelectorAll('.counter');
const animateCounter = (el) => {
  const target = +el.getAttribute('data-target');
  const duration = 1600;
  const start = performance.now();
  
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ========== Typing Effect ==========
const phrases = [
  "Belajar dan berkembang di dunia Web Development.",
  "Tertarik pada Frontend Development dan UI Design.",
  "Membangun website yang menarik dan responsif.",
  "Terus belajar, berkreasi, dan mengembangkan kemampuan."
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 35 : 55;

  if (!isDeleting && charIndex === current.length) {
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }
  setTimeout(type, delay);
}
setTimeout(type, 800);

// ========== Theme Toggle ==========
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Prefer system, but allow override
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  html.setAttribute('data-bs-theme', savedTheme);
  updateIcon(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  html.setAttribute('data-bs-theme', 'dark');
  updateIcon('dark');
}

function updateIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
}

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-bs-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-bs-theme', next);
  localStorage.setItem('theme', next);
  updateIcon(next);
});

// ========== Back to Top ==========
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== Contact Form (demo) ==========
function handleContact(e) {
  e.preventDefault();
  document.getElementById('contactForm').classList.add('d-none');
  document.getElementById('formSuccess').classList.remove('d-none');
  return false;
}

// ========== Close mobile nav on click ==========
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const collapse = document.getElementById('navMenu');
    if (collapse.classList.contains('show')) {
      new bootstrap.Collapse(collapse).hide();
    }
  });
});