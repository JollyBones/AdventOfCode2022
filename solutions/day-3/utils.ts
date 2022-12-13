export const getPriority = (item: string): number => {
  if (item.length > 1) {
    throw Error("Cannot get priority of more than one character");
  }
  const code = item.charCodeAt(0);
  if (code > 96) {
    return code % 96;
  }
  return (code % 64) + 26;
};
