# ExcelStar – Project Guide
**School:** الثانوية الإعدادية ألمدون — Lycée Collégial Almdoun  
**Version:** 1.1.0 (versionCode 2)  
**GitHub:** https://github.com/Bouchwari/ALMDOUNE_excel_game  
**EAS Project:** https://expo.dev/accounts/bhi1212/projects/excelstar-almdoun  

---

## What is this app?

ExcelStar is an offline Android gamified learning app for teaching Excel/Informatique to students at Almdoun school. Students learn through lessons, exercises, mini-games, and daily challenges, earning XP and leveling up as they progress.

**Target:** Android 8+ (low-end devices, 2 GB RAM), offline only, no backend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo SDK 54 |
| Language | TypeScript (strict, no `any`) |
| Architecture | DDD (Domain-Driven Design) |
| Storage | AsyncStorage (offline, local) |
| Build | EAS Build (cloud APK) |
| Package | `com.excelstar.almdoun` |

---

## Folder Structure

```
ExcelStar/
├── app.json                        # Expo config, version, package name
├── App.tsx                         # Root: state machine, navigation logic
├── assets/images/school_logo.png   # App icon + splash
├── src/
│   ├── domain/                     # Business logic (no React)
│   │   ├── curriculum/             # Module, Lesson, Exercise types
│   │   ├── progress/               # LessonResult, ProgressRepository interface
│   │   └── student/                # Student, StudentProgress, StudentGender types
│   ├── application/                # Use cases (execute() only)
│   │   ├── curriculum/             # GetModulesUseCase, GetLessonsUseCase
│   │   └── progress/               # SaveResultUseCase, GetLeaderboardUseCase
│   ├── infrastructure/
│   │   ├── data/curriculumData.ts  # All lessons, modules, exercises (EDIT THIS to change content)
│   │   └── storage/                # AsyncStorage implementations
│   ├── presentation/
│   │   ├── screens/                # All screens (HomeScreen, LessonScreen, etc.)
│   │   ├── components/             # Reusable UI (XPBar, ModuleCard, etc.)
│   │   └── theme/                  # colors.ts, spacing.ts
│   └── shared/
│       ├── constants/
│       │   ├── strings.ts          # ALL UI text in 4 languages (EDIT THIS for translations)
│       │   ├── genderedStrings.ts  # Gender-aware strings (result messages, welcome)
│       │   └── gamification.ts     # LEVELS array (XP thresholds, badges)
│       ├── context/LanguageContext.tsx  # Language + gender state (useLanguage hook)
│       └── hooks/
│           ├── useProgress.ts      # XP, level, badges, awardGameXP()
│           └── useStudents.ts      # Student list, create, switch profile
```

---

## Navigation (App.tsx State Machine)

There is **no React Navigation library** — screens are switched by state:

```
AppScreen = 'language' | 'onboarding' | 'home' | 'modules' | 'lesson'
          | 'result' | 'simulator' | 'challenge' | 'quiz' | 'games'
          | 'cellGame' | 'formulaGame' | 'speedGame' | 'settings'
```

The `wrap()` helper in App.tsx adds `GestureHandlerRootView` + `SafeAreaProvider` + `StatusBar` to every screen.

---

## Language System

4 languages are supported:

| ID | Name | RTL |
|---|---|---|
| `darija-lat` | Darija (Latin letters) | No |
| `darija-ar` | دارجة (Arabic letters) | Yes |
| `fr` | Français | No |
| `en` | English | No |

### How it works

1. User picks language on first launch (`LanguageSelectScreen`)
2. Saved in `AppSettings.language` via AsyncStorage
3. `LanguageContext` exposes `S` (all UI strings), `language`, `isRTL`, `gender`, `G` (gendered strings)
4. Every component reads from `S.xxx` — **never hardcode UI text**
5. RTL layout uses `S.isRTL` flag in `StyleSheet` (e.g. `textAlign: S.isRTL ? 'right' : 'left'`)

### Adding/editing translations

Edit `src/shared/constants/strings.ts`:
- `DARIJA_LAT` — Latin Darija  
- `DARIJA_AR` — Arabic-script Darija  
- `FRENCH` — French  
- `ENGLISH` — English  

All 4 objects must have identical keys (TypeScript will error if one is missing).

### Editing curriculum content

Edit `src/infrastructure/data/curriculumData.ts`:
- `titleFr` — French/Excel title (kept in French for technical terms)
- `titleDarija` — Darija subtitle shown under the title
- Exercise `question`, `options`, `explanation` — the lesson content

---

## Gender System

Students have a gender (`'male'` | `'female'`). This affects result messages and welcome text.

- Set during onboarding (👦 Weld / 👧 Bent step)
- Changeable in Settings screen
- `useLanguage()` exposes `gender`, `setGender`, `G` (gendered strings), and `g(male, female)` helper
- Gendered string definitions are in `src/shared/constants/genderedStrings.ts`

---

## XP & Level System

Defined in `src/shared/constants/gamification.ts`:

| Level | Name (Latin) | Name (Arabic) | XP Required | Badge |
|---|---|---|---|---|
| 1 | Mbtadi | مبتدئ | 0 | 🌱 |
| 2 | Talmid | تلميذ | 100 | 📚 |
| 3 | Motawasset | متوسط | 300 | ⭐ |
| 4 | Mtaqqan | متقن | 600 | 🔥 |
| 5 | Expert | خبير | 1000 | 💎 |
| 6 | Excel Star | نجم إكسيل | 1500 | 🏆 |

### XP sources

| Action | XP |
|---|---|
| Lesson (3 stars) | 30 XP |
| Lesson (2 stars) | 20 XP |
| Lesson (1 star) | 10 XP |
| Hint NOT used bonus | +20 XP |
| Daily Challenge | +50 XP |
| Quick Quiz | +30 XP |
| Mini-game (Cell Navigator) | +80 XP |
| Mini-game (Formula Fixer) | +100 XP |
| Mini-game (Speed Quiz) | +120 XP |

---

## Screens

| Screen | File | Description |
|---|---|---|
| Language Select | `LanguageSelectScreen.tsx` | First launch, pick language |
| Onboarding | `OnboardingScreen.tsx` | Name → Avatar → Gender (3 steps) |
| Home | `HomeScreen.tsx` | Profile card, XP bar, continue card, quick actions |
| Modules | `ModuleListScreen.tsx` | Module list → Lesson list |
| Lesson | `LessonScreen.tsx` | Exercises with hints |
| Result | `ResultScreen.tsx` | Stars, XP earned, retry/next |
| Games Hub | `GamesScreen.tsx` | Daily challenge + 3 mini-games |
| Cell Navigator | `CellNavigatorGame.tsx` | Tap the correct cell |
| Formula Fixer | `FormulaFixerGame.tsx` | Fix broken Excel formulas |
| Speed Quiz | `SpeedQuizGame.tsx` | Fast-answer quiz |
| Daily Challenge | `DailyChallengeScreen.tsx` | 5 questions, one per day |
| Quick Quiz | `QuickQuizScreen.tsx` | Random questions |
| Simulator | `SimulatorScreen.tsx` | Mini Excel spreadsheet |
| Settings | `SettingsScreen.tsx` | Language, gender, sound, notifications |

---

## Building an APK

### Prerequisites

1. Install EAS CLI: `npm install -g eas-cli`
2. Login: `npx eas login` (account: `bhi1212`)
3. Must be inside `ExcelStar/` folder

### Build command

```bash
cd ExcelStar
npx eas build -p android --profile preview --non-interactive
```

The build runs in the cloud (Expo servers). Takes ~10–15 minutes.  
Download the `.apk` from the link printed in the terminal or from:  
**https://expo.dev/accounts/bhi1212/projects/excelstar-almdoun/builds**

### Build profiles (eas.json)

| Profile | Output | Use |
|---|---|---|
| `preview` | `.apk` (sideload) | Testing on device |
| `production` | `.aab` (Google Play) | Play Store upload |

---

## Pushing to GitHub

```bash
cd ExcelStar
git add <files>
git commit -m "your message"
git push origin main
```

Remote: `https://github.com/Bouchwari/ALMDOUNE_excel_game`

---

## Common Tasks

### Add a new lesson

1. Open `src/infrastructure/data/curriculumData.ts`
2. Find the correct module in `MODULES` array
3. Add a `Lesson` object with exercises to that module's `lessons` array
4. Run `npx tsc --noEmit` to verify — no errors = ready to build

### Add a new UI string

1. Add the key to the `AppStrings` interface in `strings.ts`
2. Add the value to ALL 4 language objects (DARIJA_LAT, DARIJA_AR, FRENCH, ENGLISH)
3. Use it in your component: `const { S } = useLanguage(); ... S.yourKey`

### Change app version

- `app.json` → `"version"` (user-visible, e.g. "1.1.0")
- `app.json` → `"android.versionCode"` (integer, increment by 1 each release)

### Reset a student's progress (dev)

Clear AsyncStorage via the Expo Go dev menu, or uninstall/reinstall the app.

---

## What was built (v1.0 → v1.1)

### v1.0 — Initial release
- 6 Excel modules with lessons and exercises
- XP system, level progression, badges
- Daily challenge, quick quiz
- 3 mini-games: Cell Navigator, Formula Fixer, Speed Quiz
- Excel Simulator (mini spreadsheet)
- Offline storage with AsyncStorage
- 4-language support (darija-lat, darija-ar, fr, en)

### v1.1 — Gender system + i18n fix + cleanup
- **Gender system**: onboarding gender step (👦/👧), gender-aware result messages, changeable in Settings
- **i18n fix**: all UI strings now come from the language system — switching to Arabic-script Darija (darija-ar) now correctly shows Arabic text in every screen
- **Level names in Arabic**: XPBar and HomeScreen show Arabic level names (مبتدئ, تلميذ…) in Arabic mode
- **RTL-aware arrows**: buttons and navigation arrows flip direction in Arabic mode
- **Curriculum translated**: all lesson content translated to Arabic-script Darija
- **Code cleanup**: removed Teacher mode (offline app, not needed), removed unused files (TeacherScreen, BadgesScreen, BadgeCard, ComparisonTable, typography.ts, routes.ts, darija.ts)
- **Error handling**: all AsyncStorage calls wrapped in try/catch with safe fallbacks
- **Game XP**: game XP now actually saves to student progress (was broken before)

---

## Important Files to Know

| File | Why |
|---|---|
| `src/infrastructure/data/curriculumData.ts` | Edit this to change/add lesson content |
| `src/shared/constants/strings.ts` | Edit this to change any UI text or add translations |
| `src/shared/constants/gamification.ts` | XP thresholds, level names, badges |
| `app.json` | App name, version, package, icon |
| `App.tsx` | Root screen switcher and all app-level state |
| `eas.json` | Build profiles for APK/AAB |

---

*Generated 2026-04-27 — ExcelStar v1.1.0*
