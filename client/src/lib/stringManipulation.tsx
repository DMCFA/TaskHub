export const removeAfterUnderscore = (str: string): string => {
  const index = str.indexOf('_');
  return index !== -1 ? str.slice(0, index) : str;
};

export const removeSymbolsFromPath = (str: string): string => {
  const parts = str.split('/');
  const lastPart = parts[parts.length - 1];
  const withSpace = lastPart.replace(/-/g, ' ');
  const capitalized = withSpace.charAt(0).toUpperCase() + withSpace.slice(1);
  return capitalized;
};
