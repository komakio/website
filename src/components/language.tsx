import React, {
  FC,
  useEffect,
  Context,
  createContext,
  useContext,
  memo,
} from 'react';
import { Language } from '@utils/language';
import { StaticQuery, graphql } from 'gatsby';
import { withPreview } from 'gatsby-source-prismic-graphql';

export const LanguageContext: Context<string> = createContext<string>(null);

export const useLanguage = (): string => {
  return useContext(LanguageContext);
};

export const LanguageChooser: FC = () => {
  const language = useLanguage();
  const graphQLQuery = graphql`
    query {
      allSitePage(
        filter: { context: { lang: { eq: "en-us" }, uid: { ne: "" } } }
      ) {
        edges {
          node {
            context {
              uid
              alternateLanguages {
                uid
                lang
              }
            }
          }
        }
      }
    }
  `;
  // const query = useStaticQuery(graphQLQuery);

  return (
    <StaticQuery
      query={graphQLQuery}
      render={withPreview(
        query => (
          <LanguageRedirect
            pages={query.allSitePage.edges.map(e => e.node.context)}
          />
        ),
        graphQLQuery
      )}
    />
  );
};

export const LanguageRedirect: FC<{
  pages: { alternateLanguages: { uid: string; lang: string }[]; uid: string }[];
}> = memo(({ pages }) => {
  const language = useLanguage();
  useEffect(() => {
    const shouldSwitchToLang = Language.detect();
    if (!shouldSwitchToLang || language === shouldSwitchToLang) {
      return;
    }

    console.log(`Should switch to ${shouldSwitchToLang}`);
    const pagesForMyLanguage = pages.map(p => ({
      uid: p.uid,
      alternateUid: p.alternateLanguages.find(
        a => a.lang === shouldSwitchToLang
      )?.uid,
    }));

    const pageToSwitchTo = pagesForMyLanguage.find(p =>
      document.location.href.includes(p.uid)
    );

    if (pageToSwitchTo?.alternateUid) {
      location.href = `/${shouldSwitchToLang}/${pageToSwitchTo.alternateUid}`;
    }
  }, [language, pages]);
  return null;
});
