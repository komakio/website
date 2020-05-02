import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StoryblokEntry } from '../../templates/storyblok-entry';

export const Header = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      allStoryblokEntry(
        filter: { slug: { eq: "global-header" }, lang: { eq: "default" } }
      ) {
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
  const story = data.allStoryblokEntry?.edges?.[0]?.node;

  return <StoryblokEntry pageContext={{ story }} />;
};
