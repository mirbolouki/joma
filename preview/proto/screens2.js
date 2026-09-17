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
   msg:'دونه، آب، خونهٔ تمیز و حمام؛ من با همین‌ها شادم!'},
  {stage:'chick',title:'جوجهٔ من 🐣', sub:'هر روز از من مراقبت کن',
   msg:'چه مراقبتی! حسابی خوشحالم 🎉'}
];
var METERS=[
  {k:'seed', e:'🌾', n:'ظرف دونه',  s:'با ثبت کارهای روزانه پر می‌شود'},
  {k:'water',e:'💧', n:'ظرف آب',    s:'با لیوان‌های آبِ تو'},
  {k:'home', e:'🏠', n:'خونهٔ تمیز',s:'با ثبت حال ۵ قدمی'},
  {k:'bath', e:'🛁', n:'وقت حمام',  s:'با ذخیرهٔ ثبت‌ها و تمرین نفس'}
];

function R_chick(){
  var st=APP.petStage||'chick';
  var g=GROWTH[st==='egg'?0:(st==='crack'?1:(APP.petGrowthFull?3:2))];
  var name=APP.petName||'جوجهٔ من';
  var levels=empty()?{seed:0,water:0,home:0,bath:0}:{seed:3,water:2,home:2,bath:1};
  var total=levels.seed+levels.water+levels.home+levels.bath;
  var pct=Math.round(total/12*100);

  return head('جوجهٔ من', name+(st==='egg'?' — تخم':''), g.sub,
      '<span class="chip '+(st==='chick'?'g':'go')+'">'+(st==='egg'?'تخم':(st==='crack'?'در حال ترک':'جوجه'))+'</span>')+

    '<div class="pet-stage'+(APP.petSleep?' sleep':'')+'" data-petchick>'+
      '<span class="halo"></span>'+
      '<span class="pet-hold">'+chickSVG(150, st==='chick'?'chick':st, st==='chick'?(APP.petSleep?'sleep':'happy'):'ok')+'</span>'+
    '</div>'+
    '<div class="pet-ctrls">'+
      '<button class="btn soft sm" data-petpet>'+ic('i-heart')+'نوازش</button>'+
      '<button class="btn ghost sm" data-petsleep>'+(APP.petSleep?'بیدارش کن ☀️':'بخوابانش 🌙')+'</button>'+
      '<button class="btn ghost sm" data-petsnd>'+(APP.sound?'🔊 صدای جوجه روشن':'🔇 صدای جوجه خاموش')+'</button>'+
    '</div>'+
    note('جوجهٔ **جغد** است (`owl-chick` — انتخاب مالک)، هم‌خانوادهٔ جغدِ محصول: آبی، شکم کرم، حلقهٔ طلایی دور چشم. '+
      'لمس **بی‌پاداش** است؛ پرش و جیک فقط واکنش‌اند و داده‌ای را عوض نمی‌کنند.')+
    note('همهٔ حرکت‌های این صحنه **بی‌پاداش**‌اند (`CAR-01`): لمس، فقط واکنش است. '+
      'پاداش فقط از **ثبت معتبر** می‌آید — و آبِ **پیش‌نویس** هیچ پاداشی نمی‌سازد (`WTR-10`).')+

    '<div class="grid2">'+
      '<div class="card"><h3>'+ic('i-heart')+'مراقبت امروز</h3>'+
        METERS.map(function(m){
          var lv=levels[m.k];
          return '<div class="pmeter"><span class="pe">'+m.e+'</span>'+
            '<span class="pl"><b>'+m.n+'</b><small>'+m.s+'</small></span>'+
            '<span class="psegs">'+[0,1,2].map(function(i){
              return '<i class="'+(i<lv?'on':'')+'"></i>';}).join('')+'</span></div>';
        }).join('')+
        (APP.water>0&&APP.water<APP.waterGoal?
          '<p class="tiny" style="margin-top:10px">آبت **پیش‌نویس** است؛ وقتی قطعی شد، اینجا حساب می‌شود.</p>':'')+
      '</div>'+

      '<div style="display:flex;flex-direction:column;gap:14px">'+
        '<div class="card"><h3>'+ic('i-trend')+'رشد</h3>'+
          '<div style="display:flex;align-items:baseline;gap:6px;margin-top:8px">'+
            '<span class="bignum" style="font-size:30px;color:var(--brand-ink)">'+fa(pct)+'٪</span>'+
            '<span class="tiny">از مراقبت کامل</span></div>'+
          '<div style="height:9px;border-radius:99px;background:var(--ring-track);margin-top:10px;overflow:hidden">'+
            '<i style="display:block;height:100%;width:'+pct+'%;border-radius:99px;background:linear-gradient(90deg,var(--grad1),var(--grad2))"></i></div>'+
          '<p class="tiny" style="margin-top:8px">'+g.msg+'</p>'+
          (APP.petGrowthFull?'<p class="tiny" style="margin-top:4px">به مرحلهٔ بعد نزدیک است — همین‌طور ادامه بده 🤍</p>':'')+
        '</div>'+

        (st==='chick'&&!APP.petName?
          '<div class="card" style="border-color:var(--gold)"><h3>'+ic('i-heart')+'اسمش را چه بگذاریم؟</h3>'+
            '<p class="tiny" style="margin-top:6px">حالا که به دنیا آمده. یک بار می‌شود اسم گذاشت — بعداً هم یک بار دیگر می‌شود عوضش کرد.</p>'+
            '<input class="inp" id="petname" placeholder="۲ تا ۱۶ حرف" style="margin-top:10px">'+
            '<div style="display:flex;gap:8px;margin-top:10px">'+
            '<button class="btn primary sm" data-petname>بله، همین باشد</button>'+
            '<button class="btn ghost sm" data-petlater>بعداً</button></div>'+
          '</div>'
          :'<div class="card"><h3>'+ic('i-checkc')+'وضعیت</h3>'+
            '<p class="tiny" style="margin-top:6px">'+(st==='chick'
              ? 'اسمش «'+name+'» است. اگر چند روز نیایی، دلش تنگ می‌شود — ولی **هیچ‌وقت نمی‌میرد** و کم‌رنگ می‌شود، نه بیشتر.'
              : 'با هر ثبت معتبر، تخم به تولد نزدیک‌تر می‌شود.')+'</p>'+
            '<div class="hist" style="margin-top:10px"><span>شروع: ۳ شهریور</span>'+
            (st==='chick'?'<span>تولد: ۱۹ شهریور</span>':'')+'<span>مراقبت امروز: '+fa(total)+' از ۱۲</span></div>'+
          '</div>')+

        '<div class="card tip"><h3>'+ic('i-info')+'یک چیز را بدان</h3>'+
          '<p class="tiny" style="margin-top:6px">جوجه، **ارزش اصلی محصول نیست**. کارها و گزارش‌های تو مهم‌اند؛ '+
          'جوجه فقط یادآوری می‌کند که برگردی — بدون فشار و بدون سرزنش.</p></div>'+
      '</div>'+
    '</div>'+
    note('سه چیز اینجا **نیست** و هرگز نمی‌آید: مرگ/بیماری/فرار جوجه · شمارش معکوس غیبت · مقایسه با جوجهٔ دیگران. '+
      'و هیچ قابلیت اصلی، پشت رشد جوجه قفل نمی‌شود (`CAR-04`).');
}

/* ============================ ۸) دفترچهٔ جوما — سند ۱۵ ============================ */
var INSIGHTS=[
  {type:'personal', e:'owl-hi',  tag:'از ثبت‌های تو', date:'۱۴ شهریور ۱۴۰۵',
   text:'در ثبت‌های این بازه، روزهایی که خواب بهتری گزارش کرده‌ای، پیاده‌روی بیشتری هم ثبت شده است. '+
        'این همراهی به‌تنهایی علت را نشان نمی‌دهد.',
   meta:'۲۱ جفت داده · بازهٔ ۱ تا ۳۱ مرداد', ev:true},
  {type:'feedback', e:'owl-cheer', tag:'ثبت امروزت', date:'۱۳ شهریور ۱۴۰۵',
   text:'امروز ۴ کار ثبت کردی و آبت کامل شد. هفتهٔ پیش در همین روز ۲ کار ثبت کرده بودی.',
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
function R_reports(){
  var tab=APP.reportTab||'summary';
  var noData=empty()||APP.reportNoData;
  var t=RTABS.filter(function(x){return x[0]===tab;})[0]||RTABS[0];

  var body;
  if(noData){
    body='<div class="card"><div class="nodata">'+owl('owl-moon',64,'floaty')+
      '<b>برای این انتخاب داده‌ای نیست</b>'+
      '<p class="tiny">نمودار خالی رسم نمی‌شود. بازه یا فعالیت را عوض کن، یا چند روز ثبت کن تا این تب پر شود.</p>'+
      '<div class="banner warn" style="margin-top:12px;text-align:start">'+ic('i-info')+
      'وضعیت موتور: <b>NO_DATA</b> — هیچ رخداد واجد شرایطی در این بازه نیست.</div>'+
      '</div></div>';
  } else if(tab==='summary'){
    body='<div class="stat4">'+
      [['موفقیت کلی','۷۴٪','با وزنِ خودت','--brand-ink'],
       ['پوشش داده','۸۸٪','۱۸ روز از ۲۰ روز','--sky-ink'],
       ['روزهای کامل','۱۲','همهٔ کارها ثبت شده','--gold-ink'],
       ['میانگین حال','۴٫۱ از ۵','سه شاخص ثبت‌شده','--rose-ink']]
      .map(function(s){return '<div class="card"><div class="lb">'+s[0]+'</div>'+
        '<div class="vl" style="color:var('+s[3]+')">'+s[1]+'</div><div class="sb">'+s[2]+'</div></div>';}).join('')+
    '</div>'+
    '<div class="grid2"><div class="card"><h3>'+ic('i-chart')+'هفته‌به‌هفته</h3>'+
      '<div class="bars">'+[52,64,71,68,79,84,88].map(function(h,i){
        return '<div class="b" style="height:'+h+'%"><span>ه'+fa(i+1)+'</span></div>';}).join('')+'</div>'+
      '<div class="legend"><span><i style="background:var(--brand)"></i>موفقیت کلی هر هفته</span></div></div>'+
    '<div class="card"><h3>'+ic('i-info')+'این عددها یعنی چه؟</h3>'+
      '<div class="kv"><span>مقداری که ثبت کرده‌ای</span><b>۷٫۵ ساعت</b></div>'+
      '<div class="kv"><span>هدف</span><b>هدف: ۸ ساعت</b></div>'+
      '<div class="kv"><span>هدف را چقدر برآورده کردی</span><b>۹۴٪</b></div>'+
      '<div class="kv"><span>چقدر داده داری</span><b>۸۸٪ پوشش</b></div>'+
      '<div class="kv"><span>موفقیت کلی</span><b>۷۴٪</b></div>'+
      '<div class="kv"><span>ثبت‌نشده</span><b>«ثبت نشده»</b></div>'+
    '</div></div>';
  } else if(tab==='mood'){
    body='<div class="grid2">'+
      [['خواب','--indigo',[3,4,5,4,4,5,4]],
       ['انرژی','--gold',[2,3,3,4,4,3,5]],
       ['تمرکز','--sky',[3,3,4,4,3,5,4]],
       ['استرس','--coral',[4,3,2,3,2,2,1]]]
      .map(function(m){
        return '<div class="card"><h3>'+m[0]+'</h3>'+
          '<div class="bars"><div class="b" style="height:'+60+'%"></div></div>'+
          '<div class="bars">'+m[2].map(function(v){
            return '<div class="b" style="height:'+(v*18)+'%" title="'+v+' از ۵"></div>';}).join('')+'</div>'+
          '<div class="tiny" style="margin-top:6px">میانگین: '+(m[2].reduce(function(a,b){return a+b;})/7).toFixed(1)+' از ۵</div></div>';
      }).join('')+'</div>'+
      note('«خواب دیشبت» **کیفیت** را می‌پرسد نه ساعت — و همین در زیرنویس فرم حال هم گفته می‌شود.');
  } else if(tab==='success'||tab==='acts'||tab==='weight'){
    var rows=empty()?[]:[
      ['پیاده‌روی','۸۸٪','۲۲ از ۲۵','وزن: زیاد'],
      ['خواب کافی','۹۲٪','۱۸ از ۲۰','وزن: زیاد'],
      ['نوشیدن آب','۷۶٪','۱۵ از ۲۰','وزن: متوسط'],
      ['مدیتیشن','۵۴٪','۱۱ از ۲۰','وزن: متوسط'],
      ['مطالعه','۳۱٪','۶ از ۲۰','وزن: کم']
    ];
    body='<div class="card">'+
      '<div class="banner info" style="margin-bottom:12px">'+ic('i-info')+
        'هدف‌های این جدول **اسنپ‌شات برنامه** هستند؛ اگر فعالیت کتابخانه بعداً عوض شود، این‌ها تغییر نمی‌کنند.</div>'+
      '<table class="tbl"><thead><tr><th>فعالیت</th><th>هدف را چقدر برآورده کردی</th>'+
      '<th>چقدر داده داری</th><th>وزن</th></tr></thead><tbody>'+
      rows.map(function(r){
        return '<tr><td><b style="font-size:12px">'+r[0]+'</b></td>'+
          '<td>'+(tab==='weight'?'<span class="tiny">—</span>':r[1])+'</td>'+
          '<td><span class="tiny">'+r[2]+' روز</span></td>'+
          '<td><span class="acl-chip">'+r[3]+'</span></td></tr>';
      }).join('')+'</tbody></table></div>';
  } else if(tab==='cal'){
    body='<div class="card"><h3>'+ic('i-cal')+'تقویم این دوره</h3>'+
      '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-top:12px">'+
      Array.from({length:30},function(_,i){
        var l=(i*5)%4;
        var c=empty()?'var(--ring-track)':['var(--ring-track)','var(--brand-soft)','var(--brand)','var(--brand-ink)'][l];
        return '<div style="aspect-ratio:1;border-radius:9px;background:'+c+';display:grid;place-items:center;'+
          'font-size:10px;color:'+(l>1?'#fff':'var(--ink-3)')+'">'+fa(i+1)+'</div>';
      }).join('')+'</div>'+
      '<div class="legend"><span><i style="background:var(--ring-track)"></i>ثبت‌نشده</span>'+
      '<span><i style="background:var(--brand-soft)"></i>کم</span>'+
      '<span><i style="background:var(--brand)"></i>خوب</span>'+
      '<span><i style="background:var(--brand-ink)"></i>کامل</span></div></div>';
  } else if(tab==='detail'){
    body='<div class="card">'+
      '<div class="banner warn" style="margin-bottom:12px">'+ic('i-info')+
      'وضعیت موتور: <b>AMBIGUOUS_DUPLICATE</b> — ۲ رخداد مبهم پیدا شد و علامت خورده‌اند. '+
      'این هشدار بسته نمی‌شود؛ تا رفع نشود، عدد نهایی قطعی نیست.</div>'+
      '<table class="tbl"><thead><tr><th>تاریخ</th><th>فعالیت</th><th>مقدار</th><th>منبع</th><th>وضعیت</th></tr></thead><tbody>'+
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
      }).join('')+'</tbody></table></div>';
  } else if(tab==='compare'){
    body='<div class="card"><h3>'+ic('i-chart')+'این دوره در برابر مرداد</h3>'+
      '<div class="bars">'+[62,74].map(function(h,i){
        return '<div class="b" style="height:'+h+'%"><span>'+(i?'شهریور':'مرداد')+'</span></div>';}).join('')+'</div>'+
      '<div class="kv" style="margin-top:24px"><span>پیشرفت این ماه</span><b>۸۲٪ — ۱۴ واحد رشد</b></div>'+
      '<div class="kv"><span>روزهای همراهی</span><b>۲۰ روز — ۶۵٪ روزها</b></div>'+
      '<div class="banner info" style="margin-top:12px">'+ic('i-info')+
      '«پیشرفت» و «موفقیت» و «تحقق» سه چیز متفاوت‌اند و هر کدام عنوان خودشان را دارند ('+'۵٫۲'+').</div></div>';
  } else {
    body='<div class="card"><h3>'+ic('i-book')+'گزارش تحلیلی</h3>'+
      '<p class="tiny" style="margin-top:6px">ترکیب دلخواه بساز: فعالیت‌ها، خلق، و همبستگی.</p>'+
      '<div class="rfilters" style="margin-top:12px">'+
      '<span class="acl-chip">فعالیت: پیاده‌روی</span><span class="acl-chip">فعالیت: خواب</span>'+
      '<span class="acl-chip">خلق: انرژی</span><span class="acl-chip">+ افزودن</span></div>'+
      '<div class="banner info" style="margin-top:12px">'+ic('i-info')+
      'همبستگی، **علت را نشان نمی‌دهد**. هر جملهٔ همبستگی در گزارش، همین را می‌گوید.</div></div>';
  }

  return head('گزارش‌ها','گزارش‌های من','هر عددی که می‌بینی، از بک‌اند می‌آید — فرانت هیچ میانگینی نمی‌سازد.',
      '<button class="btn ghost sm" data-vocab>واژه‌نامهٔ عددها</button>')+
    '<div class="rtabs" role="tablist">'+RTABS.map(function(x){
      return '<button role="tab" aria-selected="'+(x[0]===tab)+'" data-rtab="'+x[0]+'">'+x[1]+'</button>';}).join('')+'</div>'+
    '<p class="tabnote">این تب چه چیزی نشان می‌دهد؟ '+t[2]+'</p>'+
    '<div class="rfilters">'+
      '<select class="fpick"><option>دوره: شهریور ۱۴۰۵</option><option>دوره: مرداد ۱۴۰۵</option></select>'+
      '<select class="fpick"><option>بازه: کل دوره</option><option>بازه: ۷ روز آخر</option></select>'+
      '<select class="fpick"><option>فعالیت: همه</option><option>فعالیت: پیاده‌روی</option></select>'+
      '<select class="fpick"><option>شاخص: همه</option><option>شاخص: موفقیت</option></select>'+
      '<select class="fpick"><option>مقایسه با: مرداد</option><option>بدون مقایسه</option></select>'+
      '<span class="sp" style="flex:1"></span>'+
      '<button class="btn ghost sm" data-nodatatoggle>'+(noData?'داده را نشان بده':'حالت بدون داده')+'</button>'+
    '</div>'+
    (noData?'':'<div class="banner warn" style="margin-top:4px">'+ic('i-info')+
      'یک هشدار موتور باز است (رخداد تکراری مشکوک). این نوار تا رفع نشود بسته نمی‌شود.</div>')+
    body+
    note('ده تب — **هیچ‌کدام حذف نمی‌شوند**، حتی اگر خالی باشند. تب خالی، `.nodata` می‌گیرد نه «صفر». '+
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

    '<div class="tabs">'+[['acts','فعالیت‌ها'],['settings','تنظیمات'],['summary','خلاصه']].map(function(t){
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
var LIB=[
  ['مدیتیشن ۱۵ دقیقه‌ای','یک تمرکز کوتاه روی نفس، برای آرام‌کردن ذهن شلوغ.','روزانه','۱۵ دقیقه','owl-lotus','--lav-soft','self'],
  ['پیاده‌روی روزانه','بیست دقیقه قدم‌زدن، هر جایی که هستی.','روزانه','۲۰ دقیقه','owl-fit','--brand-soft','self'],
  ['خواب کافی','هدف خواب شبانه — کیفیت مهم‌تر از تعداد ساعت است.','روزانه','۸ ساعت','owl-moon','--indigo-soft','self'],
  ['نوشیدن آب','لیوان‌های روزانه، بدون فشار و بدون شمارش معکوس.','روزانه','۸ لیوان','owl-water','--sky-soft','self'],
  ['مطالعهٔ آرام','ده صفحه در روز؛ کم، ولی هر روز.','روزانه','۱۰ صفحه','owl-read','--gold-soft','self'],
  ['گفت‌وگوی روزانه','پنج دقیقه گفت‌وگوی بدون گوشی با کسی که دوستش داری.','روزانه','۵ دقیقه','owl-hi','--rose-soft','couple'],
  ['قدردانی مشترک','هر شب، یک چیز کوچک که از همسرت ممنون هستی.','روزانه','۱ مورد','owl-cheer','--rose-soft','couple'],
  ['مرور هفتگی طرح‌واره','نگاهی کوتاه به الگوهای هفتهٔ گذشته.','هفتگی','۱ جلسه','owl-think','--indigo-soft','schema']
];
function R_library(){
  var q=(APP.libQuery||'').trim();
  var path=APP.libPath||'all';
  var list=LIB.filter(function(a){
    var okp=(path==='all'||a[6]===path);
    var okq=!q||a[0].indexOf(q)>=0||a[1].indexOf(q)>=0;
    return okp&&okq;
  });
  if(empty()) list=[];

  return head('کتابخانه','کتابخانهٔ فعالیت‌ها','۱۰۷ فعالیت آماده — انتخاب کن، هدف بگذار، به برنامه اضافه کن.',
      '<span class="chip g">۱۰۷ فعالیت</span>')+

    '<div class="searchbar">'+ic('i-list','',18)+
      '<input id="libq" placeholder="جست‌وجو در نام و توضیح…" value="'+esc(q)+'" data-libq>'+
      (q?'<button class="btn ghost sm" data-libclear>پاک کن</button>':'')+'</div>'+

    '<div class="filterchips">'+[['all','همه'],['self','فردی'],['couple','زوجی'],['schema','طرح‌واره']]
      .map(function(p){
        return '<button class="'+(path===p[0]?'btn primary sm':'btn ghost sm')+'" data-libpath="'+p[0]+'">'+p[1]+'</button>';
      }).join('')+'</div>'+

    (q||path!=='all'?'<div class="banner info">'+ic('i-info')+
      'فیلتر فعال: '+(path==='all'?'همهٔ مسیرها':(path==='self'?'فردی':(path==='couple'?'زوجی':'طرح‌واره')))+
      (q?' · جست‌وجو: «'+esc(q)+'»':'')+' · '+fa(list.length)+' نتیجه '+
      '<button class="btn ghost sm" style="margin-inline-start:8px" data-libreset>پاک‌کردن فیلترها</button></div>':'')+

    (list.length?
      '<div class="libgrid">'+list.map(function(a){
        return '<article class="act-card fadeup">'+
          '<div class="acl-art" style="background:var('+a[5]+')">'+owl(a[4],64)+'</div>'+
          '<div class="acl-body"><h3>'+a[0]+'</h3>'+
            '<p class="acl-desc">'+a[1]+'</p>'+
            '<div class="acl-meta"><span class="acl-chip">'+a[2]+'</span>'+
              '<span class="acl-chip num">هدف: '+a[3]+'</span>'+
              '<span class="pathpill '+a[6]+'">'+(a[6]==='couple'?'زوجی':(a[6]==='schema'?'طرح‌واره':'فردی'))+'</span></div>'+
            '<div class="acl-actions">'+
              '<button class="btn primary sm" data-addplan="'+a[0]+'">افزودن به برنامه</button>'+
              '<button class="btn ghost sm" data-actdetail="'+a[0]+'">جزئیات</button>'+
            '</div></div></article>';
      }).join('')+'</div>'
      : '<div class="nodata">'+owl('owl-think',62,'floaty')+
        '<b>چیزی پیدا نشد</b>'+
        '<p class="tiny">جست‌وجو را ساده‌تر کن یا فیلترها را بردار. '+
        'اگر فعالیتی که می‌خواهی نیست، از پشتیبانی بخواه تا اضافه شود.</p>'+
        '<button class="btn soft sm" style="margin-top:10px" data-libreset>پاک‌کردن فیلترها</button></div>')+

    note('کارت فقط همین‌ها را دارد: تصویر · نام · توضیح (حداکثر ۱۰۰ نویسه) · تناوب به **واژه** · هدف با برچسب صریح «هدف:». '+
      'شناسهٔ `ACT` نمایش داده نمی‌شود. و اگر فقط یک دورهٔ `RUNNING` باشد، «افزودن» می‌گوید چرا رد می‌شود.');
}

/* ============================ ۱۲) آموزش — سند ۱۹ ============================ */
var HOWSTEPS=[
  ['i-target','انتخاب فعالیت','از ۱۰۷ فعالیت','library'],
  ['i-gear','ساخت برنامه','هدف و تناوب','plan'],
  ['i-checkc','ثبت روزانه','کار + حال + آب','today'],
  ['i-chart','دیدن گزارش','ده تب تحلیلی','reports'],
  ['i-book','شناختن الگو','بینش‌های شخصی','book']
];
var EDU=[
  ['جوما چطور کار می‌کند','پنج گام از انتخاب فعالیت تا دیدن الگو.','owl-think','--brand-soft',true],
  ['برنامه‌ات را چطور بسازی','از کتابخانه انتخاب کن، هدف بگذار، و وقتی آماده بودی شروع کن.','owl-hi','--sky-soft',true],
  ['یک فعالیت را چطور ثبت کنی','تفاوت پیش‌نویس و ثبت قطعی، و اینکه چرا روزی یک بار قفل می‌شود.','owl-cheer','--gold-soft',false],
  ['حالِ من چطور کار می‌کند','پنج قدم کوتاه و اینکه چرا خواب، کیفیت را می‌پرسد نه ساعت را.','owl-moon','--indigo-soft',false],
  ['گزارش‌ها را چطور بخوانی','تفاوت «مقدار»، «هدف»، «تحقق» و «پوشش» — و اینکه صفر با «ثبت‌نشده» یکی نیست.','owl-read','--lav-soft',false],
  ['جوجهٔ من','چطور بزرگ می‌شود، چه چیزی آن را پر می‌کند، و چرا هیچ‌وقت نمی‌میرد.','owl-water','--rose-soft',false]
];
function R_edu(){
  var tab=APP.eduTab||'map';
  return head('آموزش','آموزش','کوتاه، تصویری، و بی‌تور اجباری. هر چیزی که لازم داری همین‌جاست.',
      '<span class="chip s">۶ راهنما · ۲ مسیر تخصصی</span>')+

    '<div class="tabs">'+
      [['map','جوما چطور کار می‌کند'],['cando','چه می‌توانی، چه نمی‌توانی'],['cat','کاتالوگ راهنماها'],['paths','دو مسیر تخصصی']]
      .map(function(t){return '<button class="'+(tab===t[0]?'on':'')+'" data-edutab="'+t[0]+'">'+t[1]+'</button>';}).join('')+
    '</div>'+

    (tab==='map'?
      '<div class="card">'+
        '<div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">'+
          owl('owl-hi',64,'floaty')+
          '<div><h3 style="font-size:16px">جوما چطور کار می‌کند</h3>'+
          '<p class="tiny">پنج گام، از انتخاب تا فهمیدن. هر گام قابل کلیک است و به صفحهٔ واقعی خودش می‌رود.</p></div></div>'+
        '<div class="howline">'+HOWSTEPS.map(function(s,i){
          return '<div class="hstep'+(i===0?' on':'')+'" data-gostep="'+s[3]+'">'+
            '<span class="hn">'+ic(s[0])+'</span>'+
            '<b>'+s[1]+'</b><small>'+s[2]+'</small></div>';
        }).join('')+'</div>'+
        '<div class="breath">'+owl('owl-lotus',34)+'<span>تمرین نفس: ۴ ثانیه دم، ۶ ثانیه بازدم — سه بار. '+
          'این تمرین هیچ پاداشی نمی‌سازد؛ فقط آرام می‌کند.</span></div>'+
      '</div>'
    : tab==='cando'?
      '<div class="card"><h3>چه می‌توانی، چه نمی‌توانی</h3>'+
      '<p class="tiny">این‌ها قواعد واقعی محصول‌اند — پیش از شروع بدان که چه محدودیتی هست. '+
      'قاعده‌ها برای این‌اند که گزارش‌هایت معنی‌دار بمانند، نه برای سخت‌کردن کار.</p>'+
      '<div class="cando" style="margin-top:14px"><div class="cd-col yes"><h3>✅ می‌توانی</h3><ul>'+
        ['امروز و <b>دیروز</b> را ثبت کنی — دیروز با برچسب «تأخیر»',
         'حال امروزت را ثبت کنی و <b>هر وقت خواستی عوضش کنی</b>',
         'آبت را در طول روز اضافه کنی؛ آخر روز خودکار قطعی می‌شود',
         'فعالیت‌هایت را در دورهٔ <b>در حال ساخت</b> کم و زیاد کنی',
         'هر وقت خواستی «بعداً» را بزنی و حال ثبت نکنی',
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
      '<div class="grid2">'+
        '<div class="card" style="border-color:var(--rose-soft)">'+
          '<span class="pathpill couple">زوجی · ۳۵ راهنما</span>'+
          '<h3 style="margin-top:8px">تمرین‌هایی برای دو نفر</h3>'+
          '<p class="tiny" style="margin-top:6px">گفت‌وگو، قدردانی، و کارهای مشترک. هر راهنما می‌گوید چند دقیقه وقت می‌برد '+
          'و آیا بدون طرف مقابل هم می‌شود انجامش داد.</p></div>'+
        '<div class="card" style="border-color:var(--indigo-soft)">'+
          '<span class="pathpill schema">طرح‌واره · ۲۷ راهنما</span>'+
          '<h3 style="margin-top:8px">شناختن الگوهای تکرارشونده</h3>'+
          '<p class="tiny" style="margin-top:6px">برای وقتی که یک الگو چند بار برگشته. '+
          'این راهنماها **جای درمان نیستند** و کنار هر کدام همین نوشته شده است.</p></div>'+
      '</div>'
    :
      '<div class="edu-grid">'+EDU.map(function(e){
        return '<article class="edu-card fadeup">'+
          '<div class="edu-art" style="background:var('+e[3]+')">'+owl(e[2],58)+'</div>'+
          '<div class="edu-body"><h3>'+e[0]+'</h3><p>'+e[1]+'</p>'+
          '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px">'+
            '<span class="readdot '+(e[4]?'on':'')+'"><i></i>'+(e[4]?'خوانده‌شده':'خوانده‌نشده')+'</span>'+
            '<button class="btn ghost sm" data-eduopen="'+e[0]+'">خواندن</button>'+
          '</div></div></article>';
      }).join('')+'</div>'+
      '<div class="card" style="margin-top:14px;text-align:center">'+
        '<p class="tiny">تا اینجا، تمرین‌هایی برای ساختن عادت.</p>'+
        '<p class="tiny" style="margin-top:4px">بخش بعدی کمی عمیق‌تر است. با ریتم خودت پیش برو.</p></div>'
    )+
    note('سه قانون این صفحه: هر راهنما **تصویر** دارد نه آیکون · هر محدودیت **دلیل** دارد · '+
      'و هیچ «۵ راهنمای داغ 🔥» یا امتیاز و ستاره‌ای وجود ندارد — کاتالوگ باید آرام و لذت‌بخش باشد، نه بازی.');
}
