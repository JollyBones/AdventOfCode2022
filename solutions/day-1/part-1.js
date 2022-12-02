const fs = require('fs');

fs.readFile('./inputs/day-1/input.dat', 'utf-8', (err, data) => {
	let topCount = 0;
	let currCount = 0;
	if (err) {
		console.error(err);
		return;
	}
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