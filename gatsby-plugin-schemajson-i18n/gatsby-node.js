const card = require("../content/configs/schema-org.json");
const cardEN = require("../content/configs/schema-org.en.json");
exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions;
  // usando os JSONs com createContentDigest e criando nó
  return new Promise((resolve, reject) => {
    resolve(
      createNode({
        ...card.schema[0],
        id: createNodeId("SchemaJSON-pt-BR"),
        parent: null,
        children: [],
        internal: {
          type: "SchemaJSON",
          contentDigest: createContentDigest(card.schema[0].card),
        },
      }),
      createNode({
        ...cardEN.schema[0],
        id: createNodeId("SchemaJSON-en-US"),
        parent: null,
        children: [],
        internal: {
          type: "SchemaJSON",
          contentDigest: createContentDigest(cardEN.schema[0].card),
        },
      })
    );
  });
};
