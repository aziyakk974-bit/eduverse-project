/* =============================================
   EDUVERSE — DASHBOARD JS
   Canvas chart, progress, badges, leaderboard
   ============================================= */

// ── GREETING ──────────────────────────────────
function setGreeting() {
  const h = new Date().getHours();
  const greetEl = document.getElementById('greeting-time');
  if (!greetEl) return;
  if (h < 12) greetEl.textContent = 'Morning';
  else if (h < 17) greetEl.textContent = 'Afternoon';
  else greetEl.textContent = 'Evening';
}

// ── STREAK ────────────────────────────────────
function renderStreak() {
  const streak = getStreak();
  document.querySelectorAll('#dash-streak, #streak-num').forEach(el => el && (el.textContent = streak));
  const container = document.getElementById('streak-days');
  if (!container) return;
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const today = new Date().getDay();
  const adjustedToday = today === 0 ? 6 : today - 1;
  container.innerHTML = days.map((d, i) => {
    const done = i < adjustedToday;
    const isToday = i === adjustedToday;
    return `<div class="streak-day ${done ? 'done' : ''} ${isToday ? 'today' : ''}" title="${d}">${d[0]}</div>`;
  }).join('');
}

// ── ENROLLED COURSES ──────────────────────────
const ENROLLED_DATA = [
  { id: 1, progress: 72, lastLesson: 'Lecture 18: Collections Framework' },
  { id: 3, progress: 35, lastLesson: 'Lecture 12: React Hooks' },
  { id: 4, progress: 58, lastLesson: 'Lecture 9: Neural Networks' },
  { id: 6, progress: 90, lastLesson: 'Lecture 26: Portfolio Project' }
];

function renderEnrolled() {
  const container = document.getElementById('enrolled-list');
  if (!container) return;
  container.innerHTML = ENROLLED_DATA.map(e => {
    const course = COURSES.find(c => c.id === e.id);
    if (!course) return '';
    return `
      <div class="enrolled-item" onclick="window.location.href='course-details.html?id=${course.id}'">
        <div class="enrolled-thumb" style="background:linear-gradient(135deg,${course.color}33,${course.color}11)">${course.emoji}</div>
        <div class="enrolled-info">
          <div class="enrolled-title">${course.title}</div>
          <div class="enrolled-meta">▶ ${e.lastLesson}</div>
          <div class="enrolled-bar"><div class="enrolled-fill" style="width:${e.progress}%"></div></div>
        </div>
        <div class="enrolled-pct">${e.progress}%</div>
      </div>`;
  }).join('');
}

// ── PROGRESS CIRCLES ──────────────────────────
const PROGRESS_DATA = [
  { label: 'Java', value: 72, color: '#f59e0b' },
  { label: 'React', value: 35, color: '#38bdf8' },
  { label: 'ML', value: 58, color: '#ec4899' },
  { label: 'UI/UX', value: 90, color: '#a855f7' },
  { label: 'AWS', value: 20, color: '#f97316' },
  { label: 'DevOps', value: 15, color: '#0891b2' }
];

function makeCircle(label, value, color) {
  const r = 38; const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return `
    <div class="prog-circle-wrap">
      <svg viewBox="0 0 90 90">
        <circle cx="45" cy="45" r="${r}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="7"/>
        <circle class="progress-ring-circle" cx="45" cy="45" r="${r}" fill="none"
          stroke="${color}" stroke-width="7"
          stroke-dasharray="${circ}" stroke-dashoffset="${circ}"
          data-offset="${offset}"
          style="transform:rotate(-90deg);transform-origin:center;transition:stroke-dashoffset 1.2s ease;"/>
        <text x="45" y="50" text-anchor="middle" fill="white" font-size="14" font-weight="800" font-family="Poppins">${value}%</text>
      </svg>
      <div class="prog-label">${label}</div>
    </div>`;
}

function renderProgressCircles() {
  const container = document.getElementById('progress-circles');
  if (!container) return;
  container.innerHTML = PROGRESS_DATA.map(p => makeCircle(p.label, p.value, p.color)).join('');
  // Animate after render
  setTimeout(() => {
    container.querySelectorAll('.progress-ring-circle').forEach(circle => {
      circle.style.strokeDashoffset = circle.dataset.offset;
    });
  }, 400);
}

// ── WEEKLY CHART (Canvas API) ──────────────────
function renderWeekChart() {
  const canvas = document.getElementById('weekChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth || 600;
  canvas.height = 200;

  const data = [45, 80, 60, 120, 90, 150, 110];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const max = Math.max(...data);
  const W = canvas.width, H = canvas.height;
  const padL = 40, padR = 20, padT = 20, padB = 36;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  ctx.clearRect(0, 0, W, H);

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padT + (chartH / 4) * i;
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
  }

  // Gradient fill
  const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
  grad.addColorStop(0, 'rgba(124,58,237,0.5)');
  grad.addColorStop(1, 'rgba(124,58,237,0)');

  // Build points
  const pts = data.map((v, i) => ({
    x: padL + (i / (data.length - 1)) * chartW,
    y: padT + chartH - (v / max) * chartH
  }));

  // Fill area
  ctx.beginPath();
  ctx.moveTo(pts[0].x, padT + chartH);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(pts[pts.length - 1].x, padT + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cp1x = (pts[i - 1].x + pts[i].x) / 2;
    ctx.bezierCurveTo(cp1x, pts[i - 1].y, cp1x, pts[i].y, pts[i].x, pts[i].y);
  }
  ctx.strokeStyle = '#7c3aed';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Dots + labels
  pts.forEach((p, i) => {
    // Dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#a855f7';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    // Day label
    ctx.fillStyle = 'rgba(148,163,184,0.8)';
    ctx.font = '11px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(days[i], p.x, H - 8);
    // Value label
    ctx.fillStyle = 'rgba(241,245,249,0.9)';
    ctx.font = 'bold 10px Poppins, sans-serif';
    ctx.fillText(data[i] + 'm', p.x, p.y - 10);
  });

  // Y-axis label
  ctx.save();
  ctx.translate(12, padT + chartH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = 'rgba(148,163,184,0.6)';
  ctx.font = '10px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('mins', 0, 0);
  ctx.restore();
}

// ── DEADLINES ─────────────────────────────────
const DEADLINES = [
  { title: 'Java Assignment 3', course: 'Complete Java Masterclass', date: 'Tomorrow', color: '#ef4444' },
  { title: 'React Final Project', course: 'Full Stack Web Dev', date: 'Dec 28', color: '#f59e0b' },
  { title: 'ML Quiz — Chapter 4', course: 'Machine Learning Fundamentals', date: 'Jan 2', color: '#22c55e' },
  { title: 'Design Portfolio Review', course: 'UI/UX Design Essentials', date: 'Jan 5', color: '#06b6d4' }
];

function renderDeadlines() {
  const container = document.getElementById('deadline-list');
  if (!container) return;
  container.innerHTML = DEADLINES.map(d => `
    <div class="deadline-item">
      <div class="deadline-dot" style="background:${d.color}"></div>
      <div class="deadline-info">
        <h4>${d.title}</h4>
        <p>${d.course}</p>
      </div>
      <div class="deadline-date">${d.date}</div>
    </div>`).join('');
}

// ── ACHIEVEMENTS ──────────────────────────────
const BADGES = [
  { icon: '🚀', name: 'Launcher', desc: 'First course enrolled', unlocked: true },
  { icon: '🔥', name: 'On Fire', desc: '7-day streak', unlocked: true },
  { icon: '💯', name: 'Perfect Score', desc: 'Quiz 100%', unlocked: true },
  { icon: '⚡', name: 'Fast Learner', desc: '5 hours in a day', unlocked: true },
  { icon: '🎓', name: 'Graduate', desc: 'Complete 1 course', unlocked: true },
  { icon: '💎', name: 'Diamond', desc: 'Pro subscriber', unlocked: true },
  { icon: '🌟', name: 'Star Student', desc: 'Top 10 leaderboard', unlocked: true },
  { icon: '🏆', name: 'Champion', desc: '3 certs earned', unlocked: true },
  { icon: '🎯', name: 'Focused', desc: '30-day streak', unlocked: false },
  { icon: '🧠', name: 'Mastermind', desc: '5 courses done', unlocked: false },
  { icon: '👑', name: 'Legend', desc: 'Top 3 leaderboard', unlocked: false },
  { icon: '🌍', name: 'Global', desc: 'Shared 10 certs', unlocked: false }
];

function renderBadges() {
  const container = document.getElementById('badges-grid');
  if (!container) return;
  container.innerHTML = BADGES.map(b => `
    <div class="achievement ${b.unlocked ? 'unlocked' : ''}" title="${b.desc}">
      <div class="achievement-icon">${b.icon}</div>
      <div class="achievement-name">${b.name}</div>
    </div>`).join('');
}

// ── LEADERBOARD ───────────────────────────────
const LEADERS = [
  { name: 'Akhil Nair', emoji: '👨‍💻', pts: 3420, rank: 1, trophy: '🥇' },
  { name: 'Sneha Iyer', emoji: '👩‍🎨', pts: 2980, rank: 2, trophy: '🥈' },
  { name: 'Divya K.', emoji: '👩', pts: 2750, rank: 3, trophy: '🥉' },
  { name: 'Rohan Mathew', emoji: '👨', pts: 1240, rank: 4, trophy: '', you: true },
  { name: 'Arjun Dev', emoji: '🧑', pts: 990, rank: 5, trophy: '' },
];

function renderLeaderboard() {
  const container = document.getElementById('leader-list');
  if (!container) return;
  container.innerHTML = LEADERS.map(l => `
    <div class="leader-item ${l.you ? 'you' : ''}">
      <div class="leader-rank">${l.trophy || '#' + l.rank}</div>
      <div class="leader-avatar">${l.emoji}</div>
      <div class="leader-name">${l.name} ${l.you ? '<span style="font-size:0.7rem;color:var(--primary-light);">(You)</span>' : ''}</div>
      <div class="leader-pts">⭐ ${l.pts.toLocaleString()} XP</div>
    </div>`).join('');
}

// ── RECENT ACTIVITY ────────────────────────────
const ACTIVITIES = [
  { icon: '▶️', title: 'Completed Lecture 18', desc: 'Collections Framework — Java Masterclass', time: '2 hours ago' },
  { icon: '🏆', title: 'Badge Unlocked!', desc: 'Champion — Earned 3 certificates', time: '1 day ago' },
  { icon: '📝', title: 'Submitted Assignment 2', desc: 'OOP Design Patterns — Java Masterclass', time: '2 days ago' },
  { icon: '⭐', title: 'Left a Review', desc: '5 stars on React for Beginners', time: '3 days ago' },
  { icon: '🎓', title: 'Course Completed!', desc: 'UI/UX Design Essentials — Got certificate', time: '5 days ago' },
  { icon: '🚀', title: 'Enrolled in New Course', desc: 'Machine Learning Fundamentals', time: '1 week ago' }
];

function renderActivity() {
  const container = document.getElementById('activity-list');
  if (!container) return;
  container.innerHTML = ACTIVITIES.map(a => `
    <div class="activity-item">
      <div class="activity-icon">${a.icon}</div>
      <div class="activity-info">
        <h4>${a.title}</h4>
        <p>${a.desc} · <span style="color:var(--primary-light)">${a.time}</span></p>
      </div>
    </div>`).join('');
}

// ── SIDEBAR TOGGLE ────────────────────────────
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  sidebar.classList.toggle('collapsed');
  const btn = sidebar.querySelector('.sidebar-toggle');
  if (btn) btn.textContent = sidebar.classList.contains('collapsed') ? '▶' : '◀';
}

// ── INIT ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setGreeting();
  renderStreak();
  renderEnrolled();
  renderProgressCircles();
  renderDeadlines();
  renderBadges();
  renderLeaderboard();
  renderActivity();

  // Animate XP counter
  const xpEl = document.getElementById('xp-count');
  if (xpEl) {
    let n = 0;
    const target = 1240;
    const step = target / 60;
    const timer = setInterval(() => {
      n = Math.min(n + step, target);
      xpEl.textContent = Math.floor(n).toLocaleString();
      if (n >= target) clearInterval(timer);
    }, 20);
  }

  // Draw chart after layout settles
  setTimeout(renderWeekChart, 500);
  window.addEventListener('resize', renderWeekChart);
});

window.toggleSidebar = toggleSidebar;
