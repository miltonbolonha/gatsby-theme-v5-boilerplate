exports.onPostBuild = async ({ cache }) => {
  await cache.set(`defaultLocale`, `pt-BR`);
  const cachedValue = await cache.get(`defaultLocale`);
  console.log("cachedValue");
  console.log(cachedValue); // logs `value`
  console.log("cachedValue");
};
