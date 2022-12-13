import { readInFile } from '../filereader.ts';

type Point = {
	x: number;
	y: number;
};
let MAX_X = -1;
let MAX_Y = 1;
let grid: string[][] = [];

const getStartAndEndPoints = (grid: string[][]): Point[] => {
	let start: Point | undefined = undefined;
	let end: Point | undefined = undefined;

	points: for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
		if (start && end) {
			break points;
		}
		const row = grid[rowIndex];
		const startIndex = row.findIndex(cell => cell === 'S');
		const endIndex = row.findIndex(cell => cell === 'E');

		if (startIndex > -1) {
			start = {
				x: startIndex,
				y: rowIndex
			}
		}
		if (endIndex > -1) {
			end = {
				x: endIndex,
				y: rowIndex
			}
		}
	}
	return [start!, end!];
}

const isSamePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

const getValidSteps = (curr: Point, pastPoints: Point[]) => {
	const baseSteps = [
		{
			...curr,
			x: curr.x - 1
		},
		{
			...curr,
			x: curr.x + 1
		},
		{
			...curr,
			y: curr.y - 1,
		},
		{
			...curr,
			y: curr.y + 1,
		}
	];

	return baseSteps
		.filter(step => !(step.x < 0 || step.y < 0) && !(step.x > MAX_X || step.y > MAX_Y))
		.filter(step => !pastPoints.find(p => isSamePoint(step, p)));
}

const sanitiseStep = (code: number): number => {
	if (code === 83) return 97;
	if (code === 69) return 122;
	return code;
}

const getDistance = (a: Point, b: Point) => Math.sqrt(Math.abs(b.y - a.y) + Math.abs(b.x - a.x));

const getPreferredSteps = (steps: Point[], target: Point, currDistance: number): Point[] => {
	const ideal = steps.filter(step => {
		return getDistance(step, target) <= currDistance
	});

	return ideal.length > 0 ? ideal : steps;
}

const isSafeStep = (curr: Point, target: Point): boolean => {
	const currHeight = sanitiseStep(grid[curr.y][curr.x].charCodeAt(0));
	const targetHeight = sanitiseStep(grid[target.y][target.x].charCodeAt(0));

	return Math.abs(currHeight - targetHeight) < 2;
};

const findPaths = (
	start: Point,
	end: Point,
	pastPoints: Point[] = [],
	stepCount = 0,
): number[] => {
	if (isSamePoint(start, end)) {
		console.log(`Found valid path in ${stepCount} steps`);
		return [stepCount];
	}

	const currDistance = getDistance(start, end);
	const validSteps = getValidSteps(start, pastPoints);
	const preferredSteps = getPreferredSteps(validSteps, end, currDistance);
	const nonPreferredSteps = validSteps.filter(vs => !preferredSteps.includes(vs));

	const firstDistances = preferredSteps.map(step => {
		if (isSafeStep(start, step)) {
			return findPaths(step, end, [...pastPoints, start], stepCount + 1)
		}
		return [];
	}).flatMap(a => a, []);
	return firstDistances.length === 0 ? nonPreferredSteps.map(step => {
		if (isSafeStep(start, step)) {
			return findPaths(step, end, [...pastPoints, start], stepCount + 1)
		}
		return []
	}).flatMap(a => a) : firstDistances;
}

readInFile('./inputs/day-12/input.dat', (data) => {
	// Set globals;
	grid = data.split("\n").map(d => d.split(""));
	MAX_X = grid[0].length - 1;
	MAX_Y = grid.length - 1;

	// Get starts and ends
	const [start, end] = getStartAndEndPoints(grid);

	// Get paths
	const paths = findPaths(start, end);

	console.log(paths.sort());
});