(() => {
const slug = new URLSearchParams(location.search).get('p');
const i = PROJECTS.findIndex(p => p.slug === slug);
const root = $('#case');
if (i < 0) { root.innerHTML = `<div class="wrap nf"><h1>Project not found</h1><p><a class="btn btn-navy" href="index.html#work">← Back to work</a></p></div>`; return; }
const p = Object.assign({}, PROJECTS[i], (window.CASE||{})[PROJECTS[i].slug]||{}), next = PROJECTS[(i+1)%PROJECTS.length], prev = PROJECTS[(i+PROJECTS.length-1)%PROJECTS.length];
document.title = `${p.name} — Sanjana K.A.`;
root.innerHTML = `
<section class="c-hero"><div class="wrap">
  <a class="back" href="index.html#work">← All work</a>
  <div class="top"><span>${p.n} / 0${PROJECTS.length}</span><span class="status ${p.live?'live':'dev'}">${p.live?'Live':'In development'}</span></div>
  <h1 class="split-c reveal">${esc(p.name)}</h1>
  <div class="kicker reveal">${esc(p.kicker)}</div>
  <p class="lead reveal">${esc(p.desc)}</p>
  ${p.live?`<div class="cta reveal"><a class="btn btn-navy magnetic" href="${p.url}" target="_blank" rel="noopener">Visit live site ↗</a></div>`:''}
</div></section>

<section class="c-cover"><div class="wrap"><div class="cover shot reveal" data-lb><div class="bar"><i></i><i></i><i></i></div><div class="img" data-img="${p.shots[0][0]}" data-label="${esc(p.shots[0][1])}"></div></div></div></section>

<section class="c-body"><div class="wrap two">
  <div class="left"><span class="pill pill-blush reveal">OVERVIEW</span><h2 class="reveal">${esc(p.overview)}</h2></div>
  <div class="right">
    <div class="role reveal"><small>MY ROLE</small><strong>${esc(p.role)}</strong><ul>${p.bullets.map(b=>`<li>${esc(b)}</li>`).join('')}</ul></div>
    <div class="tags reveal">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
  </div>
</div></section>


<section class="c-about"><div class="wrap two">
  <div class="left"><span class="pill pill-teal reveal">ABOUT THE PROJECT</span>${(p.about||[]).map(t=>`<p class="reveal">${esc(t)}</p>`).join('')}</div>
  <div class="facts">${(p.facts||[]).map(f=>`<div class="card reveal tilt"><h4>${esc(f[0]).toUpperCase()}</h4><p>${esc(f[1])}</p></div>`).join('')}</div>
</div></section>

<section class="c-process"><div class="wrap">
  <span class="pill pill-blush reveal">MY PROCESS · UI/UX DESIGNER</span>
  <h2 class="reveal">How I got from brief to screens.</h2>
  <ol class="steps">${(p.process||[]).map((s,k)=>`<li class="step reveal"><span class="num">${String(k+1).padStart(2,'0')}</span><div><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></div></li>`).join('')}</ol>
</div></section>

<section class="c-details"><div class="wrap"><div class="dgrid">${p.details.map(d=>`<div class="card reveal tilt"><h4>${esc(d[0]).toUpperCase()}</h4><p>${esc(d[1])}</p></div>`).join('')}</div></div></section>

<section class="c-gallery"><div class="wrap">
  <span class="pill pill-sage reveal">SCREENS</span>
  <div class="gal">${p.shots.map(s=>`<figure class="reveal"><div class="shot" data-lb><div class="bar"><i></i><i></i><i></i></div><div class="img" data-img="${s[0]}" data-label="${esc(s[1])}"></div></div><figcaption>${esc(s[1])}</figcaption></figure>`).join('')}</div>
</div></section>

<section class="c-next"><div class="wrap">
  <a class="np" href="project.html?p=${prev.slug}"><small>← PREVIOUS</small><b>${esc(prev.name)}</b></a>
  <a class="np r" href="project.html?p=${next.slug}"><small>NEXT →</small><b>${esc(next.name)}</b></a>
</div></section>`;
fillImages(); observeReveal();

const lb = $('#lightbox'), lbi = $('img', lb), lbp = $('p', lb);
document.addEventListener('click', e => {
  const s = e.target.closest('[data-lb]'); const im = s && $('.img[data-ok] img', s);
  if (im) { lbi.src = im.src; lbp.textContent = im.alt; lb.classList.add('open'); } else lb.classList.remove('open');
});
addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });
})();
