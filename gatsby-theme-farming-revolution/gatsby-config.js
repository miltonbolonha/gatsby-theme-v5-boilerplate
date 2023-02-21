/**
 * @type {import('gatsby').GatsbyConfig}
 */
const path = require("path");
const rootDir = path.join(__dirname, "../");
const schemaOrg = require(path.resolve(
  rootDir,
  `content/schemas/default.json`
));
const card = schemaOrg.schema[0].card[0];
const contentPath = path.resolve(rootDir, card.contentPath);

module.exports = {
  siteMetadata: {
    title: `My Gatsby Site`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `xls`,
        path: path.resolve(rootDir, "content/xls"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `brandImages`,
        path: path.resolve(rootDir, contentPath + "/images/brand"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `generalImages`,
        path: path.resolve(rootDir, contentPath + "/images/general"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `heroImages`,
        path: path.resolve(rootDir, contentPath + "/images/hero"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pressImages`,
        path: path.resolve(rootDir, contentPath + "/images/press"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `partnerImages`,
        path: path.resolve(rootDir, contentPath + "/images/partners"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `treatmentImages`,
        path: path.resolve(rootDir, contentPath + "/images/treatment"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `indexImages`,
        path: path.resolve(rootDir, contentPath + "/images/index"),
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@Slices": path.resolve(__dirname, "src/slices"),
          "@Components": path.resolve(__dirname, "src/components"),
          "@Content": path.resolve(rootDir, "content"),
          "@Context": path.resolve(__dirname, "src/context"),
          "@Images": path.resolve(__dirname, "static/images"),
        },
        extensions: ["js", "scss"],
      },
    },
  ],
};
