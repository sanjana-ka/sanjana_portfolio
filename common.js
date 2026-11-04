(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
window.$ = $; window.$$ = $$;
window.esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');

/* image slots: real export if present (png/jpg), else labelled placeholder */
window.fillImages = (root = document) => $$('.img[data-img]', root).forEach(box => {
  box.textContent = box.dataset.label;
  const load = ext => new Promise((ok, no) => { const im = new Image(); im.alt = box.dataset.label; im.onload = () => ok(im); im.onerror = no; im.src = `assets/${box.dataset.img}.${ext}`; });
  load('jpg').catch(() => load('png')).catch(() => load('webp')).then(im => { box.textContent = ''; box.appendChild(im); box.dataset.ok = 1; if (im.naturalHeight > im.naturalWidth * 1.1) { box.closest('.shot')?.classList.add('portrait'); box.closest('figure')?.classList.add('portrait-fig'); } }).catch(() => {});
});

window.toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(window._tt); window._tt = setTimeout(() => t.classList.remove('show'), 1800); };
window.copyText = t => (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast('Copied ' + t)).catch(() => toast(t));

/* reveal */
window.observeReveal = () => {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); if (e.target.querySelector('[data-count]')) count(e.target); } }), { threshold: .12 });
  $$('.reveal:not(.in)').forEach(el => io.observe(el));
};
function count(root){ $$('[data-count]',root).forEach(el=>{ const to=+el.dataset.count, plus=el.dataset.plus?'+':''; let t0; const f=t=>{ t0=t0||t; const k=Math.min((t-t0)/1200,1); el.textContent=Math.round(to*(1-Math.pow(1-k,3)))+(k===1?plus:''); if(k<1) requestAnimationFrame(f); }; requestAnimationFrame(f); }); }

/* scroll */
const bar = $('#progress'), nav = $('#nav'); let ticking = false;
window.scrollHooks = [];
function onScroll(){ const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (h>0 ? y/h*100 : 0) + '%'; nav.classList.toggle('stuck', y > 30);
  if (!reduce) scrollHooks.forEach(f => f(y)); ticking = false; }
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
window.addEventListener('load', onScroll);

/* cursor / magnetic / tilt (delegated, so dynamic content works) */
const cur = $('#cursor');
if (matchMedia('(hover:hover)').matches && !reduce) {
  let cx=0, cy=0, tx=0, ty=0, lastM=null, lastT=null;
  addEventListener('mousemove', e => { tx=e.clientX; ty=e.clientY; cur.classList.add('on'); });
  (function loop(){ cx+=(tx-cx)*.2; cy+=(ty-cy)*.2; cur.style.left=cx+'px'; cur.style.top=cy+'px'; requestAnimationFrame(loop); })();
  document.addEventListener('mouseover', e => cur.classList.toggle('big', !!e.target.closest('a,button,.shot,.sw,.proj')));
  document.addEventListener('mousemove', e => {
    const m = e.target.closest('.magnetic');
    if (lastM && lastM !== m) lastM.style.transform = '';
    if (m) { const r=m.getBoundingClientRect(); m.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`; }
    lastM = m;
    const t = e.target.closest('.tilt:not(.shot)');
    if (lastT && lastT !== t) lastT.style.transform = '';
    if (t) { const r=t.getBoundingClientRect(); const px=(e.clientX-r.left)/r.width-.5, py=(e.clientY-r.top)/r.height-.5; t.style.transform=`perspective(900px) rotateX(${-py*5}deg) rotateY(${px*6}deg) translateY(-4px)`; }
    lastT = t;
  });
}

/* mobile menu */
const bg = $('#burger'), ln = $('#links');
bg.onclick = () => { const o = ln.classList.toggle('open'); bg.setAttribute('aria-expanded', o); };
ln.addEventListener('click', () => { ln.classList.remove('open'); bg.setAttribute('aria-expanded', false); });
})();
