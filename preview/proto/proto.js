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

/* ---------- لیوان آب (مشترک: خانه و کارهای امروز) ---------- */
var WN=8,_wfill=0,_lastSnd=0,_AC=null;
function ac(){if(!_AC){var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;_AC=new C();}return _AC;}
function noiseBuf(dur,c){var n=Math.floor(c.sampleRate*dur),b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);
  for(var i=0;i<n;i++){d[i]=(Math.random()*2-1)*(1-i/n);}return b;}
function pourSnd(){
  if(!APP.sound||document.hidden)return;
  var t=performance.now(); if(t-_lastSnd<250)return; _lastSnd=t;
  var c=ac(); if(!c)return; var s=c.createBufferSource(); s.buffer=noiseBuf(.26,c);
  var f=c.createBiquadFilter(); f.type='bandpass'; f.frequency.value=1150; f.Q.value=1.1;
  var g=c.createGain(); g.gain.setValueAtTime(.0001,c.currentTime);
  g.gain.exponentialRampToValueAtTime(.16,c.currentTime+.02);
  g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+.24);
  s.connect(f);f.connect(g);g.connect(c.destination);s.start();
}
function chimeSnd(){
  if(!APP.sound||document.hidden)return; var c=ac(); if(!c)return;
  [660,880,1320].forEach(function(fr,i){
    var o=c.createOscillator(),g=c.createGain(); o.type='sine'; o.frequency.value=fr;
    var t0=c.currentTime+i*.08; g.gain.setValueAtTime(.0001,t0);
    g.gain.exponentialRampToValueAtTime(.12,t0+.02);
    g.gain.exponentialRampToValueAtTime(.0001,t0+.5);
    o.connect(g);g.connect(c.destination);o.start(t0);o.stop(t0+.55);
  });
}
function waterCard(compact){
  return '<div class="card wbox" id="wcard"><div style="display:flex;justify-content:space-between;'+
    'align-items:center;gap:10px;flex-wrap:wrap"><h3>'+ic('i-drop')+'آب امروز</h3>'+
    '<button class="wsnd '+(APP.sound?'on':'')+'" data-snd>'+(APP.sound?'🔊 صدا روشن':'🔇 صدا خاموش')+'</button></div>'+
    '<div class="tiny num" id="wcount" style="margin-top:6px;font-weight:800;color:var(--ink-2)"></div>'+
    '<div class="wglasses" id="wglasses"></div>'+
    (compact?'':'<p class="tiny" style="margin-top:10px">روی لیوان‌ها بزن — سطح آب با <b>موج دو‌لایه</b> بالا می‌آید. '+
      'پیش‌فرض صدا خاموش است؛ «بازگشت» صدا ندارد.</p>')+
  '</div>';
}
function renderWater(){
  var g=document.getElementById('wglasses'); if(!g)return;
  _wfill=APP.water; g.innerHTML='';
  for(var i=0;i<WN;i++){
    var b=document.createElement('button');
    b.className='wg'+(i<_wfill?' f':''); b.setAttribute('aria-label','لیوان '+(i+1)); b.dataset.i=i;
    b.innerHTML='<div class="fill"><div class="wv"></div><div class="wv b"></div></div>';
    g.appendChild(b);
  }
  var c=document.getElementById('wcount');
  if(c)c.textContent=fa(_wfill)+' از '+fa(WN)+' لیوان — هدف شخصی: '+fa(WN)+
    (_wfill===0?' · امروز هنوز چیزی ثبت نکرده‌ای':(_wfill===WN?' · ثبت قطعی شد ✓':' · پیش‌نویس — تا پایان امروز قابل‌تغییر'));
}
function waterTap(i){
  var g=document.getElementById('wglasses'); if(!g)return;
  if(i+1===_wfill && _wfill>0){ APP.water--; renderWater(); return; } /* بازگشت: بی‌صدا */
  var el=g.children[i];
  var st=document.createElement('div'); st.className='stream on'; if(el)el.appendChild(st);
  setTimeout(function(){if(st.parentNode)st.remove();},360);
  APP.water=i+1; pourSnd();
  setTimeout(function(){renderWater(); if(APP.water===WN)chimeSnd();},60);
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
        b.className='wsnd '+(APP.sound?'on':''); b.textContent=APP.sound?'🔊 صدا روشن':'🔇 صدا خاموش';
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
