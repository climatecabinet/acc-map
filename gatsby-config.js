const config = require('./config/meta');
const {createHttpLink} = require("apollo-link-http");
const fetch = require("isomorphic-fetch");
// const dotenv = require("dotenv");

// dotenv.config();

module.exports = {
  siteMetadata: {
    title: `Climate Cabinet's Climate Data Explorer`,
    description: `An interactive database to explore climate and socioeconomic data in state legislative districts.`,
    author: `@sgreen`,
    mapboxToken: `pk.eyJ1IjoicGFzaWgiLCJhIjoiY2pybzJqdTVjMHJzeDQ0bW80aGdzaXV3ayJ9.yxD8Nqu7FLnf8-lBo7F1zQ`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-source-graphql',
      options: {
        // arbitrary name for the remote schema query type
        typeName: 'MongoDB', 
        // field under which the remote schema will be accessible. will be used in the gatsby query
        fieldName: 'allMongodbRegions',
        // create Apollo Link manually. can return a Promise.
        createLink: () => 
          createHttpLink({
            uri: 'https://realm.mongodb.com/api/client/v2.0/app/climate-cabinet-api-nthnl/graphql',
              headers: {
                apiKey: `Gr4dAgPfy7SPicuSMaMmpJvSUwMwfChiGpK8rZohFX9YCZBMRubMlKgwIr4uXQRh`
              },
              fetch,
          })
      }
    },
    // `gatsby-transformer-json`,
    // `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: process.env.NODE_ENV !== `production`,
        fileName: false,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `./config/typography.js`,
      },
    },
    // `gatsby-transformer-sharp`,
    // `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: `/?utm_source=a2hs`,
        background_color: config.manifest.backgroundColor,
        theme_color: config.manifest.themeColor,
        display: `standalone`,
        icon: `src/images/clicab-icon.jpg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
