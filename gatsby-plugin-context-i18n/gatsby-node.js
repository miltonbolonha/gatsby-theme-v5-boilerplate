const path = require("path");
const rootDir = path.join(__dirname, "../");
const fs = require("fs");

//requires for schemas
const schemasPath = path.resolve(rootDir, `content/schemas`);
const reqSchemaDefault = require(path.resolve(
  rootDir,
  `${schemasPath}/default.json`
));
// const schemaOrg = require(path.resolve(
//   rootDir,
//   `content/configs/schema-org.json`
// ));
// const schemaOrgEN = require(path.resolve(
//   rootDir,
//   `content/configs/schema-org.en.json`
// ));

// const card = schemaOrg.schema[0].card[0];
// const cardEN = schemaOrgEN.schema[0].card[0];

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
      // console.log("isDefault");
      // console.log(isDefault);
      // console.log("defaultLanguage");
      // console.log(defaultLanguage);
      // console.log("cardLocale");
      // console.log(cardLocale);
      // console.log("defaultLanguage");
      // console.log(defaultLanguage);

      if (isDefaultCard && isDefaultSchema && newPage.path === "/") {
        newPage.context = {
          schemaJSON: cardElementDefault,
        };
        return createPage(newPage);
      }

      if (
        isDefaultCard &&
        isDefaultSchema &&
        newPage.path === "404.js" &&
        newPage.path === "/404.html" &&
        newPage.path === "/dev-404-page/" &&
        newPage.path === "/404/"
      ) {
        newPage.context = {
          schemaJSON: cardElementDefault,
        };
        return createPage(newPage);
      }

      if (isDefaultCard && isDefaultSchema && newPage.path === "room") {
        newPage.context = {
          schemaJSON: cardElementDefault,
        };
        return createPage(newPage);
      }

      // if (isDefaultCard && isDefaultSchema) {
      //   console.log("newPage.path");
      //   console.log(newPage.path);
      //   console.log("cardLocalePath");
      //   console.log(cardLocalePath);
      //   newPage.context = {
      //     schemaJSON: cardElementDefault,
      //   };
      //   return createPage(newPage);
      // }

      if (pathLocaleHasI18n) {
        if (!isDefaultCard) {
          newPage.context = {
            schemaJSON: cardElement,
          };
          return createPage(newPage);
        }
      }
    });
  });

  // newPage.context = {
  //   schemaJSON: !page.path.includes("en") ? card : cardEN,
  // };
  // createPage(newPage);
};
