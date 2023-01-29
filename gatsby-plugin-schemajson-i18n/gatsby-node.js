// import { i18n } from "@lingui/core";
// import { I18nProvider } from "@lingui/react";
// import { ThemeProvider } from "./src/context/ThemeContext";
const ptMessages = require("../content/i18n/pt-BR/main");
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
