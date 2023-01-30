// gatsby-config.js
//requiring path and fs modules
// imports and configs
const path = require("path");
const fs = require("fs");
// const readdirSync = require("fs");

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

// console.log("staticImagesPath:");
// console.log(staticImagesPath);

// console.log("contentPath:");
// throw new Error("STOOOOOOOOOOP!222");

let imagePathFolders = new Set();

const contentDir = srcPath =>
  fs
    .readdirSync(srcPath)
    .filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());

contentDir(contentPath).forEach(element => {
  // console.log(element);

  contentDir(contentPath + "/" + element).forEach(ele => {
    // console.log(ele);
    if (ele === "images") {
      imagePathFolders.add(contentPath + "/" + element + "/" + ele);
    }
  });
});
// console.log("foi");

let resolveSrcFile = new Set();

const imgsPathsResolve = Array.from(imagePathFolders).forEach(imgPath => {
  // console.log("imgPath");
  // console.log(imgPath);
  resolveSrcFile.add({
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: imgPath,
    },
  });
});

// console.log("imgsPathsResolve");
// console.log(imgsPathsResolve);

// throw new Error("Para para para!");

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
    `gatsby-plugin-sass`,
    `gatsby-plugin-linguijs`,
    `gatsby-plugin-markdown-i18n`,
    `gatsby-plugin-schemajson-i18n`,
    `gatsby-plugin-sitepages-i18n`,
    `gatsby-theme-nuktpls-one`,
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
        name: "As Casamenteiras",
        version: "0.6.0",
        developer: "Milton Bolonha",
        coauthorBusiness: "Instituto Organizacionista",
        project: "As Casamenteiras - Web Site",
        url: "https://ascasamenteiras.com.br",
        message: "Copy not comedy.",
      },
    },
  ],
};
