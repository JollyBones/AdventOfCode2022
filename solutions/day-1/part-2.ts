import { readInFile } from '../filereader.ts';

readInFile('./inputs/day-1/input.dat', (data) => {
	const topCounts: number[] = [];
	let currCount = 0;

	const values = data.split('\n');
	values.forEach((value) => {
		if (!value) {
			if (
				topCounts.length < 3 || topCounts.some((tc) => tc < currCount)
			) {
				topCounts.push(currCount);
				topCounts.sort((a, b) => b - a);
				topCounts.length > 3 && topCounts.pop();
			}
			currCount = 0;
		} else {
			currCount += Number(value);
		}
	});

	console.log(topCounts);
	console.log(topCounts.reduce((a, b) => a + b));
});
