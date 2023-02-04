const path = require("path");
const rootDir = path.join(__dirname, "../");
const fs = require("fs");

//requires for schemas
const schemasPath = path.resolve(rootDir, `content/schemas/`);
const schemaOrg = require(path.resolve(
  rootDir,
  `content/configs/schema-org.json`
));
// i18n default card
const card = schemaOrg.schema[0].card[0];
// i18n array locales ['xx-XX','xx-XX']
const locales = schemaOrg.locales;

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

    console.log("SitePage Node field has been created");
  }
};

// createPages i18n from SitePages
exports.createPages = async function ({ graphql, actions, page, reporter }) {
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
    // index
    // 404
    // 404.html
    for (const element of schemaJSON) {
      const isDefaultI18n = element === "default.json" ? true : false;
      const isIndex = pageSitename === "index.js" ? true : false;
      const is404 = pageSitename === "404.js" ? true : false;
      const localePathQuery = isDefaultI18n ? "" : element.slice(0, 2);

      const pathQuery = isIndex ? "" : pageSitename;
      const pathExtended =
        element === "default.json"
          ? "/" + localePathQuery
          : "/" + localePathQuery + "/" + pathQuery;
      pageSiteObj.path = pathExtended;

      //if index 404 404.html
      // await createPage(pageSiteObj);
      if (is404) {
        await createPage(pageSiteObj);
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
