(() => {
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

$('#projects').innerHTML = PROJECTS.map(p => `
<article class="proj${p.solo?' solo':''} reveal" data-href="project.html?p=${p.slug}" tabindex="0" role="link" aria-label="Open ${esc(p.name)} case study">
  <div class="info">
    <div class="top"><span>${p.n}</span><span class="status ${p.live?'live':'dev'}">${p.live?'Live':'In development'}</span></div>
    <h3>${esc(p.name)}</h3>
    <div class="kicker">${esc(p.kicker)}</div>
    <p class="desc">${esc(p.desc)}</p>
    <div class="role"><small>MY ROLE</small><strong>${esc(p.role)}</strong><ul>${p.bullets.map(b=>`<li>${esc(b)}</li>`).join('')}</ul></div>
    <div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
    <div class="cta"><a class="btn btn-navy magnetic" href="project.html?p=${p.slug}">View case study →</a>${p.live?`<a class="btn btn-ghost magnetic" href="${p.url}" target="_blank" rel="noopener">Live site ↗</a>`:''}</div>
  </div>
  <div class="art">${p.shots.slice(0,p.solo?1:4).map((s,i)=>`<div class="shot s${i+1}" data-parallax="${(i%2?-1:1)*(0.03+i*0.01)}"><div class="bar"><i></i><i></i><i></i></div><div class="img" data-img="${s[0]}" data-label="${esc(s[1])}"></div></div>`).join('')}</div>
</article>`).join('');
fillImages();

$$('.proj').forEach(c => {
  c.addEventListener('click', e => { if (!e.target.closest('a')) location.href = c.dataset.href; });
  c.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target === c) location.href = c.dataset.href; });
});

const sw = [['Coral','#CB6A6A','#fff'],['Blush','#EBB0A7'],['Sage','#BCD5C7'],['Teal','#3F8C9B','#fff'],['Navy','#1E2C54','#fff'],['Cream','#FBF4EE']];
$('#swatches').innerHTML = sw.map(([n,h,c]) => `<button class="sw" data-hex="${h}" style="background:${h};color:${c||'#1E2C54'}"><b>${n}</b><span>${h}</span></button>`).join('');
$$('.sw').forEach(b => b.onclick = () => copyText(b.dataset.hex));
$('#copy').onclick = () => copyText('ajithsanjana47@gmail.com');

const h1 = $('#h1');
h1.innerHTML = h1.textContent.split(' ').map((w,i)=>`<span class="w"><span style="animation-delay:${.08*i+.1}s">${w}</span></span>`).join(' ');
$('.split-c')?.classList.add('reveal');
observeReveal();

const pars = $$('[data-speed]'), ppars = $$('[data-parallax]');
const secs = ['work','about','toolkit','path'].map(id => $('#'+id)), links = $$('.links a');
scrollHooks.push(y => {
  if (y < innerHeight) pars.forEach(el => el.style.transform = `translateY(${y*el.dataset.speed*-3}px)`);
  ppars.forEach(el => { const r = el.getBoundingClientRect(); if (r.bottom>0 && r.top<innerHeight) el.style.setProperty('translate', `0 ${(r.top-innerHeight/2)*el.dataset.parallax}px`); });
  secs.forEach((s,i) => { const r = s.getBoundingClientRect(); links[i].classList.toggle('active', r.top<innerHeight*.4 && r.bottom>innerHeight*.4); });
});
})();
