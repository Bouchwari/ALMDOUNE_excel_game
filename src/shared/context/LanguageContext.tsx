// TODO (Google Play expansion): Restore setLanguage, initialLanguage prop, and onLanguageChange
// when adding 'fr' | 'en' back to AppLanguage
import React, { createContext, useContext, useState, useCallback } from 'react';
import { AppLanguage, AppStrings, LANGUAGE_STRINGS } from '../constants/strings';
import { GENDERED_STRINGS, GenderedStrings } from '../constants/genderedStrings';
import { StudentGender } from '../../domain/student/Student';

interface LanguageContextValue {
  language: AppLanguage;
  S: AppStrings;
  G: GenderedStrings;
  gender: StudentGender;
  setLanguage: (lang: AppLanguage) => void;
  setGender: (g: StudentGender) => void;
  /** Pick the male or female form of a gendered string pair */
  g: (male: string, female: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'darija-ar',
  S: LANGUAGE_STRINGS['darija-ar'],
  G: GENDERED_STRINGS['darija-ar'],
  gender: 'male',
  setLanguage: () => {},
  setGender: () => {},
  g: (male) => male,
});

export function LanguageProvider({
  children,
  initialGender = 'male',
}: {
  children: React.ReactNode;
  initialGender?: StudentGender;
}) {
  const language: AppLanguage = 'darija-ar';
  const [gender, setGenderState] = useState<StudentGender>(initialGender);

  // TODO (Google Play expansion): Replace this no-op with real language switching
  const setLanguage = useCallback((_lang: AppLanguage) => {}, []);

  const setGender = useCallback((g: StudentGender) => {
    setGenderState(g);
  }, []);

  const g = useCallback((male: string, female: string): string => {
    return gender === 'female' ? female : male;
  }, [gender]);

  return (
    <LanguageContext.Provider value={{
      language,
      S: LANGUAGE_STRINGS[language],
      G: GENDERED_STRINGS[language],
      gender,
      setLanguage,
      setGender,
      g,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
