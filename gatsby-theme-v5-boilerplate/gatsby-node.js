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
// const pagesPath = path.resolve(rootDir, `content/pages`);
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
// Adding slug field to each post
// Adiciona um campo slug a cada nó do tipo MarkdownRemark
// E um campo i18n a cada nó do tipo SitePage
// Facilita o tratamento de localização (tradução) no projeto.

exports.onCreateNode = async ({ node, getNode, getNodesByType, actions }) => {
  const { createNodeField } = actions;
  // const markdownNodes = getNodesByType(`MarkdownRemark`);

  if (node.internal.type === "SitePage") {
    createNodeField({
      node,
      name: "i18n",
      value: card.brandIntl,
    });
    createNodeField({
      node,
      name: "schemaJSON",
      value: card,
    });
  }

  if (node?.internal?.type === "MarkdownRemark") {
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
      slashSlug.includes(".md") && !htmlSlug
        ? slashSlug.split(".md")[0]
        : slashSlug;
    const slugTitle = slugTrim.includes(".")
      ? slugTrim.split(".")[0]
      : slugTrim;
    const frontmatterSlug = node?.frontmatter?.slug
      ? node.frontmatter.slug
      : slugTitle;
    const slugLocale = slugTrim.split(".")[1];
    const isI18n = slugTrim.includes(".");
    const isLocale = isI18n && slugLocale !== "";

    const finalSlug = isLocale
      ? "/" + slugLocale + "/" + frontmatterSlug + "/"
      : slugTrim;
    const schemasFiles = await fs.readdir(schemasPath);

    const localesWithouDefault = [];
    for (const element of schemasFiles) {
      if (element !== "default.json") {
        localesWithouDefault.push(element);
      }
    }
    const MDPagesFolder = path.resolve(rootDir, `content/pages`);
    const MDFiles = await fs.readdir(MDPagesFolder);
    const regexTranslation = /\.([a-z0-9-]{2})\.md$/i;

    const translations = MDFiles.filter(
      md =>
        md.match(regexTranslation) &&
        md.split(".").length > 1 &&
        md.split(".")[0] === slugTitle
    );

    const defaultsMds = MDFiles.filter(
      md =>
        !md.match(regexTranslation) &&
        md.split(".").length > 1 &&
        md.split(".")[0] === slugTitle
    );
    if (!slashSlug.includes(".") && translations.length > 0) {
      defaultsMds.forEach(async md => {
        if (md.split(".").length > 1 && md.split(".")[0] === slugTitle) {
          const mdLocale = MDFiles.filter(
            e =>
              e.match(regexTranslation) &&
              e.split(".").length > 1 &&
              e.split(".")[0] === slugTitle
          );
          const arrayI18n = [];
          mdLocale.forEach(
            async el =>
              arrayI18n.push(
                `${
                  locales.filter(d => d.split("-")[0] === el.split(".")[1])[0]
                }`
              )
            // console.log("markdownNodes.filter(nod=>nod.fileAbsolutePath===el)"),
            // console.log(
            //   markdownNodes.filter(nod => nod.fileAbsolutePath === el)
            // )
          );
          arrayI18n.push(locales[0]);
          await createNodeField({
            node,
            name: "availableI18n",
            value: arrayI18n,
          });
        } else {
          await createNodeField({
            node,
            name: "availableI18n",
            value: [locales[0]],
          });
        }
      });
    }

    if (translations.length > 0) {
      translations.forEach(async md => {
        if (md.split(".").length > 1 && md.split(".")[0] === slugTitle) {
          const mdLocale = MDFiles.filter(
            e =>
              e.match(regexTranslation) &&
              e.split(".").length > 1 &&
              e.split(".")[0] === slugTitle
          );
          const arrayI18n = [];
          mdLocale.forEach(async el =>
            arrayI18n.push(
              `${locales.filter(d => d.split("-")[0] === el.split(".")[1])[0]}`
            )
          );
          arrayI18n.push(locales[0]);

          await createNodeField({
            node,
            name: "availableI18n",
            value: arrayI18n,
          });
        }
      });
    } else {
      await createNodeField({
        node,
        name: "availableI18n",
        value: [locales[0]],
      });
    }
    let foundedLocale = localesWithouDefault.filter(e =>
      e.includes(slugLocale)
    );
    if (!foundedLocale || foundedLocale === "") {
      foundedLocale === locales[0];
    } else {
      foundedLocale == null;
    }
    const i18n = foundedLocale ? foundedLocale : locales[0];
    const finalI18n =
      i18n && Array.isArray(i18n) && i18n[0]
        ? i18n[0].split(".")[0]
        : locales[0];

    await createNodeField({
      node,
      name: "i18n",
      value: finalI18n || reqSchemaDefault.locales[0],
    });

    await createNodeField({
      node,
      name: "AllI18n",
      value: reqSchemaDefault.locales,
    });
    const indexLocale = finalSlug.match(/^\/([a-z]{2})(?!index)\/$/);
    await createNodeField({
      node,
      name: "slug",
      value: finalSlug === indexLocale ? indexLocale[0] : finalSlug,
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
  const i18nContextPageSite = async (page, file, schemasLoaded) => {
    console.log("começouuu");
    for (const schemaFile of schemasLoaded) {
      const schema = require(path.resolve(
        rootDir,
        `content/schemas/${schemaFile}`
      ));

      const cardElement = schema.schema[0].card[0];
      const cardElementDefault = reqSchemaDefault.schema[0].card[0];

      const cardLocale = cardElement.cardLocale.split("-")[0];
      const cardLocalePath = "/" + cardLocale + "/";
      const pathLocale = page.path;
      const pathLocaleHasI18n = pathLocale.includes(cardLocalePath);
      const defaultLanguage = reqSchemaDefault.locales[0].split("-")[0];
      const isDefaultLanguage = defaultLanguage === cardLocale;
      const isDefaultSchema = schemaFile === "default.json";
      console.log("");
      console.log("newPage.frontmatter");
      console.log(page);
      console.log(page.frontmatter);
      console.log("");
      console.log(newPage.frontmatter);
      console.log(newPage);
      console.log("");
      newPage.context = {
        ...newPage.context,
        schemaJSON: pathLocaleHasI18n ? cardElement : cardElementDefault,
        prefixI18n: cardLocale,
        SEO: {
          i18n: cardElement.cardLocale,
          topology: "pages",
          dateCreated: cardElement.datePublished,
          datePublished: cardElement.datePublished,
          slug: newPage.path,
          siteUrl: cardElement.brandUrl,
          articleUrl: cardElement.brandUrl + "/" + newPage.path,
          title: cardElement.brandName,
          description: cardElement.brandDescription,
          keywords: cardElement.brandKeywords,
          author: cardElement.brandName,
          social: cardElement.sameAs,
          articleBody: "page.html",
          questions: cardElement.questions,
          brandLogo: cardElement.brandLogo,
          brandCardImage: cardElement.brandCardImage,
          featuredImage: cardElement.brandCardImage,
          fbAppID: cardElement.fbAppID,
          themeColor: cardElement.brandHexMainColor,
          brandName: cardElement.brandName,
          brandDescription: cardElement.brandDescription,
          brandKeywords: cardElement.brandKeywords,
          brandEmail: cardElement.brandEmail,
          brandPhone: cardElement.brandPhone,
        },
      };
      // console.log(newPage.context);
      // console.log("newPage.context");
      // console.log("");

      if (
        newPage.path === "/" ||
        (isDefaultLanguage && isDefaultSchema && newPage.path === "/") ||
        newPage.path.includes("404")
      ) {
        createPage(newPage);
      }
      // await fs.readdir(pageSiteFolder, (err, files) => {
      //   files.map((file, ind) => {

      //   });
      // });

      // if (
      //   isDefaultLanguage &&
      //   isDefaultSchema &&
      //   newPage.path === "/dev-404-page/" &&
      //   newPage.path === "/404/" &&
      //   newPage.path === "404.html"
      // ) {
      //   createPage(newPage);
      // }
    }
  };

  try {
    await Promise.all(
      pageFiles.map(file => i18nContextPageSite(newPage, file, schemasFiles))
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
      const isIndex = page === "index.js" ? true : false;
      const is404 = page === "404.js" ? true : false;
      const localePathQuery = isDefaultI18n ? "" : schemaFile.slice(0, 2);
      // console.log("fileName");
      // console.log(fileName);
      let pathQuery = isIndex && !is404 ? "" : fileName + "/";

      const pathExtended = isDefaultI18n
        ? "/" + pathQuery
        : "/" + schemaFile.slice(0, 2) + "/" + pathQuery;

      const schemaLocaleContent = await require(`${schemasPath}/${schemaFile}`);
      const cardUse = !isDefaultI18n
        ? schemaLocaleContent?.schema[0]?.card[0]
        : card;

      const pageSiteObj = (path, component) => {
        return {
          path: path,
          component: component,
          context: {
            schemaJSON: cardUse,
          },
        };
      };

      if (is404) {
        // await createPage(pageSiteObj);
        const errorComponent = path.resolve(
          rootDir,
          `${card.themePath}/src/pages/404.js`
        );
        for (let index = 1; index < locales.length; index++) {
          const element = locales[index];
          // locales.forEach(async locale => {
          await createPage(
            pageSiteObj(
              "/" + element.split("-")[0] + "/" + "dev-404-page" + "/",
              errorComponent
            )
          );
          await createPage(
            pageSiteObj(
              "/" + element.split("-")[0] + "/" + "404" + ".html",
              errorComponent
            )
          );
          await createPage(
            pageSiteObj("/" + "dev-404-page" + "/", errorComponent)
          );
          await createPage(pageSiteObj("/" + "404" + ".html", errorComponent));
          // console.log("");
          // console.log("404 criada");
          // console.log(element.split("-")[0]);
          // console.log("");
        }
      }
      if (isDefaultI18n || (isIndex && isDefaultI18n)) {
        // console.log("");
        // console.log("criada pagina isDefaultI18n || isIndex");
        // console.log("");
        await createPage({
          path: pathExtended,
          component: pageSiteFolder + "/" + page,
          context: {
            schemaJSON: cardUse,
          },
        });
      } else {
        // console.log("");
        // console.log("criada pagina contraria a isDefaultI18n || isIndex");
        // console.log("");
        await createPage({
          path: pathExtended,
          component: pageSiteFolder + "/" + page,
          context: {
            schemaJSON: cardUse,
          },
        });
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
            questions
            helperI18n
            featuredImage
          }
          fields {
            slug
            i18n
            availableI18n
          }
          html
          fileAbsolutePath
        }
      }
    }
  `).then(async results => {
    if (results.errors) {
      reporter.panicOnBuild("Error loading MD result", results.errors);
    }

    const pages = results.data?.allPages?.nodes
      ? results.data.allPages.nodes
      : console.log("Page Error");

    const npages = results.data.allPages.nodes.reduce((acc, node) => {
      const { slug, i18n } = node.fields;
      if (!acc[slug]) {
        acc[slug] = [];
      }
      acc[slug].push(`${i18n}:${slug}`);
      return acc;
    }, {});

    Object.entries(npages).forEach(([slug, translations]) => {
      console.log({
        path: slug,
        context: translations,
      });
    });

    await pages.forEach(async page => {
      if (!page) {
        return console.log("page: deu erro muito");
      }
      if (page.node?.frontmatter === null) {
        return console.log("page: deu erro");
      }
      const { fileAbsolutePath } = page;
      const { slug, availableI18n, i18n } = page.fields;
      const { title, date, description, helperI18n, questions, featuredImage } =
        page.frontmatter;
      // Use the fields created in exports.onCreatepage
      const regex = /\/([^/]+)\.md$/;
      const localesSlugs = [];

      if (availableI18n && availableI18n.length > 1) {
        // console.log("");
        // console.log("INÍCIO");
        // console.log(
        //   `Estamos na página: ${title} que está escrito na linguagem ${i18n} e com o slug ${slug}`
        // );
        // console.log(`A página acima têm as seguintes traduções:`);
        const arrayObjForEachPage = availableI18n.forEach(async lang => {
          // if (e === lang) {
          //   return null;
          // }
          // achar default
          // achar translations certos
          // achar e montar current
          const loc = lang === locales[0] ? "" : lang.split("-")[0];
          // return console.log({
          //   current: { i18n: lang, slug: slug },
          //   default: { i18n: locales[0], slug: `${loc}/slugxxxx/` },
          //   translations: [{ i18n: lang, slug: `${loc}/slugxxxx/` }],
          // });
        });
        pages.filter(async currPage => {
          const slugTitleTwo = currPage.fileAbsolutePath
            .match(regex)[1]
            .includes(".")
            ? currPage.fileAbsolutePath.match(regex)[1].split(".")[0]
            : currPage.fileAbsolutePath.match(regex)[1];
          const frontmatterSlug = currPage?.frontmatter?.slug
            ? currPage.frontmatter.slug
            : slugTitleTwo;
          const slugLocale = currPage.fileAbsolutePath
            .match(regex)[1]
            .split(".")[1];
          const isI18n = currPage.fileAbsolutePath
            .match(regex)[1]
            .includes(".");
          const isLocale = isI18n && slugLocale !== "";
          const finalSlug = isLocale
            ? "/" + slugLocale + "/" + frontmatterSlug + "/"
            : currPage.fileAbsolutePath.match(regex)[1];
          const schemasFiles = await fs.readdir(schemasPath);

          const localesWithouDefault = [];
          for (const element of schemasFiles) {
            if (element !== "default.json") {
              localesWithouDefault.push(element);
            }
          }

          const MDPagesFolder = path.resolve(rootDir, `content/pages`);
          const MDFiles = await fs.readdir(MDPagesFolder);
          const regexTranslation = /\.([a-z0-9-]{2})\.md$/i;

          const translations = MDFiles.filter(
            md =>
              md.match(regexTranslation) &&
              md.split(".").length > 1 &&
              md.split(".")[0] === slugTitleTwo
          );

          const defaultsMds = MDFiles.filter(
            md =>
              !md.match(regexTranslation) &&
              md.split(".").length > 1 &&
              md.split(".")[0] === slugTitleTwo
          );

          if (
            !currPage.fileAbsolutePath.match(regex)[1].includes(".") &&
            translations.length > 0
          ) {
            defaultsMds.forEach(async md => {
              if (
                md.split(".").length > 1 &&
                md.split(".")[0] === slugTitleTwo
              ) {
                const mdLocale = MDFiles.filter(
                  e =>
                    e.match(regexTranslation) &&
                    e.split(".").length > 1 &&
                    e.split(".")[0] === slugTitleTwo
                );
                const arrayI18n = [];
                mdLocale.forEach(async el =>
                  arrayI18n.push(
                    // locales.filter(
                    //   d => d.split("-")[0] === el.split(".")[1]
                    // )[0]
                    el
                  )
                );
                // arrayI18n.push(locales[0]);
                // availableI18n
                // console.log(arrayI18n);
              }
            });
          }

          if (translations.length > 0) {
            translations.forEach(async md => {
              if (
                md.split(".").length > 1 &&
                md.split(".")[0] === slugTitleTwo
              ) {
                const mdLocale = MDFiles.filter(
                  e =>
                    e.match(regexTranslation) &&
                    e.split(".").length > 1 &&
                    e.split(".")[0] === slugTitleTwo
                );
                const arrayI18n = [];
                mdLocale.forEach(async el => arrayI18n.push(el));
                // availableI18n
                // console.log(arrayI18n);
              }
            });
          }

          let foundedLocale = localesWithouDefault.filter(e =>
            e.includes(slugLocale)
          );
          if (!foundedLocale || foundedLocale === "") {
            foundedLocale === locales[0];
          } else {
            foundedLocale == null;
          }
          const i18nFounded = foundedLocale ? foundedLocale : locales[0];
          const finalI18n =
            i18nFounded && Array.isArray(i18nFounded) && i18nFounded[0]
              ? i18nFounded[0].split(".")[0]
              : locales[0];

          // i18n
          // console.log(finalI18n || reqSchemaDefault.locales[0]);

          // console.log({
          //   name: "slug",
          //   value: finalSlug,
          // });
        });
      }

      // h.brandName
      // h.brandDescription
      // h.brandPhone
      // h.brandPhoneI18n
      // h.brandHexMainColor
      // h.brandEmail
      // h.brandKeywords
      // h.datePublished
      // h.technicalOfficer
      // h.sameAs
      // h.brandLinkTree
      // h.brandUrl
      // h.brandLogo
      // h.brandCardImage
      // h.brandLogoTransparent
      // reqSchemaDefault
      // const card = reqSchemaDefault.schema[0].card[0];

      // console.log("");
      const h = await require(`${schemasPath}/${
        i18n === locales[0] ? "default" : i18n
      }.json`).schema[0].card[0];
      // console.log("");
      // console.log("slice aqui aquiii");
      // console.log({
      //   i18n: i18n,
      //   topology: "pages",
      //   dateCreated: date,
      //   datePublished: date,
      //   slug: slug,
      //   siteUrl: h.brandUrl,
      //   articleUrl: h.brandUrl + slug,
      //   title: title,
      //   description: description,
      //   keywords: h.brandKeywords,
      //   author: h.brandName,
      //   social: h.sameAs,
      //   articleBody: page.html,
      //   questions: questions,
      //   brandLogo: h.brandLogo,
      //   brandCardImage: h.brandCardImage,
      //   featuredImage: featuredImage,
      //   fbAppID: h.fbAppID,
      //   themeColor: h.brandHexMainColor,
      //   brandName: h.brandName,
      //   brandDescription: h.brandDescription,
      //   brandKeywords: h.brandKeywords,
      //   brandEmail: h.brandEmail,
      //   brandPhone: h.brandPhone,
      // });
      console.log(`seo-slug`);
      console.log(`seo-${slug}`);
      actions.createSlice({
        id: `seo-${slug}`,
        context: {
          i18n: i18n,
          topology: "pages",
          dateCreated: date,
          datePublished: date,
          slug: slug,
          siteUrl: h.brandUrl,
          articleUrl: h.brandUrl + "/" + slug,
          title: title,
          description: description,
          keywords: h.brandKeywords,
          author: h.brandName,
          social: h.sameAs,
          articleBody: page.html,
          questions: questions,
          brandLogo: h.brandLogo,
          brandCardImage: h.brandCardImage,
          featuredImage: featuredImage,
          fbAppID: h.fbAppID,
          themeColor: h.brandHexMainColor,
          brandName: h.brandName,
          brandDescription: h.brandDescription,
          brandKeywords: h.brandKeywords,
          brandEmail: h.brandEmail,
          brandPhone: h.brandPhone,
        },
        component: require.resolve(`./src/slices/Seo.js`),
      });
      console.log("");

      createPage({
        path: slug,
        component: path.resolve(
          rootDir,
          `gatsby-theme-v5-boilerplate/src/templates/one-column.js`
        ),
        context: {
          ...page.pageContext,
          title,
          content: page.html,
          description,
          availableI18n,
          i18n,
          theLocales: localesSlugs,
          helperI18n,
          slug,
          SEO: {
            i18n: i18n,
            topology: "pages",
            dateCreated: date,
            datePublished: date,
            slug: slug,
            siteUrl: h.brandUrl,
            articleUrl: h.brandUrl + "/" + slug,
            title: title,
            description: description,
            keywords: h.brandKeywords,
            author: h.brandName,
            social: h.sameAs,
            articleBody: page.html,
            questions: questions,
            brandLogo: h.brandLogo,
            brandCardImage: h.brandCardImage,
            featuredImage: featuredImage,
            fbAppID: h.fbAppID,
            themeColor: h.brandHexMainColor,
            brandName: h.brandName,
            brandDescription: h.brandDescription,
            brandKeywords: h.brandKeywords,
            brandEmail: h.brandEmail,
            brandPhone: h.brandPhone,
          },
        },

        slices: {
          // Any time `<Slice alias="seo">` is seen on this page,
          // use the `seo-${language}` id
          seo: `seo-${slug}`,
        },
      });
    });
  });
};
