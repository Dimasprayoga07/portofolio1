/**
 * ===================================================================
 * DIMAS - FRONTEND DEVELOPER PORTFOLIO
 * Main Interactive Logic (Vanilla JavaScript)
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initProjectFilters();
  initProjectModal();
  initCopyEmail();
  initContactForm();
  initScrollEffects();
  updateCurrentYear();
});

/* --- 1. THEME TOGGLE (DARK / LIGHT MODE) --- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const htmlElement = document.documentElement;
  
  // Check persisted theme or system preference
  const savedTheme = localStorage.getItem('dimas_portfolio_theme');
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else {
    // Default to dark mode for a modern developer aesthetic
    htmlElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('dimas_portfolio_theme', newTheme);
      showToast(`Tema diganti ke ${newTheme === 'dark' ? 'Mode Gelap' : 'Mode Terang'}`);
    });
  }
}

/* --- 2. NAVIGATION & MOBILE MENU --- */
function initNavigation() {
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      const isExpanded = mobileToggleBtn.getAttribute('aria-expanded') === 'true';
      mobileToggleBtn.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking outside or clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggleBtn.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Header scroll shadow effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Active section indicator on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --- 3. PROJECT CATEGORY FILTERS --- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- 4. PROJECT DETAIL MODAL DIALOG --- */
const projectDetailsData = {
  advokasi: {
    title: 'Sistem Informasi Manajemen Advokasi Kebutuhan Infrastruktur Sekolah',
    category: 'Dashboard & Sistem Informasi (Unggulan)',
    problem: 'Pengumpulan data kondisi kerusakan dan kebutuhan fasilitas sarana prasarana sekolah di berbagai daerah sering kali terfragmentasi. Akibatnya, pengambil kebijakan kesulitan memetakan tingkat keparahan isu dan menentukan prioritas penyaluran bantuan advokasi fasilitas pendidikan.',
    solution: 'Membangun antarmuka dashboard manajemen advokasi terpadu yang menyajikan direktori sekolah, formulir pengajuan isu infrastruktur terstruktur, pemantauan status kerusakan per wilayah, serta tampilan visualisasi klastering isu.',
    role: 'Frontend Developer — Bertanggung jawab penuh terhadap perancangan dan implementasi antarmuka pengguna berbasis komponen Tailwind CSS dan Shadcn/ui. Mengatur responsiveness pada layout dashboard, penataan formulir laporan interaktif, dan penataan tabel data direktori.',
    features: [
      'Sistem Autentikasi Login dan proteksi rute antarmuka pengguna',
      'Direktori & Profil Detail Sekolah dengan pencarian dan filter status',
      'Dashboard Wilayah dengan ringkasan metrik statistik kondisi fasilitas',
      'Formulir Pelaporan Isu Infrastruktur dengan upload bukti berkas/foto',
      'Visualisasi Klasterisasi Isu untuk memetakan prioritas penanganan sarpras'
    ],
    tech: ['Tailwind CSS', 'Shadcn/ui', 'JavaScript', 'HTML5', 'CSS3'],
    result: 'Menghasilkan antarmuka web modern, terstruktur rapi, dan mudah digunakan bagi staf maupun pemangku kepentingan untuk memantau data sarana prasarana sekolah secara cepat dan terpusat. [Belum diisi jika ada metrik kuantitatif tambahan]'
  },
  ecommerce: {
    title: 'Website Toko Online Responsif (E-Commerce)',
    category: 'Katalog & E-Commerce',
    problem: 'Pengguna kerap meninggalkan situs belanja jika antarmuka berantakan, kartu produk terpotong di layar smartphone, atau struktur navigasi kategori produk membingungkan calon pembeli.',
    solution: 'Merancang website e-commerce dengan sistem grid responsif berbasis Bootstrap, navigasi dinamis, dan penataan kartu produk yang konsisten dan nyaman dipindai di berbagai gadget.',
    role: 'Frontend Developer — Mengembangkan struktur halaman depan, mengimplementasikan interaktivitas interaksi tombol/katalog menggunakan JavaScript murni, menyusun styling dengan Bootstrap, dan menghubungkan tampilan dengan dataset produk dari database MySQL.',
    features: [
      'Navbar responsif dengan toggle navigasi mobile adaptif',
      'Hero banner & section profil singkat toko online (About Section)',
      'Highlight kategori produk trending untuk mempermudah navigasi pembeli',
      'Grid katalog produk dinamis dengan label harga dan tombol aksi',
      'Penyelarasan tampilan responsif menggunakan sistem grid Bootstrap'
    ],
    tech: ['Bootstrap', 'JavaScript', 'HTML5', 'CSS3', 'MySQL'],
    result: 'Menghadirkan antarmuka toko online yang bersih, ringan, dan nyaman dijelajahi di berbagai ukuran layar gawai. [Belum diisi]'
  },
  erapor: {
    title: 'Sistem Informasi Pengelolaan E-Rapor Sekolah',
    category: 'Sistem Informasi Akademik',
    problem: 'Proses kompilasi dan rekapitulasi nilai rapor manual membutuhkan waktu panjang serta rawan kesalahan input jika antarmuka formulir tidak dipisahkan dengan jelas sesuai peran pengguna.',
    solution: 'Menyediakan aplikasi web E-Rapor terintegrasi dengan antarmuka yang disesuaikan secara khusus untuk masing-masing hak akses pengguna (guru mata pelajaran, wali kelas, dan siswa).',
    role: 'Developer — Merancang alur formulir antarmuka, menyusun tabel rekapitulasi penilaian, mengelola pemisahan tampilan sesuai hak akses role pengguna, dan mengintegrasikannya dengan backend PHP & MySQL.',
    features: [
      'Portal input nilai khusus guru mata pelajaran dengan validasi batasan nilai',
      'Dashboard rekapitulasi dan ringkasan nilai komprehensif bagi wali kelas',
      'Halaman tampilan hasil belajar dan rapor yang mudah dibaca oleh siswa',
      'Tabel data penilaian terstruktur dengan status kelulusan KKM'
    ],
    tech: ['PHP', 'HTML5', 'CSS3', 'MySQL'],
    result: 'Sistem memudahkan guru dan wali kelas dalam melakukan penginputan serta peninjauan capaian nilai akademik siswa secara digital dan teratur. [Belum diisi]'
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCloseFooterBtn = document.getElementById('modal-btn-close-footer');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalBodyContent = document.getElementById('modal-body-content');
  const openModalButtons = document.querySelectorAll('.btn-open-modal');

  function openModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;

    modalBodyContent.innerHTML = `
      <div class="modal-section">
        <h4 class="modal-section-title">📌 Masalah & Latar Belakang</h4>
        <p>${data.problem}</p>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">💡 Solusi Antarmuka (Frontend)</h4>
        <p>${data.solution}</p>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">👤 Peran & Kontribusi Saya</h4>
        <p>${data.role}</p>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">✨ Fitur Kunci yang Dibuat</h4>
        <ul class="modal-feature-list">
          ${data.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">🛠️ Teknologi yang Digunakan</h4>
        <div class="card-tech-stack" style="margin-top: 8px;">
          ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">📈 Hasil Proyek</h4>
        <p>${data.result}</p>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCloseFooterBtn) modalCloseFooterBtn.addEventListener('click', closeModal);

  // Close modal when clicking backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --- 5. COPY EMAIL TO CLIPBOARD --- */
function initCopyEmail() {
  const copyBtn = document.getElementById('btn-copy-email');
  const emailTextElem = document.getElementById('email-text');

  if (copyBtn && emailTextElem) {
    copyBtn.addEventListener('click', () => {
      const email = emailTextElem.textContent.trim();
      navigator.clipboard.writeText(email)
        .then(() => {
          showToast('Alamat email berhasil disalin ke clipboard!');
        })
        .catch(() => {
          showToast('Gagal menyalin email.');
        });
    });
  }
}

/* --- 6. CONTACT FORM HANDLING --- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();

      showToast(`Terima kasih, ${name}! Pesan Anda telah terkirim.`);
      contactForm.reset();
    });
  }
}

/* --- 7. SCROLL EFFECTS & BACK TO TOP --- */
function initScrollEffects() {
  const backToTopBtn = document.getElementById('back-to-top-btn');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* --- 8. UTILITY: TOAST NOTIFICATION --- */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  if (toast && toastMessage) {
    toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
}

/* --- 9. DYNAMIC YEAR IN FOOTER --- */
function updateCurrentYear() {
  const yearElem = document.getElementById('current-year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
}
