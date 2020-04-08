import React, { memo, FC } from 'react';
import Helmet from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';

interface SEOProps {
  description?: string;
  lang: string;
  meta?: { name: string; content: string }[];
  title: string;
  alternateLanguages?: {
    lang: string;
    uid: string;
  }[];
}

export const SEO: FC<SEOProps> = memo(
  ({ description, lang, meta, title, alternateLanguages }) => {
    const graphQLQuery = graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `;
    // const { site } = useStaticQuery(graphQLQuery);

    return (
      <StaticQuery
        query={graphQLQuery}
        render={({ site }) => {
          const metaDescription =
            description || site?.siteMetadata?.description;

          return (
            <Helmet
              htmlAttributes={{
                lang,
              }}
              title={title}
              titleTemplate={`%s | ${site?.siteMetadata?.title}`}
              link={alternateLanguages?.map(lang => ({
                rel: 'alternate',
                hrefLang: lang.lang,
                href: `https://komak.io/${lang.uid}`,
              }))}
              meta={[
                {
                  name: `description`,
                  content: metaDescription,
                },
                {
                  property: `og:title`,
                  content: title,
                },
                {
                  property: `og:description`,
                  content: metaDescription,
                },
                {
                  property: `og:type`,
                  content: `website`,
                },
                {
                  name: `twitter:card`,
                  content: `summary`,
                },
                {
                  name: `twitter:creator`,
                  content: site?.siteMetadata?.author,
                },
                {
                  name: `twitter:title`,
                  content: title,
                },
                {
                  name: `twitter:description`,
                  content: metaDescription,
                },
              ].concat(meta)}
            />
          );
        }}
      />
    );
  }
);

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};
