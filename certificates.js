(function () {
  const cards = Array.from(document.querySelectorAll('.certificate__item'));
  const modal = document.getElementById('cert-modal');
  if (!modal || !cards.length) return;

  const titleEl = document.getElementById('cert-modal-title');
  const counterEl = document.getElementById('cert-modal-counter');
  const iframe = document.getElementById('cert-modal-iframe');
  const openLink = document.getElementById('cert-modal-open');
  const mobileBtn = document.getElementById('cert-modal-mobile');
  const closeBtn = document.getElementById('cert-modal-close');
  const backdrop = document.getElementById('cert-modal-backdrop');
  const prevBtn = document.getElementById('cert-modal-prev');
  const nextBtn = document.getElementById('cert-modal-next');

  let idx = 0;
  let lastFocus = null;
  const isMobile = () => window.matchMedia('(max-width: 767px)').matches || window.matchMedia('(pointer: coarse)').matches;

  function render() {
    const card = cards[idx];
    const url = card.dataset.url;
    const t = card.querySelector('.certificate__title').textContent;
    titleEl.textContent = t;
    counterEl.textContent = (idx + 1) + ' / ' + cards.length;
    modal.setAttribute('aria-label', t);
    const enc = encodeURI(url);
    if (isMobile()) {
      if (iframe) { iframe.style.display = 'none'; iframe.src = ''; }
      if (mobileBtn) { mobileBtn.style.display = 'inline-flex'; mobileBtn.href = enc; }
    } else {
      if (mobileBtn) mobileBtn.style.display = 'none';
      if (iframe) { iframe.style.display = 'block'; iframe.src = enc; iframe.title = t; }
    }
    if (openLink) openLink.href = enc;
  }

  function open(i) {
    idx = i;
    lastFocus = document.activeElement;
    render();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    (closeBtn || modal).focus();
  }
  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (iframe) iframe.src = '';
    if (lastFocus) lastFocus.focus();
  }
  function prev() { idx = (idx - 1 + cards.length) % cards.length; render(); }
  function next() { idx = (idx + 1) % cards.length; render(); }

  cards.forEach((c, i) => {
    c.addEventListener('click', (e) => {
      if (e.target.closest('.certificate__link')) return;
      open(i);
    });
    const link = c.querySelector('.certificate__link');
    if (link) link.addEventListener('click', (e) => { e.stopPropagation(); open(i); });
  });

  closeBtn && closeBtn.addEventListener('click', close);
  backdrop && backdrop.addEventListener('click', close);
  prevBtn && prevBtn.addEventListener('click', prev);
  nextBtn && nextBtn.addEventListener('click', next);

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
  });

  // focus trap
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = modal.querySelectorAll('button, a, iframe, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // swipe (mobile only)
  let sx = 0;
  modal.addEventListener('touchstart', (e) => { if (!isMobile()) return; sx = e.touches[0].clientX; }, { passive: true });
  modal.addEventListener('touchend', (e) => {
    if (!isMobile()) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) { dx > 0 ? prev() : next(); }
  }, { passive: true });
})();