var galleryImages = [
  "IMG_4889.JPG","IMG_4890.JPG","IMG_4894.JPG","IMG_4895.JPG","IMG_4897.JPG",
  "IMG_4925.JPG","IMG_4929.JPG","IMG_4943.JPG","IMG_4962.JPG","IMG_4964.JPG",
  "IMG_4969.JPG","IMG_4973.JPG","IMG_4990.JPG","IMG_5007.JPG","IMG_5012.JPG",
  "IMG_5016.JPG","IMG_5057.JPG","IMG_5069.JPG","IMG_5114.JPG","IMG_5136.JPG",
  "IMG_5138.JPG","IMG_5140.JPG","IMG_5142.JPG","IMG_5151.JPG","IMG_5157.JPG",
  "IMG_5171.JPG","IMG_5176.JPG","IMG_5201.JPG","IMG_5202.JPG","IMG_5214.JPG",
  "IMG_5217.JPG","IMG_5228.JPG","IMG_5229.JPG","IMG_5230.JPG","IMG_5234.JPG",
  "IMG_5239.JPG","IMG_5242.JPG","IMG_5264.JPG","IMG_5267.JPG","IMG_5270.JPG",
  "IMG_5271.JPG","IMG_5274.JPG","IMG_5278.JPG","IMG_5283.JPG","IMG_5290.JPG",
  "IMG_5299.JPG","IMG_5324.JPG"
];

document.addEventListener('DOMContentLoaded', function() {

  var navbar = document.getElementById('navbar');
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  var navAnchors = document.querySelectorAll('.nav-links a');

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
    '.pillar-card, .stat-card, .contact-card, .contact-form-wrapper, .about-text, .section-header, .apply-form-wrapper, .media-form-wrapper, .donate-card'
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

  /* GALLERY STAGGER */
  var galleryImgs = document.querySelectorAll('.gallery-grid img');
  galleryImgs.forEach(function(img, index) {
    img.dataset.delay = index * 60;
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

  /* GALLERY */

  var galleryGrid = document.getElementById('galleryGrid');
  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML =
    '<button class="lightbox-close">&times;</button>' +
    '<button class="lightbox-nav lightbox-prev">&#8249;</button>' +
    '<img src="" alt="Gallery image">' +
    '<button class="lightbox-nav lightbox-next">&#8250;</button>';
  document.body.appendChild(lightbox);

  var lightboxImg = lightbox.querySelector('img');
  var lightboxClose = lightbox.querySelector('.lightbox-close');
  var lightboxPrev = lightbox.querySelector('.lightbox-prev');
  var lightboxNext = lightbox.querySelector('.lightbox-next');
  var currentIndex = 0;

  if (galleryGrid) {
    galleryImages.forEach(function(src, i) {
      var img = document.createElement('img');
      img.src = 'images/' + src;
      img.alt = 'Seek The Waters Festival';
      img.loading = 'lazy';
      img.dataset.index = i;
      img.addEventListener('click', function() {
        currentIndex = parseInt(this.dataset.index);
        lightboxImg.src = this.src;
        lightbox.classList.add('active');
      });
      galleryGrid.appendChild(img);
    });
  }

  lightboxClose.addEventListener('click', function() {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') lightbox.classList.remove('active');
    if (e.key === 'ArrowLeft') navigateGallery(-1);
    if (e.key === 'ArrowRight') navigateGallery(1);
  });

  function navigateGallery(dir) {
    currentIndex = (currentIndex + dir + galleryImages.length) % galleryImages.length;
    lightboxImg.src = 'images/' + galleryImages[currentIndex];
  }

  lightboxPrev.addEventListener('click', function() { navigateGallery(-1); });
  lightboxNext.addEventListener('click', function() { navigateGallery(1); });

  /* FORM HANDLING - Shared utilities */

  function validateField(input) {
    var group = input.closest('.form-group');
    if (!group) return true;
    var value = input.value.trim();
    var isValid = true;

    if (input.hasAttribute('required') && value === '') {
      isValid = false;
    } else if (input.type === 'email' && value !== '') {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) isValid = false;
    } else if (input.tagName === 'SELECT' && value === '') {
      isValid = false;
    }

    if (isValid) {
      group.classList.remove('invalid');
    } else {
      group.classList.add('invalid');
    }
    return isValid;
  }

  function setupFormValidation(formId) {
    var form = document.getElementById(formId);
    if (!form) return;
    var inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(function(input) {
      input.addEventListener('blur', function() { validateField(this); });
      input.addEventListener('input', function() {
        var group = this.closest('.form-group');
        if (group && group.classList.contains('invalid')) validateField(this);
      });
    });
  }

  function setupFormSubmit(formId, successId) {
    var form = document.getElementById(formId);
    if (!form) return;
    var successMsg = document.getElementById(successId);
    var inputs = form.querySelectorAll('input, textarea, select');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var isValid = true;
      inputs.forEach(function(input) {
        if (!validateField(input)) isValid = false;
      });
      if (!isValid) {
        var firstInvalid = form.querySelector('.form-group.invalid input, .form-group.invalid textarea, .form-group.invalid select');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var submitBtn = form.querySelector('.btn-submit');
      var originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      var formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(function(response) { return response.json(); })
      .then(function(result) {
        if (result.success === "true" || result.success === true) {
          if (successMsg) successMsg.classList.add('visible');
          form.reset();
          inputs.forEach(function(input) {
            var group = input.closest('.form-group');
            if (group) group.classList.remove('valid', 'invalid');
          });
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
          setTimeout(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            if (successMsg) successMsg.classList.remove('visible');
          }, 5000);
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      })
      .catch(function(error) {
        console.error('Form error:', error);
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error - Try Again';
        submitBtn.disabled = false;
        setTimeout(function() {
          submitBtn.innerHTML = originalText;
        }, 3000);
      });
    });
  }

  /* Initialize all forms */
  setupFormValidation('contactForm');
  setupFormSubmit('contactForm', 'formSuccess');

  setupFormValidation('applyForm');
  setupFormSubmit('applyForm', 'applySuccess');

  setupFormValidation('mediaForm');
  setupFormSubmit('mediaForm', 'mediaSuccess');

});
