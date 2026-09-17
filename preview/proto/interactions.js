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
    return;
  }
  if(e.target.closest('[data-mood-next]')){
    if(APP.moodStep<MOOD_STEPS.length-1) APP.moodStep++; else APP.moodStep=MOOD_STEPS.length;
    render(); return;
  }
  if(e.target.closest('[data-mood-prev]')){ if(APP.moodStep>0) APP.moodStep--; render(); return; }
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
