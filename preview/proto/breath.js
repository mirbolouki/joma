/* ==========================================================================
   تمرین تنفس ۴-۷-۸ — انیمیشنی، بی‌پاداش، قابل انجام در هر جای برنامه
   «چرا حذف شده بود؟» — حذف نشده بود؛ در نمونهٔ بازبینی جا افتاده بود. حالا
   یک تمرین درجه‌یک است: کتابخانه + آموزش + پیشنهاد هوشمند در «کارهای امروز».
   صدا اختیاری و پیش‌فرض خاموش است؛ حرکت با «کاهش حرکت» سیستم کم می‌شود.
   ========================================================================== */
var BR={open:false,running:false,phase:0,sec:4,round:1,rounds:3,sound:false,done:false,timer:null};
var BR_PH=[
  ['in','دم',4,'از بینی، آرام دم بگیر'],
  ['hold','نگه دار',7,'نفس را حبس کن، شانه‌ها شل و رها'],
  ['out','بازدم',8,'حالا آرام و بلند از دهان بازدم']
];
/* صدای راهنمای انسانی — سه جملهٔ کوتاه، هرکدام سرِ فاز خودش.
   فایل‌های صوتی همراه نمونه می‌آیند؛ اگر نبودند، تنِ نرم جایشان را می‌گیرد. */
var BR_VOICE={in:'audio/br-in.mp3',hold:'audio/br-hold.mp3',out:'audio/br-out.mp3'};
/* متن همان سه جمله — برای وقتی صدا خاموش است یا مرورگر پخش نمی‌کند */
var BR_LINES={in:'از بینی، آرام دم بگیر',
              hold:'نفس را نگه دار، شانه‌ها شل و رها',
              out:'حالا آرام و بلند، از دهان بازدم'};
/* یک خط وضعیت که همیشه دیده می‌شود: صدا روشن است؟ فایل آماده است؟ */
function brVoiceLine(){
  var ph=BR_PH[BR.phase], line=BR_LINES[ph[0]]||ph[3];
  if(!BR.sound) return ic('i-vol',14)+'<span>صدای راهنما خاموش است — با دکمهٔ زیر روشنش کن. '+
    'جملهٔ این مرحله: «'+line+'»</span>';
  var st=(typeof brVoiceState==='function')?brVoiceState():'idle';
  var w={ready:'آماده — سرِ هر مرحله همین جمله را می‌شنوی',
         loading:'در حال آماده‌شدن فایل صوتی…',
         partial:'بخشی از فایل‌ها آماده شد',
         failed:'مرورگر صدا را پخش نکرد — متن راهنما را بخوان',
         idle:'آماده‌سازی…'}[st]||'آماده';
  return ic('i-vol',14)+'<b>صدای راهنما روشن</b><span class="bv-line">«'+line+'»</span><span class="tiny">'+w+'</span>';
}
var _brEl={};
function brPh(){ return BR_PH[BR.phase]; }
function brTotal(){ return BR_PH[BR.phase][2]; }

/* ---------- کارت پیشنهاد (در «کارهای امروز» و پایان «حال من») ---------- */
function breathCard(where){
  /* 🔴 تصمیم مالک (۱۴۰۵): متنِ راهنمایِ تمرین از کارت پیشنهاد نفس برداشته شد.
     کارت کوتاه است: فقط پیشنهاد، زمان و دو دکمه — راهنما داخل خود تمرین است. */
  var why=(where==='mood')?'بادکنک استرست پف کرده — سه دور، کمتر از یک دقیقه.'
                          :'امروز پرتنش بوده — سه دور، کمتر از یک دقیقه.';
  return '<div class="card breath-card">'+
    '<div class="bc-art">'+owl('owl-lotus',54,'floaty')+'</div>'+
    '<div class="bc-body"><div class="bc-tag">'+ic('i-lotus')+'پیشنهاد امروز</div>'+
    '<h3>یک تمرین تنفس، همین حالا؟</h3>'+
    '<p class="tiny">'+why+'</p>'+
    '<div class="bc-meta tiny"><span>'+ic('i-clock')+'۴ ثانیه دم · ۷ ثانیه نگه‌دار · ۸ ثانیه بازدم</span>'+
      '<span>'+ic('i-checkc')+'۳ دور ≈ ۱ دقیقه</span></div>'+
    '<div class="bc-acts"><button class="btn primary sm" data-breathopen="today">'+ic('i-play')+'شروع تنفس</button>'+
      '<button class="btn ghost sm" data-breathlater>بعداً</button></div>'+
    '</div></div>';
}

/* ---------- پوستهٔ تمام‌صفحه ---------- */
function R_breath(){
  var ph=brPh();
  var r=54, C=2*Math.PI*r;
  var off=C*(1-BR.sec/brTotal());
  var dots='';
  for(var i=1;i<=BR.rounds;i++){
    dots+='<i class="brdot'+(i<BR.round?' done':(i===BR.round?' on':''))+'"></i>';
  }
  return '<div class="breath-ov" id="breathOv"><div class="br-card">'+
    '<button class="br-x" data-brx aria-label="بستن">'+ic('i-x')+'</button>'+
    '<div class="br-top"><b>تمرین تنفس ۴-۷-۸</b><span class="tiny" id="brround">دور '+fa(BR.round)+' از '+fa(BR.rounds)+'</span></div>'+
    '<div class="br-stage">'+
      '<div class="br-halo"></div>'+
      '<div class="br-circle" id="brc" data-ph="'+ph[0]+'">'+
        '<svg class="br-ring" width="132" height="132" viewBox="0 0 132 132" aria-hidden="true">'+
          '<circle cx="66" cy="66" r="'+r+'" class="br-track"/>'+
          '<circle cx="66" cy="66" r="'+r+'" class="br-prog" id="brring" stroke-dasharray="'+_n(C)+'" stroke-dashoffset="'+_n(off)+'"/>'+
        '</svg>'+
        '<span class="br-lbl" id="brlbl">'+ph[1]+'</span>'+
        '<small class="br-sec num" id="brsec">'+fa(BR.sec)+'</small>'+
      '</div>'+
    '</div>'+
    '<p class="tiny br-hint" id="brhint">'+ph[3]+'</p>'+
    '<div class="br-voice" id="brvoice">'+brVoiceLine()+'</div>'+
    '<div class="br-dots" id="brdots">'+dots+'</div>'+
    '<div class="br-acts">'+
      '<button class="btn primary" id="brgo" data-brstart>'+ic('i-play')+(BR.done?'دوباره':(BR.running?'مکث':'شروع'))+'</button>'+
      '<button class="btn ghost" data-brstop>پایان</button>'+
      '<button class="btn '+(BR.sound?'soft':'ghost')+'" id="brsndbtn" data-brsnd>'+(BR.sound?ic('i-vol')+'صدای راهنما: روشن':ic('i-vol')+'صدای راهنما: خاموش')+'</button>'+
    '</div>'+
    '<div class="br-done'+(BR.done?' on':'')+'" id="brdone">'+
      owl('owl-cheer',54,'floaty')+
      '<b>۳ دور تمام شد</b>'+
      '<p class="tiny">حالا حس بهتری داری؟ ثبت حال، فقط یک قدم است.</p>'+
      '<div class="br-acts" style="justify-content:center">'+
        '<button class="btn primary sm" data-brmood>ثبت حال</button>'+
        '<button class="btn ghost sm" data-brx>بستن</button>'+
      '</div></div>'+
    '<div class="br-foot tiny">'+ic('i-info')+
      'تنفس آرام ابزار کمکی است، جای درمان نیست. اگر سرگیجه گرفتی، بایست و طبیعی نفس بکش.'+
      '<span class="br-src">پیشنهاد می‌شود وقتی استرس ثبت‌شده‌ات زیاد باشد</span></div>'+
  '</div></div>';
}

/* ---------- موتور ---------- */
function brPaint(){
  if(typeof document==='undefined'||!document.getElementById) return;
  var c=document.getElementById('brc'); if(!c) return;
  var ph=brPh(), C=2*Math.PI*54;
  c.setAttribute('data-ph',ph[0]);
  var l=document.getElementById('brlbl'); if(l) l.textContent=ph[1];
  var s=document.getElementById('brsec'); if(s) s.textContent=fa(BR.sec);
  var h=document.getElementById('brhint'); if(h) h.textContent=ph[3];
  var g=document.getElementById('brring'); if(g) g.setAttribute('stroke-dashoffset',_n(C*(1-BR.sec/brTotal())));
  var r=document.getElementById('brround'); if(r) r.textContent='دور '+fa(BR.round)+' از '+fa(BR.rounds);
  var go=document.getElementById('brgo'); if(go) go.innerHTML=ic('i-play')+(BR.done?'دوباره':(BR.running?'مکث':'شروع'));
  var snd=document.querySelector('[data-brsnd]');
  if(snd) snd.innerHTML=BR.sound?ic('i-vol')+'صدای راهنما: روشن':ic('i-vol')+'صدای راهنما: خاموش';
  var snd2=document.getElementById('brsndbtn'); if(snd2) snd2.className='btn '+(BR.sound?'soft':'ghost');
  var vv=document.getElementById('brvoice'); if(vv){ vv.innerHTML=brVoiceLine(); vv.className='br-voice'+(BR.sound?' on':''); }
  var dn=document.getElementById('brdone'); if(dn) dn.classList.toggle('on',!!BR.done);
  var dots=document.getElementById('brdots');
  if(dots){
    var out='';
    for(var i=1;i<=BR.rounds;i++) out+='<i class="brdot'+(i<BR.round?' done':(i===BR.round?' on':''))+'"></i>';
    dots.innerHTML=out;
  }
}
function brMount(){
  if(typeof document==='undefined'||!document.getElementById) return;
  var a=document.getElementById('app'); if(!a) return;
  var e=document.getElementById('breathOv'); if(e) e.remove();
  a.insertAdjacentHTML('beforeend',R_breath());
}
function brOpen(){
  brPrime();              /* فایل‌ها همان لحظهٔ باز شدن بارگذاری می‌شوند */
  BR.open=true; BR.running=false; BR.phase=0; BR.sec=BR_PH[0][2]; BR.round=1; BR.done=false;
  brMount(); brPaint();
}
function brStop(){
  BR.running=false;
  if(typeof brVoiceStop==='function') brVoiceStop();
  if(BR.timer && typeof clearInterval==='function'){ clearInterval(BR.timer); BR.timer=null; }
  brPaint();
}
function brClose(){ brStop(); brVoiceStop(); BR.open=false; var e=document.getElementById('breathOv'); if(e) e.remove(); }
function brStart(){
  if(BR.done){ BR.done=false; BR.phase=0; BR.round=1; BR.sec=BR_PH[0][2]; }
  if(BR.running){ brStop(); return; }
  BR.running=true; brPaint(); brSound(); 
  if(typeof setInterval==='function') { BR.timer=setInterval(brTick,1000); }
}
function brTick(){
  if(!BR.running) return;
  BR.sec--;
  if(BR.sec<=0){
    BR.phase++;
    if(BR.phase>2){
      BR.phase=0; BR.round++;
      if(BR.round>BR.rounds){ brFinish(); return; }
    }
    BR.sec=BR_PH[BR.phase][2];
    brSound();
  }
  brPaint();
}
function brFinish(){
  brStop(); BR.done=true; brPaint();
  if(typeof toast==='function') toast('۳ دور تمام شد — حالا آرام‌تری');
}
/* صدای راهنما: بدون پاداش، فقط همراهیِ آرام — پیش‌فرض خاموش */
/* ---------- راه‌اندازی صدا ----------
   دو مسیر داریم و هر دو را می‌آزماییم:
   ① Web Audio: فایل را می‌گیریم و در حافظه رمزگشایی می‌کنیم. بعد از لمس کاربر
      همیشه پخش می‌شود و به سیاست «پخش خودکار» مرورگر و iframe کاری ندارد.
   ② عنصر <audio>: فقط اگر ① نشد.
   حالت سوم جانشین: تُن نرم — تا تجربه هیچ‌وقت خالی نماند. */
var _brLoad='idle';          /* idle | loading | ready | partial | failed */
var _brBuf={};               /* بافرهای رمزگشایی‌شده — پخش بدون تأخیر */
function brVoiceState(){ return _brLoad; }
/* مسیر دوم (عنصر صوتی) را از همان لحظهٔ باز شدن آماده می‌کنیم تا اولین جمله
   بی‌تأخیر پخش شود — این مسیر در مرورگرهایی که Web Audio را می‌بندند کار می‌کند. */
function brPrimeEls(){
  if(typeof Audio!=='function') return;
  Object.keys(BR_VOICE).forEach(function(k){
    if(_brEl[k]) return;
    try{ var el=new Audio(BR_VOICE[k]); el.preload='auto'; el.volume=.9; _brEl[k]=el; }catch(e){}
  });
}
function brPrime(){
  brPrimeEls();
  if(_brLoad==='loading'||_brLoad==='ready') return;
  _brLoad='loading';
  if(typeof fetch!=='function'||typeof ac!=='function'){ _brLoad='failed'; return; }
  var c=ac(); if(!c){ _brLoad='failed'; return; }
  var keys=Object.keys(BR_VOICE), done=0, ok=0;
  keys.forEach(function(k){
    var url=BR_VOICE[k];
    try{
      fetch(url,{cache:'force-cache'}).then(function(r){
        if(!r.ok) throw new Error('http '+r.status);
        return r.arrayBuffer();
      }).then(function(b){
        return new Promise(function(res,rej){ c.decodeAudioData(b,res,rej); });
      }).then(function(buf){ _brBuf[k]=buf; ok++; })
        .catch(function(){})
        .then(function(){ done++; if(done===keys.length) _brLoad=(ok===keys.length)?'ready':(ok?'partial':'failed'); });
    }catch(e){ done++; if(done===keys.length) _brLoad= ok? 'partial':'failed'; }
  });
}
/* پخش از حافظه: دقیقاً سرِ فاز، بدون تأخیر فایل */
function brPlayBuf(key){
  var buf=_brBuf[key]; if(!buf) return false;
  try{
    var c=ac(); if(!c) return false;
    if(c.state==='suspended'&&c.resume) c.resume();
    var src=c.createBufferSource(); src.buffer=buf;
    var g=c.createGain(); g.gain.value=.95;
    src.connect(g);
    if(typeof out==='function') out(g,c,.3); else g.connect(c.destination);
    src.start((c.currentTime||0)+.01);
    _brPlaying.push(src);
    if(_brPlaying.length>4) _brPlaying.shift();
    return true;
  }catch(e){ return false; }
}
var _brPlaying=[];
function brStopBuf(){
  for(var i=0;i<_brPlaying.length;i++){ try{ _brPlaying[i].stop(); }catch(e){} }
  _brPlaying=[];
}
/* مسیر دوم: عنصر صوتی */
function brPlayEl(key){
  if(typeof Audio!=='function') return false;
  try{
    var el=_brEl[key];
    if(!el){ el=new Audio(BR_VOICE[key]); el.preload='auto'; el.volume=.9; _brEl[key]=el; }
    try{ el.currentTime=0; }catch(e){}
    var pr=el.play();
    if(pr&&pr.catch) pr.catch(function(){ _brVoiceFailed=true; });
    return true;
  }catch(e){ return false; }
}
/* نمونهٔ صدا — وقتی کاربر دکمهٔ صدا را روشن می‌کند، همان جملهٔ «دم» را می‌شنود */
function brSample(){
  brPrime();
  if(brPlayBuf('in')) return 'voice';
  if(brPlayEl('in')) return 'element';
  return 'tone';
}
function brVoiceStop(){
  if(typeof brStopBuf==='function') brStopBuf();
  Object.keys(_brEl).forEach(function(k){ try{ _brEl[k].pause(); _brEl[k].currentTime=0; }catch(e){} });
}
function brVoice(){
  /* جملهٔ همان فاز — دقیقاً سرِ شروع همان فاز. ترتیب: بافر → عنصر → (تُن در brSound) */
  var key=BR_PH[BR.phase][0];
  if(!key) return false;
  if(brPlayBuf(key)) return true;
  if(!_brVoiceFailed && brPlayEl(key)) return true;
  return false;
}
var _brVoiceFailed=false;
function brSound(){
  if(!BR.sound||BR.open!==true||BR.running!==true) return;
  brVoiceStop();            /* جملهٔ مرحلهٔ قبل تمام می‌شود؛ صداها روی هم نمی‌افتند */
  if(typeof brVoice==='function' && brVoice()) return;
  brTone();
}
function brTone(){
  if(typeof ac!=='function') return;
  try{
    var c=ac(); if(!c) return;
    if(c.state==='suspended'&&c.resume) c.resume();
    var t=c.currentTime, up=(BR.phase===0), hold=(BR.phase===1);
    var o=c.createOscillator(); o.type='sine';
    var f0=up?196:(hold?262:294), f1=up?294:(hold?262:196);
    o.frequency.setValueAtTime(f0,t);
    if(!hold) o.frequency.linearRampToValueAtTime(f1,t+(up?3.4:6.4));
    var lp=c.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=900; lp.Q.value=.4;
    var g=c.createGain();
    g.gain.setValueAtTime(.0001,t);
    g.gain.linearRampToValueAtTime(.045,t+(up?.7:1.1));
    g.gain.linearRampToValueAtTime(.0001,t+(hold?6.2:(up?3.9:7.4)));
    o.connect(lp); lp.connect(g);
    if(typeof out==='function') out(g,c,.6); else g.connect(c.destination);
    o.start(t); o.stop(t+(hold?6.4:7.6));
  }catch(e){}
}
