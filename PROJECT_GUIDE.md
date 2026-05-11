# ExcelStar – Project Guide
**School:** الثانوية الإعدادية ألمدون — Lycée Collégial Almdoun  
**Version:** 1.2.0 (versionCode 3)  
**GitHub:** https://github.com/Bouchwari/ALMDOUNE_excel_game  
**EAS Project:** https://expo.dev/accounts/bhi1212/projects/excelstar-almdoun  

---

## What is this app?

ExcelStar is an **offline Android** gamified learning app for teaching Excel/Informatique to students at Almdoun school. Students learn through lessons, exercises, mini-games, daily challenges, and now local P2P friend challenges via QR codes — earning XP and leveling up as they progress.

**Target:** Android 8+ (low-end devices, 2 GB RAM), **fully offline, no backend.**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo SDK 54, managed workflow |
| Language | TypeScript strict (no `any`) |
| Architecture | DDD (domain → application → infrastructure → presentation → shared) |
| Storage | AsyncStorage (offline, local only) |
| Camera | expo-camera (`CameraView`, `useCameraPermissions`) |
| QR generation | react-native-qrcode-svg (uses react-native-svg) |
| Build | GitHub Actions (local Gradle, free) + EAS cloud (manual only) |
| Package | `com.excelstar.almdoun` |

---

## Folder Structure

```
ExcelStar/
├── app.json                          # Expo config, version, plugins, package name
├── App.tsx                           # Root state machine + all app-level state
├── assets/images/school_logo.png     # App icon + splash
├── src/
│   ├── domain/
│   │   ├── curriculum/               # Module, Lesson, Exercise types
│   │   ├── multiplayer/
│   │   │   └── FriendChallenge.ts    # QRPayload, PlayerResult, encode/decode helpers
│   │   ├── progress/                 # LessonResult, ProgressRepository interface
│   │   └── student/                  # Student, StudentProgress, StudentGender types
│   ├── application/
│   │   ├── curriculum/               # GetModulesUseCase, GetLessonUseCase
│   │   └── progress/                 # SaveProgressUseCase, AwardBadgeUseCase, GetLeaderboardUseCase
│   ├── infrastructure/
│   │   ├── data/curriculumData.ts    # ALL lesson/exercise content — edit here to change curriculum
│   │   └── storage/                  # AsyncStorageStudentRepo, AsyncStorageProgressRepo
│   ├── presentation/
│   │   ├── screens/                  # All screens (see list below)
│   │   ├── components/               # Reusable UI (XPBar, ModuleCard, StreakCalendar, etc.)
│   │   └── theme/                    # colors.ts, spacing.ts (makeStyles pattern)
│   └── shared/
│       ├── constants/
│       │   ├── strings.ts            # ALL UI text in 4 languages — edit here for translations
│       │   ├── genderedStrings.ts    # Gender-aware result/welcome strings
│       │   └── gamification.ts       # LEVELS array (XP thresholds, badges)
│       ├── context/
│       │   ├── LanguageContext.tsx   # Language + gender state (useLanguage hook → S, G, g())
│       │   └── ThemeContext.tsx      # Dark/light theme (useTheme hook → colors)
│       ├── hooks/
│       │   ├── useProgress.ts        # XP, level, badges, awardGameXP()
│       │   └── useStudent.ts         # Student list, create, switch profile
│       └── utils/
│           ├── challengeEngine.ts    # generateFriendChallenge(), getExercisesByPoolIds()
│           ├── starCalculator.ts     # calculateStars(score) — ALWAYS use this, never manual math
│           └── xpCalculator.ts       # XP calculation helpers
```

---

## Navigation (App.tsx State Machine)

**No React Navigation library** — screens switched by a single state variable:

```typescript
type AppScreen =
  'splash' | 'main' | 'modules' | 'lesson' | 'result' |
  'simulator' | 'challenge' | 'quiz' | 'games' |
  'cellGame' | 'formulaGame' | 'speedGame' | 'settings' |
  'friend-hub' | 'friend-play' | 'friend-qr' | 'friend-scan' | 'friend-result';
```

The `wrap()` helper in App.tsx adds `GestureHandlerRootView` + `SafeAreaProvider` + `StatusBar`.

### Key app-level state in App.tsx

```typescript
// Friend challenge
const [friendExercises, setFriendExercises] = useState<Exercise[]>([]);
const [friendRole, setFriendRole] = useState<'host' | 'guest'>('host');
const [friendPoolIds, setFriendPoolIds] = useState<string[]>([]);
const [friendQRPayload, setFriendQRPayload] = useState<QRPayload | null>(null);
const [friendHostResult, setFriendHostResult] = useState<PlayerResult | null>(null);
const [friendGuestResult, setFriendGuestResult] = useState<PlayerResult | null>(null);
```

---

## All Screens

| Screen | File | Description |
|---|---|---|
| Onboarding | `OnboardingScreen.tsx` | Language → 3-step intro (animated) → Name/Avatar → Gender |
| Home | `HomeScreen.tsx` | Profile card, XP bar, streak calendar, quick actions, module list |
| Module List | `ModuleListScreen.tsx` | Module grid → lesson list |
| Lesson | `LessonScreen.tsx` | Exercises with hints |
| Result | `ResultScreen.tsx` | Stars, XP earned, retry/next |
| Games Hub | `GamesScreen.tsx` | Entry point for games |
| Cell Navigator | `CellNavigatorGame.tsx` | Tap the correct cell |
| Formula Fixer | `FormulaFixerGame.tsx` | Fix broken Excel formulas |
| Speed Quiz | `SpeedQuizGame.tsx` | Fast-answer quiz |
| Simulator | `SimulatorScreen.tsx` | Mini Excel spreadsheet |
| Settings | `SettingsScreen.tsx` | Language, gender, sound, notifications |
| Friend Hub | `FriendChallengeScreen.tsx` | 4-step guide + Create / Scan buttons |
| Friend Play | `FriendChallengePlayScreen.tsx` | Quiz with live elapsed timer, color-coded by role |
| Friend QR | `FriendChallengeQRScreen.tsx` | Shows host score + QR code for guest to scan |
| Friend Scan | `FriendChallengeScanScreen.tsx` | Camera with custom corner-frame overlay, scans QR |
| Friend Result | `FriendChallengeResultScreen.tsx` | Side-by-side PlayerCard, winner by score then time |

---

## Friend Challenge — How it works (QR P2P, no WiFi needed)

```
Host plays quiz → scores tracked locally
       ↓
FriendChallengeQRScreen: QR generated with encoded payload
       ↓
Guest scans QR → FriendChallengeScanScreen (expo-camera)
       ↓
Guest plays same questions → scores compared locally
       ↓
FriendChallengeResultScreen: side-by-side cards, winner = higher score (time tiebreak)
```

### QR Payload format (compact JSON)
```typescript
interface QRPayload {
  v: 1;           // schema version
  q: string[];    // pool question IDs
  p: string;      // host player name
  a: string;      // host avatar emoji
  s: number;      // host score (%)
  st: number;     // host stars
  ti: number;     // host time (seconds)
}
```

Encoded/decoded via `encodeChallenge()` / `decodeChallenge()` in `src/domain/multiplayer/FriendChallenge.ts`.

---

## Curriculum Modules

| ID | Title | Topics |
|---|---|---|
| mod1 | Interface Excel | Ribbon, cells, navigation |
| mod2 | Saisie & Formatage | Data entry, formatting |
| mod3 | Formules de Base | SUM, AVERAGE, MIN, MAX |
| mod4 | Fonctions SI | IF, nested IF, conditions |
| mod5 | Graphiques | Chart types, creation |
| mod6 | Mise en Forme Avancée | Conditional formatting |
| mod7 | Fonctions Avancées | VLOOKUP, INDEX/MATCH |
| mod8 | Fonctions NB & SI | NB, NBVAL, NB.VIDE, NB.SI, SOMME.SI, MOYENNE.SI |
| mod9 | Fonctions de Texte | CONCATENER, MAJUSCULE, GAUCHE, DROITE, SUPPRESPACE, SUBSTITUE |

Each module has lessons; each lesson has exercises. Edit `src/infrastructure/data/curriculumData.ts` to change content.

---

## Language System

| ID | Name | RTL |
|---|---|---|
| `darija-lat` | Darija (Latin) | No |
| `darija-ar` | دارجة (Arabic) | Yes |
| `fr` | Français | No |
| `en` | English | No |

- `useLanguage()` exposes `S` (all strings), `language`, `isRTL`, `gender`, `G` (gendered strings), `g(male, female)` helper
- **Never hardcode UI text** — always use `S.xxx`
- RTL: use `S.isRTL` flag in StyleSheet (`textAlign`, `writingDirection`, arrow direction)
- Edit `src/shared/constants/strings.ts` — all 4 language objects must have identical keys

---

## Styling Pattern

```typescript
// Every component uses this pattern:
const styles = React.useMemo(() => makeStyles(colors), [colors]);

const makeStyles = (c: ColorPalette) => StyleSheet.create({ ... });
```

Import spacing/radius/shadow from `src/presentation/theme/spacing.ts`. Never use raw numbers for padding/margin/radius.

---

## Key Rules (enforced by code review)

1. **Stars**: Always use `calculateStars(score)` from `starCalculator.ts` — never `Math.floor(score / 34)`
2. **Dates for streaks**: Use local date parts (not `toISOString()`) to avoid UTC/DST mismatch
3. **AsyncStorage migration**: Use `?? []` guard on `activeDates` for backward compatibility
4. **Streak cap**: `activeDates` capped at 90 entries (`.slice(-90)`)
5. **No hardcoded text**: all UI strings must be in `strings.ts`
6. **`makeStyles(c)` factory**: every screen/component uses this — no inline color values

---

## XP & Level System

| Level | Name | XP |
|---|---|---|
| 1 | Mbtadi 🌱 | 0 |
| 2 | Talmid 📚 | 100 |
| 3 | Motawasset ⭐ | 300 |
| 4 | Mtaqqan 🔥 | 600 |
| 5 | Expert 💎 | 1000 |
| 6 | Excel Star 🏆 | 1500 |

| Action | XP |
|---|---|
| Lesson 3★ | 30 |
| Lesson 2★ | 20 |
| Lesson 1★ | 10 |
| No-hint bonus | +20 |
| Daily Challenge | +50 |
| Quick Quiz | +30 |
| Cell Navigator | +80 |
| Formula Fixer | +100 |
| Speed Quiz | +120 |

---

## Building an APK

### Option A — GitHub Actions (free, recommended)

Push to `main` → Actions tab → `Build Android APK` workflow runs automatically → download artifact `ExcelStar-v1.2.0`.

Or trigger manually from the Actions tab.

### Option B — EAS Cloud (costs credits)

```bash
eas build -p android --profile preview --non-interactive
```

Manual only (set to `workflow_dispatch` in `.github/workflows/main.yml`).

### Bump version before a release

1. `app.json` → `"version"` (e.g. `"1.3.0"`)
2. `app.json` → `"android.versionCode"` (increment by 1)
3. Update artifact name in `.github/workflows/build-android.yml` line `name: ExcelStar-vX.X.X`

---

## Common Tasks

### Add a lesson
1. Open `src/infrastructure/data/curriculumData.ts`
2. Find the module, add a `Lesson` object with exercises
3. Run `./node_modules/.bin/tsc --noEmit` — no errors = ready

### Add a UI string
1. Add key to `AppStrings` interface in `strings.ts`
2. Add value to all 4 language objects
3. Use: `const { S } = useLanguage(); S.yourKey`

### Add a new screen
1. Create `src/presentation/screens/YourScreen.tsx` (use `makeStyles(c)` pattern)
2. Add screen ID to `AppScreen` type in `App.tsx`
3. Add state handler + render case in App.tsx

---

## Changelog

### v1.2.0 (current)
- **Friend Challenge (P2P QR)**: No WiFi needed. Host plays → QR generated → guest scans → same questions → local result comparison. Uses `expo-camera` + `react-native-qrcode-svg`.
- **Module 8**: NB.SI / SOMME.SI / MOYENNE.SI (conditional counting and summing, ~20 exercises)
- **Module 9**: Text functions — CONCATENER, MAJUSCULE, GAUCHE, DROITE, SUPPRESPACE, SUBSTITUE (~24 exercises)
- **Animations**: OnboardingScreen step fade+slide+emoji bounce, CTA button press scale, ModuleCard entrance slide-up
- **Accessibility**: `accessibilityLabel` + `accessibilityRole` on avatar button, continue card, and all QuickActionBtns
- **CI fix**: GitHub Actions — Node 24, no cache (avoids 400 errors), local `./node_modules/.bin/expo prebuild`, EAS build manual-only

### v1.1.0
- Gender system: onboarding gender step, gender-aware messages, changeable in Settings
- Full Arabic-script Darija (darija-ar) support across all screens
- RTL-aware layout and arrows
- Game XP now correctly saved to student progress
- Removed Teacher mode and unused files

### v1.0.0
- 6 Excel modules, XP/level/badge system
- Daily challenge, quick quiz, 3 mini-games, Excel simulator
- 4-language support, offline AsyncStorage

---

## Important Files Quick Reference

| File | Purpose |
|---|---|
| `App.tsx` | Root state machine, all screen transitions, friend challenge state |
| `src/infrastructure/data/curriculumData.ts` | All lesson/exercise content |
| `src/shared/constants/strings.ts` | All UI text (4 languages) |
| `src/shared/constants/gamification.ts` | XP thresholds, levels, badges |
| `src/shared/utils/challengeEngine.ts` | Question pool + `generateFriendChallenge()` |
| `src/shared/utils/starCalculator.ts` | `calculateStars(score)` — always use this |
| `src/domain/multiplayer/FriendChallenge.ts` | QR payload types + encode/decode |
| `app.json` | Version, package name, plugins (expo-camera, expo-notifications) |
| `eas.json` | Build profiles (preview=APK, production=AAB) |
| `.github/workflows/build-android.yml` | CI: auto-build APK on push to main |
| `.github/workflows/main.yml` | EAS cloud build (manual trigger only) |

---

*Updated 2026-05-01 — ExcelStar v1.2.0*
