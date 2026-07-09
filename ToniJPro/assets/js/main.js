/**
* Template Name: Impact
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/impact-bootstrap-business-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky Header on Scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;

    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('sticked');
        if (nextElement) nextElement.classList.add('sticked-header-offset');
      } else {
        selectHeader.classList.remove('sticked');
        if (nextElement) nextElement.classList.remove('sticked-header-offset');
      }
    }
    window.addEventListener('load', headerFixed);
    document.addEventListener('scroll', headerFixed);
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll('#navbar a');

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {

      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

  /**
   * Service work sample lightbox
   */
  const sampleCards = document.querySelectorAll('.service-sample-card');
  const sampleLightbox = document.querySelector('#sample-lightbox');
  const sampleLightboxTitle = document.querySelector('#sample-lightbox-title');
  const sampleLightboxImage = document.querySelector('#sample-lightbox-image');
  const sampleLightboxFallback = document.querySelector('#sample-lightbox-fallback');
  const sampleLightboxClose = document.querySelector('.sample-lightbox__close');
  const sampleLightboxMedia = document.querySelector('.sample-lightbox__media');

  document.querySelectorAll('.service-sample-preview img').forEach((image) => {
    image.addEventListener('error', () => {
      image.classList.add('is-missing');
    });
  });

  function openSampleLightbox(card) {
    if (!sampleLightbox || !sampleLightboxTitle || !sampleLightboxImage || !sampleLightboxFallback) return;

    const title = card.getAttribute('data-sample-title') || 'Work Sample';
    const sampleSrc = card.getAttribute('data-sample-src') || '';

    sampleLightboxTitle.textContent = title;
    sampleLightboxFallback.textContent = '';
    sampleLightboxFallback.classList.remove('is-visible');
    sampleLightboxImage.classList.remove('is-missing');
    sampleLightboxImage.alt = title;
    sampleLightboxImage.src = sampleSrc;

    sampleLightboxImage.onerror = () => {
      sampleLightboxImage.classList.add('is-missing');
      sampleLightboxFallback.textContent = `No image found yet. Add your sample image here: ${sampleSrc}`;
      sampleLightboxFallback.classList.add('is-visible');
    };

    sampleLightbox.classList.add('is-open');
    sampleLightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('sample-lightbox-open');
    if (sampleLightboxClose) sampleLightboxClose.focus();
  }

  function closeSampleLightbox() {
    if (!sampleLightbox || !sampleLightboxImage || !sampleLightboxFallback) return;

    sampleLightbox.classList.remove('is-open');
    sampleLightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('sample-lightbox-open');
    sampleLightboxImage.removeAttribute('src');
    sampleLightboxFallback.classList.remove('is-visible');
  }

  sampleCards.forEach((card) => {
    card.addEventListener('click', () => openSampleLightbox(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openSampleLightbox(card);
      }
    });
  });

  if (sampleLightboxClose) {
    sampleLightboxClose.addEventListener('click', closeSampleLightbox);
  }

  if (sampleLightbox) {
    sampleLightbox.addEventListener('click', (event) => {
      if (event.target === sampleLightbox) {
        closeSampleLightbox();
      }
    });
  }

  if (sampleLightboxMedia) {
    sampleLightboxMedia.addEventListener('click', (event) => {
      if (event.target === sampleLightboxMedia) {
        closeSampleLightbox();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sampleLightbox && sampleLightbox.classList.contains('is-open')) {
      closeSampleLightbox();
    }
  });

});
