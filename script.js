// script.js — navigation, reveal-on-scroll, contact mailto, theme toggle

document.addEventListener('DOMContentLoaded', () => {
  // set year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const navList = document.getElementById('navList');
  if (menuBtn && navList) {
    menuBtn.addEventListener('click', () => {
      // Toggle the 'show' class to manage visibility via CSS
      navList.classList.toggle('show');
    });
    
    // Hide menu when a link is clicked
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                navList.classList.remove('show');
            }
        });
    });
  }

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // reveal on scroll using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => observer.observe(r));

  // contact form - client-side mailto
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('c-name').value.trim();
      const email = document.getElementById('c-email').value.trim();
      const message = document.getElementById('c-message').value.trim();
      if (!name || !email || !message) {
        alert('Please fill all fields.');
        return;
      }
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      // RECIPIENT EMAIL: parthapaul2705@gmail.com
      const recipient = 'parthapaul2705@gmail.com'; 
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  }

  // ========== THEME TOGGLE LOGIC ==========
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // 1. Determine the initial theme (saved in local storage or system preference)
  function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // 2. Apply theme to the body and update the button icon
  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      themeToggle.textContent = '🌙'; 
      themeToggle.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
      body.classList.remove('dark-mode');
      themeToggle.textContent = '☀️'; 
      themeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
    }
  }

  // 3. Handle the click event: toggle and save preference
  function toggleTheme() {
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  }

  // Initialize theme on page load
  if (themeToggle) {
    applyTheme(getInitialTheme());
    // Attach event listener to the toggle button
    themeToggle.addEventListener('click', toggleTheme);
  }
  // ========== END THEME TOGGLE LOGIC ==========
});