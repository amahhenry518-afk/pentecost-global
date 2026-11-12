const root=document.documentElement;
const ACCENTS={gold:'#d4a24c',blue:'#3b82f6',green:'#1fa36a',red:'#e5484d',purple:'#8b5cf6',orange:'#f97316'};
const store={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
const defaultMode=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
function applyTheme(mode,accent){
  root.dataset.mode=mode;root.dataset.accent=accent;
  store.set('mode',mode);store.set('accent',accent);
  document.querySelectorAll('[data-m]').forEach(b=>b.classList.toggle('on',b.dataset.m===mode));
  document.querySelectorAll('[data-a]').forEach(b=>b.classList.toggle('on',b.dataset.a===accent));
}
const panel=document.getElementById('themePanel');
panel.innerHTML='<h4>Mode</h4><div class="modes"><button data-m="light">Light</button><button data-m="dark">Dark</button></div><h4>Color</h4><div class="swatches">'+
Object.entries(ACCENTS).map(([n,c])=>`<button data-a="${n}" style="background:${c}" aria-label="${n}"></button>`).join('')+'</div>';
panel.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  applyTheme(b.dataset.m||root.dataset.mode,b.dataset.a||root.dataset.accent);
});
document.getElementById('themeBtn').onclick=()=>{panel.hidden=!panel.hidden};
document.addEventListener('click',e=>{if(!e.target.closest('#themePanel,#themeBtn'))panel.hidden=true});
const nav=document.getElementById('nav');
document.getElementById('menuBtn').onclick=()=>nav.classList.toggle('open');
nav.addEventListener('click',()=>nav.classList.remove('open'));
applyTheme(store.get('mode')||defaultMode,store.get('accent')||root.dataset.accent||'gold');
document.getElementById('year').textContent=new Date().getFullYear();

/* ===== EDIT THESE ===== */
const PHONE='2349069739190';
const PRODUCTS=[
 ['iPhone','iPhone 15 and 14 series','Phones'],
 ['iPhone Pro','Pro and Pro Max models','Phones'],
 ['Samsung Galaxy S','Galaxy S series','Phones'],
 ['Samsung Galaxy A','Affordable Galaxy A series','Phones'],
 ['Fast chargers','Original and certified chargers','Accessories'],
 ['Phone cases','Cases and screen protectors','Accessories'],
 ['Earbuds and power banks','Earbuds, cables and power banks','Accessories']
];
/* ====================== */
const wa=t=>`https://wa.me/${PHONE}${t?'?text='+encodeURIComponent(t):''}`;
const cats=['All',...new Set(PRODUCTS.map(p=>p[2]))];
const filters=document.getElementById('filters'),items=document.getElementById('items');
function show(cat){
  filters.innerHTML=cats.map(c=>`<button class="${c===cat?'on':''}" data-c="${c}">${c}</button>`).join('');
  items.innerHTML=PRODUCTS.filter(p=>cat==='All'||p[2]===cat).map(p=>`<article class="card"><span class="tag">${p[2]}</span><h3>${p[0]}</h3><p>${p[1]}</p><p class="price">Ask for price</p><a class="btn" target="_blank" rel="noopener" href="${wa('Hello Pentecost Global, I am interested in: '+p[0])}">Ask on WhatsApp</a></article>`).join('');
}
filters.addEventListener('click',e=>{const b=e.target.closest('button');if(b)show(b.dataset.c)});
show('All');
['waBtn','waFloat'].forEach(id=>document.getElementById(id).href=wa('Hello Pentecost Global, I need help with a phone.'));
document.getElementById('callBtn').href='tel:+'+PHONE;
