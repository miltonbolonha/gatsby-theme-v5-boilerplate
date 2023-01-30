const card = require("../content/configs/schema-org.json");
exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions;
  // usando os JSONs com createContentDigest e criando nó
  createNode({
    ...card.schema[0],
    id: createNodeId("SchemaJSON-pt-BR"),
    parent: null,
    children: [],
    internal: {
      type: "SchemaJSON",
      contentDigest: createContentDigest(card.schema[0].card),
    },
  });
  console.log("JSON SCHEMA NODE CRIADO");
};
