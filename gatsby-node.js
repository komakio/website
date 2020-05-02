/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const storyblokEntry = path.resolve('src/templates/storyblok-entry.tsx');

  const result = await graphql(
    `
      {
        allStoryblokEntry {
          edges {
            node {
              id
              name
              created_at
              uuid
              slug
              full_slug
              content
              is_startpage
              field_component
              parent_id
              group_id
              lang
            }
          }
        }
      }
    `
  );
  if (result.errors) {
    console.log(result.errors);
    throw result.errors;
  }

  const entries = result.data.allStoryblokEntry.edges;
  entries
    .filter(entry => ['page'].includes(entry.node.field_component))
    .forEach(entry => {
      const pagePath =
        entry.node.slug == 'home'
          ? `${entry.node.lang === 'default' ? '/' : `${entry.node.lang}/`}`
          : `${entry.node.full_slug}/`;
      createPage({
        path: `/${pagePath}`,
        component: storyblokEntry,
        context: {
          story: entry.node,
        },
      });
    });
};
