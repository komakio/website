import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StoryblokEntry } from '../../templates/storyblok-entry';
import { useLanguage } from '@components/page-context';

export const Header = () => {
  const lang = useLanguage();
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      allStoryblokEntry(filter: { slug: { eq: "global-header" } }) {
        edges {
          node {
            lang
            content
            uuid
          }
        }
      }
    }
  `);
  const story = data.allStoryblokEntry?.edges?.find(
    e => e.node.lang === (lang || 'default')
  )?.node;

  return <StoryblokEntry pageContext={{ story }} />;
};
