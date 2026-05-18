/* ─── SCROLL RESET ─── */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0,0);
window.addEventListener('beforeunload', ()=> window.scrollTo(0,0));

/* ─── CURSOR ─── */
const cursor=document.getElementById('cursor'),cursorRing=document.getElementById('cursor-ring');
let mx=-100,my=-100,rx=-100,ry=-100;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 900;
if(isTouchDevice){
  document.body.style.cursor='auto';
  cursor.style.display='none';
  cursorRing.style.display='none';
} else {
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  (function animCursor(){
    rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
    cursor.style.left=mx+'px'; cursor.style.top=my+'px';
    cursorRing.style.left=rx+'px'; cursorRing.style.top=ry+'px';
    requestAnimationFrame(animCursor);
  })();
  document.querySelectorAll('a,button,.menu-tab,.card,.burger-item,.combo-card,.price-pill').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cursor.style.width='20px';cursor.style.height='20px';cursorRing.style.width='52px';cursorRing.style.height='52px';cursorRing.style.opacity='1';});
    el.addEventListener('mouseleave',()=>{cursor.style.width='12px';cursor.style.height='12px';cursorRing.style.width='36px';cursorRing.style.height='36px';cursorRing.style.opacity='.5';});
  });
}

/* ─── SPLASH ─── */
(function(){
  const splash=document.getElementById('splash'),pct=document.getElementById('pct');
  let p=0;
  const iv=setInterval(()=>{
    p=Math.min(p+Math.random()*3+1,100);
    pct.textContent=Math.floor(p)+'%';
    if(p>=100){
      clearInterval(iv);
      setTimeout(()=>{
        splash.classList.add('exit');
        splash.addEventListener('animationend',()=>splash.remove(),{once:true});
      },520);
    }
  },80);
})();

/* ─── PARTICLES ─── */
(function(){
  const canvas=document.getElementById('particles-canvas'),ctx=canvas.getContext('2d');
  let W,H;
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize(); window.addEventListener('resize',resize);
  const pts=Array.from({length:70},()=>({
    x:Math.random()*window.innerWidth, y:Math.random()*window.innerHeight,
    vx:(Math.random()-.5)*.35, vy:(Math.random()-.5)*.35,
    r:Math.random()*1.4+.4, a:Math.random()*.5+.15
  }));
  function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0;
      if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(233,196,0,${p.a})`; ctx.fill();
    });
    pts.forEach((a,i)=>pts.slice(i+1).forEach(b=>{
      const d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<120){
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
        ctx.strokeStyle=`rgba(233,196,0,${.08*(1-d/120)})`; ctx.lineWidth=.5; ctx.stroke();
      }
    }));
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ─── NAV SCROLL ─── */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>60));

/* ─── MOBILE NAV ─── */
document.getElementById('ham-btn').addEventListener('click',()=>document.getElementById('mobile-nav').classList.add('open'));
document.getElementById('close-nav').addEventListener('click',()=>document.getElementById('mobile-nav').classList.remove('open'));
function closeMobileNav(){document.getElementById('mobile-nav').classList.remove('open');}

/* ─── TICKER ─── */
(function(){
  const track=document.getElementById('ticker');
  if(track){
    const items=['🍇 Açaí Trufado','🍔 X Tudo Maloka','🥟 Pastel de Carne Seca',
      '🥃 Combo Black Label','⭐ Pastel Especial','🔥 Hambúrguer de Picanha 90g',
      '💛 Point dos Malokas','🏆 Açaí Gigante 1L','🎯 Rua Esperantinópolis 346'];
    track.innerHTML=[...items,...items].map(it=>`<div class="ticker-item">${it}<div class="ticker-dot"></div></div>`).join('');
  }
})();

/* ─── MENU TABS ─── */
document.querySelectorAll('.menu-tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.menu-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.menu-panel').forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    const panel=document.getElementById('tab-'+tab.dataset.tab);
    if(panel){
      panel.classList.add('active');
      panel.querySelectorAll('.reveal').forEach(el=>{
        el.classList.remove('visible');
        setTimeout(()=>el.classList.add('visible'),80);
      });
    }
  });
});

/* ─── SCROLL REVEAL ─── */
(function(){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();

/* ─── COUNTER ANIMATION ─── */
(function(){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      const el=e.target,target=parseInt(el.dataset.target);
      let cur=0; const step=target/60;
      const iv=setInterval(()=>{
        cur=Math.min(cur+step,target);
        el.textContent=Math.floor(cur);
        if(cur>=target)clearInterval(iv);
      },24);
      io.unobserve(el);
    });
  },{threshold:0.5});
  document.querySelectorAll('.stat-num[data-target]').forEach(el=>io.observe(el));
})();

/* ─── BOTTOM NAV ACTIVE ─── */
(function(){
  const links=document.querySelectorAll('#bottom-nav a');
  const sections=['hero','cardapio','combos','social','local'];
  window.addEventListener('scroll',()=>{
    let current='';
    sections.forEach(id=>{const s=document.getElementById(id);if(s&&window.scrollY>=s.offsetTop-200)current=id;});
    links.forEach(a=>{
      const href=(a.getAttribute('href')||'').replace('#','');
      a.classList.toggle('active',href===current&&!a.href.includes('instagram'));
    });
  });
})();

/* ─── SMOOTH ANCHOR ─── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
  });
});
