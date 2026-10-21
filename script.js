(() => {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const navLinks = [...document.querySelectorAll('.primary-nav a')];

  // Mobile navigation
  const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');

    nav?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const opening =
      menuButton.getAttribute('aria-expanded') !== 'true';

    menuButton.setAttribute('aria-expanded', String(opening));

    menuButton.setAttribute(
      'aria-label',
      opening ? 'Close navigation' : 'Open navigation'
    );

    nav?.classList.toggle('is-open', opening);
    document.body.classList.toggle('menu-open', opening);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });

  // Reveal elements when they enter the viewport
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    revealItems.forEach(item => {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(item => {
      item.classList.add('is-visible');
    });
  }

  // Pointer-reactive hero graphic
  const heroArt = document.querySelector('.hero-art');

  if (
    heroArt &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !reducedMotion
  ) {
    heroArt.addEventListener('pointermove', event => {
      const rect = heroArt.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      heroArt.style.setProperty('--mx', `${x}%`);
      heroArt.style.setProperty('--my', `${y}%`);

      heroArt.querySelectorAll('.orbit').forEach((orbit, index) => {
        const factor = (index + 1) * 0.7;

        orbit.style.translate =
          `${((x - 50) / 12) * factor}px ` +
          `${((y - 50) / 12) * factor}px`;
      });
    });

    heroArt.addEventListener('pointerleave', () => {
      heroArt.style.setProperty('--mx', '50%');
      heroArt.style.setProperty('--my', '50%');

      heroArt.querySelectorAll('.orbit').forEach(orbit => {
        orbit.style.translate = '0 0';
      });
    });
  }

  // Technology tabs
  const tabs = [...document.querySelectorAll('.tool-tab')];

  const activateTab = tab => {
    tabs.forEach(item => {
      const active = item === tab;

      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;

      const panel = document.getElementById(
        item.getAttribute('aria-controls')
      );

      if (panel) {
        panel.hidden = !active;
        panel.classList.toggle('is-active', active);
      }
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      activateTab(tab);
    });

    tab.addEventListener('keydown', event => {
      if (
        !['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)
      ) {
        return;
      }

      event.preventDefault();

      let nextIndex = index;

      if (event.key === 'ArrowRight') {
        nextIndex = (index + 1) % tabs.length;
      }

      if (event.key === 'ArrowLeft') {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      }

      if (event.key === 'Home') {
        nextIndex = 0;
      }

      if (event.key === 'End') {
        nextIndex = tabs.length - 1;
      }

      activateTab(tabs[nextIndex]);
      tabs[nextIndex].focus();
    });
  });

  // Highlight the current section in the navigation
  const sections = [
    ...document.querySelectorAll('main section[id]')
  ];

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            return;
          }

          navLinks.forEach(link => {
            const active =
              link.getAttribute('href') === `#${entry.target.id}`;

            link.classList.toggle('is-current', active);

            if (active) {
              link.setAttribute('aria-current', 'location');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        });
      },
      {
        rootMargin: '-35% 0px -55% 0px'
      }
    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  // Automatically update the copyright year
  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();

