exports.onPostBuild = async ({ cache }) => {
  await cache.set(`defauktLocale`, `pt-BR`);
  const cachedValue = await cache.get(`defauktLocale`);
  console.log("cachedValue");
  console.log(cachedValue); // logs `value`
};
