const path = require("path");
const rootDir = path.join(__dirname, "../");
const schemaOrg = require(path.resolve(
  rootDir,
  `content/configs/schema-org.json`
));
const schemaOrgEN = require(path.resolve(
  rootDir,
  `content/configs/schema-org.en.json`
));

const card = schemaOrg.schema[0].card[0];
const cardEN = schemaOrgEN.schema[0].card[0];

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  const newPage = Object.assign({}, page);
  deletePage(page);
  newPage.context = {
    schemaJSON: !page.path.includes("en") ? card : cardEN,
  };
  createPage(newPage);
};
