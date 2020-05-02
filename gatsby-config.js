// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// try {
//   require('dotenv').config({
//     path: `.env.${process.env.NODE_ENV}`,
//   });
// } catch (e) {
//   console.log(e);
// }

module.exports = {
  siteMetadata: {
    title: `Komak`,
    description: `Komak matches healthy volunteers with those most at risk in the wake of COVID-19.`,
    author: `@Komak`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@components': path.resolve(__dirname, 'src/components'),
          '@components2': path.resolve(__dirname, 'src/components2'),
          '@utils': path.resolve(__dirname, 'src/utils'),
          '@api': path.resolve(__dirname, 'src/api'),
          '@models': path.resolve(__dirname, 'src/models'),
          '@templates': path.resolve(__dirname, 'src/templates'),
        },
        extensions: ['ts', 'tsx'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: '214549336308915',
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-598C7SZ',

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
        defaultDataLayer: { platform: 'gatsby' },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `komak`,
        short_name: `komak`,
        start_url: `/`,
        background_color: `#008C59`,
        theme_color: `#008C59`,
        display: `minimal-ui`,
        icon: `src/images/app-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-storyblok',
      options: {
        accessToken: 'pvAqshfYjQ8NWv1XIkpzlQtt',
        homeSlug: 'home',
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
