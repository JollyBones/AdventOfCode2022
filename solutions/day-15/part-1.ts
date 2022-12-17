import { readInFile } from "../filereader.ts";

function calcManDist(senX: number, senY: number, beaX: number, beaY: number) {
	return Math.abs(senX - beaX) + Math.abs(senY - beaY);
}

function checkImpossibleLocations(distances: Map<string, number>, row: number, exclusions: number[]): Set<number> {
	const impossibles = new Set<number>();

	distances.forEach((dist, coord) => {
		const [x, y] = coord.match(/\d+/g)!.map(v => Number(v));
		const targetDist = Math.abs(y - row);
		if (targetDist <= dist) {
			// Do I have to subtract one too?
			const offset = dist - targetDist;
			console.log(`>>> ${offset}`);
			for (let ii = (x - offset); ii <= (x + offset); ii++) {
				if (!exclusions.includes(ii)) {
					impossibles.add(ii);
				}
			}
		}
	});
	return impossibles;
}

readInFile('./inputs/day-15/input.dat', (data) => {
	const inputs = data.split('\n');
	const distances = new Map<string, number>();
	const exclusions = new Set<number>();
	const targetRow = 2_000_000; // Change this to 10,000;

	inputs.forEach(input => {
		const [senX, senY, beaX, beaY] = input.match(/\d+/g)!.map(value => Number(value));
		distances.set(`${senX},${senY}`, calcManDist(senX, senY, beaX, beaY));
		if (beaY === targetRow) {
			exclusions.add(beaX);
		}
	});

	const impossibles = checkImpossibleLocations(distances, targetRow, [...exclusions.values()]);
	console.log([...impossibles.values()].sort((a, b) => a - b));
	console.log(impossibles.size);
});