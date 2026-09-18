var _moodT=null;
function moodNext(){
  /* پنج پرسش، بعد یک قدم اختیاری: جملهٔ خودت */
  if(APP.moodStep<MOOD_STEPS.length) APP.moodStep++;
  render();
}
/* ==========================================================================
   رفتار صفحه‌های نمونه — دستهٔ ۱
   ========================================================================== */
window.ON_SCREEN=function(id){
  if(id!=='mood'){ APP.moodStep=0; }
  /* چرخه‌های چندگامی از صفحهٔ خودشان بیرون نمی‌روند */
  if(id!=='forgot'){ APP.forgotStep=0; }
  if(id!=='signup'){ APP.signupStep=0; }
  if(id==='today'){ /* آب از state مشترک می‌آید */ }
};

window.INNER_CLICK=function(e){
  var t;

  /* --- نمایش/پنهان رمز --- */
  if((t=e.target.closest('[data-pw]'))){
    var inp=t.parentNode.querySelector('input');
    inp.type=inp.type==='password'?'text':'password';
    t.setAttribute('aria-label',inp.type==='password'?'نمایش رمز':'پنهان‌کردن رمز');
    return;
  }

  /* --- پرکردن نمونه (فقط برای بازبینی) --- */
  if((t=e.target.closest('[data-demostep]'))){
    var w=t.dataset.demostep;
    function setv(id,v){ var el=document.getElementById(id); if(el) el.value=v; }
    if(w==='login'){ setv('li','sara'); setv('lp','joma1234'); toast('نمونه پر شد — «ورود» را بزن'); }
    if(w==='signup'){ setv('su','sara'); setv('sp','joma1234'); setv('sp2','joma1234'); setv('sm','09123456789');
      setv('sfg','090123'); toast('نمونه پر شد — می‌توانی «ادامه» بزنی'); }
    if(w==='forgot'){ setv('fgi','sara'); setv('fgc','090123'); toast('نمونه پر شد'); }
    return;
  }
  /* --- ورود: خطای مشترک --- */
  if(e.target.closest('[data-login]')) return doLogin();
  if(e.target.closest('[data-signup]')) return doSignup();

  /* --- حال من --- */
  if((t=e.target.closest('[data-mood]'))){
    var s=MOOD_STEPS[APP.moodStep];
    APP.moodAnswers[s.k]=+t.dataset.mood;
    render();
    /* انتخاب، خودش می‌رود قدم بعد — کاربر لازم نیست «بعدی» بزند */
    clearTimeout(_moodT);
    _moodT=setTimeout(moodNext,520);
    return;
  }
  if(e.target.closest('[data-mood-skip]')){ clearTimeout(_moodT); moodNext(); return; }
  if(e.target.closest('[data-mood-prev]')){
    clearTimeout(_moodT);
    if(APP.moodStep>0) APP.moodStep--; render(); return; }
  if(e.target.closest('[data-mood-reset]')){ APP.moodAnswers={}; APP.moodStep=0; render(); return; }

  /* --- چهره‌های خانه و لندینگ --- */
  if((t=e.target.closest('[data-face],[data-demo-face]'))){
    var i=+(t.dataset.face!==undefined?t.dataset.face:t.dataset.demoFace);
    APP.moodAnswers.mood=i; APP.moodStep=1;
    if(t.dataset.demoFace!==undefined){ location.hash='#mood'; APP.moodStep=1; render(); }
    else render();
    toast('حالت ثبت شد — بقیهٔ قدم‌ها هم هست، ولی اختیاری');
    return;
  }

  /* --- تب‌های تناوب --- */
  if((t=e.target.closest('[data-tab]'))){
    var sib=t.parentNode.querySelectorAll('button');
    for(var i2=0;i2<sib.length;i2++) sib[i2].classList.remove('on');
    t.classList.add('on');
    toast('نمایش نمونه — در محصول، تب‌ها از برنامهٔ همان دوره می‌آیند');
    return;
  }


  /* ---------- جوجه ---------- */
  if(e.target.closest('[data-petchick]')){
    /* لمس = واکنش، بدون پاداش: پرش کوتاه + جیک. حالت شاد فقط لحظه‌ای است. */
    var st=document.querySelector('.pet-stage');
    if(!st) return;
    if(APP.petSleep){ chickSnd('snore'); return; }
    var art=st.querySelector('.chsvg');
    st.classList.remove('pop'); void st.offsetWidth; st.classList.add('pop');
    if(art){
      art.classList.remove('chhappy'); void art.offsetWidth; art.classList.add('chhappy');
      var sp=art.querySelector('.chspark'); if(sp) sp.classList.add('on');
      setTimeout(function(){ art.classList.remove('chhappy'); if(sp) sp.classList.remove('on'); },700);
    }
    chickSnd('chirp'); return;
  }

  if((t=e.target.closest('[data-petmode]'))){
    var m=t.dataset.petmode;
    if(m==='pale'){ APP.petMood='pale'; render(); toast('۳ تا ۵ روز بی‌ثبت — کم‌رنگ می‌شود، ولی هیچ‌وقت نمی‌میرد'); return; }
    if(m==='miss'){ APP.petMood='miss'; render(); toast('۶ روز یا بیشتر — خاکستری: نشانگر «نیازمند توجه»، بدون سرزنش و بدون عدد'); return; }
    if(m==='pet'){ APP.petMood='pet'; render(); return; }
    if(m==='blink'){ APP.petMood='ok'; render(); toast('پلک‌زدن خودکار است — هر چند ثانیه'); return; }
    APP.petMood=m; APP.petSleep=(m==='sleep'); render();
    if(m==='sleep') chickSnd('snore'); else if(m==='happy') chirpSnd();
    return;
  }

  if(e.target.closest('[data-petpet]')){
    /* petGate: نوازش پاداش نمی‌دهد و پشت‌سرهم، واکنش را کم می‌کند (سند ۱۴ §۰ پردهٔ ۷)
       ۴ لمس در دقیقه → فقط خرخر، بی‌حباب · ۸ لمس → فقط یک پلک */
    var nowT=(typeof Date==='function')?Date.now():0;
    if(!Array.isArray(APP.petTouches)) APP.petTouches=[];
    APP.petTouches=APP.petTouches.filter(function(x){ return (nowT-x)<60000; });
    APP.petTouches.push(nowT);
    var nTouch=APP.petTouches.length;

    var a2=document.querySelector('.pet-stage .chsvg');
    var st2=document.querySelector('.pet-stage');
    if(!st2) return;                     /* صحنهٔ جوجه در این صفحه نیست */
    st2.classList.remove('pop'); void st2.offsetWidth; st2.classList.add('pop');

    if(nTouch>=8){
      /* فقط یک پلک — بدون صدا، بدون حباب */
      if(a2){ a2.classList.remove('chblink'); void a2.offsetWidth; a2.classList.add('chblink'); }
      toast('یک پلک زد — بس است دیگر 😊  (۸ لمس در یک دقیقه)');
      return;
    }
    if(a2){ a2.classList.remove('chpet'); void a2.offsetWidth; a2.classList.add('chpet');
      setTimeout(function(){ a2.classList.remove('chpet'); },900); }
    if(APP.petSleep){ chickSnd('snore'); toast('خواب است؛ فقط خروپف نرم 😴'); return; }
    chickSnd('purr');
    if(nTouch>=4){
      toast('خرخر کرد — حباب نمی‌سازد (۴ لمس در یک دقیقه)');
      return;
    }
    var lines=['چی چی!','خوشحالم که هستی.','امروز هم منتظرت بودم.','یک قدم هم برایم عالمی دارد.','کنارتم 🤍'];
    toast(lines[Math.floor(Math.random()*lines.length)]+' — نوازش، پاداش نمی‌دهد');
    return;
  }

  /* --- تغییر اسم: فقط یک بار، با تأیید (سند ۱۴ §۰ پردهٔ ۹) --- */
  if(e.target.closest('[data-petrename]')){
    if((APP.petRenames||0)>=2){ toast('اسم دو بار عوض شد — دیگر نمی‌شود'); return; }
    if((APP.petRenames||0)===1){
      modal('<h3>مطمئنی؟</h3><p class="tiny">این <b>آخرین بار</b> است که می‌شود اسم را عوض کرد. '+
        'بعد از این، اسم همین می‌ماند.</p>'+
        '<div class="acts"><button class="btn ghost sm" data-close>نه، همین خوب است</button>'+
        '<span class="sp"></span><button class="btn primary sm" data-petrename-yes>بله، مطمئنم</button></div>');
      return;
    }
    APP.petRenames=(APP.petRenames||0)+1;
    APP.petName='';
    render(); toast('اسم تازه را بنویس — این تنها فرصت تغییر است');
    return;
  }
  if(e.target.closest('[data-petrename-yes]')){
    closeModal();
    APP.petRenames=2; APP.petName=''; render();
    toast('آخرین تغییر اسم — بنویس');
    return;
  }
  if(e.target.closest('[data-petsnd]')){
    APP.sound=!APP.sound; render();
    if(APP.sound) chickSnd('chirp');
    return;
  }
  if(e.target.closest('[data-petname]')){
    var v=(document.getElementById('petname')||{}).value||'';
    v=v.trim();
    if(v.length<2||v.length>16){ toast('اسم باید بین ۲ تا ۱۶ حرف باشد'); return; }
    APP.petName=v; APP.petRenames=Math.max(APP.petRenames||0,1); render();
    toast('اسمش شد «'+v+'» — خوش آمدی 🐣'+(APP.petRenames>=2?' (دیگر عوض نمی‌شود)':'')); return;
  }
  if(e.target.closest('[data-petlater]')){ toast('باشه، بعداً — اسم پیش‌فرض «جوجهٔ من» می‌ماند'); return; }

  /* ---------- دفترچه ---------- */
  if((t=e.target.closest('[data-jf]'))){ APP.journalFilter=t.dataset.jf; render(); return; }
  if(e.target.closest('[data-notuseful]')){ toast('ثبت شد — دفترچه یاد می‌گیرد چه چیزی برایت مفید است'); return; }
  if(e.target.closest('[data-dismiss]')){ toast('بسته شد — از فهرست می‌رود، ولی در تاریخچه می‌ماند'); return; }
  if((t=e.target.closest('[data-ev]'))){
    modal('<h3>این برداشت از کجا آمده؟</h3>'+
      '<p class="tiny">جوما هر بینش را با دادهٔ خام پشتش نشان می‌دهد — تا خودت قضاوت کنی.</p>'+
      '<div class="evidence"><b>نمونهٔ داده:</b><table>'+
      [['روز','خواب','پیاده‌روی'],['۱ مرداد','۴','۲۰ دقیقه'],['۲ مرداد','۵','۳۵ دقیقه'],['۳ مرداد','۳','۰ دقیقه'],['۴ مرداد','۵','۲۵ دقیقه']]
      .map(function(r,i){return '<tr>'+r.map(function(c){return (i?'<td class="num">':'<th>')+c+(i?'</td>':'</th>');}).join('')+'</tr>';}).join('')+
      '</table>'+
      '<p class="tiny" style="margin-top:8px">۲۱ جفت داده · بازهٔ ۱ تا ۳۱ مرداد · همبستگی، علت را نشان نمی‌دهد.</p></div>'+
      '<div class="acts"><button class="btn ghost sm" data-close>بستن</button></div>');
    return;
  }
  if(e.target.closest('[data-vocab]')){
    modal('<h3>این عددها یعنی چه؟</h3>'+
      '<div class="kv"><span>مقداری که ثبت کرده‌ای</span><b>«۷٫۵ ساعت»</b></div>'+
      '<div class="kv"><span>هدف</span><b>«هدف: ۸ ساعت»</b></div>'+
      '<div class="kv"><span>هدف را چقدر برآورده کردی</span><b>درصد</b></div>'+
      '<div class="kv"><span>چقدر داده داری</span><b>درصد پوشش</b></div>'+
      '<div class="kv"><span>موفقیت کلی</span><b>درصد</b></div>'+
      '<div class="kv"><span>ثبت‌نشده</span><b>«ثبت نشده» — هرگز صفر</b></div>'+
      '<div class="acts"><button class="btn ghost sm" data-close>بستن</button></div>');
    return;
  }

  /* ---------- گزارش‌ها ---------- */
  if((t=e.target.closest('[data-rtab]'))){ APP.reportTab=t.dataset.rtab; render(); return; }
  if(e.target.closest('[data-nodatatoggle]')){ APP.reportNoData=!APP.reportNoData; render(); return; }

  /* ---------- برنامه ---------- */
  if(e.target.closest('[data-planstatus]')){
    var seq=['DRAFT','PLANNING','RUNNING','ARCHIVED'];
    var at=seq.indexOf(APP.planStatus||'RUNNING');
    APP.planStatus=seq[(at+1)%seq.length]; render();
    toast('وضعیت دوره: '+({DRAFT:'پیش‌نویس',PLANNING:'در حال آماده‌سازی',RUNNING:'در حال اجرا',ARCHIVED:'بایگانی‌شده'})[APP.planStatus]);
    return;
  }
  if((t=e.target.closest('[data-ptab]'))){ APP.planTab=t.dataset.ptab; render(); return; }
  if((t=e.target.closest('[data-actmenu]'))){
    modal('<h3>اقدام‌های این فعالیت</h3>'+
      '<p class="tiny">این دوره <b>باز</b> است (پیش‌نویس یا آماده‌سازی) — پس هر دو اقدام مجاز است.</p>'+
      '<div class="acts" style="flex-direction:column;align-items:stretch">'+
      '<button class="btn soft sm">تنظیم هدف</button>'+
      '<button class="btn ghost sm" style="color:var(--coral-ink)">حذف از برنامه</button>'+
      '<button class="btn ghost sm" data-close>بستن</button></div>');
    return;
  }
  if(e.target.closest('[data-planact]')){
    var label=e.target.closest('[data-planact]').dataset.planact;
    if(label==='شروع این دوره'){
      modal('<h3>این دوره را شروع کنیم؟</h3>'+
        '<p class="tiny">با شروع، <b>محتوای برنامه قفل می‌شود</b>: نه فعالیتی اضافه می‌شود، نه حذف، و نه هدفی عوض می‌شود — تا پایان دوره.</p>'+
        '<div class="banner info" style="margin-top:10px">'+ic('i-info')+
        'اگر می‌خواهی هدفی را عوض کنی، همین حالا عوض کن؛ بعد از شروع امکانش نیست.</div>'+
        '<div class="acts"><button class="btn ghost sm" data-close>فعلاً نه</button>'+
        '<span class="sp"></span><button class="btn primary sm" data-planstart>می‌فهمم، اجرا را شروع کن</button></div>');
      return;
    }
    if(label==='بایگانی'){
      modal('<h3>این دوره را بایگانی کنیم؟</h3>'+
        '<p class="tiny">بایگانی یعنی دوره تمام شده. گزارش‌هایش می‌مانند و خواندنی‌اند، ولی ثبت تازه در آن ممکن نیست.</p>'+
        '<div class="acts"><button class="btn ghost sm" data-close>فعلاً نه</button>'+
        '<span class="sp"></span><button class="btn soft sm" data-close>بایگانی کن</button></div>');
      return;
    }
    toast('نمایش نمونه: «'+label+'» در محصول، به مسیر خودش می‌رود');
    return;
  }
  if(e.target.closest('[data-planstart]')){ closeModal(); toast('اجرا شروع شد — برنامه قفل شد'); return; }

  /* ---------- کتابخانه ---------- */
  if((t=e.target.closest('[data-libpath]'))){ APP.libPath=t.dataset.libpath; render(); return; }
  if(e.target.closest('[data-libclear]')){ APP.libQuery=''; render(); return; }
  if(e.target.closest('[data-libreset]')){ APP.libQuery=''; APP.libPath='all'; render(); return; }
  if((t=e.target.closest('[data-addplan]'))){ APP._lastAddedSchema=/طرح‌واره/.test(t.dataset.addplan); addToPlan(t.dataset.addplan); return; }
  if((t=e.target.closest('[data-actdetail]'))){
    modal('<h3>'+t.dataset.actdetail+'</h3>'+
      '<p class="tiny">جزئیات فعالیت: توضیح کامل، تناوب، واحد، و اینکه هدفش در برنامه چطور ثبت می‌شود.</p>'+
      '<div class="kv"><span>تناوب</span><b>روزانه</b></div>'+
      '<div class="kv"><span>واحد</span><b>دقیقه</b></div>'+
      '<div class="acts"><button class="btn primary sm" data-addplan2>افزودن به برنامه</button>'+
      '<button class="btn ghost sm" data-close>بستن</button></div>');
    return;
  }
  if(e.target.closest('[data-addplan2]')){ closeModal(); addToPlan('این فعالیت'); return; }





  /* ---------- ورود/ثبت‌نام/فراموشی ---------- */
  if((t=e.target.closest('[data-authtab]'))){ e.preventDefault(); location.hash='#'+t.dataset.authtab; return; }
  if(e.target.closest('[data-sendcode]')){ toast('کد یک‌بارمصرف صادر شد — ۱۵ دقیقه اعتبار'); return; }

  /* --- ثبت‌نام: پنج گام، بخش‌های مرتبط با هم (سند ۲۲ §۳.۷) --- */
  if((t=e.target.closest('[data-sstep]'))){
    var dir=t.dataset.sstep, cur=APP.signupStep||0;
    if(dir==='prev'){ APP.signupStep=Math.max(0,cur-1); render(); return; }
    if(!signupRead(cur)) return;
    APP.signupStep=Math.min(4,cur+1); render();
    toast(APP.signupStep===4?'خوب است — یک قدم مانده':'گام '+fa(APP.signupStep+1)+' از ۵');
    return;
  }

  /* --- بازیابی رمز: چهار گام (§۴ سند ۲۲) --- */
  if((t=e.target.closest('[data-fg]'))){
    var fg=t.dataset.fg;
    if(fg==='id'){ var idv=document.getElementById('fgi'); APP.forgotId=idv?idv.value:''; APP.forgotStep=1; render();
      toast('اگر این شناسه حسابی داشته باشد، کد برایش صادر می‌شود'); return; }
    if(fg==='code'){ var cv=document.getElementById('fgc');
      if(!cv||(cv.value||'').replace(/\D/g,'').length<6){ toast('کد ۶ رقمی را از پشتیبانی بگیر'); if(cv) cv.focus(); return; }
      APP.forgotCode=cv.value; APP.forgotStep=2; render(); toast('کد درست است'); return; }
    if(fg==='save'){ var p1=document.getElementById('fp1');
      if(!p1||(p1.value||'').length<8){ toast('رمز تازه حداقل ۸ نویسه باشد'); if(p1) p1.focus(); return; }
      APP.forgotStep=3; render(); toast('رمز عوض شد — همهٔ نشست‌ها باطل شد'); return; }
    if(fg==='back'){ APP.forgotStep=0; render(); return; }
    if(fg==='login'){ location.hash='#login'; return; }
    return;
  }
  /* --- جملهٔ شخصی در ثبت حال --- */
  if(e.target.closest('[data-mood-note-save]')){ APP.moodStep=MOOD_STEPS.length+1; render();
    toast('ثبت شد — جمله‌ات فقط برای خودت است'); return; }
  if(e.target.closest('[data-mood-note-skip]')){ APP.moodStep=MOOD_STEPS.length+1; render(); return; }
  if(e.target.closest('[data-mood-note-edit]')){ APP.moodStep=MOOD_STEPS.length; render();
    var nt=document.querySelector('[data-moodnote]'); if(nt) nt.focus(); return; }
  /* --- جوجه: بخوابانش / بیدارش کن (سند ۱۴ §۰ پردهٔ ۶) --- */
  if(e.target.closest('[data-petsleep]')){
    APP.petSleep=!APP.petSleep;
    if(APP.petSleep){
      APP._petMoodBefore=(APP.petMood&&APP.petMood!=='sleep')?APP.petMood:'ok';
      APP.petMood='sleep'; chickSnd('snore');
      toast('جوجه خوابید — شب بخیر 🌙 (بی‌پاداش، فقط واکنش)');
    }else{
      APP.petMood=(APP._petMoodBefore&&APP._petMoodBefore!=='sleep')?APP._petMoodBefore:'ok';
      APP._petMoodBefore=null; if(APP.sound) chickSnd('chirp');
      toast('جوجه بیدار شد — صبح بخیر ☀️');
    }
    render(); return; }
  /* هر دو کنترل خواب با هم هم‌گام می‌مانند */
  if(e.target.closest('[data-petwake]')){ APP.petSleep=false; APP.petMood='ok'; render();
    toast('بیدار شد ☀️'); return; }
  /* --- نمایش موبایل (ابزار بازبینی) --- */
  if(e.target.closest('[data-mobile]')){ APP.mobile=!APP.mobile; render();
    toast(APP.mobile?'نمای موبایل — همان صفحه، قالب باریک':'نمای دسکتاپ'); return; }
  /* --- سوییچ مستقیم نقش --- */
  if((t=e.target.closest('[data-roleto]'))){ APP.roleView=t.dataset.roleto; render();
    toast(APP.roleView==='client'?'به نقش کاربری برگشتی — همه‌چیز مثل هر کاربر دیگری':'حالت مشاور'); return; }
  if(e.target.closest('[data-auth]')){
    var a=e.target.closest('[data-auth]').dataset.auth;
    if(a==='signup'){
      /* همان فرم کامل: تیک قوانین + تطابق دو رمز + طول رمز */
      var ebox=document.getElementById('autherr');
      var pw=document.getElementById('sp'), pw2=document.getElementById('sp2');
      var errs=[];
      if(!APP.authTerms) errs.push('تیک «قوانین و مقررات و سیاست حفظ حریم خصوصی را خوانده‌ام و می‌پذیرم» را بزن.');
      if(pw&&pw2&&pw.value&&pw2.value&&pw.value!==pw2.value) errs.push('دو رمز یکی نیستند — همان‌جا اصلاح کن.');
      if(pw&&pw.value&&pw.value.length<8) errs.push('رمز باید حداقل ۸ نویسه باشد.');
      if(errs.length){
        if(ebox) ebox.innerHTML='<div class="banner err" style="margin:10px 0 12px">'+ic('i-info')+errs.join('<br>')+'</div>';
        toast('چند چیز مانده — بالا نوشته شده');
        return;
      }
      toast('حسابت ساخته شد — برویم اولین برنامه را بسازیم');
      location.hash='#home'; return;
    }
    if(a==='forgot'){ toast('نمایشی: تا حل SEC-01 مسیر بازیابی فعال نمی‌شود — با پشتیبانی تماس بگیر'); return; }
    toast('خوش برگشتی — ورود انجام شد (نمایشی)');
    return;
  }

  /* ---------- تمرین تنفس ۴-۷-۸ ---------- */
  if(e.target.closest('[data-breathopen]')){ clearTimeout(_moodT); brOpen(); return; }
  if(e.target.closest('[data-breathlater]')){ toast('باشه — هر وقت خواستی، از «کارهای امروز» شروع کن'); return; }
  if(e.target.closest('[data-brstart]')){ if(window.brPrime) brPrime(); brStart(); return; }
  if(e.target.closest('[data-brstop]')){ brStop(); toast('مکث کرد — هر وقت خواستی «شروع» را بزن'); return; }
  if(e.target.closest('[data-brx]')){ brClose(); return; }
  if(e.target.closest('[data-brmood]')){ brClose(); APP.moodStep=0; location.hash='#mood'; render(); return; }
  if((t=e.target.closest('[data-brsnd]'))){
    BR.sound=!BR.sound;
    if(window.brPrimeEls) brPrimeEls();
    if(BR.sound){
      if(window.brPrime) brPrime();
      var got=brSample();       /* همان لحظه نمونهٔ «دم» را می‌شنوی */
      if(got==='tone' && brVoiceState()==='loading')
        toast('صدادار شد — فایل در حال آماده‌شدن است؛ همین حالا هم متن راهنما زیر دایره هست');
      else if(got==='tone')
        toast('این مرورگر صدا را پخش نکرد — متن هر مرحله زیر دایره نوشته می‌شود');
      else
        toast('صدای راهنما روشن شد — «از بینی، آرام دم بگیر» سرِ هر مرحله');
    } else { if(window.brVoiceStop) brVoiceStop(); toast('بی‌صدا شد — متن راهنما می‌ماند'); }
    if(window.brPaint) brPaint();
    return;
  }

  /* ---------- ثبت‌نام: نقش «سایر»، کد امنیتی، تیک قوانین ---------- */
  if(e.target.closest('[data-authcode]')){
    /* پیامک سیستم وصل نیست — کد دستی از پشتیبانی (اتحاد شاخه‌ها) */
    APP.authCodeAsked=true; render();
    modal('<h3>کد ثبت‌نام را از پشتیبانی بگیر</h3>'+
      '<p class="tiny">سیستم پیامک ما وصل نیست؛ کد را دستی می‌دهیم تا حسابت را بسازی.</p>'+
      '<div class="sh-grid" style="margin-top:12px">'+
        '<div class="sh-card"><span class="sh-ic">'+ic('i-help')+'</span><b>پیامک</b>'+
          '<span class="sh-num num" dir="ltr">۰۹۹۶۷۹۷۹۴۷۱</span>'+
          '<div class="sh-act"><button class="btn primary sm" data-copy="09967979471">'+ic('i-save')+'کپی شماره</button></div></div>'+
        '<div class="sh-card"><span class="sh-ic ind">'+ic('i-chat')+'</span><b>پیام‌رسان بله</b>'+
          '<span class="sh-num num" dir="ltr">۰۹۹۶۷۹۷۹۴۷۱</span>'+
          '<div class="sh-act"><a class="btn primary sm" href="https://ble.ir" target="_blank" rel="noopener">'+ic('i-link')+'گفت‌وگو در بله</a></div></div>'+
      '</div>'+
      '<div class="tiny" style="margin-top:10px">متن آماده: «سلام، برای ثبت‌نام در جوما کد می‌خواهم.» — پاسخ معمول: کمتر از یک روز کاری (۹ تا ۲۱).</div>'+
      '<div class="acts"><button class="btn ghost sm" data-close>بستن</button></div>');
    return;
  }
  if((t=e.target.closest('[data-density]'))){ APP.density=t.dataset.density; render(); toast(APP.density==='compact'?'نمایش فشرده شد — هیچ محتوایی پنهان نشد':'نمایش راحت شد'); return; }
  if((t=e.target.closest('[data-tglcb]'))){
    if(t.dataset.tglcb==='terms'){ APP.authTerms=!APP.authTerms; render(); }
    else { t.classList.toggle('on'); toast('روی همین دستگاه به خاطر می‌سپاریم'); }
    return;
  }

  /* ---------- آموزش: فصل‌ها و مسیرها ---------- */
  if((t=e.target.closest('[data-educhap]'))){
    var k=t.dataset.educhap;
    APP.eduChap=(APP.eduChap===k?'':k);
    render(); return;
  }
  if((t=e.target.closest('[data-edupath]'))){
    APP.eduPath=t.dataset.edupath;
    APP.eduChap=(t.dataset.educhap||'');
    render(); return;
  }

  /* ---------- پرسش‌های پرتکرار · قالب خروجی · خروجی گزارش ---------- */
  if((t=e.target.closest('[data-faq]'))){
    APP.faqOpen=(APP.faqOpen===t.dataset.faq?'':t.dataset.faq);
    render(); return;
  }
  if((t=e.target.closest('[data-exportfmt]'))){ APP.exportFmt=t.dataset.exportfmt; render(); return; }
  if((t=e.target.closest('[data-export]'))){
    var ek=t.dataset.export;
    toast(ek==='image'?'تصویر نمودارها آماده می‌شود — همان چیزی که روی صفحه می‌بینی'
                     :'گزارش PDF ساخته می‌شود — فارسی، راست‌به‌چپ، با نمودارها');
    return;
  }
  if((t=e.target.closest('[data-copy]'))){
    try{ if(navigator&&navigator.clipboard) navigator.clipboard.writeText(t.dataset.copy); }catch(_){}
    toast('شماره کپی شد: ۰۹۹۶۷۹۷۹۴۷۱'); return;
  }
  if(e.target.closest('[data-repbuild]')){ toast('نمودار ترکیبی ساخته شد — هر دو سری با برچسب خودشان'); return; }

  /* ---------- تقویم مسیر ماه ---------- */
  if((t=e.target.closest('[data-cald]'))){
    var d=t.dataset.cald, n=parseInt(d.replace(/[۰-۹]/g,function(x){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(x);}),10);
    var isFuture=(typeof calStateOf==='function') && calStateOf(n)==='future';
    /* 🔴 B3 (handoff/09): روز آینده انتخاب نمی‌شود — فقط پیام می‌دهد.
       فرانت هم پیش‌دستی می‌کند تا درخواستی برای آینده ساخته نشود. */
    if(!isFuture){ APP.calDay=n; render(); }   /* انتخاب، همان‌جا زیر تقویم نشان داده می‌شود */
    var isMiss=(typeof calStateOf==='function') && calStateOf(n)==='miss';
    var isPart=(typeof calStateOf==='function') && calStateOf(n)==='part';
    var det=(CAL.info[n]||[])[1]||'برای این روز جزئیاتی ثبت نشده.';
    modal('<h3>'+fa(n)+' شهریور ۱۴۰۵</h3>'+
      '<div class="tiny" style="line-height:2">'+det+'</div>'+
      (isFuture?'<p class="tiny" style="margin-top:8px">این روز هنوز نیامده — ثبت برای آینده ممکن نیست.</p>'
        :isMiss?'<p class="tiny" style="margin-top:8px">اشکالی ندارد؛ روزهای بی‌ثبت هم بخشی از مسیرند و سرزنشی نیست.</p>':'')+
      '<div class="acts"><button class="btn ghost sm" data-close>بستن</button>'+
      (isFuture?'':'<span class="sp"></span><button class="btn soft sm" data-go="today">دیدن جزئیات روز</button>')+'</div>');
    return;
  }

  /* ---------- کارهای امروز: ± و انجام شد/نشد ---------- */
  if(e.target.closest('[data-plus]')||e.target.closest('[data-minus]')){
    var cell=e.target.closest('td'); var val=cell.querySelector('.numval b');
    if(val){ var n=parseInt(val.textContent.replace(/[۰-۹]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d);}),10)||0;
      n=e.target.closest('[data-plus]')?n+1:Math.max(0,n-1);
      val.textContent=fa(n); toast('مقدار شد '+fa(n)+' — تا ثبت نهایی پیش‌نویس است'); }
    return;
  }
  if(e.target.closest('[data-yes]')||e.target.closest('[data-no]')){
    var box=e.target.closest('.yesno');
    box.querySelectorAll('button').forEach(function(b){b.classList.remove('on');});
    e.target.closest('button').classList.add('on');
    toast(e.target.closest('[data-yes]')?'انجام شد — ثبت شد ✓':'انجام نشد — ثبت شد');
    return;
  }

  /* ---------- کتابخانه: فیلترها و افزودن فعالیت ---------- */
  if((t=e.target.closest('[data-libpath]'))){ APP.libPath=t.dataset.libpath; render(); return; }
  if(e.target.closest('[data-libclear]')){ APP.libQuery=''; render(); return; }
  if(e.target.closest('[data-libreset]')){ APP.libQuery=''; APP.libPath='all'; APP.libCat='همه دسته‌ها'; APP.libFreq='همه تناوب‌ها'; render(); return; }
  if(e.target.closest('[data-libmore]')){ toast('نمایش ۱۴ کارتِ بعدی — بارگذاری تدریجی، نه صفحهٔ تازه'); return; }
  if(e.target.closest('[data-liblock]')){ toast('غیرفعال‌کردن فعالیت، کار مدیر است — از کنسول'); return; }
  if(e.target.closest('[data-libnew]')){
    modal('<h3>افزودن فعالیت جدید</h3>'+
      '<p class="tiny">فعالیتی که خودت می‌سازی، فقط برای خودت است. فعالیت‌های رسمی را مدیر اضافه می‌کند.</p>'+
      '<div class="fld"><label class="lbl">نام فعالیت</label><input class="inp" placeholder="مثلاً شنا"></div>'+
      '<div class="fld"><label class="lbl">واحد اندازه‌گیری</label>'+
      '<select class="inp sel"><option>دقیقه</option><option>لیوان</option><option>تعداد</option><option>صفحه</option><option>مرتبه</option><option>کیلومتر</option></select></div>'+
      '<div class="fld"><label class="lbl">تناوب</label>'+
      '<select class="inp sel"><option>روزانه</option><option>هفتگی</option><option>ماهانه</option></select></div>'+
      '<div class="fld"><label class="lbl">هدف در هر نوبت</label><input class="inp num" inputmode="numeric" value="۲۰"></div>'+
      '<div class="banner info" style="margin-top:10px">'+ic('i-info')+
      'واحد را از بک‌اند می‌گیریم؛ همان واحدی که انتخاب می‌کنی، تعیین می‌کند در «کارهای امروز» مقدار چطور وارد شود (دکمه‌های + و − یا ساعت و دقیقه).</div>'+
      '<div class="acts"><button class="btn ghost sm" data-close>انصراف</button>'+
      '<span class="sp"></span><button class="btn primary sm" data-libnewok>افزودن</button></div>');
    return;
  }
  if(e.target.closest('[data-libnewok]')){ closeModal(); toast('فعالیت ساخته شد — در فهرست خودت می‌آید'); return; }

  /* ---------- آموزش ---------- */
  if((t=e.target.closest('[data-edutab]'))){ APP.eduTab=t.dataset.edutab; render(); return; }
  if((t=e.target.closest('[data-gostep]'))){ go(t.dataset.gostep); return; }
  if((t=e.target.closest('[data-eduopen]'))){ toast('نمایش نمونه: «'+t.dataset.eduopen+'» باز می‌شود'); return; }


  /* ---------- هم‌مسیر ---------- */
  if(e.target.closest('[data-hamcancel]')){ toast('درخواست لغو شد'); return; }
  /* ---------- کارت دعوت یک‌بارهٔ هم‌مسیر ---------- */
  if(e.target.closest('[data-complater]')){
    APP.compInviteSeen=true; render();
    toast('باشه — هر وقت خواستی از منو ← «هم‌مسیر» پیدایش می‌کنی');
    return;
  }
  if(e.target.closest('[data-compopen]')){ APP.compInviteSeen=true; location.hash='#hammasir'; render(); return; }

  if(e.target.closest('[data-hamaccept]')){ APP.hamLink='ACTIVE'; render(); toast('ارتباط فعال شد — فقط مجوزهایی که روشن کردی'); return; }
  if(e.target.closest('[data-hamdecline]')){ APP.hamLink='DECLINED'; render(); toast('رد شد — بدون ارسال دلیل'); return; }
  if(e.target.closest('[data-hamcut]')){
    modal('<h3>ارتباط با دکتر مینا رستمی قطع شود؟</h3>'+
      '<p class="tiny">او دیگر به اطلاعات تو دسترسی ندارد. گفت‌وگوهای قبلی باقی می‌مانند'+
      ' <span class="tiny muted">(این جمله از بک‌اند می‌آید — ۱۷٫۳)</span>.</p>'+
      '<div class="acts"><button class="btn ghost sm" data-close>انصراف</button>'+
      '<span class="sp"></span><button class="btn danger sm" data-hamcut2>قطع کن</button></div>');
    return;
  }
  if(e.target.closest('[data-hamcut2]')){ closeModal(); APP.hamLink='REVOKED'; render(); toast('ارتباط قطع شد — دسترسی از همین لحظه بسته شد'); return; }
  if(e.target.closest('[data-hamoff]')){ toast('خاموش شد — یک کلیک، بدون تأیید و بدون توضیح‌خواهی'); return; }
  if(e.target.closest('[data-hamsend]')){ APP.hamLink='PENDING_OUT'; render(); toast('درخواست فرستاده شد — تا تأیید او و تأیید تو، هیچ داده‌ای رد و بدل نمی‌شود'); return; }
  if(e.target.closest('[data-hamcode]')){ toast('نمایش نمونه: ورود کد دعوت مشاور'); return; }
  if(e.target.closest('[data-cliopen]')){ APP.hamRole='companion'; render(); toast('صفحهٔ مراجع — فقط بخش‌های مجاز رندر می‌شود'); return; }
  if(e.target.closest('[data-dm]')){
    modal('<h3>گفت‌وگو</h3><p class="tiny">سهمیه و فاصله از بک‌اند می‌آید: ۳ پیام در روز برای مراجع، ۲۰ برای همراه، فاصلهٔ حداقلی ۵ ثانیه. '+
      'اگر هر دو مجوز پیام روشن نباشد، جعبهٔ نوشتن <b>حذف</b> می‌شود — بدون گفتن اینکه کدام مجوز خاموش است.</p>'+
      '<div class="acts"><button class="btn ghost sm" data-close>باشه</button></div>');
    return;
  }
  if(e.target.closest('[data-send-dm]')){ toast('فرستاده شد — سهمیهٔ امروز تمام شد'); return; }

  /* ---------- تنظیمات ---------- */
  if((t=e.target.closest('[data-settab]'))){ APP.setTab=t.dataset.settab; render(); return; }
  if((t=e.target.closest('[data-settheme]'))){ APP.theme=t.dataset.settheme; render(); toast('تم ذخیره شد'+(APP.theme==='classic'?' — کلاسیک':' — شیشه')); return; }
  if(e.target.closest('[data-editname]')){ toast('نمایش نمونه: ویرایش نام نمایشی'); return; }
  if(e.target.closest('[data-logout]')){
    modal('<h3>از حسابت بیرون بیایی؟</h3><p class="tiny">ثبت‌های قطعی‌ات محفوظ می‌مانند.</p>'+
      '<div class="acts"><button class="btn ghost sm" data-close>بمان</button>'+
      '<span class="sp"></span><button class="btn soft sm" data-close>خروج</button></div>');
    return;
  }

  /* ---------- نقش‌ها ---------- */
  if((t=e.target.closest('[data-roleview]'))){
    var rk=t.dataset.roleview;
    if(rk==='admin'){ toast('این نقش را نداری — تب هم نمایش داده نمی‌شود'); return; }
    APP.roleView=rk; render(); toast('داشبورد نقش عوض شد — مجوز عوض نمی‌شود');
    return;
  }

  /* ---------- کنسول مدیر ---------- */
  if((t=e.target.closest('[data-admsec]'))){ APP.admSec=t.dataset.admsec; render(); return; }
  if(e.target.closest('[data-admrolestep]')||e.target.closest('[data-admrole]')){
    var R=APP.admRoles||['client'];
    var row=function(k,label,desc){
      var has=R.indexOf(k)>=0;
      return '<label class="role-row '+(has?'on':'')+'" data-admtoggle="'+k+'">'+
        '<span class="cb'+(has?' on':'')+'"></span><div><b>'+label+'</b>'+
        '<div class="tiny">'+desc+'</div></div><span class="sp"></span>'+
        (has?'<span class="chip g" style="font-size:10px">دارد</span>':'')+'</label>';
    };
    modal('<h3>نقش‌های حساب سارا نمونه</h3>'+
      '<p class="tiny">این‌ها <b>نقش حساب</b>‌اند (<span class="num">role_key</span>). هر تغییر، تأیید و لاگ می‌خواهد.</p>'+
      row('client','کاربری','همیشه هست؛ برداشته نمی‌شود.')+
      row('coach','مربی (coach)','نقش حساب است، نه قابلیت مشاور. در اجرا با عضو یکی است.')+
      row('admin','مدیر','دسترسی کامل به کنسول؛ با تأیید دو مرحله‌ای.')+
      '<div class="banner warn" style="margin-top:10px">'+ic('i-info')+
      '<b>«مشاور» یک نقش حساب نیست.</b> قابلیت مشاور از ردیف <span class="num">providers</span> می‌آید — '+
      'با دکمهٔ «مشاورش کن» در همین جدول.</div>'+
      '<div class="acts"><button class="btn ghost sm" data-close>بستن</button></div>');
    return;
  }
  if((t2=e.target.closest('[data-admtoggle]'))){
    var rk=t2.dataset.admtoggle;
    if(rk==='client'){ toast('نقش کاربری همیشه هست و برداشته نمی‌شود'); return; }
    var RR=APP.admRoles||['client'];
    var ix=RR.indexOf(rk);
    if(ix>=0){ RR=RR.filter(function(x){return x!==rk;}); }
    else { RR=RR.concat([rk]); }
    APP.admRoles=RR; closeModal();
    if(rk==='admin'&&ix<0){
      modal('<h3>سارا نمونه مدیر شود؟</h3>'+
        '<p class="tiny">مدیر به همهٔ بخش‌های مدیریتی دسترسی دارد و می‌تواند به دیگران هم نقش بدهد.<br>'+
        'موقعیت‌های قبلی او: مشاور · ۴ مراجع باز <span class="muted">(از بک‌اند)</span></p>'+
        '<div class="acts"><button class="btn ghost sm" data-close>انصراف</button>'+
        '<span class="sp"></span><button class="btn primary sm" data-admyes>بله، مدیر شود</button></div>');
      return;
    }
    render(); toast(ix>=0?'نقش از او گرفته شد — با لاگ':'نقش داده شد — با لاگ'); return;
  }
  if(e.target.closest('[data-admprovider]')){
    var on=(APP.admProvider==='ACTIVE');
    if(on){
      modal('<h3>قابلیت مشاور از سارا نمونه گرفته شود؟</h3>'+
        '<p class="tiny">او از <b>فهرست مشاوران</b> و از دراپ‌داون کاربران حذف می‌شود.<br>'+
        'اگر <b>رابطهٔ باز</b> دارد، اول باید بسته شود — وگرنه این کار ممکن نیست.</p>'+
        '<div class="acts"><button class="btn ghost sm" data-close>انصراف</button>'+
        '<span class="sp"></span><button class="btn danger sm" data-admprovideroff>بگیر</button></div>');
    } else {
      modal('<h3>سارا نمونه مشاور شود؟</h3>'+
        '<p class="tiny">این کار <b>قابلیت مشاور</b> می‌دهد، نه دسترسی به دادهٔ کسی:</p>'+
        '<div class="kv"><span>ردیف <span class="num">providers</span></span><b>فعال می‌شود</b></div>'+
        '<div class="kv"><span>در فهرست مشاوران کاربران</span><b>دیده می‌شود</b></div>'+
        '<div class="kv"><span>حالت «مشاور» در صفحهٔ هم‌مسیر او</span><b>فعال می‌شود</b></div>'+
        '<div class="kv"><span>دادهٔ هیچ کاربری</span><b>خودکار نمی‌بیند</b></div>'+
        '<div class="banner info" style="margin-top:10px">'+ic('i-info')+
        'برای همراهی با کسی، باید از «افزودن مراجع» پیشنهاد بدهی و <b>خودِ کاربر</b> تأیید کند.</div>'+
        '<div class="acts"><button class="btn ghost sm" data-close>انصراف</button>'+
        '<span class="sp"></span><button class="btn primary sm" data-admprovideron>بله، مشاور شود</button></div>');
    }
    return;
  }
  if(e.target.closest('[data-admprovideron]')){ closeModal(); APP.admProvider='ACTIVE'; render();
    toast('قابلیت مشاور فعال شد — با لاگ (زمان، کاربر، مقدار قبل)'); return; }
  if(e.target.closest('[data-admprovideroff]')){ closeModal(); APP.admProvider='INACTIVE'; render();
    toast('قابلیت مشاور گرفته شد — دلیلش هم ثبت شد'); return; }
  if(e.target.closest('[data-admaddcoach]')){
    modal('<h3>کدام کاربر مشاور شود؟</h3>'+
      '<div class="searchbar">'+ic('i-search')+'<input class="inp" placeholder="جست‌وجوی نام یا نام کاربری…"></div>'+
      '<div class="term-list">'+
      ['سارا نمونه','رضا احمدی','نگار کریمی'].map(function(u){
        return '<button class="term-pick" data-admpickcoach="'+u+'">'+u+'<span class="tiny"> — کاربر</span></button>';}).join('')+
      '</div>'+
      note('فهرست کاربران از بک‌اند می‌آید. مشاورشدن <b>دسترسی به دادهٔ کسی نمی‌دهد</b>؛ فقط قابلیت است.')+
      '<div class="acts"><button class="btn ghost sm" data-close>بستن</button></div>');
    return;
  }
  if((t3=e.target.closest('[data-admpickcoach]'))){
    closeModal(); APP.admProvider='ACTIVE'; APP.admSec='coaches'; render();
    toast('«'+t3.dataset.admpickcoach+'» مشاور شد — ردیف providers فعال شد'); return;
  }
  if(e.target.closest('[data-admpropose]')){
    modal('<h3>مراجع پیشنهاد شود؟</h3>'+
      '<p class="tiny">مجوزها <b>خالی و روشن‌نشده</b> پیشنهاد می‌شوند؛ کاربر خودش می‌تواند کم یا زیاد کند.</p>'+
      '<div class="perm-list">'+
      ['خلاصهٔ وضعیت و پیشرفت کلی','پیشرفت و پوشش تجمیعی','جزئیات فعالیت‌ها','شاخص‌های حال من'].map(function(p){
        return '<label class="perm-row"><span class="cb"></span><span><b>'+p+'</b><em>پیش‌فرض خاموش — تصمیم کاربر</em></span></label>';}).join('')+
      '</div>'+
      '<div class="banner info" style="margin-top:10px">'+ic('i-info')+
      'تا <b>پذیرش کاربر</b> رابطه‌ای ساخته نمی‌شود و مشاور <b>هیچ داده‌ای</b> نمی‌بیند. اگر ۷ روز پاسخ ندهد، درخواست منقضی می‌شود.</div>'+
      '<div class="acts"><button class="btn ghost sm" data-close>انصراف</button>'+
      '<span class="sp"></span><button class="btn primary sm" data-admproposeok>پیشنهاد بفرست</button></div>');
    return;
  }
  if(e.target.closest('[data-admproposeok]')){ closeModal(); toast('پیشنهاد رفت — منتظر پذیرش کاربر'); return; }
  if(e.target.closest('[data-admblock]')){ toast('ممنوع — مشاور با رابطهٔ باز را نمی‌شود غیرفعال کرد'); return; }
  if(e.target.closest('[data-admkill]')){ toast('حذف کامل فقط با شرط صفر ارجاع و تأیید دوگانه — وگرنه غیرفعال‌سازی'); return; }

  /* ---------- صفحه‌های محتوایی ---------- */
  if((t=e.target.closest('[data-cpage]'))){ APP.contentPage=t.dataset.cpage; render(); return; }

  /* ---------- حقوق داده ---------- */
  if((t=e.target.closest('[data-rtstep]'))){ APP.rightsStep=t.dataset.rtstep; render(); return; }
  if(e.target.closest('[data-download]')){ toast('دانلود شد — لینک یک‌بارمصرف، انقضا ۷ روز'); return; }
  if(e.target.closest('[data-delconfirm]')){ toast('تأیید نهایی فقط با نوشتن «پاک کن» — در محصول واقعی، ساخت این جریان مشروط به OPEN-12 است'); return; }

  /* --- بازشدن ردیف --- */
  if((t=e.target.closest('[data-row]'))){
    var name=t.querySelector('b').textContent;
    modal('<h3>'+name+'</h3>'+
      '<p class="tiny">جزئیات ردیف: هدف، مقدار پیش‌نویس، ساعت آخرین تغییر، و تاریخچهٔ ثبت‌های همین دوره.</p>'+
      '<div class="sep"></div>'+
      '<div class="tiny">ردیفِ باز‌شده فقط <b>نمایش</b> می‌دهد. ویرایش مقدار تا پایان امروز مجاز است؛ '+
      'افزودن یا حذف فعالیت روی دورهٔ در حال اجرا مجاز نیست.</div>'+
      '<div class="acts"><button class="btn ghost sm" data-close>بستن</button></div>');
    return;
  }

  /* --- ذخیره / ثبت نهایی --- */
  if(e.target.closest('[data-save]')){ toast('پیش‌نویس ذخیره شد'); return; }
  if(e.target.closest('[data-final]')){
    modal('<h3>امروز را قطعی ثبت کنیم؟</h3>'+
      '<p class="tiny">پس از تأیید، امکان تغییر یا افزودن مقدار به ثبت امروز را نداری.</p>'+
      '<div class="banner info" style="margin-top:10px">اگر ممکن است امروز باز هم ثبت کنی، پیش‌نویس را باز نگه دار؛ '+
      'پایان روز خودکار ثبت می‌شود.</div>'+
      '<div class="acts"><button class="btn soft sm" data-close>فعلاً نه، قابل‌تغییر بماند</button>'+
      '<span class="sp"></span><button class="btn primary sm" data-final-ok>بله، ثبت قطعی</button></div>');
    return;
  }
  if(e.target.closest('[data-final-ok]')){
    closeModal(); toast('امروز قطعی ثبت شد ✓');
    return;
  }
};

/* ---------- ثبت‌نام گام‌به‌گام: هر گام فقط بخش‌های مربوط به خودش را می‌خواند ---------- */
function _v(id){ var el=document.getElementById(id); return el?String(el.value||'').trim():null; }
function signupRead(step){
  if(step===0){
    var n=_v('sn'), f=_v('sf');
    if(!n||n.length<2){ toast('اسم کوچکت را بنویس'); return false; }
    if(!f){ toast('نام خانوادگی را بنویس — فقط در پروفایل می‌ماند'); return false; }
    if(!APP.authGender){ toast('جنسیت را انتخاب کن (یا «ترجیح می‌دهم نگویم»)'); return false; }
    APP.authName=n; APP.authFamily=f; return true;
  }
  if(step===1){
    var j=_v('soc');
    if(!j){ toast('شغلت را از فهرست انتخاب کن'); return false; }
    APP.authJob=j; return true;
  }
  if(step===2){
    var u=_v('su'), p1=_v('sp'), p2=_v('sp2');
    if(!u||u.length<3){ toast('نام کاربری حداقل ۳ نویسه باشد'); return false; }
    if(!p1||p1.length<8){ toast('رمز حداقل ۸ نویسه باشد'); return false; }
    if(p1!==p2){ toast('دو رمز یکی نیستند'); return false; }
    APP.authUser=u; APP.authPass=p1; return true;
  }
  if(step===3){
    APP.mobilePhone=_v('sm')||APP.mobilePhone||'';
    return true;   /* تماس اختیاری است — در گام بعد هم می‌پرسیم */
  }
  return true;
}

/* ---------- ورود ---------- */
function doLogin(){
  var u=document.getElementById('li')||document.getElementById('u');
  var p=document.getElementById('lp')||document.getElementById('p');
  if(!u||!p){ toast('فیلدهای ورود پیدا نشد'); return; }
  var ebox=document.getElementById('autherr'), box=document.getElementById('authbox');
  var okU=u.value.trim().length>0, okP=p.value.length>0;
  u.classList.toggle('err',!okU); p.classList.toggle('err',!okP);
  box.querySelectorAll('.fe').forEach(function(x){x.remove();});
  if(!okU) u.insertAdjacentHTML('afterend','<span class="fe">نام کاربری را بنویس.</span>');
  if(!okP) p.insertAdjacentHTML('afterend','<span class="fe">رمز را بنویس.</span>');
  if(!okU||!okP){ ebox.innerHTML=''; return; }

  var btn=box.querySelector('[data-login]');
  btn.disabled=true; btn.textContent='در حال ورود…';
  setTimeout(function(){
    btn.disabled=false; btn.textContent='ورود';
    if(u.value==='sara'){
      APP.screen='home'; location.hash='#home';
      toast('خوش برگشتی سارا');
    } else {
      ebox.innerHTML='<div class="banner err" style="margin-bottom:12px">'+
        'نام کاربری یا رمز درست نیست. دقت کن یا با پشتیبانی تماس بگیر.</div>';
    }
  },700);
}
function doSignup(){
  var se=document.getElementById('se');
  if(!se.value.trim()){
    modal('<h3>بدون کانال بازیابی ادامه بدهیم؟</h3>'+
      '<p class="tiny">اگر شماره یا ایمیلت عوض شود، راه بازگشتی برای رمزت نمی‌ماند. '+
      'می‌توانی همین حالا اضافه کنی، یا بعداً در تنظیمات.</p>'+
      '<div class="acts"><button class="btn ghost sm" data-close>بعداً در تنظیمات</button>'+
      '<span class="sp"></span><button class="btn primary sm" data-signup-go>ادامه می‌دهم</button></div>');
    return;
  }
  APP.screen='home'; location.hash='#home';
  toast('حسابت ساخته شد — خوش آمدی سارا');
}
document.addEventListener('click',function(e){
  if(e.target.closest('[data-signup-go]')){ closeModal(); location.hash='#home'; }
});

/* ---------- قدرت رمز ---------- */
document.addEventListener('input',function(e){
  if(e.target.matches('[data-moodnote]')){ APP.moodNote=e.target.value; return; }
  if(!e.target.matches('[data-strength],[data-authpw]')) return;
  var v=e.target.value, sc=0;
  if(v.length>=8) sc++;
  if(/[A-Za-z]/.test(v)&&/[0-9]/.test(v)) sc++;
  if(v.length>=12) sc++;
  if(/[^A-Za-z0-9]/.test(v)) sc++;
  var bars=document.querySelectorAll('#str i');
  var cols=['var(--coral)','var(--gold)','var(--sky)','var(--ok)'];
  var txt=['کوتاه است — حداقل ۸ نویسه.','قابل حدس — حرف و عدد را ترکیب کن.',
           'خوب است.','قوی است — همین خوب است.'];
  for(var i=0;i<bars.length;i++) bars[i].style.background=(i<sc?cols[sc-1]:'var(--ring-track)');
  var t=document.getElementById('strtxt');
  if(t) t.textContent=(sc?txt[Math.min(sc-1,3)]:'حداقل ۸ نویسه — ترکیب حرف و عدد، نه فقط عدد.');
});

/* ---------- افزودن به برنامه: تصمیم بر اساس وضعیت دوره ---------- */
function addToPlan(name){
  var st=APP.planStatus||'DRAFT';
  if(st==='RUNNING'||st==='ARCHIVED'){
    modal('<h3>در دورهٔ در حال اجرا نمی‌شود</h3>'+
      '<p class="tiny">«'+name+'» به برنامهٔ در حال اجرا اضافه نمی‌شود — چون گزارش و وزن همین دوره عوض می‌شود.</p>'+
      '<div class="banner info" style="margin-top:10px">'+ic('i-info')+
      'دو راه داری: <b>دورهٔ نو با همین فعالیت‌ها</b> بسازی، یا در دورهٔ بعدی اضافه کنی.</div>'+
      '<div class="acts"><button class="btn ghost sm" data-close>باشه</button>'+
      '<span class="sp"></span><button class="btn primary sm" data-close>ساخت دورهٔ نو</button></div>');
    return;
  }
  /* سقف طرح‌واره: حداکثر ۳ در یک برنامه (اتحاد شاخه‌ها) */
  var isSchema=/طرح‌واره/.test(name);
  if(isSchema && (APP.schemaInPlan||0)>=3){
    modal('<h3>سقف طرح‌واره پر است</h3>'+
      '<p class="tiny">در یک برنامه حداکثر <b>۳ طرح‌واره</b> می‌شود — «'+name+'» چهارمی است. '+
      'سه‌تای فعلی را نگه دار، یا یکی را بردار و این را اضافه کن.</p>'+
      '<div class="banner info" style="margin-top:10px">'+ic('i-info')+
      'سه طرح‌واره، بیشترین چیزی است که در یک دوره واقعاً می‌شود رویش کار کرد.</div>'+
      '<div class="acts"><button class="btn ghost sm" data-close>باشه</button></div>');
    return;
  }
  modal('<h3>«'+name+'» را به برنامه اضافه کنیم؟</h3>'+
    '<p class="tiny">'+(st==='DRAFT'?'برنامه پیش‌نویس است — هر وقت خواستی می‌توانی عوضش کنی.':'برنامه در حال آماده‌سازی است.')+
    (isSchema?' <b>مسیر: طرح‌واره</b> — از ۳ جای این برنامه، این '+fa((APP.schemaInPlan||0)+1)+'ی است.':'')+'</p>'+
    '<div style="margin-top:10px"><label class="lbl">هدف این فعالیت در برنامه</label>'+
    '<input class="inp num" value="۸" inputmode="numeric"></div>'+
    '<div class="banner info" style="margin-top:10px">'+ic('i-info')+
    'این عدد، <b>اسنپ‌شات</b> می‌شود؛ اگر بعداً هدف کتابخانه عوض شود، هدف برنامهٔ تو تغییر نمی‌کند.</div>'+
    '<div class="acts"><button class="btn ghost sm" data-close>فعلاً نه</button>'+
    '<span class="sp"></span><button class="btn primary sm" data-addok>افزودن</button></div>');
}
document.addEventListener('click',function(e){
  if(e.target.closest('[data-addok]')){
    closeModal();
    if(APP._lastAddedSchema) APP.schemaInPlan=(APP.schemaInPlan||0)+1;
    toast('به برنامه اضافه شد — هدفش هم ثبت شد');
  }
});


/* ---------- جست‌وجوی کتابخانه ---------- */
document.addEventListener('input',function(e){
  if(!e.target.matches('[data-libq]')) return;
  APP.libQuery=e.target.value;
  var pos=e.target.selectionStart;
  var g=document.getElementById('wglasses'); /* refocus after render */
  render();
  var el=document.getElementById('libq');
  if(el){ el.focus(); try{ el.setSelectionRange(pos,pos); }catch(_){ } }
});

/* ---------- تغییر مقادیر کتابخانه با select ---------- */
document.addEventListener('change',function(e){
  if(e.target.id==='soc'){ APP.authJob=e.target.value; return; }
  if(e.target.matches('[data-libcat]')){ APP.libCat=e.target.value; render(); return; }
  if(e.target.matches('[data-libfreq]')){ APP.libFreq=e.target.value; render(); return; }
});
