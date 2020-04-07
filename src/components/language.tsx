import React, {
  FC,
  useEffect,
  Context,
  createContext,
  useContext,
} from 'react';
import { Language } from '@utils/language';

export const LanguageContext: Context<string> = createContext<string>(null);

export const useLanguage = (): string => {
  return useContext(LanguageContext);
};

export const LanguageChooser: FC = () => {
  useEffect(() => {
    const shouldSwitchToLang = Language.detect();
    if (!shouldSwitchToLang) {
      return;
    }
    location.href = `/${shouldSwitchToLang}`;
  }, []);
  return null;
};
