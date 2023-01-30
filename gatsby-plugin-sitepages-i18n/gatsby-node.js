const path = require("path");
const rootDir = path.join(__dirname, "../");

const schemaOrg = require(path.resolve(
  rootDir,
  `content/configs/schema-org.json`
));
const card = schemaOrg.schema[0].card[0];
const locales = card.locales;

// exports.sourceNodes = async ({ actions }) => {
//   const { createNodes } = actions;
// };
let sitePages = new Set();

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNode, createNodeField, createNodeId } = actions;
  console.log(node.internal.type);
  if (node.internal.type === "SitePage") {
    console.log("node SITEPAGE");
    console.log(node);
    // if (node.path === "/") {
    sitePages.add({ node });

    createNodeField({
      node,
      name: "i18n",
      value: card.brandIntl,
    });
  }
};
console.log("sitePages");
console.log(sitePages);
console.log("sitePages");
throw Error("errouuuu");
exports.createPages = ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;
  Array.from(sitePages).forEach(pageSite => {
    //linguagem sem primeiro item q é a linguagem default
    // sitePages defaults já foram criadas pelos seus arquivos
    // essa é a i18n deles
    console.log(":AQUIIIIIIIIIIIII PAGE SITE::");
    console.log(pageSite);
    console.log(locales);
    console.log(locales.length);
    console.log(":AQUIIIIIIIIIIIII PAGE SITE::");
    for (var i = 1; i === locales.length; i++) {
      // create i18n not default page
      console.log("WTF???");
      console.log(i);

      createPage({
        path: locales[i] + "/" + pageSite.path, // need to add language prefix
        component: path.resolve(rootDir, pageSite.component),
        context: {
          slug: slug,
          thePost: post.node,
          postQuestion: questions,
        },
      });
      // more statements
    }

    //  locales
  });
};
