// # gatsby-plugin-context-i18n
//
// onCreatePage
// - modify all page contexts for default or path i18n match
// - delete n create pages w i18n SCHEMA JSON context n i18n url prefix
// - insert i18n schemaJSON context

const path = require("path");
const rootDir = path.join(__dirname, "../");
const fs = require("fs");

const { createFilePath } = require(`gatsby-source-filesystem`);

//requires for schemas
const schemasPath = path.resolve(rootDir, `content/schemas`);
const reqSchemaDefault = require(path.resolve(
  rootDir,
  `${schemasPath}/default.json`
));
const card = reqSchemaDefault.schema[0].card[0];
const pageSiteFolder = path.resolve(rootDir, `${card.themePath}/src/pages`);

// delete n create pages w i18n SCHEMA JSON context n i18n url prefix
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  const context = page?.context ? page.context : null;
  const newPage = Object.assign({}, page);
  deletePage(page);
  fs.readdir(schemasPath, (err, schemasFiles) => {
    schemasFiles.forEach(schemaJSON => {
      const schema = require(path.resolve(
        rootDir,
        `content/schemas/${schemaJSON}`
      ));

      const cardElement = schema.schema[0].card[0];
      const cardElementDefault = reqSchemaDefault.schema[0].card[0];

      const cardLocale = cardElement.cardLocale.split("-")[0];
      const cardLocalePath = "/" + cardLocale + "/";
      const pathLocale = newPage.path;
      const pathLocaleHasI18n = pathLocale.includes(cardLocalePath);
      const defaultLanguage = reqSchemaDefault.locales[0].split("-")[0];
      const isDefaultCard = defaultLanguage === cardLocale;
      const isDefaultSchema = schemaJSON === "default.json";

      if (isDefaultCard && isDefaultSchema && newPage.path === "/") {
        newPage.context = {
          ...context,
          schemaJSON: cardElementDefault,
        };
        return createPage(newPage);
      }

      if (
        isDefaultCard &&
        isDefaultSchema &&
        newPage.path === "/dev-404-page/" &&
        newPage.path === "/404/" &&
        newPage.path === "404.html"
      ) {
        newPage.context = {
          ...context,
          schemaJSON: cardElementDefault,
          prefixI18n: cardLocale,
        };
        return createPage(newPage);
      }

      fs.readdir(pageSiteFolder, (err, files) => {
        files.map((file, ind) => {
          if (
            isDefaultCard &&
            isDefaultSchema &&
            newPage.path === "/" + file.split(".")[0] + "/"
          ) {
            newPage.context = {
              ...context,
              schemaJSON: cardElementDefault,
              prefixI18n: cardLocale,
            };
            return createPage(newPage);
          }
        });
      });

      if (pathLocaleHasI18n) {
        if (!isDefaultCard) {
          newPage.context = {
            ...context,
            schemaJSON: cardElement,
            prefixI18n: cardLocale,
          };
          return createPage(newPage);
        }
      }
    });
  });
};
