document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
  const menu = btn.nextElementSibling;
  btn.addEventListener('click', () => menu.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!btn.parentElement.contains(e.target)) menu.classList.remove('open');
  });
});

const body = document.body;
const drawer = document.querySelector('[data-drawer]');
const openBtn = document.querySelector('[data-open-drawer]');
const closeBtn = document.querySelector('[data-close-drawer]');
let lastFocus = null;

function trapFocus(e) {
  if (!drawer.classList.contains('open') || e.key !== 'Tab') return;
  const focusables = drawer.querySelectorAll('a,button');
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  }
  if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function openDrawer() {
  lastFocus = document.activeElement;
  drawer.classList.add('open');
  body.style.overflow = 'hidden';
  drawer.querySelector('button, a').focus();
}
function closeDrawer() {
  drawer.classList.remove('open');
  body.style.overflow = '';
  if (lastFocus) lastFocus.focus();
}

if (openBtn && drawer) {
  openBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  drawer.addEventListener('click', (e) => {
    if (e.target.matches('[data-close-drawer], .drawer-backdrop')) closeDrawer();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
    }
    trapFocus(e);
  });
}

document.querySelectorAll('.faq-item').forEach((item) => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    document.querySelectorAll('.faq-item').forEach((x) => x.classList.remove('open'));
    item.classList.add('open');
  });
});

const modal = document.querySelector('#privacy-modal');
const modalOpen = document.querySelectorAll('[data-open-privacy]');
const modalClose = document.querySelectorAll('[data-close-privacy]');
let lastModalFocus = null;

function openModal() {
  lastModalFocus = document.activeElement;
  modal.classList.add('open');
  body.style.overflow = 'hidden';
  modal.querySelector('.modal-close-x').focus();
}
function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  body.style.overflow = '';
  if (lastModalFocus) lastModalFocus.focus();
}
modalOpen.forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));
modalClose.forEach((b) => b.addEventListener('click', closeModal));
if (modal) {
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
