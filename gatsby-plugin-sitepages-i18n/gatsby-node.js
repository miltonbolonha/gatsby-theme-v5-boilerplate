const path = require("path");
const rootDir = path.join(__dirname, "../");
const fs = require("fs");
const pageSiteFolder = path.resolve(
  rootDir,
  "gatsby-theme-nuktpls-one/src/pages"
);

const schemaOrg = require(path.resolve(
  rootDir,
  `content/configs/schema-org.json`
));
const card = schemaOrg.schema[0].card[0];
const locales = schemaOrg.locales;

// let files = []

// fs.readdir(pageSiteFolder, (err, files) => {
//   files.forEach(file => {
//     console.log(file);
//     const x = {
//       path: file.split(".")[0],
//       component: pageSiteFolder + "/" + file,
//     };
//     files.push(x)
//   });
// });

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNode, createNodeField, createNodeId } = actions;
  console.log(node.internal.type);
  if (node.internal.type === "SitePage") {
    createNodeField({
      node,
      name: "i18n",
      value: card.brandIntl,
    });
  }
};

exports.createPages = async function ({ graphql, actions, reporter }) {
  const { createPage, createRedirect } = actions;

  await graphql(`
    {
      allSchemaJson {
        nodes {
          card {
            brandAppName
            brandAppRepo
            brandAppVersion
            brandCardImage
            brandDescription
            brandEmail
            brandGithub
            brandHexHelperColor
            brandHexMainColor
            brandHighlights
            brandIntl
            brandKeywords {
              key
            }
            brandLinkTree {
              deezer
              facebook
              github
              instagram
              itunes
              spotify
              twitter
              website
              youtube
            }
            brandLogo
            brandLogoTransparent
            brandName
            brandPascalName
            brandPerson
            brandPersonBusinessBio
            brandPersonBusinessHistory
            brandPersonFamilyBio
            brandPhone
            brandPromoEmail
            brandQuestions
            brandSeoDivisor
            brandSlugName
            brandTopologyDivName
            brandTopologyDivSlug
            brandUrl
            brandVideoText
            brandVideoUrl
            cardLocale
            contentPath
            datePublished
            imageBreakPoints
            imageFormats
            imageQuality
            imageMaxWidth
            postPerPage
            staticImagesPath
            technicalOfficer
            themePath
            trailingSlash
          }
        }
      }
      allSitePage {
        nodes {
          path
          component
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      reporter.panicOnBuild("Error loading MD result", result.errors);
    }
    const allSitePage = result?.data?.allSitePage?.nodes;

    fs.readdir(pageSiteFolder, (err, files) => {
      console.log("files");
      console.log(files);
      files.forEach(async file => {
        console.log(file);
        const x = {
          path: file.split(".")[0],
          component: pageSiteFolder + "/" + file,
        };
        console.log({
          path: "en" + "/" + x.path, // need to add language prefix
          component: path.resolve(rootDir, x.component),
        });
        if (x.path === "index") {
          await createPage({
            path: "en" + "/", // need to add language prefix
            component: path.resolve(rootDir, x.component),
          });
          console.log("PÁGINA EN INDEX CRIADA");
        } else {
          await createPage({
            path: "en" + "/" + x.path, // need to add language prefix
            component: path.resolve(rootDir, x.component),
          });
          console.log("PÁGINA EN CRIADA");
        }
      });
    });
  });
};
