/* ==========================================================================
   دستهٔ ۱ — لندینگ · ورود · ثبت‌نام · خانه · کارهای امروز · حال من
   هر تابع R_<id> یک صفحه می‌سازد. شماره‌ها به بخش‌های سند وصل‌اند.
   ========================================================================== */

/* یادداشت سند — در محصول نیست، برای بازبینی است */
function note(txt){
  if(APP.notes===false) return '';
  return '<div class="rvnote">🏷 <b>یادداشت سند:</b> '+txt+'</div>';
}

/* ============================ ۱) لندینگ — سند ۱۰ ============================
   تصمیم مالک: «خیلی شلوغ است». نسخهٔ ساده: هدف برنامه، سه قدم، حال، جوجه، دعوت.
   حذف‌شده‌ها: نوار آمار · سه کارت ویژگی · هشت پین «دنیای جوما» · قدم چهارمِ ساخته‌شده.
   ========================================================================== */
function R_landing(){
  var steps=[
    ['۰۱','owl-think','انتخاب کن','از ۱۰۷ فعالیت آماده، آنچه با زندگی‌ات جور است را انتخاب کن و یک هدف بگذار.'],
    ['۰۲','owl-hi','هر روز ثبت کن','چند ثانیه: کاری که کردی و حالی که داشتی. تمام.'],
    ['۰۳','owl-cheer','مسیرت را ببین','جوما نشان می‌دهد چطور پیش رفته‌ای — و کنار هر عدد می‌نویسد یعنی چه.']
  ];

  return '<div class="landing fadeup">'+

    /* ۱ · نوار بالا — فقط دو دکمه */
    '<div class="lnav"><span class="logo"><span class="logo-tile">'+owl('owl-hi',30)+'</span>'+
      '<span><b>جوما</b><small>برنامه. اجرا. فهم.</small></span></span>'+
      '<span class="sp"></span>'+
      '<a class="btn ghost sm" href="#login">ورود</a>'+
      '<a class="btn primary sm" href="#signup">شروع رایگان</a>'+
    '</div>'+

    /* ۲ · قهرمان */
    '<div class="hero"><div>'+
      '<span class="chip s">فضایی برای رشد، با ریتم خودت</span>'+
      '<h1>قدم‌های کوچک،<br><em>حال بهتر.</em></h1>'+
      '<p class="lead">فعالیت‌هایت را انتخاب کن، هر روز در چند ثانیه ثبت کن، و مسیرت را ببین.</p>'+
      '<div class="cta"><a class="btn primary" href="#signup">شروع رایگان</a>'+
        '<a class="btn soft" href="#today">یک روز نمونه را ببین</a></div>'+
      '<div class="tiny" style="margin-top:12px">۱۰۷ فعالیت آماده · بدون فشار · بدون قضاوت</div>'+
      '<div class="joma-msg" style="margin-top:20px;max-width:430px">'+owl('owl-hi',44)+
        '<div class="bub">سلام! من جغد راهنمای تو‌ام. یک جوجه هم برایت دارم که با قدم‌هایت بزرگ می‌شود 🐣</div></div>'+
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
            '<span style="width:22px;height:22px;border-radius:99px;border:2px solid '+(i<2?'var(--ok)':'var(--ring-track)')+';'+
            'background:'+(i<2?'var(--ok)':'transparent')+';display:grid;place-items:center">'+
            (i<2?ic('i-check','',11):'')+'</span>'+
            '<span style="font-size:11px;font-weight:800">'+t+'</span></div>';
        }).join('')+
        '<div class="tiny" style="margin-top:10px">رفتن به کارهای امروز ←</div>'+
      '</div>'+
    '</div></div>'+

    /* ۳ · سه قدم — تنها بخش توضیحی صفحه */
    '<div id="how-anchor"></div>'+
    '<div style="text-align:center;max-width:560px;margin:24px auto 20px">'+
      '<div class="sec-title">چطور کار می‌کند؟</div>'+
      '<h2 class="sec-h" style="font-size:22px">سه قدم، همین.</h2>'+
      '<p class="sec-sub" style="margin-bottom:0">هر کدام چند ثانیه وقت می‌گیرد.</p>'+
    '</div>'+
    '<div class="feat3">'+steps.map(function(s){
      return '<div class="card" style="text-align:center;padding:20px 16px">'+
        '<div style="display:flex;justify-content:center">'+owl(s[1],58,'floaty')+'</div>'+
        '<div class="sec-title" style="margin-top:10px">قدم '+s[0]+'</div>'+
        '<h3 style="font-size:15.5px;justify-content:center">'+s[2]+'</h3>'+
        '<p class="tiny" style="margin-top:6px;line-height:2">'+s[3]+'</p></div>';
    }).join('')+'</div>'+

    /* ۴ · کارها و حال — تفاوت اصلی، با نمونهٔ زنده */
    '<div class="calm" style="margin-top:26px"><div class="card" style="padding:22px">'+
      '<div class="sec-title">فراتر از یک فهرست کار</div>'+
      '<h2 class="sec-h" style="font-size:21px">هم کارهایت مهم‌اند،<br>هم حالی که داری.</h2>'+
      '<p class="tiny" style="margin-top:10px;line-height:2.1;font-size:12px">'+
        'خواب، انرژی، تمرکز و استرس را در کنار فعالیت‌ها ثبت می‌کنی. '+
        'بعد می‌بینی کدام روزها بهتر بودی — با دادهٔ خودت، نه با حدس.</p>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">'+
        ['😄 حال','🔋 انرژی','🎯 تمرکز','🌙 خواب','🎈 استرس'].map(function(c){
          return '<span class="chip n">'+c+'</span>';}).join('')+'</div>'+
    '</div><div class="card" style="padding:22px">'+
      '<div class="sec-title">یک لحظه برای خودت</div>'+
      '<h3 style="font-size:15px;margin-top:4px">امروز چه حسی داری؟</h3>'+
      '<p class="tiny">همین حالا امتحان کن — یک انتخاب، تمام.</p>'+
      '<div class="faces" id="landfaces" style="display:flex;gap:9px;margin-top:14px">'+
        ['😖','🙁','😐','🙂','😄'].map(function(f,i){
          return '<button class="face" style="flex:1;aspect-ratio:1;border-radius:15px;background:var(--brand-softer);'+
            'border:1.5px solid transparent;font-size:26px;display:grid;place-items:center" '+
            'data-demo-face="'+i+'">'+f+'</button>';}).join('')+
      '</div>'+
      '<p class="tiny" style="margin-top:12px">در ۷B همین ثبت، پنج قدم کوتاه بود. '+
        'در نسخهٔ ما هر گزینه <b>شکل خودش</b> را دارد و با انتخاب، خودش می‌رود قدم بعد.</p>'+
      '<a class="btn soft sm" style="margin-top:12px" href="#mood">دیدن تجربهٔ کامل</a>'+
    '</div></div>'+

    /* ۵ · جوجه — قلابِ برگشتن */
    '<div class="card" style="margin-top:26px;padding:24px;display:flex;gap:22px;align-items:center;flex-wrap:wrap">'+
      '<div style="width:132px;height:140px;flex:none;border-radius:22px;display:grid;place-items:center;'+
        'background:linear-gradient(160deg,var(--gold-soft),var(--brand-soft))">'+
        '<span class="floaty">'+chickSVG(92,'chick','happy')+'</span></div>'+
      '<div style="flex:1;min-width:240px">'+
        '<div class="sec-title">جوجهٔ من</div>'+
        '<h2 class="sec-h" style="font-size:21px">یک همراه که دلت نمی‌خواهد رهایش کنی.</h2>'+
        '<div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:12px">'+
          [['با هر ثبت بزرگ‌تر می‌شود','🥚→🐣'],
           ['هیچ‌وقت نمی‌میرد','🤍'],
           ['با روز بد تنبیه نمی‌شود','🤍']].map(function(p){
            return '<div><b style="font-size:12px">'+p[1]+' '+p[0]+'</b></div>';}).join('')+
        '</div>'+
      '</div>'+
    '</div>'+
    note('سه قدم، به‌جای <b>سه کارت ویژگی + چهار قدم</b> که هر دو یک چیز می‌گفتند. '+
      'نوار آمار و هشت پین «دنیای جوما» حذف شدند — عدد بی‌منبع خط سرخ است، و پین‌ها فهرست را شلوغ می‌کردند. '+
      '«جوجه» اضافه شد چون دلیلِ <b>برگشتن</b> کاربر است، نه فقط ثبت‌نام‌کردنش.')+

    /* ۶ · دعوت پایانی */
    '<div class="cta-band" style="margin-top:26px">'+owl('owl-cheer',58,'floaty')+
      '<h2 style="margin-top:8px;font-size:22px">یک قدم کوچک، همین امروز.</h2>'+
      '<p style="font-size:13px;opacity:.92;margin-top:6px">بدون فشار، بدون قضاوت — هر وقت خواستی شروع کن.</p>'+
      '<a class="btn" href="#signup">شروع رایگان</a>'+
    '</div>'+

    /* ۷ · فوتر */
    '<div class="lfoot" style="grid-template-columns:1.6fr 1fr 1fr">'+
      '<div><span class="logo"><span class="logo-tile">'+owl('owl-hi',28)+'</span>'+
        '<span><b>جوما</b><small>برنامه. اجرا. فهم.</small></span></span>'+
        '<p class="tiny" style="margin-top:10px;max-width:330px">جوما ابزار ثبت و مرور است؛ '+
        'درمان، تشخیص یا جایگزین مشاور و پزشک نیست.</p></div>'+
      '<div><h4>جوما</h4><a href="#content">دربارهٔ جوما</a><a href="#content">پشتیبانی</a>'+
        '<a href="#edu">آموزش</a><a href="#content">حریم خصوصی</a><a href="#content">شرایط استفاده</a></div>'+
      '<div><h4>ورود</h4><a href="#login">ورود</a><a href="#signup">ساخت حساب</a><a href="#rights">دادهٔ من</a></div>'+
    '</div>'+
    '<div class="tiny" style="text-align:center;margin-top:14px">© ۱۴۰۵ جوما · این صفحه نمونهٔ بازبینی است</div>'+
  '</div>';
}

/* ============================ ۲) ورود — سند ۲۲ §۲ ============================ */
function fx(id,label,ph,type,opts){
  opts=opts||{};
  var inner;
  if(type==='select'){
    inner='<select id="'+id+'"'+(opts.data?' data-'+opts.data:'')+'>'+opts.body+'</select>';
  } else {
    inner='<input id="'+id+'" type="'+(type||'text')+'"'+(opts.dir?' dir="'+opts.dir+'"':'')+
      (ph?' placeholder="'+ph+'"':'')+(opts.ac?' autocomplete="'+opts.ac+'"':'')+
      (opts.data?' data-'+opts.data:'')+'>'+(opts.tail||'');
  }
  return '<div class="fx'+(opts.wide?' wide':'')+(opts.err?' err':'')+'">'+
    '<label class="fxl" for="'+id+'">'+label+'</label>'+inner+
    (opts.hint?'<span class="fxh tiny">'+opts.hint+'</span>':'')+'</div>';
}

/* =================== پوستهٔ مشترک ورود / ثبت‌نام / بازیابی رمز ===================
   هر سه صفحه یک قالب دارند: ریل برند + تب‌های افقی + کارت فرم.
   «خوشگل‌تر» یعنی: یکدست، آرام، با تصویر برند — نه شلوغ‌تر.            */
function authTabs(active){
  var items=[['login','ورود'],['signup','ثبت‌نام'],['forgot','بازیابی رمز']];
  return '<div class="authtabs h">'+items.map(function(t){
    return '<a href="#'+t[0]+'" class="'+(active===t[0]?'on':'')+'">'+t[1]+'</a>';}).join('')+'</div>';
}
function authHd(title,sub){
  return '<div class="auth-hd"><h1>'+title+'</h1><p class="sub">'+sub+'</p></div><div id="autherr"></div>';
}
function authShell(active,title,sub,body){
  return '<div class="auth2">'+authRail()+'<div class="auth-main">'+authTabs(active)+
    '<section class="auth-card wide fadeup auth-pane">'+authHd(title,sub)+body+'</section></div></div>';
}
/* کارت پشتیبانی — همان مسیر کد دستی ثبت‌نام (۲۲ §۳.۱) */
function supportCard(title,txt){
  return '<div class="sup-card">'+
    '<div class="sup-top"><span class="sup-ic">'+ic('i-chat')+'</span>'+
      '<span><b>'+title+'</b><small class="tiny">'+txt+'</small></span></div>'+
    '<div class="sup-row"><span class="sup-num" dir="ltr">۰۹۹۶۷۹۷۹۴۷۱</span>'+
      '<button class="btn ghost sm" data-copy="09967979471">'+ic('i-file')+'کپی شماره</button>'+
      '<button class="btn soft sm" data-authcode>'+ic('i-chat')+'پیام آماده</button></div>'+
    '<div class="tiny muted">دو راه: پیامک به همین شماره، یا پیام در بله. کد را دستی برایت می‌فرستند.</div>'+
  '</div>';
}

/* ============================ ۲) ورود — سند ۲۲ §۲ ============================ */
function R_login(){
  return authShell('login','خوش برگشتی 🌿','از همان‌جایی که بودی ادامه بده.',
    '<div class="auth-grid">'+
      fx('li','نام کاربری','مثلاً sara','text',{ac:'username',dir:'ltr'})+
      fx('lp','رمز عبور','••••••••','password',{ac:'current-password',
        tail:'<button class="fxeye" data-pw aria-label="نمایش رمز">'+ic('i-eye')+'</button>'})+
    '</div>'+
    '<label class="perm-row"><span class="cb" data-tglcb></span><span class="pbody"><b>مرا به خاطر بسپار</b>'+
      '<em>فقط روی همین دستگاه — هر وقت خواستی در تنظیمات می‌بندی.</em></span></label>'+
    '<button class="btn primary wide big" data-login>ورود</button>'+
    '<div class="alt">حساب نداری؟ <a href="#signup">ثبت‌نام کن</a> · '+
      '<a href="#forgot">رمزت را فراموش کردی؟</a></div>'+
    note('خطای ورود <b>مشترک</b> است و حساب را لو نمی‌دهد. مسیر بازیابی رمز ساخته شد: کد یک‌بارمصرف که '+
      '<b>سرور صادر می‌کند</b> و <b>پشتیبانی تحویل می‌دهد</b> — چون ایمیل و پیامکِ محصولی وصل نیستند (۲۲ §۴).'));
}

/* ========================= ۴) بازیابی رمز — سند ۲۲ §۴ =========================
   چهار گام. کد را سرور صادر می‌کند (یک‌بارمصرف، ۱۵ دقیقه) و پشتیبانی تحویل می‌دهد. */
function R_forgot(){
  var st=APP.forgotStep||0;
  var dots='<div class="fg-dots">'+[0,1,2,3].map(function(k){
    return '<i class="'+(k<st?'done':(k===st?'on':''))+'"></i>';}).join('')+'</div>';
  var hd='<div class="fg-hd">'+ic('i-lock')+'<b>گام '+fa(st+1)+' از '+fa(4)+'</b>'+dots+'</div>';

  if(st===0){
    return authShell('forgot','بازیابی رمز','اول بگو کدام حساب را می‌خواهی برگردانی.', hd+
      '<div class="auth-grid">'+fx('fgi','نام کاربری یا موبایل ثبت‌شده','مثلاً sara یا ۰۹۱۲۳۴۵۶۷۸۹','text',{wide:true,dir:'ltr'})+'</div>'+
      '<button class="btn primary wide big" data-fg="id">ادامه</button>'+
      '<div class="banner info tiny">'+ic('i-info')+
        'پاسخ همیشه یکسان است: «اگر این شناسه حسابی داشته باشد، کد یک‌بارمصرف برایش صادر می‌شود.» '+
        'این‌طور هیچ‌کس نمی‌فهمد چه حسابی وجود دارد.</div>'+
      note('کد رمز نیست و رمز هم هیچ‌وقت فرستاده نمی‌شود — رمز در سرور به‌صورت هش نگه داشته می‌شود.'));
  }
  if(st===1){
    return authShell('forgot','کد یک‌بارمصرف','کد را از پشتیبانی بگیر.', hd+
      supportCard('کد بازیابی را از پشتیبانی بگیر','بگو حسابم را گم کرده‌ام؛ کد را دستی می‌فرستند.')+
      '<div class="auth-grid" style="margin-top:14px">'+
        fx('fgc','کد یک‌بارمصرف','۶ رقمی','text',{wide:true,dir:'ltr'})+'</div>'+
      '<button class="btn primary wide big" data-fg="code">تأیید کد</button>'+
      '<div class="alt"><a href="#" data-fg="back">شناسه را عوض کن</a></div>'+
      note('کد ۱۵ دقیقه اعتبار دارد، یک‌بارمصرف است و ۵ بار می‌شود امتحانش کرد. '+
        'پشتیبانی <b>هرگز</b> رمز نمی‌پرسد و رمز تازه را هم نمی‌سازد — فقط کد می‌دهد.'));
  }
  if(st===2){
    return authShell('forgot','رمز تازه','حالا یک رمز تازه بساز.', hd+
      '<div class="auth-grid">'+
        fx('fp1','رمز تازه','حداقل ۸ نویسه','password',{wide:true,ac:'new-password',
          tail:'<button class="fxeye" data-pw aria-label="نمایش رمز">'+ic('i-eye')+'</button>'})+
        fx('fp2','تکرار رمز تازه','همان رمز','password',{wide:true,ac:'new-password'})+
      '</div>'+
      '<div class="strength" id="str"><i></i><i></i><i></i><i></i><span class="tiny" id="strtxt">قدرت رمز</span></div>'+
      '<button class="btn primary wide big" data-fg="save">ذخیرهٔ رمز تازه</button>'+
      note('پس از ذخیره، <b>همهٔ نشست‌های دیگر باطل می‌شوند</b> و باید از نو وارد شوی. '+
        'یک پیام هم به همان کانال می‌آید: «رمز حساب تو عوض شد؛ اگر این تو نبودی فوراً به پشتیبانی بگو.»'));
  }
  return authShell('forgot','رمزت عوض شد ✓','حالا با رمز تازه وارد شو.', hd+
    '<div class="fg-done">'+owl('owl-cheer',96,'floaty')+
      '<p class="sub">رمز تازه ذخیره شد. از دستگاه‌های دیگر خارج شدی و یکی‌یکی باید از نو وارد شوی.</p></div>'+
    '<button class="btn primary wide big" data-fg="login">'+ic('i-checkc')+'ورود با رمز تازه</button>'+
    '<div class="alt">اگر این کار تو نبود، همین حالا به <a href="#content">پشتیبانی</a> بگو.</div>');
}

function R_signup(){
  /* ---------- ثبت‌نام: همان فرم اسکرین‌شات، کامل ---------- */
  return authShell('signup','ساخت حساب جومای من','با پذیرش قوانین، حساب کاربری خودت را می‌سازی.',
  '<div class="auth-grid">'+
    fx('sn','نام','مثلاً سارا','text',{ac:'given-name'})+
    fx('sf','نام خانوادگی','مثلاً محمدی','text',{ac:'family-name'})+
    fx('su','نام کاربری','۳ تا ۲۰ کاراکتر — حرف و عدد','text',{ac:'username',dir:'ltr'})+
    fx('sm','شماره موبایل','۰۹۱۲۳۴۵۶۷۸۹','tel',{dir:'ltr',ac:'tel',data:'authphone'})+
    fx('se','ایمیل','you@example.com','email',{dir:'ltr',ac:'email'})+
    fx('sp','رمز عبور','حداقل ۸ نویسه','password',{ac:'new-password',tail:'<button class="fxeye" data-pw aria-label="نمایش رمز">'+ic('i-eye')+'</button>',data:'authpw'})+
    fx('sp2','تکرار رمز عبور','همان رمز','password',{ac:'new-password',hint:'هر دو رمز باید یکی باشند — همین‌جا چک می‌شود.'})+
  '</div>'+
  '<div class="strength" id="str"><i></i><i></i><i></i><i></i><span class="tiny" id="strtxt">قدرت رمز</span></div>'+
  supportCard('کد ثبت‌نام را از پشتیبانی بگیر','بگو می‌خواهم حساب بسازم؛ کد را دستی می‌فرستند.')+
  '<div class="auth-grid tight">'+
    fx('sc','کد ثبت‌نام','کد را از پشتیبانی بگیر','text',{dir:'ltr',data:'authcode',hint:'پیامک سیستم وصل نیست؛ کد دستی داده می‌شود.',tail:'<button class="fxbtn" data-authcode>'+ic('i-chat')+'دریافت کد از پشتیبانی</button>'})+
  '</div>'+
  '<label class="perm-row"><span class="cb'+(APP.authTerms?' on':'')+'" data-tglcb="terms"></span>'+
    '<span class="pbody"><b>قوانین و مقررات و سیاست حفظ حریم خصوصی را خوانده‌ام و می‌پذیرم.</b>'+
    '<em>نسخهٔ متنی همین‌جا در دسترس است — پیش از انتشار تجاری، بررسی حقوقی می‌شود (۱۷٫۳). '+
    '<a href="#content">خواندن قوانین و مقررات</a> · <a href="#content">حریم خصوصی</a></em></span></label>'+
  '<div class="banner info tiny" style="margin:2px 0 12px">'+ic('i-info')+
    'شمارهٔ موبایل و ایمیل برای «بازیابی حساب» و «پشتیبانی» است؛ هیچ‌وقت برای تبلیغ استفاده نمی‌شود '+
    'و پشتیبانی هرگز رمز نمی‌پرسد.</div>'+
  '<button class="btn primary wide big" data-auth="signup">'+ic('i-checkc')+'ساخت حساب جدید</button>'+
  '<div class="alt">قبلاً حساب ساختی؟ <a href="#" data-authtab="login">وارد شو</a></div>'+
  note('این فرم <b>هیچ فیلد نقشی ندارد</b> — و نباید داشته باشد. حساب همیشه با نقش <b>کاربری</b> ساخته می‌شود و '+
    'ارتقای نقش <b>فقط از مسیر مدیریت</b> انجام می‌شود (سند ۲۴). انتخاب نقش در ثبت‌نام، همان لحظه یک '+
    '<b>حفرهٔ دسترسی</b> می‌سازد — پس وجود ندارد، حتی به‌عنوان «درخواست».'));
}
function authRail(){
  return '<aside class="auth-rail">'+
    '<div class="rail-brand"><span class="brand-mark">'+owl('owl-logo',36)+'</span>'+
      '<span><b>جوما</b><small>برنامه. اجرا. فهم.</small></span></div>'+
    '<div class="rail-art">'+
      '<svg width="100%" height="92" viewBox="0 0 220 92" aria-hidden="true">'+
        '<path d="M0 78q38-28 76-9t60 3q40-15 84-26v46H0Z" fill="rgba(255,255,255,.55)"/>'+
        '<circle cx="46" cy="18" r="7" fill="rgba(255,255,255,.75)"/>'+
        '<circle cx="188" cy="27" r="4.5" fill="rgba(255,255,255,.6)"/>'+
        '<circle cx="162" cy="12" r="3" fill="rgba(255,255,255,.5)"/>'+
      '</svg>'+
      '<span class="rail-owl">'+owl('owl-hi',62,'floaty')+'</span>'+
    '</div>'+
    '<div class="rail-chips">'+
      ['۱۰۷ فعالیت آماده','جوجهٔ همراه','روزی چند دقیقه'].map(function(c){
        return '<span class="rail-chip">'+c+'</span>';}).join('')+
    '</div>'+
    '<p class="tiny rail-txt">جوما جایی برای چیدن کارها، ثبت روزانه و دیدن الگوهای خودت است. '+
      'هر چیزی که ثبت کنی مال خودت است و فقط با اجازهٔ خودت دیده می‌شود.</p>'+
    '<a class="rail-back" href="#landing">'+ic('i-chev-r')+'بازگشت به صفحهٔ معرفی</a>'+
  '</aside>';
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
    '</div>'+

    /* کارت دعوت یک‌بارهٔ هم‌مسیر — فقط اینجا، فقط یک‌بار (سند ۲۰ §۳٫۳٫۱) */
    (compInviteAllowed()? compInviteCard():'');
}

/* ======================== ۵) کارهای امروز — سند ۱۲ ======================== */
function R_today(){
  /* هر ردیف: نوع داده (از بک‌اند) + واحد + هدف. ورودی با نوع داده عوض می‌شود. */
  var rows=D([
    {ic:'i-walk', n:'پیاده‌روی',  sub:'۲۰ دقیقه · روزانه', kind:'duration', unit:'دقیقه', step:5,  v:20, st:'done'},
    {ic:'i-drop', n:'نوشیدن آب',  sub:'۸ لیوان · روزانه',  kind:'count',    unit:'لیوان', step:1,  v:3,  st:'draft'},
    {ic:'i-heart',n:'ورزش',       sub:'۳ جلسه · هفتگی',    kind:'yesno',    unit:'',      step:0,  v:1,  st:'done'},
    {ic:'i-lotus',n:'مدیتیشن',    sub:'۱۵ دقیقه · روزانه', kind:'duration', unit:'دقیقه', step:5,  v:0,  st:'wait'},
    {ic:'i-moon', n:'خواب کافی',  sub:'۸ ساعت · روزانه',   kind:'slept',    unit:'',      step:0,  v:7.5,st:'draft'},
    {ic:'i-book', n:'مطالعه',     sub:'۱۰ صفحه · هفتگی',   kind:'count',    unit:'صفحه',  step:1,  v:0,  st:'wait'},
    {ic:'i-heart',n:'ثبت حال',    sub:'اختیاری',           kind:'link',     unit:'',      step:0,  v:0,  st:'lock'}
  ],[]);

  var tabs=D([['روزانه',4],['هفتگی',2],['ماهانه',2]],[['روزانه',0]]);

  var valueCell=function(r){
    if(r.st==='lock') return '<span class="tiny">امروز ثبت شد</span>';
    if(r.kind==='link') return '<button class="btn soft sm" data-go="mood">ثبت حال</button>';
    if(r.kind==='yesno') return '<div class="yesno"><button class="'+ (r.v?'on':'')+'" data-yes>'+ic('i-check')+'انجام شد</button>'+
      '<button data-no>'+ic('i-x')+'انجام نشد</button></div>';
    if(r.kind==='slept') return '<div class="numrow"><button data-minus>−</button>'+
      '<span class="numval">'+(r.v?fa(String(r.v).replace('.',','))+' ساعت':'—')+'</span><button data-minus>+</button></div>';
    /* count و duration: دکمه‌های ± و ورودی عددی، هوشمند با step و واحد */
    return '<div class="numrow"><button data-minus aria-label="کم">−</button>'+
      '<span class="numval"><b>'+fa(r.v||0)+'</b> <small>'+r.unit+'</small></span>'+
      '<button data-plus aria-label="بیشتر">+</button></div>'+
      '<div class="steprow tiny">هر دکمه '+(r.step>1?fa(r.step)+' '+r.unit+'':'۱ '+r.unit)+'</div>';
  };

  return head('امروز','کارهای امروز',D('۴ از ۷ کار امروز ثبت شده.','برنامه‌ات هنوز فعالیتی ندارد.'),
      '<span class="daynav"><button disabled>‹ دیروز</button><button class="on">امروز</button>'+
      '<button>فردا</button></span>')+

    '<div class="banner info">'+ic('i-info')+
      'ثبت هر کار، <b>یک حرکت</b> است: با دکمه‌های کنار عدد کم و زیاد کن، یا «انجام شد / انجام نشد» را بزن. '+
      'نوع ورودی برای هر فعالیت <b>از بک‌اند</b> می‌آید — دقیقه، صفحه، لیوان، ساعت یا بله/خیر.</div>'+

    (APP.stress>=3 && !empty() ? breathCard('today') : '')+

    '<div class="tabs">'+tabs.map(function(t2,i){
      return '<button class="'+(i===0?'on':'')+'" data-tab="'+i+'">'+t2[0]+' <small>('+fa(t2[1])+')</small></button>';
    }).join('')+'</div>'+

    waterCard()+
    note('لیوان‌ها <b>فقط اینجا نوشته می‌شوند</b>؛ در خانه فقط خلاصه خوانده می‌شود. '+
      'هر شش وضعیت داده <b>متن</b> دارند، نه فقط رنگ.')+

    '<div class="grid2"><div class="card">'+
      (rows.length?
        '<table class="tbl"><thead><tr><th>فعالیت</th><th style="width:210px">مقدار امروز</th><th style="width:130px">وضعیت</th></tr></thead><tbody>'+
        rows.map(function(r){
          return '<tr class="trow" data-row><td><span class="act"><span class="chip '+
            ({done:'g',draft:'s',wait:'go',err:'c',lock:'n'})[r.st]+'">'+ic(r.ic)+'</span>'+
            '<span><b>'+r.n+'</b><small>'+r.sub+'</small></span></span></td>'+
            '<td>'+valueCell(r)+'</td>'+
            '<td><span class="tst '+r.st+'">'+ic(r.st==='done'?'i-check':(r.st==='err'?'i-info':'i-clock'))+
            ({done:'ثبت قطعی',draft:'پیش‌نویس',wait:'ثبت نشده',err:'خطا در ثبت',lock:'قفل — امروز ثبت شد'})[r.st]+'</span></td></tr>';
        }).join('')+'</tbody></table>'
        :
        '<div style="text-align:center;padding:22px">'+owl('owl-think',60,'floaty')+
        '<h3 style="margin-top:10px">برنامه‌ات هنوز فعالیتی ندارد</h3>'+
        '<p class="tiny" style="margin-top:6px">اول از کتابخانه انتخاب کن، بعد اینجا ثبت می‌شود.</p>'+
        '<a class="btn primary sm" style="margin-top:12px" href="#library">افزودن از کتابخانه</a></div>')+
      (rows.length?'<div class="tfoot"><span class="tiny">هر تغییر تا <b>ثبت نهایی</b> پیش‌نویس است؛ بعد از ثبت نهایی، قطعی می‌شود.</span>'+
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
        '<button class="btn soft sm wide" style="margin-top:10px" data-go="mood">ثبت حال</button>'+
        '<button class="btn ghost sm wide" style="margin-top:8px" data-breathopen="today">'+ic('i-lotus')+'تمرین تنفس ۴-۷-۸</button></div>'+
    '</div></div>'+

    /* جملهٔ امروز — پایانِ خوشامدِ مرجع: یک جملهٔ کوتاه برای خودت */
    '<div class="card todayline">'+owl('owl-hi',42)+
      '<div><h3 style="font-size:14px">یک جمله برای امروز</h3>'+
      '<p class="tiny" style="margin-top:4px">اگر دوست داری، امروز را با یک جمله ثبت کن — حتی کوتاه. نوشتن اجباری نیست؛ '+
      'ثبت حال کافی است. 🤍</p></div>'+
      '<button class="btn soft sm" data-go="mood">نوشتن جمله</button></div>'+

    (empty()?'':'<div class="doneb">'+owl('owl-cheer',38)+
      'همه را ثبت کردی! — جوما به تو افتخار می‌کند</div>')+
    note('«ثبت نهایی» قفل روز را می‌بندد. افزودن یا حذف فعالیت روی دورهٔ در حال اجرا <b>ممنوع دائمی</b> است — '+
      'پس دکمه‌ای هم ندارد، حتی خاکستری. '+
      'دکمه‌های ± مقدار را با **step همان واحد** (از بک‌اند) عوض می‌کنند؛ برای خواب، ساعت و نیم‌ساعت.');
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
  /* 🔴 حالت مشاور: صفحهٔ حال باز نمی‌شود (سند ۲۴ §۳.۳) */
  if(APP.roleView==='coach'){
    return head('حال من','این صفحه در حالت مشاور باز نمی‌شود',
        'مشاور با حساب خودش حالی ثبت نمی‌کند؛ کارش پروندهٔ مراجع‌هاست.',
        '<span class="chip go">حالت: مشاور</span>')+
      '<div class="scene" style="background:linear-gradient(150deg,var(--lav-soft),var(--sky-soft))">'+
        '<div class="art">'+owl('owl-think',84,'floaty')+'</div>'+
        '<h2>حال من، برای حسابِ خودت است</h2>'+
        '<p class="sub">وقتی در نقش مشاور وارد می‌شوی، جومای شخصی‌ات (حال، جوجه، برنامه) کنار می‌رود و '+
        'داشبورد مراجع‌ها می‌آید. همان لحظه که به نقش کاربری برگردی، <b>دقیقاً مثل هر کاربر دیگری</b> با تو رفتار می‌شود.</p>'+
        '<div class="bc-acts"><button class="btn primary" data-roleto="client">برگرد به نقش کاربری</button>'+
          '<button class="btn ghost" data-go="hammasir">داشبورد مشاور</button></div></div>'+
      note('قاعده یک‌طرفه نیست: مشاور <b>هم</b> یک کاربر است (نقش کاربری همیشه هست) — فقط تا وقتی در حالت مشاور است، '+
        'صفحه‌های شخصی از ناوبری کنار می‌روند تا دادهٔ شخصی و پروندهٔ مراجع قاطی نشود.');
  }
  var step=APP.moodStep;
  var NOTE_STEP=MOOD_STEPS.length;
  var finished=(step>NOTE_STEP);
  var s=MOOD_STEPS[step]||MOOD_STEPS[MOOD_STEPS.length-1];
  var ans=APP.moodAnswers[s.k];
  var done=Object.keys(APP.moodAnswers).length;

  var wiz='<div class="wiz-top">'+MOOD_STEPS.map(function(x,i){
    var cls=i<step?'done':(i===step?'on':'');
    return '<span class="wdot '+cls+'"><span class="d">'+(i<step?'✓':fa(i+1))+'</span><span class="ln"></span></span>';
  }).join('')+'<span class="wdot '+(step>NOTE_STEP?'done':(step===NOTE_STEP?'on':''))+
    '"><span class="d">'+(step>NOTE_STEP?'✓':'✎')+'</span></span></div>';

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
        '<div class="note-show">'+ic('i-lock')+'<span>'+(APP.moodNote? esc(APP.moodNote)
          : 'بدون جمله — هر وقت خواستی می‌توانی بنویسی.')+'</span></div>'+
        '<div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">'+
        '<button class="btn soft sm" data-mood-note-edit>نوشتن / ویرایش جمله</button>'+
        '<button class="btn soft sm" data-mood-reset>اصلاح پاسخ‌ها</button>'+
        '<button class="btn primary sm" data-go="home">بازگشت به خانه</button>'+
        '<button class="btn ghost sm" data-go="reports">دیدن گزارش</button></div>'+
      '</div>'+
      (APP.stress>=3? breathCard('mood'):'')+
      note('پس از ثبت، پاسخ‌ها <b>قابل اصلاح‌اند</b> ولی نسخهٔ قبلی در تاریخچه می‌ماند — «اصلاح با دلیل»، نه پاک‌کردن بی‌رد.')+
      wnav('cheer');
  }

  if(step===NOTE_STEP){
    return head('حال من','امروز را در یک جمله بنویس',D('اختیاری است — اگر دوست داشتی بنویس، اگر نه رد کن.',''),
        '<span class="headacts"><span class="chip g">'+fa(done)+' از '+fa(5)+' ثبت شد</span></span>')+ wiz+
      '<div class="scene" style="background:var(--lav-soft)">'+
        '<div class="art">'+owl('owl-think',76,'floaty')+'</div>'+
        '<h2>یک جمله برای خودت</h2>'+
        '<p class="sub">نه برای گزارش، نه برای کسی — فقط برای اینکه فردا یادت بیاید امروز چه خبر بود.</p>'+
        '<div class="note-box"><textarea data-moodnote rows="3" placeholder="مثلاً: امروز سخت بود، ولی پیاده‌روی حالم را بهتر کرد…">'+esc(APP.moodNote||'')+'</textarea>'+
          '<div class="note-foot"><span class="chip go">'+ic('i-lock')+'فقط خودت</span>'+
          '<span class="tiny muted">هم‌مسیر فقط <b>عددها و نمودارها</b> را می‌بیند. متن یادداشت مجوز جداگانه دارد '+
          '(<code>VIEW_NOTES</code>) و <b>پیش‌فرض خاموش</b> است — تا خودت روشنش نکنی، هیچ‌کس نمی‌بیند.</span></div></div>'+
        '<div class="bc-acts"><button class="btn primary" data-mood-note-save>ذخیره و پایان</button>'+
          '<button class="btn ghost" data-mood-note-skip>بدون جمله</button></div></div>'+
      note('این جمله <b>هیچ سنجه‌ای را عوض نمی‌کند</b> — نه جوجه، نه سطح، نه گزارش. '+
        'در «دفترچه» کنار همان روز می‌نشیند و بعداً هم قابل ویرایش است.');
  }

  return head('حال من','حال من',D('پنج قدم کوتاه. هر پنج تا هم اختیاری‌اند — می‌توانی همین حالا بروی.',''),
      '<span class="headacts"><button class="btn ghost sm" data-breathopen="mood">'+ic('i-lotus')+'تمرین تنفس</button>'+
      '<span class="chip g">'+fa(done)+' از '+fa(5)+' ثبت شده</span></span>')+
    wiz+
    '<div class="scene" style="background:var('+s.bg+')">'+
      '<div class="art">'+moodArt(s.k,ans===undefined?null:ans)+'</div>'+
      '<h2>'+s.q+'</h2><p class="sub">'+s.sub+'</p>'+
      '<div class="opts">'+s.opts.map(function(o,i){
        return '<button class="opt'+(ans===i?' sel':'')+'" data-mood="'+i+'">'+
          '<span class="oart">'+optArt(s.k,i)+'</span>'+
          '<span class="olbl">'+o+'</span></button>';}).join('')+'</div>'+
    '</div>'+
    wnav('think', step, s, ans)+
    note('«خواب دیشبت» عمداً <b>کیفیت</b> را می‌پرسد نه ساعت — و همین جمله در زیرنویس آمده تا کاربر اشتباه نکند. '+
      '<br>هر گزینه <b>نمایهٔ بصری خودش</b> را دارد (باتری · حلقه · ماه و ستاره · بادکنک) و با انتخاب، '+
      'خودکار به قدم بعد می‌رود — کاربر لازم نیست «بعدی» بزند. «رد کن» برای وقتی است که نخواهد جواب بدهد.');
}
function wnav(mood){
  var step=Math.min(APP.moodStep,MOOD_STEPS.length-1);
  var s=MOOD_STEPS[step]||{k:'mood'}, ans=APP.moodAnswers[s.k];
  var msg='پنج قدم کوتاه. هر پنج تا هم اختیاری‌اند — می‌توانی همین حالا بروی.';
  if(ans!==undefined && MOOD_MSG[s.k]) msg=MOOD_MSG[s.k][ans];
  return '<div class="wnav">'+owl(mood==='cheer'?'owl-cheer':(ans!==undefined?'owl-hi':'owl-think'),42)+
    '<div class="bub">'+msg+(ans!==undefined?'':' <span class="tiny">— یا «رد کن» بزن.</span>')+'</div>'+
    '<button class="btn ghost sm" '+(step===0?'disabled':'')+' data-mood-prev>قبلی</button>'+
    '<button class="btn soft sm" data-mood-skip>'+
      (step===MOOD_STEPS.length-1?'پایان':'رد کن ›')+'</button></div>';
}
