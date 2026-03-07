document.addEventListener("DOMContentLoaded", function () {
  // Loading Animation
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(loadingOverlay);

  setTimeout(() => {
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
      loadingOverlay.remove();
    }, 500);
  }, 1000);

  // Theme Management
  const themeToggle = document.createElement('div');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  document.body.appendChild(themeToggle);

  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  // Enhanced Typing Animation
  const elements = document.querySelectorAll("[typed]");
  elements.forEach(p => {
    const words = p.getAttribute("typed").split(",").map(w => w.trim());
    const el = p.querySelector(".typed-text");
    const cursor = p.querySelector(".typed-cursor");

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const current = words[wordIndex];
      el.textContent = current.substring(0, charIndex);

      let speed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === current.length) {
        speed = 2000; // longer pause when word is complete
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500; // pause before typing next word
      }

      charIndex += isDeleting ? -1 : 1;
      setTimeout(type, speed);
    }

    // Start typing after a delay
    setTimeout(type, 1000);
  });

  // Sidebar toggle functionality with smooth animations
  const sidebarToggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const contentWrapper = document.querySelector('.content-wrapper');

  sidebarToggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('compressed');
    contentWrapper.classList.toggle('compressed');

    // Save sidebar state
    const isCompressed = sidebar.classList.contains('compressed');
    localStorage.setItem('sidebarCompressed', isCompressed);
  });

  // Load sidebar state
  const sidebarCompressed = localStorage.getItem('sidebarCompressed') === 'true';
  if (sidebarCompressed) {
    sidebar.classList.add('compressed');
    contentWrapper.classList.add('compressed');
  }

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  // Add scroll reveal to elements
  document.querySelectorAll('.card, .stat-item, .project-card, .testimonial-card, .contact-info').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });

  // Progress Bar Animation
  const progressBars = document.querySelectorAll('.progress-bar');
  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });

  // Particle Background
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#6366f1'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 5
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#6366f1',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  }

  // Enhanced hover effects for cards
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Dynamic navbar background on scroll
  let lastScrollTop = 0;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (navbar) {
      if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
      }
    }

    lastScrollTop = scrollTop;
  });

  // Add click ripple effect to buttons
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = (e.offsetX - 10) + 'px';
      ripple.style.top = (e.offsetY - 10) + 'px';
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Keyboard navigation improvements
  document.addEventListener('keydown', (e) => {
    // Escape key to close modals or compressed sidebar
    if (e.key === 'Escape') {
      const sidebar = document.getElementById('sidebar');
      if (sidebar.classList.contains('compressed')) {
        sidebar.classList.remove('compressed');
        document.querySelector('.content-wrapper').classList.remove('compressed');
        localStorage.setItem('sidebarCompressed', false);
      }
    }

    // Theme toggle with Ctrl/Cmd + Shift + T
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
      e.preventDefault();
      themeToggle.click();
    }
  });

  // Performance optimization: Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Add CSS for ripple effect
  const style = document.createElement('style');
  style.textContent = `
    .ripple-effect {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }

    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    .btn {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
});
