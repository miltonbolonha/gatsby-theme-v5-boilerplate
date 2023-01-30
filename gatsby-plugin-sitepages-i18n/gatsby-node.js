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
const locales = schemaOrg.locales;
console.log("locales");
console.log(locales);

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
  return new Promise((resolve, reject) => {
    resolve(
      fs.readdir(pageSiteFolder, (err, files) => {
        console.log("files");
        console.log(files);
        files.forEach(async file => {
          console.log(file);
          const x = {
            path: file.split(".")[0],
            component: pageSiteFolder + "/" + file,
            context: {
              schemaJSON: cardEN,
            },
          };
          if (x.path === "index") {
            await createPage({
              path: "en" + "/",
              component: path.resolve(rootDir, x.component),
              context: {
                schemaJSON: cardEN,
              },
            });
            console.log("PÁGINA EN INDEX CRIADA");
          } else {
            await createPage({
              path: "en" + "/" + x.path,
              component: path.resolve(rootDir, x.component),
              context: {
                schemaJSON: cardEN,
              },
            });
            console.log("PÁGINA EN CRIADA");
          }
        });
      })
    );
  });
};
