import React, { createContext, useContext, useState, useCallback } from 'react';
import { AppLanguage, AppStrings, LANGUAGE_STRINGS } from '../constants/strings';
import { GENDERED_STRINGS, GenderedStrings, pickGendered } from '../constants/genderedStrings';
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
  initialLanguage = 'darija-ar',
  initialGender = 'male',
  onLanguageChange,
}: {
  children: React.ReactNode;
  initialLanguage?: AppLanguage;
  initialGender?: StudentGender;
  onLanguageChange?: (lang: AppLanguage) => void;
}) {
  const [language, setLangState] = useState<AppLanguage>(initialLanguage);
  const [gender, setGenderState] = useState<StudentGender>(initialGender);

  const setLanguage = useCallback((lang: AppLanguage) => {
    setLangState(lang);
    onLanguageChange?.(lang);
  }, [onLanguageChange]);

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
