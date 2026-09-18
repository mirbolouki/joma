# 👈 از اینجا شروع کن — بستهٔ فرانت جوما (نسخهٔ ۲۴)

**۱) بستهٔ کامل را دانلود کن (کلیک = دانلود مستقیم):**
- **لینک اصلی:** https://codeload.github.com/mirbolouki/joma/zip/refs/tags/v24
- **لینک پشتیبان:** https://github.com/mirbolouki/joma/raw/v24/joma-frontend-v24.zip
- **صفحهٔ انتشار:** https://github.com/mirbolouki/joma/releases/tag/v24

**۲) فایل زیپ را اکسترکت کن.** داخلش این‌ها هست:
`START-HERE.md` (راهنمای گام‌به‌گام خودت) · `AGENT-PROMPT.md` (پرامپت کامل) · `SPEC/` (سند طراحی) · `FRONTEND/` (نمونهٔ زندهٔ ۱۹ صفحه) · `BOARD.html` (تابلوی تصمیم‌ها) · `HANDOFF/` (نامه‌های فنی).

**۳) راهنمای کامل گام‌به‌گام (بدون دانش فنی لازم):** [`docs/handoff/08-owner-step-by-step.md`](docs/handoff/08-owner-step-by-step.md)
**۴) پرامپت کامل ایجنت:** [`docs/handoff/07-agent-prompt-frontend.md`](docs/handoff/07-agent-prompt-frontend.md)

## سه قانون طلایی
۱. تا تو نگویی «تأیید است»، هیچ‌چیز روی **سایت اصلی** عوض نمی‌شود — اول تست روی **ساب‌دامین**.
۲. **بک‌اند، دیتابیس و سرور دست‌نخورده** می‌مانند؛ فرانت هیچ منطق دامنه‌ای ندارد.
۳. هیچ **حدسی** زده نمی‌شود: هر چیز نامعلوم → سؤال · هر ریسک → اعلام قبل از انجام · هر بسته → راهنمای گام‌به‌گام.

## 📍 وضعیت امروز (دور ۳۰)

- **سایت اصلی:** دست‌نخورده — تا «برو»ی تو.
- **روی ساب‌دامین تست — کارهای بک‌اند:** `B1`–`B5` (بازیابی رمز دو مرحله‌ای · گیت حال فقط «کارهای امروز» · بستن ثبت آینده · یادداشت خصوصی · جوجه با سه سنجه و نامِ جوجه) و تازه: `B6` **آب پیش‌نویس/قطعی** و `B7` **دفترچهٔ جوما با بینش و شواهد**. تنها مورد باقی: `B8`.
- **📦 v8 رسید (دور ۳۰):** «حال من» هر گزینه تصویر خودش + ریشهٔ واقعی ایراد لیوان — **تست دو موردی:** [`docs/handoff/27-round-30-v8-status.md`](docs/handoff/27-round-30-v8-status.md)
- **⛔ دستور مستقیم دور ۲۹ (تصویر گزینه‌های حال + دستگاه وضعیت آب):** [`docs/handoff/26-direct-fix-order-mood-water.md`](docs/handoff/26-direct-fix-order-mood-water.md)
- **📦 بستهٔ اصلاحی v7 رسید (دور ۲۸):** متن‌های تست حذف · تقویم پنج‌وضعیتی · دو تم · جغدها · آب — **چک‌لیست ۱۴ موردی تست + سه تصمیم:** [`docs/handoff/25-round-28-v7-status.md`](docs/handoff/25-round-28-v7-status.md)
- **🎨 دو تم (کلاسیک/شیشه) — مورد `A9` + گالری مرجع:** [`docs/theme-gallery.html`](docs/theme-gallery.html) · **🦉 گالری جغد:** [`docs/owl-gallery.html`](docs/owl-gallery.html)
- **🦉 مکمل دور ۲۷ — جغدها و جاروب کامل جزئیات (`A8`):** [`docs/handoff/24-owl-and-asset-sweep.md`](docs/handoff/24-owl-and-asset-sweep.md)
- **🛠 دستور اصلاح دور ۲۷ (دو الزام مالک + پاسخ ۱۲ سؤال):** [`docs/handoff/23-owner-revision-order-round-27.md`](docs/handoff/23-owner-revision-order-round-27.md)
- **📋 چک‌لیست بازبینی v6 (برای ایجنت — خودش کمبودها را پیدا کند و گزارش بدهد):** [`docs/handoff/22-gap-audit-checklist.md`](docs/handoff/22-gap-audit-checklist.md)
- **🏁 بستهٔ نهایی v6 رسید (دور ۲۶):** چهار فاز + ۹ ایراد + تقویم + `B6`/`B7`/`B8` در **یک بسته** — نوبت **تست یک‌جای مالک**: [`docs/handoff/21-owner-final-test-steps.md`](docs/handoff/21-owner-final-test-steps.md)
- **ساخت فرانت:** بستهٔ نهایی **v6** تحویل شد (چهار فاز کامل) — چک‌لیست فازها: [`docs/handoff/17-frontend-phases-checklist.md`](docs/handoff/17-frontend-phases-checklist.md)
- **گزارش این دور:** [`docs/handoff/18-round-24-backend-status.md`](docs/handoff/18-round-24-backend-status.md) · چک‌لیست تست: [`docs/handoff/12-test-deploy-status.md`](docs/handoff/12-test-deploy-status.md)
- **راهنمای آپلود روی ساب‌دامین:** [`docs/handoff/14-click-guide-test-subdomain.md`](docs/handoff/14-click-guide-test-subdomain.md)
- **سفارش نهایی مالک (دور ۲۵):** «همهٔ مراحل + همهٔ ایرادها در **یک بسته**؛ من یک‌بار تست می‌کنم» → متن آماده: [`docs/handoff/20-final-package-order.md`](docs/handoff/20-final-package-order.md)
- **از تو یک چیز:** یک خط تأیید برای «قاعدهٔ آب» (پیش‌نویس تا «ثبت نهایی» شمرده نشود) + انتخاب قدم بعدیِ بک‌اند (`B8` پیشنهاد ما).
