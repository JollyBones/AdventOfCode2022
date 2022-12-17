import { readInFile } from '../filereader.ts';

let maxY = Number.NEGATIVE_INFINITY;

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
				}
			}
			start = end;
		}
	});
	return grid;
}


function dropSand(x: number, y: number, grid: Map<string, string>): string {
	if (y + 1 === maxY) {
		return `${x},${y}`;
	} 

	if (!grid.get(`${x},${y+1}`)) return dropSand(x, y+1, grid);
	if (!grid.get(`${x-1},${y+1}`)) return dropSand(x-1, y+1, grid);
	if (!grid.get(`${x+1},${y+1}`)) return	dropSand(x+1, y+1, grid);

	if (x === 500 && y === 0) return "OVERFLOWING";

	return `${x},${y}`;
}

function calculateTotalSand(grid: Map<string, string>): number {
	let count = 1; // Include 500, 0

	sandLoop: while (true) {
		const point = dropSand(500, 0, grid);
		if (point === "OVERFLOWING") {
			break sandLoop;
		}
		grid.set(point, "O");
		count++;
	}

	return count;
}

readInFile('./inputs/day-14/input.dat', (data) => {
	const rockPaths = data.split("\n");	
	const grid = createGrid(rockPaths);
	maxY += 2;

	const sandCount = calculateTotalSand(grid);

	console.log(sandCount);
});