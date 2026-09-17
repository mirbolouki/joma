/* ==========================================================================
   دستهٔ ۱ — لندینگ · ورود · ثبت‌نام · خانه · کارهای امروز · حال من
   هر تابع R_<id> یک صفحه می‌سازد. شماره‌ها به بخش‌های سند وصل‌اند.
   ========================================================================== */

/* یادداشت سند — در محصول نیست، برای بازبینی است */
function note(txt){
  if(APP.notes===false) return '';
  return '<div class="rvnote">🏷 <b>یادداشت سند:</b> '+txt+'</div>';
}

/* ============================ ۱) لندینگ — سند ۱۰ ============================ */
function R_landing(){
  var pins=[
    ['p1','owl-fit','ورزش با جوما','حتی ده دقیقه هم، یک قدم واقعی است.','--coral-soft'],
    ['p2','owl-read','لحظهٔ مطالعه','ده صفحهٔ آرام، برای ذهن شلوغ.','--lav-soft'],
    ['p3','owl-lotus','مدیتیشن آرام','نفسی عمیق؛ همین، شروع است.','--brand-soft'],
    ['p4','owl-moon','خوابِ مرتب','جغدها شب‌ها بیدارند؛ تو نه! بخواب.','--indigo-soft'],
    ['p5','owl-water','آبِ کافی','لیوان بعدی، همین حالا.','--sky-soft'],
    ['p6','owl-cheer','جشن پیشرفت','هر ثبت، یک دسته‌گل کوچک از جوما.','--gold-soft'],
    ['p7','owl-think','نکتهٔ روز','هر روز یک ایدهٔ کوچک برای بهتر زندگی‌کردن.','--rose-soft'],
    ['p8','owl','همراه همیشگی','روز خوب یا بد؛ جوما هست.','--brand-softer']
  ];
  return '<div class="landing fadeup">'+
    /* نوار بالا */
    '<div class="lnav"><span class="logo"><span class="logo-tile">'+owl('owl-hi',30)+'</span>'+
      '<span><b>جوما</b><small>برنامه. اجرا. فهم.</small></span></span>'+
      '<span class="sp"></span>'+
      '<span class="links desk-only"><a href="#how-anchor">چطور کار می‌کند؟</a><a href="#pins-anchor">دنیای جوما</a>'+
      '<a href="#content">دربارهٔ جوما</a><a href="#content">پشتیبانی</a></span>'+
      '<a class="btn ghost sm" href="#login">ورود</a>'+
      '<a class="btn primary sm" href="#signup">شروع رایگان</a>'+
    '</div>'+

    /* قهرمان */
    '<div class="hero"><div>'+
      '<span class="chip s">فضایی برای رشد، با ریتم خودت</span>'+
      '<h1>قدم‌های کوچک،<br><em>حال بهتر.</em></h1>'+
      '<p class="lead">از برنامه‌ای که با زندگی‌ات شروع می‌شود، نه برعکس. فعالیت‌هایت را انتخاب کن، '+
        'به حال خودت توجه کن و مسیرت را ببین — بدون فشار، بدون قضاوت.</p>'+
      '<div class="cta"><a class="btn primary" href="#signup">مسیر من از اینجا شروع می‌شود ←</a>'+
        '<a class="btn soft" href="#today">دیدن پلن نمونه</a></div>'+
      '<div class="tiny" style="margin-top:10px">✅ برنامه شخصی · ثبت روزانه · گزارش روشن</div>'+
      '<div class="joma-msg" style="margin-top:18px;max-width:420px">'+owl('owl-hi',44)+
        '<div class="bub">سلام! من جغد راهنمای تو‌ام؛ یک تخم هم برایت دارم که با قدم‌هایت جوانه می‌زند 🥚</div></div>'+
    '</div>'+

    '<div class="phone desk-only"><div style="display:flex;align-items:center;gap:7px;margin-bottom:9px">'+
      owl('owl-hi',26)+'<b style="font-size:13px">جوما</b><span class="sp" style="flex:1"></span>'+
      '<span class="chip g">یک روز در جوما</span></div>'+
      '<div class="tiny">شنبه، ۳ شهریور · نمایش نمونه</div>'+
      '<div class="scr" style="margin-top:9px">'+
        '<div style="display:flex;gap:10px;align-items:center">'+owl('owl-hi',40)+
          '<b style="font-size:12.5px">سلام سارا، روزت چطور است؟</b></div>'+
        '<div class="card" style="margin-top:11px;padding:11px;display:flex;gap:11px;align-items:center">'+
          '<span class="ring" style="width:56px;height:56px"><svg viewBox="0 0 78 78" width="56" height="56">'+
            '<circle class="track" cx="39" cy="39" r="33"></circle>'+
            '<circle class="val" cx="39" cy="39" r="33" stroke-dasharray="207" stroke-dashoffset="37"></circle></svg>'+
            '<b style="font-size:12px">۸۲٪</b></span>'+
          '<div><b style="font-size:11.5px">این ماه، پیوسته‌تر از قبل.</b>'+
            '<div class="tiny">۲ فعالیت امروز ثبت کرده‌ای.</div></div>'+
        '</div>'+
        ['خواب کافی · ۸ ساعت','مدیتیشن · ۱۵ دقیقه','پیاده‌روی · ۲۰ دقیقه'].map(function(t,i){
          return '<div class="card" style="margin-top:7px;padding:9px 11px;display:flex;align-items:center;gap:8px">'+
            '<span class="chip40 tick'+(i<2?' on':'')+'" style="width:22px;height:22px;border-radius:99px;'+
            'border:2px solid '+(i<2?'var(--ok)':'var(--ring-track)')+';background:'+(i<2?'var(--ok)':'transparent')+';'+
            'display:grid;place-items:center">'+ic('i-check','',11)+'</span>'+
            '<span style="font-size:11px;font-weight:800">'+t+'</span></div>';
        }).join('')+
        '<div class="tiny" style="margin-top:10px">رفتن به کارهای امروز ←</div>'+
      '</div>'+
      '<div class="chip go" style="margin-top:10px">۱۴ واحد رشد · نسبت به ماه گذشته</div>'+
    '</div></div>'+

    note('نوار آمار 7B (۳۲۲+ عضو · ۱۰۶+ هزار قدم · ۹۱٪ ادامهٔ دوره) <b>حذف شد</b> — عدد بی‌منبع خط سرخ است. '+
      'اگر بک‌اند عدد واقعی بدهد، با منبع و تاریخ برمی‌گردد.')+

    /* سه کارت ویژگی */
    '<div class="sec-title">چرا جوما</div><h2 class="sec-h">سه چیز، ساده و روشن.</h2>'+
    '<div class="sec-sub">هیچ‌کدام وعدهٔ درمان نمی‌دهد.</div>'+
    '<div class="feat3">'+
      [['i-target','برنامه‌ای که با تو ساخته می‌شود','from کتابخانه انتخاب می‌کنی، هدف می‌گذاری، و دوره‌ات را وقتی آماده بودی شروع می‌کنی.'],
       ['i-heart','حال، در کنار کارها','خواب، انرژی، تمرکز و استرس را ثبت می‌کنی — چون تصویر روز بدون حالش کامل نیست.'],
       ['i-chart','گزارش‌هایی که می‌فهمی','عدد به‌تنهایی معنی ندارد؛ جوما کنارش می‌نویسد این عدد یعنی چه.']]
      .map(function(f){return '<div class="card">'+ic(f[0])+'<h3>'+f[1]+'</h3><p class="tiny">'+f[2]+'</p></div>';}).join('')+
    '</div>'+

    /* چطور کار می‌کند */
    '<div id="how-anchor"></div><div class="sec-title">چطور کار می‌کند؟</div>'+
    '<h2 class="sec-h">رشد قرار نیست پیچیده باشد.</h2>'+
    '<div class="sec-sub">سه قدم ساده، برای روزهای آگاهانه‌تر.</div>'+
    '<div class="how">'+
      [['۰۱','owl-think','برنامه‌ای برای خودت بساز','از کتابخانهٔ فعالیت‌ها انتخاب کن و هدفی تعیین کن که با وقت و شرایطت هماهنگ باشد.'],
       ['۰۲','owl-hi','هر روز، یک قدم کوچک','آنچه انجام داده‌ای و حالی که داشته‌ای را ثبت کن؛ چند دقیقه برای توجه به خودت.'],
       ['۰۳','owl-cheer','مسیرت را بهتر بشناس','با گزارش‌های روشن ببین چطور پیوسته‌تر شده‌ای و دورهٔ بعد را آگاهانه‌تر شروع کنی.'],
       ['۰۴','owl-read','آموزش، وقتی لازم شد','جوما نشان می‌دهد هر بخش چطور کار می‌کند و چه محدودیت‌هایی دارد.']]
      .map(function(h){return '<div class="card"><span class="n">'+h[0]+'</span>'+
        owl(h[1],46)+'<h3>'+h[2]+'</h3><p class="tiny">'+h[3]+'</p></div>';}).join('')+
    '</div>'+
    note('قدم ۴ در سند نبود؛ اضافه شد چون «آموزش» یکی از وعده‌های اصلی محصول است. جمع: <b>۱۰۷ فعالیت</b> — '+
      'عدد واقعی کاتالوگ، با منبع.')+

    /* دنیای جوما */
    '<div id="pins-anchor"></div><div class="sec-title">دنیای جوما</div>'+
    '<h2 class="sec-h">یک جغد، صد حال خوب.</h2>'+
    '<div class="sec-sub">جغد ما هر کاری بکند، تو هم می‌توانی هم‌قدمش شوی.</div>'+
    '<div class="pins">'+pins.map(function(p){
      return '<div class="card" style="padding:9px">'+
        '<div class="art" style="background:var('+p[4]+')">'+owl(p[1],54)+'</div>'+
        '<b style="font-size:11.5px;display:block;margin-top:7px">'+p[2]+'</b>'+
        '<div class="tiny">'+p[3]+'</div></div>';
    }).join('')+'</div>'+
    note('پین‌ها تزئینی‌اند نه ادعای قابلیت. هفت موردشان فعالیت واقعی کتابخانه‌اند؛ «نکتهٔ روز» به آموزش وصل می‌شود.')+

    /* آرام */
    '<div class="calm"><div class="card">'+
      '<div class="sec-title">فراتر از یک فهرست کار</div>'+
      '<h2 class="sec-h">هم کارهایت مهم‌اند،<br>هم حالی که داری.</h2>'+
      '<p class="tiny" style="margin-top:8px">خواب، انرژی، تمرکز و حال روزانه را در کنار فعالیت‌ها ببین؛ '+
        'جوما کمک می‌کند تصویر روشن‌تری از روزهایت داشته باشی.</p>'+
      '<a class="btn soft sm" style="margin-top:12px" href="#mood">تجربهٔ ثبت حال ←</a>'+
    '</div><div class="card">'+
      '<div class="sec-title">یک لحظه برای خودت</div>'+
      '<h3 style="margin-top:6px">امروز چه حسی داری؟</h3>'+
      '<div class="moodq"><div class="faces" style="margin-top:10px">'+
        ['😖','🙁','😐','🙂','😄'].map(function(f,i){
          return '<button class="face" style="font-size:22px" data-demo-face="'+i+'">'+f+'</button>';}).join('')+
      '</div></div>'+
      '<p class="tiny" style="margin-top:12px">این نمونهٔ زندهٔ همان تجربه‌ای است که در صفحهٔ «حال من» کامل می‌شود.</p>'+
      '<a class="btn soft sm" style="margin-top:10px" href="#mood">دیدن ثبت حال ←</a>'+
    '</div></div>'+

    /* دعوت پایانی */
    '<div class="cta-band">'+owl('owl-cheer',62,'floaty')+
      '<h2 style="margin-top:8px">یک قدم کوچک، همین امروز.</h2>'+
      '<p style="font-size:12.5px;opacity:.92;margin-top:6px">بدون فشار، بدون قضاوت — هر وقت خواستی شروع کن.</p>'+
      '<a class="btn" href="#signup">شروع رایگان</a>'+
    '</div>'+

    /* فوتر */
    '<div class="lfoot"><div><span class="logo"><span class="logo-tile">'+owl('owl-hi',28)+'</span>'+
        '<span><b>جوما</b><small>برنامه. اجرا. فهم.</small></span></span>'+
        '<p class="tiny" style="margin-top:10px">جوما ابزار ثبت و مرور است؛ درمان، تشخیص یا جایگزین مشاور و پزشک نیست.</p></div>'+
      '<div><h4>محصول</h4><a href="#home">خانه</a><a href="#today">کارهای امروز</a><a href="#mood">حال من</a>'+
        '<a href="#reports">گزارش‌ها</a></div>'+
      '<div><h4>جوما</h4><a href="#content">دربارهٔ جوما</a><a href="#edu">آموزش</a><a href="#content">پشتیبانی</a></div>'+
      '<div><h4>قانونی</h4><a href="#content">حریم خصوصی</a><a href="#content">شرایط استفاده</a>'+
        '<a href="#rights">دادهٔ من</a></div>'+
    '</div>'+
    '<div class="tiny" style="text-align:center;margin-top:14px">© ۱۴۰۵ جوما · این صفحه نمونهٔ بازبینی است</div>'+
  '</div>';
}

/* ============================ ۲) ورود — سند ۲۲ §۲ ============================ */
function R_login(){
  return '<div class="auth">'+rvBare()+'<div class="box fadeup" id="authbox">'+
    '<div class="hd">'+owl('owl-hi',58,'floaty')+
      '<h1>خوش برگشتی.</h1><p>از همان‌جایی که بودی ادامه بده.</p></div>'+
    '<div id="autherr"></div>'+
    '<div class="fld"><label class="lbl" for="u">نام کاربری</label>'+
      '<input class="inp" id="u" autocomplete="username" autofocus></div>'+
    '<div class="fld"><label class="lbl" for="p">رمز عبور</label>'+
      '<div class="pw-wrap"><input class="inp" id="p" type="password" autocomplete="current-password">'+
      '<button class="eye" data-pw aria-label="نمایش رمز">'+ic('i-info')+'</button></div></div>'+
    '<div class="banner info" style="margin-bottom:12px">'+ic('i-info')+
      'رمزت را فراموش کردی؟ تا وقتی مسیر بازیابی امن نشده، با <a href="#content">پشتیبانی</a> تماس بگیر.</div>'+
    '<button class="btn primary wide" data-login>ورود</button>'+
    '<div class="alt">حساب نداری؟ <a href="#signup">ثبت‌نام کن</a> · <a href="#content">دربارهٔ جوما</a></div>'+
  '</div></div>';
}
function rvBare(){
  return note('دکمهٔ «رمزت را فراموش کردی؟» نمایش داده نمی‌شود تا <code>SEC-01</code> حل شود. '+
    'جایش، راه تماس با پشتیبانی هست. خطای ورود <b>مشترک</b> است و حساب را لو نمی‌دهد.');
}

/* ============================ ۳) ثبت‌نام — سند ۲۲ §۳ ============================ */
function R_signup(){
  return '<div class="auth">'+rvBare()+'<div class="box fadeup">'+
    '<div class="hd">'+owl('owl-cheer',58,'floaty')+
      '<h1>شروع کنیم.</h1><p>یک حساب، و بعد اولین چیزی که می‌خواهی بهتر شود.</p></div>'+
    '<div class="fld"><label class="lbl" for="sn">اسمی که دوست داری صدایت کنیم</label>'+
      '<input class="inp" id="sn" placeholder="مثلاً سارا"></div>'+
    '<div class="fld"><label class="lbl" for="su">نام کاربری</label>'+
      '<input class="inp" id="su" autocomplete="username"></div>'+
    '<div class="fld"><label class="lbl" for="sp">رمز عبور</label>'+
      '<div class="pw-wrap"><input class="inp" id="sp" type="password" autocomplete="new-password" data-strength>'+
      '<button class="eye" data-pw aria-label="نمایش رمز">'+ic('i-info')+'</button></div>'+
      '<div class="strength" id="str"><i></i><i></i><i></i><i></i></div>'+
      '<span class="tiny" id="strtxt">حداقل ۸ نویسه — ترکیب حرف و عدد، نه فقط عدد.</span></div>'+
    '<div class="fld"><label class="lbl" for="se">ایمیل یا موبایل</label>'+
      '<input class="inp" id="se" placeholder="برای روزی که رمزت را فراموش کردی"></div>'+
    note('کانال بازیابی <b>اجباری نیست</b>، ولی برجسته پرسیده می‌شود — کاربری که کانال ندارد، '+
      'اگر شماره‌اش عوض شود راه بازگشت ندارد.')+
    '<button class="btn primary wide" style="margin-top:8px" data-signup>ساخت حساب</button>'+
    '<div class="alt">حساب داری؟ <a href="#login">وارد شو</a></div>'+
  '</div></div>';
}

/* ============================ ۴) خانه — سند ۱۱ ============================ */
function R_home(){
  var hello=D('سلام سارا، خوش برگشتی.','سلام سارا. از ساختن اولین برنامه شروع کنیم.');
  var next=D('۳ از ۵ کار امروز ثبت شده.','اول برنامه‌ات را بسازیم.');
  var nextSub=D('قدم بعدی: پیاده‌روی ۲۰ دقیقه','بدون برنامه، ثبت روزانه معنی ندارد.');
  var pct=D(60,0);
  var cir=2*Math.PI*33, off=cir-(cir*pct/100);

  var stats=[
    ['پیشرفت این ماه',D('۸۲٪','—'),D('۱۴ واحد رشد نسبت به مرداد','داده کافی نیست'),'--brand-ink'],
    ['روزهای همراهی',D('۲۰','—'),D('در ۶۵٪ روزهای این ماه ثبت داشته‌ای','داده کافی نیست'),'--gold-ink'],
    ['فعالیت‌های برنامه',D('۸','—'),D('۶ روزانه، ۱ هفتگی، ۱ ماهانه','هنوز برنامه‌ای نساخته‌ای'),'--lav-ink'],
    ['میانگین حال این هفته',D('۴٫۱ از ۵','—'),D('خوب و نزدیک به هفتهٔ قبل','داده کافی نیست'),'--rose-ink']
  ];

  return head('خانهٔ من',hello,'هر روز، یک قدم کوچک.')+
    '<div class="joma-msg">'+owl('owl-hi',46)+'<div class="bub">'+
      D('امروز ۳ کار مانده و یک ثبت حال. هر وقت خواستی — عجله‌ای نیست 🤍',
        'اولین برنامه‌ات را با هم می‌سازیم؛ از کتابخانه فعالیت انتخاب می‌کنیم.')+'</div></div>'+

    '<div class="grid2">'+
      '<div class="card pcard"><div class="body">'+
        '<div class="kicker">قدم بعدی</div><h3 style="font-size:15px;margin-top:4px">'+next+'</h3>'+
        '<div class="tiny">'+nextSub+'</div>'+
        '<div class="acts"><button class="btn primary sm" data-go="today">ثبت اولین قدم</button>'+
        '<button class="btn soft sm" data-go="mood">ثبت حال</button>'+
        (empty()?'<button class="btn ghost sm">راهنمای جوما</button>':'')+'</div></div>'+
        '<div class="ring"><svg viewBox="0 0 78 78" width="78" height="78">'+
          '<circle class="track" cx="39" cy="39" r="33"></circle>'+
          '<circle class="val" cx="39" cy="39" r="33" stroke-dasharray="'+cir.toFixed(0)+
          '" stroke-dashoffset="'+off.toFixed(0)+'"></circle></svg><b>'+fa(pct)+'٪</b></div>'+
      '</div>'+

      '<div class="card moodq"><div class="kicker">حال امروز</div>'+
        '<h3 style="font-size:14px;margin-top:4px">'+
          D('امروز چه حسی داری؟','حال امروز را ثبت نکرده‌ای')+'</h3>'+
        '<div class="tiny">'+(empty()?'حتی یک انتخاب، تصویر هفته را کامل می‌کند.':'در ۵ ثانیه ثبت می‌شود.')+'</div>'+
        '<div class="faces">'+['😖','🙁','😐','🙂','😄'].map(function(f,i){
          return '<button class="face" data-face="'+i+'" data-go="mood">'+f+'</button>';}).join('')+'</div>'+
      '</div>'+
    '</div>'+

    '<div class="stat4">'+stats.map(function(s){
      var nodata=(s[1]==='—');
      return '<div class="card'+(nodata?' nodata':'')+'">'+
        '<div class="lb">'+s[0]+'</div>'+
        '<div class="vl" style="color:var('+s[3]+')">'+(nodata?'<span style="font-size:15px">داده کافی نیست</span>':s[1])+'</div>'+
        '<div class="sb">'+s[2]+'</div></div>';
    }).join('')+'</div>'+
    note('هر عدد <b>آمادهٔ بک‌اند</b> است؛ فرانت میانگین یا درصد نمی‌سازد. اگر داده کافی نباشد، '+
      'کارت «داده کافی نیست» می‌شود — <b>نه صفر</b>.')+

    '<div class="grid2">'+
      '<div class="card steps"><h3>'+ic('i-checkc')+'قدم‌های امروز</h3>'+
        (empty()?
          '<div class="tiny" style="margin-top:8px">برنامه‌ات هنوز فعالیتی ندارد.</div>'+
          '<button class="btn soft sm" style="margin-top:10px" data-go="library">افزودن از کتابخانه</button>'
          :
          [['i-walk','پیاده‌روی','۲۰ دقیقه · روزانه',1,'--brand-soft'],
           ['i-drop','نوشیدن آب','۵ از ۸ لیوان · روزانه',1,'--sky-soft'],
           ['i-lotus','مدیتیشن','۱۵ دقیقه · روزانه',0,'--lav-soft'],
           ['i-moon','خواب کافی','۸ ساعت · روزانه',0,'--indigo-soft'],
           ['i-heart','ثبت حال','پنج قدم کوتاه · اختیاری',0,'--rose-soft']]
          .map(function(r){
            return '<div class="st"><span class="chip40" style="background:var('+r[4]+')">'+ic(r[0])+'</span>'+
              '<span><b>'+r[1]+'</b><small>'+r[2]+'</small></span>'+
              '<span class="end">'+(r[3]?'<span class="tst done">'+ic('i-check')+'ثبت شد</span>'
                :'<span class="tst lock">'+ic('i-clock')+'در انتظار</span>')+'</span></div>';
          }).join(''))+
      '</div>'+
      '<div class="card"><h3>'+ic('i-list')+'جوجهٔ من</h3>'+
        '<div style="display:flex;gap:14px;align-items:center;margin-top:10px">'+
          '<div style="width:96px;height:104px;border-radius:18px;display:grid;place-items:center;'+
            'background:linear-gradient(160deg,var(--lav-soft),var(--sky-soft))">'+
            '<span class="floaty">'+(empty()?owl('owl-moon',52):owl('owl-hi',64))+'</span></div>'+
          '<div style="flex:1">'+
            '<b style="font-size:12.5px">'+(empty()?'تخم، منتظر اولین قدم':'جوجه سرحال است')+'</b>'+
            '<div class="tiny" style="margin-top:4px">'+
              (empty()?'با اولین ثبت، تخم جوانه می‌زند.':'با هر ثبت، یک قدم بزرگ‌تر می‌شود.')+'</div>'+
            '<a class="btn soft sm" style="margin-top:9px" href="#chick">سرزدن به جوجه</a>'+
          '</div></div>'+
        note('جوجه <b>هرگز نمی‌میرد</b> و با حال بد تنبیه نمی‌شود؛ فقط کم‌رنگ می‌شود.')+
      '</div>'+
    '</div>'+

    '<div class="grid2">'+
      '<div class="card"><h3>'+ic('i-chart')+'مسیر این ماه</h3>'+
        '<div class="tiny" style="margin-top:4px">هر خانه، یک روز. رنگ پررنگ‌تر، ثبت بیشتر.</div>'+
        '<div style="display:grid;grid-template-columns:repeat(10,1fr);gap:5px;margin-top:12px">'+
          Array.from({length:30},function(_,i){
            var lvl=(i*7)%4; var c=['var(--ring-track)','var(--brand-soft)','var(--brand)','var(--brand-ink)'][lvl];
            return '<i style="aspect-ratio:1;border-radius:6px;background:'+(empty()?'var(--ring-track)':c)+'"></i>';
          }).join('')+
        '</div>'+
        (empty()?'<div class="tiny" style="margin-top:10px">این ماه هنوز ثبتی نداری.</div>':'')+
      '</div>'+
      '<div class="card"><h3>'+ic('i-book')+'بینش این هفته</h3>'+
        (empty()?'<div class="tiny" style="margin-top:8px">وقتی چند روز ثبت شود، اینجا یک نکتهٔ کوچک می‌آید.</div>'
        :'<p style="font-size:12px;margin-top:8px;line-height:2">روزهایی که آب کامل بوده، میانگین تمرکزت '+
          'بالاتر بوده — <span class="tiny">از دفترچهٔ جوما</span></p>'+
          '<a class="btn soft sm" style="margin-top:10px" href="#book">دفترچهٔ جوما ›</a>')+
        note('بینش بدون داده ساخته نمی‌شود؛ «حدس» جای «شاهد» نمی‌نشیند.')+
      '</div>'+
    '</div>';
}

/* ======================== ۵) کارهای امروز — سند ۱۲ ======================== */
function R_today(){
  var rows=D([
    ['i-walk','پیاده‌روی','۲۰ دقیقه · روزانه',1,'done','ثبت قطعی'],
    ['i-drop','نوشیدن آب','۸ لیوان · روزانه',1,'done','ثبت قطعی'],
    ['i-lotus','مدیتیشن','۱۵ دقیقه · روزانه',1,'draft','پیش‌نویس'],
    ['i-moon','خواب کافی','۸ ساعت · روزانه',0,'wait','در انتظار'],
    ['i-book','مطالعه','۱۰ صفحه · هفتگی',0,'wait','در انتظار'],
    ['i-walk','ورزش','۳ جلسه · هفتگی',0,'wait','در انتظار'],
    ['i-heart','ثبت حال','اختیاری',0,'lock','قفل — امروز ثبت شد'],
    ['i-trend','قند خون','مرتبه',0,'err','خطا در ثبت']
  ],[]);

  var tabs=D([['روزانه',4],['هفتگی',2],['ماهانه',2]],[['روزانه',0]]);

  return head('امروز','کارهای امروز',D('۴ از ۸ کار امروز ثبت شده.','برنامه‌ات هنوز فعالیتی ندارد.'),
      '<span class="daynav"><button disabled>‹ دیروز</button><button class="on">امروز</button>'+
      '<button>فردا</button></span>')+

    '<div class="tabs">'+tabs.map(function(t,i){
      return '<button class="'+(i===0?'on':'')+'" data-tab="'+i+'">'+t[0]+' <small>('+fa(t[1])+')</small></button>';
    }).join('')+'</div>'+

    waterCard()+
    note('لیوان‌ها <b>فقط اینجا نوشته می‌شوند</b>؛ در خانه فقط خلاصه خوانده می‌شود — «خواندن در دو جا، '+
      'نوشتن فقط در یک جا». هر شش وضعیت داده <b>متن</b> دارند، نه فقط رنگ.')+

    '<div class="grid2"><div class="card">'+
      (rows.length?
        '<table class="tbl"><thead><tr><th>فعالیت</th><th>هدف</th><th style="width:110px">مقدار</th>'+
        '<th style="width:130px">وضعیت</th></tr></thead><tbody>'+
        rows.map(function(r){
          return '<tr class="trow" data-row><td><span class="act"><span class="chip '+
            ({done:'g',draft:'s',wait:'go',err:'c',lock:'n'})[r[4]]+'">'+ic(r[0])+'</span>'+
            '<span><b>'+r[1]+'</b><small>'+r[2]+'</small></span></span></td>'+
            '<td class="tiny">'+(r[5]==='ثبت قطعی'||r[5]==='پیش‌نویس'?'—':'—')+'</td>'+
            '<td>'+(r[5]==='قفل — امروز ثبت شد'?'<span class="tiny">—</span>':'<input class="inp num" value="'+
              (r[4]==='done'?'۲۰':'')+'" style="padding:7px 10px" '+(r[4]==='lock'||r[4]==='err'?'disabled':'')+'>')+'</td>'+
            '<td><span class="tst '+r[4]+'">'+ic(r[4]==='done'?'i-check':(r[4]==='err'?'i-info':'i-clock'))+
            r[5]+'</span></td></tr>';
        }).join('')+'</tbody></table>'
        :
        '<div style="text-align:center;padding:22px">'+owl('owl-think',60,'floaty')+
        '<h3 style="margin-top:10px">برنامه‌ات هنوز فعالیتی ندارد</h3>'+
        '<p class="tiny" style="margin-top:6px">اول از کتابخانه انتخاب کن، بعد اینجا ثبت می‌شود.</p>'+
        '<a class="btn primary sm" style="margin-top:12px" href="#library">افزودن از کتابخانه</a></div>')+
      (rows.length?'<div class="tfoot"><span class="tiny">۳ تغییر ذخیره‌نشده — با «ثبت نهایی» قطعی می‌شوند.</span>'+
        '<span class="sp"></span><button class="btn ghost sm" data-save>ذخیرهٔ پیش‌نویس</button>'+
        '<button class="btn primary sm" data-final>ثبت نهایی</button></div>':'')+
    '</div>'+

    '<div style="display:flex;flex-direction:column;gap:14px">'+
      '<div class="card"><h3>'+ic('i-clock')+'مرور روز</h3>'+
        '<div class="tiny" style="margin-top:6px">'+(empty()?'امروز هنوز چیزی ثبت نشده.':'۵ ثبت تا این لحظه')+'</div>'+
        '<div class="sep"></div>'+
        '<div class="tiny">هر ثبت با ساعت و تاریخش ذخیره می‌شود؛ آخرین به‌روزرسانی '+
          D('۱۴:۲۰','—')+'</div></div>'+
      '<div class="card tip"><h3>'+ic('i-info')+'نکتهٔ جوما</h3>'+
        '<p class="tiny" style="margin-top:6px">'+(empty()?'وقتی چند روز ثبت شود، اینجا یک نکتهٔ کوچک می‌آید.'
        :'روزهایی که آب کامل بوده، تمرکزت بالاتر بوده.')+'</p></div>'+
      '<div class="card"><h3>'+ic('i-heart')+'حال امروز</h3>'+
        (empty()?'<div class="tiny" style="margin-top:6px">ثبت نشده.</div>':'<div class="tiny" style="margin-top:6px">ثبت شده ✓</div>')+
        '<button class="btn soft sm wide" style="margin-top:10px" data-go="mood">ثبت حال</button></div>'+
    '</div></div>'+

    (empty()?'':'<div class="doneb">'+owl('owl-cheer',38)+
      'همه را ثبت کردی! — جوما به تو افتخار می‌کند</div>')+
    note('«ثبت نهایی» قفل روز را می‌بندد. افزودن یا حذف فعالیت روی دورهٔ در حال اجرا <b>ممنوع دائمی</b> است — '+
      'پس دکمه‌ای هم ندارد، حتی خاکستری.');
}

/* ========================== ۶) حال من — سند ۱۳ ========================== */
var MOOD_STEPS=[
  {k:'mood',  q:'امروز چه حسی داری؟',      sub:'اول از همه، حال کلی‌ات. نزدیک‌ترین چهره را انتخاب کن.',
   bg:'--rose-soft', opts:['خیلی بد','خوب نیستم','معمولی','خوب','عالی']},
  {k:'energy',q:'باتری امروزت چقدر شارژ دارد؟', sub:'انرژی یعنی توانی که همین حالا داری.',
   bg:'--gold-soft', opts:['خیلی کم','کم','متوسط','زیاد','پُر']},
  {k:'focus', q:'تمرکزت چطور بود؟',        sub:'نه اینکه چقدر کار کردی — چقدر توانستی تمرکز کنی.',
   bg:'--sky-soft',  opts:['خیلی سخت','سخت','متوسط','آسان','خیلی آسان']},
  {k:'sleep', q:'خواب دیشبت چطور بود؟',    sub:'کیفیت خواب شب قبل را در نظر بگیر؛ نه تعداد ساعت‌هایی که خوابیدی.',
   bg:'--indigo-soft',opts:['خیلی ضعیف','ضعیف','متوسط','خوب','عالی']},
  {k:'stress',q:'بادکنک استرست چقدر پف کرده؟', sub:'فشاری که امروز حس کردی.',
   bg:'--coral-soft',opts:['خیلی کم','کم','متوسط','زیاد','خیلی زیاد']}
];
var MOOD_MSG={
  mood:['امروز سخت بوده؛ من همین‌جا کنارتم 🤍','ممنون که صادقی؛ همین توجه، خودش یک قدم است.','روزهای معمولی هم بخشی از مسیرند.','خوب است؛ همین توجه کوچک، روز را قشنگ‌تر می‌کند.','چه عالی! این حس خوب را ثبت کنیم تا یادت بماند 🌟'],
  energy:['باتری کم است؛ امروز فقط یک قدم کوچک کافی است.','کمی انرژی داری؛ یک قدم سبک انتخاب کن.','متوسط و قابل‌اعتماد؛ همان‌قدر که لازم است.','شارژ خوبی داری؛ یک قدم محکم برمی‌داریم!','پُر و تمام! بزن بریم 🚀'],
  focus:['ذهنت امروز شلوغ بوده؛ طبیعی است.','کمی سخت بوده؛ همین ثبتش ارزش دارد.','متوسط، مثل اکثر روزهای واقعی.','خوب بود! تمرکز، مهارتِ روزهای خوب است.','عالی! چه روزی برای ذهنت 🎯'],
  sleep:['دیشب سخت گذشته؛ امشب زودتر بغل کنیم بالش را 🌙','کمی چرت‌مانند؛ اشکال ندارد.','یک خواب معمولی؛ بهتر از هیچ است.','خوابِ خوب، نصف انرژی فرداست.','چه خواب طلایی! بدنت از تو تشکر می‌کند ⭐'],
  stress:['چه آرامش! عالی که فشاری حس نکردی.','کم و قابل‌مدیریت؛ خوب است.','متوسط؛ بخشی از زندگی است.','کمی فشار بوده؛ یک نفس عمیق هم خوب است.','فشار زیادی امروز؛ صحنه را برای خودت نرم کن 🤍']
};

function moodArt(k,l){
  if(l===null) return owl('owl-think',72,'floaty');
  if(k==='mood')   return '<span class="emoji5">'+['😖','🙁','😐','🙂','😄'][l]+'</span>';
  if(k==='energy'){
    var w=[6,12,18,24,30][l], c=['--coral','--coral','--gold','--sky','--ok'][l];
    return '<svg width="120" height="60" viewBox="0 0 120 60"><rect x="2" y="12" width="104" height="36" rx="10" '+
      'fill="none" stroke="var(--ink-3)" stroke-width="3"/><rect x="108" y="24" width="9" height="12" rx="3" fill="var(--ink-3)"/>'+
      '<rect x="9" y="19" width="'+w+'" height="22" rx="6" fill="var('+c+')"/></svg>';
  }
  if(k==='focus'){
    return '<svg width="120" height="120" viewBox="0 0 120 120">'+
      [34,22,10].map(function(r,i){return '<circle cx="60" cy="60" r="'+r+'" fill="none" stroke="var(--ring-track)" stroke-width="3"/>';}).join('')+
      '<circle cx="60" cy="60" r="'+(1.5+l*1.5+4)+'" fill="var(--sky)"/>'+
      ['M60 14v8','M60 98v8','M14 60h8','M98 60h8'].map(function(d){return '<path d="'+d+'" stroke="var(--sky)" stroke-width="3" stroke-linecap="round"/>';}).join('')+'</svg>';
  }
  if(k==='sleep'){
    return '<svg width="130" height="90" viewBox="0 0 130 90"><path d="M46 20a26 26 0 1 0 24 34 21 21 0 0 1-24-34Z" fill="var(--lav)"/>'+
      Array.from({length:5},function(_,i){
        var on=i<l+1;
        return '<path d="M'+(80+i*11)+' 40l3.2 6.4 6.8 1-5 4.8 1.2 6.6-6.2-3.3-6.2 3.3 1.2-6.6-5-4.8 6.8-1Z" '+
          'fill="'+(on?'var(--gold)':'var(--ring-track)')+'"/>';}).join('')+'</svg>';
  }
  if(k==='stress'){
    var r=3.5+l*1.3, sky=[ '--sky','--sky','--gold','--coral','--rose'][l];
    return '<svg width="120" height="120" viewBox="0 0 120 120"><ellipse cx="60" cy="52" rx="'+(r*5)+'" ry="'+(r*5.6)+'" fill="var('+sky+')"/>'+
      '<path d="M60 '+(52+r*5.6)+' q6 14-2 24" fill="none" stroke="var(--ink-3)" stroke-width="2.5" stroke-linecap="round"/>'+
      Array.from({length:l>=3?2:0},function(_,i){
        return '<path d="M'+(96+i*6)+' '+(24+i*9)+'q6 4 0 8" fill="none" stroke="var(--coral)" stroke-width="2.5" stroke-linecap="round"/>';}).join('')+'</svg>';
  }
  return '';
}

function R_mood(){
  var step=APP.moodStep;
  var finished=(step>=MOOD_STEPS.length);
  var s=MOOD_STEPS[step]||MOOD_STEPS[MOOD_STEPS.length-1];
  var ans=APP.moodAnswers[s.k];
  var done=Object.keys(APP.moodAnswers).length;

  var wiz='<div class="wiz-top">'+MOOD_STEPS.map(function(x,i){
    var cls=i<step?'done':(i===step?'on':'');
    return '<span class="wdot '+cls+'"><span class="d">'+(i<step?'✓':fa(i+1))+'</span><span class="ln"></span></span>';
  }).join('')+'</div>';

  if(finished){
    return head('حال من','مرور امروز',D('پنج قدم را پاسخ دادی.','هنوز چیزی ثبت نشده.'))+
      '<div class="scene" style="background:linear-gradient(150deg,var(--brand-soft),var(--gold-soft))">'+
        '<div class="art">'+owl('owl-cheer',96,'floaty')+'</div>'+
        '<h2>ثبت شد ✓</h2><p class="sub">ممنون که به خودت وقت دادی. این پنج عدد، تصویر امروزت را کامل کردند.</p>'+
      '</div>'+
      '<div class="card"><h3>خلاصهٔ امروز</h3>'+
        MOOD_STEPS.map(function(x){
          var l=APP.moodAnswers[x.k];
          return '<div class="st" style="display:flex;align-items:center;gap:10px;padding:9px 0;'+
            'border-bottom:1px dashed var(--card-brd)"><b style="font-size:12px;flex:1">'+x.q+'</b>'+
            '<span class="chip g">'+(l===undefined?'—':x.opts[l])+'</span></div>';}).join('')+
        '<div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">'+
        '<button class="btn soft sm" data-mood-reset>اصلاح پاسخ‌ها</button>'+
        '<button class="btn primary sm" data-go="home">بازگشت به خانه</button>'+
        '<button class="btn ghost sm" data-go="reports">دیدن گزارش</button></div>'+
      '</div>'+
      note('پس از ثبت، پاسخ‌ها <b>قابل اصلاح‌اند</b> ولی نسخهٔ قبلی در تاریخچه می‌ماند — «اصلاح با دلیل»، نه پاک‌کردن بی‌رد.')+
      wnav('cheer');
  }

  return head('حال من','حال من',D('پنج قدم کوتاه. هر پنج تا هم اختیاری‌اند — می‌توانی همین حالا بروی.',''),
      '<span class="chip g">'+fa(done)+' از '+fa(5)+' ثبت شده</span>')+
    wiz+
    '<div class="scene" style="background:var('+s.bg+')">'+
      '<div class="art">'+moodArt(s.k,ans===undefined?null:ans)+'</div>'+
      '<h2>'+s.q+'</h2><p class="sub">'+s.sub+'</p>'+
      '<div class="opts">'+s.opts.map(function(o,i){
        return '<button class="opt'+(ans===i?' sel':'')+'" data-mood="'+i+'">'+o+'</button>';}).join('')+'</div>'+
    '</div>'+
    wnav('think', step, s, ans)+
    note('«خواب دیشبت» عمداً <b>کیفیت</b> را می‌پرسد نه ساعت — و همین جمله در زیرنویس آمده تا کاربر اشتباه نکند.');
}
function wnav(mood){
  var step=Math.min(APP.moodStep,MOOD_STEPS.length-1);
  var s=MOOD_STEPS[step]||{k:'mood'}, ans=APP.moodAnswers[s.k];
  var msg='پنج قدم کوتاه. هر پنج تا هم اختیاری‌اند — می‌توانی همین حالا بروی.';
  if(ans!==undefined && MOOD_MSG[s.k]) msg=MOOD_MSG[s.k][ans];
  return '<div class="wnav">'+owl(mood==='cheer'?'owl-cheer':(ans!==undefined?'owl-hi':'owl-think'),42)+
    '<div class="bub">'+msg+'</div>'+
    '<button class="btn ghost sm" '+(step===0?'disabled':'')+' data-mood-prev>قبلی</button>'+
    '<button class="btn primary sm" '+(ans===undefined?'disabled':'')+' data-mood-next>'+
      (step===MOOD_STEPS.length-1?'پایان':'بعدی')+'</button></div>';
}
