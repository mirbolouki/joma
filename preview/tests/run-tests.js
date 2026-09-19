/* ==========================================================================
   تست‌های خودکار نمونهٔ فرانت جوما
   اجرا:  node preview/tests/run-tests.js
   چه چیزی را می‌سنجد:
     ① همهٔ صفحه‌ها در دو حالت «داده دارد» و «داده ندارد» بدون خطا ساخته شوند
     ② هیچ undefined/NaN، هیچ آیکون گم‌شده، هیچ SVG بی‌اندازه در خروجی نباشد
     ③ قوانین تصمیم‌های مالک (نسخه‌های ۱۴ تا ۲۰) نشکسته باشد
     ④ کارهایی که «در بک‌اند نیست» قواعدشان رعایت شده باشد (بدون حدس و دادهٔ ساختگی)
   ========================================================================== */
const fs = require('fs'), vm = require('vm'), path = require('path');
const P = path.join(__dirname, '..', 'proto') + '/';
const ROOT = path.join(__dirname, '..', '..') + '/';

function boot() {
  const ctx = {
    console,
    document: {
      addEventListener() {}, createElement() { return { style: {}, setAttribute() {}, appendChild() {}, classList: { add() {}, remove() {} }, querySelector() { return null; } }; },
      body: { insertBefore() {} },
      /* عنصر قلابی برای مودال/توست — تستِ رفتار را ممکن می‌کند */
      getElementById() { return { innerHTML: '', textContent: '', value: '', style: {}, setAttribute() {}, classList: { add() {}, remove() {}, toggle() {} }, querySelector() { return null; }, appendChild() {}, focus() {}, remove() {} }; },
      querySelector() { return { classList: { add() {}, remove() {} }, offsetWidth: 1, querySelector() { return null; } }; },
      querySelectorAll() { return []; }, documentElement: { setAttribute() {} }
    },
    window: { addEventListener() {}, location: { hash: '' } },
    location: { hash: '', replace() {} }, documentElement: { setAttribute() {} },
    Math, Date, performance: { now: () => 0 },
    setTimeout, clearTimeout, setInterval: () => 0, clearInterval() {}
  };
  vm.createContext(ctx);
  ['sprite.js', 'proto.js', 'charts.js', 'breath.js', 'art.js', 'screens1.js', 'screens2.js', 'screens3.js', 'interactions.js']
    .forEach(f => vm.runInContext(fs.readFileSync(P + f, 'utf8'), ctx, { filename: f }));
  vm.runInContext("window.__toasts=[]; toast=function(m){window.__toasts.push(m)}; render=function(){};", ctx);
  return ctx;
}

const problems = [];
const notes = [];
const say = (m) => notes.push('· ' + m);
const bad = (m) => problems.push(m);
const src = (f) => fs.readFileSync(P + f, 'utf8');
const doc = (f) => fs.existsSync(ROOT + f) ? fs.readFileSync(ROOT + f, 'utf8') : '';

const c = boot();
const run = (x) => vm.runInContext(x, c);
const symbols = new Set([...src('sprite.js').matchAll(/symbol id=\\?"([a-z0-9-]+)\\?"/g)].map(m => m[1]));
const ids = run("SCREENS.map(function(x){return x.id;})");
const R = {}; ids.forEach(id => { R[id] = vm.runInContext('R_' + id, c); });

/* ---------------------------------------------- ① + ② صفحه‌ها × حالت‌ها */
function check(name, html) {
  if (html == null) return bad(name + ': خروجی خالی');
  if (html.length < 600) bad(name + ': خروجی مشکوک کوتاه (' + html.length + ')');
  const und = html.match(/undefined/g); if (und) bad(name + ': ' + und.length + ' × undefined');
  const nan = html.match(/NaN/g); if (nan) bad(name + ': ' + nan.length + ' × NaN');
  for (const m of html.matchAll(/<use href="#([a-z0-9-]+)"/g)) if (!symbols.has(m[1])) bad(name + ': آیکون گم‌شده #' + m[1]);
  for (const s of (html.match(/<svg[^>]*>/g) || [])) if (!/\swidth="/.test(s) || !/\sheight="/.test(s)) bad(name + ': SVG بدون اندازهٔ صریح');
  const o = (html.match(/<g[\s>]/g) || []).length, cl = (html.match(/<\/g>/g) || []).length;
  if (o !== cl) bad(name + ': تگ <g> ' + o + '/' + cl);
}
['full', 'empty'].forEach(mode => {
  run("APP.data=" + JSON.stringify(mode) + ";");
  Object.keys(R).forEach(id => { try { check(mode + '/' + id, R[id]()); } catch (e) { bad(mode + '/' + id + ' خطا داد: ' + e.message); } });
});
run("APP.data='full';");
say('۱۹ صفحه × دو حالت (داده دارد / ندارد) بدون خطا ساخته شد');

/* ---------------------------------------------- ③ قوانین نسخه‌های ۱۴–۲۰ */
const s1 = src('screens1.js'), s2 = src('screens2.js'), s3 = src('screens3.js'),
      br = src('breath.js'), it = src('interactions.js'), css = src('proto.css'),
      art = src('art.js'), proto = src('proto.js'), idx = src('index.html');

/* نسخهٔ ۱۴–۱۵ */
['data-moodnote', 'VIEW_NOTES', 'data-roleto', 'sup-card', 'data-sstep', 'jobOptions'].forEach(k => {
  if (s1.indexOf(k) < 0) bad('۱۴: «' + k + '» در صفحه‌های احراز/حال نیست');
});
['br-in.mp3', 'br-hold.mp3', 'br-out.mp3'].forEach(f => { if (br.indexOf(f) < 0) bad('۱۴: فایل صوتی ' + f + ' ارجاع نشده'); });
['از بینی، آرام دم بگیر', 'شانه‌ها شل و رها', 'آرام و بلند از دهان بازدم'].forEach(t => { if (br.indexOf(t) < 0) bad('۱۹: جملهٔ «' + t + '» نیست'); });
if (s2.indexOf('آبت') > -1) bad('۱۴: واژهٔ ممنوع «آبت» در نمونه مانده');

/* نسخهٔ ۱۶–۱۷: ثبت‌نام و جوجه */
const steps = []; for (let k = 0; k < 5; k++) { run('APP.signupStep=' + k + ';'); steps.push(R.signup()); }
const all = steps.join('\n');

/* نسخهٔ ۲۱ — تصمیم‌های مالک */
if (all.indexOf('data-gender') > -1 || all.indexOf('فقط برای جنسیت') > -1) bad('۲۱: گام جنسیت از ثبت‌نام برداشته نشده — تصمیم مالک');
if (s1.indexOf('data-gender') > -1) bad('۲۱: هندلر/دکمهٔ جنسیت در کد مانده');
if (all.indexOf('جنسیت') > -1) bad('۲۱: واژهٔ «جنسیت» در صفحهٔ ثبت‌نام (خروجی) مانده');
if (run('METERS.length') !== 3) bad('۲۱: سنجه‌های جوجه ' + run('METERS.length') + ' (باید ۳ باشد — سنجهٔ چهارم منبع ندارد)');
if (run('METER_TOTAL') !== 9) bad('۲۱: مخرج سنجه‌ها ' + run('METER_TOTAL') + ' (باید ۹ = ۳×۳)');
if (all.indexOf('۰۹۹۶۷۹۷۹۴۷۱') < 0) bad('۱۶: شمارهٔ پشتیبانی نیست');
if (/پیامک شد|ارسال دوباره|ارسال کد/.test(all)) bad('۱۶: وعدهٔ ارسال پیامک');
['data-authrole', 'name="role"', 'id="role"'].forEach(b => { if (all.indexOf(b) > -1) bad('۱۶: فیلد نقش در ثبت‌نام (' + b + ')'); });
const optc = (steps[1].match(/<option/g) || []).length;
if (optc !== 19) bad('۱۶: تعداد گزینه‌های شغل ' + optc + ' (باید ۱۹)');
if (steps[1].indexOf('<optgroup') > -1) bad('۱۶: شغل گروه‌بندی شده (مالک فهرست تخت داد)');
['دانش‌آموز', 'وکیل', 'خانه‌دار', 'مشاغل آزاد', 'سایر'].forEach(j => { if (steps[1].indexOf(j) < 0) bad('۱۶: شغل «' + j + '» نیست'); });
if (!/data-petstage|PET_STAGES/.test(s2)) bad('۱۷: سناریوی جوجه نیست');
if (it.indexOf('[data-petsleep]') < 0) bad('۱۹: هندلر خواب جوجه نیست');
if ((it.match(/\[data-petsleep\]/g) || []).length !== 1) bad('۱۹: هندلر خواب جوجه تکراری است');

/* نسخهٔ ۱۸: تقویم «مسیر این ماه» */
run("APP.data='full';");
const cal = run('monthCal()');
if (cal.indexOf('cal-grid') < 0 || cal.indexOf('cal-legend') < 0) bad('۱۸: ساختار تقویم ناقص');
if ((cal.match(/class="cc /g) || []).length < 30) bad('۱۸: کاشی روزها کمتر از ۳۰');
['کامل ثبت شده', 'ناقص', 'بدون ثبت', 'امروز', 'روزهای آینده'].forEach(k => { if (cal.indexOf(k) < 0) bad('۱۸: برچسب راهنما «' + k + '» نیست'); });
['cc.full', 'cc.part', 'cc.miss', 'cc.today', '.tflag', 'box-shadow:0 3px 0'].forEach(k => { if (css.indexOf(k) < 0) bad('۱۸: CSS تقویم «' + k + '» نیست'); });
if (cal.indexOf('class="dn"') < 0) bad('۱۸: عدد روز داخل کاشی نیست');
if (R.home().indexOf('cal-legend') < 0) bad('۱۸: تقویم در خانه نیست');
run("APP.planTab='cal';");
if (R.plan().indexOf('cal-grid') < 0) bad('۱۸: تقویم در تب «مسیر این ماه» برنامه نیست');

/* نسخهٔ ۱۹: جملهٔ شخصی، حالت مشاور، صدا، موبایل */
run('APP.moodStep=5;'); const nt = R.mood();
['data-moodnote', 'فقط خودت', 'VIEW_NOTES', 'ذخیره و پایان', 'بدون جمله'].forEach(k => { if (nt.indexOf(k) < 0) bad('۱۹: قدم جملهٔ شخصی — «' + k + '» نیست'); });
run("APP.moodStep=6; APP.moodNote='نمونه';");
if (R.mood().indexOf('جملهٔ امروت') < 0) bad('۱۹: کارت جمله در خلاصه نیست');
run("APP.moodStep=0; APP.moodNote='';");
run("APP.roleView='coach';");
if (R.mood().indexOf('باز نمی‌شود') < 0) bad('۱۹: صفحهٔ حال در حالت مشاور بسته نیست');
if (R.home().indexOf('coach-card') < 0) bad('۱۹: کارت مشاور در خانه نیست');
if (R.today().indexOf('coach-card') < 0) bad('۱۹: کارت مشاور در کارهای امروز نیست');
if (R.home().indexOf('class="faces"') > -1) bad('۱۹: چهره‌های حال در حالت مشاور مانده');
run("APP.roleView='client';");
['[data-view="mobile"]', '@media (max-width:640px)', 'env(safe-area-inset-bottom)', 'font-size:16px'].forEach(k => { if (css.indexOf(k) < 0) bad('۱۹: موبایل — «' + k + '» نیست'); });
if (it.indexOf('data-mobile') < 0) bad('۱۹: کلید نمایش موبایل نیست');
if (art.indexOf('coachCard') < 0) bad('۱۹: coachCard نیست');

/* نسخهٔ ۲۰: کارهای «در بک‌اند نیست» — قاعدهٔ «حدس نزن» */
const lock = doc('docs/handoff/09-backend-gap-order.md');
if (!lock) bad('۲۰: فایل سفارش کار بک‌اند نیست');
else ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'].forEach(b => { if (lock.indexOf(b) < 0) bad('۲۰: مورد ' + b + ' در سفارش کار نیست'); });
['۱۲', '۱۳', '۱۴', '۱۵', '۱۸', '۲۲', '۲۶'].forEach(n => {
  const f = 'docs/spec/' + n + '-*.md';
});
['12-today.md', '13-mood.md', '14-companion.md', '15-journal.md', '18-plan.md', '22-auth.md', '26-data-rights.md'].forEach(f => {
  if (doc('docs/spec/' + f).indexOf('یافتهٔ بازبینی بک‌اند — دور ۲۰') < 0) bad('۲۰: بند «یافتهٔ بازبینی بک‌اند» در ' + f + ' نیست');
});
const agent = doc('docs/handoff/07-agent-prompt-frontend.md');
if (agent.indexOf('۶.۵') < 0 || agent.indexOf('ممنوع تا تأیید بک‌اند') < 0) bad('۲۰: فهرست ممنوع در پرامپت ایجنت نیست');
['بک‌اند، دیتابیس و سرور دست‌نخورده', 'ساب‌دامین', 'حدس'].forEach(k => { if (agent.indexOf(k) < 0) bad('۲۰: پرامپت ایجنت — «' + k + '» نیست'); });
const owner = doc('docs/handoff/08-owner-step-by-step.md');
['لینک دانلود مستقیم', 'تأیید است', 'گام‌به‌گام'].forEach(k => { if (owner.indexOf(k) < 0) bad('۲۰: راهنمای مالک — «' + k + '» نیست'); });
/* B3: روز آینده نه انتخاب می‌شود و نه درخواست می‌فرستد */
const future = new Set([...cal.matchAll(/class="cc future[^"]*"[^>]*data-cald="(\d+)"/g)].map(m => +m[1]));
if (future.size !== 14) bad('۲۰: شمار روزهای آیندهٔ غیرفعال ' + future.size + ' (باید ۱۴)');
if (cal.indexOf('aria-disabled="true"') < 0) bad('۲۰: روز آینده aria-disabled ندارد — B3');
run("APP.calDay=0;");
for (const d of [17, 25, 30]) {
  run("window.__ev={target:{closest:function(s){return s.indexOf('[data-cald]')>-1?{dataset:{cald:'" + d + "'},classList:{add(){},remove(){}}}:null},matches:function(){return false}}};window.INNER_CLICK(window.__ev);");
  if (run('APP.calDay') !== 0) bad('۲۰: روز آینده (' + d + ') انتخاب شد — B3');
}
run("window.__ev={target:{closest:function(s){return s.indexOf('[data-cald]')>-1?{dataset:{cald:'13'},classList:{add(){},remove(){}}}:null},matches:function(){return false}}};window.INNER_CLICK(window.__ev);");
if (run('APP.calDay') !== 13) bad('۲۰: روز گذشته انتخاب نمی‌شود');
run('APP.calDay=0;');
/* نسخهٔ ۲۲ — وضعیت واقعی تست: چهار مورد اجراشده */
if (s1.indexOf('forgotStatus') < 0) bad('۲۲: بنر وضعیت مسیر بازیابی رمز نیست');
run('APP.forgotStep=0;'); const fg = R.forgot();
['۰۹۹۶۷۹۷۹۴۷۱', 'کد'].forEach(k => { if (fg.indexOf(k) < 0) bad('۲۲: صفحهٔ بازیابی — «' + k + '» نیست'); });
const ERR = 'ثبت عملکرد برای روزهای آینده ممکن نیست.';
if (it.indexOf(ERR) < 0) bad('۲۲: پیام دقیق بک‌اند برای روز آینده نیست');
if (R.today().indexOf('بدون قفل') < 0) bad('۲۲: یادآوری «بدون قفل» در کارهای امروز نیست');
/* نسخهٔ ۲۳ — جوجهٔ سه‌سنجه‌ای با اعداد بک‌اند · کد یک‌بارمصرف بازیابی رمز */
run('APP.forgotStep=0;'); const fg23 = R.forgot();
if (fg23.indexOf('موقتاً بسته است') > -1) bad('۲۳: بنر قدیمی «موقتاً بسته است» مانده — مرحلهٔ ۲ اجرا شده');
['آزمایش شد', 'یک‌بارمصرف', '۱۵ دقیقه', '۵ تلاش', 'نشست‌های دیگر'].forEach(k => { if (fg23.indexOf(k) < 0) bad('۲۳: بنر بازیابی — «' + k + '» نیست'); });
run('APP.forgotStep=1;'); const fgC = R.forgot();
['اعتبار کد تمام شده است', 'تلاش باقی مانده', 'تأیید هویت'].forEach(k => { if (fgC.indexOf(k) < 0) bad('۲۳: گام کد — «' + k + '» نیست'); });
run('APP.forgotStep=2;'); const fgP = R.forgot();
if (fgP.indexOf('همهٔ نشست‌های دیگر باطل') < 0) bad('۲۳: گام رمز تازه — باطل‌شدن نشست‌ها نیست');
if (fgP.indexOf('هیچ پیامی به کانال') < 0) bad('۲۳: ادعای کانال حذف نشده — باید بگوید پیامی به کانال نمی‌رود');
if (all.indexOf('به همان کانال می‌آید') > -1) bad('۲۳: متن «پیام به همان کانال می‌آید» مانده — کانالی وجود ندارد');
run('APP.forgotStep=3;'); if (R.forgot().indexOf('نشست‌های قبلی بسته شدند') < 0) bad('۲۳: پیام دقیق بک‌اند برای نشست‌های بسته‌شده نیست');
if (it.indexOf('نشست‌های دیگر بسته شدند') < 0) bad('۲۳: توست بسته‌شدن نشست‌ها به‌روز نشده');
if (all.indexOf('فرستادیم') > -1) bad('۲۳: «فرستادیم» در رابط مانده — پشتیبانی کد را دستی می‌دهد');
/* جوجه: اعداد، سه سنجه، نام */
[['crack', 6], ['born', 12], ['mid', 40], ['full', 90], ['pale', 3], ['miss', 6]].forEach(p => {
  if (run('PET_NUM.' + p[0]) !== p[1]) bad('۲۳: عدد جوجه ' + p[0] + ' = ' + run('PET_NUM.' + p[0]) + ' (باید ' + p[1] + ' باشد)');
});
run('APP.petStage="chick"; APP.petMood="ok";'); const ch23 = R.chick();
['سه عدد واقعی', 'به بالا گِرد نمی‌شود', 'دونه تا این لحظه', '۲ تا ۱۶', 'فقط در همین صفحه'].forEach(k => { if (ch23.indexOf(k) < 0) bad('۲۳: صفحهٔ جوجه — «' + k + '» نیست'); });
run('APP.data="empty";'); const chE = R.chick(); run('APP.data="full";');
if (chE.indexOf('در برنامه‌ات نیست') < 0) bad('۲۳: حالت بی‌دادهٔ جوجه — «در برنامه‌ات نیست» (صفر جعلی) نیست');
if (ch23.indexOf('از ۱۲') > -1) bad('۲۳: مخرج ساختگی «از ۱۲» در جوجه مانده');
if (/fa\(pct\)\+'٪'/.test(s2)) bad('۲۳: درصد ساختگی مراقبت در کد مانده');
if (s2.indexOf('آبِ **پیش‌نویس**') > -1) bad('۲۳: «آب پیش‌نویس» مانده — همهٔ ثبت‌های آب قطعی‌اند');
if (ch23.indexOf('حمام؛ من با همین‌ها شادم') > -1) bad('۲۳: پیام مرحله هنوز سنجهٔ حمام را می‌شمارد');
/* اسناد */
if (!doc('docs/handoff/15-round-23-backend-status.md')) bad('۲۳: گزارش دور ۲۳ نیست');
['14-companion.md', '22-auth.md'].forEach(f => { if (doc('docs/spec/' + f).indexOf('دور ۲۳') < 0) bad('۲۳: بند دور ۲۳ در ' + f + ' نیست'); });
if (doc('docs/handoff/09-backend-gap-order.md').indexOf('به‌روزرسانی دور ۲۳') < 0) bad('۲۳: وضعیت تازهٔ شکاف‌ها در handoff/09 نیست');
say('قوانین نسخه‌های ۱۴ تا ۲۳ بررسی شد');
/* نسخهٔ ۲۴ — آب پیش‌نویس/قطعی (B6) و دفترچهٔ بینش با شواهد (B7) */
if (src('proto.js').indexOf('waterFinal:false') < 0) bad('۲۴: پرچم وضعیت آب (پیش‌نویس/قطعی) در نمونه نیست');
run('APP.waterFinal=false;'); const wc24 = run('waterCard()');
['ثبت نهایی آب امروز', 'پیش‌نویس', 'در هیچ سنجه‌ای شمرده نمی‌شود', 'یک رکورد', 'خودکار قطعی'].forEach(k => { if (wc24.indexOf(k) < 0) bad('۲۴: کارت آب — «' + k + '» نیست'); });
if (src('proto.js').indexOf('قطعی شده — قابل تغییر نیست') < 0) bad('۲۴: قفل پس از قطعی‌شدن آب نیست');
if (src('proto.js').indexOf('پیش‌نویس — در سنجه‌ها نشمرده') < 0) bad('۲۴: شمارندهٔ آب وضعیت پیش‌نویس را نمی‌گوید');
if (R.today().indexOf('هیچ سنجه‌ای') < 0) bad('۲۴: یادداشت «کارهای امروز» دربارهٔ شمرده‌نشدن آب نیست');
run('APP.petStage="chick"; APP.petMood="ok";'); const ch24 = R.chick();
if (ch24.indexOf('پیش‌نویس، نشمرده') < 0) bad('۲۴: سنجهٔ آب جوجه — برچسب «پیش‌نویس، نشمرده» نیست');
if (ch24.indexOf('در سنجه‌ها شمرده نمی‌شود') < 0 || ch24.indexOf('WTR-10') < 0) bad('۲۴: قاعدهٔ WTR-10 در صفحهٔ جوجه نیست');
run('APP.bookSec="ins"; APP.data="full";'); const bk24 = R.book();
['از ثبت‌های تو', 'نوشته‌های خودت', 'این برداشت از کجا آمده؟', 'همراهی، دلیل نیست'].forEach(k => { if (bk24.indexOf(k) < 0) bad('۲۴: دفترچه — «' + k + '» نیست'); });
['بهترین روز هفته', 'حال × موفقیت روزانه', 'بلندترین رشتهٔ ثبت', 'پایدارترین فعالیت', 'آب قطعی‌شده'].forEach(k => { if (bk24.indexOf(k) < 0) bad('۲۴: بینش ساخته‌شدهٔ «' + k + '» در نمونه نیست'); });
if (bk24.indexOf('درصد اطمینان') > -1 || bk24.indexOf('شمارش معکوس') > -1) bad('۲۴: دفترچه — عنصر ممنوع (درصد اطمینان / شمارش معکوس)');
run('APP.bookSec="notes";'); const bn24 = R.book();
['پاک‌کردن یادداشت', 'رکورد حال را دست نمی‌زند', 'هرگز به هم‌مسیر نمی‌رود', 'جست‌وجو'].forEach(k => { if (bn24.indexOf(k) < 0) bad('۲۴: نوشته‌های خودت — «' + k + '» نیست'); });
run('APP.bookSec="ins"; APP.data="empty";'); const be24 = R.book();
if (be24.indexOf('چیز تازه‌ای برای گفتن ندارد') < 0) bad('۲۴: حالت کم‌دادهٔ دفترچه — پیام صادقانه نیست');
run('APP.data="full";');
['شمار نمونه', 'چه چیزی کنار گذاشته شد', 'جهت رابطه', 'همان روز یا روز بعد', 'قاعده و نسخه', 'زمان محاسبه', 'اعتبار'].forEach(k => { if (it.indexOf(k) < 0) bad('۲۴: پنل شواهد — «' + k + '» نیست'); });
if (it.indexOf('data-wfinal') < 0 || it.indexOf('data-wfinal-ok') < 0) bad('۲۴: هندلر ثبت نهایی آب نیست');
if (it.indexOf('data-booksec') < 0) bad('۲۴: هندلر بخش‌های دفترچه نیست');
if (!doc('docs/handoff/18-round-24-backend-status.md')) bad('۲۴: گزارش دور ۲۴ نیست');
['12-today.md', '14-companion.md', '15-journal.md'].forEach(f => { if (doc('docs/spec/' + f).indexOf('دور ۲۴') < 0) bad('۲۴: بند دور ۲۴ در ' + f + ' نیست'); });
if (doc('docs/handoff/09-backend-gap-order.md').indexOf('به‌روزرسانی دور ۲۴') < 0) bad('۲۴: وضعیت تازهٔ B6/B7 در handoff/09 نیست');
say('قوانین نسخه‌های ۱۴ تا ۲۴ بررسی شد');
/* نسخهٔ ۲۹ — دو قفل تازه: تصویر پنج گزینهٔ حال + دستگاه وضعیت آب */
if (doc('docs/spec/13-mood.md').indexOf('هر پنج گزینه، تصویر خودش را دارد') < 0) bad('۲۹: قفل «هر پنج گزینه تصویر خودش را دارد» در فصل ۱۳ نیست');
if (doc('docs/spec/12-today.md').indexOf('دستگاه وضعیت آب') < 0) bad('۲۹: «دستگاه وضعیت آب» در فصل ۱۲ نیست');
if (!doc('docs/handoff/26-direct-fix-order-mood-water.md')) bad('۲۹: دستور مستقیم دور ۲۹ نیست');
if (!doc('docs/compact-gallery.html')) bad('۲۹: گالری «چگالی نمایش» نیست');
if (doc('docs/spec/21-settings.md').indexOf('چگالی نمایش') < 0) bad('۲۹: توضیح چگالی نمایش در تنظیمات نیست');
say('دور ۲۹ — دو ایراد تکرارشده با مشخصات دقیق ثبت شد');
/* نسخهٔ ۳۰ — بستهٔ v8 */
if (!doc('docs/handoff/27-round-30-v8-status.md')) bad('۳۰: گزارش دور ۳۰ نیست');
['00-principles.md','99-handoff.md'].forEach(f => { if (doc('docs/spec/' + f).indexOf('دور ۳۰') < 0) bad('۳۰: ثبت دور ۳۰ در ' + f + ' نیست'); });
say('دور ۳۰ — v8 و دو مورد باز ثبت شد');
/* نسخهٔ ۳۱ — سیاست قفل و سه ایراد تازه */
if (!doc('docs/handoff/28-lock-policy-and-round-31-order.md')) bad('۳۱: سند سیاست قفل و سفارش دور ۳۱ نیست');
['قفل مبنا','اِد اونلی','LOCK-v8.sha256'].forEach(k => { if (doc('docs/handoff/28-lock-policy-and-round-31-order.md').indexOf(k) < 0) bad('۳۱: «' + k + '» در سند قفل نیست'); });
['C1 — تب‌های','C2 — جابه‌جایی نقش','C3 — داشبورد مشاور'].forEach(k => { if (doc('docs/handoff/28-lock-policy-and-round-31-order.md').indexOf(k) < 0) bad('۳۱: ' + k + ' نیست'); });
if (doc('docs/spec/00-principles.md').indexOf('اِد اونلی') < 0) bad('۳۱: سیاست اِد اونلی در اصول ثبت نشد');
if (doc('docs/handoff/28-lock-policy-and-round-31-order.md').indexOf('C4 — کارت دعوت') < 0) bad('۳۱: C4 کارت دعوت در سفارش نیست');
if (doc('docs/handoff/28-lock-policy-and-round-31-order.md').indexOf('L32') < 0) bad('۳۱: L32 در قفل‌نامه نیست');
if (doc('docs/spec/20-hammasir.md').indexOf('کارت دعوت یک‌باره ساخته نشده') < 0) bad('۳۱: ثبت وضعیت کارت دعوت در فصل ۲۰ نیست');
say('دور ۳۱ — قفل مبنا و چهار ایراد تازه ثبت شد');
/* نسخهٔ ۳۲ — v9 و اجرای قفل */
if (!doc('docs/handoff/29-round-32-v9-status.md')) bad('۳۲: گزارش دور ۳۲ نیست');
if (doc('docs/handoff/29-round-32-v9-status.md').indexOf('۱۱۷') < 0) bad('۳۲: نتیجهٔ قفل در گزارش نیست');
['00-principles.md','99-handoff.md','24-roles.md','20-hammasir.md'].forEach(f => { if (doc('docs/spec/' + f).indexOf('دور ۳۲') < 0) bad('۳۲: ثبت دور ۳۲ در ' + f + ' نیست'); });
if (doc('docs/handoff/28-lock-policy-and-round-31-order.md').indexOf('C5 — داشبورد مشاور') < 0) bad('۳۲م: C5 «وضعیت در یک نگاه» نیست');
if (doc('docs/handoff/28-lock-policy-and-round-31-order.md').indexOf('L33') < 0) bad('۳۲م: L33 در قفل‌نامه نیست');
if (doc('docs/spec/24-roles.md').indexOf('یک‌نگاهی') < 0) bad('۳۲م: روشن‌سازی «کارت یک‌نگاهی» در فصل ۲۴ نیست');
say('دور ۳۲ — v9 + C5 «وضعیت در یک نگاه» ثبت شد');
/* نسخهٔ ۳۳ — پرامپت یک‌تکهٔ v10 */
if (!doc('docs/handoff/30-agent-prompt-v10.md')) bad('۳۳: پرامپت یک‌تکهٔ v10 نیست');
['v9 نصب نشده','تجمعی از v8','C5','F1','F2','F3','F4','LOCK-v8.sha256'].forEach(k => { if (doc('docs/handoff/30-agent-prompt-v10.md').indexOf(k) < 0) bad('۳۳: «' + k + '» در پرامپت نیست'); });
say('دور ۳۳ — پرامپت یک‌تکهٔ v10 ثبت شد');
/* نسخهٔ ۳۴ — روش مقایسهٔ دو ساب‌دامین */
if (!doc('docs/handoff/31-two-subdomain-comparison-method.md')) bad('۳۴: سند روش مقایسهٔ دو ساب‌دامین نیست');
['MYT-001','Structure only','🟢','پنج قلم اثبات','دیتابیس مشترک'].forEach(k => { if (doc('docs/handoff/31-two-subdomain-comparison-method.md').indexOf(k) < 0) bad('۳۴: «' + k + '» در سند مقایسه نیست'); });
if (doc('docs/handoff/31-two-subdomain-comparison-method.md').indexOf('اگر حالت فایل است') < 0) bad('۳۴م: بند «اگر حالت فایل است» نیست');
if (doc('docs/handoff/31-two-subdomain-comparison-method.md').indexOf('تبدیل فایل→دیتابیس') < 0) bad('۳۴م: ریسک تبدیل فایل→دیتابیس نیست');
if (doc('docs/handoff/31-two-subdomain-comparison-method.md').indexOf('DATA-MAP') < 0) bad('۳۴م: DATA-MAP در پرامپت نیست');
say('دور ۳۴ — روش مقایسهٔ دو ساب‌دامین ثبت شد');
/* نسخهٔ ۲۸ — بستهٔ اصلاحی v7 (گزارش، تصمیم‌ها و اصلاح سند) */
if (!doc('docs/handoff/25-round-28-v7-status.md')) bad('۲۸: گزارش دور ۲۸ نیست');
if (doc('docs/spec/11-home.md').indexOf('آیکون همان فعالیت') < 0) bad('۲۸: اصلاح چیپ «قدم‌های امروز» (آیکون فعالیت) در سند نیست');
if (doc('docs/spec/10-landing.md').indexOf('نمایش نمونه') < 0) bad('۲۸: الزام برچسب «نمایش نمونه» در فصل لندینگ نیست');
['00-principles.md','99-handoff.md'].forEach(f => { if (doc('docs/spec/' + f).indexOf('دور ۲۸') < 0) bad('۲۸: ثبت دور ۲۸ در ' + f + ' نیست'); });
say('دور ۲۸ — v7 و سه تصمیم ثبت شد');

say('تصمیم‌های دور ۲۱ — جنسیت برداشته شد · جوجه سه‌سنجه‌ای');
say('کارهای «در بک‌اند نیست» با قاعدهٔ «حدس نزن» ثبت شده‌اند');

/* ---------------------------------------------- نتیجه */
console.log(notes.join('\n'));
if (problems.length) { console.log('\nمشکل (' + problems.length + '):\n - ' + problems.join('\n - ')); process.exit(1); }
console.log('\n✔ همه سالم — ۱۹ صفحه · دو حالت · قوانین ۱۴–۳۴');
