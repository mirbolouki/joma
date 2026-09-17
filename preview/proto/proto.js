/* ==========================================================================
   نمونهٔ زندهٔ جوما — پوستهٔ برنامه
   این فایل «کد نهایی محصول» نیست. ابزار تأیید بصری است.
   ========================================================================== */

/* ---------- نقشهٔ کامل صفحه‌ها ---------- */
var SCREENS = [
  {n:1,  id:'landing', name:'لندینگ',            sec:'۱۰',     batch:1},
  {n:2,  id:'login',   name:'ورود',              sec:'۲۲ §۲',  batch:1, bare:1},
  {n:3,  id:'signup',  name:'ثبت‌نام',           sec:'۲۲ §۳',  batch:1, bare:1},
  {n:4,  id:'home',    name:'خانهٔ من',          sec:'۱۱',     batch:1, app:1, nav:'home'},
  {n:5,  id:'today',   name:'کارهای امروز',      sec:'۱۲',     batch:1, app:1, nav:'today'},
  {n:6,  id:'mood',    name:'حال من',            sec:'۱۳',     batch:1, app:1, nav:'mood'},
  {n:7,  id:'chick',   name:'جوجهٔ من',          sec:'۱۴',     batch:2, app:1, nav:'chick'},
  {n:8,  id:'book',    name:'دفترچهٔ جوما',      sec:'۱۵',     batch:2, app:1, nav:'book'},
  {n:9,  id:'reports', name:'گزارش‌ها',          sec:'۱۶',     batch:2, app:1, nav:'reports'},
  {n:10, id:'plan',    name:'برنامهٔ من',        sec:'۱۸',     batch:2, app:1, nav:'plan'},
  {n:11, id:'library', name:'کتابخانه',          sec:'۱۷',     batch:2, app:1, nav:'library'},
  {n:12, id:'edu',     name:'آموزش',             sec:'۱۹',     batch:2, app:1, nav:'edu'},
  {n:13, id:'hammasir',name:'هم‌مسیر',           sec:'۲۰',     batch:3, app:1, nav:'hammasir'},
  {n:14, id:'settings',name:'تنظیمات',           sec:'۲۱',     batch:3, app:1, nav:'settings'},
  {n:15, id:'roles',   name:'نقش‌ها و سوییچ',    sec:'۲۴',     batch:3, app:1},
  {n:16, id:'admin',   name:'کنسول مدیر',        sec:'۲۳',     batch:3, app:1},
  {n:17, id:'content', name:'صفحه‌های محتوایی',  sec:'۲۵',     batch:3},
  {n:18, id:'rights',  name:'حقوق داده',         sec:'۲۶',     batch:3, app:1, nav:'settings'}
];

/* ---------- وضعیت برنامهٔ نمونه ---------- */
var APP = {
  screen:'landing',
  data:'full',      /* full | empty — کلید بالای نوار بازبینی */
  theme:'classic',  /* classic | glass */
  role:'client',    /* client | counselor | admin */
  sound:false,
  moodStep:0,
  moodAnswers:{},
  water:0
};

/* ---------- کمک‌کننده‌ها ---------- */
var FA='۰۱۲۳۴۵۶۷۸۹';
function fa(n){return String(n).replace(/[0-9]/g,function(d){return FA[+d];});}
function owl(name,size,cls){
  return '<svg class="owl '+(cls||'')+'" width="'+size+'" height="'+size+
    '" viewBox="0 0 120 120" aria-hidden="true"><use href="#'+name+'"/></svg>';
}
function ic(name,cls,size){
  return '<svg class="ic '+(cls||'')+'"'+(size?' style="width:'+size+'px;height:'+size+'px"':'')+
    ' aria-hidden="true"><use href="#'+name+'"/></svg>';
}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');}
function empty(){return APP.data==='empty';}
function D(full,emp){return empty()?emp:full;}

/* ---------- توست و مودال ---------- */
var _toastT=null;
function toast(txt,mood){
  var t=document.getElementById('toast');
  t.innerHTML='<div class="t show">'+owl(mood||'owl-cheer',26)+'<span>'+txt+'</span></div>';
  clearTimeout(_toastT);
  _toastT=setTimeout(function(){var e=t.querySelector('.t');if(e)e.classList.remove('show');},2600);
}
function modal(html){
  var m=document.getElementById('modal');
  m.innerHTML='<div class="sheet">'+html+'</div>';
  m.classList.add('show');
}
function closeModal(){var m=document.getElementById('modal');m.classList.remove('show');m.innerHTML='';}
function go(id){ location.hash='#'+id; }

/* ---------- ناوبری ---------- */
var NAV_MAIN=[
  {id:'home',   ic:'i-compass', t:'خانه',          cnt:0},
  {id:'today',  ic:'i-checkc',  t:'کارهای امروز',  cnt:3},
  {id:'mood',   ic:'i-heart',   t:'حال من',        cnt:0},
  {id:'chick',  ic:'i-list',    t:'جوجهٔ من',      cnt:0},
  {id:'book',   ic:'i-book',    t:'دفترچهٔ جوما',  cnt:0, noti:2},
  {id:'reports',ic:'i-chart',   t:'گزارش‌ها',      cnt:0}
];
var NAV_MORE=[
  {id:'plan',    ic:'i-target', t:'برنامهٔ من', cnt:0},
  {id:'library', ic:'i-list',   t:'کتابخانه',   cnt:0},
  {id:'edu',     ic:'i-grad',   t:'آموزش',      cnt:0},
  {id:'hammasir',ic:'i-users',  t:'هم‌مسیر',    cnt:0},
  {id:'settings',ic:'i-gear',   t:'تنظیمات',    cnt:0}
];
function navLink(it,cur){
  if(it.batch && it.batch>1) return '';
  var on=(cur===it.id)?' on':'';
  var c=it.cnt?'<span class="cnt">'+fa(it.cnt)+'</span>':'';
  var n=it.noti?'<span class="cnt" style="background:var(--gold)">'+fa(it.noti)+'</span>':'';
  return '<a href="#'+it.id+'" class="'+on.trim()+'">'+ic(it.ic)+'<span>'+it.t+'</span>'+c+n+'</a>';
}
function side(cur){
  return '<aside class="side desk-only">'+
    '<div class="logo"><span class="logo-tile">'+owl('owl-hi',30)+'</span>'+
      '<span><b>جوما</b><small>برنامه. اجرا. فهم.</small></span></div>'+
    '<div class="dura"><small>دورهٔ فعال</small><b><span>شهریور ۱۴۰۵</span>'+
      '<span class="chip g">فعال</span></b></div>'+
    '<div class="lvl"><div class="row"><span class="em">🌿</span>'+
      '<span><b>سطح ۳ — جوانه</b><small class="tiny">'+fa(120)+' از '+fa(200)+' امتیاز تا سطح ۴</small></span>'+
      '</div><div class="bar"><i style="width:60%"></i></div></div>'+
    '<div class="slabel">مسیر من</div><nav class="nav">'+
      NAV_MAIN.map(function(i){return navLink(i,cur);}).join('')+'</nav>'+
    '<div class="slabel">بیشتر</div><nav class="nav">'+
      NAV_MORE.map(function(i){return navLink(i,cur);}).join('')+'</nav>'+
    '<div class="sprof desk-only"><span class="av">س</span><span><b>سارا محمدی</b><small>پروفایل</small></span>'+
      ic('i-chev-l','chev')+'</div>'+
  '</aside>';
}
function tabbar(cur){
  var items=[NAV_MAIN[0],NAV_MAIN[1],NAV_MAIN[2],NAV_MAIN[5]];
  return '<nav class="tabbar">'+items.map(function(i){
    return '<a href="#'+i.id+'" class="'+(cur===i.id?'on':'')+'">'+ic(i.ic)+'<span>'+i.t+'</span>'+
      (i.cnt?'<span class="cnt">'+fa(i.cnt)+'</span>':'')+'</a>';
  }).join('')+'</nav>';
}
function head(kicker,h1,sub,chip){
  return '<div class="pagehead"><div><div class="kicker">'+kicker+'</div><h1>'+h1+'</h1>'+
    (sub?'<div class="sub">'+sub+'</div>':'')+'</div>'+
    (chip||'<span class="datechip">'+ic('i-cal')+'جمعه ۲۷ شهریور ۱۴۰۵</span>')+'</div>';
}

/* ---------- نوار بازبینی ---------- */
function rvbar(){
  var s=SCREENS.filter(function(x){return x.id===APP.screen;})[0]||SCREENS[0];
  var dots=SCREENS.map(function(x){
    return '<i class="'+(x.id===APP.screen?'on':'')+(x.batch>1?' soon':'')+'" '+
      'title="'+x.name+' ('+x.sec+')" data-go="'+x.id+'">'+x.n+'</i>';
  }).join('');
  return '<div class="rvbar" id="rvbar">'+
    '<span class="rv-name">صفحهٔ '+fa(s.n)+' — '+s.name+'</span>'+
    '<span class="rv-sec">سند: '+s.sec+'</span>'+
    '<span class="dots" id="rvdots">'+dots+'</span>'+
    '<span class="sp"></span>'+
    '<button data-prev>‹ قبلی</button><button data-next>بعدی ›</button>'+
    '<button data-tgl="data" class="'+(APP.data==='full'?'on':'')+'">دادهٔ '+(APP.data==='full'?'پر':'خالی')+'</button>'+
    '<button data-tgl="theme" class="'+(APP.theme==='glass'?'on':'')+'">تم '+(APP.theme==='classic'?'کلاسیک':'شیشه')+'</button>'+
    '<button data-tglnote class="'+(APP.notes!==false?'on':'')+'">یادداشت‌های سند</button>'+
    '<button data-hidebar>پنهان کن — حالت کاربر واقعی</button>'+
  '</div><button class="rv-open" id="rvopen">⚙ بازبینی</button>';
}

/* ---------- اسکلت ---------- */
function render(){
  var s=SCREENS.filter(function(x){return x.id===APP.screen;})[0]||SCREENS[0];
  var theme=(APP.theme==='glass')?'glass':'classic';
  document.documentElement.setAttribute('data-theme',theme);

  var body;
  if(s.batch>1){ body=soon(s); }
  else { body=(window['R_'+s.id]||function(){return soon(s);})(); }

  var app=document.getElementById('app');
  if(s.bare){ app.innerHTML=body; }
  else if(s.app){ app.innerHTML='<div class="wrap">'+side(s.nav)+
      '<main class="main fadeup">'+body+'</main></div>'+tabbar(s.nav); }
  else { app.innerHTML=body; }

  var bar=document.getElementById('shellbar');
  bar.innerHTML=rvbar();
  renderWater();
}
function soon(s){
  return '<div class="main fadeup" style="max-width:640px;margin:0 auto;padding-top:40px">'+
    '<div class="card" style="text-align:center;padding:34px">'+
      owl('owl-think',70,'floaty')+
      '<h2 style="font-size:18px;margin-top:14px">صفحهٔ '+fa(s.n)+' — '+s.name+'</h2>'+
      '<p class="tiny" style="margin-top:6px">این صفحه در <b>دستهٔ '+fa(s.batch)+'</b> ساخته می‌شود (بخش '+s.sec+' سند).</p>'+
      '<p class="tiny" style="margin-top:10px;line-height:2">دستهٔ ۱ (صفحه‌های ۱ تا ۶) آماده است — همین حالا قابل نگاه‌کردن و تأیید است.</p>'+
      '<div style="margin-top:16px"><a class="btn soft" href="#landing">رفتن به دستهٔ ۱</a></div>'+
    '</div></div>';
}

/* ---------- لیوان آب (مشترک: خانه و کارهای امروز) ----------
   صدا: صدای واقعی آب — جریان + حباب + قطره. سند ۱۲ §۷.۳.            */
var WN=8,_wfill=0,_lastSnd=0,_AC=null,_MASTER=null;

function ac(){
  if(!_AC){var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;
    _AC=new C();_MASTER=_AC.createGain();_MASTER.gain.value=.9;_MASTER.connect(_AC.destination);}
  return _AC;
}
function noiseBuf(dur,c){
  var n=Math.floor(c.sampleRate*dur),b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);
  for(var i=0;i<n;i++) d[i]=Math.random()*2-1;
  return b;
}
/* جریان آب: نویز فیلترشده با موج‌دار شدن نامنظم (حباب‌ها) */
function pourLayer(c,t0,dur){
  var src=c.createBufferSource(); src.buffer=noiseBuf(.6,c); src.loop=true;
  var lp=c.createBiquadFilter(); lp.type='lowpass'; lp.Q.value=.8;
  lp.frequency.setValueAtTime(2800,t0);
  lp.frequency.exponentialRampToValueAtTime(850,t0+dur*.8);
  var hp=c.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=320;

  var g=c.createGain();
  g.gain.setValueAtTime(.0001,t0);
  g.gain.exponentialRampToValueAtTime(.15,t0+.05);
  g.gain.setValueAtTime(.15,t0+dur*.5);
  g.gain.exponentialRampToValueAtTime(.0001,t0+dur);

  /* حباب‌ها: مدولاسیون دامنه با فرکانس نامنظم */
  var lfo=c.createOscillator(); lfo.type='triangle'; lfo.frequency.value=11.5;
  var lg=c.createGain(); lg.gain.value=.055;
  lfo.connect(lg); lg.connect(g.gain);
  var lfo2=c.createOscillator(); lfo2.type='sine'; lfo2.frequency.value=6.7;
  var lg2=c.createGain(); lg2.gain.value=.03;
  lfo2.connect(lg2); lg2.connect(g.gain);

  src.connect(hp); hp.connect(lp); lp.connect(g); g.connect(_MASTER);
  src.start(t0); src.stop(t0+dur);
  lfo.start(t0); lfo.stop(t0+dur);
  lfo2.start(t0); lfo2.stop(t0+dur);
}
/* حباب: سینِ کوتاه با سُرخوردن رو به بالا */
function bubble(c,t){
  var f0=260+Math.random()*260, o=c.createOscillator(); o.type='sine';
  o.frequency.setValueAtTime(f0,t);
  o.frequency.exponentialRampToValueAtTime(f0*2.6+180,t+.07);
  var g=c.createGain();
  g.gain.setValueAtTime(.0001,t);
  g.gain.exponentialRampToValueAtTime(.05,t+.01);
  g.gain.exponentialRampToValueAtTime(.0001,t+.11);
  o.connect(g); g.connect(_MASTER); o.start(t); o.stop(t+.13);
}
/* قطره: سینِ با پرش سریع رو به بالا — صدای آشنای چکیدن */
function drop(c,t,base){
  var o=c.createOscillator(); o.type='sine';
  o.frequency.setValueAtTime(base,t);
  o.frequency.exponentialRampToValueAtTime(base*2.5,t+.06);
  var g=c.createGain();
  g.gain.setValueAtTime(.0001,t);
  g.gain.exponentialRampToValueAtTime(.16,t+.006);
  g.gain.exponentialRampToValueAtTime(.0001,t+.26);
  o.connect(g); g.connect(_MASTER); o.start(t); o.stop(t+.3);
}
function pourSnd(){
  if(!APP.sound||document.hidden) return;
  var now=performance.now(); if(now-_lastSnd<250) return; _lastSnd=now;
  var c=ac(); if(!c) return; var t0=c.currentTime+.01;
  pourLayer(c,t0,.48);
  for(var i=0;i<4;i++) bubble(c,t0+.05+i*.1+Math.random()*.04);
}
/* کامل شدن: سه قطرهٔ بالارونده — صدای آب، نه زنگ فلزی */
function completeSnd(){
  if(!APP.sound||document.hidden) return;
  var c=ac(); if(!c) return; var t0=c.currentTime+.01;
  drop(c,t0,520); drop(c,t0+.14,700); drop(c,t0+.30,960);
  bubble(c,t0+.46);
}
function waterCard(){
  return '<div class="card wbox" id="wcard">'+
    '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">'+
      '<h3>'+ic('i-drop')+'آب امروز</h3>'+
      '<button class="wsnd '+(APP.sound?'on':'')+'" data-snd aria-pressed="'+(APP.sound?'true':'false')+'">'+
        (APP.sound?'🔊 صدای آب روشن':'🔇 صدای آب خاموش')+'</button></div>'+
    '<div class="wcount num" id="wcount"></div>'+
    '<div class="wglasses" id="wglasses" role="group" aria-label="لیوان‌های آب امروز"></div>'+
    '<p class="tiny" style="margin-top:10px">روی لیوان‌ها بزن — سطح آب با <b>موج دو‌لایه</b> بالا می‌آید. '+
      'صدا پیش‌فرض خاموش است؛ بازگشت صدا ندارد.</p>'+
  '</div>';
}
var WAVE_PATH='<path d="M0 7 q7.5 -5 15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 V14 H0Z"/>';
function renderWater(){
  var g=document.getElementById('wglasses'); if(!g) return;
  _wfill=APP.water; g.innerHTML='';
  for(var i=0;i<WN;i++){
    var b=document.createElement('button');
    b.className='wg'+(i<_wfill?' f':''); b.dataset.i=i;
    b.setAttribute('aria-label','لیوان '+(i+1)+' از '+WN); b.setAttribute('aria-pressed',i<_wfill?'true':'false');
    b.innerHTML='<div class="fill"><svg class="wv" viewBox="0 0 120 14" preserveAspectRatio="none">'+WAVE_PATH+'</svg>'+
      '<svg class="wv b" viewBox="0 0 120 14" preserveAspectRatio="none">'+WAVE_PATH+'</svg></div>'+
      '<div class="stream"></div><div class="drop"></div>';
    g.appendChild(b);
  }
  var c=document.getElementById('wcount');
  if(c) c.textContent=fa(_wfill)+' از '+fa(WN)+' لیوان — هدف شخصی: '+fa(WN)+
    (_wfill===0?' · امروز هنوز چیزی ثبت نکرده‌ای':(_wfill===WN?' · ثبت قطعی شد ✓':' · پیش‌نویس — تا پایان امروز قابل‌تغییر'));
}
function waterTap(i){
  var g=document.getElementById('wglasses'); if(!g) return;
  var el=g.children[i];
  if(i+1===_wfill && _wfill>0){ APP.water--; renderWater(); return; }   /* بازگشت: بی‌صدا */
  if(el){
    var st=el.querySelector('.stream'), dr=el.querySelector('.drop');
    if(st) st.classList.add('on');
    if(dr) dr.classList.add('on');
    setTimeout(function(){ if(st)st.remove(); if(dr)dr.remove(); },520);
  }
  APP.water=i+1;
  setTimeout(function(){ renderWater(); },70);
  pourSnd();
  if(APP.water===WN&&el) setTimeout(completeSnd,430);
}

/* ---------- رویدادها ---------- */
document.addEventListener('DOMContentLoaded',function(){
  if(!location.hash) location.hash='#landing';
  APP.screen=location.hash.slice(1);
  render();
  document.addEventListener('click',function(e){
    var t=e.target.closest('[data-go]'); if(t){go(t.dataset.go);return;}
    var b=e.target.closest('[data-prev],[data-next],[data-tgl],[data-tglnote],[data-hidebar],[data-close],[data-snd]');
    if(b){
      var idx=SCREENS.map(function(x){return x.id;}).indexOf(APP.screen);
      if(b.hasAttribute('data-prev')){ if(idx>0) go(SCREENS[idx-1].id); }
      else if(b.hasAttribute('data-next')){ if(idx<SCREENS.length-1) go(SCREENS[idx+1].id); }
      else if(b.hasAttribute('data-tgl')){
        var k=b.getAttribute('data-tgl');
        if(k==='data') APP.data=(APP.data==='full'?'empty':'full');
        else if(k==='theme') APP.theme=(APP.theme==='classic'?'glass':'classic');
        render();
      }
      else if(b.hasAttribute('data-tglnote')){ APP.notes=(APP.notes===false); render(); }
      else if(b.hasAttribute('data-hidebar')){
        document.getElementById('shellbar').classList.add('hide');
        document.getElementById('rvopen').classList.add('show');
      }
      else if(b.hasAttribute('data-close')) closeModal();
      else if(b.hasAttribute('data-snd')){
        APP.sound=!APP.sound;
        if(APP.sound){var c=ac(); if(c&&c.state==='suspended'&&c.resume)c.resume(); pourSnd();}
        b.className='wsnd '+(APP.sound?'on':''); b.textContent=APP.sound?'🔊 صدای آب روشن':'🔇 صدای آب خاموش';
        if(window.CTX_AFTER) window.CTX_AFTER(b);
      }
      return;
    }
    var w=e.target.closest('.wg'); if(w && w.parentNode.id==='wglasses'){ waterTap(+w.dataset.i); return; }
    var o=e.target.closest('.owl.owl-tap'); if(o){o.classList.remove('wiggle');void o.offsetWidth;o.classList.add('wiggle');return;}
    if(window.INNER_CLICK) window.INNER_CLICK(e);
  });
  document.getElementById('rvopen').addEventListener('click',function(){
    document.getElementById('shellbar').classList.remove('hide');
    document.getElementById('rvopen').classList.remove('show');
  });
  document.addEventListener('click',function(e){ if(e.target.id==='modal') closeModal(); });
});
window.addEventListener('hashchange',function(){
  APP.screen=location.hash.slice(1)||'landing';
  if(window.ON_SCREEN) window.ON_SCREEN(APP.screen);
  render(); window.scrollTo(0,0);
});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){ closeModal();
    var m=document.getElementById('rvbar');
    if(m&&m.classList.contains('hide')){}
  }
});
