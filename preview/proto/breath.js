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
var _brEl={};
function brPh(){ return BR_PH[BR.phase]; }
function brTotal(){ return BR_PH[BR.phase][2]; }

/* ---------- کارت پیشنهاد (در «کارهای امروز» و پایان «حال من») ---------- */
function breathCard(where){
  var why=(where==='mood')
    ? 'بادکنک استرست پف کرده. ۳ دور تنفس ۴-۷-۸ کمتر از ۳ دقیقه است و همین حالا حالت را نرم می‌کند.'
    : 'امروز پرتنش بوده. ۳ دور تنفس ۴-۷-۸ کمتر از ۳ دقیقه است — نه امتیاز دارد، نه چیزی را قفل می‌کند.';
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
    '<div class="br-dots" id="brdots">'+dots+'</div>'+
    '<div class="br-acts">'+
      '<button class="btn primary" id="brgo" data-brstart>'+ic('i-play')+(BR.done?'دوباره':(BR.running?'مکث':'شروع'))+'</button>'+
      '<button class="btn ghost" data-brstop>پایان</button>'+
      '<button class="btn ghost" data-brsnd>'+(BR.sound?'🔊 صدای راهنما روشن':'🔈 صدای راهنما خاموش')+'</button>'+
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
  if(snd) snd.innerHTML=BR.sound?'🔊 صدای راهنما روشن':'🔈 صدای راهنما خاموش';
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
  BR.open=true; BR.running=false; BR.phase=0; BR.sec=BR_PH[0][2]; BR.round=1; BR.done=false;
  brMount(); brPaint();
}
function brStop(){
  BR.running=false;
  if(BR.timer && typeof clearInterval==='function'){ clearInterval(BR.timer); BR.timer=null; }
  brPaint();
}
function brClose(){ brStop(); BR.open=false; var e=document.getElementById('breathOv'); if(e) e.remove(); }
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
function brVoice(){
  /* جملهٔ همان فاز را پخش می‌کند. اگر فایل نبود، برمی‌گرداند false تا تن جایگزین شود. */
  if(typeof Audio!=='function') return false;
  var key=BR_PH[BR.phase][0], src=BR_VOICE[key];
  if(!src) return false;
  try{
    var el=_brEl[key];
    if(!el){ el=new Audio(src); el.preload='auto'; el.volume=.9; _brEl[key]=el; }
    el.currentTime=0;
    var pr=el.play();
    if(pr&&pr.catch) pr.catch(function(){ _brVoiceFailed=true; });
    return true;
  }catch(e){ return false; }
}
var _brVoiceFailed=false;
function brSound(){
  if(!BR.sound||BR.open!==true) return;
  if(typeof brVoice==='function' && !_brVoiceFailed && brVoice()) return;
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
