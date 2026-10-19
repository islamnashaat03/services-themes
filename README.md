# ثيمات موقع الخدمات — الدفعة الأولى

ثلاثة مواقع مستقلة بالعربية افتراضيًا، مع نسخة إنجليزية كاملة:
مكتب محاماة، عيادة طبية، وبورتفوليو إبداعي. كل موقع عمل استعراضي من تنفيذنا،
ولا يُنسب إلى عميل أو جهة حقيقية. التفاعلات داخل النماذج محلية ولا ترسل بيانات.

```sh
npm install
npm run build
npm test
npm run preview
```

المحاماة: http://127.0.0.1:4191/ — العيادة: http://127.0.0.1:4192/
البورتفوليو: http://127.0.0.1:4193/ . مسار /en/ للإنجليزية و/ar/ للعربية.

## النشر المستقل

المصدر: https://github.com/islamnashaat03/services-themes

النشر المعتمد GitHub Pages خارج الاستضافة المشتركة. مستودع المصدر واحد
للصيانة وإعادة الاستخدام، وثلاثة مستودعات تحتوي ملفات النشر فقط:

- showcase-law-firm → law.islamnashaat.com
- showcase-medical-clinic → clinic.islamnashaat.com
- showcase-creative-portfolio → folio.islamnashaat.com

للتحديث شغّل build وtest ثم `node scripts/github-publish.mjs` باستخدام حساب
GitHub المصرّح له عبر Git Credential Manager. لا توجد مفاتيح في المصدر.
فحص الشهادات: `node scripts/github-publish.mjs --status`، وتفعيل HTTPS
بعد إصدار الشهادة: `node scripts/github-publish.mjs --https`.

تغيير DNS مرة واحدة إلى islamnashaat03.github.io. لا تكرر سكربت DNS دون
مراجعة سجلات المنطقة والنسخة الاحتياطية. حجز الأسماء في GitHub يسبق الربط.

ناتج كل ثيم داخل dist/<theme-id> هو الجذر الكامل لموقع مستقل. ارفعه إلى
الصب دومين المخصص له؛ لا ترفع المجلد الأب أو السورس أو node_modules.
حدّث theme-origins.json بالرابط الفعلي ثم أعد البناء لإنتاج canonical/hreflang.
المواقع الاستعراضية تحمل noindex منعًا لفهرسة نشاط افتراضي كمكتب حقيقي.

## إعادة الاستخدام في موقعي

كل حزمة تحتوي theme-manifest.json بإصدار ثابت، لغات، ألوان، أقسام ومسارات
حقول المحتوى، وtheme-content/ar.json وen.json. ملفات Page تقبل content
مخصصًا بدل المحتوى الافتراضي. المستورد والمحرّر في موقعي لم يتم تنفيذهما بعد؛
المرحلة التالية تبني adapter يستعمل هذه البيانات مع حفظ نسخ المحتوى للمستخدم.
الحجز والدفع الفعليان إضافات مستقبلية، منفصلتان عن شكل الثيم.

الثيم الطبي وثيم المحاماة مشتقان من مكتبة template-library الموجودة في مساحة
العمل مع الاحتفاظ بمصادر الصور وتراخيص الخطوط. البورتفوليو جديد، ومرجعاه
البصريان داخل design/؛ تفاصيل الصور والـprompts في design/image-prompts.md.
