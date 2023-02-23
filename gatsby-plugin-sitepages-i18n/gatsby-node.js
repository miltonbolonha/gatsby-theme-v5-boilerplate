// gatsby-plugin-sitepages-i18n
//
// create Node Field in SitePage node type

const path = require("path");
const rootDir = path.join(__dirname, "../");
const fs = require("fs");

//requires for schemas
const schemasPath = path.resolve(rootDir, `content/schemas/`);
const reqSchemaDefault = require(path.resolve(
  rootDir,
  `content/schemas/default.json`
));
// i18n default card
const card = reqSchemaDefault.schema[0].card[0];
// i18n array locales ['xx-XX','xx-XX']
const locales = reqSchemaDefault.locales;

//require theme pagesSite
const pageSiteFolder = path.resolve(rootDir, `${card.themePath}/src/pages`);

// create Node Field in SitePage node type
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "SitePage") {
    const x = [
      {
        node,
        name: "i18n",
        value: card.brandIntl,
      },
      {
        node,
        name: "schemaJSON",
        value: card,
      },
    ];

    x.forEach(nodeField => {
      createNodeField(nodeField);
    });
  }
};

// createPages i18n from SitePages
exports.createPages = async ({ graphql, actions, page, reporter }) => {
  const { createPage } = actions;
  // first array locale position it's reserved to default locale

  const pageSiteObj = (file, schema) => {
    const x = file.split(".")[0];
    return {
      path: x,
      component: pageSiteFolder + "/" + file,
      context: {
        schemaJSON: null,
      },
    };
  };

  const createPagesSitesI18n = async (
    pageSiteObj,
    pageSitename,
    schemaJSON
  ) => {
    for (const schemaFile of schemaJSON) {
      const isDefaultI18n = schemaFile === "default.json" ? true : false;
      const isIndex = pageSitename === "index.js" ? true : false;
      const is404 = pageSitename === "404.js" ? true : false;
      const localePathQuery = isDefaultI18n ? "" : schemaFile.slice(0, 2);

      let pathQuery = isIndex
        ? ""
        : is404
        ? pageSitename.split(".")[0]
        : pageSitename.split(".")[0];

      const pathExtended =
        schemaFile === "default.json"
          ? "/" + localePathQuery
          : "/" + localePathQuery + "/" + pathQuery;
      pageSiteObj.path = pathExtended;

      if (is404) {
        await createPage(pageSiteObj);

        for (let index = 1; index < locales.length; index++) {
          const element = locales[index];

          // locales.forEach(async locale => {
          await createPage({
            path: "/" + element.split("-")[0] + "/" + "dev-404-page" + "/",
            component: path.resolve(
              rootDir,
              `${card.themePath}/src/pages/404.js`
            ),
            context: { schemaJSON: card },
          });

          await createPage({
            path: "/" + element.split("-")[0] + "/" + "404" + ".html",
            component: path.resolve(
              rootDir,
              `${card.themePath}/src/pages/404.js`
            ),
            context: { schemaJSON: card },
          });
        }

        await createPage({
          path: "/" + "dev-404-page" + "/",
          component: path.resolve(
            rootDir,
            `${card.themePath}/src/pages/404.js`
          ),
          context: { schemaJSON: card },
        });

        await createPage({
          path: "/" + "404" + ".html",
          component: path.resolve(
            rootDir,
            `${card.themePath}/src/pages/404.js`
          ),
          context: { schemaJSON: card },
        });
      }

      if (isDefaultI18n && isIndex) {
        await createPage(pageSiteObj);
      } else {
        await createPage(pageSiteObj);
      }
    }
  };

  // grab all files in themePath/src/pages
  const mapPageSites = async schemaJSON => {
    fs.readdir(pageSiteFolder, (err, files) => {
      files.map((pageSitename, ind) => {
        createPagesSitesI18n(
          pageSiteObj(pageSitename),
          pageSitename,
          schemaJSON
        );
      });
    });
  };

  let x = null;
  fs.readdir(schemasPath, (err, schemasFiles) => {
    mapPageSites(schemasFiles);
  });
};
