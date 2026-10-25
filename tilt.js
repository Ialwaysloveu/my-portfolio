(function () {
  const cards = '.expertise__card, .education__item, .works__item, .certificate__item';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  function onMove(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - y) * 12; // max ~6deg
    const ry = (x - 0.5) * 12;
    card.style.setProperty('--rx', rx + 'deg');
    card.style.setProperty('--ry', ry + 'deg');
    card.style.setProperty('--mx', (x * 100) + '%');
    card.style.setProperty('--my', (y * 100) + '%');
  }
  function onLeave(card) {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  }

  document.addEventListener('mouseover', (e) => {
    const card = e.target.closest(cards);
    if (!card) return;
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', () => {
      onLeave(card);
      card.removeEventListener('mousemove', onMove);
    }, { once: true });
  });
})();