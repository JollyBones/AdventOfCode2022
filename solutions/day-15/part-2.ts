import { readInFile } from "../filereader.ts";

function calcManDist(senX: number, senY: number, beaX: number, beaY: number) {
	return (Math.abs(senX - beaX) + Math.abs(senY - beaY));
}

function checkImpossibleLocations(sensors: Map<string, number>, searchSize: number): string {
	const distances = [...sensors.entries()].map(s => {
		const [x, y] = s[0].match(/[-\d]+/g)!.map(s => Number(s));
		return {
			x,
			y,
			distance: s[1],
		};
	});
	for (let x = 0; x <= searchSize; x++) {
		for (let y = 0; y <= searchSize; y++) {
			let found = false;
			dLoop: for (let ii = 0; ii < distances.length; ii++) {
				const distance = distances[ii];
				if (calcManDist(x, y, distance.x, distance.y) <= distance.distance) {
					found = true;
					break dLoop;
				}
			}
			if (!found) {
				return `${x},${y}`;
			}
		}
	}
	return "UNFOUND";
}

readInFile('./inputs/day-15/input.dat', (data) => {
	const inputs = data.split('\n');
	const distances = new Map<string, number>();
	const searchSize = 4_000_000;

	inputs.forEach(input => {
		const [senX, senY, beaX, beaY] = input.match(/[-\d]+/g)!.map(value => Number(value));
		distances.set(`${senX},${senY}`, calcManDist(senX, senY, beaX, beaY));
	});

	const distressSignal = checkImpossibleLocations(distances, searchSize);
	console.log(distressSignal);
	// Tune frequency.
});
