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
const VALID_STARTS: Point[] = [];

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
			if (cell === 'S' || cell == 'a') {
				VALID_STARTS.push({ x, y });
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

function traceRoute(start: Point, network: Node[][]) {
	const queue: Node[] = [];
	const distances: Map<string, number> = new Map();
	const OTHER_STARTS = VALID_STARTS.filter(vs => vs.x === start.x && vs.y === start.y);

	let endFound = -1;

	distances.set(`${start.x},${start.y}`, 0);
	queue.push(network[start.y][start.x]);

	runtime: while (queue.length > 0) {
		const node = queue.shift()!;
		const distance = distances.get(node.point)!;

		if (endFound > -1) {
			break runtime;
		}

		node.neighbours.forEach(n => {
			if (OTHER_STARTS.includes(n)) {
				return;
			}
			const cellName = `${n.x},${n.y}`;
			if (!distances.get(cellName)) {
				const point = network[n.y][n.x];
				distances.set(cellName, distance + 1);
				if (point.height === 'E') {
					console.log('Found shortest distance ' + (distance + 1));
					endFound = distance + 1;
				}
				queue.push(point);
			}
		});
	}
	return endFound;
}

readInFile('./inputs/day-12/input.dat', (data) => {
	// Set globals;
	const rows = data.split("\n");
	const grid = rows.map(row => row.split(''));
	MAX_HEIGHT = grid.length - 1;
	MAX_WIDTH = grid[0]!.length - 1;

	const network = generateNetwork(grid);

	let endFound = false;

	const starts = VALID_STARTS.map(vs => traceRoute(vs, network)).filter(vs => vs != -1).sort((a, b) => a - b);

	console.log(starts);
	// Use a priority queue Dijsktra algorithm
	// https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
});