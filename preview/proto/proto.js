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
   لیوان شیشه‌ای واقعی + آبِ موج‌دار + صدای واقعی آب (سند ۱۲ §۷).
   صدا با Web Audio ساخته می‌شود — صفر بایت دانلود.                    */
var WN=8,_wfill=0,_lastSnd=0,_AC=null,_MASTER=null,_WETIN=null;

function ac(){
  if(!_AC){
    var C=window.AudioContext||window.webkitAudioContext; if(!C) return null;
    _AC=new C();
    _MASTER=_AC.createGain(); _MASTER.gain.value=.85; _MASTER.connect(_AC.destination);
    /* طنینِ کوچکِ داخل لیوان — صدا را «آب داخل ظرف» می‌کند، نه نویز خام */
    var conv=_AC.createConvolver(); conv.buffer=makeIR(_AC,0.09,2.8);
    var wet=_AC.createGain(); wet.gain.value=.3;
    _WETIN=_AC.createGain();
    _WETIN.connect(conv); conv.connect(wet); wet.connect(_MASTER);
  }
  return _AC;
}
function makeIR(c,dur,decay){
  var len=Math.max(1,Math.floor(c.sampleRate*dur)), b=c.createBuffer(2,len,c.sampleRate);
  for(var ch=0;ch<2;ch++){
    var d=b.getChannelData(ch);
    for(var i=0;i<len;i++){ var k=i/len; d[i]=(Math.random()*2-1)*Math.pow(1-k,decay); }
  }
  return b;
}
function out(node,c,db){           /* خروجی: هم خشک، هم نم‌دار (داخل لیوان) */
  node.connect(_MASTER);
  if(_WETIN){ var g=c.createGain(); g.gain.value=db; node.connect(g); g.connect(_WETIN); }
}
function noiseBuf(dur,c){
  var n=Math.max(1,Math.floor(c.sampleRate*dur)), b=c.createBuffer(1,n,c.sampleRate), d=b.getChannelData(0);
  for(var i=0;i<n;i++) d[i]=Math.random()*2-1;
  return b;
}
/* «گِلوپ» — صدای امضای ریختن آب در لیوان: فرکانس که تند افت می‌کند */
function glug(c,t,f0,f1,dur,vol){
  var o=c.createOscillator(); o.type='sine';
  o.frequency.setValueAtTime(f0,t);
  o.frequency.exponentialRampToValueAtTime(f1,t+dur*.85);
  var lp=c.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=1600; lp.Q.value=.7;
  var g=c.createGain();
  g.gain.setValueAtTime(.0001,t);
  g.gain.exponentialRampToValueAtTime(vol,t+dur*.16);
  g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(lp); lp.connect(g); out(g,c,.55);
  o.start(t); o.stop(t+dur+.03);
}
/* جریان آب: نویز باند-گذر با مرکزی که پایین می‌آید */
function stream(c,t0,dur){
  var src=c.createBufferSource(); src.buffer=noiseBuf(.7,c); src.loop=true;
  var bp=c.createBiquadFilter(); bp.type='bandpass'; bp.Q.value=.85;
  bp.frequency.setValueAtTime(1500,t0);
  bp.frequency.exponentialRampToValueAtTime(820,t0+dur*.85);
  var hp=c.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=380;
  var g=c.createGain();
  g.gain.setValueAtTime(.0001,t0);
  g.gain.exponentialRampToValueAtTime(.10,t0+.045);
  g.gain.setValueAtTime(.10,t0+dur*.45);
  g.gain.exponentialRampToValueAtTime(.0001,t0+dur);
  var lfo=c.createOscillator(); lfo.type='triangle'; lfo.frequency.value=12.5;
  var lgf=c.createGain(); lgf.gain.value=.028; lfo.connect(lgf); lgf.connect(g.gain);
  src.connect(hp); hp.connect(bp); bp.connect(g); out(g,c,.4);
  src.start(t0); src.stop(t0+dur); lfo.start(t0); lfo.stop(t0+dur);
}
/* شروع ریختن: یک ترقهٔ کوتاهِ پرفرکانس */
function splash(c,t0){
  var src=c.createBufferSource(); src.buffer=noiseBuf(.12,c);
  var hp=c.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=2600;
  var g=c.createGain();
  g.gain.setValueAtTime(.0001,t0);
  g.gain.exponentialRampToValueAtTime(.09,t0+.008);
  g.gain.exponentialRampToValueAtTime(.0001,t0+.09);
  src.connect(hp); hp.connect(g); out(g,c,.5); src.start(t0); src.stop(t0+.12);
}
/* قطره: پریدنِ فرکانس رو به بالا — صدای آشنای چکیدن */
function drop(c,t,base,vol){
  var o=c.createOscillator(); o.type='sine';
  o.frequency.setValueAtTime(base,t);
  o.frequency.exponentialRampToValueAtTime(base*2.6,t+.055);
  var g=c.createGain();
  g.gain.setValueAtTime(.0001,t);
  g.gain.exponentialRampToValueAtTime(vol||.14,t+.006);
  g.gain.exponentialRampToValueAtTime(.0001,t+.22);
  o.connect(g); out(g,c,.7); o.start(t); o.stop(t+.26);
}
function bubble(c,t,vol){
  var f0=320+Math.random()*300, o=c.createOscillator(); o.type='sine';
  o.frequency.setValueAtTime(f0,t);
  o.frequency.exponentialRampToValueAtTime(f0*2.2+120,t+.06);
  var g=c.createGain();
  g.gain.setValueAtTime(.0001,t);
  g.gain.exponentialRampToValueAtTime(vol||.035,t+.01);
  g.gain.exponentialRampToValueAtTime(.0001,t+.1);
  o.connect(g); out(g,c,.6); o.start(t); o.stop(t+.12);
}
function pourSnd(){
  if(!APP.sound||document.hidden) return;
  var now=performance.now(); if(now-_lastSnd<250) return; _lastSnd=now;
  var c=ac(); if(!c) return; var t0=c.currentTime+.01;
  splash(c,t0);
  stream(c,t0+.01,.52);
  /* سه تا چهار «گِلوپ» با فاصلهٔ نامنظم — همان چیزی که «آب» را آب می‌کند */
  var n=3+Math.floor(Math.random()*2), t=t0+.06;
  for(var i=0;i<n;i++){
    glug(c,t,150+Math.random()*90,72+Math.random()*30,.075+Math.random()*.05,.055+Math.random()*.035);
    t+=.085+Math.random()*.09;
  }
  bubble(c,t0+.30,.05); bubble(c,t0+.42,.04);
}
/* کامل شدن: چهار قطرهٔ بالارونده + یک گِلوپ نرم — جشنِ آبی، نه زنگ فلزی */
function completeSnd(){
  if(!APP.sound||document.hidden) return;
  var c=ac(); if(!c) return; var t0=c.currentTime+.01;
  drop(c,t0,470,.15); drop(c,t0+.16,620,.14); drop(c,t0+.33,840,.13); drop(c,t0+.50,1120,.11);
  glug(c,t0+.66,170,90,.13,.06);
  bubble(c,t0+.78,.05);
}
function waterCard(){
  return '<div class="card wbox" id="wcard">'+
    '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">'+
      '<h3>'+ic('i-drop')+'آب امروز</h3>'+
      '<button class="wsnd '+(APP.sound?'on':'')+'" data-snd aria-pressed="'+(APP.sound?'true':'false')+'">'+
        (APP.sound?'🔊 صدای آب روشن':'🔇 صدای آب خاموش')+'</button></div>'+
    '<div class="wcount num" id="wcount"></div>'+
    '<div class="wglasses" id="wglasses" role="group" aria-label="لیوان‌های آب امروز"></div>'+
    '<p class="tiny" style="margin-top:10px">روی لیوان‌ها بزن — آب با <b>موج</b> بالا می‌آید و صدای <b>ریختن آب</b> دارد. '+
      'صدا پیش‌فرض خاموش است؛ بازگشت صدا ندارد.</p>'+
  '</div>';
}
function renderWater(){
  var g=document.getElementById('wglasses'); if(!g) return;
  _wfill=APP.water; g.innerHTML='';
  for(var i=0;i<WN;i++){
    var b=document.createElement('button');
    b.className='wg'+(i<_wfill?' f':''); b.dataset.i=i;
    b.setAttribute('aria-label','لیوان '+(i+1)+' از '+WN+(i<_wfill?' — پر':' — خالی'));
    b.setAttribute('aria-pressed',i<_wfill?'true':'false');
    b.innerHTML=glassSVG(i,i<_wfill);
    g.appendChild(b);
  }
  waterCount();
}
function waterCount(){
  var c=document.getElementById('wcount'); if(!c) return;
  c.textContent=fa(_wfill)+' از '+fa(WN)+' لیوان — هدف شخصی: '+fa(WN)+
    (_wfill===0?' · امروز هنوز چیزی ثبت نکرده‌ای':(_wfill===WN?' · ثبت قطعی شد ✓':' · پیش‌نویس — تا پایان امروز قابل‌تغییر'));
}
/* پر کردن/خالی‌کردن **در جا** — تا انیمیشن آب از دست نرود */
function setGlass(el,filled){
  if(!el) return;
  var w=el.querySelector('.gwater'); if(w) w.style.transform='translateY('+(filled?0:47)+'px)';
  el.classList.toggle('f',filled);
  el.setAttribute('aria-pressed',filled?'true':'false');
  el.setAttribute('aria-label',el.getAttribute('aria-label').replace(/— (پر|خالی)$/,'— '+(filled?'پر':'خالی')));
}
function splashAt(el){
  var st=el.querySelector('.gstream'), dr=el.querySelector('.gdrop');
  [st,dr].forEach(function(n){ if(!n) return; n.classList.remove('on'); void n.getBoundingClientRect(); n.classList.add('on'); });
  setTimeout(function(){ if(st)st.classList.remove('on'); if(dr)dr.classList.remove('on'); },600);
}
function waterTap(i){
  var g=document.getElementById('wglasses'); if(!g) return;
  if(i+1===_wfill && _wfill>0){                  /* بازگشت — بی‌صدا */
    setGlass(g.children[i],false);
    _wfill=i; waterCount(); return;
  }
  for(var j=0;j<=i;j++) setGlass(g.children[j],true);
  for(var k=i+1;k<WN;k++) setGlass(g.children[k],false);
  splashAt(g.children[i]);
  _wfill=i+1; waterCount();
  pourSnd();
  if(_wfill===WN) setTimeout(completeSnd,460);
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
