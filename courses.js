/* =============================================
   EDUVERSE — COURSES PAGE JS
   ============================================= */
/* =========================
   COURSES DATA
========================= */

const courses = [

  {
    title: "Complete Web Development Bootcamp",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    price: "₹2,999",
    rating: "⭐ 4.9",
    students: "18k Students",
    badge: "Best Seller",
    desc: "Master HTML, CSS, JavaScript, React, Node.js and build real-world projects."
  },

  {
    title: "Java Programming Masterclass",
    category: "Java Programming",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    price: "₹2,499",
    rating: "⭐ 4.8",
    students: "12k Students",
    badge: "Trending",
    desc: "Learn Java from basics to advanced including OOP, JDBC, and Spring Boot."
  },

  {
    title: "Machine Learning & AI",
    category: "Machine Learning",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    price: "₹4,999",
    rating: "⭐ 4.9",
    students: "21k Students",
    badge: "Hot",
    desc: "Build AI models using Python, TensorFlow, neural networks and deep learning."
  },

  {
    title: "DSA Complete Preparation",
    category: "Data Structures & Algorithms",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    price: "₹3,499",
    rating: "⭐ 4.7",
    students: "15k Students",
    badge: "Top Rated",
    desc: "Ace coding interviews with arrays, trees, graphs, dynamic programming and more."
  },

  {
    title: "UI/UX Design Pro",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    price: "₹2,199",
    rating: "⭐ 4.8",
    students: "8k Students",
    badge: "Creative",
    desc: "Design stunning apps and websites using Figma, wireframes and prototyping."
  },

  {
    title: "Cloud Computing with AWS",
    category: "Cloud Computing",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    price: "₹5,499",
    rating: "⭐ 4.9",
    students: "10k Students",
    badge: "Professional",
    desc: "Deploy scalable cloud apps using AWS EC2, Lambda, S3, and DevOps tools."
  },

  {
    title: "DevOps Engineering",
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
    price: "₹4,299",
    rating: "⭐ 4.7",
    students: "9k Students",
    badge: "Career Boost",
    desc: "Learn Docker, Kubernetes, Jenkins, CI/CD pipelines and automation."
  },

  {
    title: "Cyber Security Essentials",
    category: "Cyber Security",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87",
    price: "₹3,799",
    rating: "⭐ 4.8",
    students: "13k Students",
    badge: "Secure",
    desc: "Understand ethical hacking, penetration testing, networking and security."
  }

];

/* =========================
   DISPLAY COURSES
========================= */

const courseGrid = document.getElementById("courses-page-grid");

function displayCourses() {

  courseGrid.innerHTML = "";

  courses.forEach(course => {

    courseGrid.innerHTML += `

      <div class="course-card">

        <span class="course-badge">
          ${course.badge}
        </span>

        <img 
          src="${course.image}" 
          alt="${course.title}" 
          class="course-image"
        />

        <div class="course-content">

          <span class="course-category">
            ${course.category}
          </span>

          <h3 class="course-title">
            ${course.title}
          </h3>

          <p class="course-desc">
            ${course.desc}
          </p>

          <div class="course-meta">

            <span class="course-rating">
              ${course.rating}
            </span>

            <span class="course-students">
              ${course.students}
            </span>

          </div>

          <div class="course-bottom">

            <span class="course-price">
              ${course.price}
            </span>

            <button class="course-btn">
              Enroll Now
            </button>

          </div>

        </div>

      </div>

    `;
  });
}

/* =========================
   INITIAL LOAD
========================= */

displayCourses();

let currentCat = 'all';
let currentSort = 'popular';
let currentPage = 1;
let searchQuery = '';
const PER_PAGE = 8;

function getFiltered() {
  let list = [...COURSES];
  if (currentCat !== 'all') list = list.filter(c => c.category === currentCat);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      (c.tags || []).some(t => t.toLowerCase().includes(q))
    );
  }
  switch (currentSort) {
    case 'rating': list.sort((a,b) => b.rating - a.rating); break;
    case 'price-low': list.sort((a,b) => a.price - b.price); break;
    case 'price-high': list.sort((a,b) => b.price - a.price); break;
    case 'newest': list.sort((a,b) => b.id - a.id); break;
    default: list.sort((a,b) => b.students - a.students);
  }
  return list;
}

function renderCoursesPage() {
  const grid = document.getElementById('courses-page-grid');
  const info = document.getElementById('results-info');
  const pagEl = document.getElementById('pagination');
  if (!grid) return;

  const all = getFiltered();
  const total = all.length;
  const totalPages = Math.ceil(total / PER_PAGE);
  const paged = all.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  info.textContent = `Showing ${paged.length} of ${total} courses` + (currentCat !== 'all' ? ` in "${currentCat}"` : '') + (searchQuery ? ` for "${searchQuery}"` : '');

  if (paged.length === 0) {
    grid.innerHTML = `<div class="no-results"><div class="no-icon">😕</div><h3>No courses found</h3><p>Try adjusting your filters or search terms</p></div>`;
    pagEl.innerHTML = '';
    return;
  }
  grid.innerHTML = paged.map((c, i) => getCourseCardHTML(c, i)).join('');
  initTiltOnPage();

  // Pagination
  pagEl.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
    btn.textContent = i;
    btn.addEventListener('click', () => { currentPage = i; renderCoursesPage(); window.scrollTo({top:0,behavior:'smooth'}); });
    pagEl.appendChild(btn);
  }
}

function initTiltOnPage() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x*10}deg) rotateX(${-y*10}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // URL params
  const params = new URLSearchParams(window.location.search);
  const qParam = params.get('q');
  const catParam = params.get('cat');
  if (qParam) {
    searchQuery = qParam;
    const si = document.getElementById('course-search');
    if (si) si.value = qParam;
  }
  if (catParam) {
    currentCat = catParam;
    document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.cat === catParam || (catParam && c.dataset.cat === 'all' && !document.querySelector(`.chip[data-cat="${catParam}"]`))));
  }

  renderCoursesPage();

  // Filter chips
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      currentCat = chip.dataset.cat;
      currentPage = 1;
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderCoursesPage();
    });
  });

  // Sort
  const sortEl = document.getElementById('sort-select');
  if (sortEl) sortEl.addEventListener('change', () => { currentSort = sortEl.value; currentPage = 1; renderCoursesPage(); });

  // Search
  const si = document.getElementById('course-search');
  if (si) {
    let timer;
    si.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => { searchQuery = si.value.trim(); currentPage = 1; renderCoursesPage(); }, 300);
    });
  }
});

// Make initTilt accessible
function initTilt() { initTiltOnPage(); }
