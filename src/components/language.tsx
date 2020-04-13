import { FC, useEffect, memo } from 'react';
import { Language } from '@utils/language';
import { useLanguage, useAllPages, usePageContext } from './page-context';

export const LanguageChooser: FC = memo(() => {
  const pages = useAllPages();
  const language = useLanguage();
  const context = usePageContext();

  useEffect(() => {
    const shouldSwitchToLang = Language.detect();
    if (!shouldSwitchToLang || language === shouldSwitchToLang) {
      return;
    }

    console.log(`Should switch to ${shouldSwitchToLang}`);
    if (shouldSwitchToLang === Language.defaultLang) {
      const currentPage = pages.find(p =>
        p.alternateLanguages.find(l => l.uid === context.uid)
      );

      location.href =
        currentPage.uid === 'homepage' ? '/' : `/${currentPage.uid}`;
    }
    const pagesForMyLanguage = pages?.map(p => ({
      uid: p.uid,
      alternateUid: p.alternateLanguages.find(
        a => a.lang === shouldSwitchToLang
      )?.uid,
    }));

    const pageToSwitchTo = pagesForMyLanguage?.find(p => context.uid === p.uid);

    if (pageToSwitchTo?.alternateUid) {
      location.href = Language.getLanguageLink(
        shouldSwitchToLang,
        pageToSwitchTo.alternateUid
      );
    }
  }, [language, pages, context.uid]);
  return null;
});
