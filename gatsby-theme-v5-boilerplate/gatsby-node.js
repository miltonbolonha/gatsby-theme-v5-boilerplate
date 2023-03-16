// Esse é um arquivo de configuração para um projeto Gatsby.
// O arquivo está dividido em três partes que usam diferentes plugins do Gatsby:

//   - context-i18n
//   - sitepages-i18n
//   - markdown-i18n

// gatsby-plugin-sitepages-i18n
//
// create Node Field in SitePage node type

const path = require("path");
const rootDir = path.join(__dirname, "../");
const fs = require("fs").promises;

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

// grab schema and pageFiles
console.log("pageSiteFolder");
console.log(pageSiteFolder);
console.log("pageSiteFolder");

// Adding slug field to each post
// Adiciona um campo slug a cada nó do tipo MarkdownRemark
// E um campo i18n a cada nó do tipo SitePage
// Facilita o tratamento de localização (tradução) no projeto.

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

  if (node.internal.type === "MarkdownRemark") {
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    const slug = createFilePath({
      node,
      getNode,
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

// # gatsby-plugin-context-i18n
//
// onCreatePage
// - modify all page contexts for default or path i18n match
// - delete n create pages w i18n SCHEMA JSON context n i18n url prefix
// - insert i18n schemaJSON context
// delete n create pages w i18n SCHEMA JSON context n i18n url prefix
// adiciona contexto de localização a cada página do projeto
// (a partir da pasta src/pages)
// e cria novas páginas para cada idioma do projeto.
exports.onCreatePage = async ({ page, actions }) => {
  const schemasFiles = await fs.readdir(schemasPath);
  const pageFiles = await fs.readdir(pageSiteFolder);
  const { createPage, deletePage } = actions;
  const newPage = Object.assign({}, page);
  deletePage(page);
  const i18nContextPageSite = async (page, schemasLoaded) => {
    for (const schemaFile of schemasLoaded) {
      const schema = require(path.resolve(
        rootDir,
        `content/schemas/${schemaFile}`
      ));

      const cardElement = schema.schema[0].card[0];
      const cardElementDefault = reqSchemaDefault.schema[0].card[0];

      const cardLocale = cardElement.cardLocale.split("-")[0];
      const cardLocalePath = "/" + cardLocale + "/";
      const pathLocale = newPage.path;
      const pathLocaleHasI18n = pathLocale.includes(cardLocalePath);
      const defaultLanguage = reqSchemaDefault.locales[0].split("-")[0];
      const isDefaultLanguage = defaultLanguage === cardLocale;
      const isDefaultSchema = schemaFile === "default.json";

      if (isDefaultLanguage && isDefaultSchema && newPage.path === "/") {
        newPage.context = {
          ...newPage.context,
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
          ...newPage.context,
          schemaJSON: cardElementDefault,
          prefixI18n: cardLocale,
        };
        createPage(newPage);
      }

      await fs.readdir(pageSiteFolder, (err, files) => {
        files.map((file, ind) => {
          if (isDefaultLanguage && isDefaultSchema) {
            newPage.context = {
              ...newPage.context,
              schemaJSON: cardElementDefault,
              prefixI18n: cardLocale,
            };
            createPage(newPage);
          }
          if (newPage.path === "/" + file.split(".")[0] + "/") {
            newPage.context = {
              ...newPage.context,
              schemaJSON: cardElementDefault,
              prefixI18n: cardLocale,
            };
            createPage(newPage);
          }
        });
      });

      if (pathLocaleHasI18n) {
        newPage.context = {
          ...newPage.context,
          schemaJSON: cardElement,
          prefixI18n: cardLocale,
        };
        return createPage(newPage);
      }
    }
  };

  try {
    await Promise.all(
      pageFiles.map(file => i18nContextPageSite(file, schemasFiles))
    );
  } catch (err) {
    console.error(err);
  }
};

// modifica o contexto de cada página do projeto
// adicionar informações de localização
// cria novas páginas para cada idioma do projeto
exports.createPages = async ({ graphql, actions, reporter }) => {
  const schemasFiles = await fs.readdir(schemasPath);
  const pageFiles = await fs.readdir(pageSiteFolder);
  const { createPage } = actions;
  // first array locale position it's reserved to default locale
  // dealing with allSitePages: theme/src/pages
  const createPageSite = async (page, schemasLoaded) => {
    const fileName = page.split(".")[0];

    for (const schemaFile of schemasLoaded) {
      const isDefaultI18n = schemaFile === "default.json" ? true : false;
      const isIndex = fileName === "index" ? true : false;
      const is404 = fileName === "404" ? true : false;
      const localePathQuery = isDefaultI18n ? "" : schemaFile.slice(0, 2);

      let pathQuery = isIndex ? "" : fileName;

      const pathExtended = isDefaultI18n
        ? "/" + localePathQuery
        : "/" + localePathQuery + "/" + pathQuery;

      const schemaLocaleContent = await require(`${schemasPath}/${schemaFile}`);
      const cardUse = !isDefaultI18n
        ? schemaLocaleContent?.schema[0]?.card[0]
        : card;

      const pageSiteObj = {
        path: pathExtended,
        component: pageSiteFolder + "/" + page,
        context: {
          schemaJSON: cardUse,
        },
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
            context: { schemaJSON: cardUse },
          });

          await createPage({
            path: "/" + element.split("-")[0] + "/" + "404" + ".html",
            component: path.resolve(
              rootDir,
              `${card.themePath}/src/pages/404.js`
            ),
            context: { schemaJSON: cardUse },
          });
        }

        await createPage({
          path: "/" + "dev-404-page" + "/",
          component: path.resolve(
            rootDir,
            `${card.themePath}/src/pages/404.js`
          ),
          context: { schemaJSON: cardUse },
        });

        return await createPage({
          path: "/" + "404" + ".html",
          component: path.resolve(
            rootDir,
            `${card.themePath}/src/pages/404.js`
          ),
          context: { schemaJSON: cardUse },
        });
      }

      if (isDefaultI18n || isIndex) {
        await createPage(pageSiteObj);
      }
    }
  };

  try {
    await Promise.all(
      pageFiles.map(file => createPageSite(file, schemasFiles))
    );
  } catch (err) {
    console.error(err);
  }

  // markdown-i18n
  //
  // onCreateNode
  // - i18n slug field
  // - Adding i18n slug field to each MD
  // createPages
  // - create i18n PAGES from content/pages, MDS PAGES

  // dealing with allPages: allMarkdownRemark
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
