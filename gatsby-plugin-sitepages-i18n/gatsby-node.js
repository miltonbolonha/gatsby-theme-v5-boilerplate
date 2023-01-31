const path = require("path");
const rootDir = path.join(__dirname, "../");
const fs = require("fs");

const pageSiteFolder = path.resolve(
  rootDir,
  "gatsby-theme-nuktpls-one/src/pages"
);

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
const filteredCard = null;
const locales = schemaOrg.locales;
// console.log("locales");
// console.log(locales.shift());

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNode, createNodeField, createNodeId } = actions;
  console.log(node.internal.type);
  if (node.internal.type === "SitePage") {
    console.log("achheii aqui agora");

    createNodeField({
      node,
      name: "i18n",
      value: card.brandIntl,
    });

    createNodeField({
      node,
      name: "schemaJSON",
      value: card,
    });
  }
};

exports.createPages = async function ({ graphql, actions, page, reporter }) {
  const { createPage, deletePage, createRedirect } = actions;
  console.log(page);
  // deletePage(page);
  // createPage({
  //   ...page,
  //   context: {
  //     schemaJSON: card,
  //   },
  // });
  locales.shift();
  return new Promise((resolve, reject) => {
    resolve(
      locales.forEach(async i18n => {
        fs.readdir(pageSiteFolder, (err, files) => {
          console.log("files");
          console.log(files);
          files.forEach(async file => {
            // console.log(file);
            const x = {
              path: file.split(".")[0],
              component: pageSiteFolder + "/" + file,
              context: {
                schemaJSON: filteredCard,
              },
            };
            const prefix = i18n.split("-");

            if (x.path === "index") {
              await createPage({
                path: prefix[0] + "/",
                component: path.resolve(rootDir, x.component),
                context: {
                  schemaJSON: cardEN,
                },
              });
              console.log(`PÁGINA i18n INDEX CRIADA`);
            } else {
              await createPage({
                path: prefix[0] + "/" + x.path,
                component: path.resolve(rootDir, x.component),
                context: {
                  schemaJSON: cardEN,
                },
              });
              console.log(`PÁGINA i18n CRIADA`);
            }

            // locales.shift().forEach(async i18n => {

            // });
          });
        });
      })
    );
  });
};
