import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, StatusBar, BackHandler } from 'react-native';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { requestNotificationPermission, scheduleStreakReminder } from './src/shared/utils/notifications';

ExpoSplashScreen.preventAutoHideAsync().catch(() => {});

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SplashScreen } from './src/presentation/screens/SplashScreen';
import { OnboardingScreen } from './src/presentation/screens/OnboardingScreen';
import { ProfileSelectScreen } from './src/presentation/screens/ProfileSelectScreen';
import { HomeScreen } from './src/presentation/screens/HomeScreen';
import { ModuleListScreen } from './src/presentation/screens/ModuleListScreen';
import { LessonScreen } from './src/presentation/screens/LessonScreen';
import { ExerciseScreen } from './src/presentation/screens/ExerciseScreen';
import { ResultScreen } from './src/presentation/screens/ResultScreen';
import { LeaderboardScreen } from './src/presentation/screens/LeaderboardScreen';
import { GamesScreen } from './src/presentation/screens/GamesScreen';
import { CellNavigatorGame } from './src/presentation/screens/CellNavigatorGame';
import { FormulaFixerGame } from './src/presentation/screens/FormulaFixerGame';
import { SpeedQuizGame } from './src/presentation/screens/SpeedQuizGame';
import { SimulatorScreen } from './src/presentation/screens/SimulatorScreen';
import { SettingsScreen } from './src/presentation/screens/SettingsScreen';
import { FriendChallengeScreen } from './src/presentation/screens/FriendChallengeScreen';
import { FriendChallengePlayScreen } from './src/presentation/screens/FriendChallengePlayScreen';
import { FriendChallengeQRScreen } from './src/presentation/screens/FriendChallengeQRScreen';
import { FriendChallengeScanScreen } from './src/presentation/screens/FriendChallengeScanScreen';
import { FriendChallengeResultScreen } from './src/presentation/screens/FriendChallengeResultScreen';
import { QRPayload, PlayerResult } from './src/domain/multiplayer/FriendChallenge';
import { generateFriendChallenge, getExercisesByPoolIds } from './src/shared/utils/challengeEngine';

import { useStudent } from './src/shared/hooks/useStudent';
import { useProgress } from './src/shared/hooks/useProgress';
import { useSound } from './src/shared/hooks/useSound';
import { LanguageProvider, useLanguage } from './src/shared/context/LanguageContext';
import { ThemeProvider, useTheme } from './src/shared/context/ThemeContext';
import { GetLessonUseCase } from './src/application/curriculum/GetLessonUseCase';
import { Lesson } from './src/domain/curriculum/Lesson';
import { Exercise } from './src/domain/curriculum/Exercise';
import { StudentGender } from './src/domain/student/Student';
import { calculateStars } from './src/shared/utils/starCalculator';

import { generateChallenge, generateQuickQuiz, isChallengeAvailableToday } from './src/shared/utils/challengeEngine';
import { AppSettings } from './src/domain/progress/ProgressRepository';
import { AppLanguage } from './src/shared/constants/strings';

const Tab = createBottomTabNavigator();
const getLessonUC = new GetLessonUseCase();

type AppScreen =
  | 'splash'
  | 'onboarding'
  | 'profile-select'
  | 'main'
  | 'lesson'
  | 'exercise'
  | 'challenge'
  | 'result'
  | 'settings'
  | 'game-cell'
  | 'game-formula'
  | 'game-speed'
  | 'friend-hub'
  | 'friend-play'
  | 'friend-qr'
  | 'friend-scan'
  | 'friend-result';

interface LessonContext {
  moduleId: string;
  lessonId: string;
}

interface ResultContext {
  score: number;
  stars: number;
  xpEarned: number;
  newBadges: string[];
  leveledUp: boolean;
  newLevel: number;
  moduleId: string;
  nextLessonId: string | null;
}

const GAME_MAX_XP: Record<string, number> = {
  'game-cell': 80,
  'game-formula': 100,
  'game-speed': 120,
};

const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  hapticsEnabled: true,
  notificationsEnabled: true,
  currentStudentId: null,
  isFirstLaunch: false,
  language: 'darija-lat',
};

const TAB_ICONS: Record<string, string> = {
  Home: '🏠', Modules: '📚', Leaderboard: '🏆', Games: '🎮', Simulator: '🖥️',
};

function AppInner() {
  const { S, language, setLanguage, setGender } = useLanguage();
  const { colors, isDark } = useTheme();
  const [screen, setScreen] = useState<AppScreen>('splash');
  const [lessonCtx, setLessonCtx] = useState<LessonContext | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [resultCtx, setResultCtx] = useState<ResultContext | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [recentBadge, setRecentBadge] = useState<string | null>(null);
  const [challengeExercises, setChallengeExercises] = useState<Exercise[]>([]);
  const [challengeType, setChallengeType] = useState<'daily' | 'quiz'>('daily');

  const [friendExercises, setFriendExercises] = useState<Exercise[]>([]);
  const [friendRole, setFriendRole] = useState<'host' | 'guest'>('host');
  const [friendPoolIds, setFriendPoolIds] = useState<string[]>([]);
  const [friendQRPayload, setFriendQRPayload] = useState<QRPayload | null>(null);
  const [friendHostResult, setFriendHostResult] = useState<PlayerResult | null>(null);
  const [friendGuestResult, setFriendGuestResult] = useState<PlayerResult | null>(null);

  const {
    students, currentStudent, currentProgress, settings, loading,
    selectStudent, createStudent, deleteStudent, refreshProgress,
    markFirstLaunchDone, saveSettings, updateGender,
  } = useStudent();

  const {
    modules, leaderboard, lessonResults,
    loadModules, loadLeaderboard, loadLessonResults,
    saveProgress, awardGameXP, markChallengeCompleted,
  } = useProgress(currentStudent?.id ?? null);

  const isChallengeAvailable = isChallengeAvailableToday(
    currentProgress?.lastChallengeDate ?? null,
  );

  const { playClick, playCorrect, playWrong, playLevelUp } = useSound(
    settings?.soundEnabled ?? true,
    settings?.hapticsEnabled ?? true,
  );

  useEffect(() => {
    if (settings?.language && settings.language !== language) setLanguage(settings.language);
  }, [settings?.language]);

  useEffect(() => {
    if (currentStudent?.gender) setGender(currentStudent.gender);
  }, [currentStudent?.gender]);

  useEffect(() => {
    if (!loading) ExpoSplashScreen.hideAsync().catch(() => {});
  }, [loading]);

  useEffect(() => {
    if (!loading && settings?.notificationsEnabled) {
      requestNotificationPermission().then(granted => {
        if (granted) scheduleStreakReminder();
      });
    }
  }, [loading]);

  useEffect(() => {
    const backScreens: AppScreen[] = [
      'lesson', 'exercise', 'challenge', 'result',
      'settings', 'game-cell', 'game-formula', 'game-speed',
      'friend-hub', 'friend-play', 'friend-qr', 'friend-scan', 'friend-result',
    ];
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (backScreens.includes(screen)) {
        if (screen === 'exercise') setScreen('lesson');
        else if (screen === 'result') setScreen('main');
        else setScreen('main');
        return true;
      }
      return false;
    });
    return () => handler.remove();
  }, [screen]);

  const handleSplashFinish = useCallback(() => {
    if (loading) return;
    if (settings?.isFirstLaunch || students.length === 0) setScreen('onboarding');
    else if (!settings?.currentStudentId) setScreen('profile-select');
    else setScreen('main');
  }, [loading, settings, students]);

  const handleLanguageSelect = useCallback(async (lang: AppLanguage) => {
    await saveSettings({ language: lang });
    setLanguage(lang);
  }, [saveSettings, setLanguage]);

  const handleOnboardingComplete = useCallback(async (name: string, avatar: string, gender: StudentGender) => {
    const student = await createStudent(name, avatar, gender);
    await markFirstLaunchDone();
    await selectStudent(student.id);
    setGender(gender);
    setScreen('main');
  }, [createStudent, markFirstLaunchDone, selectStudent, setGender]);

  const handleProfileSelect = useCallback(async (studentId: string) => {
    await selectStudent(studentId);
    const sel = students.find(s => s.id === studentId);
    if (sel?.gender) setGender(sel.gender);
    setScreen('main');
  }, [selectStudent, students, setGender]);

  const handleModulePress = useCallback((moduleId: string) => {
    setSelectedModuleId(moduleId);
    loadLessonResults();
  }, [loadLessonResults]);

  const handleLessonPress = useCallback((moduleId: string, lessonId: string) => {
    const lesson = getLessonUC.execute(moduleId, lessonId);
    if (!lesson) return;
    setLessonCtx({ moduleId, lessonId });
    setCurrentLesson(lesson);
    setScreen('lesson');
    playClick();
  }, [playClick]);

  const handleLessonComplete = useCallback(() => setScreen('exercise'), []);

  const handleExerciseComplete = useCallback(async (score: number) => {
    if (!lessonCtx || !currentLesson) return;
    const stars = calculateStars(score);
    const result = await saveProgress(lessonCtx.moduleId, lessonCtx.lessonId, score);
    await refreshProgress();
    await loadModules();

    if (result) {
      if (result.leveledUp) playLevelUp();
      else if (stars >= 2) playCorrect();
      else if (stars === 0) playWrong();

      if (result.newBadges.length > 0) {
        setRecentBadge(result.newBadges[0]);
        setTimeout(() => setRecentBadge(null), 6000);
      }

      const mod = modules.find(m => m.id === lessonCtx.moduleId);
      const lessons = mod?.lessons ?? [];
      const nextLesson = lessons[lessons.findIndex(l => l.id === lessonCtx.lessonId) + 1] ?? null;

      setResultCtx({
        score, stars,
        xpEarned: result.xpEarned,
        newBadges: result.newBadges,
        leveledUp: result.leveledUp,
        newLevel: result.newLevel,
        moduleId: lessonCtx.moduleId,
        nextLessonId: nextLesson?.id ?? null,
      });
      setScreen('result');
    }
  }, [lessonCtx, currentLesson, saveProgress, refreshProgress, loadModules, modules, playLevelUp, playCorrect, playWrong]);

  const handleChallengeComplete = useCallback(async (score: number) => {
    const maxXP = challengeType === 'daily' ? 50 : 30;
    const xp = Math.round((score / 100) * maxXP);
    if (xp > 0) await awardGameXP(xp);
    if (challengeType === 'daily') await markChallengeCompleted();
    await refreshProgress();
    setScreen('main');
  }, [challengeType, awardGameXP, markChallengeCompleted, refreshProgress]);

  const handleDailyChallenge = useCallback(() => {
    const exs = generateChallenge(currentProgress?.level ?? 1, 5);
    setChallengeExercises(exs);
    setChallengeType('daily');
    setScreen('challenge');
  }, [currentProgress?.level]);

  const handleQuickQuiz = useCallback(() => {
    setChallengeExercises(generateQuickQuiz(5));
    setChallengeType('quiz');
    setScreen('challenge');
  }, []);

  const handleFriendCreate = useCallback(() => {
    const { exercises, poolIds } = generateFriendChallenge(currentProgress?.level ?? 1, 5);
    setFriendExercises(exercises);
    setFriendPoolIds(poolIds);
    setFriendRole('host');
    setScreen('friend-play');
  }, [currentProgress?.level]);

  const handleFriendHostComplete = useCallback((score: number, timeSeconds: number) => {
    if (!currentStudent) return;
    const stars = calculateStars(score);
    const payload: QRPayload = {
      v: 1,
      q: friendPoolIds,
      p: currentStudent.name,
      a: currentStudent.avatar,
      s: score,
      st: stars,
      ti: timeSeconds,
    };
    setFriendQRPayload(payload);
    setFriendHostResult({ name: currentStudent.name, avatar: currentStudent.avatar, score, stars, timeSeconds });
    setScreen('friend-qr');
  }, [currentStudent, friendPoolIds]);

  const handleFriendScanned = useCallback((payload: QRPayload) => {
    const exercises = getExercisesByPoolIds(payload.q);
    if (exercises.length === 0) return;
    setFriendExercises(exercises);
    setFriendRole('guest');
    setFriendHostResult({ name: payload.p, avatar: payload.a, score: payload.s, stars: payload.st, timeSeconds: payload.ti });
    setFriendQRPayload(payload);
    setScreen('friend-play');
  }, []);

  const handleFriendGuestComplete = useCallback(async (score: number, timeSeconds: number) => {
    if (!currentStudent || !friendHostResult) return;
    const stars = calculateStars(score);
    const guestResult: PlayerResult = { name: currentStudent.name, avatar: currentStudent.avatar, score, stars, timeSeconds };
    setFriendGuestResult(guestResult);
    const hostWins = friendHostResult.score > score || (friendHostResult.score === score && friendHostResult.timeSeconds < timeSeconds);
    const xp = hostWins ? 10 : 25;
    await awardGameXP(xp);
    await refreshProgress();
    setScreen('friend-result');
  }, [currentStudent, friendHostResult, awardGameXP, refreshProgress]);

  const handlePlayGame = useCallback((game: 'cell' | 'formula' | 'speed') => {
    setScreen(`game-${game}` as AppScreen);
  }, []);

  const handleGameComplete = useCallback(async (score: number) => {
    const maxXP = GAME_MAX_XP[screen] ?? 80;
    await awardGameXP(Math.round((score / 100) * maxXP));
    await refreshProgress();
    setScreen('main');
  }, [screen, awardGameXP, refreshProgress]);

  const handleResultNext = useCallback(() => {
    if (resultCtx?.nextLessonId) {
      handleLessonPress(resultCtx.moduleId, resultCtx.nextLessonId);
    } else {
      setScreen('main');
      setSelectedModuleId(null);
    }
  }, [resultCtx, handleLessonPress]);

  const handleSettingChange = useCallback(async (key: keyof AppSettings, value: boolean | string) => {
    await saveSettings({ [key]: value });
    if (key === 'language') setLanguage(value as AppLanguage);
    if (key === 'notificationsEnabled') {
      if (value) {
        const granted = await requestNotificationPermission();
        if (granted) scheduleStreakReminder();
      } else {
        const { cancelAllNotifications } = await import('./src/shared/utils/notifications');
        cancelAllNotifications();
      }
    }
  }, [saveSettings, setLanguage]);

  const defaultBarStyle = isDark ? 'light-content' : 'dark-content';

  // Must be above all early returns — calling a hook after a conditional return
  // causes React to see a different hook count per render and crash immediately.
  const tabBarStyle = React.useMemo(() => ({
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 64,
    paddingBottom: 8,
    paddingTop: 4,
  }), [colors]);

  const wrap = (statusBg: string, child: React.ReactNode, barStyle?: 'dark-content' | 'light-content') => (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle={barStyle ?? defaultBarStyle} backgroundColor={statusBg} />
        {child}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );

  if (screen === 'splash' || loading)
    return wrap(colors.splashBg, <SplashScreen onFinish={handleSplashFinish} />);

  if (screen === 'onboarding')
    return wrap(colors.splashBg, <OnboardingScreen onComplete={handleOnboardingComplete} onLanguageSelect={handleLanguageSelect} />);

  if (screen === 'profile-select')
    return wrap(colors.splashBg, <ProfileSelectScreen students={students} onSelect={handleProfileSelect} onCreateNew={() => setScreen('onboarding')} onDelete={deleteStudent} />);

  if (screen === 'lesson' && currentLesson)
    return wrap(colors.white, <LessonScreen lesson={currentLesson} onComplete={handleLessonComplete} onBack={() => setScreen('main')} />);

  if (screen === 'exercise' && currentLesson)
    return wrap(colors.white, <ExerciseScreen exercises={currentLesson.exercises} lessonTitle={currentLesson.titleFr} onComplete={handleExerciseComplete} onBack={() => setScreen('main')} />);

  if (screen === 'challenge')
    return wrap(colors.white, <ExerciseScreen exercises={challengeExercises} lessonTitle={S.challengeTitle} onComplete={handleChallengeComplete} onBack={() => setScreen('main')} />);

  if (screen === 'result' && resultCtx)
    return wrap(colors.splashBg, <ResultScreen score={resultCtx.score} stars={resultCtx.stars} xpEarned={resultCtx.xpEarned} newBadges={resultCtx.newBadges} leveledUp={resultCtx.leveledUp} newLevel={resultCtx.newLevel} onNext={handleResultNext} onRetry={() => setScreen('exercise')} />);

  if (screen === 'settings')
    return wrap(colors.background, <SettingsScreen settings={settings ?? DEFAULT_SETTINGS} onSettingChange={handleSettingChange} onSwitchProfile={() => setScreen('profile-select')} studentName={currentStudent?.name ?? ''} onGenderChange={async (g) => { setGender(g); await updateGender(g); }} />);

  if (screen === 'friend-hub')
    return wrap(colors.background, <FriendChallengeScreen onCreate={handleFriendCreate} onScan={() => setScreen('friend-scan')} onBack={() => setScreen('main')} />);

  if (screen === 'friend-play' && friendExercises.length > 0)
    return wrap(colors.background, <FriendChallengePlayScreen
      exercises={friendExercises}
      role={friendRole}
      hostName={friendRole === 'guest' ? friendHostResult?.name : undefined}
      onComplete={friendRole === 'host' ? handleFriendHostComplete : handleFriendGuestComplete}
      onBack={() => setScreen('friend-hub')}
    />);

  if (screen === 'friend-qr' && friendQRPayload)
    return wrap(colors.background, <FriendChallengeQRScreen payload={friendQRPayload} onDone={() => setScreen('main')} />);

  if (screen === 'friend-scan')
    return wrap(colors.background, <FriendChallengeScanScreen onScanned={handleFriendScanned} onBack={() => setScreen('friend-hub')} />);

  if (screen === 'friend-result' && friendHostResult && friendGuestResult)
    return wrap(colors.splashBg, <FriendChallengeResultScreen
      host={friendHostResult}
      guest={friendGuestResult}
      xpEarned={25}
      onPlayAgain={() => setScreen('friend-hub')}
      onHome={() => setScreen('main')}
    />);

  if (screen === 'game-cell')
    return wrap(colors.accentBlue, <CellNavigatorGame onComplete={handleGameComplete} onBack={() => setScreen('main')} />, 'light-content');

  if (screen === 'game-formula')
    return wrap(colors.primary, <FormulaFixerGame onComplete={handleGameComplete} onBack={() => setScreen('main')} />, 'light-content');

  if (screen === 'game-speed')
    return wrap(colors.accent, <SpeedQuizGame onComplete={handleGameComplete} onBack={() => setScreen('main')} />, 'light-content');

  // ── Main tabs ──
  const modLessons = selectedModuleId ? getLessonUC.getLessonsForModule(selectedModuleId) : [];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle={defaultBarStyle} backgroundColor={colors.surface} />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle,
              tabBarActiveTintColor: colors.accent,
              tabBarInactiveTintColor: colors.textMuted,
              tabBarLabelStyle: styles.tabLabel,
              tabBarIcon: ({ focused }) => (
                <Text style={{ fontSize: focused ? 22 : 18 }}>
                  {TAB_ICONS[route.name] ?? '•'}
                </Text>
              ),
            })}
          >
            <Tab.Screen name="Home" options={{ tabBarLabel: S.tabHome }}>
              {() => currentStudent ? (
                <HomeScreen
                  student={currentStudent}
                  progress={currentProgress}
                  modules={modules}
                  onModulePress={handleModulePress}
                  onProfilePress={() => setScreen('settings')}
                  onDailyChallenge={handleDailyChallenge}
                  onQuickQuiz={handleQuickQuiz}
                  onFriendChallenge={() => setScreen('friend-hub')}
                  recentBadge={recentBadge}
                  isChallengeAvailable={isChallengeAvailable}
                />
              ) : <View />}
            </Tab.Screen>

            <Tab.Screen name="Modules" options={{ tabBarLabel: S.tabModules }}>
              {() => (
                <ModuleListScreen
                  modules={modules}
                  onModulePress={handleModulePress}
                  selectedModuleId={selectedModuleId}
                  lessons={modLessons}
                  lessonResults={lessonResults}
                  onLessonPress={handleLessonPress}
                  onBack={() => setSelectedModuleId(null)}
                />
              )}
            </Tab.Screen>

            <Tab.Screen
              name="Leaderboard"
              options={{ tabBarLabel: S.tabLeaderboard }}
              listeners={{ tabPress: () => loadLeaderboard() }}
            >
              {() => (
                <LeaderboardScreen
                  entries={leaderboard}
                  currentStudentId={currentStudent?.id ?? ''}
                  onRefresh={loadLeaderboard}
                />
              )}
            </Tab.Screen>

            <Tab.Screen name="Games" options={{ tabBarLabel: S.tabGames }}>
              {() => (
                <GamesScreen
                  progress={currentProgress}
                  onPlayGame={handlePlayGame}
                  onDailyChallenge={handleDailyChallenge}
                  onQuickQuiz={handleQuickQuiz}
                  isChallengeAvailable={isChallengeAvailable}
                />
              )}
            </Tab.Screen>

            <Tab.Screen name="Simulator" options={{ tabBarLabel: S.tabSimulator }}>
              {() => <SimulatorScreen />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppInner />
      </LanguageProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  tabLabel: { fontSize: 10, fontWeight: '600' },
});
