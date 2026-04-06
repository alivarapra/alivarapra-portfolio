/* ----------------------------------------------------------------
   Smooth Scrolling
---------------------------------------------------------------- */
document.querySelectorAll('.smoothscroll').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ----------------------------------------------------------------
   Sticky Nav on Scroll
---------------------------------------------------------------- */
const navWrap = document.getElementById('nav-wrap');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navWrap.classList.add('opaque');
  } else {
    navWrap.classList.remove('opaque');
  }
});

/* ----------------------------------------------------------------
   Back to Top Button visibility
---------------------------------------------------------------- */
const goTop = document.getElementById('go-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    goTop.style.display = 'block';
  } else {
    goTop.style.display = 'none';
  }
});

/* ----------------------------------------------------------------
   Testimonials Slider
---------------------------------------------------------------- */
(function () {
  const slides = document.querySelectorAll('.slides li');
  if (slides.length <= 1) return;

  let current = 0;
  setInterval(() => {
    slides[current].style.display = 'none';
    current = (current + 1) % slides.length;
    slides[current].style.display = 'block';
  }, 5000);
})();

/* ----------------------------------------------------------------
   Contact Form (Netlify Forms submission)
---------------------------------------------------------------- */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const msgSuccess = document.getElementById('message-success');
    const msgWarning = document.getElementById('message-warning');
    const submitBtn = form.querySelector('.submit-btn');

    // Simple validation
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      msgWarning.style.display = 'block';
      msgSuccess.style.display = 'none';
      return;
    }

    // Disable button while submitting
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';

    // Submit to Netlify
    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(response => {
      if (response.ok) {
        msgWarning.style.display = 'none';
        msgSuccess.style.display = 'block';
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(() => {
      msgWarning.style.display = 'block';
      msgSuccess.style.display = 'none';
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa fa-paper-plane"></i> Send Message';
    });
  });
}

/* ----------------------------------------------------------------
   Active Nav Highlight on Scroll
---------------------------------------------------------------- */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 200;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const navLink = document.querySelector(`#nav a[href="#${id}"]`);
    if (navLink) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('#nav li').forEach(li => li.classList.remove('current'));
        navLink.parentElement.classList.add('current');
      }
    }
  });

  // Home highlight
  if (window.scrollY < 200) {
    document.querySelectorAll('#nav li').forEach(li => li.classList.remove('current'));
    const homeLink = document.querySelector('#nav a[href="#home"]');
    if (homeLink) homeLink.parentElement.classList.add('current');
  }
});
