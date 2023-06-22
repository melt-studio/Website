export const getLocalStorageConfig = (name, defaultConfig) => {
  const localConfig = JSON.parse(window.localStorage.getItem("melt_config"));
  if (localConfig !== null && localConfig[name]) {
    if (localConfig[name].id !== defaultConfig[name].id) {
      console.log(`Mismatching record ids: ${localConfig[name].id}, ${defaultConfig[name].id}`);
    }

    return localConfig[name];
  }
  return null;
};
