// import { i18n } from "@lingui/core";
// import { I18nProvider } from "@lingui/react";
// import { ThemeProvider } from "./src/context/ThemeContext";
const ptMessages = require("../content/i18n/pt-BR/main");
// import { messages as enMessages } from "../content/i18n/en-US/main";
// const i18nConfig = require("../.linguirc");
const path = require("path");
const rootDir = path.join(__dirname, "../");
const businessInfos = require("../content/configs/schema-org.json");
const locales = businessInfos.locales;
console.log("locales[0]");
console.log(locales);
console.log("locales[0]");

// exports.sourceNodes = async ({ actions }) => {
//   const { createNodes } = actions;
// };
let sitePages = new Set();

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions;
  for (var i = 0; i <= locales.length; i++) {
    console.log("businessInfos.schema COM ERRO");
    console.log(businessInfos.schema);
    console.log(businessInfos.schema[i]);
    console.log("businessInfos.schema COM ERRO");
    // usando os JSONs com createContentDigest e criando nó
    createNode({
      ...businessInfos.schema[i],
      id: createNodeId("SchemaJSON-" + i),
      parent: null,
      children: [],
      internal: {
        type: "SchemaJSON",
        contentDigest: createContentDigest(businessInfos.schema[i]),
      },
    });
  }

  return;
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNode, createNodeField, createNodeId } = actions;

  if (node.internal.type === "SchemaJSON") {
    createNodeField({
      node,
      name: "i18n",
      value: locales[0],
    });
  }
};

exports.createPages = ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;

  Array.from(sitePages).forEach(pageSite => {
    //linguagem sem primeiro item

    for (var i = 1; i === locales.length; i++) {
      console.log(i);

      createPage({
        path: pageSite.path,
        component: path.resolve(
          rootDir,
          "gatsby-theme-boilerplate-blog/src/templates/single-post.js"
        ),
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
const { createFilePath } = require(`gatsby-source-filesystem`);

function basePathFinder(nodeTopology) {
  if (nodeTopology === "pages") {
    return "pages";
  }
  if (nodeTopology === "posts") {
    return "posts";
  }
  if (nodeTopology === "landings") {
    return "landings";
  }
  return null;
}
// Adding slug field to each post
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const basePathLabel = basePathFinder(node.frontmatter.topology) || "posts";
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    const slug = createFilePath({
      node,
      getNode,
      basePath: basePathLabel,
    });
    // Creates new query'able field with name of 'slug'

    createNodeField({
      node,
      name: "slug",
      value: `/${slug.slice(1)}`,
    });
    createNodeField({
      node,
      name: "i18n",
      value: businessInfos.schema[0].card[0].brandIntl,
    });
  }
};
