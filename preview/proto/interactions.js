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
    /* لمس = واکنش، بدون پاداش: پرش کوتاه + جیک. حالت شاد فقط لحظه‌ای است. */
    var st=document.querySelector('.pet-stage');
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
    if(m==='blink'){ APP.petMood='ok'; render(); toast('پلک‌زدن خودکار است — هر چند ثانیه'); return; }
    APP.petMood=m; APP.petSleep=(m==='sleep'); render();
    if(m==='sleep') chickSnd('snore'); else if(m==='happy') chirpSnd();
    return;
  }

  if(e.target.closest('[data-petpet]')){
    var a2=document.querySelector('.pet-stage .chsvg');
    var st2=document.querySelector('.pet-stage');
    st2.classList.remove('pop'); void st2.offsetWidth; st2.classList.add('pop');
    if(a2){ a2.classList.remove('chpet'); void a2.offsetWidth; a2.classList.add('chpet');
      setTimeout(function(){ a2.classList.remove('chpet'); },900); }
    if(APP.petSleep) chickSnd('snore'); else chickSnd('purr');
    toast('خرخر کرد 🤍 — نوازش، پاداش نمی‌دهد؛ فقط دلش را باز می‌کند');
    return;
  }
  if(e.target.closest('[data-petsleep]')){
    APP.petSleep=!APP.petSleep; render();
    if(APP.petSleep) chickSnd('snore');
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





  /* ---------- ورود/ثبت‌نام/فراموشی ---------- */
  if((t=e.target.closest('[data-authtab]'))){ e.preventDefault(); APP.authTab=t.dataset.authtab; render(); return; }
  if(e.target.closest('[data-sendcode]')){ toast('کد یک‌بارمصرف فرستاده شد — ۱۵ دقیقه اعتبار'); return; }
  if(e.target.closest('[data-auth]')){
    var a=e.target.closest('[data-auth]').dataset.auth;
    if(a==='login') toast('خوش برگشتی — ورود انجام شد (نمایشی)');
    else toast('حساب ساخته شد — برویم اولین برنامه را بسازیم');
    return;
  }

  /* ---------- تقویم مسیر ماه ---------- */
  if((t=e.target.closest('[data-cald]'))){
    var d=t.dataset.cald, n=parseInt(d.replace(/[۰-۹]/g,function(x){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(x);}),10);
    var isFuture=n>16, isMiss=[7,14].includes(n), isPart=[4,11].includes(n);
    modal('<h3>'+fa(n)+' شهریور ۱۴۰۵</h3>'+
      (isFuture?'<p class="tiny">این روز هنوز نیامده — ثبت برای آینده ممکن نیست.</p>'
        :isMiss?'<p class="tiny">این روز چیزی ثبت نشده. اشکالی ندارد — روزهای بی‌ثبت هم بخشی از مسیرند.</p>'
        :isPart?'<p class="tiny">این روز ناقص ثبت شده: پیاده‌روی و آب ثبت شده، مدیتیشن نه.</p>'
        :'<p class="tiny">همهٔ کارهای این روز ثبت شده — ۴ از ۴، و حال ثبت شده.</p>')+
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

/* ---------- تغییر مقادیر کتابخانه با select ---------- */
document.addEventListener('change',function(e){
  if(e.target.matches('[data-libcat]')){ APP.libCat=e.target.value; render(); return; }
  if(e.target.matches('[data-libfreq]')){ APP.libFreq=e.target.value; render(); return; }
});
