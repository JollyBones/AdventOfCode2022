import { readInFile } from "../filereader";

type Direction = 'U' | 'D' | 'R' | 'L';

type Move = {
	direction: Direction
	distance: number,
};

readInFile('./inputs/day-9/input.dat', (data) => {
	const orders = data.split('\n');
	// There are negative moves
	let tailPoints: Map<number, Map<number, string>> = new Map();
	const moves: Move[] = [];
	let maxXDistance = 0, minXDistance = 0, maxYDistance = 0, minYDistance = 0;

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

	let tailX = 0, tailY = 0, headX = 0, headY = 0;

	moves.forEach(move => {
		const modifier = ['L', 'D'].includes(move.direction) ? -1 : 1;
		switch (move.direction) {
			case 'U':
			case 'D':
				// Vertical
				for (let ii = 0; ii < move.distance; ii++) {
					headY += modifier;
					if (getDistance(headY, tailY) > 1) {
						// Check for diagonal increases
						if (getDistance(headX, tailX) > 0) {
							tailX += (headX - tailX);
						}
						tailY += modifier;

						addTailMark(tailX, tailY);

						if (tailY > maxYDistance) {
							maxYDistance = tailY;
						} else if (tailY < minYDistance) {
							minYDistance = tailY;
						}
					}
				}
				break;
			case 'L':
			case 'R':
				for (let ii = 0; ii < move.distance; ii++) {
					headX += modifier;
					if (getDistance(headX, tailX) > 1) {
						// Check for diagonal increases
						if (getDistance(headY, tailY) > 0) {
							tailY += (headY - tailY);
						}
						tailX += modifier;
						addTailMark(tailX, tailY);
						if (tailX > maxXDistance) {
							maxXDistance = tailX;
						} else if (tailX < minXDistance) {
							minXDistance = tailX;
						}
					}
				}
				break;
			default:
				throw Error(`Unknown direction ${move.direction}`);
		}
	});

	let touchedPoints = 0;
	let printString = "";

	for (let y = maxYDistance + 1; y >= minYDistance - 1; y--) {
		for (let x = minXDistance - 1; x <= maxXDistance + 1; x++) {
			const cell = (tailPoints.get(y)?.get(x)) ?? '.';
			touchedPoints += cell === '#' ? 1 : 0;
			printString += cell;
		}
		printString += "\n";
	}

	console.log(printString);
	console.log(touchedPoints);
});