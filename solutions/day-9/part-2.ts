import { readInFile } from "../filereader";

type Direction = 'U' | 'D' | 'R' | 'L';

type Move = {
	direction: Direction
	distance: number,
};

type Point = {
	x: number;
	y: number;
}

readInFile('./inputs/day-9/input.dat', (data) => {
	const orders = data.split('\n');
	// There are negative moves
	let tailPoints: Map<number, Map<number, string>> = new Map();
	const moves: Move[] = [];

	const getDistance = (a: number, b: number) => Math.abs(a - b);

	const addTailMark = (x: number, y: number) => {
		let column = tailPoints.get(y) ?? new Map();
		column.set(x, '#');
		tailPoints.set(y, column);
	};

	addTailMark(0, 0);
	orders.forEach(order => {
		const [direction, rawDistance] = order.split(' ');
		const distance = Number(rawDistance);
		moves.push({
			direction: direction as Direction,
			distance,
		});
	});

	let rope: Point[] = Array(10).fill({ x: 0, y: 0 });

	moves.forEach((move, moveIndex) => {
		const modifier = ['L', 'D'].includes(move.direction) ? -1 : 1;
		switch (move.direction) {
			case 'U':
			case 'D':
				// Vertical
				for (let ii = 0; ii < move.distance; ii++) {
					const head = rope[0];
					rope[0] = { ...head, y: head.y + modifier };
					knotLoop: for (let index = 1; index < 10; index++) {
						const [prevKnot, currKnot] = [
							rope[index - 1],
							rope[index]
						];
						let newX = currKnot.x, newY = currKnot.y;

						const xDelta = getDistance(currKnot.x, prevKnot.x);
						const yDelta = getDistance(currKnot.y, prevKnot.y);
						if (yDelta > 1 || (yDelta > 0 && xDelta > 1)) {
							// Check for diagonal increases
							if (xDelta > 0) {
								newX += (prevKnot.x - currKnot.x) / xDelta;
							}
							newY += modifier;
							if (index === 9) {
								addTailMark(newX, newY);
							}
							rope[index] = { x: newX, y: newY };
						} else {
							break knotLoop;
						}
					}
				}
				console.log(move, rope);
				break;
			case 'L':
			case 'R':
				for (let ii = 0; ii < move.distance; ii++) {
					const head = rope[0];
					rope[0] = { ...head, x: head.x + modifier };
					knotLoop: for (let index = 1; index < 10; index++) {
						const [prevKnot, currKnot] = [
							rope[index - 1],
							rope[index]
						];
						let newX = currKnot.x, newY = currKnot.y;

						const xDelta = getDistance(currKnot.x, prevKnot.x);
						const yDelta = getDistance(currKnot.y, prevKnot.y);
						if (xDelta > 1 || (xDelta > 0 && yDelta > 1)) {
							// Check for diagonal increases
							if (yDelta > 0) {
								newY += (prevKnot.y - currKnot.y) / yDelta;
							}
							newX += modifier;
							if (index === 9) {
								addTailMark(newX, newY);
							}
							rope[index] = { x: newX, y: newY };
						} else {
							break knotLoop;
						}
					}
				}
				console.log(move, rope);
				break;
			default:
				throw Error(`Unknown direction ${move.direction} `);
		}
		console.log("\n");
	});

	let touchedPoints = 0;
	[...tailPoints.values()].forEach(row => {
		[...row.values()].forEach(cell => {
			touchedPoints += cell === '#' ? 1 : 0;
		})
	});
	console.log(touchedPoints);
});