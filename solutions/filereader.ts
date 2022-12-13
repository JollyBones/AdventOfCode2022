export const readInFile = async (
  fileName: string,
  callback: (data: string) => void,
) => {
  const decoder = new TextDecoder("utf-8");
  const file = await Deno.readFile(fileName);
  const data = decoder.decode(file);

  callback(data);
};
