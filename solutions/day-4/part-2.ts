import { readInFile } from "../filereader.ts";

readInFile("./inputs/day-4/input.dat", (data) => {
  let partialOverlapCount = 0;
  const pairs = data.split("\n");
  pairs.forEach((pair) => {
    const [one, two] = pair.split(",");
    const [oneStart, oneEnd] = one.split("-").map((index) => Number(index));
    const [twoStart, twoEnd] = two.split("-").map((index) => Number(index));

    if (
      (oneStart >= twoStart && oneStart <= twoEnd) ||
      (oneEnd >= twoStart && oneEnd <= twoEnd) ||
      (twoStart >= oneStart && twoStart <= oneEnd) ||
      (twoEnd >= oneStart && twoEnd <= oneEnd)
    ) {
      partialOverlapCount++;
    }
  });
  console.log(partialOverlapCount);
});
