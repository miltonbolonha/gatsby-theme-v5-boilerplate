const path = require("path");
const rootDir = path.join(__dirname, "../");
const fs = require("fs");

//requires for schemas
const schemasPath = path.resolve(rootDir, `content/schemas/`);
const schemaOrg = require(path.resolve(
  rootDir,
  `content/configs/schema-org.json`
));
const schemaOrgEN = require(path.resolve(
  rootDir,
  `content/configs/schema-org.en.json`
));
const reqSchemaDefault = require(path.resolve(
  rootDir,
  "content/schemas/default.json"
));

// i18n default card
const card = schemaOrg.schema[0].card[0];
// i18n array locales ['xx-XX','xx-XX']
const locales = schemaOrg.locales;

//require theme pagesSite
const pageSiteFolder = path.resolve(rootDir, `${card.themePath}/src/pages`);

// const cardEN = schemaOrgEN.schema[0].card[0];
// const filteredCard = null;

// create Node Field in SitePage node type
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNode, createNodeField, createNodeId } = actions;
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
  const { createPage, deletePage, createRedirect } = actions;
  // first array locale position it's reserved to default locale
  const defaultLocale = locales[0];

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
    // console.log("iniciar create pages i18n index 404's and plus");
    // index
    // 404
    // 404.html
    for (let index = 0; index < schemaJSON.length; index++) {
      let element = schemaJSON[index];

      const isDefaultI18n = schemaJSON[index] === "default.json" ? true : false;
      const isIndex = pageSitename === "index.js" ? true : false;
      const is404 = pageSitename === "404.js" ? true : false;
      const localePathQuery = isDefaultI18n
        ? ""
        : schemaJSON[index].slice(0, 2);

      const pathQuery = isIndex ? "" : pageSitename;
      const pathExtended =
        schemaJSON[index] === "default.json"
          ? "/" + localePathQuery
          : "/" + localePathQuery + "/" + pathQuery;
      pageSiteObj.path = pathExtended;
      pageSiteObj.context.schemaJSON = require(path.resolve(
        rootDir,
        `content/schemas/${element}`
      ));

      //if index 404 404.html
      // await createPage(pageSiteObj);
      if (is404) {
        console.log("is 404 page");
        console.log(pageSiteObj);
        await createPage(pageSiteObj);
      }
      if (isDefaultI18n && isIndex) {
        console.log("is index default page");
        console.log(pageSiteObj);
        await createPage(pageSiteObj);
      } else {
        console.log("todas as pagesSites aqui");
        console.log(pageSiteObj);
        await createPage(pageSiteObj);
        // console.log("i18n pagesite created");
      }
    }
  };

  // grab all files in themePath/src/pages
  const mapPageSites = async schemaJSON => {
    fs.readdir(pageSiteFolder, (err, files) => {
      // console.log("Folder readed: pagesiteFolder files");
      // console.log(files.split(".")[0]);
      files.map((pageSitename, ind) => {
        // console.log("initialize create PagesSites I18n w/ ");
        // console.log("pageSite for");
        // console.log(pageSitename);
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
    // console.log("iniciar mapeamento e criação de sitePages com schemas ");
    mapPageSites(schemasFiles);
  });
};
