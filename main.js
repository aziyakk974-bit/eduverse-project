/* =============================================
   EDUVERSE — MAIN JAVASCRIPT
   All shared interactions and utilities
   ============================================= */

// ─── COURSE DATA ───────────────────────────────────
const COURSES = [
  {
    id: 1, title: "Complete Java Masterclass",
    instructor: "Dr. Rajesh Kumar", instructorEmoji: "👨‍💻",
    rating: 4.9, students: 48200, price: 1299, originalPrice: 4999,
    category: "Java Programming", emoji: "☕", progress: 0,
    badge: "bestseller", description: "Master Java from scratch to advanced OOP, collections, streams, and real-world projects.",
    level: "Beginner", hours: 42, lectures: 320,
    tags: ["Java","OOP","Collections","Streams"], color: "#f59e0b"
  },
  {
    id: 2, title: "Data Structures & Algorithms",
    instructor: "Prof. Ananya Sharma", instructorEmoji: "👩‍🏫",
    rating: 4.8, students: 35600, price: 1499, originalPrice: 5999,
    category: "Data Structures & Algorithms", emoji: "🔗", progress: 0,
    badge: "hot", description: "Crack coding interviews with comprehensive DSA in Java — arrays, trees, graphs, DP and more.",
    level: "Intermediate", hours: 38, lectures: 280,
    tags: ["Arrays","Trees","Graphs","DP"], color: "#7c3aed"
  },
  {
    id: 3, title: "Full Stack Web Development",
    instructor: "Aditya Verma", instructorEmoji: "🧑‍💻",
    rating: 4.9, students: 62100, price: 1999, originalPrice: 7999,
    category: "Web Development", emoji: "🌐", progress: 0,
    badge: "bestseller", description: "Build production-ready web apps with React, Node.js, MongoDB, and modern deployment tools.",
    level: "Intermediate", hours: 68, lectures: 520,
    tags: ["React","Node.js","MongoDB","REST APIs"], color: "#06b6d4"
  },
  {
    id: 4, title: "Machine Learning Fundamentals",
    instructor: "Dr. Priya Nair", instructorEmoji: "👩‍🔬",
    rating: 4.7, students: 29400, price: 1799, originalPrice: 6999,
    category: "Machine Learning", emoji: "🤖", progress: 0,
    badge: "new", description: "Learn ML algorithms, scikit-learn, neural networks, and deploy ML models to production.",
    level: "Advanced", hours: 45, lectures: 340,
    tags: ["Python","scikit-learn","Neural Networks","NLP"], color: "#ec4899"
  },
  {
    id: 5, title: "Android App Development",
    instructor: "Rahul Gupta", instructorEmoji: "📱",
    rating: 4.6, students: 22800, price: 1499, originalPrice: 5499,
    category: "Android Development", emoji: "🤖", progress: 0,
    badge: null, description: "Build real Android apps with Java, Jetpack, Firebase, and publish to Play Store.",
    level: "Beginner", hours: 40, lectures: 290,
    tags: ["Java","Jetpack","Firebase","Kotlin"], color: "#22c55e"
  },
  {
    id: 6, title: "UI/UX Design Essentials",
    instructor: "Meera Pillai", instructorEmoji: "🎨",
    rating: 4.8, students: 18500, price: 999, originalPrice: 3999,
    category: "UI/UX Design", emoji: "🎨", progress: 0,
    badge: "hot", description: "Master Figma, design thinking, user research, prototyping and build a strong portfolio.",
    level: "Beginner", hours: 28, lectures: 195,
    tags: ["Figma","Wireframing","Prototyping","Research"], color: "#a855f7"
  },
  {
    id: 7, title: "Spring Boot REST APIs",
    instructor: "Vikram Singh", instructorEmoji: "🌱",
    rating: 4.7, students: 31200, price: 1299, originalPrice: 4999,
    category: "Java Programming", emoji: "🌱", progress: 0,
    badge: null, description: "Build scalable backend APIs with Spring Boot, Spring Security, JPA/Hibernate and Docker.",
    level: "Intermediate", hours: 35, lectures: 265,
    tags: ["Spring Boot","REST","JPA","Docker"], color: "#10b981"
  },
  {
    id: 8, title: "React for Beginners",
    instructor: "Sanjay Mehta", instructorEmoji: "⚛️",
    rating: 4.9, students: 55000, price: 799, originalPrice: 3499,
    category: "Web Development", emoji: "⚛️", progress: 0,
    badge: "bestseller", description: "Build modern, fast, and interactive UIs with React 18, hooks, Redux Toolkit and TypeScript.",
    level: "Beginner", hours: 32, lectures: 240,
    tags: ["React 18","Hooks","Redux","TypeScript"], color: "#38bdf8"
  },
  {
    id: 9, title: "AWS Cloud Practitioner",
    instructor: "Dr. Karthik Rao", instructorEmoji: "☁️",
    rating: 4.7, students: 27600, price: 1999, originalPrice: 7499,
    category: "Cloud Computing", emoji: "☁️", progress: 0,
    badge: "new", description: "Prepare for AWS Certified Cloud Practitioner exam with hands-on labs and mock tests.",
    level: "Beginner", hours: 24, lectures: 180,
    tags: ["AWS","EC2","S3","Lambda","CloudFormation"], color: "#f97316"
  },
  {
    id: 10, title: "Cyber Security Basics",
    instructor: "Nalini Krishnan", instructorEmoji: "🔐",
    rating: 4.6, students: 19300, price: 1499, originalPrice: 5999,
    category: "Cyber Security", emoji: "🔐", progress: 0,
    badge: null, description: "Learn ethical hacking, penetration testing, network security, and how to protect systems.",
    level: "Intermediate", hours: 36, lectures: 270,
    tags: ["Ethical Hacking","Kali Linux","Network","OWASP"], color: "#ef4444"
  },
  {
    id: 11, title: "iOS Development with Swift",
    instructor: "Arjun Nambiar", instructorEmoji: "🍎",
    rating: 4.5, students: 14200, price: 1799, originalPrice: 6999,
    category: "iOS Development", emoji: "🍎", progress: 0,
    badge: null, description: "Build native iOS apps with Swift, SwiftUI, UIKit, and deploy to the App Store.",
    level: "Intermediate", hours: 44, lectures: 330,
    tags: ["Swift","SwiftUI","UIKit","Xcode"], color: "#6366f1"
  },
  {
    id: 12, title: "DevOps with Docker & Kubernetes",
    instructor: "Suresh Babu", instructorEmoji: "🐳",
    rating: 4.8, students: 23700, price: 1999, originalPrice: 7999,
    category: "DevOps", emoji: "🐳", progress: 0,
    badge: "hot", description: "Containerize applications with Docker, orchestrate with Kubernetes, and build CI/CD pipelines.",
    level: "Advanced", hours: 48, lectures: 360,
    tags: ["Docker","Kubernetes","CI/CD","Jenkins"], color: "#0891b2"
  }
];

const CATEGORIES = [
  { name: "Web Development", icon: "🌐", count: 245 },
  { name: "Java Programming", icon: "☕", count: 180 },
  { name: "Data Structures & Algorithms", icon: "🔗", count: 120 },
  { name: "Machine Learning", icon: "🤖", count: 195 },
  { name: "UI/UX Design", icon: "🎨", count: 160 },
  { name: "Android Development", icon: "📱", count: 98 },
  { name: "iOS Development", icon: "🍎", count: 87 },
  { name: "Cyber Security", icon: "🔐", count: 142 },
  { name: "Cloud Computing", icon: "☁️", count: 210 },
  { name: "DevOps", icon: "⚙️", count: 175 }
];

const INSTRUCTORS = [
  { name: "Dr. Rajesh Kumar", role: "Java Expert", emoji: "👨‍💻", courses: 12, students: 48200, rating: 4.9 },
  { name: "Prof. Ananya Sharma", role: "DSA Specialist", emoji: "👩‍🏫", courses: 8, students: 35600, rating: 4.8 },
  { name: "Aditya Verma", role: "Full Stack Dev", emoji: "🧑‍💻", courses: 15, students: 62100, rating: 4.9 },
  { name: "Dr. Priya Nair", role: "ML Engineer", emoji: "👩‍🔬", courses: 7, students: 29400, rating: 4.7 },
];

const TESTIMONIALS = [
  { name: "Rohan Mathew", role: "Software Engineer @ TCS", emoji: "👨‍💼", text: "EduVerse completely transformed my career. I went from zero coding knowledge to landing my dream job at TCS in just 8 months. The quality of instruction is absolutely world-class!", rating: 5 },
  { name: "Sneha Iyer", role: "UI/UX Designer @ Infosys", emoji: "👩‍🎨", text: "The UI/UX Design course here is phenomenal. The projects are practical, the feedback is detailed, and the community is incredibly supportive. Best investment I've ever made.", rating: 5 },
  { name: "Akhil Nair", role: "Backend Developer @ Wipro", emoji: "👨‍💻", text: "Java Masterclass and Spring Boot course together gave me everything I needed for my backend role. The live sessions and doubt-clearing classes are a game changer.", rating: 5 },
  { name: "Lakshmi Menon", role: "Data Scientist @ HCL", emoji: "👩‍🔬", text: "I completed the ML Fundamentals course while working full-time. The self-paced structure and bite-sized lessons made it incredibly convenient. Highly recommend!", rating: 5 },
  { name: "Arjun Dev", role: "Android Developer @ Zoho", emoji: "👨‍📱", text: "Got placed at Zoho right after finishing the Android Development course! The capstone project was exactly what the interviewers were impressed by.", rating: 5 },
  { name: "Divya Krishnan", role: "Cloud Architect @ Accenture", emoji: "👩‍☁️", text: "Passed my AWS certification on first attempt thanks to EduVerse's Cloud Practitioner course. The mock exams were spot-on with the actual test format.", rating: 5 }
];

const FAQS = [
  { q: "How long do I have access to a course?", a: "Once enrolled, you have lifetime access to the course content, including all future updates. Learn at your own pace, anytime, anywhere." },
  { q: "Are the certificates recognised by employers?", a: "Yes! EduVerse certificates are trusted by 500+ companies including TCS, Infosys, Wipro, HCL, Zoho, and many startups. Each certificate has a unique verification ID." },
  { q: "What if I'm not satisfied with a course?", a: "We offer a 30-day money-back guarantee. If you're not completely satisfied, contact us within 30 days of purchase for a full refund, no questions asked." },
  { q: "Can I download course content for offline viewing?", a: "Yes, Pro and Premium plan subscribers can download lectures for offline viewing via our mobile app on iOS and Android." },
  { q: "Do you offer group/team plans?", a: "Absolutely! We have special pricing for teams of 5+. Contact our sales team for a customized quote with dedicated support and team analytics." },
  { q: "How do I get a certificate of completion?", a: "Complete all course modules and pass the final assessment (70%+ score). Your certificate is instantly generated and shareable to LinkedIn, email, or as a PDF." }
];

// ─── WISHLIST ───────────────────────────────────
let wishlist = JSON.parse(localStorage.getItem('ev_wishlist') || '[]');

function toggleWishlist(id) {
  const idx = wishlist.indexOf(id);
  if (idx === -1) { wishlist.push(id); showToast('❤️ Added to wishlist!'); }
  else { wishlist.splice(idx, 1); showToast('💔 Removed from wishlist'); }
  localStorage.setItem('ev_wishlist', JSON.stringify(wishlist));
  document.querySelectorAll(`.wishlist-btn[data-id="${id}"]`).forEach(b => b.classList.toggle('active', wishlist.includes(id)));
}

// ─── THEME ──────────────────────────────────────
let darkMode = localStorage.getItem('ev_theme') !== 'light';
function initTheme() {
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  document.querySelectorAll('.theme-toggle').forEach(t => t.textContent = darkMode ? '☀️' : '🌙');
}
function toggleTheme() {
  darkMode = !darkMode;
  localStorage.setItem('ev_theme', darkMode ? 'dark' : 'light');
  initTheme();
  showToast(darkMode ? '🌙 Dark mode on' : '☀️ Light mode on');
}

// ─── TOAST ──────────────────────────────────────
function showToast(msg, icon='') {
  let c = document.getElementById('toast-container');
  if (!c) { c = document.createElement('div'); c.id = 'toast-container'; document.body.appendChild(c); }
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = msg;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// ─── LOADER ─────────────────────────────────────
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => loader.classList.add('hidden'), 1800);
}

// ─── NAVBAR ─────────────────────────────────────
function initNavbar() {
  const nav = document.querySelector('.navbar');
  const burger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    const btn = document.getElementById('back-to-top');
    if (btn) btn.classList.toggle('visible', window.scrollY > 400);
  });

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
  }

  // highlight active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
}

// ─── TYPING EFFECT ──────────────────────────────
function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const phrases = ['Master New Skills', 'Launch Your Career', 'Build Real Projects', 'Get Certified Today'];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const current = phrases[pi];
    if (!deleting) {
      el.textContent = current.substring(0, ci + 1);
      ci++;
      if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = current.substring(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 60 : 100);
  }
  type();
}

// ─── COUNTER ANIMATION ──────────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
      if (current >= target) clearInterval(timer);
    }, 25);
  });
}

// ─── SCROLL REVEAL ──────────────────────────────
function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // trigger counters when stats come into view
        if (e.target.classList.contains('stats-section')) animateCounters();
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .stats-section').forEach(el => io.observe(el));
}

// ─── FAQ ACCORDION ──────────────────────────────
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

// ─── TESTIMONIAL CAROUSEL ───────────────────────
let testimonialIdx = 0;
function initTestimonials() {
  const track = document.querySelector('.testimonials-track');
  if (!track) return;
  const cards = track.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  const total = cards.length;
  let perView = window.innerWidth < 768 ? 1 : 2;

  function update() {
    const offset = testimonialIdx * (100 / perView);
    track.style.transform = `translateX(-${offset}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === testimonialIdx));
  }

  document.querySelector('.ctrl-prev')?.addEventListener('click', () => {
    testimonialIdx = (testimonialIdx - 1 + total) % total;
    update();
  });
  document.querySelector('.ctrl-next')?.addEventListener('click', () => {
    testimonialIdx = (testimonialIdx + 1) % total;
    update();
  });
  dots.forEach((d, i) => d.addEventListener('click', () => { testimonialIdx = i; update(); }));

  setInterval(() => { testimonialIdx = (testimonialIdx + 1) % total; update(); }, 5000);
  window.addEventListener('resize', () => { perView = window.innerWidth < 768 ? 1 : 2; });
}

// ─── SEARCH ─────────────────────────────────────
function initSearch() {
  const inp = document.querySelector('.search-bar input');
  const btn = document.querySelector('.search-btn');
  if (!inp) return;
  function doSearch() {
    const q = inp.value.trim().toLowerCase();
    if (!q) { showToast('⚠️ Please enter a search term'); return; }
    window.location.href = `courses.html?q=${encodeURIComponent(q)}`;
  }
  btn?.addEventListener('click', doSearch);
  inp.addEventListener('keypress', e => { if (e.key === 'Enter') doSearch(); });
}

// ─── NEWSLETTER ─────────────────────────────────
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('input')?.value;
    if (!email || !email.includes('@')) { showToast('⚠️ Please enter a valid email'); return; }
    showToast('🎉 You\'re subscribed! Welcome to EduVerse.');
    form.reset();
  });
}

// ─── RIPPLE EFFECT ──────────────────────────────
function addRipple(e) {
  const btn = e.currentTarget;
  const ripple = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
  ripple.className = 'ripple-effect';
  btn.style.position = 'relative';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}
function initRipple() {
  document.querySelectorAll('.btn-primary, .btn-hero-primary, .btn-enroll').forEach(b => b.addEventListener('click', addRipple));
}

// ─── CURSOR SPOTLIGHT ───────────────────────────
function initCursorSpotlight() {
  const el = document.getElementById('cursor-spotlight');
  if (!el) return;
  document.addEventListener('mousemove', e => {
    el.style.left = e.clientX + 'px';
    el.style.top = e.clientY + 'px';
  });
}

// ─── 3D CARD TILT ───────────────────────────────
function initTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x*12}deg) rotateX(${-y*12}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
}

// ─── BACK TO TOP ────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ─── AI CHAT WIDGET ─────────────────────────────
const AI_REPLIES = [
  "Great question! I recommend starting with our Java Masterclass course — it's perfect for beginners. 🚀",
  "Based on your interests, the Full Stack Web Development course would be an excellent choice! 🌐",
  "You can earn certificates by completing all modules and scoring 70%+ on the final assessment. 📜",
  "We have a 30-day money-back guarantee on all courses. Your learning is our priority! 💯",
  "The average learner completes a course in 3-4 weeks, but you have lifetime access so go at your own pace! ⏰",
  "Our Pro plan gives you access to all 2000+ courses plus certificates. It's the most popular choice! ⭐",
  "You can download lectures for offline viewing on our mobile app! Perfect for commuting. 📱",
  "Our instructors are industry experts with 10+ years of real-world experience. You're in great hands! 👨‍🏫"
];

function initAIChat() {
  const toggle = document.querySelector('.ai-chat-toggle');
  const box = document.querySelector('.ai-chat-box');
  const closeBtn = document.querySelector('.chat-close');
  const input = document.querySelector('.chat-input');
  const sendBtn = document.querySelector('.chat-send');
  const messages = document.querySelector('.chat-messages');
  if (!toggle || !box) return;

  toggle.addEventListener('click', () => { box.classList.toggle('open'); if (box.classList.contains('open')) input?.focus(); });
  closeBtn?.addEventListener('click', () => box.classList.remove('open'));

  function sendMessage() {
    const msg = input.value.trim();
    if (!msg) return;
    addMsg(msg, 'user');
    input.value = '';
    setTimeout(() => addMsg(AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)], 'bot'), 800);
  }

  function addMsg(text, type) {
    const div = document.createElement('div');
    div.className = `chat-msg ${type}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  sendBtn?.addEventListener('click', sendMessage);
  input?.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });
}

// ─── GENERATE CATEGORIES HTML ───────────────────
function renderCategories(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card reveal hover-lift tilt-card" onclick="window.location.href='courses.html?cat=${encodeURIComponent(cat.name)}'">
      <span class="category-icon">${cat.icon}</span>
      <div class="category-name">${cat.name}</div>
      <div class="category-count">${cat.count} courses</div>
    </div>
  `).join('');
}

// ─── GENERATE COURSE CARDS HTML ─────────────────
function getCourseCardHTML(course, idx = 0) {
  const inWishlist = wishlist.includes(course.id);
  const badgeHTML = course.badge ? `<span class="course-badge badge-${course.badge}">${course.badge}</span>` : '';
  const stars = '★'.repeat(Math.floor(course.rating)) + (course.rating % 1 ? '½' : '');
  return `
    <div class="course-card reveal reveal-delay-${(idx % 4) + 1} tilt-card" onclick="window.location.href='course-details.html?id=${course.id}'">
      <div class="course-thumb" style="background: linear-gradient(135deg, ${course.color}33, ${course.color}11);">
        <span style="font-size:3.5rem;">${course.emoji}</span>
        ${badgeHTML}
        <button class="wishlist-btn ${inWishlist ? 'active' : ''}" data-id="${course.id}" onclick="event.stopPropagation();toggleWishlist(${course.id})" title="Add to wishlist">
          ${inWishlist ? '❤️' : '🤍'}
        </button>
        <div class="course-thumb-overlay"><div class="play-btn">▶</div></div>
      </div>
      <div class="course-body">
        <div class="course-category">${course.category}</div>
        <div class="course-title">${course.title}</div>
        <div class="course-instructor">
          <div class="instructor-avatar">${course.instructorEmoji}</div>
          ${course.instructor}
        </div>
        <div class="course-rating">
          <span class="stars">${stars}</span>
          <span class="rating-num">${course.rating}</span>
          <span class="rating-count">(${(course.students/1000).toFixed(1)}k students)</span>
        </div>
        <div class="course-meta">
          <span class="meta-item">⏱ ${course.hours}h</span>
          <span class="meta-item">📝 ${course.lectures} lectures</span>
          <span class="meta-item">📊 ${course.level}</span>
        </div>
        <div class="course-footer">
          <div>
            <span class="course-price">₹${course.price.toLocaleString()}</span>
            <span class="course-price-orig">₹${course.originalPrice.toLocaleString()}</span>
          </div>
          <button class="btn-enroll" onclick="event.stopPropagation();enrollCourse(${course.id})">Enroll Now</button>
        </div>
      </div>
    </div>
  `;
}

function renderCourses(containerId, count = 8) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = COURSES.slice(0, count).map((c, i) => getCourseCardHTML(c, i)).join('');
  initTilt();
}

function enrollCourse(id) {
  const course = COURSES.find(c => c.id === id);
  if (!course) return;
  let enrolled = JSON.parse(localStorage.getItem('ev_enrolled') || '[]');
  if (!enrolled.includes(id)) { enrolled.push(id); localStorage.setItem('ev_enrolled', JSON.stringify(enrolled)); }
  showToast(`🎉 Enrolled in "${course.title}"!`);
}

// ─── RENDER INSTRUCTORS ─────────────────────────
function renderInstructors(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = INSTRUCTORS.map((inst, i) => `
    <div class="instructor-card reveal reveal-delay-${i+1} hover-lift">
      <div class="instructor-avatar-lg">
        ${inst.emoji}
        <div class="instructor-badge">✓</div>
      </div>
      <div class="instructor-name">${inst.name}</div>
      <div class="instructor-role">${inst.role}</div>
      <div class="instructor-stats">
        <div class="inst-stat"><strong>${inst.courses}</strong> Courses</div>
        <div class="inst-stat"><strong>${(inst.students/1000).toFixed(0)}k</strong> Students</div>
        <div class="inst-stat"><strong>⭐ ${inst.rating}</strong> Rating</div>
      </div>
    </div>
  `).join('');
}

// ─── RENDER TESTIMONIALS ────────────────────────
function renderTestimonials(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">${'★'.repeat(t.rating)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.emoji}</div>
        <div class="testimonial-info">
          <h4>${t.name}</h4>
          <p>${t.role}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// ─── RENDER FAQS ────────────────────────────────
function renderFAQs(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = FAQS.map(f => `
    <div class="faq-item">
      <div class="faq-question">
        <span>${f.q}</span>
        <span class="faq-icon">+</span>
      </div>
      <div class="faq-answer"><p>${f.a}</p></div>
    </div>
  `).join('');
}

// ─── DAILY STREAK ───────────────────────────────
function getStreak() {
  const today = new Date().toDateString();
  const data = JSON.parse(localStorage.getItem('ev_streak') || '{"streak":1,"last":""}');
  if (data.last !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (data.last === yesterday.toDateString()) data.streak++;
    else if (data.last !== today) data.streak = 1;
    data.last = today;
    localStorage.setItem('ev_streak', JSON.stringify(data));
  }
  return data.streak;
}

// ─── INIT ALL ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initNavbar();
  initTyping();
  initScrollReveal();
  initFAQ();
  initTestimonials();
  initSearch();
  initNewsletter();
  initRipple();
  initCursorSpotlight();
  initTilt();
  initBackToTop();
  initAIChat();

  // Event delegation for theme toggles
  document.querySelectorAll('.theme-toggle').forEach(t => t.addEventListener('click', toggleTheme));
});

window.toggleWishlist = toggleWishlist;
window.enrollCourse = enrollCourse;
window.COURSES = COURSES;
window.CATEGORIES = CATEGORIES;
window.getCourseCardHTML = getCourseCardHTML;
window.showToast = showToast;
