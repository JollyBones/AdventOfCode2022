import { readInFile } from "../filereader";

readInFile('./inputs/day-1/input.dat', (data) => {
	let topCount = 0;
	let currCount = 0;
	
	const values = data.split("\n");

	values.forEach(value => {
		if (!value) {
			if (currCount > topCount) {
				topCount = currCount;
			}
			currCount = 0;
		} else {
			currCount += Number(value);
		}
	});

	console.log(topCount);
});