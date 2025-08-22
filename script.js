// ------------------------------
// Mr.Look Photography — Scripts
// ------------------------------

// Mobile nav toggle
const nav = document.getElementById('nav');
const burger = document.querySelector('.hamburger');
burger?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
  burger.classList.toggle('active', open);
});

// Smooth scroll & close mobile nav
document.querySelectorAll('.nav a, .scroll-down').forEach(a => {
  a.addEventListener('click', e => {
    if (a.hash) {
      e.preventDefault();
      document.querySelector(a.hash)?.scrollIntoView({ behavior: 'smooth' });
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
});

// Scroll progress bar
const bar = document.querySelector('.progress-bar');
const updateBar = () => {
  const scroll = window.scrollY;
  const height = document.body.scrollHeight - innerHeight;
  const p = Math.min(1, scroll / height);
  bar.style.transform = `scaleX(${p})`;
};
addEventListener('scroll', updateBar, { passive: true }); updateBar();

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) e.target.classList.add('in');
  }
}, { threshold: .2 });
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// Lightbox for gallery
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('.lightbox-img');
const lbCap = lightbox.querySelector('.lightbox-cap');
let lbIndex = 0;
const cards = [...document.querySelectorAll('.masonry .card-img')];

function openLightbox(i){
  lbIndex = i;
  const img = cards[i].querySelector('img');
  const cap = cards[i].querySelector('figcaption');
  lbImg.src = img.src;
  lbImg.alt = img.alt || 'Preview';
  lbCap.textContent = cap?.textContent || '';
  lightbox.classList.add('open');
}
function closeLightbox(){ lightbox.classList.remove('open'); }
function nextLightbox(n){
  lbIndex = (lbIndex + n + cards.length) % cards.length;
  openLightbox(lbIndex);
}
cards.forEach((c, i) => c.addEventListener('click', () => openLightbox(i)));
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => nextLightbox(-1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => nextLightbox(1));
addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });


// Testimonials: gentle auto scroll
const row = document.getElementById('testiRow');
let raf; 
function autoScroll(){
  row.scrollLeft += 0.3;
  if (row.scrollLeft + row.clientWidth >= row.scrollWidth - 1) row.scrollLeft = 0;
  raf = requestAnimationFrame(autoScroll);
}
if (row) { autoScroll(); row.addEventListener('mouseenter', ()=>cancelAnimationFrame(raf)); row.addEventListener('mouseleave', ()=>autoScroll()); }

// Booking form
const form = document.getElementById('bookForm');
const toast = document.getElementById('toast');

// Remember contact fields
['name','email','phone'].forEach(key => {
  const el = form.querySelector(`[name="${key}"]`);
  el.value = localStorage.getItem('mrlook_'+key) || '';
  el.addEventListener('input', () => localStorage.setItem('mrlook_'+key, el.value));
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;

  // Build payload
  const data = Object.fromEntries(new FormData(form).entries());
  console.log('Booking request', data);

  // Example fetch (uncomment & set your API)
  // await fetch('https://your-backend/booking', {
  //   method:'POST',
  //   headers:{ 'Content-Type':'application/json' },
  //   body: JSON.stringify(data)
  // });

  toast.textContent = 'Request sent! We’ll confirm availability shortly.';
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'), 3500);
  form.reset();
});



// Open reel modal
const modal = document.getElementById('reelModal');
document.getElementById('openReel')?.addEventListener('click', ()=> modal.showModal());
modal?.querySelector('.reel-close')?.addEventListener('click', ()=> modal.close());

// Back-to-top button
const toTop = document.createElement('button');
toTop.id = 'toTop';
toTop.innerHTML = '↑';
document.body.appendChild(toTop);
addEventListener('scroll', () => {
  toTop.classList.toggle('show', scrollY > 700);
}, { passive:true });
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior:'smooth' }));

// Year
  document.getElementById('year').textContent = new Date().getFullYear();
