// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  })
);

// Theme toggle (remembers choice; falls back safely if storage is blocked)
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
function setTheme(t) {
  root.dataset.theme = t;
  themeBtn.textContent = t === 'dark' ? 'Light mode' : 'Dark mode';
  try { localStorage.setItem('theme', t); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
setTheme(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeBtn.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

// Skill filter
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const f = tab.dataset.filter;
    document.querySelectorAll('#chips li').forEach(li =>
      li.classList.toggle('hide', f !== 'all' && li.dataset.g !== f)
    );
  });
});

// Project details toggle
document.querySelectorAll('.more').forEach(btn => {
  btn.addEventListener('click', () => {
    const extra = btn.nextElementSibling;
    const open = extra.hidden;
    extra.hidden = !open;
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? 'Hide details' : 'Details';
  });
});

// Contact form: validate, then open the visitor's email app
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const name = fName.value.trim(), email = fEmail.value.trim(), msg = fMsg.value.trim();
  const out = document.getElementById('formMsg');
  if (!name || !msg) { out.textContent = 'Enter your name and a message.'; return; }
  if (!/^\S+@\S+\.\S+$/.test(email)) { out.textContent = 'Enter a valid email address.'; return; }
  out.textContent = '';
  const body = encodeURIComponent(`${msg}\n\nFrom: ${name} (${email})`);
  location.href = `mailto:sanjeetsingh28738@gmail.com?subject=${encodeURIComponent('Portfolio message from ' + name)}&body=${body}`;
});

// Terminal intro: types a few lines once (shown instantly if motion is reduced)
const typed = document.getElementById('typed');
const lines = [
  ['$ whoami', 'sanjeet-singh'],
  ['$ study --degree', 'B.Tech CSE, 3rd year'],
  ['$ study --focus', 'Cloud Computing with AI'],
  ['$ skills --languages', 'C, Java, Python'],
  ['$ open internship', 'looking for one']
];
const full = lines.map(l => l[0] + '\n' + l[1]).join('\n\n');
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  typed.textContent = full;
} else {
  let i = 0;
  (function type() {
    typed.textContent = full.slice(0, ++i) + '\u2588';
    if (i < full.length) setTimeout(type, 35);
    else typed.textContent = full;
  })();
}
