// gatsby-config.js
//requiring path and fs modules
// imports and configs
// xxxxxxxxxxxxxxxxxx
const path = require("path");
const rootDir = path.join(__dirname, "../");
const schemaOrg = require(path.resolve(
  rootDir,
  `content/schemas/default.json`
));
const card = schemaOrg.schema[0].card[0];
const contentPath = path.resolve(rootDir, card.contentPath);

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: path.resolve(rootDir, contentPath + "/pages/"),
        ignore: [`**/\.jpg`, `**/\.png`], // ignore files starting with a dot
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `careers`,
        path: path.resolve(rootDir, contentPath + "/careers/"),
        ignore: [`**/\.jpg`, `**/\.png`], // ignore files starting with a dot
      },
    },
  ],
};
