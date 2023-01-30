// import { i18n } from "@lingui/core";
// import { I18nProvider } from "@lingui/react";
// import { ThemeProvider } from "./src/context/ThemeContext";
// const ptMessages = require("../content/i18n/pt-BR/main");
// import { messages as enMessages } from "../content/i18n/en-US/main";
// const i18nConfig = require("../.linguirc");
// const path = require("path");
// const rootDir = path.join(__dirname, "../");
const businessInfos = require("../content/configs/schema-org.json");
const locales = businessInfos.locales;
// exports.sourceNodes = async ({ actions }) => {
//   const { createNodes } = actions;
// };

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions;

  // usando os JSONs com createContentDigest e criando nó
  createNode({
    ...businessInfos.schema[0],
    id: createNodeId("SchemaJSON-pt-BR"),
    parent: null,
    children: [],
    internal: {
      type: "SchemaJSON",
      contentDigest: createContentDigest(businessInfos.schema[0].card[0]),
    },
  });

  return;
};
