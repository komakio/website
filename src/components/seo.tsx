import React, { memo, FC } from 'react';
import Helmet from 'react-helmet';
import { usePageContext } from './page-context';
import { Language } from '@utils/language';

export const SEO: FC = memo(() => {
  const { title, description, lang, slug, image } = usePageContext();

  const otherLanguages = Language.languageTags.filter(l => l != lang);

  return (
    <Helmet
      htmlAttributes={{
        lang: lang === 'default' ? 'en' : lang,
      }}
      title={title}
      titleTemplate={`%s | Komak`}
      link={otherLanguages?.map(lang => ({
        rel: 'alternate',
        hrefLang: lang === 'default' ? 'en' : lang,
        href: `https://komak.io${lang === 'default' ? '' : `/${lang}`}/${slug}`,
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
          content:
            image ||
            'https://a.storyblok.com/f/82913/1200x630/993f124575/cover.jpeg',
        },
        {
          property: 'twitter:image',
          content:
            image ||
            'https://a.storyblok.com/f/82913/1200x630/993f124575/cover.jpeg',
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
