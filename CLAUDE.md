# ALMDOUNE Excel Game — Claude Project Guide

## Project Identity
- **App name**: ExcelStar (package: `com.excelstar.almdoun`)
- **Purpose**: Offline gamified Excel/Informatique learning for students at **الثانوية الإعدادية ألمدون** (Almdoun middle school, Morocco)
- **Developer**: Abdellah Bouchwari (teacher at the school)
- **GitHub**: https://github.com/Bouchwari/ALMDOUNE_excel_game
- **EAS**: expo.dev/accounts/bhi1212/projects/excelstar-almdoun
- **Version**: v1.2.0 (versionCode 3)

## Tech Stack
- React Native + Expo SDK 54 (managed workflow), TypeScript strict (`noImplicitAny`)
- **No backend** — 100% offline, AsyncStorage only
- DDD architecture: `domain → application → infrastructure → presentation → shared`
- Target: Android 8+, low-end devices (2 GB RAM)
- Build: EAS Build (`eas build --profile release-small`) or local Gradle debug
- JS engine: Hermes (`app.json`)

## Key Dependencies
```
expo ~54.0.34          expo-av ~16.0.8
expo-camera ~17.0.10   expo-haptics ~15.0.8
expo-notifications ~0.32.17
react-native-qrcode-svg ^6.3.21
react-native-safe-area-context ~5.6.0
```

---

## Language Rules — CRITICAL

The app is **locked to Moroccan Darija Arabic script only**.

### What this means:
- All UI text must be in **Arabic script Darija** (`src/shared/constants/strings.ts`)
- French Excel UI terms are **kept as-is**: `SOMME`, `MOYENNE`, `SI`, `Classeur`, `Ruban`, `Accueil`, `Feuille`, `cellule`, `police`, `NB`, `MAX`, `MIN`, etc.
- **Do NOT** write Darija in Latin letters: never `Raje3`, `Bda`, `Fhemt`, `sali`, `Mzyan`, `Ghalt`, `kasebti`, `kaitsma`, `wash`, `bhal`, etc.
- **Do NOT** put Arabic text in `titleFr` fields — those must be proper French titles
- `titleDarija` = primary lesson title (shown large, in Arabic)
- `titleFr` = secondary subtitle (shown small, proper French)
- English game names are acceptable as brand names: `Speed Quiz`, `Formula Fixer`, `Cell Navigator`

### Student names to use in examples
يوسف، فاطمة، سكينة، نادية، أمين، عمر، خديجة، زينب، إلياس

---

## Architecture & Key Files

### Navigation
Pure state machine in `App.tsx` — no React Navigation library. Screen is a string enum `AppScreen`.

### State management
No Redux/Zustand. React hooks only. `useStudent` and `useProgress` are the main data hooks.

### Key files
| File | Purpose |
|---|---|
| `App.tsx` | Root state machine + all screen rendering + friend challenge state |
| `src/shared/constants/strings.ts` | **ALL visible UI text** — edit here for any text change |
| `src/shared/constants/gamification.ts` | XP rewards, level thresholds, badges, avatars |
| `src/shared/utils/challengeEngine.ts` | Question pool for Speed Quiz, Daily Challenge, Friend/Class Challenge |
| `src/shared/utils/storage.ts` | `STORAGE_KEYS` — centralized AsyncStorage keys |
| `src/application/progress/SaveProgressUseCase.ts` | XP award logic (anti-farming: only first completion or star improvement) |
| `src/application/curriculum/GetModulesUseCase.ts` | Module unlock logic (requires ALL lessons complete) |
| `src/domain/multiplayer/FriendChallenge.ts` | QR payload encode/decode + validation |
| `src/infrastructure/storage/AsyncStorageProgressRepo.ts` | Lesson results persistence |
| `src/infrastructure/storage/AsyncStorageStudentRepo.ts` | Student profiles + streak update |
| `src/shared/hooks/useStudent.ts` | Loads student + calls `updateLastOpened` on every app start |
| `src/infrastructure/data/modules/module1–9.ts` | Lesson + exercise content per module |
| `src/presentation/screens/SimulatorScreen.tsx` | Excel simulator with formula engine |
| `src/presentation/screens/LessonScreen.tsx` | Lesson slide viewer |
| `src/presentation/screens/ExerciseScreen.tsx` | Exercise runner (MCQ, true/false, fill_blank, excel_grid) |

---

## Styling Rules

- Every component: `makeStyles(c: ColorPalette)` + `React.useMemo(() => makeStyles(colors), [colors])`
- Never hardcode `'#FFFFFF'` or `'#000000'` — use `c.white` / `c.black`
- Excel-mimicking feedback colors are intentional hardcoded: `#C6EFCE` (correct green), `#FFCCCC` (wrong red), `#DEDEDE` (header grey)
- Dark code block colors (`#1A1A2E`, `#FFD54F`, `#A5D6A7`) are intentional — leave hardcoded
- `ScreenWrap` in `App.tsx` handles SafeAreaInsets + StatusBar for all non-tab screens

---

## Simulator Formula Engine (`SimulatorScreen.tsx`)

Functions supported: `SOMME/SUM`, `MOYENNE/AVERAGE`, `MAX`, `MIN`, `NB/COUNT`, `NBVAL/COUNTA`, `NB.SI/COUNTIF`, `SOMME.SI/SUMIF`, `SI/IF`, `GAUCHE/LEFT`, `DROITE/RIGHT`, `STXT/MID`, `MAJUSCULE/UPPER`, `MINUSCULE/LOWER`, `SUPPRESPACE/TRIM`, `CONCATENER/CONCAT`, `ARRONDI/ROUND`

Key implementation details:
- `getRangeValues(arg, grid)` — tries direct range lookup first, then substituted literals; fixes the `A1:A5` range bug
- Display grid is built top-to-bottom in `applyFormula` so cross-cell formula dependencies resolve correctly
- `getCellsRaw()` + `matchCriteria()` power NBVAL, NB.SI, SOMME.SI

---

## Game Logic

### XP anti-farming (`SaveProgressUseCase.ts`)
- First completion: full XP awarded
- Replay with same/lower stars: 0 XP
- Replay with improved stars: delta XP only (new tier minus old tier)

### Module unlock (`GetModulesUseCase.ts`)
- Requires `prevResults.length >= prevModule.lessons.length` (all lessons attempted)
- AND average score ≥ `unlockRequirement`
- One lesson can no longer unlock the next module

### Score closure fix (`SpeedQuizGame`, `CellNavigatorGame`)
- `scoreRef = useRef(0)` mirrors every `setScore` update
- `onComplete` reads `scoreRef.current` to avoid stale closure on the last question

### QR validation (`FriendChallenge.ts` — `decodeAnyChallenge`)
- Rejects payloads > 8 KB, > 50 questions, invalid score/star bounds (0–100/0–3), wrong field types

---

## Content Structure (modules)

Each module file exports `MODULE_N: Module` with:
```typescript
{
  id: 'modN',
  titleFr: 'Proper French title',   // shown as subtitle
  titleDarija: 'عنوان بالدارجة',    // shown as primary title
  descriptionDarija: '...',
  unlockRequirement: 60,             // % score needed in prev module
  lessons: [
    {
      id: 'modN-lesM',
      titleFr: 'French subtitle',
      titleDarija: 'عنوان الدرس',
      isMiniGame: false,
      slides: [{ conceptFr, explanation, tip, excelExample }],
      exercises: [{ id, type, question, options?, correctIndex, hint, explanation }],
    }
  ]
}
```

### Exercise types
- `multiple_choice` — 4 options, `correctIndex`
- `true_false` — implicit options `['صح ✓', 'غلط ✗']`, `correctIndex` 0 or 1
- `fill_blank` — `correctAnswer` string, `placeholder`
- `excel_grid` — `gridData`, `correctCell: { row, col }`

---

## What NOT to do
- Do not add a backend or user accounts
- Do not install new dependencies without checking Expo SDK 54 compatibility
- Do not skip `makeStyles` pattern — inline styles break dark mode
- Do not write Latin Darija in any user-facing string
- Do not put Arabic text in `titleFr` fields
- Do not award XP on every lesson replay (anti-farming logic exists)
- Do not use `TouchableOpacity` — use `Pressable` with `android_ripple`
- Do not commit secrets or `*.env` files
- Do not use `&&` in PowerShell 5.1 — use `;` or `if ($?) { ... }`

---

## Module Content Status (v1.2.0)

| Module | Content | Notes |
|---|---|---|
| mod1 | ✅ Complete | Darija + hints + explanations on all exercises |
| mod2 | ✅ Complete | Darija rewrite done |
| mod3 | ✅ Complete | Darija rewrite done |
| mod4 | ✅ Content exists | Partial hints |
| mod5 | ✅ Content exists | Partial hints |
| mod6 | ✅ Complete | Darija rewrite done |
| mod7 | ✅ Content exists | Partial hints |
| mod8 | ✅ Content exists | Partial hints |
| mod9 | ✅ Content exists | Partial hints |

---

## Bugs Fixed History (v1.2.0 cycle)

**High priority (fixed):**
- XP farming — replay now only awards delta XP on star improvement
- Module unlock — requires all lessons complete, not just avg score
- Stale score closure — `scoreRef` fixes last-answer score loss in games

**Medium priority (fixed):**
- QR payload validation — bounds checks on all fields
- Friend challenge XP display — was hardcoded `25`, now uses actual win/loss XP
- Daily streak — `updateLastOpened` now called on every app start
- Orphaned lesson results on profile delete — now cleaned up

**Low priority (fixed):**
- `titleFr` fields had Arabic content — all 9 modules now have proper French subtitles
- Hardcoded English/French in game UI — `Generate QR`, `Score`, `Étoiles`, `Temps` → Arabic
- `package.json` — added `"typecheck": "tsc --noEmit"` script

**Simulator (fixed):**
- Range substitution bug — `SOMME(A1:A5)` now works via `getRangeValues()` helper
- Cross-cell formula dependency — iterative display build, top-to-bottom
- Added: `NBVAL/COUNTA`, `SOMME.SI/SUMIF`, `STXT/MID`, `SUPPRESPACE/TRIM`
- Fixed: `NB.SI` criteria (`>10`, `<5`, `"text"`, etc.)
- Fixed: `autoCapitalize="characters"` → `"none"` on formula bar

**Strings/UI (fixed):**
- `← Raje3`, `Bda Exercises!`, `Fhemt! →` → proper Arabic
- `Tap FR/EN to toggle formula language` → Arabic
- `تاپ على الخلية` → `اضغط على الخلية`
- Friend steps rewritten in natural Darija
- `kasebti!` → `كسبتي!` in FriendChallengeResultScreen
