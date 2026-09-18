/* ==========================================================================
   دستهٔ ۲ — جوجه (۱۴) · دفترچه (۱۵) · گزارش‌ها (۱۶) · برنامه (۱۸) · کتابخانه (۱۷) · آموزش (۱۹)
   ========================================================================== */

/* ============================ ۷) جوجهٔ من — سند ۱۴ ============================ */
var GROWTH=[
  {stage:'egg',  title:'تخم جوما 🥚', sub:'با مراقبت، به دنیا می‌آید',
   msg:'هر قدم تو، یک یک دونه برای این تخم کوچولوست 🌱'},
  {stage:'crack',title:'تخم جوما 🥚', sub:'دارد ترک می‌خورد! نزدیک است…',
   msg:'تخم می‌لرزد! ادامه بده، دارم می‌آیم… 🐣'},
  {stage:'chick',title:'جوجهٔ من 🐣', sub:'هر روز از من مراقبت کن',
   msg:'دونه، آب و خونهٔ تمیز؛ من با همین‌ها شادم!'},
  {stage:'chick',title:'جوجهٔ من 🐣', sub:'هر روز از من مراقبت کن',
   msg:'چه مراقبتی! حسابی خوشحالم 🎉'}
];
var METERS=[
  {k:'seed', e:'🌾', n:'ظرف دونه',  s:'با ثبت کارهای روزانه پر می‌شود'},
  {k:'water',e:'💧', n:'ظرف آب',    s:'با لیوان‌های آبِ تو'},
  {k:'home', e:'🏠', n:'خونهٔ تمیز',s:'با ثبت حال ۵ قدمی'}
  /* 🔴 تصمیم مالک (دور ۲۱): «وقت حمام» (تمرین تنفس) در بک‌اند منبع ندارد،
     پس تا ساخته‌شدنش نمایش داده نمی‌شود — هیچ سنجهٔ جعلی ساخته نمی‌شود. */
];
var METER_TOTAL=9;   /* ۳ سنجه × ۳ سطح — سنجهٔ چهارم که اضافه شد، این عدد از بک‌اند می‌آید */

/* شش حالت جوجه — همه از بک‌اند، هیچ‌کدام از کلیک (سند ۱۴ §۳.۳) */
var PET_STAGES=['جوجهٔ کوچک','نوپا','بالغ'];
/* 🔢 اعداد تأییدشدهٔ دور ۲۳ — همه از `config/jooje_config.php` بک‌اند می‌آید؛
   فرانت هیچ‌کدام را در خودش «تصمیم» نمی‌گیرد، فقط نشان می‌دهد. */
var PET_NUM={crack:6,born:12,mid:40,full:90,pale:3,miss:6};
var PET_STATES=[
  {k:'ok',    t:'آرام',      cond:'پیش‌فرض — روز عادی',              stage:'chick', mood:'ok'},
  {k:'happy', t:'شاد',       cond:'بعد از یک ثبت معتبر',             stage:'chick', mood:'happy'},
  {k:'sleep', t:'خواب',      cond:'شب، یا چند روز بی‌ثبت',           stage:'chick', mood:'sleep'},
  {k:'pet',   t:'نوازش',     cond:'لمس کاربر — واکنش، بی‌پاداش',     stage:'chick', mood:'pet'},
  {k:'pale',  t:'کم‌رنگ',    cond:'۳ تا ۵ روز بی‌ثبت — نشانگر توجه', stage:'calm',  mood:'tired'},
  {k:'miss',  t:'خاکستری',   cond:'۶ روز یا بیشتر — ‌همان نشانگر',   stage:'miss',  mood:'tired'}
];
function R_chick(){
  var st=APP.petStage||'chick';
  var g=GROWTH[st==='egg'?0:(st==='crack'?1:(APP.petGrowthFull?3:2))];
  var name=APP.petName||'جوجهٔ من';
  var ps=PET_STATES.filter(function(x){return x.k===(APP.petMood||'ok');})[0]||PET_STATES[0];
  /* فقط دادهٔ واقعی: هر عدد از بک‌اند می‌آید. */
  var hasWater=!empty();
  var levels=empty()?{seed:0,water:0,home:0}:{seed:3,water:3,home:1};
  var total=levels.seed+levels.water+levels.home;
  var seeds=empty()?0:(APP.petGrowthFull?PET_NUM.mid:(APP.petSeeds||PET_NUM.born));
  var gIdx=APP.petStageIdx||0;
  var nextN=(gIdx===0?PET_NUM.mid:(gIdx===1?PET_NUM.full:0));
  var pct=nextN?Math.min(100,Math.floor(seeds/nextN*100)):100;   /* هیچ‌وقت به بالا گِرد نمی‌شود */

  return head('جوجهٔ من', name+(st==='egg'?' — تخم':''), g.sub,
      '<span class="chip '+(st==='chick'?'g':'go')+'">'+(st==='egg'?'تخم':(st==='crack'?'در حال ترک':'جوجه'))+'</span>')+

    '<div class="pet-grid">'+
      '<div class="pet-col">'+
        '<div class="pet-stage'+(ps.k==='sleep'?' sleep':'')+'" data-petchick>'+
          '<span class="halo"></span>'+
          '<span class="pet-hold">'+chickSVG(150, st==='chick'?ps.stage:st, st==='chick'?ps.mood:'ok')+'</span>'+
        '</div>'+
        '<div class="pet-cond tiny">حالت فعلی: <b>'+ps.t+'</b> — '+ps.cond+'<br>'+
          '<span class="muted">شرط هر حالت از <b>بک‌اند</b> می‌آید؛ فرانت حالت نمی‌سازد و از کلیک پاداش نمی‌دهد.</span></div>'+
        '<div class="pet-ctrls">'+
          '<button class="btn soft sm" data-petpet>'+ic('i-heart')+'نوازش</button>'+
          '<button class="btn ghost sm" data-petsleep>'+(APP.petSleep?'بیدارش کن ☀️':'بخوابانش 🌙')+'</button>'+
          '<button class="btn ghost sm" data-petsnd>'+(APP.sound?'🔊 صدا روشن':'🔇 صدا خاموش')+'</button>'+
        '</div>'+
        '<div class="pet-states">'+
          PET_STATES.map(function(s2){
            return '<button class="'+(ps.k===s2.k?'on':'')+'" data-petmode="'+s2.k+'" title="'+s2.cond+'">'+s2.t+'</button>';}).join('')+
        '</div>'+
        note('سنجهٔ چهارم («وقت حمام» — تمرین تنفس) تا ساخته‌شدن منبعش در بک‌اند نمایش داده نمی‌شود؛ '+
          'هیچ سنجهٔ جعلی ساخته نمی‌شود. '+
          'همهٔ حرکت‌های این صحنه **بی‌پاداش**‌اند (`CAR-01`): لمس، فقط واکنش است. '+
          'پاداش فقط از **ثبت معتبر** می‌آید — و **هر ثبتِ آب «قطعی» حساب می‌شود** (پیش‌نویس/قطعی وجود ندارد — تصمیم دور ۲۱).')+
      '</div>'+
    '<div class="grid2">'+
      '<div class="card"><h3>'+ic('i-heart')+'مراقبت امروز — سه عدد واقعی</h3>'+
        METERS.map(function(m){
          var lv=levels[m.k];
          return '<div class="pmeter"><span class="pe">'+m.e+'</span>'+
            '<span class="pl"><b>'+m.n+'</b><small>'+m.s+'</small></span>'+
            '<span class="psegs">'+[0,1,2].map(function(i){
              return '<i class="'+(i<lv?'on':'')+'"></i>';}).join('')+'</span></div>';
        }).join('')+
        '<p class="tiny" style="margin-top:10px">امروز: <b>'+fa(levels.seed)+' دونه</b> · '+
          (hasWater?'<b>'+fa(levels.water)+' از '+fa(APP.waterGoal||8)+' لیوان</b>':'<b>آب: در برنامه‌ات نیست — این صفر نیست</b>')+
          ' · <b>'+(levels.home?'حال ثبت شد ✓':'حال ثبت نشده')+'</b></p>'+
        '<p class="tiny muted" style="margin-top:6px">مخرج آب از <b>اسنپ‌شات برنامهٔ خودت</b> می‌آید و «خونه» ۰ یا ۱ است. '+
          'برای «دونه» بک‌اند باید هدف روزانه بدهد (پیشنهاد دور ۲۳: شمار کارهای همان روز) — '+
          '<b>تا آن وقت نوار دونه درصد نمی‌سازد</b>. هیچ نواری در این صفحه <b>به بالا گِرد نمی‌شود</b>.</p>'+
      '</div>'+

      
        '<div class="card"><h3>'+ic('i-trend')+'رشد</h3>'+
          '<div class="gstage" style="margin-top:4px"><span class="chip '+(gIdx?'g':'go')+'">مرحله: '+PET_STAGES[gIdx]+'</span>'+
            '<span class="tiny muted">آستانه از <b>بک‌اند</b>: ترک '+fa(PET_NUM.crack)+' دونه · تولد '+fa(PET_NUM.born)+
            ' · نوپا '+fa(PET_NUM.mid)+' · بالغ '+fa(PET_NUM.full)+'</span></div>'+
          '<div style="display:flex;align-items:baseline;gap:6px;margin-top:10px">'+
            '<span class="bignum" style="font-size:24px;color:var(--brand-ink)">'+fa(seeds)+'</span>'+
            '<span class="tiny">دونه تا این لحظه</span></div>'+
          '<div style="height:9px;border-radius:99px;background:var(--ring-track);margin-top:10px;overflow:hidden">'+
            '<i style="display:block;height:100%;width:'+pct+'%;border-radius:99px;background:linear-gradient(90deg,var(--grad1),var(--grad2))"></i></div>'+
          (nextN>0?
            '<p class="tiny" style="margin-top:8px"><b>'+fa(seeds)+' از '+fa(nextN)+' دونه</b> تا «'+PET_STAGES[gIdx+1]+'»</p>'
            :'<p class="tiny" style="margin-top:8px">به آخرین مرحله رسیده — '+fa(seeds)+' دونه. همین‌طور ادامه بده 🤍</p>')+
          '<p class="tiny" style="margin-top:6px">'+g.msg+'</p>'+
          '<p class="tiny muted">عدد واقعی دونه‌ها از بک‌اند می‌آید؛ نوار <b>فقط</b> همان مقدار را نشان می‌دهد و از آن جلو نمی‌زند.</p>'+
        '</div>'+

        (st==='chick'&&!APP.petName?'<div class="card" style="border-color:var(--gold)"><h3>'+ic('i-heart')+'اسمش را چه بگذاریم؟</h3>'+
            '<p class="tiny" style="margin-top:6px">حالا که به دنیا آمده. <b>یک بار</b> می‌شود اسم گذاشت و <b>یک بار دیگر</b> عوضش کرد. اسم در <b>بک‌اند</b> ذخیره می‌شود (روی هر دستگاهی همان است) و <b>فقط در همین صفحه</b> دیده می‌شود — نه در کارت خانه، نه برای هم‌مسیر.</p>'+
            '<input class="inp" id="petname" placeholder="۲ تا ۱۶ حرف" style="margin-top:10px">'+
            '<div style="display:flex;gap:8px;margin-top:10px">'+
            '<button class="btn primary sm" data-petname>بله، همین باشد</button>'+
            '<button class="btn ghost sm" data-petlater>بعداً</button></div>'+
          '</div>'
          :'<div class="card"><h3>'+ic('i-checkc')+'وضعیت</h3>'+
            '<p class="tiny" style="margin-top:6px">'+(st==='chick'
              ? 'اسمش «'+name+'» است. اگر چند روز نیایی، دلش تنگ می‌شود — ولی **هیچ‌وقت نمی‌میرد** و کم‌رنگ می‌شود، نه بیشتر.'
              : 'با هر ثبت معتبر، تخم به تولد نزدیک‌تر می‌شود.')+'</p>'+
            '<div class="hist" style="margin-top:10px"><span>امروز: '+fa(levels.seed)+' دونه · '+
              (hasWater?fa(levels.water)+' از '+fa(APP.waterGoal||8)+' لیوان':'(آب در برنامه‌ات نیست)')+' · '+
              (levels.home?'حال ثبت شد ✓':'حال ثبت نشده')+'</span></div>'+
            '<div class="tline">'+
              '<div class="tl"><span class="em">🥚</span><span><b>۳ شهریور</b> — تخم گذاشته شد</span></div>'+
              (st==='crack'||st==='chick'?'<div class="tl"><span class="em">🥚</span><span><b>۱۷ شهریور</b> — تخم ترک خورد</span></div>':'')+
              (st==='chick'?'<div class="tl"><span class="em">🐣</span><span><b>۱۹ شهریور</b> — به دنیا آمد</span></div>':'')+
            '</div>'+
            '<p class="tiny" style="margin-top:8px">این تاریخچه <b>هرگز پاک نمی‌شود</b>، حتی اگر سنجه‌ها خالی شوند — '+
            'تا همیشه ببینی چقدر مسیر آمده‌ای (<code>PD-008</code>).</p>'+
            ((APP.petRenames>=2)?'':(st==='chick'?
              '<button class="btn ghost sm" style="margin-top:8px" data-petrename>تغییر اسم — '+
              (APP.petRenames===0?'یک بار دیگر می‌شود':'آخرین بار')+'</button>':''))+
            '<div class="priv-note">'+ic('i-lock')+
              '<span>این صفحه <b>با هم‌مسیر به اشتراک گذاشته نمی‌شود</b> — جوجه، اتاق شخصی توست. '+
              'وضعیتش فقط با تصمیم صریح تو دیده می‌شود.</span></div>'+
          '</div>')+

        '<div class="card tip"><h3>'+ic('i-info')+'یک چیز را بدان</h3>'+
          '<p class="tiny" style="margin-top:6px">جوجه، **ارزش اصلی محصول نیست**. کارها و گزارش‌های تو مهم‌اند؛ '+
          'جوجه فقط یادآوری می‌کند که برگردی — بدون فشار و بدون سرزنش.</p></div>'+
      '</div>'+
    '</div></div>'+
    note('🔢 اعداد تأییدشدهٔ دور ۲۳: ترک '+fa(PET_NUM.crack)+' دونه · تولد '+fa(PET_NUM.born)+' · '+
      'کم‌رنگ '+fa(PET_NUM.pale)+' روز · خاکستری '+fa(PET_NUM.miss)+' روز · رشد '+fa(PET_NUM.mid)+'/'+fa(PET_NUM.full)+'. '+
      'سنجهٔ چهارم («وقت حمام») تا ساخته‌شدن منبعش نمایش داده نمی‌شود. '+
      'سه چیز اینجا **نیست** و هرگز نمی‌آید: مرگ/بیماری/فرار جوجه · شمارش معکوس غیبت · مقایسه با جوجهٔ دیگران. '+
      'و هیچ قابلیت اصلی، پشت رشد جوجه قفل نمی‌شود (`CAR-04`).');
}

/* ============================ ۸) دفترچهٔ جوما — سند ۱۵ ============================ */
var INSIGHTS=[
  {type:'personal', e:'owl-hi',  tag:'از ثبت‌های تو', date:'۱۴ شهریور ۱۴۰۵',
   text:'در ثبت‌های این بازه، روزهایی که خواب بهتری گزارش کرده‌ای، پیاده‌روی بیشتری هم ثبت شده است. '+
        'این همراهی به‌تنهایی علت را نشان نمی‌دهد.',
   meta:'۲۱ جفت داده · بازهٔ ۱ تا ۳۱ مرداد', ev:true},
  {type:'feedback', e:'owl-cheer', tag:'ثبت امروزت', date:'۱۳ شهریور ۱۴۰۵',
   text:'امروز ۴ کار ثبت کردی و نوشیدنت کامل شد. هفتهٔ پیش در همین روز ۲ کار ثبت کرده بودی.',
   meta:'از ثبت‌های ۱۳ شهریور'},
  {type:'reminder', e:'owl-think', tag:'یادآوری', date:'۱۲ شهریور ۱۴۰۵',
   text:'دفترچهٔ جوما وقتی چند روز داده داشته باشد، الگوها را نشان می‌دهد. برای دیدن اولین الگو، '+
        'به حدود ۱۰ روز ثبت نیاز است.',
   meta:'راهنمای محصول'}
];
function R_book(){
  var f=APP.journalFilter||'all';
  var list=INSIGHTS.filter(function(x){return f==='all'||x.type===f;});
  if(empty()) list=[];

  return head('دفترچهٔ جوما','چیزهایی که جوما در ثبت‌های تو دیده','هر کارت می‌گوید از کدام ثبت آمده و چقدر داده پشتش است.',
      '<button class="btn ghost sm" data-vocab>این عددها یعنی چه؟</button>')+

    '<div class="filterchips">'+
      [['all','همه'],['personal','از ثبت‌های تو'],['feedback','ثبت امروزت'],['reminder','یادآوری‌ها']]
      .map(function(c){
        return '<button class="'+(f===c[0]?'btn primary sm':'btn ghost sm')+'" data-jf="'+c[0]+'">'+c[1]+'</button>';
      }).join('')+
    '</div>'+

    (list.length?list.map(function(x,i){
      return '<article class="insight-card '+x.type+' fadeup">'+
        '<header>'+owl(x.e,40)+'<div><span class="chip '+
          (x.type==='personal'?'g':(x.type==='feedback'?'s':'go'))+'">'+x.tag+'</span>'+
          '<span class="tiny" style="margin-inline-start:8px">'+x.date+'</span></div></header>'+
        '<p class="in-text">'+x.text+'</p>'+
        '<div class="in-meta"><span>'+x.meta+'</span>'+
          (x.ev?'<button class="btn ghost sm" style="padding:3px 9px;font-size:10px" data-ev="'+i+'">این برداشت از کجا آمده؟ ←</button>':'')+
        '</div>'+
        '<footer><button class="btn ghost sm" data-notuseful>برایم مفید نبود</button>'+
          '<button class="btn ghost sm" data-dismiss>بستن</button></footer>'+
      '</article>';
    }).join(''):
      '<div class="nodata">'+owl('owl-think',62,'floaty')+
      '<b>هنوز چیزی برای گفتن نیست</b>'+
      '<p class="tiny">دفترچه وقتی چند روز ثبت داشته باشی، الگوها را نشان می‌دهد. '+
      'برای اولین برداشت، به حدود ۱۰ روز ثبت نیاز است.</p></div>')+

    note('سه قاعدهٔ سخت: هر بینش **شواهد** دارد («از کجا آمده»)، **حدس را شاهد جا نمی‌زند**، '+
      'و کاربر می‌تواند بگوید «برایم مفید نبود» یا پیام‌ها را کم کند. '+
      'هیچ بینشی بدون داده ساخته نمی‌شود — اینجا عدد ساختگی وجود ندارد.');
}

/* ============================ ۹) گزارش‌ها — سند ۱۶ ============================ */
var RTABS=[
  ['summary','خلاصه','وضعیت کلی این دوره در یک نگاه: پیشرفت، پوشش داده، و روزهای بهتر.'],
  ['success','تحلیل موفقیت','هر فعالیت چقدر به هدفش رسیده — با وزن و چرخه‌های واجد شرایط.'],
  ['acts','فعالیت‌ها','مقدار ثبت‌شده در برابر هدف، برای هر فعالیت.'],
  ['weight','وزن','سهم هر فعالیت در موفقیت کلی — همان وزنی که خودت داده‌ای.'],
  ['cal','تقویم','هر روز این دوره چه ثبت‌هایی داشته.'],
  ['trend','روند','تغییر مقدار و درصد در طول زمان.'],
  ['mood','خلق','حال، انرژی، تمرکز، خواب و استرس در کنار هم.'],
  ['compare','مقایسه','این دوره در برابر دورهٔ انتخابی دیگر.'],
  ['detail','جزئیات','همهٔ رخدادها، با برچسب منبع و وضعیت.'],
  ['report','گزارش تحلیلی','ترکیب دلخواه: فعالیت‌ها، خلق و همبستگی.']
];
/* داده‌های نمونهٔ رسم نمودار — در محصول، همه از بک‌اند می‌آید */
var RP={
  days:['۱۴','۱۵','۱۶','۱۷','۱۸','۱۹','۲۰','۲۱','۲۲','۲۳','۲۴','۲۵','۲۶','۲۷'],
  mood14:[3,2,4,3,3,4,5,4,3,4,4,5,4,4],
  moodAvg:3.7,   /* میانگین از بک‌اند می‌آید — اینجا نمایشی */
  weeks:[['هفتهٔ ۱',72,80],['هفتهٔ ۲',68,80],['هفتهٔ ۳',84,90],['هفتهٔ ۴',79,90]],
  mix:[['پیاده‌روی',28,'var(--brand)'],['خواب کافی',22,'var(--indigo)'],['نوشیدن آب',18,'var(--sky)'],
       ['مدیتیشن',14,'var(--lav)'],['مطالعه',10,'var(--gold)'],['سایر',8,'var(--coral)']],
  heat:[3,2,1,3,2,0,1, 2,3,3,1,2,2,0, 1,0,2,3,3,2,1, 3,3,2,2,1,3,0, 2,1,2,3,2,2,1],
  scatter:[[2,2],[4,3],[3,2],[5,4],[2,3],[3,3],[4,4],[5,5],[3,4],[4,3],[2,2],[5,4],[3,3],[4,4]],
  acts:[['پیاده‌روی',88,'۲۲ از ۲۵ روز','var(--brand)'],['خواب کافی',92,'۱۸ از ۲۰ روز','var(--indigo)'],
        ['نوشیدن آب',76,'۱۵ از ۲۰ روز','var(--sky)'],['مدیتیشن',54,'۱۱ از ۲۰ روز','var(--lav)'],
        ['مطالعه',31,'۶ از ۲۰ روز','var(--gold)']],
  kpi:[['موفقیت کلی','٪۷۴','با وزنِ خودت',[62,66,71,68,72,77,74],'var(--brand)'],
       ['پوشش داده','٪۸۸','۱۸ روز از ۲۰ روز',[70,74,80,78,84,88,88],'var(--sky)'],
       ['روزهای کامل','۱۲','همهٔ کارها ثبت شده',[2,3,5,7,8,10,12],'var(--gold)'],
       ['میانگین حال','۴٫۱ از ۵','سه شاخص ثبت‌شده',[3.4,3.2,3.6,3.8,3.9,4,4.1],'var(--rose)']]
};
function chartCap(txt){
  return '<div class="ch-cap tiny">'+ic('i-info')+txt+'</div>';
}
function chLegend(items){
  return '<div class="legend">'+items.map(function(x){
    return '<span><i style="background:'+x[1]+'"></i>'+x[0]+'</span>';}).join('')+'</div>';
}
function R_reports(){
  var tab=APP.reportTab||'summary';
  var noData=empty()||APP.reportNoData;
  var t=RTABS.filter(function(x){return x[0]===tab;})[0]||RTABS[0];

  var body='';
  if(noData){
    body='<div class="card"><div class="nodata">'+owl('owl-moon',64,'floaty')+
      '<b>برای این انتخاب داده‌ای نیست</b>'+
      '<p class="tiny">نمودار خالی رسم نمی‌شود. بازه یا فعالیت را عوض کن، یا چند روز ثبت کن تا این تب پر شود.</p>'+
      '<div class="banner warn" style="margin-top:12px;text-align:start">'+ic('i-info')+
      'وضعیت موتور: <b>NO_DATA</b> — هیچ رخداد واجد شرایطی در این بازه نیست.</div>'+
      '</div></div>';
  } else if(tab==='summary'){
    body=
    /* شاخص‌ها با جرقهٔ روند */
    '<div class="stat4">'+RP.kpi.map(function(k){
      return '<div class="card kpi"><div class="lb">'+k[0]+'</div>'+
        '<div class="vl" style="color:'+k[4]+'">'+k[1]+'</div>'+
        '<div class="sb">'+k[2]+'</div>'+
        '<div class="sparkbox">'+chartSpark(k[3],k[4])+'</div></div>';}).join('')+'</div>'+

    /* ۱ — روند حال */
    '<div class="card"><div class="ch-head"><h3>'+ic('i-chart')+'روند حال من — ۱۴ روز آخر</h3>'+
      '<span class="chip">میانگین ۱ تا ۵</span></div>'+
      chartLine(RP.mood14,{xlabels:RP.days,avg:RP.moodAvg,aria:'روند حال در ۱۴ روز آخر'})+
      chLegend([['حال روزانه (خودگزارشی)','var(--brand)'],['خط میانگین','var(--sky)']])+
      '<div class="insights">'+
        '<span class="ins">'+ic('i-checkc')+'بهترین روز: <b>۲۰ شهریور</b> — حال ۵</span>'+
        '<span class="ins">'+ic('i-info')+'سخت‌ترین روز: <b>۱۵ شهریور</b> — حال ۲</span>'+
        '<span class="ins">'+ic('i-clock')+'روند کلی: <b>کمی رو به بالا</b> (۱۴ روز)</span>'+
      '</div>'+
      chartCap('این نمودار <b>خودگزارشی</b> است؛ جوما حال تو را حدس نمی‌زند و از آن نتیجهٔ درمانی نمی‌گیرد.')+
    '</div>'+

    '<div class="grid2">'+
      /* ۲ — پایبندی هفتگی */
      '<div class="card"><div class="ch-head"><h3>'+ic('i-target')+'پایبندی هفتگی</h3></div>'+
        chartBars(RP.weeks,{aria:'پایبندی هفتگی: برنامه‌ریزی‌شده در برابر انجام‌شده'})+
        chLegend([['انجام‌شده','var(--brand)'],['برنامه‌ریزی‌شده','var(--ring-track)']])+
        chartCap('ستون روشن یعنی چیزی که در برنامه بود؛ ستون پُر یعنی چیزی که واقعاً انجام شد.')+
      '</div>'+
      /* ۳ — ترکیب فعالیت‌ها */
      '<div class="card"><div class="ch-head"><h3>'+ic('i-list')+'ترکیب ثبت‌ها</h3></div>'+
        chartDonut(RP.mix,{centerTop:fa(35),centerSub:'ثبت این دوره'})+
        chartCap('سهم هر دسته از کل ثبت‌های این دوره — با درصد، نه فقط رنگ.')+
      '</div>'+
    '</div>'+

    /* ۴ — نقشهٔ ثبت */
    '<div class="card"><div class="ch-head"><h3>'+ic('i-cal')+'نقشهٔ ثبت — ۵ هفته</h3>'+
      '<span class="chip s">۱۲ روز کامل</span></div>'+
      '<div class="heat-wrap">'+chartHeat(RP.heat)+
      '<div class="legend v"><span><i class="ch-h0"></i>ثبت‌نشده</span><span><i class="ch-h1"></i>کم</span>'+
      '<span><i class="ch-h2"></i>خوب</span><span><i class="ch-h3"></i>کامل</span>'+
      '<span class="streak">'+ic('i-bolt')+'بیشترین زنجیره: <b>۶ روز پیاپی</b></span></div></div>'+
      chartCap('هر خانه یک روز است. خالی‌بودن یک روز، «شکست» نیست — فقط داده‌ای برای آن روز نداریم.')+
    '</div>'+

    '<div class="grid2">'+
      /* ۵ — پراکندگی خواب و حال */
      '<div class="card"><div class="ch-head"><h3>'+ic('i-moon')+'خواب و حال، کنار هم</h3></div>'+
        chartScatter(RP.scatter,{xlabel:'کیفیت خواب (۱ تا ۵)',ylabel:'حال'})+
        chartCap('هر نقطه یک روز است. <b>همبستگی، علت نیست</b> — این نمودار فقط می‌گوید دو چیز با هم بالا و پایین رفته‌اند.')+
      '</div>'+
      /* توضیح عددها */
      '<div class="card"><h3>'+ic('i-info')+'این عددها یعنی چه؟</h3>'+
        '<div class="kv"><span>مقداری که ثبت کرده‌ای</span><b>۷٫۵ ساعت</b></div>'+
        '<div class="kv"><span>هدف</span><b>هدف: ۸ ساعت</b></div>'+
        '<div class="kv"><span>هدف را چقدر برآورده کردی</span><b>٪۹۴</b></div>'+
        '<div class="kv"><span>چقدر داده داری</span><b>٪۸۸ پوشش</b></div>'+
        '<div class="kv"><span>موفقیت کلی</span><b>٪۷۴</b></div>'+
        '<div class="kv"><span>ثبت‌نشده</span><b>«ثبت نشده»</b></div>'+
        chartCap('واژه‌نامهٔ کامل با دکمهٔ «واژه‌نامهٔ عددها» بالای صفحه باز می‌شود.')+
      '</div>'+
    '</div>';
  } else if(tab==='mood'){
    /* ستون چهارم = میانگینی که در محصول از بک‌اند می‌آید (اینجا نمایشی) */
    var series=[['خواب','var(--indigo)',[3,4,5,4,4,5,4,3,4,5,4,4,5,4],'۴٫۱'],
                ['انرژی','var(--gold)',[2,3,3,4,4,3,5,3,4,4,3,5,4,4],'۳٫۶'],
                ['تمرکز','var(--sky)',[3,3,4,4,3,5,4,3,4,3,4,4,3,4],'۳٫۶'],
                ['استرس','var(--coral)',[4,3,2,3,2,2,1,3,2,2,3,1,2,2],'۲٫۳']];
    body='<div class="grid2">'+series.map(function(m){
      /* «میانگین» عددِ گزارش‌شده است و از بک‌اند می‌آید (m[3]) — نه از محاسبهٔ فرانت */
      return '<div class="card"><div class="ch-head"><h3 style="color:'+m[1]+'">'+m[0]+'</h3>'+
        '<span class="tiny">میانگین '+fa(m[3])+' از ۵</span></div>'
        chartLine(m[2],{xlabels:RP.days,avg:m[3],h:150,aria:'روند '+m[0]})+
        '</div>';}).join('')+'</div>'+
      note('پنج شاخص خلق، هر کدام نمودار خودش را دارد — روی هم انداختنشان تصویر را شلوغ می‌کند. '+
        '«خواب دیشبت» **کیفیت** را می‌پرسد نه ساعت — و همین در زیرنویس فرم حال هم گفته می‌شود.');
  } else if(tab==='acts'||tab==='success'||tab==='weight'){
    var metric=(tab==='weight'?'وزن هر فعالیت در موفقیت کلی':(tab==='acts'?'مقدار ثبت‌شده در برابر هدف':'تحقق هدف'));
    body='<div class="card"><div class="ch-head"><h3>'+ic('i-target')+metric+'</h3>'+
      '<span class="chip g">۵ فعالیت فعال</span></div>'+
      hbars(RP.acts)+
      '<div class="banner info" style="margin-top:12px">'+ic('i-info')+
        'هدف‌های این نمودار **اسنپ‌شات برنامه** هستند؛ اگر فعالیت کتابخانه بعداً عوض شود، این‌ها تغییر نمی‌کنند.</div>'+
      chartCap('هر میله یک فعالیت است؛ عدد کنارش می‌گوید در چند روز از روزهای ممکن ثبت شده.')+
      '</div>'+
      '<div class="card"><h3>'+ic('i-list')+'جدول کامل</h3>'+
      '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>فعالیت</th><th>هدف را چقدر برآورده کردی</th>'+
      '<th>چقدر داده داری</th><th>وزن</th></tr></thead><tbody>'+
      RP.acts.map(function(r,i){
        return '<tr><td><b style="font-size:12px">'+r[0]+'</b></td>'+
          '<td>'+(tab==='weight'?'<span class="tiny">—</span>':'٪'+fa(r[1]))+'</td>'+
          '<td><span class="tiny">'+r[2]+'</span></td>'+
          '<td><span class="acl-chip">'+['زیاد','زیاد','متوسط','متوسط','کم'][i]+'</span></td></tr>';}).join('')+
      '</tbody></table></div></div>';
  } else if(tab==='cal'||tab==='trend'){
    body='<div class="card"><div class="ch-head"><h3>'+ic('i-cal')+(tab==='cal'?'تقویم ثبت‌ها':'روند مقدارها')+'</h3>'+
      '<span class="chip">شهریور ۱۴۰۵</span></div>'+
      '<div class="heat-wrap">'+chartHeat(RP.heat)+
      '<div class="legend v"><span><i class="ch-h0"></i>ثبت‌نشده</span><span><i class="ch-h1"></i>کم</span>'+
      '<span><i class="ch-h2"></i>خوب</span><span><i class="ch-h3"></i>کامل</span></div></div>'+
      chartCap('روی هر روز می‌شود رفت — روزهای بی‌ثبت هم رنگ خودشان را دارند و «صفر» حساب نمی‌شوند.')+
      '</div>'+
      '<div class="grid2">'+
        '<div class="card"><div class="ch-head"><h3>'+ic('i-drop')+'آب — روند روزانه</h3></div>'+
          chartLine([5,6,7,8,6,5,8,7,8,8,6,7,8,8],{xlabels:RP.days,min:0,max:8,h:150,aria:'روند نوشیدن آب'})+'</div>'+
        '<div class="card"><div class="ch-head"><h3>'+ic('i-walk')+'پیاده‌روی — روند روزانه</h3></div>'+
          chartLine([20,0,25,20,15,30,20,0,20,25,20,30,15,20],{xlabels:RP.days,min:0,max:30,h:150,aria:'روند پیاده‌روی'})+'</div>'+
      '</div>';
  } else if(tab==='compare'){
    body='<div class="card"><div class="ch-head"><h3>'+ic('i-chart')+'این دوره در برابر مرداد</h3></div>'+
      chartBars([['موفقیت',79,82],['پوشش',88,84],['روزهای کامل',62,55],['میانگین حال',82,74]],
        {aria:'مقایسهٔ این دوره با دورهٔ پیش'})+
      chLegend([['شهریور (این دوره)','var(--brand)'],['مرداد (دورهٔ پیش)','var(--ring-track)']])+
      chartCap('درصدها نسبی‌اند تا دوره‌های با طول متفاوت قابل‌مقایسه باشند.')+
      '</div>'+
      '<div class="card"><h3>'+ic('i-info')+'سه عدد، سه معنی</h3>'+
      '<div class="kv"><span>پیشرفت این ماه</span><b>٪۸۲ — ۱۴ واحد رشد</b></div>'+
      '<div class="kv"><span>روزهای همراهی</span><b>۲۰ روز — ٪۶۵ روزها</b></div>'+
      '<div class="banner info" style="margin-top:12px">'+ic('i-info')+
      '«پیشرفت» و «موفقیت» و «تحقق» سه چیز متفاوت‌اند و هر کدام عنوان خودشان را دارند (۵٫۲).</div></div>';
  } else if(tab==='detail'){
    body='<div class="card">'+
      '<div class="banner warn" style="margin-bottom:12px">'+ic('i-info')+
      'وضعیت موتور: <b>AMBIGUOUS_DUPLICATE</b> — ۲ رخداد مبهم پیدا شد و علامت خورده‌اند. '+
      'این هشدار بسته نمی‌شود؛ تا رفع نشود، عدد نهایی قطعی نیست.</div>'+
      '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>تاریخ</th><th>فعالیت</th><th>مقدار</th><th>منبع</th><th>وضعیت</th></tr></thead><tbody>'+
      [['۱۲ شهریور','پیاده‌روی','۲۰ دقیقه','ثبت روزانه','done'],
       ['۱۲ شهریور','آب','۸ لیوان','قطعی خودکار','done'],
       ['۱۱ شهریور','مدیتیشن','۱۵ دقیقه','ثبت با تأخیر','draft'],
       ['۱۱ شهریور','مطالعه','۱۰ صفحه','ثبت روزانه','done'],
       ['۱۰ شهریور','آب','۵ لیوان','قطعی خودکار','done'],
       ['۱۰ شهریور','مطالعه','—','تکراری مشکوک','err']]
      .map(function(r){
        var map={done:['g','ثبت قطعی'],draft:['s','تأخیر'],err:['c','مبهم']};
        return '<tr><td class="tiny num">'+r[0]+'</td><td><b style="font-size:12px">'+r[1]+'</b></td>'+
          '<td class="tiny num">'+r[2]+'</td><td class="tiny">'+r[3]+'</td>'+
          '<td><span class="tst '+r[4]+'">'+ic(r[4]==='err'?'i-info':'i-check')+map[r[4]][1]+'</span></td></tr>';
      }).join('')+'</tbody></table></div></div>';
  } else {
    body='<div class="card"><h3>'+ic('i-book')+'گزارش تحلیلی بساز</h3>'+
      '<p class="tiny" style="margin-top:6px">ترکیب دلخواه بساز: فعالیت‌ها، خلق و همبستگی — و همان را به نمودار تبدیل کن.</p>'+
      '<div class="rfilters" style="margin-top:12px">'+
      '<span class="acl-chip">فعالیت: پیاده‌روی</span><span class="acl-chip">فعالیت: خواب</span>'+
      '<span class="acl-chip">خلق: انرژی</span><span class="acl-chip">+ افزودن</span></div>'+
      '<button class="btn primary sm" style="margin-top:12px" data-repbuild>ساختن نمودار ترکیبی</button>'+
      '<div class="banner info" style="margin-top:12px">'+ic('i-info')+
      'همبستگی، **علت را نشان نمی‌دهد**. هر جملهٔ همبستگی در گزارش، همین را می‌گوید.</div></div>';
  }

  return head('گزارش‌ها','گزارش‌های من','هر عدد و هر نمودار از بک‌اند می‌آید — فرانت هیچ میانگینی نمی‌سازد.',
      '<span class="headacts"><button class="btn ghost sm" data-vocab>واژه‌نامهٔ عددها</button>'+
      '<button class="btn soft sm" data-export="report">'+ic('i-download')+'گزارش PDF</button>'+
      '<button class="btn ghost sm" data-export="image">تصویر نمودارها</button></span>')+
    '<div class="rtabs" role="tablist">'+RTABS.map(function(x){
      return '<button role="tab" aria-selected="'+(x[0]===tab)+'" data-rtab="'+x[0]+'">'+x[1]+'</button>';}).join('')+'</div>'+
    '<p class="tabnote">این تب چه چیزی نشان می‌دهد؟ '+t[2]+'</p>'+
    '<div class="rfilters">'+
      '<select class="fpick"><option>دوره: شهریور ۱۴۰۵</option><option>دوره: مرداد ۱۴۰۵</option></select>'+
      '<select class="fpick"><option>بازه: کل دوره</option><option>بازه: ۷ روز آخر</option></select>'+
      '<select class="fpick"><option>فعالیت: همه</option><option>فعالیت: پیاده‌روی</option></select>'+
      '<select class="fpick"><option>نمودار: خطی</option><option>نمودار: ستونی</option></select>'+
      '<select class="fpick"><option>مقایسه با: مرداد</option><option>بدون مقایسه</option></select>'+
      '<span class="sp" style="flex:1"></span>'+
      '<button class="btn ghost sm" data-nodatatoggle>'+(noData?'داده را نشان بده':'حالت بدون داده')+'</button>'+
    '</div>'+
    (noData?'':'<div class="banner warn" style="margin-top:4px">'+ic('i-info')+
      'یک هشدار موتور باز است (رخداد تکراری مشکوک). این نوار تا رفع نشود بسته نمی‌شود.</div>')+
    body+
    note('ده تب — **هیچ‌کدام حذف نمی‌شوند**، حتی اگر خالی باشند. تب خالی، `.nodata` می‌گیرد نه «صفر». '+
      'نمودارها **همیشه** سه چیز دارند: محور و مقیاس روشن · برچسب عددی (نه فقط رنگ) · یک جملهٔ «این نمودار چه می‌گوید». '+
      'و واژه‌نامهٔ عددها (مقدار / هدف / تحقق / پوشش / موفقیت / ثبت‌نشده) **در خود محصول** است، نه فقط در سند.');
}

/* ============================ ۱۰) برنامهٔ من — سند ۱۸ ============================ */
var PLAN_ST={
  DRAFT:['پیش‌نویس','--sky','در حال ساختن؛ هیچ‌چیز قفل نیست'],
  PLANNING:['در حال آماده‌سازی','--gold','آمادهٔ شروع؛ در انتظار دکمهٔ «شروع»'],
  RUNNING:['در حال اجرا','--brand','قفل محتوایی دارد'],
  ARCHIVED:['بایگانی‌شده','--ink-3','تمام‌شده؛ فقط‌خواندنی']
};
function R_plan(){
  var st=APP.planStatus||'RUNNING';
  var tab=APP.planTab||'acts';
  var meta=PLAN_ST[st];
  var locked=(st==='RUNNING'||st==='ARCHIVED');

  var acts=[
    ['i-walk','پیاده‌روی','۲۰ دقیقه · روزانه','روزانه','زیاد','۳ رخداد این چرخه'],
    ['i-moon','خواب کافی','۸ ساعت · روزانه','روزانه','زیاد','۷ رخداد این چرخه'],
    ['i-drop','نوشیدن آب','۸ لیوان · روزانه','روزانه','متوسط','۷ رخداد این چرخه'],
    ['i-lotus','مدیتیشن','۱۵ دقیقه · روزانه','روزانه','متوسط','۴ رخداد این چرخه'],
    ['i-book','مطالعه','۱۰ صفحه · هفتگی','هفتگی','کم','۱ رخداد این چرخه']
  ];

  var body;
  if(tab==='acts'){
    body= acts.length? '<div class="card">'+
      '<div class="banner info" style="margin-bottom:12px">'+ic('i-info')+
      'هدف‌های این جدول در زمان افزودن ثبت شده‌اند. اگر فعالیت کتابخانه بعداً عوض شود، **این هدف‌ها تغییر نمی‌کنند.**</div>'+
      '<table class="tbl"><thead><tr><th>فعالیت</th><th>هدف این برنامه</th><th>تناوب</th><th>وزن</th><th>وضعیت ثبت</th>'+
      '<th style="width:56px">'+(locked?'قفل':'اقدام')+'</th></tr></thead><tbody>'+
      acts.map(function(r,i){
        return '<tr><td><span class="act"><span class="chip g">'+ic(r[0])+'</span>'+
          '<span><b>'+r[1]+'</b></span></span></td>'+
          '<td class="tiny">'+r[2]+'</td><td class="tiny">'+r[3]+'</td>'+
          '<td><span class="acl-chip">'+r[4]+'</span></td>'+
          '<td class="tiny">'+r[5]+'</td>'+
          '<td>'+(locked
            ? '<span class="lockrow" title="حذف فعالیت در دورهٔ در حال اجرا مجاز نیست">'+ic('i-info')+'قفل</span>'
            : '<button class="btn ghost sm" data-actmenu="'+i+'">⋯</button>')+'</td></tr>';
      }).join('')+'</tbody></table>'+
      (locked?'<p class="tiny" style="margin-top:10px">فعالیت‌ها تا پایان این دوره <b>حذف نمی‌شوند</b> — چون گزارش و وزن همین دوره عوض می‌شود. '+
        'راه جایگزین: «دورهٔ نو با همین فعالیت‌ها».</p>':'')+
      '</div>'
      : '<div class="card"><div class="nodata">'+owl('owl-think',60,'floaty')+
        '<b>این برنامه هنوز فعالیتی ندارد</b>'+
        '<p class="tiny">از کتابخانه انتخاب کن. برای شروع دوره، حداقل یک فعالیت لازم است.</p>'+
        '<a class="btn primary sm" style="margin-top:10px" href="#library">رفتن به کتابخانه</a></div></div>';
  } else if(tab==='cal'){
    /* تقویم ماه — همان کامپوننت خانه (سند ۱۱ §۷): سه‌بعدی، پاستلی، برچسب‌دار */
    var CALSTAT=[[fa(CAL.full.length),'روز کامل','--cal-mint-ink'],
                 [fa(CAL.part.length),'روز ناقص','--cal-gold-ink'],
                 [fa(CAL.miss.length),'روز بی‌ثبت','--cal-sky-ink'],
                 [fa(CAL.days),'روز ماه','--ink-2']];
    body='<div class="card"><h3>'+ic('i-cal')+'مسیر این ماه</h3>'+
      '<p class="tiny" style="margin-top:5px">این تقویمِ دورهٔ توست: هر خانه یک روز. روی هر روز بزن تا ببینی چه ثبت شده — '+
      'روزهای آینده خالی‌اند و قابل ثبت نیستند.</p>'+
      monthCal()+
      '<div class="stat4" style="margin-top:14px;gap:10px">'+CALSTAT.map(function(x){
        return '<div class="card" style="padding:12px"><div class="lb">'+x[1]+'</div>'+
          '<div class="vl" style="color:var('+x[2]+')">'+x[0]+'</div></div>';}).join('')+'</div>'+
      '<div class="kv" style="margin-top:12px"><span>روزهای همراهی این ماه</span><b>'+
        fa(CAL.full.length+CAL.part.length)+' از '+fa(CAL.days)+'</b></div>'+
      '<div class="kv"><span>بهترین روز</span><b>۱۳ شهریور — همهٔ کارها</b></div>'+
      '<div class="kv"><span>روزهای بی‌ثبت پیوسته</span><b>۲ روز (۷ و ۱۴)</b></div>'+
    '</div>'+
    '<div class="card"><h3>'+ic('i-info')+'چرا تقویم و نه نمودار؟</h3>'+
      '<p class="tiny" style="margin-top:6px">عدد و درصد، در گزارش‌ها هست. اینجا فقط می‌خواهی ببینی «مسیرم چه شکلی است» — '+
      'پس شکلِ ماه را می‌بینی، نه یک عدد. روزهای بی‌ثبت هم <b>سرزنش نیستند</b>؛ فقط نشان می‌دهند کجا شکاف افتاده.</p></div>';
    } else if(tab==='settings'){
    body='<div class="card"><h3>'+ic('i-gear')+'تنظیمات این دوره</h3>'+
      '<div class="kv" style="margin-top:8px"><span>نام دوره</span><b>شهریور ۱۴۰۵</b></div>'+
      '<div class="kv"><span>تاریخ شروع</span><b>۳ شهریور ۱۴۰۵</b></div>'+
      '<div class="kv"><span>تاریخ پایان</span><b>۳۱ شهریور ۱۴۰۵ — <span class="tiny">در حال اجرا قابل تغییر نیست</span></b></div>'+
      '<div class="kv"><span>حداقل فعالیت</span><b>۱ — شرط شروع دوره</b></div>'+
      '<div class="banner warn" style="margin-top:12px">'+ic('i-info')+
      'تغییر تاریخ پایان دورهٔ در حال اجرا **ممنوع** است — گزارش‌ها بر همان بازه ساخته شده‌اند.</div></div>';
  } else {
    body='<div class="stat4">'+
      [['فعالیت‌ها','۸','۶ روزانه · ۱ هفتگی · ۱ ماهانه','--brand-ink'],
       ['روزهای دوره','۲۰','از ۳ تا ۲۳ شهریور','--sky-ink'],
       ['ثبت‌های این دوره','۱۴۲','شامل ثبت با تأخیر','--gold-ink'],
       ['حال ثبت‌شده','۱۸ روز','۵ قدم در هر روز','--rose-ink']]
      .map(function(s){return '<div class="card"><div class="lb">'+s[0]+'</div>'+
        '<div class="vl" style="color:var('+s[3]+')">'+s[1]+'</div><div class="sb">'+s[2]+'</div></div>';}).join('')+
    '</div>'+
    '<div class="card"><h3>'+ic('i-info')+'این دوره چه زمانی قفل شد؟</h3>'+
      '<p class="tiny" style="margin-top:6px">قفل، **لحظهٔ فشردن «شروع این دوره»** است — نه اولین ثبت. '+
      'پیش از آن، همه‌چیز آزاد است؛ بعد از آن، محتوای دوره تغییر نمی‌کند.</p>'+
      '<p class="tiny">تاریخ شروع ثبت‌شده: ۳ شهریور ۱۴۰۵ · ۱۴:۰۵</p></div>';
  }

  var actions={
    DRAFT:[['آماده‌سازی — برو مرحلهٔ بعد','primary',true],['بایگانی','ghost',false]],
    PLANNING:[['شروع این دوره','primary',true],['برگشت به پیش‌نویس','ghost',false],['بایگانی','ghost',false]],
    RUNNING:[['دیدن گزارش‌ها','primary',true],['بایگانی','ghost',false]],
    ARCHIVED:[['ساخت دورهٔ جدید','primary',true],['گزارش‌های این دوره','ghost',false]]
  }[st];

  return head('برنامهٔ من','برنامهٔ من','دوره‌ات را بساز، آماده کن، بعد شروع کن — قفل، سرِ شروع بسته می‌شود.',
      '<span class="period-pick" data-planstatus>'+
      ic('i-target')+'شهریور ۱۴۰۵'+
      '<span class="chip '+(st==='RUNNING'?'g':(st==='PLANNING'?'go':(st==='DRAFT'?'s':'n')))+'">'+meta[0]+'</span>'+
      ic('i-chev-l')+'</span>')+

    '<div class="statuscard '+st+'">'+
      '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">'+
        '<b style="font-size:14px">وضعیت: '+meta[0]+'</b>'+
        '<span class="tiny">'+meta[2]+'</span></div>'+
      (st==='PLANNING'?'<p class="tiny" style="margin-top:6px">با فشردن «شروع»، محتوای دوره قفل می‌شود و تا پایان قابل ویرایش نیست.</p>':'')+
      (st==='RUNNING'?'<p class="tiny" style="margin-top:6px">محتوای این دوره قفل است. هدف‌ها همان‌هایی هستند که در زمان شروع ثبت شدند.</p>':'')+
    '</div>'+
    note('کلید <b>وضعیت دوره</b> در همین سرصفحه (در نمونه) چهار وضعیت را نشان می‌دهد: پیش‌نویس → در حال آماده‌سازی → در حال اجرا → بایگانی. '+
      'انتقال‌های مجاز در `۴٫۲` آمده و فرانت هیچ‌کدام را خودش انجام نمی‌دهد.')+

    '<div class="tabs">'+[['acts','فعالیت‌ها'],['cal','مسیر این ماه'],['settings','تنظیمات'],['summary','خلاصه']].map(function(t){
      return '<button class="'+(tab===t[0]?'on':'')+'" data-ptab="'+t[0]+'">'+t[1]+'</button>';}).join('')+'</div>'+
    body+

    '<div class="card" style="border-color:var(--brand-soft)">'+
      '<b style="font-size:12.5px">ناحیهٔ اقدام</b>'+
      '<div style="display:flex;gap:9px;margin-top:10px;flex-wrap:wrap">'+
        actions.map(function(a){
          return '<button class="btn '+a[1]+' sm" data-planact="'+a[0]+'">'+a[0]+'</button>';}).join('')+
      '</div></div>'+
    note('«شروع» **برگشت‌ناپذیر** است — پس هزینه‌اش **پیش از** اقدام گفته می‌شود، نه بعد از آن. '+
      'و افزودن/حذف فعالیت روی دورهٔ در حال اجرا **ممنوع دائمی** است: دکمه‌ای هم ساخته نمی‌شود، حتی خاکستری.');
}

/* ============================ ۱۱) کتابخانه — سند ۱۷ ============================ */
/* ردیف‌ها: [کد، نام، دسته، تناوب(نمایش)، تناوب(فیلتر)، هدف، جوجه، رنگ، مسیر، نماد، آموزش‌دار؟]
   ستون آخر تعیین می‌کند کارت دکمهٔ «آموزش» بگیرد یا نه — کاربرِ مالک: «فقط فعالیت‌هایی
   که آموزش دارند باید گزینهٔ آموزش داشته باشند». بقیه «جزئیات» می‌گیرند.            */
var LIB=[
  ['ACT001','پیاده‌روی','سلامت جسم','۲۰ دقیقه · روزانه','روزانه','۲۰ دقیقه','owl-fit','--brand-soft','self','sport',true],
  ['ACT002','نوشیدن آب','سلامت جسم','۸ لیوان · روزانه','روزانه','۸ لیوان','owl-water','--sky-soft','self','sport',true],
  ['ACT005','خواب کافی','سلامت جسم','۸ ساعت · روزانه','روزانه','۸ ساعت','owl-moon','--indigo-soft','self','sport',true],
  ['ACT003','خوراک سالم','سلامت جسم','۳ وعده · روزانه','روزانه','۳ وعده','owl-cheer','--rose-soft','self','food',false],
  ['ACT007','مدیتیشن ۱۵ دقیقه‌ای','مراقبه','۱۵ دقیقه · روزانه','روزانه','۱۵ دقیقه','owl-lotus','--lav-soft','self','calm',true],
  ['ACT008','تمرین تنفس ۴-۷-۸','مراقبه','۳ دور · روزانه','روزانه','۳ دور','owl-lotus','--lav-soft','self','calm',false],
  ['ACT004','مطالعهٔ آرام','ذهن','۱۰ صفحه · روزانه','روزانه','۱۰ صفحه','owl-read','--gold-soft','self','mind',false],
  ['ACT006','نوشتن روزانه','ذهن','۱ صفحه · روزانه','روزانه','۱ صفحه','owl-read','--gold-soft','self','mind',true],
  ['ACT009','گفت‌وگوی روزانه','ارتباط','۵ دقیقه · روزانه','روزانه','۵ دقیقه','owl-hi','--rose-soft','couple','talk',true],
  ['ACT046','بازسازی صمیمیت عاطفی','زوج درمانی','۱۵ دقیقه · روزانه','روزانه','۱ تمرین','owl-hi','--rose-soft','couple','talk',true],
  ['ACT047','تمرین گفت‌وگو بدون دعوا','زوج درمانی','۲۰ دقیقه · هفتگی','هفتگی','۱ جلسه','owl-hi','--rose-soft','couple','talk',true],
  ['ACT048','هنر شنیدن همسر','زوج درمانی','۱۰ دقیقه · روزانه','روزانه','۱ تمرین','owl-think','--rose-soft','couple','talk',true],
  ['ACT101','شناخت طرح‌واره‌ها','طرح‌واره','۱ جلسه · هفتگی','هفتگی','۱ جلسه','owl-think','--indigo-soft','schema','schema',true],
  ['ACT102','مرور هفتگی طرح‌واره','طرح‌واره','۱ جلسه · هفتگی','هفتگی','۱ جلسه','owl-read','--indigo-soft','schema','schema',false]
];
var LIB_CATS=['همه دسته‌ها','سلامت جسم','مراقبه','ذهن','ارتباط','زوج درمانی','طرح‌واره','خواب','تغذیه','ورزش','کار و تمرکز',
  'خانواده','دوستان','مالی','معنویت'];
var LIB_TAGS=['همه تناوب‌ها','روزانه','هفتگی','ماهانه','هر وقت خواستی'];
function R_library(){
  var q=(APP.libQuery||'').trim();
  var path=APP.libPath||'all';
  var cat=APP.libCat||'همه دسته‌ها';
  var freq=APP.libFreq||'همه تناوب‌ها';
  var list=LIB.filter(function(a){
    var okp=(path==='all'||a[8]===path);
    var okc=(cat==='همه دسته‌ها'||a[2]===cat);
    var okf=(freq==='همه تناوب‌ها'||a[3].indexOf(freq)>=0||(freq==='هر وقت خواستی'));
    var okq=!q||a[0].indexOf(q)>=0||a[1].indexOf(q)>=0;
    return okp&&okc&&okf&&okq;
  });
  if(empty()) list=[];

  var cats=function(v){return v.map(function(c){
    return '<option'+(cat===c?' selected':'')+'>'+c+'</option>';}).join('');};
  var freqs=function(v){return v.map(function(c){
    return '<option'+(freq===c?' selected':'')+'>'+c+'</option>';}).join('');};

  return head('کتابخانه','کتابخانهٔ فعالیت‌ها',
      '۱۰۷ فعالیت آماده — ۴۵ پایه و فردی، ۳۵ مسیر زوج‌درمانی، ۲۷ مسیر طرح‌واره. '+
      'دکمهٔ «آموزش» فقط روی فعالیت‌هایی است که راهنمای تمرین دارند؛ بقیه «جزئیات» می‌گیرند.',
      '<span class="chip g">۱۰۷ فعالیت</span>')+

    /* فیلترها — همان ساختار مرجع: جست‌وجو + دسته + تناوب + دکمهٔ فیلتر */
    '<div class="card libfilters">'+
      '<div class="searchbar">'+ic('i-search','',18)+
        '<input id="libq" placeholder="جست‌وجو با نام یا ACT…" value="'+esc(q)+'" data-libq>'+
        (q?'<button class="btn ghost sm" data-libclear>پاک کن</button>':'')+'</div>'+
      '<select class="inp sel" data-libcat>'+cats(LIB_CATS)+'</select>'+
      '<select class="inp sel" data-libfreq>'+freqs(LIB_TAGS)+'</select>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap">'+
        '<button class="btn soft sm" data-libreset>پاک‌کردن فیلترها</button>'+
        '<span class="sp"></span>'+
        '<button class="btn primary sm" data-libnew>'+ic('i-plus')+'افزودن فعالیت جدید</button>'+
      '</div>'+
    '</div>'+

    /* مسیرها — چیپ */
    '<div class="filterchips">'+[['all','همه'],['self','فردی'],['couple','زوج‌درمانی'],['schema','طرح‌واره']]
      .map(function(p){
        return '<button class="'+(path===p[0]?'btn primary sm':'btn ghost sm')+'" data-libpath="'+p[0]+'">'+p[1]+'</button>';
      }).join('')+'</div>'+

    '<div class="tiny libcount">'+(list.length?fa(list.length)+' فعالیت از '+(path==='self'?'۴۵':(path==='couple'?'۳۵':(path==='schema'?'۲۷':'۱۰۷'))):'۰ نتیجه')+
      ' · مسیر: '+(path==='all'?'همه':(path==='self'?'فردی':(path==='couple'?'زوج‌درمانی':'طرح‌واره')))+
      ' · دسته: '+cat+
      ' <span class="pathcounts"><b>۴۵</b> پایه و فردی · <b>۳۵</b> زوج‌درمانی · <b>۲۷</b> طرح‌واره</span></div>'+

    (list.length?
      '<div class="libgrid">'+list.map(function(a){
        return '<article class="act-card fadeup">'+
          '<div class="acl-art" style="background:var('+a[7]+')">'+
            '<span class="acl-code num">'+a[0]+'</span>'+owl(a[6],54)+
            '<span class="acl-act">'+ic('i-play')+'</span></div>'+
          '<div class="acl-body"><h3>'+a[1]+'</h3>'+
            '<div class="tiny acl-cat">'+a[2]+'</div>'+
            '<p class="acl-desc">'+a[4]+' · هدف: '+a[3]+'</p>'+
            '<div class="acl-edu '+(a[10]?'has':'no')+' tiny">'+
              (a[10]? ic('i-checkc')+'راهنمای تمرین دارد — دکمهٔ «آموزش»':'راهنمای تمرین ندارد — «جزئیات»')+'</div>'+
            '<div class="acl-actions">'+
              '<button class="btn primary sm" data-addplan="'+a[1]+'">'+ic('i-plus')+'افزودن به برنامه</button>'+
              (a[0]==='ACT008'? '<button class="btn soft sm" data-breathopen="library">'+ic('i-play')+'شروع تنفس</button>':'')+
              (a[10]? '<button class="btn ghost sm" data-actdetail="'+a[1]+'">'+ic('i-book')+'آموزش</button>'
                    : '<button class="btn ghost sm" data-actdetail="'+a[1]+'">جزئیات</button>')+
              '<button class="btn ghost sm" data-liblock>غیرفعال</button>'+
            '</div></div></article>';
      }).join('')+'</div>'+
      '<div class="pager tiny">۱۰۷ نتیجه — نمایش ۱ تا ۱۴ <button class="btn ghost sm" data-libmore>نمایش بیشتر</button></div>'
      : '<div class="nodata">'+owl('owl-think',62,'floaty')+
        '<b>چیزی پیدا نشد</b>'+
        '<p class="tiny">جست‌وجو را ساده‌تر کن یا فیلترها را بردار.</p>'+
        '<button class="btn soft sm" style="margin-top:10px" data-libreset>پاک‌کردن فیلترها</button></div>')+

    note('کارت فقط همین‌ها را دارد: تصویر · نام · دسته · توضیح · تناوب به **واژه** · هدف با برچسب صریح «هدف:». '+
      '**آموزش فقط برای فعالیت‌هایی که راهنمای تمرین دارند**؛ بقیه کارت «جزئیات» دارند تا کاربر دنبال چیزی نگردد که نیست. '+
      '«تمرین تنفس ۴-۷-۸» از همین‌جا یک‌کلیک شروع می‌شود. '+
      'شناسهٔ `ACT` در محصول نمایش داده نمی‌شود (اینجا فقط برای تطبیق با بک‌اند است). '+
      '**۱۴ دسته** و **۵ تناوب** از بک‌اند می‌آیند؛ این نمونه ۱۴ کارت از ۱۰۷ را نشان می‌دهد. '+
      'اگر فقط یک دورهٔ `RUNNING` باشد، «افزودن» می‌گوید چرا رد می‌شود و مسیر دورهٔ نو را پیشنهاد می‌دهد.');
}

/* ============================ ۱۲) آموزش — سند ۱۹ ============================ */
var HOWSTEPS=[
  ['i-target','انتخاب فعالیت','از ۱۰۷ فعالیت','library'],
  ['i-gear','ساخت برنامه','هدف و تناوب','plan'],
  ['i-checkc','ثبت روزانه','کار + حال + آب','today'],
  ['i-chart','دیدن گزارش','ده تب تحلیلی','reports'],
  ['i-book','شناختن الگو','بینش‌های شخصی','book']
];

/* ==========================================================================
   کاتالوگ کامل آموزش — ۷۲ راهنما
   ۱۰ عمومی و فردی + ۳۵ تمرین زوج‌درمانی + ۹ تکنیک طرح‌واره + ۱۸ طرح‌واره
   هر ردیف: [کد، عنوان، توضیح، مدت، تنها/دو نفره، جوجه، رنگ، مسیر، فصل، خوانده‌شده، افزودن به برنامه]
   مالک: «آموزش کامل و یک‌به‌یک هر تمرین، نقطهٔ قوت برنامه بود» — پس همه اینجا فهرست می‌شوند.
   ========================================================================== */
var EDU=[
  /* ---------- عمومی و فردی (۱۰) ---------- */
  ['G01','ورود به جوما','فلسفه و قواعد ثبت: چه چیزی، کِی، و چرا.','۵ دقیقه','تنها','owl-hi','--brand-soft','self','gen',true,false],
  ['G02','تمرین تنفس ۴-۷-۸','انیمیشنی: دایره با دم باز می‌شود، با بازدم جمع. سه دور.','۳ دقیقه','تنها','owl-lotus','--lav-soft','self','gen',false,true],
  ['G03','ذهن‌آگاهی در سه دقیقه','نفس، بدن، فکر — بدون قضاوت.','۳ دقیقه','تنها','owl-lotus','--lav-soft','self','gen',false,true],
  ['G04','بدن‌آگاهی: پویش پنج‌دقیقه‌ای','از سر تا پا، آرام و بی‌عجله.','۵ دقیقه','تنها','owl-lotus','--indigo-soft','self','gen',false,false],
  ['G05','خواب و بی‌خوابی','سه عادت ساده که شب را بهتر می‌کند.','۶ دقیقه','تنها','owl-moon','--indigo-soft','self','gen',false,true],
  ['G06','مرزها: نه گفتن محترمانه','تمرین جمله‌های کوتاه و روشن.','۸ دقیقه','تنها','owl-read','--lav-soft','self','gen',false,true],
  ['G07','دفترچهٔ سه‌خطی','سه جمله در پایان روز: چه شد، چه حس شد، چه می‌خواهم.','۴ دقیقه','تنها','owl-read','--gold-soft','self','gen',false,false],
  ['G08','پیاده‌روی آگاهانه','ده دقیقه راه‌رفتن بدون گوشی.','۱۰ دقیقه','تنها','owl-fit','--brand-soft','self','gen',false,true],
  ['G09','برنامه‌ریزی سبک روز','سه کار مهم، نه بیست کار.','۷ دقیقه','تنها','owl-fit','--sky-soft','self','gen',false,false],
  ['G10','استرس: چه وقت کمک تازه بگیریم','نشانه‌ها و مسیر گرفتن کمک حرفه‌ای.','۶ دقیقه','تنها','owl-think','--coral-soft','self','gen',false,false],

  /* ---------- زوج‌درمانی (۳۵) — فصل ۱: پایه‌های گفت‌وگو ---------- */
  ['C01','نقشهٔ رابطه','گفت‌وگوی ساختاریافته دربارهٔ نیازهای هر دو.','۱۵ دقیقه','دو نفره','owl-hi','--rose-soft','couple','c1',false,true],
  ['C02','گوش‌دادن آینه‌ای','بازگویی حرف طرف مقابل، پیش از پاسخ‌دادن.','۱۰ دقیقه','دو نفره','owl-think','--rose-soft','couple','c1',false,true],
  ['C03','جملهٔ «من» به‌جای «تو»','بیان احساس بدون سرزنش: «من ناراحت شدم چون…».','۸ دقیقه','دو نفره','owl-hi','--rose-soft','couple','c1',false,false],
  ['C04','گفت‌وگو بدون دعوا','قواعد مکث، شنیدن و پاسخ‌ندادن فوری.','۲۰ دقیقه','دو نفره','owl-hi','--rose-soft','couple','c1',true,true],
  ['C05','پرسش‌های عمیق‌تر','کارت‌های پرسش برای شناخت دوبارهٔ هم.','۱۲ دقیقه','دو نفره','owl-think','--rose-soft','couple','c1',false,false],
  ['C06','توقف دعوا با علامت توافقی','یک کلمه یا حرکت، برای وقتی کار بالا می‌گیرد.','۵ دقیقه','دو نفره','owl-hi','--rose-soft','couple','c1',false,false],

  /* فصل ۲: شنیدن و نزدیکی */
  ['C07','هنر شنیدن همسر','شنیدن بدون آماده‌کردن جواب.','۱۰ دقیقه','دو نفره','owl-think','--rose-soft','couple','c2',true,true],
  ['C08','بازسازی صمیمیت عاطفی','یک تمرین کوتاه برای نزدیک‌شدن دوباره.','۱۵ دقیقه','دو نفره','owl-hi','--rose-soft','couple','c2',false,true],
  ['C09','پنج دقیقه بدون صفحه','حضور کامل، بدون گوشی، هر روز.','۵ دقیقه','دو نفره','owl-hi','--rose-soft','couple','c2',false,true],
  ['C10','خاطره‌بازی موتور رابطه','یادآوری تجربه‌های خوب مشترک.','۱۰ دقیقه','دو نفره','owl-cheer','--gold-soft','couple','c2',false,false],
  ['C11','برنامهٔ شب دو نفره','یک شب ثابت در هفته، فقط برای هم.','۲۰ دقیقه','دو نفره','owl-moon','--indigo-soft','couple','c2',false,false],
  ['C12','گفت‌وگوی محترمانه دربارهٔ نزدیکی','زبان مشترک برای یک حرف سخت و لازم.','۲۰ دقیقه','دو نفره','owl-hi','--rose-soft','couple','c2',false,false],

  /* فصل ۳: قدردانی و گرمی */
  ['C13','قدردانی روزانه','یک جملهٔ مشخص، هر شب.','۵ دقیقه','دو نفره','owl-cheer','--gold-soft','couple','c3',false,true],
  ['C14','کارهای مشترک کوچک','ساختن روال‌های دو نفره‌ای که هر روز تکرار می‌شوند.','۱۰ دقیقه','دو نفره','owl-hi','--brand-soft','couple','c3',false,false],
  ['C15','جمله‌سازی هدیه‌ای','سه جملهٔ مشخص که به او می‌گویی چرا مهم است.','۷ دقیقه','دو نفره','owl-cheer','--gold-soft','couple','c3',false,false],
  ['C16','پیام گرم روزانه','یک پیام کوتاه وسط روز — بدون درخواست، فقط حضور.','۳ دقیقه','دو نفره','owl-hi','--rose-soft','couple','c3',false,false],
  ['C17','جشن‌های کوچک دو نفره','بزرگ‌کردن موفقیت‌های کوچک، نه فقط تولدها.','۱۰ دقیقه','دو نفره','owl-cheer','--gold-soft','couple','c3',false,false],

  /* فصل ۴: اختلاف و مرز */
  ['C18','راهکار برد-برد در اختلاف','گام‌های مذاکره‌ای که هیچ‌کس بازنده نباشد.','۲۰ دقیقه','دو نفره','owl-think','--sky-soft','couple','c4',false,true],
  ['C19','تقسیم کار خانه','بازنویسی مسئولیت‌ها، این بار شفاف.','۲۰ دقیقه','دو نفره','owl-read','--sky-soft','couple','c4',false,false],
  ['C20','بودجهٔ خانواده بدون تنش','مرور مشترک پول با قاعده‌های روشن.','۲۰ دقیقه','دو نفره','owl-read','--sky-soft','couple','c4',false,false],
  ['C21','مرزهای رابطه با خانواده‌ها','توافق مشترک دربارهٔ چه کسی، چه وقت، چقدر.','۱۵ دقیقه','دو نفره','owl-hi','--lav-soft','couple','c4',false,true],
  ['C22','تحمل تفاوت','وقتی ارزش‌ها کنار هم می‌ایستند، نه روبه‌روی هم.','۱۲ دقیقه','دو نفره','owl-think','--lav-soft','couple','c4',false,false],
  ['C23','فاصلهٔ سالم در رابطه','زمان تنهایی، بدون حس رهاشدگی.','۱۰ دقیقه','دو نفره','owl-moon','--indigo-soft','couple','c4',false,false],

  /* فصل ۵: ترمیم و اعتماد */
  ['C24','بازسازی اعتماد','تعهدهای کوچک و قابل اندازه‌گیری، روز به روز.','۲۰ دقیقه','دو نفره','owl-think','--sky-soft','couple','c5',false,true],
  ['C25','عذرخواهی مؤثر','سه بخش عذرخواهی کامل — بدون «اما».','۸ دقیقه','دو نفره','owl-hi','--rose-soft','couple','c5',false,true],
  ['C26','بخشیدن مرحله‌ای','بخشیدن بدون فراموش‌کردن و بدون شتاب.','۱۵ دقیقه','دو نفره','owl-lotus','--lav-soft','couple','c5',false,false],
  ['C27','جبران پس از اشتباه','یک برنامهٔ ترمیم کوتاه و مشخص.','۱۵ دقیقه','دو نفره','owl-think','--sky-soft','couple','c5',false,false],
  ['C28','همدلی در تنش','شناختن احساس زیر خشم، قبل از پاسخ.','۱۲ دقیقه','دو نفره','owl-hi','--rose-soft','couple','c5',false,true],
  ['C29','توافق روی نشانه‌های هشدار','چه وقت لازم است سراغ کمک تازه برویم؟','۱۵ دقیقه','دو نفره','owl-think','--coral-soft','couple','c5',false,false],

  /* فصل ۶: رابطه در گذر زمان */
  ['C30','جلسهٔ هفتگی رابطه','بیست دقیقهٔ ثابت در هفته، برای حرف‌های نگفته.','۲۰ دقیقه','دو نفره','owl-moon','--sky-soft','couple','c6',false,true],
  ['C31','تجربهٔ تازهٔ مشترک','یک کار نو در هفته — دشمن عادت‌زدگی.','۳۰ دقیقه','دو نفره','owl-cheer','--gold-soft','couple','c6',false,false],
  ['C32','بازبینی ماهانهٔ رابطه','چه چیزی خوب بود، چه چیزی سخت، چه چیزی را عوض کنیم.','۲۰ دقیقه','دو نفره','owl-moon','--sky-soft','couple','c6',false,true],
  ['C33','هدف مشترک یک‌ماهه','یک هدف، دو نفر، سی روز.','۱۵ دقیقه','دو نفره','owl-fit','--brand-soft','couple','c6',false,false],
  ['C34','نقشهٔ دلبستگی دو نفره','سبک خودت و او، و اینکه کجا به هم می‌رسید.','۱۵ دقیقه','دو نفره','owl-think','--indigo-soft','couple','c6',false,false],
  ['C35','همراهی در روز سخت','چه کارهایی واقعاً کمک می‌کند، وقتی حال او بد است.','۱۰ دقیقه','دو نفره','owl-hi','--rose-soft','couple','c6',false,false],

  /* ---------- طرح‌واره: ۹ تکنیک ---------- */
  ['T01','پرسشگری تجربی (سقراطی)','با چند پرسش کوتاه، شواهد یک باور را بررسی کن.','۱۰ دقیقه','تنها','owl-think','--indigo-soft','schema','sk',false,true],
  ['T02','تصویرسازی ذهنی','صحنهٔ سخت را تصور کن و پایانش را خودت بنویس.','۱۲ دقیقه','تنها','owl-read','--indigo-soft','schema','sk',false,false],
  ['T03','بازوالدینی محدود','با خودِ کوچک‌ترت حرف بزن؛ این بار مانند والدِ مهربان.','۱۵ دقیقه','تنها','owl-hi','--lav-soft','schema','sk',false,true],
  ['T04','گفت‌وگوی دو صندلی','دو حالت ذهنت را روبه‌روی هم بنشان و حرفشان را بشنو.','۱۵ دقیقه','تنها','owl-think','--lav-soft','schema','sk',false,false],
  ['T05','کارت‌های آموزشی طرح‌واره','یک کارت جیبی برای لحظه‌ای که الگو برمی‌گردد.','۵ دقیقه','تنها','owl-read','--gold-soft','schema','sk',false,true],
  ['T06','شکستن الگو با تمرین رفتاری','یک کار کوچک و ترسناک، هر هفته یک پله.','۱۵ دقیقه','تنها','owl-fit','--brand-soft','schema','sk',false,true],
  ['T07','نام‌گذاری و تنظیم هیجان','نام احساس، شدتش، و یک کار کوچک برای کم‌کردنش.','۸ دقیقه','تنها','owl-hi','--coral-soft','schema','sk',false,true],
  ['T08','گفت‌وگوی درونی مهربان','جمله‌ای که به دوستت می‌گویی، به خودت هم بگو.','۷ دقیقه','تنها','owl-cheer','--rose-soft','schema','sk',false,false],
  ['T09','مهارت مرز و ابراز','خواستن، ردکردن و مذاکره‌کردن — با جمله‌های کوتاه.','۱۰ دقیقه','تنها','owl-hi','--sky-soft','schema','sk',false,true],

  /* ---------- طرح‌واره: ۱۸ طرح‌واره ---------- */
  ['S01','رهاشدگی / بی‌ثباتی','ترس از تنها ماندن و چسبیدن به رابطه‌ها.','۸ دقیقه','تنها','owl-moon','--indigo-soft','schema','sc',false,false],
  ['S02','بی‌اعتمادی / بدرفتاری','انتظار آسیب از دیگران، حتی وقتی خبری نیست.','۸ دقیقه','تنها','owl-think','--indigo-soft','schema','sc',false,false],
  ['S03','محرومیت هیجانی','این حس که کسی واقعاً حالم را نمی‌فهمد.','۸ دقیقه','تنها','owl-hi','--coral-soft','schema','sc',false,false],
  ['S04','نقص / شرم','باور به اینکه «من کافی نیستم».','۸ دقیقه','تنها','owl-think','--coral-soft','schema','sc',false,false],
  ['S05','انزوای اجتماعی','حس بیگانه‌بودن، حتی در جمع.','۷ دقیقه','تنها','owl-hi','--lav-soft','schema','sc',false,false],
  ['S06','وابستگی / بی‌کفایتی','ناتوانی در تصمیم‌گرفتن بدون تأیید دیگران.','۸ دقیقه','تنها','owl-think','--lav-soft','schema','sc',false,false],
  ['S07','آسیب‌پذیری','ترس مداوم از اتفاق بد برای خودت یا عزیزانت.','۷ دقیقه','تنها','owl-moon','--indigo-soft','schema','sc',false,false],
  ['S08','خودِ تحول‌نیافته / گرفتار','گره‌خوردن با دیگران تا حد از دست دادن خودت.','۸ دقیقه','تنها','owl-hi','--indigo-soft','schema','sc',false,false],
  ['S09','شکست','باور به اینکه هر کاری را خراب می‌کنی.','۷ دقیقه','تنها','owl-fit','--gold-soft','schema','sc',false,false],
  ['S10','اطاعت','تسلیم‌شدن در برابر خواستهٔ دیگران، برای فرار از تنش.','۸ دقیقه','تنها','owl-read','--gold-soft','schema','sc',false,false],
  ['S11','ایثار','گذاشتن نیاز خودت آخر صف، همیشه.','۸ دقیقه','تنها','owl-hi','--rose-soft','schema','sc',false,false],
  ['S12','تأییدطلبی','تعریف دیگران، سوختِ حال خوبت شده.','۷ دقیقه','تنها','owl-cheer','--gold-soft','schema','sc',false,false],
  ['S13','منفی‌گرایی / بدبینی','چشم‌داشتن به بدترین احتمال، در هر موقعیت.','۷ دقیقه','تنها','owl-think','--sky-soft','schema','sc',false,false],
  ['S14','بازداری هیجانی','نگه‌داشتن احساس‌ها در سینه، چون «نمی‌شود گفت».','۸ دقیقه','تنها','owl-hi','--lav-soft','schema','sc',false,false],
  ['S15','معیارهای سختگیرانه','کمال‌گرایی‌ای که لذت را از موفقیت می‌گیرد.','۸ دقیقه','تنها','owl-fit','--sky-soft','schema','sc',false,false],
  ['S16','استحقاق','باور به اینکه قواعد برای دیگران است.','۷ دقیقه','تنها','owl-cheer','--gold-soft','schema','sc',false,false],
  ['S17','خودکنترلی ناکافی','شروع زیاد، ادامهٔ کم.','۸ دقیقه','تنها','owl-lotus','--brand-soft','schema','sc',false,true],
  ['S18','تنبیه‌گری','سخت‌گیری بی‌رحمانه با خود یا دیگران وقتی خطایی رخ می‌دهد.','۸ دقیقه','تنها','owl-think','--coral-soft','schema','sc',false,false]
];
var EDU_CH=[
  ['gen','عمومی و فردی','۱۰ راهنما — شروع، آرام‌سازی، خواب، مرزها','self','owl-lotus','--brand-soft'],
  ['c1','زوج‌درمانی · فصل ۱ — پایه‌های گفت‌وگو','۶ تمرین · یکی‌یکی','couple','owl-hi','--rose-soft'],
  ['c2','زوج‌درمانی · فصل ۲ — شنیدن و نزدیکی','۶ تمرین · یکی‌یکی','couple','owl-hi','--rose-soft'],
  ['c3','زوج‌درمانی · فصل ۳ — قدردانی و گرمی','۵ تمرین · یکی‌یکی','couple','owl-cheer','--gold-soft'],
  ['c4','زوج‌درمانی · فصل ۴ — اختلاف و مرز','۶ تمرین · یکی‌یکی','couple','owl-think','--sky-soft'],
  ['c5','زوج‌درمانی · فصل ۵ — ترمیم و اعتماد','۶ تمرین · یکی‌یکی','couple','owl-lotus','--lav-soft'],
  ['c6','زوج‌درمانی · فصل ۶ — رابطه در گذر زمان','۶ تمرین · یکی‌یکی','couple','owl-moon','--sky-soft'],
  ['sk','طرح‌واره · ۹ تکنیک','تکنیک‌های پایه برای شناختن و کار کردن با الگوها','schema','owl-think','--indigo-soft'],
  ['sc','طرح‌واره · ۱۸ طرح‌واره','فهرست کامل طرح‌واره‌های ناسازگار اولیه','schema','owl-read','--indigo-soft']
];
function eduPathName(p){ return p==='couple'?'زوج‌درمانی':(p==='schema'?'طرح‌واره':'عمومی و فردی'); }
function eduCount(p){ return EDU.filter(function(e){ return p==='all'||e[7]===p; }).length; }
function eduRow(e){
  var isBreath=(e[0]==='G02');
  return '<div class="edu-row">'+
    '<span class="er-code num">'+e[0]+'</span>'+
    '<div class="er-body"><b>'+e[1]+'</b>'+
      '<p class="tiny">'+e[2]+'</p>'+
      '<div class="er-meta tiny">'+ic('i-clock')+e[3]+' · '+e[4]+
        (e[5]&&e[5].indexOf('جوجه')>=0?'':'')+
        (e[9]?' · <span class="readdot on"><i></i>خوانده‌شده</span>':'')+'</div></div>'+
    '<div class="er-acts">'+
      (isBreath? '<button class="btn primary sm" data-breathopen="edu">'+ic('i-play')+'شروع تنفس</button>'
               : '<button class="btn primary sm" data-eduopen="'+e[1]+'">شروع تمرین</button>')+
      (e[10]?'<button class="btn soft sm" data-addplan="'+e[1]+'">افزودن به برنامه</button>':'')+
    '</div></div>';
}
function eduChapter(ch,path){
  var items=EDU.filter(function(e){ return e[8]===ch[0]; });
  var open=(APP.eduChap==='all'||APP.eduChap===ch[0]);
  return '<section class="chap-card'+(open?' open':'')+'">'+
    '<div class="chap-head">'+
      '<div class="chap-art" style="background:var('+ch[5]+')">'+owl(ch[4],40)+'</div>'+
      '<div class="chap-t"><b>'+ch[1]+'</b><span class="tiny">'+ch[2]+(path==='all'?' · '+eduPathName(ch[3]):'')+'</span></div>'+
      '<span class="chip">'+fa(items.length)+' راهنما</span>'+
      '<button class="btn '+(open?'ghost':'soft')+' sm" data-educhap="'+ch[0]+'">'+(open?'بستن فهرست':'دیدن فهرست')+'</button>'+
    '</div>'+
    (open? '<div class="edu-list">'+items.map(eduRow).join('')+'</div>' : '')+
  '</section>';
}
function R_edu(){
  var tab=APP.eduTab||'map';
  var path=APP.eduPath||'all';
  var chips=[['all','همه'],['self','فردی'],['couple','زوج‌درمانی'],['schema','طرح‌واره']];

  return head('آموزش','آموزش','۷۲ راهنما، یک‌به‌یک: ۱۰ عمومی و فردی + ۳۵ تمرین زوج‌درمانی + ۹ تکنیک و ۱۸ طرح‌واره. تصویری، بی‌تور اجباری.',
      '<span class="chip s">۷۲ راهنما</span>')+

    '<div class="tabs">'+
      [['map','جوما چطور کار می‌کند'],['cando','چه می‌توانی، چه نمی‌توانی'],['cat','کاتالوگ ۷۲ راهنما'],['paths','دو مسیر تخصصی']]
      .map(function(t2){return '<button class="'+(tab===t2[0]?'on':'')+'" data-edutab="'+t2[0]+'">'+t2[1]+'</button>';}).join('')+
    '</div>'+

    (tab==='map'?
      '<div class="card">'+
        '<div class="edu-head">'+owl('owl-hi',58,'floaty')+
          '<div><h3 style="font-size:16px">جوما چطور کار می‌کند</h3>'+
          '<p class="tiny">پنج گام، از انتخاب تا فهمیدن. هر گام قابل کلیک است و به صفحهٔ واقعی خودش می‌رود.</p></div></div>'+
        '<div class="howline">'+HOWSTEPS.map(function(s,i){
          return '<div class="hstep'+(i===0?' on':'')+'" data-gostep="'+s[3]+'">'+
            '<span class="hn">'+ic(s[0],'',22)+'</span>'+
            '<b>'+s[1]+'</b><small>'+s[2]+'</small></div>';
        }).join('')+'</div>'+
        '<div class="breath">'+owl('owl-lotus',30)+'<span>تمرین تنفس ۴-۷-۸ — دایره با دم باز می‌شود، با بازدم جمع. '+
          'صدای راهنما اختیاری و پیش‌فرض خاموش است. این تمرین هیچ پاداشی نمی‌سازد؛ فقط آرام می‌کند.</span>'+
          '<button class="btn primary sm" data-breathopen="edu">شروع تنفس</button></div>'+
      '</div>'
    : tab==='cando'?
      '<div class="card"><h3>چه می‌توانی، چه نمی‌توانی</h3>'+
      '<p class="tiny">این‌ها قواعد واقعی محصول‌اند — پیش از شروع بدان که چه محدودیتی هست. '+
      'قاعده‌ها برای این‌اند که گزارش‌هایت معنی‌دار بمانند، نه برای سخت‌کردن کار.</p>'+
      '<div class="cando" style="margin-top:14px"><div class="cd-col yes"><h3>✅ می‌توانی</h3><ul>'+
        ['امروز و <b>دیروز</b> را ثبت کنی — دیروز با برچسب «تأخیر»',
         'حال امروزت را ثبت کنی و <b>هر وقت خواستی عوضش کنی</b>',
         'آب را در طول روز اضافه کنی؛ آخر روز خودکار قطعی می‌شود',
         'فعالیت‌هایت را در دورهٔ <b>در حال ساخت</b> کم و زیاد کنی',
         'هر وقت خواستی «بعداً» را بزنی و حال ثبت نکنی',
         'تمرین تنفس را همین‌جا، بی‌ثبت‌کردن، انجام بدهی',
         'بعد از چند روز غیبت برگردی؛ چیزی از دست نمی‌رود']
        .map(function(x){return '<li>'+x+'</li>';}).join('')+
      '</ul></div><div class="cd-col no"><h3>🚫 نمی‌توانی</h3><ul>'+
        [['برای <b>فردا</b> یا روزهای قبل‌تر از دیروز چیزی ثبت کنی',''],
         ['حالِ روزهای گذشته را ثبت یا عوض کنی',''],
         ['برنامه‌ای که <b>در حال اجراست</b> را ویرایش کنی','چون هدف‌ها همان اول قفل شدند تا گزارش‌هایت معنی‌دار بمانند.'],
         ['ثبتی را که <b>قطعی</b> شده عوض کنی',''],
         ['جوجه را از دست بدهی — <b>هیچ‌وقت نمی‌میرد</b>','']]
        .map(function(x){return '<li>'+x[0]+(x[1]?'<span class="why">'+x[1]+'</span>':'')+'</li>';}).join('')+
      '</ul></div></div></div>'
    : tab==='paths'?
      '<div class="path-hero couple"><span class="pathpill couple">زوج‌درمانی · ۳۵ تمرین</span>'+
        '<h3>تمرین‌هایی برای دو نفر</h3>'+
        '<p class="tiny">شش فصل: پایه‌های گفت‌وگو · شنیدن و نزدیکی · قدردانی و گرمی · اختلاف و مرز · ترمیم و اعتماد · رابطه در گذر زمان. '+
        'هر تمرین یک جلسهٔ کوتاه است و می‌گوید چند دقیقه وقت می‌برد و دو نفره است یا تنها.</p>'+
        '<button class="btn primary sm" data-edupath="couple" data-educhap="all">'+ic('i-list')+'دیدن فهرست ۳۵ تمرین</button></div>'+
      '<div class="path-hero schema"><span class="pathpill schema">طرح‌واره · ۹ تکنیک و ۱۸ طرح‌واره</span>'+
        '<h3>شناختن الگوهای تکرارشونده</h3>'+
        '<p class="tiny">برای وقتی که یک الگو چند بار برگشته. این راهنماها <b>جای درمان نیستند</b> و کنار هر کدام همین نوشته شده است.</p>'+
        '<div class="paths-acts"><button class="btn primary sm" data-edupath="schema" data-educhap="sk">دیدن ۹ تکنیک</button>'+
        '<button class="btn soft sm" data-edupath="schema" data-educhap="sc">دیدن ۱۸ طرح‌واره</button></div></div>'+
      '<div class="tiny" style="margin:8px 2px">۹ تکنیک و ۱۸ طرح‌وارهٔ سند مادر، زیرمجموعهٔ مسیر طرح‌واره‌اند؛ '+
        '۳۵ و ۲۷ شمارِ <b>راهنمای تمرین</b> است (۲۷ = ۹ تکنیک + ۱۸ طرح‌واره).</div>'
    :
      /* کاتالوگ کامل */
      '<div class="filterchips">'+chips.map(function(p2){
          return '<button class="'+(path===p2[0]?'btn primary sm':'btn ghost sm')+'" data-edupath="'+p2[0]+'">'+
            p2[1]+' <span class="chnum">'+fa(eduCount(p2[0]))+'</span></button>';
        }).join('')+
        (path!=='all'? '<button class="btn soft sm" data-educhap="all">'+ic('i-list')+'باز کردن همهٔ فصل‌ها</button>':'')+
      '</div>'+
      '<div class="tiny libcount">'+fa(eduCount(path))+' راهنما'+(path==='all'?' از ۷۲':'')+
        ' · '+(path==='all'?'همهٔ مسیرها':eduPathName(path))+
        ' <span class="pathcounts">فردی ۱۰ · زوج‌درمانی ۳۵ · طرح‌واره ۲۷</span></div>'+
      '<div class="chap-wrap">'+
        EDU_CH.filter(function(ch){ return path==='all'||ch[3]===path; }).map(function(ch){
          return eduChapter(ch,path); }).join('')+
      '</div>'+
      (path==='all'&&!APP.eduChap?
        '<div class="banner info" style="margin-top:10px">'+ic('i-info')+
        'برای دیدن <b>فهرست یک‌به‌یک</b>، یک مسیر را انتخاب کن یا روی «دیدن فهرست» هر فصل بزن. '+
        'در محصول واقعی هر ۷۲ راهنما بارگذاری تدریجی دارد، ولی شمار کل همیشه نوشته می‌شود.</div>':'')
    )+
    note('سه قانون این صفحه: هر راهنما **تصویر** دارد نه آیکون · هر محدودیت **دلیل** دارد · '+
      'و هیچ «۵ راهنمای داغ 🔥» یا امتیاز و ستاره‌ای وجود ندارد — کاتالوگ باید آرام و لذت‌بخش باشد، نه بازی. '+
      'فهرست کامل **۷۲ راهنما** (۱۰ + ۳۵ + ۹ + ۱۸) اینجاست و یک‌به‌یک نوشته شده؛ '+
      '«طرح‌واره» خودش دو بخش است: ۹ تکنیک و ۱۸ طرح‌واره — همان‌طور که در برنامهٔ اصلی بود.');
}
