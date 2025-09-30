document.addEventListener("DOMContentLoaded", function () {
  // Find all elements with the 'typed' attribute
  const elements = document.querySelectorAll("[typed]");

  elements.forEach(p => {
    const words = p.getAttribute("typed").split(",").map(w => w.trim());
    const el = p.querySelector(".typed-text");

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const current = words[wordIndex];
      el.textContent = current.substring(0, charIndex);

      let speed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === current.length) {
        speed = 1200; // pause when word is complete
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400; // pause before typing next word
      }

      charIndex += isDeleting ? -1 : 1;
      setTimeout(type, speed);
    }

    type();
  });

  // Sidebar toggle functionality
  const sidebarToggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const contentWrapper = document.querySelector('.content-wrapper');

  sidebarToggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('compressed');
    contentWrapper.classList.toggle('compressed');
  });
});
