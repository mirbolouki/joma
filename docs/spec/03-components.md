# ۰۳ — کتابخانهٔ اجزا

> **منبع:** همهٔ اجزای این بخش از `reference/7A/7A.html` و `reference/7B/7B.html` استخراج شده‌اند.
> **قاعده:** نام کلاس‌ها همان دموهاست تا ایجنت پیاده‌ساز بتواند مستقیم تطبیق دهد.
> **قاعدهٔ داده:** در جدول هر جزء، ستون **«از بک‌اند»** می‌گوید مقدار از کجا می‌آید. اگر `—` است، محتوای ثابت یا ورودی کاربر است.

---

## ۱) کارت — `.card`

واحد پایهٔ محتوا.

```
background: var(--card)
border: 1px solid var(--card-brd)
border-radius: var(--r)
box-shadow: var(--shadow)
transition: background .25s, border-color .25s, box-shadow .25s, border-radius .25s
```

- فاصلهٔ داخلی: `20px` (کارت معمولی) · `14px` (کارت فشرده) · `18px` (کارت صفحه)
- حالت هاور برای کارت کلیک‌پذیر: `transform: translateY(-4px)` + سایهٔ بالا
- در تم شیشه: دستور کامل §۳.۳ فایل `01-foundation.md`

**`[تصمیم]`** کارت هیچ‌گاه بیش از **یک اقدام اصلی** ندارد.

---

## ۲) کارت «قدم بعدی» — `.pcard`

ستون هدایت محصول. در خانه، **تنها یک کارت برجسته**.

```
[متن]                                    [حلقهٔ پیشرفت]
برچسب کوچک: «امروز، روی همین چند قدم تمرکز کن»      .ring-l
تیتر: متن وضعیت از بک‌اند
توضیح: یک جمله
[دکمهٔ اصلی] [دکمهٔ ثانویه]
```

| جزء | از بک‌اند |
|---|---|
| برچسب | متن ثابت |
| تیتر | متن وضعیت آماده |
| توضیح | متن آماده |
| دکمهٔ اصلی و مقصدش | اقدام مجاز |
| دکمهٔ ثانویه | اقدام مجاز؛ ممکن است نباشد |
| درصد حلقه | عدد آماده — **فرانت محاسبه نمی‌کند** |
| متن زیر عدد | برچسب آماده |

**قاعدهٔ سخت:** اگر بک‌اند درصد نداده باشد، حلقه **نمایش داده نمی‌شود** — نه اینکه با صفر پر شود.

---

## ۳) حلقهٔ پیشرفت — `.ring-l` / `.ring-s` / `.mring`

```html
<div class="ring-l">
  <svg viewBox="0 0 128 128">
    <circle class="rt" cx="64" cy="64" r="54"/>
    <circle class="rp" cx="64" cy="64" r="54" style="--p:55"/>
  </svg>
  <div class="lbl"><b class="num">۵۵٪</b><span>قدم دیگر مانده</span></div>
</div>
```

```css
.rt { fill:none; stroke: var(--ring-track); stroke-width: 11 }
.rp { fill:none; stroke: url(#gradRing); stroke-width: 11; stroke-linecap: round;
      stroke-dasharray: calc(339 * var(--p) / 100) 339; transition: stroke-dasharray .7s }
```

اندازه‌ها: `ring-l` ۱۱۸px (شعاع ۵۴) · `ring-s` ۸۰px (شعاع ۳۳) · `mring` ۶۰px (شعاع ۲۶).

**`[تصمیم]`** سه اندازه کافی است. دموها هر جا عدد متفاوتی می‌گذاشتند.

| از بک‌اند | `--p` (۰ تا ۱۰۰) + متن برچسب |

---

## ۴) حباب گفتار جوما — `.joma-msg`

**هویت اصلی محصول.** همه‌جای رابط تکرار می‌شود.

```html
<div class="joma-msg">
  <span class="mascot sm"><svg><use href="#owl-hi"/></svg></span>
  <div class="bubble">
    <div class="who">جوما</div>
    متن پیام
  </div>
</div>
```

```css
.joma-msg { display:flex; align-items:center; gap:10px; margin:6px 0 }
.joma-msg .bubble { background:var(--card); border:1px solid var(--card-brd);
  border-radius:16px; box-shadow:var(--shadow); padding:9px 14px;
  font-size:12.5px; font-weight:600; line-height:1.9; flex:1 }
.joma-msg .who { font-size:9.5px; font-weight:800; color:var(--brand-ink);
  letter-spacing:.3px; margin-bottom:2px }
```

**قاعدهٔ حضور (بخش ۱۳٫۵ سند مادر):**

- در هر ناحیهٔ فعال صفحه، **حداکثر یک** `‎.joma-msg‎`.
- پیام راهنما، بینش و جشن **هم‌زمان** ظاهر نمی‌شوند.
- متن خطا **اول مشکل و راه ادامه** را می‌گوید؛ کاراکتر وضوح را کم نمی‌کند.
- برچسب `.who` می‌تواند «جوما» یا نوع پیام باشد: «از ثبت‌های تو» (بینش) · «جوما» (راهنما).

| از بک‌اند | متن پیام آماده + نوع پیام (`راهنما` / `بازخورد` / `بینش`) |

---

## ۵) ردیف فعالیت — `.act-row`

ستون فقرات «کارهای امروز» و «خانه».

```html
<div class="act-row">
  <span class="chip" style="background:var(--sky-soft)"><svg><use href="#owl-water"/></svg></span>
  <div class="inf">
    <div class="t">نوشیدن آب</div>
    <div class="s num">هدف این برنامه: ۸ لیوان</div>
  </div>
  <input class="inp num" value="۵">
  <span class="st draft">پیش‌نویس</span>
</div>
```

```css
.act-row { display:flex; align-items:center; gap:12px; padding:12px 2px;
  border-bottom:1px solid var(--card-brd) }
.act-row:last-child { border-bottom:none }
.act-row .inf { flex:1; min-width:0 }
.act-row .t { font-size:13px; font-weight:700 }
.act-row .s { font-size:10.5px; color:var(--ink-3); line-height:1.7 }
```

**آیکون فعالیت:** `.chip` ۴۰px با `border-radius:12px`. رنگ از `--{family}-soft` خانوادهٔ فعالیت.

**`[تصمیم]`** هر فعالیت یک خانوادهٔ رنگی از شش خانوادهٔ §۲.۳ می‌گیرد. رنگ از بک‌اند می‌آید (فیلد رنگ فعالیت)، نه از نامش.

| از بک‌اند | نام · هدف · واحد · تناوب (به زبان ساده) · مقدار فعلی · وضعیت · رنگ · آیکون · شناسه |

**ممنوع:** نمایش سه عدد پشت‌سرهم روز/هفته/ماه بدون توضیح. هدف همیشه با برچسب «هدف این برنامه:» می‌آید.

---

## ۶) چیپ وضعیت — `.st`

**رنگ هرگز تنها نشانه نیست؛ متن الزامی است.**

| کلاس | برچسب فارسی | رنگ زمینه | رنگ متن |
|---|---|---|---|
| `.st.done` | «ثبت شده» | `--brand-soft` | `--brand-ink` |
| `.st.wait` | «در انتظار» | `--gold-soft` | `--gold-ink` |
| `.st.draft` | «پیش‌نویس — قابل تغییر» | `--sky-soft` | `--sky-ink` |
| `.st.final` | «ثبت قطعی شد» | `--brand-soft` | `--brand-ink` |
| `.st.pending` | «در انتظار قطعی‌شدن» | `--lav-soft` | `--lav-ink` |
| `.st.late` | «دیروز — با تأخیر» | `--gold-soft` | `--gold-ink` |
| `.st.err` | «ثبت نهایی انجام نشد» | `--coral-soft` | `--coral-ink` |
| `.st.none` | «ثبت نشده» | `--ring-track` | `--ink-2` |
| `.st.insufficient` | «هنوز دادهٔ کافی نیست» | `--lav-soft` | `--lav-ink` |

```css
.st { font-size:10.5px; font-weight:800; padding:5px 11px; border-radius:999px;
  white-space:nowrap; display:inline-flex; align-items:center; gap:5px }
```

| از بک‌اند | کد وضعیت (نه متن). فرانت کد را به برچسب فارسی نگاشت می‌کند. |

---

## ۷) لیوان‌های آب — `.wglasses`

**مصوب سند مادر: «ثبت تصویری آب از B».**

```html
<div class="wglasses" id="wglasses"></div>
```

```css
.wglasses { display:grid; grid-template-columns:repeat(8,1fr); gap:8px; margin-top:12px }
.wg { aspect-ratio:2/3; border-radius:8px 8px 12px 12px;
      border:2px solid var(--card-brd); background:var(--card);
      position:relative; cursor:pointer; overflow:hidden;
      transition: transform .2s, border-color .2s }
.wg i { position:absolute; inset:auto 0 0 0; height:0;
        background:linear-gradient(180deg, var(--sky), var(--sky-soft));
        transition: height .35s }
.wg.f { border-color: var(--sky) }
.wg.f i { height:80% }
.wg:hover { transform: translateY(-2px) }
```

**رفتار:** کلیک روی هر لیوان → تاگل کلاس `.f` + انیمیشن `pop` → شمارش پرها → **ارسال به بک‌اند** → به‌روزرسانی شمارنده.

**شمارنده:** `«۶ از ۸»` با ارقام فارسی.

**`[تصمیم]` تعداد لیوان‌ها:** دمو هشت لیوان ثابت داشت. در نسخهٔ تجاری **از هدف فعالیت خوانده می‌شود**. اگر هدف بزرگ‌تر از ۱۲ بود، نمایش به دو ردیف یا حالت فشرده تغییر می‌کند. `[نیازمند راستی‌آزمایی — OPEN-08]`

### قواعد سخت آب

| قاعده | منبع |
|---|---|
| مقدارها جمع نمی‌شوند؛ پیش‌نویس «مجموع اعلام‌شدهٔ روز» است | WTR-01 |
| «ثبت نهایی» ثانویه است، هرگز برجسته‌تر از افزودن مقدار | WTR-03 |
| پیش‌نویس هیچ بازخورد پاداشی تولید نمی‌کند | WTR-10 |
| «ثبت قطعی شد» فقط با پاسخ موفق بک‌اند | WTR-05 |
| روز جدید، پیش‌نویس جدید؛ انتقال خودکار مقدار دیروز ممنوع | WTR-07 |
| صفر فقط با انتخاب صریح کاربر؛ ثبت خودکار صفر ممنوع | WTR-06 |

| از بک‌اند | تعداد کل · مقدار پیش‌نویس · وضعیت · آیا قابل تغییر است · دلیل غیرفعالی |

---

## ۸) ویزارد حال — `.wiz`

**مصوب سند مادر: «تجربهٔ حال من از A» + `PD-007` و `PD-012`.**
ساختار و اجزای زیر **عیناً از 7B** است چون کامل‌ترین مرجع است و با ترتیب مصوب بخش ۱۱٫۲ می‌خواند.

### ۸.۱ ساختار

```html
<div class="card wiz">
  <div class="wiz-top">
    <div class="wdots">
      <button class="wdot on" data-w="1"><i class="num">۱</i><span>حال</span></button>
      …
    </div>
    <span class="wcount">قدم ۱ از ۵</span>
  </div>

  <div class="wstep on" data-step="1" data-type="mood">
    <div class="wstage">
      <div class="wvisual" style="background:var(--rose-soft)">
        <div class="hbox ghost" data-hbox></div>
      </div>
      <div class="wq">
        <h2>امروز چه حسی داری؟</h2>
        <p>اول از همه، حال کلی‌ات. نزدیک‌ترین چهره را انتخاب کن.</p>
        <div class="wopts">
          <button class="wopt" data-l="1"><span class="wo em" data-wo></span>خیلی بد</button>
          …
        </div>
      </div>
    </div>
  </div>

  <div class="wnav">
    <span class="mascot sm"><svg id="w-owl"><use href="#owl-think"/></svg></span>
    <div class="joma-msg"><div class="bubble">
      <div class="who">جوما</div><span id="w-bubble">…</span></div></div>
    <div class="btns">
      <button class="btn ghost" id="w-prev">قبلی</button>
      <button class="btn primary" id="w-next" disabled>بعدی</button>
    </div>
  </div>
</div>
```

### ۸.۲ پنج قدم — ترتیب مصوب بخش ۱۱٫۲

| قدم | `data-type` | سؤال | رنگ صحنه | تصویر |
|---|---|---|---|---|
| ۱ | `mood` | «امروز چه حسی داری؟» | `--rose-soft` | ایموجی بزرگ `😖 🙁 😐 🙂 😄` |
| ۲ | `energy` | «باتری امروزت چقدر شارژ دارد؟» | `--gold-soft` | **باتری SVG** که پرشدنش زیاد می‌شود |
| ۳ | `focus` | «تمرکزت چطور بود؟» | `--sky-soft` | **حلقه‌های هدف SVG** |
| ۴ | `sleep` | «خواب دیشب چطور بود؟» | `--indigo-soft` | **ماه یاسی + ستارهٔ طلایی** |
| ۵ | `stress` | «بادکنک استرست چقدر پف کرده؟» | `--coral-soft` | **بادکنک SVG** |
| ۶ | — | مرور نهایی + یادداشت | — | — |

**کد کامل `heroSVG`** در `reference/7B/notes.md` §۴.۴ و در `reference/7B/7B.html` خط ۱۵۶۱ موجود است و **باید عیناً استفاده شود**.

### ۸.۳ برچسب پنج گزینه

| شاخص | ۱ → ۵ |
|---|---|
| حال کلی | خیلی بد · خوب نیستم · معمولی · خوب · عالی |
| انرژی | خیلی کم · کم · متوسط · زیاد · پُر |
| تمرکز | خیلی سخت · سخت · متوسط · آسان · خیلی آسان |
| خواب | خیلی ضعیف · ضعیف · متوسط · خوب · عالی |
| استرس | خیلی کم · کم · متوسط · زیاد · خیلی زیاد |

**جهت استرس:** ۱ = استرس کم، ۵ = استرس زیاد. **باید با نگاشت بک‌اند تأیید شود** که همین جهت است. `[نیازمند راستی‌آزمایی]`

### ۸.۴ ۲۵ پیام موقعیتی

جدول کامل `WMSGS` در `reference/7B/7B.html` خط ۱۵۳۶ است. **عیناً استفاده شود.**
مثال برای استرس: «فشار زیادی امروز؛ صحنه را برای خودت نرم کن 🤍»

**`[تصمیم]`** این پیام‌ها متن ثابت فرانت‌اند، نه از بک‌اند — چون به «انتخاب کاربر در همان لحظه» وابسته‌اند نه به داده.

### ۸.۵ قواعد سخت ویزارد

| قاعده | منبع |
|---|---|
| **هیچ گزینه‌ای پیش‌انتخاب نمی‌شود.** `#w-next` تا انتخاب کاربر `disabled` است | REC-06 |
| برچسب متنی زیر هر گزینه الزامی است؛ ایموجی تنها کافی نیست | VI-08 |
| **دو سر مقیاس برچسب دارد** — نه فقط گزینه‌ها | ۱۹٫۱ |
| «بعداً» و «رد کردن» همیشه در دسترس | PD-007 |
| یادداشت **کاملاً اختیاری** و شرط کامل‌شدن ثبت نیست | REC-07 |
| ویرایش حال امروز ممکن است؛ حال روزهای گذشته نه | PD-012 |
| ثبت حال اختیاری است؛ نبودش ≠ خلق صفر | REC-06 |
| پیشروی خودکار پس از انتخاب: `950ms` | 7B |
| در مرور نهایی، چیپ‌های خلاصه قابل‌کلیک برای اصلاح | 7B |

| از بک‌اند | اینکه امروز ثبت شده یا نه · مقادیر موجود برای ویرایش · مجاز بودن ویرایش · نگاشت عددی هر شاخص |

---

## ۹) صحنهٔ همراه — `.pet-stage`

```css
.pet-stage { display:grid; place-items:center; cursor:pointer; user-select:none;
  background: linear-gradient(160deg, var(--lav-soft), var(--sky-soft));
  border-radius: var(--r-lg); transition: transform .25s }
.pet-stage:hover { transform: translateY(-4px) }
.pet-stage.pop { animation: pop .4s }
```

**اندازه‌ها:** فشرده `118×128` (در کارت خانه) · کامل `100% × 230px` (در صفحهٔ جوجهٔ من).

**مراحل:** `egg` تخم `#FFF7EA`/`#E5D5B4` · `crack` همان + ترک `#C9B387` با `.crack.show` + `wiggle` · `chick` جوجهٔ زرد 7A (`#FFD84D`, `#FFEDA8`, `#F5C22B`, `#F58E2D`).

### ۹.۱ چهار سنجهٔ مراقبت — `.psegs`

```html
<div class="pmeter">
  <span class="pe">💧</span>
  <div class="pl"><b>ظرف آب</b><small>با لیوان‌های آبِ تو</small></div>
  <div class="psegs" data-pk="water"><i class="on"></i><i></i><i></i></div>
</div>
```

```css
.psegs i { width:13px; height:13px; border-radius:4px; background:var(--ring-track); transition:background .3s }
.psegs i.on { background: linear-gradient(135deg, var(--brand), var(--brand2)) }
```

**سه بخش** — مطابق 7B. `[تصمیم]`

### ۹.۲ قواعد سخت همراه

| قاعده | منبع |
|---|---|
| وضعیت از **دادهٔ معتبر**؛ نه از رویداد کلیک | CAR-01 |
| پیش‌نویس آب پاداش نمی‌سازد | WTR-10 |
| کاربر بازگشته سرزنش نمی‌شود؛ چیزی جبران نمی‌کند | PD-008 |
| «هرگز نمی‌میرد» — پیام 7A تأیید می‌شود | 7A · PD-008 |
| جوجه جای ارزش اصلی محصول را نمی‌گیرد | CAR-04 |
| هیچ تهدید یا فشار روانی | ۱۰٫۱۰ |

**`[باز — OPEN-02..07]`** این‌ها هنوز تصمیم ندارند و **نباید با حدس پر شوند:**
شدت کاهش نیازها · رشد بر تعداد ثبت یا روزهای متفاوت · تعداد گام‌های تولد · وضعیت آغازین کاربران قدیمی · سقف پاداش · اثر ثبت با تأخیر.

| از بک‌اند | مرحله · نام · چهار سنجه · حالت ظاهری · متن وضعیت · درصد رشد |

---

## ۱۰) کارت بینش — `.insight-pop`

```css
.insight-pop {
  border: 2px solid transparent;
  background: linear-gradient(var(--card), var(--card)) padding-box,
              var(--grad) border-box;
  border-radius: var(--r); padding: 16px;
  display: flex; gap: 12px; align-items: flex-start;
  box-shadow: var(--sh2) }
```

**ساختار:** جغد `wink` + (`tag` نوع + تاریخ) + متن بینش + دکمهٔ «دفترچهٔ جوما ›»

**`[تصمیم]` مطابق `INS-03`:** کارت بینش **باید** داشته باشد:

- برچسب نوع: «یادآوری عمومی» / «ثبت امروزت» / «از ثبت‌های تو»
- تاریخ
- **تعداد نمونه:** «۲۱ جفت داده»
- **رابط شواهد:** دکمهٔ «این برداشت از کجا آمده؟»
- **جملهٔ عدم‌قطعیت:** «این همراهی به‌تنهایی علت را نشان نمی‌دهد.»

> **تفاوت با دموها:** 7A و 7B متن ثابت نمایش می‌دادند. سند مادر (`INS-02..04`, `OPEN-13`) شواهد و آستانهٔ واقعی می‌خواهد. کارت بازنویسی شده است.

| از بک‌اند | نوع · تاریخ · متن · تعداد نمونه · شواهد · وضعیت خوانده‌شدن |

---

## ۱۱) نمایش دادهٔ ناکافی — `.nodata`

**`AR-08`: جای خالی با صفر پر نمی‌شود.**

```html
<div class="card nodata">
  <b>برای این بازه هنوز دادهٔ کافی نیست</b>
  <p>«تحلیل موفقیت» و «مقایسه» وقتی معنا پیدا می‌کنند که چرخه‌های بیشتری بسته شود.</p>
</div>
```

**چهار وضعیت موتور، چهار متن:**

| کد | متن فارسی |
|---|---|
| `NO_DATA` | «برای این بازه هنوز چیزی ثبت نشده است.» |
| `NO_ELIGIBLE_CYCLES` | «هنوز چرخهٔ کاملی برای محاسبه وجود ندارد.» |
| `INSUFFICIENT_DATA` | «برای این بازه هنوز دادهٔ کافی نیست. با چند ثبت دیگر، مقایسه معنا پیدا می‌کند.» |
| `AMBIGUOUS_DUPLICATE` | «در یک روز، بیش از یک رخداد برای یک فعالیت پیدا شد. تا رفع ابهام، این چرخه در محاسبه لحاظ نمی‌شود.» |

**متن دقیق از بک‌اند می‌آید.** آنچه اینجا آمده، پیش‌فرض نمایش است اگر بک‌اند متن ندهد.

| از بک‌اند | کد وضعیت + متن توضیح + (اختیاری) اقدام پیشنهادی |

---

## ۱۲) نمودار سطح — `.spark`

SVG دستی، بدون کتابخانه. دو لایه:

- مسیر پرشده با `linearGradient` از `stop-opacity: .3` به `0`
- مسیر خطی با `stroke-width: 2.5; stroke-linecap: round`
- خطوط شبکهٔ افقی با کلاس `‎.gl‎`

**`[تصمیم]`** فرانت **فقط سری آماده را رسم می‌کند.** هیچ میانگین، نرمال‌سازی یا محاسبهٔ نقطه‌ای انجام نمی‌شود. اگر بک‌اند سری نداده باشد، به‌جای نمودار خالی، `.nodata` نمایش داده می‌شود.

| از بک‌اند | آرایهٔ نقاط + برچسب محورها + عنوان سری |

---

## ۱۳) هیت‌مپ — `.hm`

```css
.hm { display:grid; grid-template-columns:repeat(7,1fr); gap:5px }
.hm i { aspect-ratio:1; border-radius:7px }
```

پنج سطح رنگ از `--hm0` تا `--hm4` (کلاسیک: `#EAF2EA` → `#1F9663`).

سرستون روزهای هفته: `ش ی د س چ پ ج`
**راهنمای مقیاس الزامی:** «کم ← پررنگ ← زیاد»

**`[تصمیم]`** روز بدون داده، `--hm0` می‌گیرد و **در راهنما نوشته می‌شود که این «ثبت‌نشده» است، نه صفر.** (`AR-08`)

| از بک‌اند | سطح هر روز (۰ تا ۴) + متن راهنما |

---

## ۱۴) نشان — `.bdg`

```css
.badges { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; text-align:center }
.bdg { display:flex; flex-direction:column; align-items:center; gap:6px;
  padding:12px 6px; border-radius:14px; background: var(--brand-softer) }
.bdg .em { font-size:24px; filter:grayscale(1); opacity:.4; transition: filter .4s, opacity .4s }
.bdg b { font-size:9.5px; color:var(--ink-3); font-weight:800; line-height:1.6 }
.bdg.on { background: linear-gradient(150deg, var(--gold-soft), var(--brand-soft)); box-shadow: var(--shadow) }
.bdg.on .em { filter:none; opacity:1 }
.bdg.on b { color: var(--ink) }
```

در دسکتاپ `repeat(7, 1fr)` و در موبایل `repeat(4, 1fr)`.

**هفت نشان (از 7B):** `🌱 اولین قدم` · `💧 آبِ کامل` · `🔥 ۵ روز پیوسته` · `🧘 نفسی آرام` · `🌟 حالِ روشن` · `🏆 روزِ کامل` · `🐣 به دنیا آمد`

> **`[نیازمند راستی‌آزمایی]`** فهرست نهایی نشان‌ها، شرط کسب و اینکه امتیاز سمت بک‌اند است یا نه، در سند مادر مصوب نشده (`OPEN-06`). این هفت نشان از 7B است و **نمونه** است، نه فهرست نهایی.

| از بک‌اند | آیا کسب شده · شرط کسب (به زبان ساده) |

---

## ۱۵) توست — `.toast`

```css
.toast { position:fixed; bottom:26px; left:50%; transform:translateX(-50%) translateY(20px);
  z-index:600; background:var(--toast-bg); color:#fff; font-size:12.5px; font-weight:700;
  padding:8px 20px 8px 10px; border-radius:999px; opacity:0; pointer-events:none;
  transition:all .3s; box-shadow:0 10px 30px -10px rgba(0,0,0,.35);
  display:flex; align-items:center; gap:9px; max-width:min(480px,90vw) }
.toast.show { opacity:1; transform:translateX(-50%) }
```

جغد `cheer` ۲۸px + متن. ماند: `2.6s`.

**`[تصمیم]`** توست **فقط برای تأیید کوتاه** است، نه خطا. خطا درون‌خطی و نزدیک همان فیلد نمایش داده می‌شود.

---

## ۱۶) پوشش — `.ob-wrap` / `.breath-wrap`

```css
.ob-wrap { position:fixed; inset:0; z-index:500; display:grid; place-items:center;
  background: rgba(15,35,30,.45); padding:20px; backdrop-filter: blur(3px) }
.ob-card { max-width:400px; width:100%; padding:26px 24px; display:flex;
  flex-direction:column; align-items:center; gap:12px; text-align:center }
```

**کاربرد:** خوش‌آمد اول (`#onboard`) · جشن (`#party`) · تنفس (`#breath`).
**بستن:** با `Esc` و دکمهٔ واضح. `[تصمیم]` کلیک روی زمینهٔ تیره ببندد، مگر برای پنجرهٔ تأیید عملیات.

**`[تصمیم]`** پوشش‌های عملیات بازگشت‌ناپذیر (قطعی‌سازی آب) روی **سطح مات** می‌نشینند، نه شیشه (`14.2`).

---

## ۱۷) گزینهٔ تصویری — `.opt` / `.wopt`

```css
.opt { flex:1; padding:16px 4px 13px; border-radius:var(--r); border:2px solid var(--card-brd);
  background:var(--card); transition:.18s; display:flex; flex-direction:column;
  align-items:center; gap:8px }
.opt:hover { transform: translateY(-4px); box-shadow: var(--sh2) }
.opt.on { border-color: var(--brand); background: var(--grad-soft) }
.opt .em { font-size:34px; line-height:1 }
.opt .lb { font-size:11.5px; font-weight:800; color:var(--ink-2) }
```

**`[تصمیم]`** برای ۵ گزینه در موبایل: `grid-template-columns: repeat(3, 1fr)` (مطابق 7B) — سه تا در ردیف اول، دو تا در دوم.

---

## ۱۸) تنفس — `.breath` / `.bcircle`

```css
.bcircle { width:150px; height:150px; border-radius:50%; display:grid; place-items:center;
  color:#fff; font-weight:900; font-size:15px;
  background: radial-gradient(circle at 35% 30%, var(--brand2), var(--brand));
  box-shadow: 0 14px 40px -14px rgba(20,120,90,.6) }
```

**توالی (از 7B):** ۵ دوره · هر مرحله `4s` · `[دم ۱٫۳۵ → نگه ۱٫۳۵ → بازدم ۱]` مقیاس دایره.

**`[تصمیم]`** پایان تمرین **هیچ پاداشی نمی‌سازد** مگر بک‌اند ثبتش را تأیید کند. (`CAR-01`)

---

## ۱۹) جدول ثبت — `.trow` / `.thead` / `.tfoot`

از 7B برای «کارهای امروز» دسکتاپ:

```
[فعالیت و هدف] [مقدار انجام‌شده] [وضعیت] [›]
```

- `.thead` سرستون با متن `--fs-micro` و رنگ `--ink-3`
- `.trow` سطر با `border-bottom`
- `.tfoot` با نکتهٔ کوچک + دکمهٔ «ذخیرهٔ ثبت‌ها»

**`[تصمیم]`** در موبایل جدول به **`.act-row`** تبدیل می‌شود (عمودی). جدول افقی روی موبایل خوانا نیست.

---

## ۲۰) چیدمان پینترستی — `.pins` / `.pin`

```css
.pins { columns:3; column-gap:14px; margin-top:26px; text-align:right }
.pin { break-inside:avoid; margin-bottom:14px; overflow:hidden; transition:transform .2s, box-shadow .2s }
.pin:hover { transform: translateY(-5px) rotate(-.4deg); box-shadow: 0 18px 40px -16px rgba(20,60,45,.4) }
.pin .art { display:grid; place-items:center; height:158px }
.pin .cap { padding:12px 14px 14px }
```

هشت گرادینت هنری: `p1`..`p8` با مقادیر کامل در `reference/7B/7B.html` خط ~۹۰.

**کاربرد (بخش ۱۰٫۳):** کشف، کتابخانه و معرفی فعالیت‌ها.
**ممنوع:** فرم‌های ثبت و گزارش — آن‌ها نظم و ترتیب ثابت می‌خواهند.

---

## ۲۱) شکست‌های تصویری — چک‌لیست

پیش از تحویل هر صفحه:

- [ ] همهٔ رنگ‌ها از توکن‌های تم می‌آیند، نه عدد ثابت
- [ ] همهٔ شعاع‌ها از `--r-sm/--r/--r-lg/--r-pill`
- [ ] همهٔ اندازه‌های متن از مقیاس `--fs-*`
- [ ] هر ایموجی معنادار `aria-label` فارسی دارد
- [ ] هر کنترل غیرفعال، دلیل متنی دارد
- [ ] هر وضعیت، متن دارد نه فقط رنگ
- [ ] در تم شیشه، ورودی و پنل تأیید مات هستند
- [ ] `prefers-reduced-motion` و `prefers-reduced-transparency` تست شده
- [ ] هیچ متن انگلیسی، نام فیلد یا کد فنی در متن کاربر نیست
- [ ] اعداد رابط فارسی‌اند
