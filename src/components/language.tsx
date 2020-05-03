import { FC, useEffect, memo } from 'react';
import { Language } from '@utils/language';
import { useLanguage, usePageContext } from './page-context';
import { navigate } from 'gatsby';

export const LanguageChooser: FC = memo(() => {
  const context = usePageContext();
  const l = useLanguage();
  const language = l === 'default' ? 'en' : l;

  useEffect(() => {
    const shouldSwitchToLang = Language.detect();
    if (!shouldSwitchToLang || language === shouldSwitchToLang) {
      return;
    }

    console.log(`Should switch to ${shouldSwitchToLang}`);
    const finalSlug = context.slug === 'home' ? '' : context.slug;
    if (shouldSwitchToLang === Language.defaultLang) {
      navigate(`/${finalSlug}`);
    } else {
      navigate(`/${shouldSwitchToLang}/${finalSlug}`);
    }
  }, [context.slug, language]);
  return null;
});
