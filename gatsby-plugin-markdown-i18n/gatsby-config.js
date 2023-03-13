// gatsby-config.js
//requiring path and fs modules
// imports and configs
// xxxxxxxxxxxxxxxxxx
const path = require("path");
const fs = require("fs/promises");
const { readdir, readFile } = require("fs/promises");
const rootDir = path.join(__dirname, "../");
const schemaOrg = require(path.resolve(
  rootDir,
  `content/schemas/default.json`
));
const card = schemaOrg.schema[0].card[0];
const contentPath = path.resolve(rootDir, card.contentPath);
const slicesPath = path.resolve(rootDir, `${card.contentPath}/slices`);

// let y = [];
// async function readSlices(instanceName, folder, subFolder) {
// return await fs.readdir(slicesPath);
// }

// const t = async () =>
//   readSlices().then(values => {
//     console.log("values");
//     console.log(values);
//     return sourcesResolve({
//       resolve: `gatsby-source-filesystem`,
//       options: {
//         name: "sections",
//         path: path.resolve(rootDir, contentPath + `/slices/${values}`),
//       },
//     });
//   });
// console.log("yyyyyyyyyyyy");
// console.log(y);
// console.log(t);

async function uniqueValues(dir) {
  const files = await fs.readdir(dir);
  const filesContent = await Promise.all(
    files.map(file => {
      return !file.includes(".") ? fs.readdir(dir + "/" + file) : null;
    })
  );
  const arr = files.reduce((acc, data, currentIndex) => {
    console.log("data");
    console.log(data);
    console.log(sourcesResolve(data, "slices", data));

    acc.push(sourcesResolve(data, "slices", data));

    return acc;
  }, []);

  return arr;
}

const hs = uniqueValues(slicesPath).then(values => {
  values.forEach(h => {
    return h;
  });
});
console.log("maoi");
console.log("hs");
console.log(hs);
console.log("hs");
// sourcesResolve("sections", "slices", "sections"),
const sourcesResolve = (instanceName, folder, subFolder) => {
  return {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: instanceName,
      path: path.resolve(rootDir, contentPath + `/${folder}/${subFolder}`),
    },
  };
};

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: path.resolve(rootDir, contentPath + "/pages/"),
        ignore: [`**/\.jpg`, `**/\.png`], // ignore files starting with a dot
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "components",
        path: path.resolve(rootDir, contentPath + "/slices/components"),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "sections",
        path: path.resolve(rootDir, contentPath + "/slices/components"),
      },
    },
  ],
};
