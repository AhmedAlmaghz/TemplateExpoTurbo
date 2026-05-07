اريد بناء تمبلت سقالة جاهز ليكون اساس لأي تطبيق Expo & React Native مستقبلي بحيث ما على المطور إلا كتابة وحدات تطبيقه المختلفة بدون الحاجة إلى كتابة الوحدات الأساسية  للتطبيق وهي كالتالي 
1- إعداد التطبيق بأحدث الإصدارات من التبعيات والتقنيات المتوافقة مع Expo >+54 & React Native .
2- إعدادات الإختبارات والتطبيق .
3- نظام التصميم المركزي والثيم المتعدد
4- نظام الترجمات الاحترافي متعدد اللغات (إفتراضي عربي + إنجليزي) مع التوطين وإعتماد الاتجاهات حسب اللغة RTL and LTR .
5- المصادقة والاستيثاق المتعدد  محلي , كلاود (إفتراضي سوبابيس ) ويمكن إضافة المزيد.. وعمل إعدادات بذلك وإدارة الجلسات والتوكن
6- قاعدة البيانات المحلية أولاً WaterMelonDB  أو الكلاود PostgreSQL أو كليهما والمزامنة بينهما  وعمل إعدادات بذلك .واستخدام Drizzle ORM for PostgreSQL .
7- تخطيط وتصميم الواجهة الرئيسية  وشريط التنقل الرئيسي الأسفل  والهيدر مع أيقونة البحث والاشعارات وقائمة المنسدلة لأفتار المستخدم وتسجيل الدخول والخروج والمستخدم الجديد وتغيير اللغة والثيم
8- عمل قائمة وصفحات إفتراضية خاصة بالإعدادت والبروفايل وتغيير كلمة المرور وغيرها
8- إنشاء Core/Shared  لجميع التطبيق .
9-  إنشاء مجموعة واسعة من المكونات المشتركة المشهورة لإستخدامها في التطبيق والوحدات اللاحقة بحيث تعتمد نظام التصميم المركزي
10- إستخدام خطوط جميلة وعصرية وكذلك أيقونات جميلة وعصرية وتوحيد المظهر والخطوط وغيره في كل التطبيق
11- عمل إعدادات للتمبلت لتخصيصه لإي تطبيق مستقبلي بدون تغيير أي شي
12- عمل نظام الاشعارات المحلي  والكلاود عبر FMC 

أريد التمبلت إحترافي وجميل وعصري وقوي ومتين وسهل التطوير والصيانة والإستخدام ووفق أفضل الممارسات والأساليب ويلبي اقوى معايير الأمان والأداء العالي والسريع .

===================================================================

فيما يلي “مواصفات + مخطط بناء” لتمبلت/سقالة احترافية (Expo SDK 54+ وReact Native) تكون أساسًا لأي تطبيق لاحق، بحيث يضيف المطوّر وحدات التطبيق فقط بدون إعادة بناء الأساسيات. سأقترح Stack عملي ومتوافق مع Expo، مع مراعاة الأمان/الأداء/قابلية التوسّع، وأشير بوضوح للأجزاء التي تتطلب **Dev Client** (لأن WatermelonDB وMMKV عادة لا تعمل داخل Expo Go).

---

## 0) قرارات معمارية أساسية (أوصي بها للتمبلت)
### نمط المشروع
- **Monorepo (pnpm workspaces + Turborepo اختياري)** لتخدم:
  - `apps/mobile` (Expo)
  - `packages/ui` (Design System + مكونات مشتركة)
  - `packages/shared` (types, utils, validation, constants)
  - `packages/db` (Drizzle schema + migrations لـ PostgreSQL/Supabase)

هذا يجعل التمبلت “قابل لإعادة الاستخدام” لمشاريع كثيرة بدون تكرار.

### نمط التطبيق (Feature-based)
داخل تطبيق الموبايل: كل ميزة Feature معزولة (screens, api, hooks, components, tests)، بينما الأساسيات في `core`.

---

## 1) أحدث التقنيات المتوافقة مع Expo SDK 54+ وRN
### أساسيات
- Expo SDK 54+
- React Native (المرافق لـ Expo 54)
- TypeScript (strict)
- **expo-router** للمسارات والتنقل (مع Tabs/Stacks جاهزة)
- React Native Reanimated + Gesture Handler (للـ UI الحديث)
- Hermes مفعّل (افتراضيًا غالبًا) + تهيئة الأداء

### مكتبات مقترحة “قياسية” للتمبلت
- State:
  - **Zustand** (خفيف وسريع) للـ local UI state
  - **TanStack Query** للبيانات من السيرفر والكاش والـ retries
- Forms/Validation:
  - `react-hook-form` + `zod`
- Networking:
  - `ky` أو `axios` (أنا أميل لـ `ky` خفيف) + طبقة `core/http`
- Logging/Monitoring:
  - Sentry (اختياري لكن احترافي جدًا)

> ملاحظة: سنبني التمبلت على **Dev Client** لأنك طلبت WatermelonDB + خيارات متقدمة.

---

## 2) إعدادات الاختبارات (Tests) والتطبيق
### Unit/Integration
- Jest + React Native Testing Library
- MSW (Mock Service Worker) لعمل mock لطلبات الشبكة (على Node test env)
- تغطية (coverage) + تقارير

### E2E (اختياري لكن قوي)
- **Maestro** (سهل الإعداد مع Expo Dev Client)
- أو Detox (أثقل قليلًا)

### جودة كود وCI
- ESLint + Prettier + TypeScript strict
- Husky + lint-staged (قبل الـ commit)
- GitHub Actions:
  - lint + test
  - (اختياري) build عبر EAS

---

## 3) نظام تصميم مركزي + ثيم متعدد
أقترح فصل التصميم في `packages/ui`:
- **Tokens**: ألوان، مسافات، Radii، Typo scale، Shadows
- Themes: `light / dark / (brandA / brandB...)`
- Provider واحد: `DesignSystemProvider`

مكونات أساسية مبنية على التوكنز (قابلة لإعادة الاستخدام):
- `Text`, `Heading`
- `Button`, `IconButton`
- `Input`, `TextArea`, `PasswordInput`
- `Card`, `Divider`
- `Avatar`
- `Badge`
- `Toast/Snackbar`
- `EmptyState`, `ErrorState`, `Skeleton`
- `BottomSheet`, `Modal`
- `AppHeader` (الهيدر الموحد)
- `AppTabs` styling

> تنفيذ الثيم يتم عبر Zustand + Persist (لتخزين اختيار المستخدم) مع احترام إعدادات النظام (System theme).

---

## 4) نظام ترجمة احترافي + RTL/LTR
- i18n: **i18next + react-i18next**
- اكتشاف اللغة: `expo-localization`
- تخزين اختيار المستخدم: (MMKV أو SecureStore/AsyncStorage حسب قرارك)
- لغات افتراضية: **ar + en**
- توطين:
  - أرقام/تاريخ: `dayjs` مع locales أو `Intl` (حسب الدعم)
- الاتجاه:
  - عند تغيير اللغة بين RTL/LTR:
    - `I18nManager.forceRTL(true/false)`
    - ثم `Updates.reloadAsync()` (لأن تبديل RTL غالبًا يتطلب إعادة تشغيل)

هيكل ملفات الترجمة:
- `apps/mobile/src/core/i18n/locales/ar/common.json`
- `apps/mobile/src/core/i18n/locales/en/common.json`
مع namespaces (auth, settings, profile, errors…) لتفادي ملف ضخم واحد.

---

## 5) المصادقة (محلي + Cloud افتراضي Supabase) + إدارة الجلسات والتوكن
### تصميم قابل للإضافة (Pluggable Auth)
داخل `core/auth`:
- `AuthProvider` interface
- Providers:
  - `SupabaseAuthProvider` (افتراضي)
  - `LocalAuthProvider` (للاستخدام دون سيرفر/للتجارب)
  - قابل لإضافة (Firebase Auth / Cognito / custom)

### Supabase (افتراضي)
- Session management:
  - حفظ refresh/access tokens في **expo-secure-store**
  - Auto refresh session
  - Listener لتغير الجلسة
- سياسات أمان:
  - تفعيل **RLS** على جداول Postgres
  - استعمال Policies per user
  - منع تسريب الأخطاء الحساسة في الإنتاج
- شاشات جاهزة:
  - Login / Register / Forgot Password
  - Change Password
  - Logout
  - (اختياري) Social login حسب إعداد Supabase

---

## 6) قاعدة بيانات Local-first (WatermelonDB) + PostgreSQL + Drizzle + Sync
### مهم جدًا (واقعية Expo)
- **WatermelonDB** يتطلب Native modules ⇒ يعني:
  - لن يعمل على Expo Go
  - يعمل على **Dev Client + EAS Build** (مناسب لتمبلت احترافي)

### طبقة البيانات المقترحة
داخل `core/data`:
- `local/` (WatermelonDB):
  - schema + models + migrations
  - repositories (CRUD)
- `remote/`:
  - supabase client + typed queries
- `sync/`:
  - `pull()` و `push()` مع “lastSyncedAt”
  - استراتيجية حل التعارضات (آخر تعديل/أولوية السيرفر/أولوية الجهاز… قابلة للتغيير)
- `repositories/`:
  - Repository موحّد يقرأ محليًا أولاً ثم يزامن

### Drizzle ORM لـ PostgreSQL (كمكانه الصحيح)
Drizzle عمليًا يُستخدم على **الخلفية/السيرفر/Edge Functions** وليس داخل تطبيق RN مباشرة.
لذلك بالتمبلت:
- `packages/db`:
  - Drizzle schema
  - migrations
  - توليد Types مشتركة (تُستهلك في الموبايل عبر `packages/shared`)

ومع Supabase:
- إمّا استخدام Drizzle لإدارة schema ثم دفع migrations إلى Supabase
- أو دمج Drizzle مع Edge Function (Node) لعمليات معقدة

---

## 7) تخطيط الواجهة الرئيسية: Tabs + Header موحد
باستخدام `expo-router`:
- Tabs (أسفل):
  - Home
  - Search
  - Notifications
  - Settings
- Header موحد `AppHeader`:
  - يسار: (اختياري) زر رجوع/قائمة
  - وسط: عنوان
  - يمين:
    - أيقونة بحث
    - أيقونة إشعارات مع badge
    - Avatar يفتح قائمة (BottomSheet/Menu)

قائمة الـ Avatar:
- Profile
- Login/Logout (حسب الحالة)
- Create account (إن لم يسجّل)
- Change Language
- Theme switcher
- (اختياري) “Admin/Debug” في dev فقط

---

## 8) صفحات افتراضية للإعدادات والبروفايل والأمان
Routes جاهزة:
- Settings (قائمة)
  - Profile
  - Account & Security
    - Change Password
    - Sessions (اختياري)
  - Language
  - Theme
  - Notifications preferences
  - About / Terms / Privacy

كل شاشة مرتبطة بـ core services (auth/i18n/theme/notifications).

---

## 9) إنشاء Core/Shared شامل
اقتراح هيكلة:

### `apps/mobile/src/core`
- `config/` (env, constants, feature flags)
- `theme/`
- `i18n/`
- `auth/`
- `http/` (client + interceptors + error mapping)
- `data/` (local/remote/sync)
- `notifications/`
- `analytics/` (اختياري)
- `errors/` (AppError, mapping, error boundaries)
- `security/` (secure storage, helpers)

### `apps/mobile/src/shared`
- `components/` (استخدام مكونات `packages/ui` أو تغليفها)
- `hooks/`
- `utils/`
- `types/`

---

## 10) خطوط وأيقونات موحّدة وحديثة
- Fonts:
  - English: **Inter**
  - Arabic: **Cairo** أو **Tajawal** (حسب ذوقك)
- تحميل عبر `expo-font` + ربطها بنظام الـ Typography داخل theme
- Icons:
  - `lucide-react-native` (شكل عصري وموحّد)
  - أو `@expo/vector-icons` (واسع الانتشار)

---

## 11) إعدادات التمبلت لتخصيصه لأي تطبيق بدون تعديل “الأساس”
### ملف إعداد مركزي
- `app.config.ts` يقرأ من `.env`:
  - APP_NAME, SLUG, SCHEME
  - BUNDLE_ID / PACKAGE_NAME
  - SUPABASE_URL / SUPABASE_ANON_KEY
  - SENTRY_DSN …
- سكربت تهيئة مشروع جديد:
  - `pnpm template:init`:
    - يغير الاسم/المعرفات
    - يحدث `app.json/app.config.ts`
    - يحدث `ios.bundleIdentifier` و`android.package`
    - يستبدل اسم المجلدات/الـ scheme
- Feature flags:
  - تفعيل/تعطيل Watermelon sync, FCM, Sentry… بدون حذف الكود

---

## 12) نظام الإشعارات: Local + Cloud عبر FCM
### Local Notifications
- عبر `expo-notifications`:
  - scheduling
  - channels على Android
  - permissions flow

### Push Notifications (FCM)
يوجد مساران:
1) **Expo Notifications مع FCM credentials** (الأبسط داخل Expo)
   - يعطيك push token (Expo) غالبًا، لكن يعتمد على FCM/APNs تحت الغطاء
2) **Firebase Messaging مباشر** (`@react-native-firebase/messaging`)
   - أقوى وتحكم أكبر (topics, advanced handling)
   - لكنه يتطلب native setup وDev Client (غالبًا مناسب لتمبلتك)

التمبلت يمكنه دعم الاثنين بخيار في `core/notifications/providers`.

تخزين device tokens:
- جدول في Supabase (مثلاً `device_tokens`)
- ربطه بالمستخدم + platform + last_seen
- إرسال من سيرفرك/Edge Function باستخدام Firebase Admin SDK أو مزود إشعارات

---

## مخرجات التمبلت (Deliverables) المقترحة
1) Repo جاهز كـ Template
2) تطبيق يعمل “End-to-End”:
   - تغيير ثيم + لغة + RTL
   - تسجيل دخول Supabase
   - شاشات Settings/Profile
   - Local DB (Watermelon) + مثال Sync (skeleton)
   - Notifications local + push skeleton
3) توثيق قوي:
   - README (تشغيل/بناء/نشر)
   - Architecture docs
   - “How to add a new feature module”
4) Generator للوحدات (Plop/Hygen):
   - ينشئ Feature جديدة مع (screen + api + tests + translations)

---

## نقاط مهمة قبل البدء (لتفادي قرارات خاطئة)
أحتاج منك 5 إجابات سريعة (اختيارات) لأضبط التصميم النهائي للتمبلت:

1) هل تقبل أن التمبلت **لن يعمل على Expo Go** وسيعتمد على **Dev Client + EAS**؟ (مهم بسبب WatermelonDB/FCM/ممكيڤ)
2) في الـ UI: تفضّل Design System مبني على  
   - (A) Shopify Restyle (خفيف ومرن)  
   - (B) Tamagui (قوي جدًا لكن أثقل)  
   - (C) NativeWind (Tailwind-like)
3) Push: هل تريد FCM “مباشر” عبر `react-native-firebase` أم يكفي `expo-notifications` مع إعداد FCM؟
4) Sync: هل تفضّل سياسة تعارضات (server-wins) أم (client-wins) أم (last-write-wins)؟
5) هل تريد Monorepo (موصى به) أم مشروع Expo واحد فقط؟

إذا أجبت عليها، أكتب لك بعدها **هيكل المجلدات النهائي + قائمة التبعيات الدقيقة + سكربتات pnpm + ملفات إعداد جاهزة (نماذج)** بحيث يمكنك البدء فورًا وبناء التمبلت خطوة بخطوة.

========================================================================

إعمل الأفضل والاقوى واتره مناسب ويخدم المشروع للمستقبل وفق  افضل الممارسات ,احدث الأساليب

========================================================================

سأختار لك “الأفضل والأقوى” فعلاً على مستوى: القابلية للتوسع + الأداء + الأمان + سهولة الصيانة + دعم المستقبل، حتى لو تطلّب ذلك **Dev Client + EAS** (وهذا طبيعي لتمبلت احترافي لأن WatermelonDB وFCM المباشر لا يعملان على Expo Go).

## 1) قرارات تقنية نهائية (Best-practice Defaults)
### أسلوب المشروع
- **Monorepo (pnpm workspaces) + Turborepo**: أقوى خيار للمستقبل، ويفصل الـ UI/Shared/DB عن تطبيق الموبايل.
- **Expo SDK 54+ + expo-router** (أفضل نمط تنقل حديث ومناسب للتمبلت).
- **TypeScript (strict)** + ESLint/Prettier + CI.

### UI / Design System
- **Design System مخصص داخل `packages/ui`** مبني على Tokens + Themes.
- تنفيذ UI: أوصي بـ **Shopify Restyle** (قوي، مرن، خفيف، وسهل صيانة على المدى الطويل) + Reanimated.
- Icons: **lucide-react-native** (عصري وموحّد).
- Fonts: **Inter (EN)** + **Cairo (AR)** وتوحيد typographic scale.

### البيانات والحالة
- Server state: **TanStack Query**
- Local state: **Zustand**
- Forms: `react-hook-form` + `zod`

### Auth
- افتراضي: **Supabase Auth** مع إدارة جلسات وتوكنات وتخزين آمن.
- تصميم Plug-in يسمح بإضافة مزودين آخرين لاحقاً بدون تغيير بنية المشروع.

### قاعدة البيانات Local-first + Cloud
- Local DB: **WatermelonDB** (أداء ممتاز للبيانات الكبيرة + Offline-first)
- Cloud DB: **PostgreSQL عبر Supabase**
- Schema/ORM للمستقبل: **Drizzle ORM + drizzle-kit** ضمن `packages/db` لإدارة مخطط Postgres وmigrations بشكل احترافي.
- Sync: طبقة مزامنة (Pull/Push) قابلة للتطوير مع سياسة تعارضات افتراضيًا **Server-Authoritative + updated_at** (أكثر أماناً واتساقاً).

### التخزين
- سريع: **react-native-mmkv** لتفضيلات (theme/language…)
- حساس: **expo-secure-store** للتوكنات/الجلسات

### الإشعارات
- Local: `expo-notifications`
- Push قوي ومستقبلي: **FCM مباشر عبر `@react-native-firebase/messaging`** (يتطلب Dev Client/EAS) + خدمة إرسال (Supabase Edge Function أو سيرفر) باستخدام Firebase Admin SDK.

---

## 2) هيكل المجلدات النهائي (Enterprise-ready)
```txt
repo/
  apps/
    mobile/                       # Expo app
      app/                        # expo-router routes
        (tabs)/
          home.tsx
          search.tsx
          notifications.tsx
          settings.tsx
        auth/
          login.tsx
          register.tsx
          forgot-password.tsx
        profile/
          index.tsx
          change-password.tsx
        _layout.tsx
      src/
        core/
          config/                 # env, constants, feature flags
          theme/                  # tokens, themes, provider
          i18n/                   # i18next setup + locales
          auth/                   # providers + session management
          http/                   # ky client + interceptors + error mapping
          data/
            local/                # WatermelonDB schema/models/migrations
            remote/               # supabase client + typed access
            sync/                 # pull/push + conflict strategy
            repositories/         # unified repos
          notifications/          # local + FCM providers
          security/               # secure storage, helpers
          errors/                 # AppError + boundaries
        shared/
          hooks/
          utils/
          types/
      assets/
        fonts/
      app.config.ts
      eas.json
  packages/
    ui/                           # Design system + shared components
      src/
        tokens/
        themes/
        components/
        index.ts
    shared/                       # types, validation schemas, constants
      src/
    db/                           # Drizzle schema + migrations for Postgres
      src/
        schema.ts
      drizzle/
  supabase/                       # (اختياري) migrations/edge functions
  .github/workflows/ci.yml
  turbo.json
  pnpm-workspace.yaml
```

---

## 3) الميزات الجاهزة “Out of the box” التي ستأخذها في التمبلت
1) **تهيئة Expo/RN بأحدث المتوافق** + إعدادات Hermes + expo-updates (قنوات نشر).
2) **اختبارات**:
   - Jest + React Native Testing Library + MSW
   - Maestro لـ E2E (اختياري لكن موصى به)
3) **Design System مركزي**:
   - Tokens + Themes + دعم dark/light + قابل لإضافة ثيمات brand لاحقًا.
4) **ترجمة احترافية**:
   - i18next (ar/en) + تخزين اللغة + RTL/LTR تلقائي + إعادة تحميل عند التبديل.
5) **مصادقة Supabase**:
   - Login/Register/Forgot/Change password + إدارة session + secure storage.
6) **WatermelonDB Local-first**:
   - أمثلة Models + Repository pattern + أساس Sync layer.
7) **UI جاهز**:
   - Tabs + Header موحّد + Search/Notifications icons + Avatar menu (BottomSheet).
8) **Settings/Profile** جاهزة:
   - اللغة، الثيم، الحساب، الأمان، تسجيل الخروج…
9) **Core/Shared** مع فصل واضح بين (core services) و(shared helpers).
10) **خطوط وأيقونات موحّدة** ومظهر عصري.
11) **قابلية تخصيص بدون لمس الأساس**:
   - عبر `app.config.ts` + `.env` + feature flags + سكربت init.
12) **Notifications**:
   - Local notifications + هيكل Push عبر FCM مع Token registration.

---

## 4) معايير الأمان والأداء (Defaults داخل التمبلت)
### الأمان
- Supabase RLS مفعل + سياسات واضحة per-user
- توكنات في SecureStore
- Error mapping يمنع تسريب تفاصيل حساسة في الإنتاج
- فصل بيئات `.env` (dev/staging/prod) + EAS secrets
- (اختياري) Certificate pinning لاحقًا إذا احتجته (يتطلب native)

### الأداء
- WatermelonDB للبيانات الكبيرة
- expo-image للصور (أداء أفضل)
- FlashList للقوائم الثقيلة
- TanStack Query للكاش وتقليل الطلبات
- تقسيم المكونات + memoization + شاشة Skeletons

---

## 5) الخطوة التالية (حتى أبدأ أعطيك ملفات جاهزة بدقة)
حتى أكتب لك “قائمة dependencies النهائية” وملفات إعداد جاهزة (package.json scripts / app.config.ts / i18n setup / theme provider / auth provider / router layout / notification setup)، فقط أكد لي نقطتين لأنهما تؤثران على التنفيذ:

1) هل تريد دعم **Web** ضمن Expo أم Mobile فقط؟ (بعض اختيارات UI والتخزين تختلف)
2) في Sync بين WatermelonDB وPostgres: هل تريدها **عامّة كـ framework داخل التمبلت** (مع مثال كامل على جدولين) أم “Skeleton قوي” قابل للتوسعة (أسرع وأفضل كبداية)؟

إذا أجبت، سأزوّدك مباشرة بـ:
- dependencies لكل workspace
- سكربتات pnpm/turbo
- ملفات config الأساسية
- كود جاهز: Theme + i18n (RTL) + Auth (Supabase) + Tabs/Header + Settings/Profile + Notifications providers
- Generator لوحدات features (Hygen) بحيث ينشئ لك Feature كاملة مع tests وترجمات تلقائيًا.

=======================================================================
دعم Web ضمن Expo.
في Sync بين WatermelonDB وPostgres: ما هو افضل للتطبيق 
========================================================================

## دعم Web ضمن Expo + WatermelonDB: الواقع الأفضل
بما أنك تريد **Expo Web** مع **Local-first**:

- **WatermelonDB على iOS/Android**: ممتازة ومستقرة (لكن تحتاج Dev Client/EAS).
- **WatermelonDB على Web**: لا يوجد دعم SQLite مثل الموبايل؛ الخيار العملي هو **Adapter LokiJS (IndexedDB تحت الغطاء)**. يعمل، لكنه **أقل نضجًا** من موبايل من ناحية الأداء/الحواف (edge cases).

لذلك “الأفضل للمستقبل” هو أن نبني **طبقة بيانات موحّدة (Repository + Sync Engine)** مع **Adapters حسب المنصة**:
- Native Adapter: WatermelonDB (SQLite)
- Web Adapter: WatermelonDB LokiJS (أو بديل IndexedDB)  
مع بقاء نفس واجهة الاستخدام للمطور داخل Features.

هذا يعطيك Web بدون تكسير المعمارية، ويضمن أن المطور “يكتب وحدته” بدون التفكير بالمنصة.

---

## سؤالك: Sync بين WatermelonDB وPostgres (Supabase) — ما الأفضل؟
**أفضل حل عملي واحترافي لمعظم التطبيقات**:  
### “Sync Engine قوي (Framework primitives) + Reference Implementation”  
وليس “محرك مزامنة عام لكل الحالات” داخل التمبلت.

السبب: المزامنة 100% عامة تصبح معقدة جدًا وتفقد التحكم (صلاحيات، تعارضات، قواعد أعمال domain). بينما الأفضل هو:
- نبني **أساس sync صحيح ومتين** (قابل للتوسع)
- ونضع **مثالين كاملين** على جدول/جدولين (مثلاً: `notes`, `tasks`)
- وبقية الجداول يضيفها المطور بنفس النمط بسرعة

هذا يخدم المستقبل أكثر من “حل سحري عام” غالبًا سيتكسر عند أول مشروع حقيقي.

---

## مواصفات “أفضل Sync” (الذي سأعتمده في التمبلت)
### 1) Incremental Sync (Pull/Push) مع Timestamp
نستخدم بروتوكول WatermelonDB Sync (الموصى به من Watermelon):
- **Pull**: السيرفر يرجع تغييرات منذ `lastPulledAt`
- **Push**: العميل يرسل تغييرات محلية (created/updated/deleted)

صيغة رد الـ Pull القياسية:
```json
{
  "changes": {
    "notes": { "created": [], "updated": [], "deleted": [] },
    "tasks": { "created": [], "updated": [], "deleted": [] }
  },
  "timestamp": 1710000000000
}
```

### 2) تصميم جداول Postgres “صديق للمزامنة”
لكل جدول تتم مزامنته:
- `id` (UUID) — نفس المعرف على الجهاز والسيرفر
- `user_id` (المالك) + Index
- `created_at`, `updated_at` (بتحديث تلقائي/trigger)
- `deleted_at` (Soft delete) لإرسال “tombstones” في pull
- (مهم جدًا) `version` (integer) للمنافسة/التعارضات **Optimistic Concurrency**

### 3) سياسة تعارضات هي الأفضل عمليًا
أقترح الافتراضي التالي لأنه الأكثر اتزانًا:
- **Optimistic concurrency بالـ `version`**
- عند push:
  - إذا `version` على السيرفر لا يطابق “baseVersion” القادم من العميل ⇒ Conflict
  - يرجع السيرفر “conflict response”
  - العميل يعمل **re-pull** ثم يعيد تطبيق التغيير (أو يطلب تدخل المستخدم حسب نوع البيانات)

هذا أقوى من “آخر تعديل يفوز (LWW)” لأنه يمنع ضياع تعديلات بدون قصد، ومع ذلك لا يفرض تعقيد عالي مثل CRDT.

> للبيانات البسيطة (مثل preferences) يمكن السماح بـ LWW كاستثناء.

### 4) أين تُنفذ المزامنة على Supabase؟
الأفضل: **Supabase Edge Functions**
- `POST /sync/pull`
- `POST /sync/push`

وتنفيذ العمليات على Postgres عبر:
- Drizzle (على السيرفر داخل edge function) + معاملات Transaction
- تحقق صارم بـ Zod (validation)
- صلاحيات: function تستخدم service role، لكن تتحقق يدويًا من user وتطبق قواعد الملكية (ولا تعتمد على العميل أبدًا)

### 5) الأداء (Best practices)
- Pull/Push على دفعات (chunking) عند كبر البيانات
- ضغط payload (إن أمكن عبر gateway/edge)
- جدولة sync:
  - عند فتح التطبيق
  - عند عودة الاتصال
  - كل X دقائق (اختياري)
- Backoff + retries مدروسة
- Queue للتغييرات (Outbox) + منع تكرار الإرسال

---

## ماذا عن Web مع Sync؟
يظل نفس الـ Sync Engine. الفرق فقط في Local Adapter:
- على الموبايل WatermelonDB SQLite ممتاز
- على الويب LokiJS/IndexedDB: جيد لمعظم الاستخدامات، لكن لو تطبيقك “ثقيل بيانات جدًا” على الويب، قد نفكر لاحقًا بتقوية جانب الويب (مثلاً تخزين IndexedDB مخصص)

---

## الخلاصة: القرار الذي سأعتمده كـ “الأفضل”
- **نبني Sync Engine قوي كـ Core Module** (pull/push + versioning + soft delete + conflict handling + retries)
- مع **Reference Implementation كاملة** على جدولين
- مع **Adapters للمنصات** (Native Watermelon + Web LokiJS)
- وDrizzle ORM يكون **مصدر الحقيقة لمخطط Postgres** (migrations/types) داخل `packages/db`

إذا تريد، الخطوة التالية أكتب لك:
1) مخطط Postgres/Drizzle جاهز (مثال notes/tasks + device_tokens)  
2) كود Edge Functions (pull/push) كامل  
3) كود عميل `synchronize()` في RN + ربطه مع TanStack Query + triggers (app resume/network change)  
4) إعداد web adapter بالتبديل حسب `Platform.OS` بدون ما يتغير أي كود داخل وحدات التطبيق.

=======================================================================
لا اريد أن يدون PostgreSQL  معتمدة على Supabase لأنه يمكن تكون في اي كلاود بدون تخصيص فقط نعطي رابط DATABASE_URL  ويتعامل معها مباشرة أينما كانت
=======================================================================

ممتاز—هذا هو القرار “الأصح” هندسيًا لتفادي الـ vendor lock-in: **نجعل Postgres عام 100%** ويكفي `DATABASE_URL` لأي مزوّد (AWS RDS / Neon / Railway / Render / GCP / Azure / حتى Supabase Postgres نفسه) بدون أي تخصيص.

لكن نقطة حاسمة: **تطبيق الموبايل/الويب لا يجب أن يتصل بـ PostgreSQL مباشرة** (أمنيًا مستحيل عمليًا). الحل الصحيح هو إضافة **طبقة Backend API** “عامة” تتصل بـ Postgres عبر `DATABASE_URL`، والتطبيق يتصل بها عبر `API_URL`.

## المعمارية الأفضل (Cloud-agnostic)
### 1) Mobile/Web (Expo)
- يتعامل مع:
  - Auth (جلسات/توكن)
  - Sync endpoints
  - Notifications registration
- عبر: `API_URL`

### 2) Backend API (قابل للنشر بأي مكان)
- Node.js runtime + Docker
- Framework: **Fastify** (أداء عالي وبسيط)
- ORM: **Drizzle** + `drizzle-kit` للمخطط والمهاجرات
- DB: Postgres عبر `DATABASE_URL`
- Auth: JWT access + refresh (أو جلسات) + RBAC
- Sync: `/sync/pull` و`/sync/push`

### 3) Database (PostgreSQL)
- أي مزوّد
- Optional: تفعيل Postgres RLS (ميزة من Postgres نفسه وليست حصرية Supabase)، لكن الافتراضي يكفي **Authorization على مستوى الـ API** (مع إمكانية إضافة RLS كطبقة حماية ثانية).

---

## كيف نجعلها “تمبلت جاهز” بدون اعتماد على Supabase؟
نضيف داخل الـ monorepo تطبيق API:

```txt
repo/
  apps/
    mobile/            # Expo (iOS/Android/Web)
    api/               # Fastify + Drizzle (cloud-agnostic)
  packages/
    db/                # Drizzle schema + migrations + types shared
    shared/
    ui/
  docker-compose.yml   # Postgres محلي + api
```

### متغيرات البيئة (قياسية)
**api/.env**
- `DATABASE_URL=postgresql://user:pass@host:5432/db`
- `JWT_ACCESS_SECRET=...`
- `JWT_REFRESH_SECRET=...`
- `CORS_ORIGINS=http://localhost:19006,exp://...`
- (اختياري) `FIREBASE_SERVICE_ACCOUNT_JSON=...`

**mobile/.env**
- `EXPO_PUBLIC_API_URL=https://your-api.com`

بهذا:
- تغيّر قاعدة البيانات مستقبلًا؟ فقط غيّر `DATABASE_URL`.
- تغيّر مزود الاستضافة للـ API؟ لا يهم، طالما `API_URL` يعمل.

---

## ماذا عن “Supabase كخيار” بدون تخصيص؟
إذا أردت لاحقًا استخدام Supabase:
- **بدون أي كود خاص**: فقط ضع `DATABASE_URL` الخاص بقاعدة Supabase داخل الـ API.
- تبقى أنت غير مقيد بخدمات Supabase الأخرى (Auth/Storage/Edge).

---

## Sync (WatermelonDB ↔ Postgres) بشكل عام
أفضل تطبيق عملي “عام” لأي مشروع:
- **API Sync عامة** تعتمد على جداول Postgres + `updated_at` + `deleted_at` + `version`
- WatermelonDB يستخدم نفس البروتوكول (pull/push)
- كل جدول جديد تضيفه:
  1) تضيفه في `packages/db/schema.ts`
  2) تعمل migration
  3) تضيف mapping خفيف في `apps/api/src/modules/sync/*`
  4) تضيف model محلي في Watermelon

هذا يحافظ على “قوة التمبلت” بدون ادعاء مزامنة سحرية لكل حالات الدومين.

---

## الأمان (بدون Supabase) – أفضل الممارسات الافتراضية
- لا يوجد اتصال DB من العميل نهائيًا
- JWT access قصير العمر + refresh طويل العمر (مع rotation)
- حفظ refresh token في SecureStore (موبايل) وHttpOnly cookie (ويب) حسب التنفيذ
- Rate limiting على الـ API
- Validation صارم (Zod) لكل request
- سياسات ملكية على مستوى API (كل استعلام مربوط بـ `user_id`)
- (اختياري) تفعيل RLS داخل Postgres كطبقة إضافية

---

## ما الذي سيتغير في خطتك الأصلية؟
- “Supabase Auth” يصبح **اختياري** بدل افتراضي (إلا إذا رغبت الإبقاء عليه).
- “Drizzle ORM” سيكون في **الـ API** (وهو المكان الصحيح)، وليس داخل تطبيق Expo.
- يصبح التمبلت Full-stack: Mobile/Web + API + DB، وهذا هو الأنسب لمستقبل قوي.

---

## سؤال واحد فقط قبل أن أكتب لك الهيكل التنفيذي والملفات الجاهزة
هل تريد **Auth افتراضيًا**:
1) **Auth داخل الـ API (Email/Password + JWT + Refresh)** (الأكثر عمومية وبدون أي مزود)
أم
2) الإبقاء على **Supabase Auth كافتراضي** لكن قاعدة البيانات تظل عامة عبر `DATABASE_URL`؟

اختر (1) أو (2)، وبعدها أعطيك:
- قائمة التبعيات النهائية لـ `apps/api` و`packages/db`
- Drizzle schema + migrations جاهزة
- endpoints جاهزة: auth + sync pull/push + device tokens
- ربط Expo (web/mobile) مع الـ API + إدارة جلسات + RTL/i18n + theme بالكامل.

==================================================================

1) Auth داخل الـ API (Email/Password + JWT + Refresh) (الأكثر عمومية وبدون أي مزود)

=================================================================== 
