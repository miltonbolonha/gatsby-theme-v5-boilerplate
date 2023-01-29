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

// exports.sourceNodes = async ({ actions }) => {
//   const { createNodes } = actions;
// };
let sitePages = new Set();

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNode, createNodeField, createNodeId } = actions;

  if (node.internal.type === "SitePage") {
    // if (node.path === "/") {
    sitePages.add({ node });

    createNodeField({
      node,
      name: "i18n",
      value: businessInfos.schema[0].card[0].brandIntl,
    });
  }
};

exports.createPages = ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;
  Array.from(sitePages).forEach(pageSite => {
    //linguagem sem primeiro item q é a linguagem default
    // sitePages defaults já foram criadas pelos seus arquivos
    // essa é a i18n deles

    for (var i = 1; i === locales.length; i++) {
      // create i18n not default page
      console.log("WTF???");
      console.log(i);

      createPage({
        path: locales[i] + "/" + pageSite.path, // need to add language prefix
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
