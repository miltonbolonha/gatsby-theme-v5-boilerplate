const path = require("path");
const fs = require("fs");
const rootDir = path.join(__dirname, "../");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const schemaOrg = require(path.resolve(
  rootDir,
  `content/configs/schema-org.json`
));

const card = schemaOrg.schema[0].card[0];
const contentPath = path.resolve(rootDir, card.contentPath);
const staticImagesPathCard = card.staticImagesPath;
const staticImagesPath = path.resolve(rootDir, staticImagesPathCard);

//passsing directoryPath and callback function
let imagePathFolders = new Set();

const contentDir = srcPath =>
  fs
    .readdirSync(srcPath)
    .filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());

contentDir(contentPath).forEach(element => {
  contentDir(contentPath + "/" + element).forEach(ele => {
    if (ele === "images") {
      imagePathFolders.add(contentPath + "/" + element + "/" + ele);
    }
  });
});

module.exports = {
  trailingSlash: card.trailingSlash,

  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(__dirname, staticImagesPath),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(rootDir, contentPath + "/posts/images/"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(rootDir, contentPath + "/landings/images/"),
      },
    },

    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: card.imageFormats,
          quality: card.imageQuality,
          breakpoints: card.imageBreakPoints,
        },
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              name: `images`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: card.imageMaxWidth,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow",
            },
          },
        ],
      },
    },
    `gatsby-plugin-context-i18n`,
    `gatsby-plugin-markdown-i18n`,
    `gatsby-plugin-schemajson-i18n`,
    `gatsby-plugin-sitepages-i18n`,
    `gatsby-theme-boilerplate`,
    `gatsby-theme-room-app`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@Images": path.resolve(__dirname, staticImagesPath),
          "@Theme": path.resolve(rootDir, card.themePath),
          "@Containers": path.resolve(
            rootDir,
            card.themePath + "/src/containers"
          ),
          "@Components": path.resolve(
            rootDir,
            card.themePath + "/src/components"
          ),
          "@Tools": path.resolve(rootDir, card.themePath + "/src/tools"),
          "@Templates": path.resolve(
            rootDir,
            card.themePath + "/src/templates"
          ),
          "@Slices": path.resolve(rootDir, card.themePath + "/src/slices"),
          "@Conteudo": path.resolve(rootDir, contentPath),
          "@SchemaJSON": path.resolve(rootDir, "gatsby-plugin-schemajson-i18n"),
          "@Posts": path.resolve(rootDir, contentPath + "/posts"),
          "@I18n": path.resolve(rootDir, contentPath + "/i18n"),
        },
        extensions: ["js", "scss"],
      },
    },
    {
      resolve: `gatsby-business-in-build`,
      options: {
        name: "GatsbyJS",
        version: "0.6.0",
        developer: "Milton Bolonha",
        coauthorBusiness: "Instituto Organizacionista",
        project: "GatsbyJS - Web Site",
        url: "https://gatsby-theme-boilerplate.dev",
        message: "Copy not comedy.",
      },
    },
  ],
};
