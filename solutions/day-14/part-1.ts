import { readInFile } from '../filereader.ts';

let minX = Number.POSITIVE_INFINITY, maxX = Number.NEGATIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY;

const TAKEN_POINTS = ["#", "O"];

function createGrid(paths: string[]): Map<string, string> {
	const grid = new Map<string, string>();
	paths.forEach(path => {
		const coords = path.split(' ').filter(rp => rp !== '->');
		let start = coords.shift()!;

		while (coords.length > 0) {
			const end = coords.shift()!;
			// do work;
			const [startX, startY] = start?.split(',').map(coord => Number(coord));
			const [endX, endY] = end?.split(',').map(coord => Number(coord));

			if (startX === endX) {
				// moving up-down
				const start = startY > endY ? endY : startY;
				const end = startY > endY ? startY : endY;
				for (let y = start; y <= end; y++) {
					grid.set(`${startX},${y}`, "#");
					if (y > maxY) maxY = y;
				}
			} else {
				// moving left-right
				const start = startX > endX ? endX : startX;
				const end = startX > endX ? startX : endX;
				for (let x = start; x <= end; x++) {
					grid.set(`${x},${startY}`, "#");
					if (x < minX) minX = x;
					if (x > maxX) maxX = x;
				}
			}
			start = end;
		}
	});
	return grid;
}

function printGrid(grid: Map<string, string>): void {
	for (let ii = 0; ii <= maxY; ii++) {
		let outString = "";
		for (let jj = minX; jj <= maxX; jj++) {
			outString += grid.get(`${jj},${ii}`) ?? ".";
		}
		console.log(outString);
	}
}

function dropSand(x: number, y: number, grid: Map<string, string>): string {
	if (x < minX || y > maxX || y > maxY) return "OVERFLOWING";

	if (!grid.get(`${x},${y+1}`)) return dropSand(x, y+1, grid);
	if (!grid.get(`${x-1},${y+1}`)) return dropSand(x-1, y+1, grid);
	if (!grid.get(`${x+1},${y+1}`)) return	dropSand(x+1, y+1, grid);
	return `${x},${y}`;
};

function calculateTotalSand(grid: Map<string, string>): number {
	let count = 0;

	sandLoop: while (true) {
		const point = dropSand(500, 0, grid);
		if (point === "OVERFLOWING") {
			break sandLoop;
		}
		grid.set(point, "O");
		count++;
	};

	return count;
}

readInFile('./inputs/day-14/input.dat', (data) => {
	const rockPaths = data.split("\n");	
	const grid = createGrid(rockPaths);

	const sandCount = calculateTotalSand(grid);

	console.log(sandCount);
});