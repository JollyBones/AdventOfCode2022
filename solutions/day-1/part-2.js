const fs = require('fs');

fs.readFile('./inputs/day-1/input.dat', 'utf-8', (err, data) => {
	let topCounts = [];
	let currCount = 0;

	if (err) {
		console.error(err);
		return;
	}

	const values = data.split("\n");
	values.forEach(value => {
		if (!value) {
			if (topCounts.length < 3 || topCounts.some(tc => tc < currCount)) {
				topCounts.push(currCount);
				topCounts.sort((a, b) => b - a);
				topCounts.length > 3 && topCounts.pop()
			}
			currCount = 0;
		} else {
			currCount += Number(value);
		}
	});

	console.log(topCounts);
	console.log(topCounts.reduce((a, b) => a + b))
});