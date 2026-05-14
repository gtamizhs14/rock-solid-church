/* ============================================================
   ROCK SOLID CHURCH — Main JavaScript
   ============================================================ */

// ---- AOS (Animate On Scroll) ----
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 100
});

// ---- Navbar scroll behavior ----
(function initNavbarScroll() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load
})();

// ---- Mobile hamburger toggle ----
(function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const navCollapse = document.getElementById('navbarNav');
  if (!btn || !navCollapse) return;

  btn.addEventListener('click', function () {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
    bsCollapse.toggle();
  });

  // Close menu when any nav link is clicked
  navCollapse.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });
})();

// ---- Hero page-load animations ----
(function initHeroAnimations() {
  const animatables = document.querySelectorAll('.animate-hero');

  animatables.forEach(function (el) {
    const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
    setTimeout(function () {
      el.classList.add('visible');
    }, delay);
  });
})();

// ---- Countdown timer ----
(function initCountdown() {
  const timerEl = document.getElementById('countdown');
  if (!timerEl) return;

  function getNextSunday10AM() {
    const now = new Date();
    // Build a candidate: this Sunday (or today if Sunday) at 10:00 AM
    const target = new Date(now);
    target.setHours(10, 0, 0, 0);

    const day = now.getDay(); // 0 = Sunday

    if (day === 0) {
      // Today is Sunday — if the service hasn't started yet, count to today's 10 AM
      if (now < target) {
        return target;
      }
      // Already past 10 AM on Sunday — count to next Sunday
      target.setDate(target.getDate() + 7);
      return target;
    }

    // Not Sunday: add the number of days forward until Sunday
    // day=1(Mon)→+6, day=2(Tue)→+5, ..., day=6(Sat)→+1
    const daysUntilSunday = 7 - day;
    target.setDate(target.getDate() + daysUntilSunday);
    return target;
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    const now = new Date();
    const target = getNextSunday10AM();
    const diff = target - now;

    if (diff <= 0) {
      timerEl.textContent = '00:00:00';
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const hours   = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    timerEl.textContent = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  }

  tick();
  setInterval(tick, 1000);
})();

// ---- Swiper carousel (volunteer section) ----
(function initVolunteerSwiper() {
  const el = document.querySelector('.volunteerSwiper');
  if (!el) return;

  new Swiper('.volunteerSwiper', {
    slidesPerView: 7,
    spaceBetween: 16,
    loop: false,
    grabCursor: true,
    pagination: {
      el: '.volunteer-pagination',
      clickable: true,
    },
    autoplay: false,
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 12,
        autoplay: { delay: 3000, disableOnInteraction: false },
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 14,
        autoplay: false,
      },
      1200: {
        slidesPerView: 7,
        spaceBetween: 16,
        autoplay: false,
      },
    },
  });
})();

// ---- GSAP hero parallax ----
(function initHeroParallax() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.innerWidth < 768) return; // skip on mobile — scroll events are throttled

  gsap.registerPlugin(ScrollTrigger);

  const heroBg = document.getElementById('heroBg');
  if (!heroBg) return;

  gsap.to(heroBg, {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
})();

// ---- Scroll progress bar ----
(function initScrollProgress() {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;

  var docHeight = document.documentElement.scrollHeight - window.innerHeight;
  var rafId = null;

  window.addEventListener('resize', function () {
    docHeight = document.documentElement.scrollHeight - window.innerHeight;
  }, { passive: true });

  window.addEventListener('scroll', function () {
    if (rafId) return;
    rafId = requestAnimationFrame(function () {
      rafId = null;
      var pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    });
  }, { passive: true });
})();

// ---- Clip-path image reveal ----
(function initClipReveal() {
  const els = document.querySelectorAll('.clip-reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { observer.observe(el); });
})();

// ---- Staggered word reveal on headings ----
(function initWordReveal() {
  const headings = document.querySelectorAll('.word-reveal');
  if (!headings.length) return;

  headings.forEach(function (h) {
    const words = h.textContent.trim().split(/\s+/);
    h.innerHTML = words.map(function (word, i) {
      return '<span class="word-wrap"><span class="word" style="transition-delay:' + (i * 65) + 'ms">' + word + '</span></span>';
    }).join(' ');
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.word').forEach(function (w) {
        w.classList.add('in-view');
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  headings.forEach(function (h) { observer.observe(h); });
})();

// ---- Number counter strip ----
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const duration = 2000;
      const frameMs = 16;
      const totalFrames = duration / frameMs;
      let frame = 0;

      const timer = setInterval(function () {
        frame++;
        el.textContent = Math.floor(easeOut(frame / totalFrames) * target);
        if (frame >= totalFrames) {
          el.textContent = target;
          clearInterval(timer);
        }
      }, frameMs);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (c) { observer.observe(c); });
})();

// ---- Ripple effect on buttons ----
(function initRipple() {
  const sel = '.btn-plan-visit, .btn-about-us, .btn-give, .btn-cta-plan, .btn-share-story, .btn-footer-plan, .btn-footer-login';
  document.querySelectorAll(sel).forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top  = (e.clientY - rect.top  - size / 2) + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', function () { ripple.remove(); });
    });
  });
})();

// ---- Back to top button ----
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ---- Sermon modal ----
(function initSermonModal() {
  const sermonCards = document.querySelectorAll('.sermon-card');
  const sermonFrame = document.getElementById('sermonFrame');
  const modal = document.getElementById('sermonModal');
  if (!sermonCards.length || !sermonFrame || !modal) return;

  sermonCards.forEach(function (card) {
    card.addEventListener('click', function () {
      const videoId = card.getAttribute('data-video-id');
      sermonFrame.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
      bootstrap.Modal.getOrCreateInstance(modal).show();
    });
  });

  modal.addEventListener('hidden.bs.modal', function () {
    sermonFrame.src = '';
  });
})();

// ---- Cursor trail (welcome image area) ----
(function initCursorTrail() {
  const zone = document.querySelector('.welcome-image-wrap');
  if (!zone) return;

  const icons = ['fa-cross', 'fa-dove', 'fa-heart', 'fa-hands-praying', 'fa-star', 'fa-church'];
  const sizes = [12, 14, 16, 18];
  const colors = ['#ffffff', 'rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)', '#f5f0e8'];
  let lastTime = 0;

  zone.addEventListener('mousemove', function (e) {
    const now = Date.now();
    if (now - lastTime < 85) return;
    lastTime = now;

    const el = document.createElement('i');
    el.className = 'fa-solid ' + icons[Math.floor(Math.random() * icons.length)] + ' cursor-trail-icon';
    el.style.left = e.clientX + 'px';
    el.style.top = e.clientY + 'px';
    el.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)] + 'px';
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(el);

    el.addEventListener('animationend', function () { el.remove(); });
  });
})();

// ---- Preloader ----
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', function () {
    setTimeout(function () {
      preloader.classList.add('hidden');
    }, 1400);
  });
})();

// ---- Full-screen overlay ----
(function initFullscreenOverlay() {
  const overlay = document.getElementById('fsOverlay');
  const closeBtn = document.getElementById('fsCloseBtn');
  const openBtns = document.querySelectorAll('.btn-hamburger-circle');
  if (!overlay) return;

  function openOverlay() {
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeOverlay() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(function (btn) {
    btn.addEventListener('click', openOverlay);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeOverlay);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeOverlay();
  });

  // Handle links in overlay — close first, then scroll or open modal
  overlay.querySelectorAll('.fs-nav-link, .fs-give-btn').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const modalTarget = link.getAttribute('data-modal-target');
      closeOverlay();
      if (modalTarget) {
        e.preventDefault();
        setTimeout(function () {
          const targetEl = document.querySelector(modalTarget);
          if (targetEl) bootstrap.Modal.getOrCreateInstance(targetEl).show();
        }, 420);
      }
    });
  });
})();

// ---- Typewriter hero subtitle ----
(function initTypewriter() {
  const el = document.querySelector('.hero-subtitle');
  if (!el) return;

  const messages = [
    'We are a thriving and diverse community of real people experiencing real life together.',
    'Every Sunday, we gather to worship, grow, and encourage one another in faith.',
    'You belong here — no matter where you\'ve been or where you are right now.',
  ];

  el.textContent = messages[0];

  var msgIndex = 0;
  var charIndex = messages[0].length;
  var isDeleting = false;

  function tick() {
    var current = messages[msgIndex];
    if (isDeleting) {
      charIndex--;
      el.textContent = current.substring(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        msgIndex = (msgIndex + 1) % messages.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, 36);
    } else {
      charIndex++;
      el.textContent = current.substring(0, charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(tick, 2600);
        return;
      }
      setTimeout(tick, 52);
    }
  }

  setTimeout(function () {
    isDeleting = true;
    tick();
  }, 3200);
})();

// ---- Dark mode toggle ----
(function initDarkMode() {
  var btn = document.getElementById('darkToggleBtn');
  var icon = document.getElementById('darkToggleIcon');
  if (!btn) return;

  var html = document.documentElement;
  var stored = localStorage.getItem('rsTheme');
  if (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    stored = 'dark';
  }
  if (stored === 'dark') {
    html.setAttribute('data-theme', 'dark');
    if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
  }

  btn.addEventListener('click', function () {
    var isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('rsTheme', isDark ? 'light' : 'dark');
    if (icon) {
      icon.classList.toggle('fa-moon', isDark);
      icon.classList.toggle('fa-sun', !isDark);
    }
  });
})();

// ---- Card tilt on hover ----
(function initCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return; // skip on touch-only devices

  var cards = document.querySelectorAll('.sermon-card, .event-card, .nxt-card, .svc-card');

  cards.forEach(function (card) {
    var rect = null;
    var rafId = null;
    var mx = 0, my = 0;

    card.addEventListener('mouseenter', function () {
      rect = card.getBoundingClientRect();
    });

    card.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      if (rafId) return;
      rafId = requestAnimationFrame(function () {
        rafId = null;
        if (!rect) return;
        var x = mx - rect.left;
        var y = my - rect.top;
        var rotX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
        var rotY = ((x - rect.width  / 2) / (rect.width  / 2)) *  4;
        card.style.transform = 'perspective(700px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateY(-6px)';
      });
    });

    card.addEventListener('mouseleave', function () {
      rect = null;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      card.style.transform = '';
    });
  });
})();

// ---- Smooth scroll for anchor nav links ----
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      if (this.hasAttribute('data-bs-toggle') || this.getAttribute('data-modal-target')) return;
      var href = this.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var navH = (document.getElementById('mainNavbar') || {}).offsetHeight || 80;
      window.scrollTo({ top: target.offsetTop - navH - 12, behavior: 'smooth' });
    });
  });
})();

// ---- Plan a Visit modal ----
(function initPlanVisitModal() {
  var form = document.getElementById('planVisitForm');
  var formWrap = document.getElementById('pvFormWrap');
  var successEl = document.getElementById('pvSuccess');
  var modal = document.getElementById('planVisitModal');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstName = form.querySelector('input[type="text"]');
    var email = form.querySelector('input[type="email"]');
    if (!firstName || !firstName.value.trim()) { firstName.focus(); return; }
    if (!email || !email.value.trim()) { email.focus(); return; }

    var serviceSelect = form.querySelector('.pv-select');
    var serviceVal = serviceSelect ? serviceSelect.value : '';
    var titleEl = successEl.querySelector('.pv-success-title');
    if (titleEl) {
      if (serviceVal.toLowerCase().indexOf('wednesday') !== -1) {
        titleEl.textContent = 'See You Wednesday!';
      } else if (serviceVal.toLowerCase().indexOf('sunday') !== -1) {
        titleEl.textContent = 'See You Sunday!';
      } else {
        titleEl.textContent = 'See You Soon!';
      }
    }

    formWrap.style.display = 'none';
    successEl.style.display = 'block';
  });

  if (modal) {
    modal.addEventListener('hidden.bs.modal', function () {
      form.reset();
      formWrap.style.display = 'block';
      successEl.style.display = 'none';
    });
  }
})();

// ---- Give Online modal ----
(function initGiveModal() {
  var amountBtns = document.querySelectorAll('.give-amount-btn');
  var customInput = document.querySelector('.give-custom-input');
  var giveBtn = document.getElementById('giveNowBtn');
  var modal = document.getElementById('giveOnlineModal');

  amountBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      amountBtns.forEach(function (b) { b.classList.remove('give-amount-btn--active'); });
      btn.classList.add('give-amount-btn--active');
      if (customInput) customInput.value = '';
    });
  });

  if (customInput) {
    customInput.addEventListener('input', function () {
      amountBtns.forEach(function (b) { b.classList.remove('give-amount-btn--active'); });
    });
  }

  if (giveBtn) {
    giveBtn.addEventListener('click', function () {
      giveBtn.innerHTML = '<i class="fa-solid fa-circle-check me-2"></i>Thank You for Your Gift!';
      giveBtn.style.background = '#22a06b';
      giveBtn.disabled = true;
      setTimeout(function () {
        giveBtn.innerHTML = 'Give Now <i class="fa-solid fa-heart ms-2"></i>';
        giveBtn.style.background = '';
        giveBtn.disabled = false;
        if (modal) bootstrap.Modal.getInstance(modal).hide();
      }, 2200);
    });
  }
})();

// ---- Newsletter form ----
(function initNewsletterForm() {
  var form = document.getElementById('newsletterForm');
  var toastEl = document.getElementById('newsletterToast');
  if (!form || !toastEl) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var input = form.querySelector('.newsletter-input');
    if (!input || !input.value.trim()) return;
    bootstrap.Toast.getOrCreateInstance(toastEl).show();
    form.reset();
  });
})();

// ---- Chatbot widget ----
(function initChatbot() {
  var fab = document.getElementById('chatbotBtn');
  var panel = document.getElementById('chatPanel');
  var closeBtn = document.getElementById('chatCloseBtn');
  var messagesEl = document.getElementById('chatMessages');
  var repliesEl = document.getElementById('chatQuickReplies');

  if (!fab || !panel) return;

  var isOpen = false;
  var welcomed = false;
  var typingEl = null;

  var responses = {
    'service-times': {
      text: '⛪ <strong>Sunday Service Times:</strong><br><br>🕗 8:00 AM — Traditional<br>🕙 9:30 AM — Contemporary (also streamed live)<br>🕚 11:00 AM — Contemporary<br><br>📍 Main Auditorium, 123 Faith Avenue',
      action: { label: 'Watch Live', scroll: '#sermons' },
      replies: ['Location & Parking', 'Plan a Visit', 'First-time visitor?', 'Ask something else']
    },
    'location': {
      text: '📍 <strong>Rock Solid Church</strong><br>123 Faith Avenue<br>Anytown, ST 12345<br><br>We\'re easy to find — look for the orange banner at the entrance!',
      action: null,
      replies: ['Parking tips', 'Service Times', 'Plan a Visit', 'Ask something else']
    },
    'parking': {
      text: '🅿️ <strong>Free parking</strong> is available in our main lot off Faith Avenue.<br><br>On busy Sunday mornings, overflow parking opens across the street. Volunteers in orange vests will guide you to the entrance!',
      action: null,
      replies: ['Location & Parking', 'Service Times', 'Plan a Visit', 'Ask something else']
    },
    'plan-visit': {
      text: 'We\'d love to welcome you! Fill out our quick visitor form and we\'ll prepare a warm welcome for you and your family. 😊',
      action: { label: 'Plan My Visit', modal: '#planVisitModal' },
      replies: ['First-time visitor?', 'Kids & Family', 'Service Times', 'Ask something else']
    },
    'first-visit': {
      text: '✅ Greeter team to guide you in<br>✅ Visitor gift bag at Guest Services<br>✅ No pressure — come as you are<br>✅ Service lasts about 75 minutes<br><br>We can\'t wait to meet you!',
      action: { label: 'Plan My Visit', modal: '#planVisitModal' },
      replies: ['Kids & Family', 'Service Times', 'Location & Parking', 'Ask something else']
    },
    'kids': {
      text: 'Kids are a huge part of our family! We have:<br><br>👶 <strong>Nursery</strong> — 0–2 yrs<br>🎨 <strong>Kids Rock</strong> — 3–5 yrs<br>📖 <strong>Elementary</strong> — K through 5th grade<br><br>All programs run during 9:30 AM & 11:00 AM. Every volunteer is background-checked.',
      action: null,
      replies: ['Students (6th–12th)', 'Plan a Visit', 'Service Times', 'Ask something else']
    },
    'students': {
      text: '🎸 Our <strong>Student Ministry</strong> meets <strong>Wednesdays at 6:30 PM</strong> and during Sunday services.<br><br>Middle & high schoolers get their own age-specific worship, teaching, and community.',
      action: null,
      replies: ['Kids & Family', 'Small Groups', 'Volunteer', 'Ask something else']
    },
    'give': {
      text: 'Your generosity helps us love our community and share the gospel. 🙏<br><br>You can give online securely — choose your amount and fund below.',
      action: { label: 'Give Online', modal: '#giveOnlineModal' },
      replies: ['Service Times', 'Volunteer', 'Small Groups', 'Ask something else']
    },
    'volunteer': {
      text: 'We have a team for everyone!<br><br>🎵 Worship & Creative<br>👋 Welcome & Hospitality<br>👶 Kids Ministry<br>📸 Media & Technology<br>🤝 Outreach & Community<br><br>New volunteer orientation is the first Saturday of every month.',
      action: null,
      replies: ['Small Groups', 'Plan a Visit', 'Kids & Family', 'Ask something else']
    },
    'small-groups': {
      text: 'Small groups are where real friendship happens — meeting in homes across the city for Bible study, prayer, and life together. 🏡<br><br>New groups form every semester. Talk to our Connect team to find your fit!',
      action: null,
      replies: ['Volunteer', 'Plan a Visit', 'Service Times', 'Ask something else']
    },
    'other': {
      text: 'Great question! For anything else, reach out to us directly:<br><br>📧 hello@rocksolidchurch.org<br>📞 (555) 123-4567<br><br>Our team responds within one business day.',
      action: null,
      replies: ['Service Times', 'Plan a Visit', 'Give', 'Volunteer']
    }
  };

  var replyKeyMap = {
    'Service Times': 'service-times',
    'Location & Parking': 'location',
    'Parking tips': 'parking',
    'Plan a Visit': 'plan-visit',
    'First-time visitor?': 'first-visit',
    'Kids & Family': 'kids',
    'Students (6th–12th)': 'students',
    'Give': 'give',
    'Volunteer': 'volunteer',
    'Small Groups': 'small-groups',
    'Ask something else': 'other'
  };

  function scrollBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addMessage(html, isUser) {
    var div = document.createElement('div');
    div.className = 'chat-bubble ' + (isUser ? 'chat-bubble-user' : 'chat-bubble-bot');
    div.innerHTML = html;
    messagesEl.appendChild(div);
    scrollBottom();
  }

  function addActionBtn(label, action) {
    var btn = document.createElement('button');
    btn.className = 'chat-action-btn';
    btn.textContent = label;
    btn.addEventListener('click', function () {
      if (action.modal) {
        var el = document.querySelector(action.modal);
        if (el) bootstrap.Modal.getOrCreateInstance(el).show();
      } else if (action.scroll) {
        var target = document.querySelector(action.scroll);
        if (target) {
          var navbar = document.querySelector('.site-navbar');
          var offset = navbar ? navbar.offsetHeight : 80;
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
        }
      }
    });
    messagesEl.appendChild(btn);
    scrollBottom();
  }

  function showTyping() {
    typingEl = document.createElement('div');
    typingEl.className = 'chat-typing';
    typingEl.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(typingEl);
    scrollBottom();
  }

  function hideTyping() {
    if (typingEl && typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);
    typingEl = null;
  }

  function setReplies(chips) {
    repliesEl.innerHTML = '';
    chips.forEach(function (label) {
      var btn = document.createElement('button');
      btn.className = 'chat-reply-chip';
      btn.textContent = label;
      btn.addEventListener('click', function () {
        handleReply(label, replyKeyMap[label] || 'other');
      });
      repliesEl.appendChild(btn);
    });
  }

  function handleReply(label, key) {
    var data = responses[key] || responses['other'];
    setReplies([]);
    addMessage(label, true);
    showTyping();
    setTimeout(function () {
      hideTyping();
      addMessage(data.text, false);
      if (data.action) addActionBtn(data.action.label, data.action);
      setReplies(data.replies);
    }, 900);
  }

  function showWelcome() {
    if (welcomed) return;
    welcomed = true;
    showTyping();
    setTimeout(function () {
      hideTyping();
      addMessage('👋 Hi there! Welcome to <strong>Rock Solid Church</strong>. I\'m here to help with common questions. What would you like to know?', false);
      setReplies(['Service Times', 'Plan a Visit', 'Location & Parking', 'Kids & Family', 'Give', 'Volunteer']);
    }, 800);
  }

  function openChat() {
    isOpen = true;
    fab.classList.add('open');
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    showWelcome();
  }

  function closeChat() {
    isOpen = false;
    fab.classList.remove('open');
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  }

  fab.addEventListener('click', function () {
    if (isOpen) closeChat(); else openChat();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeChat);
})();
