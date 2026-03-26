(function () {
    'use strict';

    // ---- BOOKING URL (assembled at runtime to avoid plain-text in HTML) ----
    // Reversed: "https://cal.com/jonathan.jenin/discovery"
    var calUrl = 'yrevocsid/ninej.nahtanoj/moc.lac//:sptth'.split('').reverse().join('');
    document.querySelectorAll('.js-cal').forEach(function (el) {
        el.href = calUrl;
    });

    // ---- NAV SCROLL SHADOW ----
    var navEl = document.getElementById('nav');
    window.addEventListener('scroll', function () {
        navEl.classList.toggle('scrolled', window.scrollY > 10);
    });

    // ---- MOBILE MENU TOGGLE ----
    var menuBtn = document.querySelector('.mobile-menu-btn');
    var navLinks = document.querySelector('.nav-links');
    menuBtn.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close mobile menu on any nav link click
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Open menu');
        });
    });

    // ---- FADE-IN ON SCROLL ----
    if (typeof IntersectionObserver !== 'undefined') {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.fade-in').forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show all elements immediately if IntersectionObserver is unavailable
        document.querySelectorAll('.fade-in').forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // ---- TESTIMONIALS TOGGLE ----
    var toggleBtn = document.getElementById('toggleBtn');
    var moreTestimonials = document.getElementById('moreTestimonials');
    toggleBtn.addEventListener('click', function () {
        var isOpen = moreTestimonials.classList.toggle('open');
        toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        toggleBtn.innerHTML = isOpen
            ? 'Show fewer testimonials &#8593;'
            : 'Show all 16 testimonials &#8595;';
    });

    // ---- FAQ ACCORDION ----
    document.querySelectorAll('.faq-question').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = btn.parentElement;
            var wasOpen = item.classList.contains('open');
            // Close all
            document.querySelectorAll('.faq-item').forEach(function (i) {
                i.classList.remove('open');
                i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            // Open clicked if it was closed
            if (!wasOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ---- STICKY MOBILE CTA ----
    (function () {
        var sticky = document.getElementById('stickyMobile');
        var hero = document.querySelector('.hero');
        function checkSticky() {
            if (window.innerWidth <= 768) {
                var heroEnd = hero.offsetTop + hero.offsetHeight;
                sticky.style.display = window.scrollY > heroEnd ? 'block' : 'none';
            } else {
                sticky.style.display = 'none';
            }
        }
        window.addEventListener('scroll', checkSticky, { passive: true });
        window.addEventListener('resize', checkSticky, { passive: true });
        checkSticky();
    })();

    // ---- LIBRARY DRAWER ----
    var libraryDrawer = document.getElementById('library-drawer');
    var libraryBtn = document.getElementById('libraryFooterBtn');
    var libraryClose = document.getElementById('libraryClose');
    function openLibrary() {
        libraryDrawer.classList.add('open');
        requestAnimationFrame(function () {
            libraryDrawer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    libraryBtn.addEventListener('click', function (e) { e.preventDefault(); openLibrary(); });
    libraryClose.addEventListener('click', function () {
        libraryDrawer.classList.remove('open');
        document.querySelector('footer').scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
    // ---- DYNAMIC COPYRIGHT YEAR ----
    var yearEl = document.getElementById('copyright-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
