import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  Dimensions, Alert, KeyboardAvoidingView, Platform, ScrollView, Animated,
} from 'react-native';
import { spacing, radius } from '../theme/spacing';
import { AvatarPicker } from '../components/AvatarPicker';
import { AppLanguage, LANGUAGE_OPTIONS, LANGUAGE_STRINGS } from '../../shared/constants/strings';
import { useLanguage } from '../../shared/context/LanguageContext';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';
import { StudentGender } from '../../domain/student/Student';

const { width } = Dimensions.get('window');

interface Props {
  onComplete: (name: string, avatar: string, gender: StudentGender) => Promise<void>;
  onLanguageSelect: (lang: AppLanguage) => void;
}

export function OnboardingScreen({ onComplete, onLanguageSelect }: Props) {
  const { S, language, setLanguage } = useLanguage();
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  const [step, setStep] = useState<'language' | 0 | 1 | 2 | 'gender'>('language');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🧑‍🎓');
  const [gender, setGender] = useState<StudentGender>('male');
  const [loading, setLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const emojiScale = useRef(new Animated.Value(1)).current;
  const btnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (typeof step !== 'number') return;
    fadeAnim.setValue(0);
    slideAnim.setValue(24);
    emojiScale.setValue(0.6);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 280, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 80, friction: 10 }),
      Animated.spring(emojiScale, { toValue: 1, useNativeDriver: true, tension: 120, friction: 8 }),
    ]).start();
  }, [step]);

  const STEPS = [
    { emoji: '🎉', title: S.onboard1Title, desc: S.onboard1Desc },
    { emoji: '🎮', title: S.onboard2Title, desc: S.onboard2Desc },
    { emoji: '🚀', title: S.onboard3Title, desc: S.onboard3Desc },
  ];

  const handleLanguagePick = (lang: AppLanguage) => {
    setLanguage(lang);
    onLanguageSelect(lang);
    if (lang === 'en') {
      Alert.alert('English Mode', LANGUAGE_STRINGS['en'].englishNote, [{ text: 'OK', onPress: () => setStep(0) }]);
    } else {
      setStep(0);
    }
  };

  const handleNext = () => {
    if (step === 0) setStep(1);
    else if (step === 1) setStep(2);
  };

  const handleStart = async () => {
    if (!name.trim()) {
      Alert.alert('', S.nameLabel.replace(':', '?'));
      return;
    }
    setStep('gender');
  };

  const handleGenderConfirm = async () => {
    setLoading(true);
    await onComplete(name.trim(), avatar, gender);
    setLoading(false);
  };

  if (step === 'language') {
    return (
      <View style={styles.langContainer}>
        <Text style={styles.langTitle}>🌍 {LANGUAGE_STRINGS['darija-lat'].langSelectTitle}</Text>
        <Text style={styles.langSub}>Choose your language</Text>
        <View style={styles.langGrid}>
          {LANGUAGE_OPTIONS.map(opt => (
            <TouchableOpacity
              key={opt.id}
              style={[styles.langCard, language === opt.id && styles.langCardActive]}
              onPress={() => handleLanguagePick(opt.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.langFlag}>{opt.flag}</Text>
              <Text style={[styles.langName, language === opt.id && styles.langNameActive]}>
                {opt.name}
              </Text>
              <Text style={styles.langSubText}>{opt.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  if (step === 'gender') {
    const isAr = language === 'darija-ar';
    const isLat = language === 'darija-lat';
    const isFr = language === 'fr';

    const title = isAr ? 'شكون نتا/نتي؟' : isLat ? 'Shkoun nta/nti?' : isFr ? 'Qui es-tu?' : 'Who are you?';
    const maleLabel = isAr ? '👦 ولد' : isLat ? '👦 Weld' : isFr ? '👦 Garçon' : '👦 Boy';
    const femaleLabel = isAr ? '👧 بنت' : isLat ? '👧 Bent' : isFr ? '👧 Fille' : '👧 Girl';
    const confirmLabel = isAr ? 'بدا! 🚀' : isLat ? 'Bda! 🚀' : isFr ? 'Commencer! 🚀' : 'Start! 🚀';

    return (
      <View style={styles.genderContainer}>
        <Text style={styles.genderTitle}>{title}</Text>
        <View style={styles.genderRow}>
          <TouchableOpacity
            style={[styles.genderCard, gender === 'male' && styles.genderCardActive]}
            onPress={() => setGender('male')}
            activeOpacity={0.8}
          >
            <Text style={styles.genderEmoji}>👦</Text>
            <Text style={[styles.genderLabel, gender === 'male' && styles.genderLabelActive]}>{maleLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderCard, gender === 'female' && styles.genderCardActiveFemale]}
            onPress={() => setGender('female')}
            activeOpacity={0.8}
          >
            <Text style={styles.genderEmoji}>👧</Text>
            <Text style={[styles.genderLabel, gender === 'female' && styles.genderLabelActiveFemale]}>{femaleLabel}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.btn, loading && { opacity: 0.6 }]}
          onPress={handleGenderConfirm}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>{loading ? S.loading : confirmLabel}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const current = STEPS[step as number];
  const isLast = step === 2;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.stepContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Animated.View style={{ transform: [{ scale: emojiScale }] }}>
            <Text style={styles.bigEmoji}>{current.emoji}</Text>
          </Animated.View>
          <Text style={[styles.title, S.isRTL && styles.rtl]}>{current.title}</Text>
          <Text style={[styles.desc, S.isRTL && styles.rtl]}>{current.desc}</Text>
        </Animated.View>

        {isLast && (
          <View style={styles.form}>
            <Text style={[styles.label, S.isRTL && styles.rtl]}>{S.nameLabel}</Text>
            <TextInput
              style={[styles.input, S.isRTL && styles.rtlInput]}
              placeholder={S.namePlaceholder}
              placeholderTextColor={colors.textMuted}
              value={name}
              onChangeText={setName}
              maxLength={20}
              textAlign={S.isRTL ? 'right' : 'left'}
            />
            <Text style={[styles.label, S.isRTL && styles.rtl]}>{S.avatarLabel}</Text>
            <AvatarPicker selected={avatar} onSelect={setAvatar} />
          </View>
        )}

        <View style={styles.dots}>
          {[0, 1, 2].map(i => (
            <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
          ))}
        </View>

        <Animated.View style={{ transform: [{ scale: btnScale }] }}>
          <TouchableOpacity
            style={[styles.btn, loading && { opacity: 0.6 }]}
            onPress={isLast ? handleStart : handleNext}
            onPressIn={() => !loading && Animated.spring(btnScale, { toValue: 0.95, useNativeDriver: true, speed: 40, bounciness: 0 }).start()}
            onPressOut={() => !loading && Animated.spring(btnScale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 4 }).start()}
            disabled={loading}
            activeOpacity={0.9}
            accessibilityRole="button"
          >
            <Text style={styles.btnText}>
              {loading ? S.loading : isLast ? S.startBtn : S.nextBtn}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity onPress={() => setStep('language')} style={styles.changeLangBtn}>
          <Text style={styles.changeLangText}>🌍 {language === 'darija-lat' ? 'Bdel Lgha' : language === 'darija-ar' ? 'بدل اللغة' : language === 'fr' ? 'Changer langue' : 'Change language'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  langContainer: {
    flex: 1, backgroundColor: c.splashBg, alignItems: 'center',
    justifyContent: 'center', padding: spacing.xl, gap: spacing.xl,
  },
  langTitle: { fontSize: 26, fontWeight: '800', color: c.textPrimary, textAlign: 'center' },
  langSub: { fontSize: 14, color: c.textSecondary, textAlign: 'center' },
  langGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, justifyContent: 'center', width: '100%' },
  langCard: {
    width: (width - spacing.xl * 2 - spacing.md) / 2,
    backgroundColor: c.surface, borderRadius: radius.xl, padding: spacing.lg,
    alignItems: 'center', gap: spacing.sm, borderWidth: 2, borderColor: c.border,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  langCardActive: { borderColor: c.accent, backgroundColor: c.accent + '12' },
  langFlag: { fontSize: 40 },
  langName: { fontSize: 20, fontWeight: '800', color: c.textPrimary, textAlign: 'center' },
  langNameActive: { color: c.accent },
  langSubText: { fontSize: 11, color: c.textMuted, textAlign: 'center' },
  genderContainer: {
    flex: 1, backgroundColor: c.splashBg, alignItems: 'center',
    justifyContent: 'center', padding: spacing.xl, gap: spacing.xl,
  },
  genderTitle: { fontSize: 26, fontWeight: '800', color: c.textPrimary, textAlign: 'center' },
  genderRow: { flexDirection: 'row', gap: spacing.lg },
  genderCard: {
    width: (width - spacing.xl * 2 - spacing.lg) / 2,
    backgroundColor: c.surface, borderRadius: radius.xl, padding: spacing.xl,
    alignItems: 'center', gap: spacing.md, borderWidth: 3, borderColor: c.border,
  },
  genderCardActive: { borderColor: c.primary, backgroundColor: c.primary + '12' },
  genderCardActiveFemale: { borderColor: c.accent, backgroundColor: c.accent + '12' },
  genderEmoji: { fontSize: 56 },
  genderLabel: { fontSize: 16, fontWeight: '700', color: c.textSecondary, textAlign: 'center' },
  genderLabelActive: { color: c.primary },
  genderLabelActiveFemale: { color: c.accent },
  container: { flex: 1, backgroundColor: c.splashBg },
  scrollContent: {
    padding: spacing.xxl, paddingTop: spacing.huge, gap: spacing.xl, flexGrow: 1, justifyContent: 'center',
  },
  stepContainer: { alignItems: 'center', gap: spacing.md },
  bigEmoji: { fontSize: 72 },
  title: { fontSize: 24, fontWeight: '800', color: c.textPrimary, textAlign: 'center' },
  desc: { fontSize: 15, color: c.textSecondary, textAlign: 'center', lineHeight: 22 },
  rtl: { textAlign: 'right', writingDirection: 'rtl' },
  rtlInput: { textAlign: 'right' },
  form: { gap: spacing.md },
  label: { fontSize: 15, fontWeight: '600', color: c.textPrimary },
  input: {
    backgroundColor: c.surface, borderRadius: radius.md,
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
    fontSize: 16, color: c.textPrimary, borderWidth: 2, borderColor: c.border,
  },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: c.border },
  dotActive: { backgroundColor: c.accent, width: 24 },
  btn: { backgroundColor: c.accent, borderRadius: radius.pill, paddingVertical: spacing.lg, alignItems: 'center' },
  btnText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  changeLangBtn: { alignItems: 'center', paddingVertical: spacing.sm },
  changeLangText: { fontSize: 13, color: c.textMuted },
});
