import { readInFile } from "../filereader.ts";

readInFile("./inputs/day-4/input.dat", (data) => {
  let fullOverlapCount = 0;
  const pairs = data.split("\n");
  pairs.forEach((pair) => {
    const [one, two] = pair.split(",");
    const [oneStart, oneEnd] = one.split("-").map((index) => Number(index));
    const [twoStart, twoEnd] = two.split("-").map((index) => Number(index));

    if (
      (oneStart >= twoStart && oneEnd <= twoEnd) ||
      (twoStart >= oneStart && twoEnd <= oneEnd)
    ) {
      fullOverlapCount++;
    }
  });
  console.log(fullOverlapCount);
});
