export const addKeysToArray = (array) => {
  return array.map((item, index) => {
    return { ...item, key: index.toString() };
  });
};
