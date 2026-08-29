import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "te" | "hi";

type I18nContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    assistant: "Health Assistant",
    findCare: "Find Care",
    doctors: "Doctors",
    specializations: "Specializations",
    appointments: "Appointments",
    myHealth: "My Health",
    reminders: "Reminders",
    emergency: "Emergency",
    homeTitle: "Healthcare assistance, within everyone's reach.",
    talk: "Talk to Nexora",
    findHealthcare: "Find Healthcare",
  },
  te: {
    home: "హోమ్",
    assistant: "ఆరోగ్య సహాయకుడు",
    findCare: "ఆరోగ్య సేవలు",
    doctors: "వైద్యులు",
    specializations: "ప్రత్యేక విభాగాలు",
    appointments: "అపాయింట్మెంట్లు",
    myHealth: "నా ఆరోగ్యం",
    reminders: "రిమైండర్లు",
    emergency: "అత్యవసరం",
    homeTitle: "ఆరోగ్య సహాయం, అందరికీ అందుబాటులో.",
    talk: "నెక్సోరాతో మాట్లాడండి",
    findHealthcare: "ఆరోగ్య సేవలను కనుగొనండి",
  },
  hi: {
    home: "होम",
    assistant: "स्वास्थ्य सहायक",
    findCare: "देखभाल खोजें",
    doctors: "डॉक्टर",
    specializations: "विशेषज्ञताएँ",
    appointments: "अपॉइंटमेंट",
    myHealth: "मेरा स्वास्थ्य",
    reminders: "रिमाइंडर",
    emergency: "आपातकाल",
    homeTitle: "स्वास्थ्य सहायता, सबकी पहुँच में।",
    talk: "नेक्सोरा से बात करें",
    findHealthcare: "स्वास्थ्य सेवा खोजें",
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return saved === "te" || saved === "hi" ? (saved as Language) : "en";
  });

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    localStorage.setItem("language", nextLanguage);
  };

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string) => translations[language][key] ?? key;

  return React.createElement(
    I18nContext.Provider,
    { value: { language, setLanguage, t } },
    children
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return context;
};
