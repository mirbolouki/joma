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

## 📍 وضعیت امروز (دور ۲۴)

- **سایت اصلی:** دست‌نخورده — تا «برو»ی تو.
- **روی ساب‌دامین تست — کارهای بک‌اند:** `B1`–`B5` (بازیابی رمز دو مرحله‌ای · گیت حال فقط «کارهای امروز» · بستن ثبت آینده · یادداشت خصوصی · جوجه با سه سنجه و نامِ جوجه) و تازه: `B6` **آب پیش‌نویس/قطعی** و `B7` **دفترچهٔ جوما با بینش و شواهد**. تنها مورد باقی: `B8`.
- **ساخت فرانت:** فاز ۱ (اسکلت) تحویل و نصب شد · فاز ۲ (ورود/ثبت‌نام/بازیابی) در ساخت — چک‌لیست هر فاز: [`docs/handoff/17-frontend-phases-checklist.md`](docs/handoff/17-frontend-phases-checklist.md)
- **گزارش این دور:** [`docs/handoff/18-round-24-backend-status.md`](docs/handoff/18-round-24-backend-status.md) · چک‌لیست تست: [`docs/handoff/12-test-deploy-status.md`](docs/handoff/12-test-deploy-status.md)
- **راهنمای آپلود روی ساب‌دامین:** [`docs/handoff/14-click-guide-test-subdomain.md`](docs/handoff/14-click-guide-test-subdomain.md)
- **از تو یک چیز:** یک خط تأیید برای «قاعدهٔ آب» (پیش‌نویس تا «ثبت نهایی» شمرده نشود) + انتخاب قدم بعدیِ بک‌اند (`B8` پیشنهاد ما).
