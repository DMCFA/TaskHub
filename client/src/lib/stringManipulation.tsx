export const removeAfterUnderscore = (str: string): string => {
  const index = str.indexOf('_');
  return index !== -1 ? str.slice(0, index) : str;
};
