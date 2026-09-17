var _moodT=null;
function moodNext(){
  if(APP.moodStep<MOOD_STEPS.length-1) APP.moodStep++; else APP.moodStep=MOOD_STEPS.length;
  render();
}
/* ==========================================================================
   رفتار صفحه‌های نمونه — دستهٔ ۱
   ========================================================================== */
window.ON_SCREEN=function(id){
  if(id!=='mood'){ APP.moodStep=0; }
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
    var st=document.querySelector('.pet-stage');
    st.classList.remove('pop'); void st.offsetWidth; st.classList.add('pop');
    APP.petGrowthFull=!APP.petGrowthFull; return;
  }
  if(e.target.closest('[data-petname]')){
    var v=(document.getElementById('petname')||{}).value||'';
    v=v.trim();
    if(v.length<2||v.length>16){ toast('اسم باید بین ۲ تا ۱۶ حرف باشد'); return; }
    APP.petName=v; render(); toast('اسمش شد «'+v+'» — خوش آمدی 🐣'); return;
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
  if((t=e.target.closest('[data-addplan]'))){ addToPlan(t.dataset.addplan); return; }
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

  /* ---------- آموزش ---------- */
  if((t=e.target.closest('[data-edutab]'))){ APP.eduTab=t.dataset.edutab; render(); return; }
  if((t=e.target.closest('[data-gostep]'))){ go(t.dataset.gostep); return; }
  if((t=e.target.closest('[data-eduopen]'))){ toast('نمایش نمونه: «'+t.dataset.eduopen+'» باز می‌شود'); return; }

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

/* ---------- ورود ---------- */
function doLogin(){
  var u=document.getElementById('u'), p=document.getElementById('p');
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
  if(!e.target.matches('[data-strength]')) return;
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
  modal('<h3>«'+name+'» را به برنامه اضافه کنیم؟</h3>'+
    '<p class="tiny">'+(st==='DRAFT'?'برنامه پیش‌نویس است — هر وقت خواستی می‌توانی عوضش کنی.':'برنامه در حال آماده‌سازی است.')+'</p>'+
    '<div style="margin-top:10px"><label class="lbl">هدف این فعالیت در برنامه</label>'+
    '<input class="inp num" value="۸" inputmode="numeric"></div>'+
    '<div class="banner info" style="margin-top:10px">'+ic('i-info')+
    'این عدد، <b>اسنپ‌شات</b> می‌شود؛ اگر بعداً هدف کتابخانه عوض شود، هدف برنامهٔ تو تغییر نمی‌کند.</div>'+
    '<div class="acts"><button class="btn ghost sm" data-close>فعلاً نه</button>'+
    '<span class="sp"></span><button class="btn primary sm" data-addok>افزودن</button></div>');
}
document.addEventListener('click',function(e){
  if(e.target.closest('[data-addok]')){ closeModal(); toast('به برنامه اضافه شد — هدفش هم ثبت شد'); }
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
