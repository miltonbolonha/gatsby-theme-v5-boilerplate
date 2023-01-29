// import { i18n } from "@lingui/core";
// import { I18nProvider } from "@lingui/react";
// import { ThemeProvider } from "./src/context/ThemeContext";
const ptMessages = require("../content/i18n/pt-BR/main");
// import { messages as enMessages } from "../content/i18n/en-US/main";
// const i18nConfig = require("../.linguirc");
const path = require("path");
const rootDir = path.join(__dirname, "../");
const businessInfos = require("../content/configs/schema-org.json");

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
// exports.= async ({

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
