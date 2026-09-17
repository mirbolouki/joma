/* ==========================================================================
   دستهٔ ۳ — هم‌مسیر (۲۰) · تنظیمات (۲۱) · نقش‌ها (۲۴) · کنسول مدیر (۲۴) ·
   صفحه‌های محتوایی (۲۵) · حقوق داده (۲۶)
   ========================================================================== */

/* ============================ ۱۳) هم‌مسیر — سند ۲۰ ============================ */
var LINK_STATE={
  NONE:{t:'بدون ارتباط', c:'',          s:'هنوز کسی را کنارت نیاورده‌ای. اشکالی ندارد — خیلی‌ها تنها شروع می‌کنند.'},
  PENDING_OUT:{t:'منتظر پاسخ', c:'go',  s:'درخواست فرستاده شد. تا پاسخ او، دسترسی‌ای به دادهٔ تو وجود ندارد.'},
  PENDING_IN:{t:'از طرف او',  c:'go',   s:'او خواسته همراهت باشد. تا خودت تأیید نکنی، هیچ داده‌ای نمی‌بیند.'},
  ACTIVE:{t:'همراه فعال',     c:'g',    s:'ارتباط برقرار است — فقط با مجوزهایی که خودت روشن کرده‌ای.'},
  REVOKED:{t:'قطع‌شده',       c:'',     s:'ارتباط قطع شد. دیتای قبلی نزد او نمی‌ماند؛ مسیر درخواست دوباره نیازمند راستی‌آزمایی است.'},
  DECLINED:{t:'پذیرفته نشد',  c:'',     s:'این درخواست پذیرفته نشد. تا ۲۴ ساعت امکان درخواست دوباره نیست.'}
};
var PERMS=[
  ['VIEW_SUMMARY','خلاصهٔ وضعیت و پیشرفت کلی','شمار روزهای ثبت‌شده، وضعیت فعالیت‌ها'],
  ['VIEW_PROGRESS','پیشرفت و پوشش تجمیعی','درصدها و نمودارهای دوره'],
  ['VIEW_ACTIVITY_DETAILS','جزئیات فعالیت‌ها','کدام فعالیت‌ها را چقدر انجام داده‌ای'],
  ['VIEW_MOOD','شاخص‌های حال من','شامل متن یادداشت‌های روزانه']
];

function hamGuide(){
  return '<div class="card guide">'+
    '<div class="g-row">'+owl('owl-hi',52,'floaty')+
    '<div><h3>همراه کیست؟</h3>'+
    '<p class="tiny">همراه کسی است که در این مسیر راهنمایی‌ات می‌کند — مشاور، کوچ یا مربی.<br>'+
    'اینجا دوست و آشنا اضافه نمی‌شود.<br>'+
    'همراه به هیچ داده‌ای دسترسی ندارد، مگر خودت اجازه بدهی.</p></div></div></div>';
}

function R_hammasir(){
  var role=APP.hamRole||'client';
  if(role==='companion') return R_hammasir_comp();

  var st=APP.hamLink||'ACTIVE';
  var L=LINK_STATE[st];
  var name='دکتر مینا رستمی';
  var clients=empty()?0:4;

  var linkCard;
  if(st==='NONE'){
    linkCard='<div class="card"><div class="empty-mini">'+
      '<b>هنوز همراهی نداری</b>'+
      '<p class="tiny">وقتی خواستی، یک مشاور انتخاب کن. تا خودش قبول نکند و تو تأیید نکنی، هیچ‌چیز رد و بدل نمی‌شود.</p></div></div>';
  } else if(st==='PENDING_OUT'){
    linkCard='<div class="link-card"><span class="avatar">'+esc(name[0]||'م')+'</span>'+
      '<div class="lc-body"><b>منتظر پاسخ '+name+'</b><div class="tiny">درخواست ۲ ساعت پیش فرستاده شد</div>'+
      '<div class="tiny">۲۴ ساعت تا امکان درخواست دوباره</div></div>'+
      '<button class="btn ghost sm" data-hamcancel>لغو درخواست</button></div>';
  } else if(st==='PENDING_IN'){
    linkCard='<div class="link-card hot"><span class="avatar">م</span>'+
      '<div class="lc-body"><b>'+name+' می‌خواهد همراهت باشد.</b>'+
      '<div class="tiny">اگر قبول کنی، فقط آنچه تو روشن کنی را می‌بیند. تا آن لحظه، هیچ داده‌ای ندیده است.</div></div>'+
      '<div class="lc-act"><button class="btn primary sm" data-hamaccept>پذیرش</button>'+
      '<button class="btn ghost sm" data-hamdecline>رد</button></div></div>';
  } else if(st==='ACTIVE'){
    linkCard='<div class="link-card"><span class="avatar">م</span>'+
      '<div class="lc-body"><b>'+name+' — همراه فعال</b>'+
      '<div class="perm-chips">'+
        ['خلاصهٔ وضعیت','پیشرفت','جزئیات فعالیت‌ها'].map(function(p){
          return '<span class="chip g" style="font-size:10px">'+ic('i-check')+p+'</span>';}).join('')+
        '<span class="chip" style="font-size:10px">حال من — خاموش</span>'+
      '</div>'+
      '<div class="tiny">شروع همراهی: ۱ مرداد ۱۴۰۵ · رضایت نسخهٔ ۲</div></div>'+
      '<div class="lc-act"><button class="btn soft sm" data-dm>گفت‌وگو</button>'+
      '<button class="btn ghost sm" data-hamcut>قطع ارتباط</button></div></div>';
  } else if(st==='REVOKED'){
    linkCard='<div class="link-card off"><span class="avatar">م</span>'+
      '<div class="lc-body"><b>ارتباط با '+name+' قطع شده</b>'+
      '<div class="tiny">دسترسی او از لحظهٔ قطع، بسته شد.</div>'+
      '<div class="tiny muted">مسیر درخواست دوباره: [نیازمند راستی‌آزمایی]</div></div></div>';
  } else {
    linkCard='<div class="link-card off"><span class="avatar">م</span>'+
      '<div class="lc-body"><b>'+name+' این درخواست را نپذیرفت.</b>'+
      '<div class="tiny">تا ۲۴ ساعت، دکمهٔ «دوباره بفرست» نمایش داده نمی‌شود.</div></div></div>';
  }

  var steps='<div class="card"><h3>'+ic('i-heart')+'دعوت همراه</h3>'+
    '<p class="tiny">چهار گام صریح — نه ویزارد، کارت‌های پشت‌سرهم.</p>'+

      '<div class="istep"><span class="inum">۱</span><div><b>همراه را انتخاب کن</b>'+
        (empty()
          ? '<div class="banner warn" style="margin-top:8px">'+ic('i-info')+
            'هنوز هیچ مشاوری در فهرست نیست. دراپ‌داون نمایش داده نمی‌شود و فیلد نام کاربری هم وجود ندارد.</div>'
          : '<div class="dropdown"><span>'+ic('i-search')+'یک مشاور انتخاب کن</span>'+
            '<div class="dd-list"><b>دکتر مینا رستمی</b><span class="tiny">مشاور · ۴ مراجع</span>'+
            '<b>علی کاظمی</b><span class="tiny">کوچ · ۲ مراجع</span></div></div>'+
            '<div class="tiny" style="margin-top:6px">به او خبر می‌دهیم و خودش تصمیم می‌گیرد. فهرست از نقش مشاور می‌آید، که مدیر داده.</div>')+
      '</div></div>'+

      '<div class="istep"><span class="inum">۲</span><div><b>چه چیزی می‌بیند؟</b>'+
        '<div class="tiny">هیچ چک‌باکسی پیش‌انتخاب نمی‌شود. تصمیم تو، نه پیش‌فرض محصول.</div>'+
        '<div class="perm-list">'+
          PERMS.map(function(p){
            return '<label class="perm-row"><span class="cb"></span><span><b>'+p[1]+'</b>'+
              '<em>'+p[2]+(p[0]==='VIEW_MOOD'?' — <b>شامل متن یادداشت‌های روزانه</b>':'')+'</em></span></label>';
          }).join('')+
          '<div class="sep"></div>'+
          '<div class="tiny"><b>گفت‌وگو</b> — برای گفت‌وگو، هر دو گزینهٔ زیر لازم است:</div>'+
          '<label class="perm-row"><span class="cb"></span><span><b>من می‌توانم به او پیام بدهم</b><em>سقف روزانه از سرور</em></span></label>'+
          '<label class="perm-row"><span class="cb"></span><span><b>او می‌تواند به من پیام بدهد</b><em>سقف روزانه از سرور</em></span></label>'+
        '</div>'+
      '</div></div>'+

      '<div class="istep"><span class="inum">۳</span><div><b>متن رضایت</b>'+
        '<div class="consent">'+owl('owl-think',40)+'<div>'+
        'با فعال‌کردن مجوز «شاخص‌های حال من»، <b>متن یادداشت‌های روزانه‌ات</b> هم دیده می‌شود.<br>'+
        'سهمیهٔ پیام: مراجع ۳ در روز · همراه ۲۰ در روز · فاصلهٔ حداقلی ۵ ثانیه.<br>'+
        '<span class="muted">نسخهٔ رضایت ۲ — از سرور. اعداد، مقادیر گزارش‌شدهٔ سیاست‌اند؛ اگر بک‌اند عدد واقعی بدهد، همان نمایش داده می‌شود.</span>'+
        '</div></div>'+
      '</div></div>'+

      '<div class="istep"><span class="inum">۴</span><div>'+
        '<div class="acts" style="justify-content:flex-start">'+
        '<button class="btn primary sm" data-hamsend>فرستادن درخواست</button>'+
        '<button class="btn ghost sm" data-hamcode>کد دعوت دارم</button></div>'+
      '</div></div>'+
    '</div>';

  var chickShare='<div class="card sharebox"><h3>'+ic('i-chart')+'نشانگر وضعیت ثبت</h3>'+
    '<p class="tiny">یک کادر مستقل — نه بخشی از «خلاصهٔ وضعیت».</p>'+
    '<label class="perm-row on-left"><span class="cb on"></span><span>'+
    '<b>همراه بداند چند وقت است چیزی ثبت نکرده‌ام</b>'+
    '<em>اگر این را روشن کنی، همراهت روی صفحه‌اش نشانگری می‌بیند که می‌گوید چند روز است چیزی ثبت نکرده‌ای. '+
    'این نشانگر هیچ‌وقت حال، خلق یا یادداشتت را نشان نمی‌دهد — فقط وضعیت ثبت را. هر وقت خواستی می‌توانی خاموشش کنی.</em>'+
    '</span><button class="btn ghost sm" data-hamoff>خاموش کن</button></label>'+
    note('مبنا فقط فعالیت است. سه ممنوع مطلق: «حالش خوب نیست»، نمایش متن یادداشت، و نمایش برای مشاوری که مجوز ندارد.')+
  '</div>';

  var dm='<div class="card"><h3>'+ic('i-chat')+'گفت‌وگو با '+name+'</h3>'+
    '<div class="dm"><div class="dm-head"><b>'+name+'</b>'+
    '<span class="tiny num">۳ پیام از ۳ امروز · پرشدن تا فردا صبح</span></div>'+
    '<div class="dm-thread">'+
      '<div class="dm-msg you">سلام سارا، این هفته پیاده‌روی‌ات خوب بود. چهارشنبه چه خبر؟</div>'+
      '<div class="dm-msg me">ممنون. چهارشنبه نرسیدم، ولی خب سعی کردم جبران کنم.</div>'+
      '<div class="dm-msg you">همین تلاش کافیه. هفتهٔ بعد هدف را ۲۵ دقیقه بگذاریم؟</div>'+
    '</div>'+
    '<div class="dm-in"><span class="dm-lock">'+ic('i-lock')+'حداقل فاصله: ۵ ثانیه</span>'+
    '<textarea class="inp" rows="1" placeholder="پیام…"></textarea>'+
    '<button class="btn primary sm" data-send-dm>فرستادن</button></div></div>'+
    note('فرم گفت‌وگو عمداً بی‌تزئین است: بدون جغد، بدون حباب گرادینتی، بدون انیمیشن. گفت‌وگوی دو آدم است.')+
  '</div>';

  return head('هم‌مسیر','هم‌مسیر','یک نفر را کنارت بیاور. با هم راحت‌تر است.',
      '<span class="chip '+L.c+'">'+L.t+'</span>')+
    hamGuide()+
    '<div class="banner info">'+ic('i-info')+
      'این صفحه؛ نقش از <b>بک‌اند</b> می‌آید و رابط <b>جایگزین</b> می‌شود — نه اینکه دو حالت با هم بیایند و یکی با CSS مخفی شود.</div>'+
    linkCard+
    (clients||st==='ACTIVE'?'':'')+
    steps+
    chickShare+
    (st==='ACTIVE'?dm:'')+
    '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>مجوز</th><th>عبارت در رابط</th><th>توضیح زیرش</th></tr></thead><tbody>'+
      PERMS.map(function(p){return '<tr><td class="num tiny">'+p[0]+'</td><td><b>'+p[1]+'</b></td><td class="tiny">'+p[2]+'</td></tr>';}).join('')+
    '</tbody></table></div>';
}

function R_hammasir_comp(){
  var clients=empty()?[]:[
    {n:'سارا نمونه', d:'۱ مرداد ۱۴۰۵', p:['خلاصهٔ وضعیت','پیشرفت'], last:'۲ روز پیش ثبت کرده',
     st:'ok',   stt:'در مسیر است',        sts:'آخرین ثبت: دیروز'},
    {n:'رضا احمدی',  d:'۱۲ تیر ۱۴۰۵', p:['خلاصهٔ وضعیت','پیشرفت','جزئیات فعالیت‌ها'], last:'۳ روز است ثبت نکرده',
     st:'calm', stt:'این هفته کم‌فعال بوده', sts:'۳ تا ۵ روز بی‌ثبت'},
    {n:'نگار کریمی', d:'۳ خرداد ۱۴۰۵', p:['پیشرفت'], last:'۷ روز است ثبت نکرده',
     st:'miss', stt:'۶ روز است چیزی ثبت نکرده', sts:'نیازمند توجه'},
    {n:'امیر ت.',    d:'۲۵ شهریور ۱۴۰۵', p:[], last:'تازه شروع کرده',
     st:'egg',  stt:'تازه شروع کرده',        sts:'کمتر از ۷ روز از شروع'}
  ];

  if(!clients.length){
    return head('هم‌مسیر','مراجعان من','هنوز کسی به تو وصل نشده.', '<span class="chip">همراه</span>')+
      '<div class="card"><div class="nodata">'+owl('owl-moon',64,'floaty')+
      '<b>هنوز مراجعی نداری</b><p class="tiny">رابطه فقط با تأیید هر دو طرف ساخته می‌شود؛ تا آن لحظه هیچ داده‌ای نمی‌بینی.</p></div></div>'+
      note('«فهرست مشاوران خالی» و «مراجع خالی» دو حالت جدا با دو متن جدا هستند.');
  }

  var cards=clients.map(function(c){
    return '<div class="card cli-card"><div class="cc-top">'+
      '<span class="avatar">'+esc(c.n[0])+'</span>'+
      '<div><b>'+c.n+'</b><div class="tiny">شروع همراهی: '+c.d+'</div></div>'+
      chickSVG(44,c.st,c.st==='miss'?'tired':'ok')+
    '</div>'+
    '<div class="cc-state '+c.st+'"><b>'+c.stt+'</b><span class="tiny">'+c.sts+'</span></div>'+
    '<div class="perm-chips">'+(c.p.length?c.p.map(function(p){return '<span class="chip" style="font-size:10px">'+p+'</span>';}).join(''):'<span class="chip" style="font-size:10px">هنوز مجوزی نداده</span>')+'</div>'+
    '<div class="tiny muted">آخرین به‌روزرسانی داده: '+c.last+'</div>'+
    '<button class="btn soft sm" data-cliopen>دیدن صفحهٔ مراجع</button></div>';
  }).join('');

  return head('هم‌مسیر','مراجعان من',fa(clients.length)+' مراجع — فقط بخش‌هایی که مجوز داده‌اند.','<span class="chip">همراه</span>')+
    '<div class="banner info">'+ic('i-info')+
      'نشانگر جوجه روی این صفحه، <b>نشانگر وضعیت ثبت</b> است، نه حال کاربر: فقط روزهای بی‌ثبت. '+
      'اگر کاربر رابطه را قطع کند، نشانگر هم می‌رود.</div>'+
    '<div class="banner warn">'+ic('i-lock')+
      'آنچه نمی‌بینی: عدد حال · متن یادداشت · بینش‌های شخصی · «چه چیزی ثبت نکرده» · هر مقایسه‌ای با مراجع دیگر.</div>'+
    '<div class="grid2">'+cards+'</div>'+
    note('حالت‌ها (خوب/آرام/نیازمند توجه/تازه‌وارد) از بک‌اند می‌آیند؛ فرانت روزها را نمی‌شمارد. '+
      '«بازدید به‌عنوان همراه» وجود ندارد — هر نقش فقط رابط خودش را می‌بیند.')+
    '<div class="card"><h3>'+ic('i-info')+'صفحهٔ یک مراجع — چه چیزی رندر می‌شود</h3>'+
    '<p class="tiny">فقط بخش‌های مجاز. بخش غیرمجاز <b>حذف</b> می‌شود، نه با قفل نمایش داده شود؛ و دلیلی هم به همراه گفته نمی‌شود '+
    '(گفتن «مراجع اجازه نداده» فشار اجتماعی می‌سازد).</p>'+
    '<div class="kv"><span>سرصفحه</span><b>نام مراجع + شروع همراهی</b></div>'+
    '<div class="kv"><span>بخش‌های مجاز</span><b>هر کدام یک کارت</b></div>'+
    '<div class="kv"><span>گفت‌وگو</span><b>اگر مجوز باشد</b></div>'+
    '<div class="kv"><span>قطع ارتباط</span><b>همیشه در دسترس</b></div></div>';
}

/* ============================ ۱۴) تنظیمات و پروفایل — سند ۲۱ ============================ */
var BADGES=[
  ['🌱','اولین قدم','اولین ثبت','on'],
  ['🔥','۵ روز پیوسته','۵ روز پیوسته ثبت','on'],
  ['💧','آب‌شناس','۲۰ لیوان آب','on'],
  ['🌙','شب‌های آرام','۷ شب ثبت حال','on'],
  ['📖','اهل دفترچه','۱۰ بار خواندن بینش','off'],
  ['🏃','پیادهٔ ثابت','۳۰ روز پیاده‌روی','off'],
  ['🧘','نفس عمیق','۲۵ تمرین نفس','off']
];

function R_settings(){
  var tab=APP.setTab||'profile';
  var t=(tab==='profile')
    ? head('حساب من','پروفایل','کارت هویت، اطلاعات حساب، نشان‌ها.','<span class="chip">کاربری</span>')
    : head('حساب من','تنظیمات','ظاهر، پیام‌ها، داده و حریم خصوصی، درباره.','<span class="chip">کاربری</span>');

  var tabs='<div class="rtabs">'+
    [['profile','پروفایل'],['settings','تنظیمات']].map(function(x){
      return '<button class="'+(tab===x[0]?'on':'')+'" data-settab="'+x[0]+'">'+x[1]+'</button>';}).join('')+'</div>';

  if(tab==='profile'){
    var info=[
      ['نام نمایشی','سارا نمونه',true,''],
      ['نام کاربری','@sara',false,'نام کاربری قابل تغییر نیست'],
      ['ایمیل / شماره','sara@example.com',false,'[نیازمند راستی‌آزمایی] — سند مادر مشخص نکرده'],
      ['نقش','<span class="chip g">کاربری</span> <span class="chip">مشاور</span>',false,'از سرور'],
      ['تاریخ عضویت','۱۴۰۴',false,''],
      ['رمز عبور','••••••••',true,''],
      ['دورهٔ فعال','شهریور ۱۴۰۵',false,'از صفحهٔ برنامه'],
      ['همراه فعال','۱ نفر',false,'از هم‌مسیر']
    ];
    return t+tabs+
      '<div class="card profile-head"><span class="avatar xl">س</span>'+
        '<div><h1>سارا نمونه</h1><div class="tiny num">@sara · عضو از ۱۴۰۴</div>'+
        '<span class="chip g">کاربری</span> <span class="chip ind">مشاور</span></div>'+
        '<button class="btn ghost sm" data-editname>ویرایش</button></div>'+
      note('آواتار = حرف اول نام؛ بارگذاری تصویر پروفایل در سند مادر خواسته نشده.')+

      '<div class="card"><h3>'+ic('i-info')+'اطلاعات حساب</h3>'+
        info.map(function(r){
          return '<div class="kv ro"><span>'+r[0]+'</span><span class="v">'+r[1]+'</span>'+
            (r[2]?'<button class="btn ghost sm">تغییر</button>':'<span class="lock-reason">'+ic('i-lock')+(r[3]||'غیرقابل ویرایش')+'</span>')+'</div>';
        }).join('')+
      '</div>'+
      note('فیلد غیرقابل‌ویرایش با <b>قلم خاکستری و متن دلیل</b> می‌آید، نه با input غیرفعال — input خاکستری دعوت به تلاش است.')+

      '<div class="card"><h3>'+ic('i-star')+'نشان‌ها</h3>'+
        '<p class="tiny">هر نشان متن شرط دارد — آیکون تنها کافی نیست. هفت نشان نمونه است؛ فهرست نهایی از بک‌اند.</p>'+
        '<div class="badge-grid">'+BADGES.map(function(b){
          return '<div class="badge '+(b[3]==='on'?'on':'')+'"><span class="be">'+b[0]+'</span>'+
            '<b>'+b[1]+'</b><span class="tiny">'+b[2]+'</span></div>';}).join('')+'</div></div>'+

      '<div class="card"><h3>'+ic('i-link')+'مسیرهای حساب</h3>'+
        '<div class="kv"><span>هم‌مسیر من</span><button class="btn ghost sm" data-go="hammasir">باز کن</button></div>'+
        '<div class="kv ro"><span>خروجی گرفتن از داده‌های من</span>'+
          '<span class="lock-reason">'+ic('i-lock')+'تا تصمیم ۱۷٫۳ نمایش داده نمی‌شود</span></div>'+
        '<div class="kv"><span>حذف حساب</span><button class="btn ghost sm" data-go="rights">طراحی‌شده — مهلت ۳۰ روزه</button></div>'+
        '<div class="kv"><span>خروج از حساب</span><button class="btn ghost sm" data-logout>خروج</button></div>'+
      '</div>';
  }

  /* --- تنظیمات --- */
  var themes='<div class="theme-pick">'+
    [['classic','کلاسیک','سبز آرام، سطح ساده'],['glass','شیشه','رنگ‌های زنده، بلور ملایم']].map(function(x){
      return '<button class="tp '+(APP.theme===x[0]?'on':'')+'" data-settheme="'+x[0]+'">'+
        '<span class="tp-preview '+x[0]+'"><i class="tp-card"></i><i class="tp-btn"></i><i class="tp-line"></i></span>'+
        '<b>'+x[1]+'</b><small>'+x[2]+'</small></button>';}).join('')+'</div>';

  return t+tabs+
    '<div class="card"><h3>'+ic('i-sun')+'ظاهر</h3>'+
      '<div class="lbl">تم</div>'+themes+
      note('پیش‌نمایش تم، نمونهٔ واقعی از توکن‌هاست (کارت + دکمه + متن)، نه مربع رنگ. تم پیش از رندر اعمال می‌شود تا پرش نداشته باشیم.')+
      '<div class="lbl" style="margin-top:14px">اندازهٔ متن</div>'+
      '<div class="segs">'+['عادی','بزرگ','بزرگ‌تر'].map(function(s,i){
        return '<button class="'+(i===0?'on':'')+'">'+s+'</button>';}).join('')+'</div>'+
      '<div class="txt-sample">این یک نمونهٔ زنده است — همان متن، با اندازهٔ انتخابی تو.</div>'+
      '<div class="kv"><span>کاهش حرکت</span><b>خودکار (سیستم)</b></div>'+
      '<div class="kv"><span>شفافیت</span><b>خودکار (سیستم)</b></div>'+
    '</div>'+

    '<div class="card"><h3>'+ic('i-chat')+'پیام‌ها و بینش</h3>'+
      '<div class="segs">'+['عادی','کمتر','خاموش'].map(function(s,i){
        return '<button class="'+(i===0?'on':'')+'">'+s+'</button>';}).join('')+'</div>'+
      '<div class="lvl-list">'+
        '<div class="kv"><span>عادی</span><b>همهٔ پیام‌ها: یادآوری، بازخورد ثبت و بینش‌ها</b></div>'+
        '<div class="kv"><span>کمتر</span><b>فقط بینش‌ها و بازخورد ثبت‌هایت</b></div>'+
        '<div class="kv"><span>خاموش</span><b>هیچ پیام تحلیلی</b></div>'+
      '</div>'+
      '<div class="banner info">'+ic('i-info')+'این تنظیم روی چیزی جز پیام‌ها اثر ندارد. داده‌های تو همچنان محفوظ‌اند و در دفترچه باقی می‌مانند.</div>'+
    '</div>'+

    '<div class="card"><h3>'+ic('i-bell')+'اعلان</h3>'+
      '<div class="banner warn">'+ic('i-info')+
      '<b>کنترل اعلان نمایش داده نمی‌شود.</b> زیرساخت واقعی ارسال اعلان وجود ندارد؛ سوییچی که کاربر روشن کند و هیچ اتفاقی نیفتد، اعتماد را خراب می‌کند.</div>'+
      note('این کارت در محصول نیست — فقط برای بازبینی اینجاست که نشان دهد حذف، آگاهانه است.')+
    '</div>'+

    '<div class="card"><h3>'+ic('i-lock')+'داده و حریم خصوصی</h3>'+
      '<div class="kv"><span>حریم خصوصی — چه کسی چه چیزی می‌بیند</span><button class="btn ghost sm" data-go="content">دیدن فهرست مجوزها</button></div>'+
      '<div class="kv"><span>متن رضایت هم‌مسیر</span><button class="btn ghost sm" data-go="content">نسخهٔ فعلی</button></div>'+
      '<div class="kv"><span>خروجی گرفتن از دادهٔ من</span><button class="btn soft sm" data-go="rights">باز کن</button></div>'+
      '<div class="kv ro"><span>حذف حساب</span><span class="lock-reason">'+ic('i-lock')+'تا تصمیم ۱۷٫۳ — نمایش داده نمی‌شود (ردیف جدا در صفحهٔ ۱۸)</span></div>'+
      '<div class="banner info" style="margin-top:10px">'+ic('i-info')+
      'حریم خصوصی: هر بخش از دادهٔ تو فقط برای کسی دیده می‌شود که خودت مجوز داده باشی.<br>'+
      '<b>خروجی و حذف داده:</b> این بخش هنوز آماده نیست. حق داری از داده‌ات خروجی بگیری و بخواهی پاک شود؛ '+
      'سازوکارش تعیین شده و پیش از انتشار تجاری اضافه می‌شود.</div>'+
    '</div>'+

    '<div class="card"><h3>'+ic('i-info')+'درباره و پشتیبانی</h3>'+
      '<div class="kv"><span>دربارهٔ جوما</span><button class="btn ghost sm" data-go="content">بخوان</button></div>'+
      '<div class="kv"><span>راهنمای استفاده</span><button class="btn ghost sm" data-go="edu">صفحهٔ آموزش</button></div>'+
      '<div class="kv"><span>پشتیبانی</span><span class="tiny">[نیازمند تصمیم مالک] کانال واقعی — تا آن تصمیم، محتوای نمایشی با برچسب صریح</span></div>'+
      '<div class="kv"><span>نسخه</span><b class="num">نسخهٔ ۱٫۲٫۰ (v1.2.0)</b></div>'+
    '</div>'+

    '<div class="card"><h3>'+ic('i-eye')+'دسترس‌پذیری</h3>'+
      '<div class="kv"><span>اندازهٔ متن</span><b>همان بالا</b></div>'+
      '<div class="kv"><span>کاهش حرکت</span><b>خودکار (سیستم)</b></div>'+
      '<div class="kv"><span>شفافیت</span><b>خودکار (سیستم)</b></div>'+
      '<div class="kv"><span>نمایش تمرکز واضح</span><b>همیشه روشن — کنترل ندارد، فقط توضیح</b></div>'+
      note('ممنوع: کلید «حالت کم‌بینایی»، «کوررنگی» یا هر تنظیمی که به کاربر برچسب می‌زند.')+
    '</div>';
}

/* ============================ ۱۵) نقش‌ها — سند ۲۴ ============================ */
var ROLES=[
  {k:'client', n:'کاربری', c:'',      a:'داشبورد من',  what:'برنامه، ثبت روزانه، دفترچه، جوجه', holds:true},
  {k:'coach',  n:'مشاور',  c:'ind',   a:'۴ مراجع',    what:'فهرست مراجعان و صفحهٔ هر مراجع', holds:true},
  {k:'admin',  n:'مدیر',   c:'gold',  a:'کنسول',      what:'کاربران، مشاوران، نقش‌ها، کتابخانه، محتوا', holds:false}
];

function R_roles(){
  var cur=APP.roleView||'client';
  var rows=ROLES.map(function(r){
    var locked=!r.holds;
    return '<div class="role-row '+(cur===r.k?'on':'')+(locked?' locked':'')+'" data-roleview="'+r.k+'">'+
      '<span class="role-dot '+r.c+'"></span>'+
      '<div><b>'+r.n+'</b><div class="tiny">'+r.what+'</div></div>'+
      '<span class="sp"></span>'+
      (locked?'<span class="chip" style="font-size:10px">این نقش را نداری</span>':'<span class="chip '+(cur===r.k?'g':'')+'" style="font-size:10px">'+r.a+'</span>')+
      '</div>';
  }).join('');

  var body;
  if(cur==='client') body=R_home();
  else if(cur==='coach') body=R_hammasir_comp();
  else body=R_admin(true);

  return head('نقش‌ها','نقش‌های من',fa(2)+' نقش داری — هر کدام داشبورد خودش را دارد.',
      '<span class="chip">جابه‌جایی نقش</span>')+
    '<div class="card"><h3>'+ic('i-users')+'پنل نقش‌ها</h3>'+
      '<p class="tiny">۱ تا ۳ نقش · نقش کاربری همیشه هست · تب فقط وقتی نمایش داده می‌شود که نقش را داشته باشی.</p>'+
      rows+
      '<div class="sep"></div>'+
      '<div class="acts" style="justify-content:flex-start">'+
      '<button class="btn soft sm" data-go="settings">پروفایل و تنظیمات</button>'+
      '<button class="btn ghost sm" data-logout>خروج</button></div>'+
    '</div>'+
    note('<b>قاعدهٔ سخت:</b> نقش فقط <b>ناوبری</b> را عوض می‌کند، نه مجوز را. اگر کاربر کلید را دستکاری کند، فقط ناوبری خراب می‌شود. '+
      '«حالت دیدن به‌عنوان» وجود ندارد.')+

    '<div class="card"><h3>'+ic('i-eye')+'رنگ و نشانهٔ هر نقش</h3>'+
      '<div class="kv"><span><span class="role-dot"></span> کاربری</span><b class="num">#0FA678 — رنگ خانهٔ محصول</b></div>'+
      '<div class="kv"><span><span class="role-dot ind"></span> مشاور</span><b class="num">#6D7BE0 — آرام، حرفه‌ای، غیرقضاوتی</b></div>'+
      '<div class="kv"><span><span class="role-dot gold"></span> مدیر</span><b class="num">#F0B23A — ابزار، نه هشدار. قرمز نیست.</b></div>'+
      '<div class="banner info">'+ic('i-info')+'رنگ تنها نشانه نیست: نوار بالای هر نقش، برچسب متنی هم دارد — [کاربری] [مشاور] [مدیر].</div>'+
    '</div>'+
    note('تمام صفحه‌های این نمونه با همین کلید جابه‌جا می‌شوند: نوار بالا را بزن — <b>نقش</b>. '+
      'محتوای زیر، همان داشبورد نقش انتخابی است.')+
    '<div class="role-frame"><div class="rf-head">داشبورد نقش: <b>'+
      (cur==='client'?'کاربری':cur==='coach'?'مشاور':'مدیر')+'</b></div>'+body+'</div>';
}

/* ============================ ۱۶) کنسول مدیر — سند ۲۴ §۵ ============================ */
var ADM=[
  ['overview','نمای کلی','i-chart'],
  ['users','کاربران','i-users'],
  ['coaches','مشاوران','i-heart'],
  ['roles','نقش‌ها و دسترسی','i-lock'],
  ['library','کتابخانهٔ فعالیت‌ها','i-list'],
  ['content','محتوا و آموزش','i-book'],
  ['system','سیستم','i-info']
];

function R_admin(embedded){
  var sec=APP.admSec||'overview';
  var stats=[['کاربران','۱٬۲۴۸'],['مشاوران فعال','۳۷'],['رابطه‌های جاری','۴۱۲'],['فعالیت‌های کتابخانه','۱۰۷'],['ثبت‌های امروز','۳٬۹۰۱'],['هشدارهای سیستم','۲']];

  var side='<aside class="adm-side">'+ADM.map(function(a){
    return '<button class="'+(sec===a[0]?'on':'')+'" data-admsec="'+a[0]+'">'+ic(a[2])+a[1]+'</button>';}).join('')+'</aside>';

  var panel;
  if(sec==='overview'){
    panel='<div class="card"><h3>'+ic('i-chart')+'نمای کلی</h3>'+
      '<div class="adm-stats">'+stats.map(function(s){
        return '<div class="adm-stat"><b class="num">'+s[1]+'</b><span>'+s[0]+'</span></div>';}).join('')+'</div>'+
      '<div class="banner info">'+ic('i-info')+
      'این اعداد <b>تجمیعی و بی‌نام</b>اند: بدون فهرست کاربران، بدون نمودار شخصی. '+
      '[نیازمند راستی‌آزمایی — OPEN-25]</div>'+
      '<div class="banner warn">'+ic('i-lock')+
      '<b>مدیر دادهٔ درمانی کاربران را به‌عنوان ابزار مدیریت نمی‌بیند.</b> برای دیدن وضعیت یک کاربر، همان مسیر مشاور و همان مجوزها لازم است.</div>'+
    '</div>';
  } else if(sec==='users'){
    var R=APP.admRoles||['client'];
    var isCoach=(APP.admProvider==='ACTIVE');
    var roleChip=function(k){
      var m={client:['کاربری','g'],coach:['مربی (coach)','ind'],admin:['مدیر','gold']}[k]||[k,''];
      return '<span class="chip '+m[1]+'" style="font-size:10px">'+m[0]+'</span>';
    };
    panel='<div class="card"><h3>'+ic('i-users')+'کاربران</h3>'+
      '<div class="searchbar">'+ic('i-search')+'<input class="inp" placeholder="جست‌وجوی نام یا نام کاربری…"></div>'+
      '<div class="filterchips">'+['همه','فعال','غیرفعال','مشاور','بدون مشاور'].map(function(c,i){
        return '<button class="chip '+(i===0?'g':'')+'">'+c+'</button>';}).join('')+'</div>'+
      '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>کاربر</th><th>نقش‌های حساب</th><th>قابلیت مشاور</th><th>وضعیت</th><th>اقدام</th></tr></thead><tbody>'+
        (empty()?'':'<tr><td>سارا نمونه<div class="tiny num">@sara</div></td>'+
        '<td>'+R.map(roleChip).join(' ')+'</td>'+
        '<td>'+(isCoach?'<span class="tst ok">'+ic('i-check')+'فعال — در فهرست مشاوران می‌آید</span>'
                        :'<span class="tst">'+ic('i-info')+'ندارد — مشاور نیست</span>')+'</td>'+
        '<td><span class="tst ok">'+ic('i-check')+'فعال</span></td><td class="adm-acts">'+
        '<button class="btn ghost sm" data-admrolestep>نقش‌ها</button>'+
        '<button class="btn '+(isCoach?'ghost':'soft')+' sm" data-admprovider>'+(isCoach?'گرفتن قابلیت مشاور':'مشاورش کن')+'</button>'+
        '<button class="btn ghost sm" data-admoff>غیرفعال</button></td></tr>')+
      '</tbody></table></div>'+
      '<div class="banner info" style="margin-top:10px">'+ic('i-info')+
      '<b>دو لایهٔ جدا:</b> «نقش‌های حساب» = <span class="num">role_key</span> (کاربری/مربی/مدیر) که مدیر می‌دهد و <b>دسترسی درمانی نمی‌سازد</b>. '+
      '«قابلیت مشاور» از ردیف <span class="num">providers</span> می‌آید — <b>«مشاورش کن» یعنی همین.</b></div>'+
      '<div class="banner warn">'+ic('i-lock')+
      'هر تغییر نقش، <b>تأیید دو مرحله‌ای</b> و <b>لاگ</b> دارد (زمان، کاربر، مقدار قبل) و قابل <b>واگرد</b> است. '+
      'گرفتن نقش مدیر از <b>آخرین مدیر</b> ممکن نیست.</div>'+
      note('«حذف حساب کاربر» ممنوع است تا OPEN-12؛ فقط <b>غیرفعال‌سازی</b>. و مدیر نمی‌تواند به‌جای کاربر چیزی ثبت کند.')+
    '</div>';
    } else if(sec==='coaches'){
    var extra=APP.admProvider==='ACTIVE'
      ? '<tr><td>سارا نمونه <span class="chip ind" style="font-size:9.5px">تازه</span></td><td class="num">۰</td>'+
        '<td><span class="tst ok">'+ic('i-check')+'فعال</span></td>'+
        '<td><button class="btn ghost sm" data-admpropose>افزودن مراجع</button></td></tr>' : '';
    panel='<div class="card"><h3>'+ic('i-heart')+'مشاوران</h3>'+
      '<p class="tiny">منبع فهرست: ردیف فعال در لایهٔ <b>providers</b> هم‌مسیر — نه از <span class="num">role_key</span>.</p>'+
      '<div class="acts" style="justify-content:flex-start;margin-bottom:10px">'+
      '<button class="btn primary sm" data-admaddcoach>'+ic('i-users')+'مشاور کردن یک کاربر</button></div>'+
      '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>مشاور</th><th>مراجعان باز</th><th>وضعیت ردیف</th><th>اقدام</th></tr></thead><tbody>'+
        '<tr><td>دکتر مینا رستمی</td><td class="num">۴</td><td><span class="tst ok">'+ic('i-check')+'فعال</span></td>'+
        '<td><button class="btn ghost sm" data-admpropose>افزودن مراجع</button> '+
        '<button class="btn ghost sm" data-admblock>غیرفعال‌کردن</button></td></tr>'+
        '<tr><td>علی کاظمی</td><td class="num">۲</td><td><span class="tst ok">'+ic('i-check')+'فعال</span></td>'+
        '<td><button class="btn ghost sm" data-admpropose>افزودن مراجع</button> '+
        '<button class="btn ghost sm" data-admblock>غیرفعال‌کردن</button></td></tr>'+
        extra+
      '</tbody></table></div>'+
      '<div class="banner warn" style="margin-top:10px">'+ic('i-lock')+
      'غیرفعال‌کردن مشاوری که <b>رابطهٔ باز</b> دارد ممنوع است — اول رابطه‌ها باید بسته شوند.</div>'+
      '<div class="banner info">'+ic('i-info')+
      '<b>«افزودن مراجع» فقط پیشنهاد است:</b> مجوزها <b>خالی و روشن‌نشده</b> می‌آید، و رابطه تا <b>پذیرش خودِ کاربر</b> ساخته نمی‌شود. '+
      'اگر ۷ روز پاسخ ندهد، درخواست منقضی می‌شود — بدون فشار دوباره.</div>'+
    '</div>';
    } else if(sec==='roles'){
    panel='<div class="card"><h3>'+ic('i-lock')+'نقش‌ها و دسترسی</h3>'+
      '<div class="kv"><span><span class="num">role_key</span> جوما</span><b class="num">member / plus / coach / admin</b></div>'+
      '<div class="kv"><span><span class="num">mode</span> هم‌مسیر</span><b>۱ / ۲ / ۳</b></div>'+
      '<div class="kv"><span>ماتریس دسترسی</span><button class="btn ghost sm">دیدن ماتریس</button></div>'+
      '<div class="kv"><span>لاگ تغییرها</span><button class="btn ghost sm">تاریخچهٔ نقش‌ها</button></div>'+
      '<div class="banner err">'+ic('i-lock')+'گرفتن نقش مدیر از خودت، اگر <b>آخرین مدیر</b> باشی، ممنوع است — قفل‌شدن سیستم.</div>'+
      '<div class="banner info">'+ic('i-info')+'تغییر نقش، <b>تأیید دو مرحله‌ای</b> دارد چون دسترسی می‌دهد. و هر تغییر قابل <b>واگرد</b> است — با برگرداندن مقدار قبلی، نه با حذف.</div>'+
    '</div>';
  } else if(sec==='library'){
    panel='<div class="card"><h3>'+ic('i-list')+'کتابخانهٔ فعالیت‌ها</h3>'+
      '<div class="acts" style="justify-content:flex-start"><button class="btn primary sm">افزودن فعالیت رسمی</button>'+
      '<button class="btn ghost sm">فهرست غیرفعال‌ها</button></div>'+
      '<div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>فعالیت</th><th>مسیر</th><th>وضعیت</th><th></th></tr></thead><tbody>'+
        '<tr><td>پیاده‌روی ۲۰ دقیقه</td><td><span class="chip" style="font-size:10px">خودمراقبتی</span></td><td><span class="tst ok">'+ic('i-check')+'فعال</span></td>'+
        '<td><button class="btn ghost sm">ویرایش</button> <button class="btn ghost sm" data-admkill>حذف کامل</button></td></tr>'+
      '</tbody></table></div>'+
      note('حذف کامل فقط با شرط <b>صفر ارجاع</b> و تأیید دوگانه ('+"17-library.md §۹"+'). در غیر این صورت، <b>غیرفعال‌سازی</b>.')+
    '</div>';
  } else if(sec==='content'){
    panel='<div class="card"><h3>'+ic('i-book')+'محتوا و آموزش</h3>'+
      '<div class="kv"><span>راهنماها</span><b class="num">۶۳ متن (۱ + ۳۵ + ۲۷)</b></div>'+
      '<div class="kv"><span>متن صفحه‌ها</span><button class="btn ghost sm" data-go="content">ویرایش</button></div>'+
      '<div class="kv"><span>نسخهٔ محتوا</span><b>نسخهٔ ۱۲ — منتشرشده</b></div>'+
      '<div class="banner info">'+ic('i-info')+
      'هر ویرایش <b>تاریخچه</b> دارد (نسخه، زمان، ویرایشگر، متن قبلی) · <b>پیش‌نمایش</b> جدا از <b>ذخیره</b> · '+
      'محتوا در وضعیت <b>پیش‌نویس</b> ذخیره می‌شود و با «انتشار» زنده می‌شود. تا انتشار، کاربران نسخهٔ قبلی را می‌بینند.</div>'+
      '<div class="banner warn">'+ic('i-lock')+
      'ویرایش متن رضایت هم‌مسیر، <b>نسخهٔ جدید رضایت</b> می‌سازد و نیاز به پذیرش دوباره دارد. '+
      'و مدیر <b>نمی‌تواند</b> متن بینش‌های ساخته‌شده را دستی عوض کند — بینش خروجی موتور است.</div>'+
    '</div>';
  } else {
    panel='<div class="card"><h3>'+ic('i-info')+'سیستم</h3>'+
      '<div class="kv"><span>لاگ رویدادها</span><button class="btn ghost sm">باز کن</button></div>'+
      '<div class="kv"><span>وضعیت سلامت</span><b><span class="chip g" style="font-size:10px">سبز</span></b></div>'+
      '<div class="kv"><span>نسخهٔ محصول</span><b class="num">۱٫۲٫۰ (v1.2.0)</b></div>'+
      '<div class="kv"><span>تنظیمات عمومی</span><button class="btn ghost sm">باز کن</button></div>'+
    '</div>';
  }

  var shell='<div class="adm">'+side+'<div class="adm-main">'+panel+'</div></div>';

  if(embedded) return shell;
  return head('مدیر','کنسول مدیریت','داشبورد مدیریتی کامل — با ویرایش در همهٔ بخش‌ها.',
      '<span class="chip gold">مدیر</span>')+shell+
    note('چیدمان: سایدبار نیلی/طلایی با ۷ بخش · جدول‌های ساده · جست‌وجو بالای هر جدول · فیلتر به‌صورت چیپ، نه سه کنترل پشت‌سرهم. '+
      'بدون گرادینت هنری، بدون جغد بزرگ؛ جغد فقط در حالت خالی.');
}

/* ============================ ۱۷) صفحه‌های محتوایی — سند ۲۵ ============================ */
function R_content(){
  var pg=APP.contentPage||'about';
  var PAGES=[['about','دربارهٔ جوما'],['support','پشتیبانی'],['privacy','حریم خصوصی'],['terms','شرایط استفاده']];

  var tabs='<div class="rtabs">'+PAGES.map(function(p){
    return '<button class="'+(pg===p[0]?'on':'')+'" data-cpage="'+p[0]+'">'+p[1]+'</button>';}).join('')+'</div>';
  var body='';

  if(pg==='about'){
    body='<div class="content-page">'+
      '<div class="cp-lead">برنامه‌ای که هم کارهایت را می‌بیند، هم حال تو را — و صادق است.</div>'+
      '<div class="grid3">'+
        [['i-cal','برنامه‌ریزی روزانه','کارهایت را می‌چینی و هر روز با چند ثانیه ثبت، پیش می‌روی.'],
         ['i-heart','ثبت حال','حال خودت را می‌گویی — بدون قضاوت، بدون مقایسه.'],
         ['i-chart','بینش از دادهٔ خودت','جوما همان داده را به تو برمی‌گرداند؛ کنار هر عدد می‌نویسد یعنی چه.']]
        .map(function(c){return '<div class="card"><h3>'+ic(c[0])+c[1]+'</h3><p class="tiny">'+c[2]+'</p></div>';}).join('')+
      '</div>'+
      '<div class="card not-box"><h3>'+ic('i-info')+'جوما چه‌کار نمی‌کند</h3>'+
        '<div class="kv"><span>درمان نیست</span><b>ابزار خودمراقبتی است</b></div>'+
        '<div class="kv"><span>تشخیص نمی‌دهد</span><b>هیچ‌جا «اختلال» یا برچسب نمی‌گذارد</b></div>'+
        '<div class="kv"><span>جایگزین مشاور و پزشک نیست</span><b>همراهی می‌کند، نه جایگزینی</b></div>'+
      '</div>'+
      '<div class="card"><h3>'+ic('i-lock')+'چه کسی می‌بیند</h3>'+
        '<p class="tiny">هیچ‌کس، مگر خودت اجازه بدهی. <button class="btn ghost sm" data-go="content">حریم خصوصی</button></p></div>'+
      '<div class="card"><h3>'+ic('i-bolt')+'جغد و جوجه</h3>'+
        '<p class="tiny">جغد، راهنمای آرامِ جوماست: جایی که باید چیزی توضیح داده شود، حاضر است — نه بیشتر.<br>'+
        'جوجه، موجود کوچکِ توست که با ثبت‌های واقعی‌ات رشد می‌کند. نه امتیاز می‌دهد، نه چیزی را قفل می‌کند.</p></div>'+
      '<div class="cp-foot tiny">نسخهٔ ۱٫۲٫۰ (v1.2.0) · آخرین به‌روزرسانی متن: شهریور ۱۴۰۵ · '+
      '<button class="btn ghost sm" data-go="content">پشتیبانی</button> '+
      '<button class="btn ghost sm" data-go="content">شرایط استفاده</button></div>'+
    '</div>';
  } else if(pg==='support'){
    body='<div class="content-page">'+
      '<div class="banner warn">'+ic('i-info')+'کانال واقعی پشتیبانی <b>[نیازمند تصمیم مالک]</b> است؛ تا آن تصمیم، این بخش با محتوای نمایشی و برچسب صریح می‌آید.</div>'+
      '<div class="card"><h3>'+ic('i-chat')+'راه‌های ارتباطی</h3>'+
        '<div class="kv"><span>ایمیل پشتیبانی</span><b class="num">[نمایشی] support@example.com</b></div>'+
        '<div class="kv"><span>پاسخ‌دهی</span><b>معمولاً کمتر از یک روز کاری</b></div></div>'+
      '<div class="card"><h3>'+ic('i-info')+'خطا در دادهٔ من</h3>'+
        '<p class="tiny">اگر ثبتی اشتباه ثبت شده، مسیر ویژهٔ «این ثبت اشتباه است» را بزن. ثبت‌های قطعی پاک نمی‌شوند، ولی نشانهٔ <b>اصلاح با دلیل</b> می‌خورند: مقدار قبلی می‌ماند و پنجرهٔ اصلاح ثبت می‌شود.</p></div>'+
      '<div class="card"><h3>'+ic('i-help')+'سه پرسش پرتکرار</h3>'+
        '<div class="kv"><span>ثبتم پاک شده؟</span><b>نه — تاریخچه دارد</b></div>'+
        '<div class="kv"><span>می‌توانم برنامه را وسط دوره عوض کنم؟</span><b>هدف‌ها قفل‌اند؛ دورهٔ نو بساز</b></div>'+
        '<div class="kv"><span>داده‌ام را چه کسی می‌بیند؟</span><b>فقط کسی که مجوز بدهی</b></div></div>'+
      '<div class="card not-box"><h3>'+ic('i-lock')+'چه چیزی را نمی‌توانیم برگردانیم</h3>'+
        '<p class="tiny">رمز را نمی‌دانیم، پس نمی‌توانیم بگوییم. ثبت‌های دیروزِ قطعی‌شده هم عوض نمی‌شوند.<br>'+
        'پشتیبانی <b>هرگز</b> رمز عبور نمی‌پرسد.</p></div>'+
    '</div>';
  } else if(pg==='privacy'){
    var rows=[['ثبت فعالیت','نتیجه و گزارش خودت','فقط خودت','جدول نگهداشت'],
              ['حال روزانه','روند حال تو','فقط خودت','جدول نگهداشت'],
              ['یادداشت‌های آزاد','برای خودت','فقط خودت — رابطهٔ همراه','جدول نگهداشت'],
              ['برنامه و هدف‌ها','پیشرفت','خودت + همراه با اجازه','جدول نگهداشت'],
              ['اطلاعات حساب','ورود و امنیت','خودت','تا حذف حساب'],
              ['لاگ رویدادها','امنیت و خطایابی','تیم فنی','[نیازمند تصمیم — OPEN-12]'],
              ['دادهٔ تجمیعی بی‌نام','بهبود محصول','بدون دسترسی فردی','بی‌نهایت (بی‌نام)']];
    body='<div class="content-page">'+
      '<div class="cp-lead">دادهٔ تو مال خودت است. ما آن را نمی‌فروشیم.</div>'+
      '<div class="card"><h3>'+ic('i-list')+'چه چیزی جمع می‌شود و چه کسی می‌بیند</h3>'+
        '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>داده</th><th>چرا</th><th>چه کسی می‌بیند (پیش‌فرض)</th><th>نگهداشت</th></tr></thead><tbody>'+
        rows.map(function(r){return '<tr><td><b>'+r[0]+'</b></td><td class="tiny">'+r[1]+'</td><td class="tiny">'+r[2]+'</td><td class="tiny">'+r[3]+'</td></tr>';}).join('')+
        '</tbody></table></div>'+
        note('ستون «چه کسی می‌بیند» <b>پیش‌فرض واقعی</b> را نشان می‌دهد، نه بدترین حالت. این جدول باید در همین صفحه باشد، نه در ضمیمه.')+
      '</div>'+
      '<div class="grid3">'+
        '<div class="card"><h3>'+ic('i-users')+'چه کسی می‌بیند</h3><p class="tiny">خودت · همراه (فقط با اجازه‌ات) · تیم فنی (فقط برای پشتیبانی، با لاگ)</p></div>'+
        '<div class="card not-box"><h3>'+ic('i-lock')+'چه چیزی هرگز</h3><p class="tiny">فروش داده · تبلیغ هدفمند · خواندن یادداشت بدون اجازه</p></div>'+
        '<div class="card"><h3>'+ic('i-checkc')+'حقوق تو</h3><p class="tiny">دیدن · خروجی گرفتن · پاک‌کردن · پس‌گرفتن اجازهٔ همراه</p></div>'+
      '</div>'+
      '<div class="card"><h3>'+ic('i-clock')+'تاریخچهٔ تغییرات</h3>'+
        '<div class="kv"><span>نسخهٔ ۳ — شهریور ۱۴۰۵</span><b>افزودن جدول داده‌ها</b></div>'+
        '<div class="kv"><span>نسخهٔ ۲ — تیر ۱۴۰۵</span><b>روشن‌کردن متن رضایت هم‌مسیر</b></div></div>'+
      '<div class="banner err">'+ic('i-info')+'این صفحات <b>قبل از انتشار تجاری</b> نیاز به بررسی حقوقی دارند (۱۷٫۳).</div>'+
    '</div>';
  } else {
    var cl=[['جوما ابزار است، درمان نیست','مسئولیت'],['کاربر چند سالش باید باشد؟','[نیازمند تصمیم مالک] — زیر ۱۸ حل نشده'],
            ['مسئولیت کاربر: اطلاعات حسابش را با کسی قسمت نکند','امنیت'],['آنچه ممنوع است: سوءاستفاده، جعل داده، دسترسی غیرمجاز','حفاظت سیستم'],
            ['تعلیق حساب: چه زمانی و چرا','شفافیت'],['مالکیت داده: دادهٔ تو، مال توست','اعتماد'],
            ['تغییر شرایط: با اعلان درون‌محصول و نسخهٔ جدید','۱۷٫۳'],['پشتیبانی و رسیدگی','۴٫۱']];
    body='<div class="content-page">'+
      '<div class="card"><h3>'+ic('i-book')+'بندهای شرایط استفاده</h3>'+
        cl.map(function(c,i){return '<div class="kv"><span>'+(i+1)+'. '+c[0]+'</span><b class="tiny">'+c[1]+'</b></div>';}).join('')+
      '</div>'+
      note('هیچ بندی نوشته نمی‌شود که محصول نداشته باشد — مثلاً بند «پرداخت و بازگشت وجه» تا وقتی پلن پولی وجود ندارد نوشته نمی‌شود.')+
    '</div>';
  }

  return head('صفحه‌های محتوایی','صفحه‌های محتوایی','چهار صفحه، یک زبان: شفاف و بدون وعدهٔ اضافه.',
      '<span class="chip">نسخه‌دار</span>')+tabs+body+
    note('هر چهار صفحه <b>نسخه</b> دارند و تاریخ آخرین به‌روزرسانی متن، پایین صفحه می‌آید. تغییر مهم، اعلان درون‌محصول دارد.');
}

/* ============================ ۱۸) حقوق داده — سند ۲۶ ============================ */
function R_rights(){
  var step=APP.rightsStep||'export';
  var steps='<div class="rtabs">'+
    [['export','خروجی گرفتن از داده'],['delete','حذف حساب'],['keep','چه چیزی می‌ماند']].map(function(s){
      return '<button class="'+(step===s[0]?'on':'')+'" data-rtstep="'+s[0]+'">'+s[1]+'</button>';}).join('')+'</div>';

  var body='';
  if(step==='export'){
    body='<div class="card"><h3>'+ic('i-download')+'دادهٔ من</h3>'+
      '<p class="tiny">همهٔ چیزی که در جوما دربارهٔ تو ثبت شده، مال خودت است. یک فایل کامل می‌گیری، و یک گزارش خوانا که می‌توانی نگه داری یا با کسی که لازم است قسمت کنی. '+
      'این فایل بعد از ۷ روز پاک می‌شود — پس اگر خواستی، همان روز دانلودش کن.</p>'+
      '<div class="istep"><span class="inum">۱</span><div><b>چه چیزی را می‌خواهی؟</b>'+
        '<div class="perm-list"><label class="perm-row"><span class="cb on"></span><span><b>همه‌چیز</b><em>فایل JSON کامل + گزارش خوانا</em></span></label>'+
        '<label class="perm-row"><span class="cb"></span><span><b>فقط یک بخش</b><em>فعالیت‌ها / حال / دفترچه / برنامه‌ها</em></span></label></div></div></div>'+
      '<div class="istep"><span class="inum">۲</span><div><b>آماده‌سازی</b>'+
        '<div class="banner info">'+ic('i-info')+'آماده‌سازی چند ثانیه طول می‌کشد. آماده شد، خبرت می‌کنیم.</div></div></div>'+
      '<div class="istep"><span class="inum">۳</span><div><b>دانلود</b>'+
        '<div class="dl-card"><div>'+ic('i-file')+'<b class="num">joma-data-1405-06-27.json</b>'+
        '<div class="tiny">لینک امن، یک‌بارمصرف · انقضا ۷ روز</div></div>'+
        '<button class="btn primary sm" data-download>دانلود</button></div>'+
        '<div class="tiny" style="margin-top:6px">قالب ۱ — JSON کامل و ماشین‌خوان · قالب ۲ — گزارش خوانا (HTML/PDF فارسی، راست‌به‌چپ)</div></div></div>'+
      '<div class="banner warn">'+ic('i-info')+'<b>سقف:</b> یک بار در ۲۴ ساعت — جلوگیری از سوءاستفاده، بدون آزار کاربر.</div>'+
      '<div class="card"><h3>'+ic('i-lock')+'چه چیزی داخل خروجی نیست</h3>'+
        '<div class="kv"><span>دادهٔ دیگران</span><b>پیام‌های همراه، یادداشت‌های او</b></div>'+
        '<div class="kv"><span>لاگ امنیتی سرور</span><b>—</b></div>'+
        '<div class="kv"><span>دادهٔ تجمیعی بی‌نام</span><b>—</b></div></div>'+
      '<div class="banner info">'+ic('i-info')+'دادهٔ همراهت داخل این فایل نیست — او هم مالک دادهٔ خودش است. اگر فقط همراه باشی، خروجی شامل پروندهٔ مراجعانت نیست.</div>'+
    '</div>';
  } else if(step==='delete'){
    body='<div class="card danger-card"><h3>'+ic('i-bell')+'حساب جوما را پاک کنم؟</h3>'+
      '<div class="perm-list">'+
        ['برنامه‌ها و ثبت‌هایت پاک می‌شوند','گزارش‌هایت پاک می‌شوند','همراهت دیگر چیزی نمی‌بیند','این کار برگشت‌پذیر نیست — بعد از ۳۰ روز']
        .map(function(x){return '<div class="kv"><span>'+ic('i-check')+'</span><b>'+x+'</b></div>';}).join('')+
      '</div>'+
      '<div class="banner info">شاید بخواهی اول خروجی بگیری. <button class="btn soft sm" data-rtstep="export">خروجی گرفتن</button></div>'+
      '<div class="lbl" style="margin-top:12px">برای تأیید، این جمله را بنویس: <b>پاک کن</b></div>'+
      '<input class="inp" placeholder="پاک کن">'+
      '<div class="acts" style="justify-content:flex-start;margin-top:10px">'+
      '<button class="btn ghost sm">بعداً</button><button class="btn danger sm" data-delconfirm>حسابم را پاک کن</button></div>'+
      note('تأیید فیزیکی (نوشتن «پاک کن») تا حذف اتفاقی ممکن نباشد.')+
    '</div>'+
    '<div class="card"><h3>'+ic('i-clock')+'مهلت پشیمانی — ۳۰ روز</h3>'+
      '<div class="timeline">'+
        '<div class="tl on"><b>امروز</b><span class="tiny">حساب «در انتظار پاک شدن» می‌شود · دسترسی همراه از همین لحظه بسته می‌شود</span></div>'+
        '<div class="tl"><b>هر ورود</b><span class="tiny">یک نوار: «حسابت تا ۱۲ مهر پاک می‌شود. [لغو]» — هیچ داده‌ای در این مدت نمایش داده نمی‌شود؛ ورود فقط برای لغو است</span></div>'+
        '<div class="tl"><b>روز ۳۰</b><span class="tiny">دادهٔ شخصی حذف می‌شود · دادهٔ تجمیعی بی‌نام می‌ماند · رابطه‌های همراه بسته می‌شوند</span></div>'+
      '</div>'+
      '<div class="banner warn">'+ic('i-info')+'حذف حساب توسط <b>مدیر</b> ممکن نیست — مدیر فقط می‌تواند غیرفعال کند. و حساب <b>آخرین مدیر</b> تا وقتی مدیر دیگری نباشد حذف نمی‌شود.</div>'+
    '</div>';
  } else {
    var keep=[['ثبت‌ها و برنامه‌ها','حذف می‌شوند','دادهٔ شخصی توست'],
              ['گزارش‌ها و بینش‌ها','حذف می‌شوند','از دادهٔ تو ساخته شده‌اند'],
              ['یادداشت‌های روزانه','حذف می‌شوند','—'],
              ['رابطه‌های همراه','بسته می‌شوند','همراه پیام می‌گیرد: «{نام} حسابش را پاک کرد.» — بدون جزئیات'],
              ['دادهٔ تجمیعی بی‌نام','می‌ماند','قابل نسبت‌دادن به تو نیست'],
              ['لاگ تغییرهای مربوط به خودت','[نیازمند تصمیم — OPEN-12]','—']];
    body='<div class="card"><h3>'+ic('i-list')+'چه چیزی پس از حذف می‌ماند — و چرا</h3>'+
      '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>مورد</th><th>سرنوشت</th><th>چرا</th></tr></thead><tbody>'+
      keep.map(function(k){return '<tr><td><b>'+k[0]+'</b></td><td class="tiny">'+k[1]+'</td><td class="tiny">'+k[2]+'</td></tr>';}).join('')+
      '</tbody></table></div></div>'+
      '<div class="card"><h3>'+ic('i-help')+'خطا در دادهٔ من</h3>'+
        '<p class="tiny">اگر ثبتی اشتباه است، مسیر پشتیبانی → «این ثبت اشتباه است». اصلاح، <b>با دلیل</b> انجام می‌شود: مقدار قبلی در تاریخچه می‌ماند. '+
        'هیچ تغییر بی‌دلیلی روی عددهای ثبت‌شده انجام نمی‌شود.</p></div>'+
      '<div class="banner err">'+ic('i-info')+'این صفحه پیش از انتشار تجاری نیاز به تصمیم نهایی روی نگهداشت و بررسی حقوقی دارد (۱۷٫۳).</div>';
  }

  return head('حقوق داده','دادهٔ من','خروجی، حذف، و اینکه چه چیزی می‌ماند.','<span class="chip">شفاف</span>')+
    steps+body+
    note('هر سه جریان این صفحه، <b>طراحی‌شده</b> و ساخت آن مشروط به بسته‌شدن OPEN-12 است. تا آن تصمیم، دکمه‌ها در محصول واقعی غیرفعال‌اند.');
}
