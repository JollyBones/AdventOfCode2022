import { readInFile } from "../filereader.ts";

function calcManDist(senX: number, senY: number, beaX: number, beaY: number) {
	return (Math.abs(senX - beaX) + Math.abs(senY - beaY));
}

function checkImpossibleLocations(distances: Map<string, number>, searchSize: number): Map<number, Set<number>> {
	const impossibles = new Map<number, Set<number>>();

	distances.forEach((dist, coord) => {
		const [xBase, yBase] = coord.match(/\d+/g)!.map(v => Number(v));

		const minY = Math.max(0, yBase - dist);
		const maxY = Math.min(searchSize, yBase + dist);

		console.log(coord, minY, maxY);
		for (let y = minY; y <= maxY; y++) {
			const xOffset = Math.abs(Math.abs(y - yBase) - dist)
			const minX = Math.max(0, xBase - xOffset);
			const maxX = Math.min(searchSize, xBase + xOffset);
			const set = impossibles.get(y) ?? new Set();
			for (let x = minX; x <= maxX; x++) {
				set.add(x);
			}
			impossibles.set(y, set);
		}
	});
	return impossibles;
}

readInFile('./inputs/day-15/input.dat', (data) => {
	const inputs = data.split('\n');
	const distances = new Map<string, number>();
	const searchSize = 10_000; // Change this to 10,000;

	inputs.forEach(input => {
		const [senX, senY, beaX, beaY] = input.match(/[-\d]+/g)!.map(value => Number(value));
		distances.set(`${senX},${senY}`, calcManDist(senX, senY, beaX, beaY));
	});

	const impossibles = checkImpossibleLocations(distances, searchSize);

	// Tune frequency.

	const possibles = [];
	for (let y = 0; y <= searchSize; y++) {
		const row = impossibles.get(y) ?? new Set();
		for (let x = 0; x <= searchSize; x++) {
			if (!row.has(x)) {
				possibles.push(`${x},${y}`);
			}
		}
	}
	console.log(impossibles.size);
	console.log(possibles);
});
