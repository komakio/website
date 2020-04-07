import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '@components/layout/layout';
import { Container } from 'styled-bootstrap-grid';
import { SEO } from '@components/seo';
import { PageElement } from './element';

const Page = (props: any) => {
  const doc = props.data?.prismic?.allPages?.edges?.slice(0, 1)?.pop();
  if (!doc?.node) {
    return null;
  }

  const topMenus = props.data.prismic?.allTopmenus?.edges[0].node.elements;

  const { title, description, body, _meta } = doc.node;

  return (
    <Layout lang={_meta.lang} topMenus={topMenus}>
      <Container>
        <SEO
          lang={_meta.lang}
          title={title}
          description={description}
          alternateLanguages={_meta.alternateLanguages}
        />

        {body?.map((item: any, index: number) => (
          <PageElement
            key={`${item.__typename}${index}`}
            item={item}
            index={index}
          />
        ))}
      </Container>
    </Layout>
  );
};

export default Page;

export const query = graphql`
  query PageQuery($uid: String, $lang: String) {
    prismic {
      allTopmenus(lang: $lang) {
        edges {
          node {
            elements {
              button
              link
              title
            }
          }
        }
      }
      allPages(uid: $uid, lang: $lang) {
        edges {
          node {
            title
            description
            _meta {
              lang
              alternateLanguages {
                lang
                uid
              }
            }
            body {
              ... on PRISMIC_PageBodyText {
                type
                label
                primary {
                  text
                }
              }
              ... on PRISMIC_PageBodyImage {
                type
                label
                primary {
                  image
                }
              }
              ... on PRISMIC_PageBodyPage_title {
                type
                label
                primary {
                  heading
                }
              }
            }
          }
        }
      }
    }
  }
`;
