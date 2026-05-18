document.addEventListener('DOMContentLoaded', function() {

  var navbar = document.getElementById('navbar');
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  var navAnchors = document.querySelectorAll('.nav-links a');
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  var lastScroll = 0;

  function handleScroll() {
    var currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navAnchors.forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');

      var targetId = this.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);

      if (target) {
        var offset = navbar.offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* REVEAL ON SCROLL */

  var revealElements = document.querySelectorAll(
    '.pillar-card, .stat-card, .contact-card, .contact-form-wrapper, .about-text, .section-header'
  );

  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        var delay = entry.target.dataset.delay || 0;
        entry.target.style.transitionDelay = delay + 'ms';

        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(function(el) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  /* PILLAR CARD STAGGER */

  var pillarCards = document.querySelectorAll('.pillar-card');
  pillarCards.forEach(function(card, index) {
    card.dataset.delay = index * 80;
  });

  var statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(function(card, index) {
    card.dataset.delay = index * 100;
  });

  /* FORM VALIDATION */

  function validateField(input) {
    var group = input.closest('.form-group');
    var value = input.value.trim();

    if (input.hasAttribute('required') && value === '') {
      group.classList.remove('valid');
      group.classList.add('invalid');
      return false;
    }

    if (input.type === 'email' && value !== '') {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        group.classList.remove('valid');
        group.classList.add('invalid');
        return false;
      }
    }

    group.classList.remove('invalid');
    group.classList.add('valid');
    return true;
  }

  var formInputs = contactForm.querySelectorAll('input, textarea');

  formInputs.forEach(function(input) {
    input.addEventListener('blur', function() {
      validateField(this);
    });

    input.addEventListener('input', function() {
      if (this.closest('.form-group').classList.contains('invalid')) {
        validateField(this);
      }
    });
  });

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var isValid = true;

    formInputs.forEach(function(input) {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      formSuccess.classList.add('visible');
      contactForm.reset();

      formInputs.forEach(function(input) {
        var group = input.closest('.form-group');
        group.classList.remove('valid', 'invalid');
      });

      setTimeout(function() {
        formSuccess.classList.remove('visible');
      }, 5000);
    } else {
      var firstInvalid = contactForm.querySelector('.form-group.invalid input, .form-group.invalid textarea');
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  });

});
