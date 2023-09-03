export const setItemsInLS = (key, value) => {
  if (!key || !value) {
    return console.error('Cannot store in Localstorage');
  }

  const valueToStore =
    typeof value !== 'string' ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToStore);
};

export function getItemFromLS(key) {
  if (!key) {
    return console.error(`Cannot get value from Localstorage`);
  }
  console.log(key);
  const temptoken = localStorage.getItem(key);
  return temptoken;
};

export const removeItemFromLS = (key) => {
  if (!key) {
    return console.error(`Cannot remove item from Localstorage`)
  }
  localStorage.removeItem(key)
}