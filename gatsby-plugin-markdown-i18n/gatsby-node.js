// gatsby-plugin-markdown-i18n
//
// onCreateNode
// - i18n slug field
// - Adding i18n slug field to each MD
// createPages
// - create i18n PAGES from content/pages, MDS PAGES

const path = require("path");
const rootDir = path.join(__dirname, "../");
const reqSchemaDefault = require(path.resolve(
  rootDir,
  `content/schemas/default.json`
));

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
  if (nodeTopology === "mds") {
    return "mds";
  }
  return null;
}
// Adding slug field to each post
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const basePathLabel = basePathFinder(node.frontmatter.topology) || "pages";
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    const slug = createFilePath({
      node,
      getNode,
      // basePath: basePathLabel,
    });
    const htmlSlug = slug.includes(".htm");
    const slashSlugfirst = slug.slice(0, 1) === "/" ? slug.slice(1) : slug;
    const slashSlug =
      slashSlugfirst.slice(-1) === "/"
        ? slashSlugfirst.slice(0, -1)
        : slashSlugfirst;
    const slugTrim =
      slashSlug.includes(".") && !htmlSlug
        ? slashSlug.split(".md")[0]
        : slashSlug;
    const frontmatterSlug = node?.frontmatter?.slug
      ? node.frontmatter.slug
      : slashSlug.split(".md")[0].split(".")[0];
    const finalSlug = slugTrim.includes(".")
      ? slugTrim.split(".")[1] + "/" + frontmatterSlug
      : slugTrim;

    createNodeField({
      node,
      name: "slug",
      value: `/${finalSlug}/`,
    });
    createNodeField({
      node,
      name: "i18n",
      value: reqSchemaDefault.schema[0].card[0].brandIntl,
    });
  }
};

exports.createPages = ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allPages: allMarkdownRemark(
        filter: { frontmatter: { topology: { eq: "pages" } } }
      ) {
        nodes {
          frontmatter {
            title
            status
            slug
            topology
            description
            date
          }
          fields {
            slug
          }
          html
          fileAbsolutePath
        }
      }
    }
  `).then(results => {
    if (results.errors) {
      reporter.panicOnBuild("Error loading MD result", results.errors);
    }
    const pages = results.data?.allPages?.nodes
      ? results.data.allPages.nodes
      : console.log("Page Error");

    pages.forEach(page => {
      if (!page) {
        return console.log("page: deu erro muito");
      }
      if (page.node?.frontmatter === null) {
        return console.log("page: deu erro");
      }
      const { slug } = page.fields;
      const { title, date, description } = page.frontmatter;
      // Use the fields created in exports.onCreatepage

      createPage({
        path: slug,
        component: path.resolve(
          rootDir,
          `gatsby-theme-v5-boilerplate/src/templates/one-column.js`
        ),
        context: {
          title: title,
          content: page.html,
          description: description,
        },
      });
    });
  });
};
