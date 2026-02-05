document.addEventListener('DOMContentLoaded', () => {
  // --- Переключение фото front/back по клику ---
  document.querySelectorAll('.toggle-img').forEach(el => {
    const raw = el.dataset.images || '';
    const images = raw.split(',').map(s => s.trim()).filter(Boolean);
    if (!images.length) return;

    let index = 0;
    el.style.backgroundImage = `url(${images[index]})`;

    el.addEventListener('click', () => {
      index = (index + 1) % images.length;
      el.style.backgroundImage = `url(${images[index]})`;
    });
  });

  // --- Фильтр каталога ---
  const tabs = Array.from(document.querySelectorAll('.tab[data-filter]'));
  const cards = Array.from(document.querySelectorAll('#products .product[data-category]'));

  if (!tabs.length || !cards.length) return;

  const norm = (v) => String(v || '').trim().toLowerCase();

  function applyFilter(filterValue) {
    const filter = norm(filterValue) || 'all';

    tabs.forEach(tab => {
      tab.classList.toggle('active', norm(tab.dataset.filter) === filter);
    });

    cards.forEach(card => {
      const category = norm(card.dataset.category);
      const show = filter === 'all' || category === filter;
      card.classList.toggle('is-hidden', !show);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      // если это <a>, чтобы не прыгал вверх
      e.preventDefault?.();
      applyFilter(tab.dataset.filter);
    });
  });

  // старт: активный таб или "all"
  const active = tabs.find(t => t.classList.contains('active'));
  applyFilter(active ? active.dataset.filter : 'all');
});
