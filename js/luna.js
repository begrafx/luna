/**
 * Luna Theme v0.1.8
 */
/**
 * @file
 * luna.js
 * Luna Theme — Drupal behaviour for dark/light mode toggle,
 * Halfmoon core theme switcher, Bootstrap component initialisation,
 * and accessibility enhancements.
 */

(function (Drupal, drupalSettings, once) {
  'use strict';

  // ─── Constants ────────────────────────────────────────────
  const STORAGE_KEY_MODE  = 'luna-color-mode';
  const STORAGE_KEY_CORE  = 'luna-halfmoon-core';
  const VALID_CORES       = ['default', 'modern', 'elegant'];
  const MOON_ICON         = '🌙';
  const SUN_ICON          = '☀️';

  // ─── Helpers ──────────────────────────────────────────────

  // Drupal's preprocess_html sets attributes on <body> (not <html>).
  // All dark-mode reads/writes must target the same element so the
  // server-rendered value and the JS toggle stay in sync.
  var THEME_ROOT = document.body;

  function getStoredMode() {
    try { return localStorage.getItem(STORAGE_KEY_MODE); } catch (e) { return null; }
  }

  function storeMode(mode) {
    try { localStorage.setItem(STORAGE_KEY_MODE, mode); } catch (e) {}
  }

  function getStoredCore() {
    try { return localStorage.getItem(STORAGE_KEY_CORE); } catch (e) { return null; }
  }

  function storeCore(core) {
    try { localStorage.setItem(STORAGE_KEY_CORE, core); } catch (e) {}
  }

  function applyMode(mode) {
    // ONLY set on <body>. Drupal's PHP renders data-bs-theme on <body>
    // (via $variables['attributes'] in preprocess_html), so <body> is the
    // authoritative element. Setting it on <html> as well causes a conflict
    // because <body> is closer to all content and wins the CSS cascade.
    var val = mode === 'dark' ? 'dark' : 'light';
    document.body.setAttribute('data-bs-theme', val);

    // Update icon in all toggle buttons
    document.querySelectorAll('.luna-toggle-icon').forEach(function (el) {
      el.textContent = mode === 'dark' ? SUN_ICON : MOON_ICON;
    });
    document.querySelectorAll('.luna-dark-toggle').forEach(function (btn) {
      btn.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
      btn.title = mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    });
  }

  function applyCore(core) {
    document.body.setAttribute('data-bs-core', core);
    document.querySelectorAll('[data-luna-core-option]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lunaCore === core);
    });
  }

  // ─── Behaviour: Dark mode toggle ──────────────────────────

  Drupal.behaviors.lunaDarkMode = {
    attach: function (context) {
      // Restore persisted preference on first attach
      if (context === document) {
        var stored = getStoredMode();
        if (stored) {
          applyMode(stored);
        } else {
          // Honour prefers-color-scheme if no saved pref
          var prefersDark = window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;
          var serverDefault = (drupalSettings.luna && drupalSettings.luna.colorMode) || 'light';
          applyMode(prefersDark ? 'dark' : serverDefault);
        }
      }

      once('luna-dark-toggle', '.luna-dark-toggle', context).forEach(function (btn) {
        btn.addEventListener('click', function () {
          // Read from body — that is where Drupal sets the attribute server-side.
          var current = document.body.getAttribute('data-bs-theme');
          var next    = current === 'dark' ? 'light' : 'dark';
          applyMode(next);
          storeMode(next);
        });
      });
    }
  };

  // ─── Behaviour: Halfmoon core theme switcher ──────────────

  Drupal.behaviors.lunaThemeSwitcher = {
    attach: function (context) {
      // Restore core on load
      if (context === document) {
        var storedCore = getStoredCore();
        if (storedCore && VALID_CORES.includes(storedCore)) {
          applyCore(storedCore);
        }
      }

      once('luna-core-switch', '[data-luna-core]', context).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var core = btn.dataset.lunaCore;
          if (VALID_CORES.includes(core)) {
            applyCore(core);
            storeCore(core);
          }
        });
      });
    }
  };

  // ─── Behaviour: Toast notifications ───────────────────────

  Drupal.behaviors.lunaToasts = {
    attach: function (context) {
      once('luna-toast', '[data-bs-toast-auto]', context).forEach(function (toastEl) {
        if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
          var toast = new bootstrap.Toast(toastEl, {
            delay: parseInt(toastEl.dataset.delay || '5000', 10),
            autohide: true
          });
          toast.show();
        }
      });
    }
  };

  // ─── Behaviour: Tooltip initialisation ────────────────────

  Drupal.behaviors.lunaTooltips = {
    attach: function (context) {
      once('luna-tooltip', '[data-bs-toggle="tooltip"]', context).forEach(function (el) {
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
          new bootstrap.Tooltip(el, {
            boundary: 'window',
            trigger: 'hover focus'
          });
        }
      });
    }
  };

  // ─── Behaviour: Popover initialisation ────────────────────

  Drupal.behaviors.lunaPopovers = {
    attach: function (context) {
      once('luna-popover', '[data-bs-toggle="popover"]', context).forEach(function (el) {
        if (typeof bootstrap !== 'undefined' && bootstrap.Popover) {
          new bootstrap.Popover(el);
        }
      });
    }
  };

  // ─── Behaviour: Scrollspy nav highlighting ────────────────

  Drupal.behaviors.lunaScrollspy = {
    attach: function (context) {
      once('luna-scrollspy', '[data-bs-spy="scroll"]', context).forEach(function (el) {
        if (typeof bootstrap !== 'undefined' && bootstrap.ScrollSpy) {
          new bootstrap.ScrollSpy(el, {
            target: el.dataset.bsTarget,
            rootMargin: '-20% 0px -60%',
            smoothScroll: true
          });
        }
      });
    }
  };

  // ─── Behaviour: Sticky navbar shadow on scroll ────────────

  Drupal.behaviors.lunaNavbarScroll = {
    attach: function (context) {
      once('luna-navbar-scroll', '.luna-navbar', context).forEach(function (navbar) {
        var handler = function () {
          if (window.scrollY > 10) {
            navbar.classList.add('shadow-sm');
          } else {
            navbar.classList.remove('shadow-sm');
          }
        };
        window.addEventListener('scroll', handler, { passive: true });
        handler(); // Run once on attach
      });
    }
  };

  // ─── Behaviour: Animated progress bars ────────────────────

  Drupal.behaviors.lunaProgressBars = {
    attach: function (context) {
      once('luna-progress', '.progress-bar[data-value]', context).forEach(function (bar) {
        var target = parseInt(bar.dataset.value, 10);
        bar.style.width = '0%';
        // Animate when in viewport
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              bar.style.transition = 'width .8s ease';
              bar.style.width = target + '%';
              bar.setAttribute('aria-valuenow', target);
              observer.unobserve(bar);
            }
          });
        }, { threshold: 0.2 });
        observer.observe(bar);
      });
    }
  };

  // ─── Behaviour: Smooth scroll for in-page anchors ─────────

  Drupal.behaviors.lunaSmoothScroll = {
    attach: function (context) {
      once('luna-smooth', 'a[href^="#"]:not([data-bs-toggle])', context).forEach(function (link) {
        link.addEventListener('click', function (e) {
          var href   = link.getAttribute('href');
          if (href === '#') return;
          var target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            var navH = document.querySelector('.luna-navbar') ?
              document.querySelector('.luna-navbar').offsetHeight : 0;
            var top  = target.getBoundingClientRect().top + window.scrollY - navH - 20;
            window.scrollTo({ top: top, behavior: 'smooth' });
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
          }
        });
      });
    }
  };

  // ─── Behaviour: Dismissible alert persistence ─────────────

  Drupal.behaviors.lunaAlerts = {
    attach: function (context) {
      once('luna-alert-dismiss', '.alert-dismissible[data-persist-key]', context)
        .forEach(function (alertEl) {
          var key = 'luna-dismissed-' + alertEl.dataset.persistKey;
          try {
            if (localStorage.getItem(key)) {
              alertEl.remove();
              return;
            }
          } catch (e) {}
          alertEl.addEventListener('closed.bs.alert', function () {
            try { localStorage.setItem(key, '1'); } catch (e) {}
          });
        });
    }
  };

  // ─── Behaviour: Carousel auto-play on viewport entry ──────

  Drupal.behaviors.lunaCarousel = {
    attach: function (context) {
      once('luna-carousel', '.carousel[data-luna-autoplay]', context).forEach(function (el) {
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
              var c = bootstrap.Carousel.getOrCreateInstance(el);
              if (entry.isIntersecting) { c.cycle(); }
              else                      { c.pause(); }
            }
          });
        }, { threshold: 0.5 });
        obs.observe(el);
      });
    }
  };

}(Drupal, drupalSettings, once));
