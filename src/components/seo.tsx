import React, { memo, FC } from 'react';
import Helmet from 'react-helmet';
import { usePageContext } from './page-context';
import { Language } from '@utils/language';

export const SEO: FC = memo(() => {
  const {
    title,
    description,
    lang,
    alternateLanguages,
    image,
  } = usePageContext();

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | Komak`}
      link={alternateLanguages?.map(lang => ({
        rel: 'alternate',
        hrefLang: lang.lang,
        href: `https://komak.io${Language.getLanguageLink(
          lang.lang,
          lang.uid
        )}`,
      }))}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: 'og:image',
          content: image
            ? image.url
            : 'https://images.prismic.io/komak/3ebea28b-f922-4970-9108-12f344c9c5d6_%28Put+Here%29+Cover+%26+Profile+photo.png?auto=compress,format',
        },
        {
          property: 'twitter:image',
          content: image
            ? image.url
            : 'https://images.prismic.io/komak/3ebea28b-f922-4970-9108-12f344c9c5d6_%28Put+Here%29+Cover+%26+Profile+photo.png?auto=compress,format',
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        // {
        //   name: `twitter:creator`,
        //   content: site?.siteMetadata?.author,
        // },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ]}
    />
  );
});

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};
