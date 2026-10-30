(function () {
  const cards = Array.from(document.querySelectorAll('.certificate__item'));
  const modal = document.getElementById('cert-modal');
  if (!modal) return;

  const titleEl = document.getElementById('cert-modal-title');
  const counterEl = document.getElementById('cert-modal-counter');
  const iframe = document.getElementById('cert-modal-iframe');
  const openLink = document.getElementById('cert-modal-open');
  const mobileBtn = document.getElementById('cert-modal-mobile');
  const closeBtn = document.getElementById('cert-modal-close');
  const backdrop = document.getElementById('cert-modal-backdrop');
  const prevBtn = document.getElementById('cert-modal-prev');
  const nextBtn = document.getElementById('cert-modal-next');
  const downloadLink = document.getElementById('cert-modal-download');

  let idx = 0;
  let lastFocus = null;
  let mode = 'cert';
  let resumeUrl = '';
  const isMobile = () => window.matchMedia('(max-width: 767px)').matches || window.matchMedia('(pointer: coarse)').matches;

  function currentTitle() { return mode === 'resume' ? 'Resume' : cards[idx].querySelector('.certificate__title').textContent; }
  function currentUrl() { return mode === 'resume' ? resumeUrl : cards[idx].dataset.url; }

  function render() {
    const t = currentTitle();
    const url = currentUrl();
    titleEl.textContent = t;
    if (counterEl) counterEl.style.display = mode === 'resume' ? 'none' : '';
    if (prevBtn) prevBtn.style.display = mode === 'resume' ? 'none' : '';
    if (nextBtn) nextBtn.style.display = mode === 'resume' ? 'none' : '';
    if (downloadLink) { downloadLink.style.display = mode === 'resume' ? 'inline-block' : 'none'; downloadLink.href = encodeURI(url); downloadLink.setAttribute('download', ''); }
    if (openLink) openLink.href = encodeURI(url);
    modal.setAttribute('aria-label', t);
    const enc = encodeURI(url);
    if (isMobile()) {
      if (iframe) { iframe.style.display = 'none'; iframe.src = ''; }
      if (mobileBtn) { mobileBtn.style.display = 'inline-flex'; mobileBtn.href = enc; }
    } else {
      if (mobileBtn) mobileBtn.style.display = 'none';
      if (iframe) { iframe.style.display = 'block'; iframe.src = enc; iframe.title = t; }
    }
  }

  function open(i) {
    mode = 'cert';
    idx = i;
    lastFocus = document.activeElement;
    render();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    (closeBtn || modal).focus();
  }
  function openResume(url) {
    mode = 'resume';
    resumeUrl = url;
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
  function prev() { if (mode === 'resume') return; idx = (idx - 1 + cards.length) % cards.length; render(); }
  function next() { if (mode === 'resume') return; idx = (idx + 1) % cards.length; render(); }

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

  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = modal.querySelectorAll('button, a, iframe, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  let sx = 0;
  modal.addEventListener('touchstart', (e) => { if (isMobile()) sx = e.touches[0].clientX; }, { passive: true });
  modal.addEventListener('touchend', (e) => {
    if (!isMobile()) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) { dx > 0 ? prev() : next(); }
  }, { passive: true });

  window.openResume = openResume;
})();