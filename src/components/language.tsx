import { FC, useEffect, memo } from 'react';
import { Language } from '@utils/language';
import { useLanguage, useAllPages, usePageContext } from './page-context';

export const LanguageChooser: FC = memo(() => {
  const pages = useAllPages();
  const language = useLanguage();
  const context = usePageContext();

  useEffect(() => {
    if (!context) {
      return;
    }
    const shouldSwitchToLang = Language.detect();
    if (!shouldSwitchToLang || language === shouldSwitchToLang) {
      return;
    }

    console.log(`Should switch to ${shouldSwitchToLang}`);
    if (shouldSwitchToLang === Language.defaultLang && pages) {
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

    if (!context.lang) {
      return;
    }
    const englishUid =
      context.lang === 'en-us'
        ? context.uid
        : context.alternateLanguages.find(l => l.lang === 'en-us')?.uid;
    const pageToSwitchTo = pagesForMyLanguage?.find(p => englishUid === p.uid);
    if (pageToSwitchTo?.alternateUid) {
      location.href = Language.getLanguageLink(
        shouldSwitchToLang,
        pageToSwitchTo.alternateUid
      );
    }
  }, [language, pages, context]);
  return null;
});
