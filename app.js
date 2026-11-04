/* ===== Sana portfolio — 1440x900 slide deck, scaled to fit any screen ===== */
const W = 1440, H = 900, TOTAL = 14;
const IMG = 'images/';

/* ---- Project slides: edit text / image filenames here ---- */
const projects = {
  5: { cat:'UI/UX Design', title:'Pipetech Redesign (2026)', dash:700,
       slots:[{x:80,y:270,w:850,h:520,label:'add website screens',file:'pipetech-1.png'}],
       head:'Website redesign',
       desc:'Redesign of the Pipetech AI website: turning a technical, data-heavy engineering platform into clear, structured pages for desktop and mobile.',
       role:'UI/UX Designer', tools:'Figma' },
  6: { cat:'UI/UX Design', title:'PTeck P&ID PRO (2026)', dash:700,
       slots:[{x:80,y:270,w:850,h:520,label:'add product screens',file:'pteck-1.png'}],
       head:'Product UI',
       desc:'Interface screens for a P&ID platform: workspace setup, diagram editing and P&ID report views.',
       role:'UI/UX Designer', tools:'Figma' },
  7: { cat:'UI/UX Design', title:'Rashtragranth (2026)', dash:700,
       slots:[{x:80,y:270,w:410,h:520,label:'add desktop page',file:'rashtragranth-1.png'},
              {x:510,y:270,w:410,h:520,label:'add mobile page',file:'rashtragranth-2.png'}],
       head:'Event website',
       desc:'Website for a theatre show on the Constitution, made for schools and colleges. Desktop and mobile layouts with enquiry and FAQ flows.',
       role:'UI/UX Designer', tools:'Figma' },
  8: { cat:'Branding & Identity', title:'Shelterings (2026)', dash:700,
       slots:[{x:80,y:270,w:520,h:520,label:'logo story',file:'shelterings-1.png'},
              {x:640,y:270,w:240,h:520,label:'style sheet',file:'shelterings-2.png'}],
       head:'Logo & style sheet',
       desc:'Logo and brand identity for a property and hotel aggregator: an earth and two pin forms that make the letter S, backed by a style sheet of colour, type and components.',
       role:'Brand Designer', tools:'Figma' },
  9: { cat:'Branding & Identity', title:'Red Fibre (2025)', dash:700,
       slots:[{x:80,y:270,w:370,h:520,label:'design system',file:'redfibre-1.png'},
              {x:470,y:270,w:292,h:520,label:'guidelines cover',file:'redfibre-2.png'}],
       head:'Brand design system',
       desc:'Brand identity for a branding x deep tech company. The mark is a red dot drawing a black fibre, supported by a design system covering colour, type, icons, UI elements and social layouts.',
       role:'Designer', tools:'Figma' },
  10:{ cat:'Branding & Identity', title:'My Body Qode (2026)', dash:700,
       slots:[{x:80,y:270,w:350,h:520,label:'guidelines',file:'mbq-1.png'},
              {x:470,y:270,w:480,h:255,label:'style sheet',file:'mbq-2.png'}],
       head:'Brand guidelines',
       desc:'Brand guidelines for a health insights platform: a DNA-helix logo, a teal-to-magenta signature gradient, Manrope and Inter type, and a style sheet for buttons, inputs and cards.',
       role:'Brand Designer', tools:'Figma' },
  11:{ cat:'Graphic Design', title:'Sparksfly (2026)', dash:700,
       slots:[{x:80,y:270,w:410,h:520,label:'add poster',file:'sparksfly-1.png'},
              {x:510,y:270,w:410,h:520,label:'add poster variant',file:'sparksfly-2.png'}],
       head:'Review QR poster',
       desc:'A Google review QR poster for Sparks Fly Serviced Apartments, Juhu-Vashi: clean, on-brand and easy to scan.',
       role:'Graphic Designer', tools:'Figma' }
};
const posterSlides = {
  12:{ cat:'Graphic Design', title:'CSI-PCE Posters I (2025)',
       items:[['The Upside Down Interface','Online UI design competition','csi-upside-down.png'],
              ['HackCelestial 2.0','National-level hackathon','csi-hackcelestial.png'],
              ['Study Circle','Intro to Competitive Programming','csi-study-circle.png']] },
  13:{ cat:'Graphic Design', title:'CSI-PCE Posters II (2024–25)',
       items:[['Code and Contribute','Guest session on open source','csi-code-contribute.png'],
              ['Code Clash','Coding contest','csi-code-clash.png'],
              ['Coder of the Year',"Final showdown, Coder's Club",'csi-coder-of-the-year.png']] }
};

/* ---- helpers ---- */
const pad = n => String(n).padStart(2,'0');
const starSVG = (size, id) => {
  // 6-point star, vertex up/down (matches Figma star)
  const c = 50, R = 50, r = 26, pts = [];
  for (let i = 0; i < 12; i++) {
    const ang = (-90 + i * 30) * Math.PI / 180, rad = i % 2 ? r : R;
    pts.push((c + rad * Math.cos(ang)).toFixed(2) + ',' + (c + rad * Math.sin(ang)).toFixed(2));
  }
  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true"><polygon points="${pts.join(' ')}" fill="#d4537e" stroke="#d4537e" stroke-width="3" stroke-linejoin="round"/></svg>`;
};
const star = (x,y,size) => `<div class="star" style="left:${x}px;top:${y}px;width:${size}px;height:${size}px">${starSVG(size)}</div>`;
const nav = n => {
  const last = n === TOTAL;
  return `<div class="nav">
    <a data-go="prev">← prev</a>
    ${n === 4 ? '<span>contents</span>' : '<a data-go="contents">contents</a>'}
    <span>${pad(n)} / ${TOTAL}</span>
    ${last ? '<a data-go="start">start over ↺</a>' : '<a data-go="next">next →</a>'}
  </div>`;
};
const slot = s => `<div class="ph" style="left:${s.x}px;top:${s.y}px;width:${s.w}px;height:${s.h}px" data-file="${s.file}">${s.label}</div>`;

function discoBall() {
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const cx = 120, cy = 120, R = 120, rows = 15, th = (R * 2) / rows;
  const accents = ['#c25a84','#d9ad5c','#3f9c9c','#ffffff','#ffffff'];
  let tiles = '';
  for (let j = 0; j < rows; j++) {
    const y0 = j * th, ym = y0 + th / 2, half = Math.sqrt(Math.max(R * R - (ym - cy) ** 2, 1));
    const cols = Math.max(4, Math.round(half * 2 / 17)), tw = half * 2 / cols;
    const shade = 1 - j / rows;                       // top bright → bottom dark
    for (let i = 0; i < cols; i++) {
      const x0 = cx - half + i * tw;
      let g = Math.round(70 + 150 * shade * (0.8 + rnd() * 0.3)), fill = `rgb(${g},${g},${g + 6})`;
      if (rnd() < 0.13) fill = accents[Math.floor(rnd() * accents.length)];
      tiles += `<rect x="${x0.toFixed(1)}" y="${y0.toFixed(1)}" width="${(tw - 1.2).toFixed(1)}" height="${(th - 1.2).toFixed(1)}" fill="${fill}"/>`;
    }
  }
  return `<svg viewBox="0 0 240 240"><defs><clipPath id="bc"><circle cx="120" cy="120" r="120"/></clipPath>
    <radialGradient id="bs" cx=".38" cy=".3" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient></defs>
    <g clip-path="url(#bc)"><rect width="240" height="240" fill="#4a4a4e"/>${tiles}<rect width="240" height="240" fill="url(#bs)"/></g></svg>`;
}

/* ---- slide builders ---- */
function cover() {
  return `
  <p class="a muted" style="left:80px;top:72px;font-weight:500;font-size:22px;letter-spacing:-.44px">Graphic & UI/UX Design</p>
  <p class="a" style="left:1238px;top:60px;font-size:40px;letter-spacing:-1.2px">[2026]</p>
  <a data-go="next" class="a cover-title" style="left:68px;top:180px">PORTFOLIO</a>
  <p class="a ca" style="left:84px;top:430px;font-size:44px;transform:rotate(-3deg)">hello, I'm Sana!</p>
  <p class="a fr" style="left:80px;top:730px;font-size:68px;letter-spacing:-1.36px">Sanjana K.A.</p>
  <p class="a muted" style="right:80px;top:760px;font-weight:500;font-size:24px;line-height:1.3;text-align:right">Mumbai, India<br>2026</p>
  <a data-go="next" class="a sticker" style="left:788px;top:522px">UI/UX + GRAPHIC DESIGNER</a>
  ${star(1295,390,90)}
  <div class="hang"><div class="string"></div><div class="ball"><div class="glow"></div>${discoBall()}</div></div>`;
}
function about() {
  return `
  <div class="greet"><span>Hi, I'm</span><b>Sana!</b></div>
  <p class="a body22" style="left:120px;top:210px;width:520px;white-space:normal">Graphic and UI/UX designer with a Computer Engineering background. I design interfaces for AI-driven security and analytics platforms, turning technical, data-heavy requirements into clear, structured, friendly visuals.</p>
  <div class="a body22" style="left:120px;top:700px">
    <a class="link" href="mailto:ajithsanjana47@gmail.com">ajithsanjana47@gmail.com</a><br>
    <a class="link" href="tel:+918169000924">8169000924</a><br>Mumbai, Maharashtra</div>
  <div class="details">
    <div><h3>Skills:</h3><div class="body22">Wireframing<br>Prototyping<br>Responsive Design<br>Graphic & Brand Design<br>Event Design</div></div>
    <div><h3>Software:</h3><div class="body22">Figma<br>Photoshop<br>Illustrator<br>Canva</div></div>
    <div><h3><a data-go="3" class="link">Experience:</a></h3><div class="body22">May 2026 – Ongoing [Pipetech AI, UI/UX Designer]<br>Jul 2025 – Ongoing [CSI-PCE, Creatives Head]<br>Dec 2025 – May 2026 [Maharashtra Cyber, Intern]</div></div>
  </div>
  ${star(1290,740,60)}`;
}
function experience() {
  const rows = [
    [238,'May 2026 – Ongoing','Graphics & UI/UX Designer<br>Pipetech AI Technologies','Interface screens and user flows for AI-driven platform tools, turning technical, data-heavy requirements into clear, structured layouts.'],
    [408,'Dec 2025 – May 2026','Cybersecurity Intern<br>Maharashtra Cyber','Exposure to risk analysis, security operations and monitoring workflows, shaping a security-conscious approach to UX.'],
    [578,'Jul 2025 – Ongoing','Creatives Head<br>CSI-PCE','Lead the design team for events and branding, and mentor junior creatives. Joint Creatives Head, Aug 2024 – Jun 2025.']
  ];
  return `<p class="a t-head" style="left:80px;top:60px">Experience</p>
  ${[210,380,550,720].map(y => `<div class="dash" style="left:80px;top:${y}px;width:1280px"></div>`).join('')}
  ${rows.map(([y,d,r,t]) => `<p class="a exp-date" style="left:80px;top:${y}px">${d}</p>
    <p class="a exp-role" style="left:380px;top:${y}px">${r}</p>
    <p class="a exp-desc" style="left:880px;top:${y}px;white-space:normal">${t}</p>`).join('')}
  <p class="a exp-date" style="left:80px;top:748px">Education</p>
  <p class="a" style="left:380px;top:748px;font-weight:500;font-size:22px;letter-spacing:-.22px;line-height:1.4">B.Tech, Computer Engineering<br>Pillai College of Engineering<br>University of Mumbai</p>
  <p class="a exp-date" style="left:880px;top:748px;width:300px">[2022–2026]</p>
  ${star(1290,60,60)}`;
}
function contents() {
  return `<p class="a t-head" style="left:100px;top:330px">Contents:</p>
  <div class="sections"><a data-go="5">01. UI/UX Design</a><a data-go="8">02. Branding & Identity</a><a data-go="11">03. Graphic Design</a></div>
  <p class="a fr" style="left:100px;top:780px;font-size:40px;letter-spacing:-.4px">selected work [2024–2026]</p>
  ${star(1260,740,80)}`;
}
function project(p) {
  return `<p class="a cat" style="left:80px;top:56px">${p.cat}</p>
  <p class="a ptitle" style="left:80px;top:96px">${p.title}</p>
  <div class="dash" style="left:80px;top:215px;width:${p.dash}px"></div>
  ${p.slots.map(slot).join('')}
  <p class="a side-h" style="left:990px;top:270px">${p.head}</p>
  <p class="a side-p" style="left:990px;top:330px">${p.desc}</p>
  <p class="a meta" style="left:990px;top:700px">Role: ${p.role}<br>Tools: ${p.tools}</p>`;
}
function posters(p) {
  return `<p class="a cat" style="left:80px;top:56px">${p.cat}</p>
  <p class="a ptitle" style="left:80px;top:96px">${p.title}</p>
  <div class="dash" style="left:80px;top:215px;width:700px"></div>
  ${p.items.map(([t,s,f],i) => { const x = 80 + i * 424;
    return slot({x,y:250,w:376,h:470,label:'add poster',file:f}) +
      `<p class="a cap-t" style="left:${x}px;top:740px">${t}</p><p class="a cap-s" style="left:${x}px;top:778px">${s}</p>`; }).join('')}`;
}
function thanks() {
  return `<p class="a" style="left:1238px;top:60px;font-size:40px;letter-spacing:-1.2px">[2026]</p>
  <p class="a fr" style="left:80px;top:90px;font-size:56px;letter-spacing:-1.12px">Let's work together</p>
  <div class="a muted" style="left:80px;top:180px;font-size:24px;letter-spacing:-.24px;line-height:1.5">
    <a class="link" href="mailto:ajithsanjana47@gmail.com">ajithsanjana47@gmail.com</a><br>
    <a class="link" href="https://linkedin.com/in/sanjana-k-a-133571259" target="_blank" rel="noopener">linkedin.com/in/sanjana-k-a-133571259</a><br>
    <a class="link" href="https://github.com/sanjana-ka" target="_blank" rel="noopener">github.com/sanjana-ka</a></div>
  <p class="a cover-title" style="left:68px;top:560px">Thank you!</p>
  ${star(1190,330,150)}`;
}

/* ---- build ---- */
const stage = document.getElementById('stage');
const builders = {1:cover,2:about,3:experience,4:contents,14:thanks};
for (let n = 1; n <= TOTAL; n++) {
  const el = document.createElement('section');
  el.className = 'slide'; el.dataset.n = n;
  el.setAttribute('aria-label', 'Slide ' + n + ' of ' + TOTAL);
  let html = builders[n] ? builders[n]() : projects[n] ? project(projects[n]) : posters(posterSlides[n]);
  if (n !== 1) html += nav(n);
  el.innerHTML = html; stage.appendChild(el);
}

/* swap placeholders for real images when the file exists in /images */
document.querySelectorAll('.ph[data-file]').forEach(ph => {
  const img = new Image();
  img.onload = () => {
    img.className = 'shot'; img.alt = ph.textContent;
    img.style.cssText = `left:${ph.style.left};top:${ph.style.top};width:${ph.style.width};height:${ph.style.height}`;
    ph.replaceWith(img);
  };
  img.src = IMG + ph.dataset.file;
});

/* ---- navigation ---- */
let cur = 1;
const slides = [...document.querySelectorAll('.slide')];
function go(n, push = true) {
  n = Math.max(1, Math.min(TOTAL, n)); cur = n;
  slides.forEach((s, i) => s.classList.toggle('active', i + 1 === n));
  if (push) history.replaceState(null, '', '#/' + n);
  document.title = n === 1 ? 'Sanjana K.A. — Portfolio 2026' : `${n} / ${TOTAL} — Sanjana K.A.`;
}
document.addEventListener('click', e => {
  const lb = document.getElementById('lb');
  const shot = e.target.closest('.shot');
  if (shot) { lb.querySelector('img').src = shot.src; lb.classList.add('on'); return; }
  const t = e.target.closest('[data-go]'); if (!t) return;
  const v = t.dataset.go;
  go(v === 'prev' ? cur - 1 : v === 'next' ? cur + 1 : v === 'contents' ? 4 : v === 'start' ? 1 : +v);
});
const lb = document.createElement('div'); lb.id = 'lb'; lb.innerHTML = '<img alt="">';
lb.onclick = () => lb.classList.remove('on'); document.body.appendChild(lb);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') lb.classList.remove('on');
  else if (['ArrowRight','PageDown',' '].includes(e.key)) { e.preventDefault(); go(cur + 1); }
  else if (['ArrowLeft','PageUp'].includes(e.key)) go(cur - 1);
  else if (e.key === 'Home') go(1); else if (e.key === 'End') go(TOTAL);
});
let sx = null;
document.addEventListener('touchstart', e => sx = e.touches[0].clientX, {passive:true});
document.addEventListener('touchend', e => {
  if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; sx = null;
  if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1));
});
window.addEventListener('hashchange', () => go(parseInt(location.hash.replace('#/','')) || 1, false));

/* ---- scale 1440x900 stage to fit the window ---- */
function fit() {
  const s = Math.min(innerWidth / W, innerHeight / H);
  stage.style.transform = `translate(-50%,-50%) scale(${s})`;
}
addEventListener('resize', fit); fit();
go(parseInt(location.hash.replace('#/','')) || 1, false);
