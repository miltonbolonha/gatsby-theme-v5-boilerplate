// gatsby-plugin-markdown-i18n
//
// onCreateNode
// - i18n slug field
// - Adding i18n slug field to each MD
// createPages
// - create i18n PAGES from content/pages, MDS PAGES

// gatsby-plugin-sitepages-i18n
//
// create Node Field in SitePage node type

const path = require("path");
const rootDir = path.join(__dirname, "../");
const fs = require("fs");

const { createFilePath } = require(`gatsby-source-filesystem`);

//requires for schemas
const schemasPath = path.resolve(rootDir, `content/schemas`);
const reqSchemaDefault = require(path.resolve(
  rootDir,
  `${schemasPath}/default.json`
));

// i18n default card
const card = reqSchemaDefault.schema[0].card[0];
// i18n array locales ['xx-XX','xx-XX']
const locales = reqSchemaDefault.locales;

//require theme pagesSite
const pageSiteFolder = path.resolve(rootDir, `${card.themePath}/src/pages`);

// create Node Field in SitePage node type
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "SitePage") {
    const x = [
      {
        node,
        name: "i18n",
        value: card.brandIntl,
      },
      {
        node,
        name: "schemaJSON",
        value: card,
      },
    ];

    x.forEach(nodeField => {
      createNodeField(nodeField);
    });
  }
};

// /////////////

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
  // first array locale position it's reserved to default locale

  const pageSiteObj = (file, schema) => {
    const x = file.split(".")[0];
    return {
      path: x,
      component: pageSiteFolder + "/" + file,
      context: {
        schemaJSON: null,
      },
    };
  };

  const createPagesSitesI18n = async (
    pageSiteObj,
    pageSitename,
    schemaJSON
  ) => {
    for (const schemaFile of schemaJSON) {
      const isDefaultI18n = schemaFile === "default.json" ? true : false;
      const isIndex = pageSitename === "index.js" ? true : false;
      const is404 = pageSitename === "404.js" ? true : false;
      const localePathQuery = isDefaultI18n ? "" : schemaFile.slice(0, 2);

      let pathQuery = isIndex ? "" : pageSitename.split(".")[0];

      const pathExtended =
        schemaFile === "default.json"
          ? "/" + localePathQuery
          : "/" + localePathQuery + "/" + pathQuery;
      pageSiteObj.path = pathExtended;

      const schemaLocaleContent = await require(`${schemasPath}/${schemaFile}`);
      pageSiteObj.context = {
        ...pageSiteObj.context,
        schemaJSON: schemaLocaleContent
          ? schemaLocaleContent.schema[0].card[0]
          : card,
      };

      if (is404) {
        await createPage(pageSiteObj);

        for (let index = 1; index < locales.length; index++) {
          const element = locales[index];

          // locales.forEach(async locale => {
          await createPage({
            path: "/" + element.split("-")[0] + "/" + "dev-404-page" + "/",
            component: path.resolve(
              rootDir,
              `${card.themePath}/src/pages/404.js`
            ),
            context: { schemaJSON: card },
          });

          await createPage({
            path: "/" + element.split("-")[0] + "/" + "404" + ".html",
            component: path.resolve(
              rootDir,
              `${card.themePath}/src/pages/404.js`
            ),
            context: { schemaJSON: card },
          });
        }

        await createPage({
          path: "/" + "dev-404-page" + "/",
          component: path.resolve(
            rootDir,
            `${card.themePath}/src/pages/404.js`
          ),
          context: { schemaJSON: card },
        });

        return await createPage({
          path: "/" + "404" + ".html",
          component: path.resolve(
            rootDir,
            `${card.themePath}/src/pages/404.js`
          ),
          context: { schemaJSON: card },
        });
      }

      if (isDefaultI18n && isIndex) {
        console.log(pageSiteObj.path);
        console.log(pageSiteObj.context);
        await createPage(pageSiteObj);
      } else {
        await createPage(pageSiteObj);
      }
    }
  };

  // grab all files in themePath/src/pages
  const mapPageSites = async schemaJSON => {
    fs.readdir(pageSiteFolder, (err, files) => {
      files.map((pageSitename, ind) => {
        createPagesSitesI18n(
          pageSiteObj(pageSitename),
          pageSitename,
          schemaJSON
        );
      });
    });
  };

  fs.readdir(schemasPath, (err, schemasFiles) => {
    mapPageSites(schemasFiles);
  });
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

// # gatsby-plugin-context-i18n
//
// onCreatePage
// - modify all page contexts for default or path i18n match
// - delete n create pages w i18n SCHEMA JSON context n i18n url prefix
// - insert i18n schemaJSON context

// delete n create pages w i18n SCHEMA JSON context n i18n url prefix
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  const context = page?.context ? page.context : null;
  const newPage = Object.assign({}, page);
  deletePage(page);
  fs.readdir(schemasPath, (err, schemasFiles) => {
    schemasFiles.forEach(schemaJSON => {
      const schema = require(path.resolve(
        rootDir,
        `content/schemas/${schemaJSON}`
      ));

      const cardElement = schema.schema[0].card[0];
      const cardElementDefault = reqSchemaDefault.schema[0].card[0];

      const cardLocale = cardElement.cardLocale.split("-")[0];
      const cardLocalePath = "/" + cardLocale + "/";
      const pathLocale = newPage.path;
      const pathLocaleHasI18n = pathLocale.includes(cardLocalePath);
      const defaultLanguage = reqSchemaDefault.locales[0].split("-")[0];
      const isDefaultLanguage = defaultLanguage === cardLocale;
      const isDefaultSchema = schemaJSON === "default.json";

      if (isDefaultLanguage && isDefaultSchema) {
        newPage.context = {
          ...context,
          schemaJSON: cardElementDefault,
        };
        createPage(newPage);
      }

      if (
        isDefaultLanguage &&
        isDefaultSchema &&
        newPage.path === "/dev-404-page/" &&
        newPage.path === "/404/" &&
        newPage.path === "404.html"
      ) {
        newPage.context = {
          ...context,
          schemaJSON: cardElementDefault,
          prefixI18n: cardLocale,
        };
        createPage(newPage);
      }

      fs.readdir(pageSiteFolder, (err, files) => {
        files.map((file, ind) => {
          if (isDefaultLanguage && isDefaultSchema) {
            newPage.context = {
              ...context,
              schemaJSON: cardElementDefault,
              prefixI18n: cardLocale,
            };
            createPage(newPage);
          }
          if (newPage.path === "/" + file.split(".")[0] + "/") {
            newPage.context = {
              ...context,
              schemaJSON: cardElementDefault,
              prefixI18n: cardLocale,
            };
            createPage(newPage);
          }
        });
      });

      if (pathLocaleHasI18n) {
        newPage.context = {
          ...context,
          schemaJSON: cardElement,
          prefixI18n: cardLocale,
        };
        return createPage(newPage);
      }
    });
  });
};
