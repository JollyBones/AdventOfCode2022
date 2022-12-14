import { readInFile } from '../filereader.ts';

type Point = {
	x: number,
	y: number,
};

type Node = {
	height: string,
	point: string,
	neighbours: Point[],
	distance: number,
}

let MAX_HEIGHT = -1;
let MAX_WIDTH = -1;
let START_POINT: Point = { x: -1, y: -1 };

function isValidPoint(point: Point): boolean {
	return !(point.x < 0 || point.y < 0) && !(point.x > MAX_WIDTH || point.y > MAX_HEIGHT);
}

function sanitiseHeight(cell: number): number {
	if (cell === 83) return 97;
	if (cell === 69) return 122;
	return cell;
}

function isSafeHeight(start: string, end: string): boolean {
	const startHeight = sanitiseHeight(start.charCodeAt(0));
	const endHeight = sanitiseHeight(end.charCodeAt(0));

	return endHeight - startHeight < 2;
}

function generateNetwork(grid: string[][]): Node[][] {
	return grid.map((row, y) => {
		return row.map((cell, x) => {
			if (cell === 'S') {
				START_POINT = { x, y };
			}
			const neighbours: Point[] = [
				{
					x: x + 1,
					y,
				},
				{
					x: x - 1,
					y,
				},
				{
					x,
					y: y + 1,
				},
				{
					x,
					y: y - 1
				}
			];

			const validNeighbours = neighbours.filter(point => {
				return isValidPoint(point) && isSafeHeight(cell, grid[point.y][point.x]);
			});

			return {
				height: cell,
				point: `${x},${y}`,
				neighbours: validNeighbours,
				distance: Number.MAX_SAFE_INTEGER,
			}
		});
	});
}

readInFile('./inputs/day-12/input.dat', (data) => {
	// Set globals;
	const rows = data.split("\n");
	const grid = rows.map(row => row.split(''));
	MAX_HEIGHT = grid.length - 1;
	MAX_WIDTH = grid[0]!.length - 1;

	const network = generateNetwork(grid);
	const queue: Node[] = [];
	const distances: Map<string, number> = new Map();

	distances.set(`${START_POINT.x},${START_POINT.y}`, 0);
	queue.push(network[START_POINT.y][START_POINT.x]);

	let endFound = false;

	runtime: while (queue.length > 0) {
		const node = queue.shift()!;
		const distance = distances.get(node.point)!;

		if (endFound) {
			break runtime;
		}

		node.neighbours.forEach(n => {
			const cellName = `${n.x},${n.y}`;
			if (!distances.get(cellName)) {
				const point = network[n.y][n.x];
				distances.set(cellName, distance + 1);
				if (point.height === 'E') {
					console.log('Found shortest distance ' + (distance + 1));
					endFound = true;
				}
				queue.push(point);
			}
		});
	}

	console.log(distances);
	// Use a priority queue Dijsktra algorithm
	// https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
});