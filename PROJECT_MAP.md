# 🗺️ PROJECT_MAP (TempExpo Scaffold)

## [TECH_STACK]
- **Monorepo**: pnpm (v10.33.4) + Turborepo (v2.9.9)
- **Mobile/Web App**: Expo SDK 55 (v55.0.23) + React Native (v0.85.3) + expo-router
- **API Backend**: Node.js + Fastify (v5.8.5)
- **Database & ORM**: PostgreSQL (Agnostic via `DATABASE_URL`) + Drizzle ORM (v0.45.2)
- **Local DB**: WatermelonDB (v0.28.0) [SQLite for Native, LokiJS for Web]
- **State Management**: Zustand (v5.0.13) [Local] + TanStack Query (v5.100.9) [Server]
- **Design System**: Shopify Restyle + Reanimated + lucide-react-native
- **Auth**: Custom JWT (Access/Refresh) within API
- **i18n**: i18next + RTL/LTR auto-sync

## [SYSTEM_FLOW]
1. **App Init Flow**: Load i18n -> Load Theme -> Check SecureStore for JWT -> Connect Local DB (Watermelon) -> Check API reachability -> Render Root Layout.
2. **Auth Flow**: Login via API `/auth/login` -> Store tokens -> API returns User Profile -> Set Zustand Auth State.
3. **Data Sync Flow**:
   - `pull()`: Fetch changes from `/sync/pull` since `lastPulledAt` -> Apply to WatermelonDB.
   - `push()`: Collect local changes -> Send to `/sync/push` -> Validate `version` on API (Optimistic Concurrency) -> Return conflicts or success.
4. **Navigation Flow**: Auth boundaries (`_layout.tsx`) -> AppTabs (Home, Search, Notifications, Settings) -> Profile/ChangePassword inside Settings Stack.

## [ARCHITECTURE]
**Monorepo Structure (Domain-Driven)**
- `apps/mobile`: Expo Client (iOS/Android/Web). Contains Feature Modules (`src/features`), Core Logic (`src/core`), and App Routes (`app/`).
- `apps/api`: Fastify API Server. Contains Auth, Sync Endpoints, and Middleware.
- `packages/db`: Drizzle Schema (`schema.ts`), Migrations, and Shared Types.
- `packages/ui`: Design System Tokens, Themes, and Core Components (Restyle).
- `packages/shared`: Validation (Zod), Constants, Types.

**Surgical Abstraction Principles**:
- UI components live in `packages/ui` only if reused >1 times.
- `apps/mobile/src/core` manages Auth, Sync, HTTP (ky client), and i18n singletons.
- Local Database (WatermelonDB) mapped to platform adapters dynamically.
- Logging: Asynchronous non-blocking logger for API & Mobile (Sentry wrapper or custom).

## [ORPHANS & PENDING]
- [x] تم إنجاز جميع المراحل بنجاح (All core scaffolding steps are complete).
