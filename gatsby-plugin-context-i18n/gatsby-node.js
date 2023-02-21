const path = require("path");
const rootDir = path.join(__dirname, "../");
const fs = require("fs");

//requires for schemas
const schemasPath = path.resolve(rootDir, `content/schemas`);
const reqSchemaDefault = require(path.resolve(
  rootDir,
  `${schemasPath}/default.json`
));

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  const newPage = Object.assign({}, page);
  deletePage(page);

  fs.readdir(schemasPath, (err, schemasFiles) => {
    schemasFiles.forEach(schemaJSON => {
      console.log("schemaJSON");
      console.log(schemaJSON);
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
          schemaJSON: cardElementDefault,
        };
        return createPage(newPage);
      }

      if (
        isDefaultCard &&
        isDefaultSchema &&
        newPage.path === "/dev-404-page/" &&
        newPage.path === "/404/"
      ) {
        newPage.context = {
          schemaJSON: cardElementDefault,
        };
        return null;
        // return createPage(newPage);
      }

      if (isDefaultCard && isDefaultSchema && newPage.path === "room") {
        newPage.context = {
          schemaJSON: cardElementDefault,
        };
        return createPage(newPage);
      }

      if (pathLocaleHasI18n) {
        if (!isDefaultCard) {
          newPage.context = {
            schemaJSON: cardElement,
            prefixI18n: cardLocale,
          };
          return createPage(newPage);
        }
      }
    });
  });
};
