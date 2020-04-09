import React, { memo, FC } from 'react';
import Helmet from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';
import { withPreview } from 'gatsby-source-prismic-graphql';

interface SEOProps {
  description?: string;
  lang: string;
  meta?: { name: string; content: string }[];
  title: string;
  alternateLanguages?: {
    lang: string;
    uid: string;
  }[];
  image?: {
    url: string;
  };
}

export const SEO: FC<SEOProps> = memo(
  ({ description, lang, meta, title, alternateLanguages, image }) => {
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
    // 'https://images.prismic.io/komak/3ebea28b-f922-4970-9108-12f344c9c5d6_%28Put+Here%29+Cover+%26+Profile+photo.png?auto=compress,format';
    return (
      <StaticQuery
        query={graphQLQuery}
        render={withPreview(({ site }) => {
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
        }, graphQLQuery)}
      />
    );
  }
);

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};
