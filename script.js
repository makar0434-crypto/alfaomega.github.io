
const menu=document.querySelector('.menu-toggle'), links=document.querySelector('.navlinks');
if(menu&&links) menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
const current=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.navlinks a').forEach(a=>{if(a.getAttribute('href')===current)a.classList.add('active');});
const curtain=document.querySelector('.transition');
document.querySelectorAll('a[href]').forEach(a=>{
 const href=a.getAttribute('href');
 if(!href||href.startsWith('#')||href.startsWith('http')||href.startsWith('mailto:')||href.startsWith('tel:')||a.target==='_blank'||a.hasAttribute('download'))return;
 a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();if(curtain){curtain.classList.remove('play');void curtain.offsetWidth;curtain.classList.add('play');setTimeout(()=>location.href=href,380)}else location.href=href;});
});
document.querySelectorAll('[data-faq]').forEach(item=>{const q=item.querySelector('.faq-q');q?.addEventListener('click',()=>{const open=item.classList.toggle('open');q.setAttribute('aria-expanded',String(open));const sign=q.querySelector('[data-sign]');if(sign)sign.textContent=open?'−':'+';});});
const search=document.querySelector('#faq-search');
if(search)search.addEventListener('input',()=>{const term=search.value.toLowerCase().trim();document.querySelectorAll('[data-faq]').forEach(item=>{item.hidden=!item.textContent.toLowerCase().includes(term)});});
const form=document.querySelector('#lead-form');
if(form)form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`Здравствуйте! Хочу обсудить сотрудничество с AlfaOmega.%0AИмя: ${encodeURIComponent(d.get('name'))}%0AВозраст: ${encodeURIComponent(d.get('age')||'не указан')}%0AФормат: ${encodeURIComponent(d.get('format'))}%0AОпыт/вопрос: ${encodeURIComponent(d.get('message')||'не указан')}`;window.open(`https://t.me/holinmoder?text=${msg}`,'_blank','noopener');});


// Subtle lime glow follows the mouse across the background on desktop.
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let moveFrame = null;
  document.addEventListener('mousemove', (event) => {
    if (moveFrame) cancelAnimationFrame(moveFrame);
    moveFrame = requestAnimationFrame(() => {
      document.body.style.setProperty('--mouse-x', `${event.clientX}px`);
      document.body.style.setProperty('--mouse-y', `${event.clientY}px`);
      document.body.classList.add('cursor-active');
      moveFrame = null;
    });
  }, { passive: true });
  document.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
}


// Icons gently tilt toward the cursor, with a stronger response near their edges.
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const tiltTargets = document.querySelectorAll('.logo, .orbit-core, .orbit-dot, .arrow, .bigmark, .partner-wordmark, .stepno, .card .num');
  tiltTargets.forEach((el) => {
    el.classList.add('tilt-icon');
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 24;
      const rotateX = (0.5 - y) * 24;
      el.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
    }, { passive: true });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
    });
  });
}
