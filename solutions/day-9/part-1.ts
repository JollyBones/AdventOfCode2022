import { readInFile } from "../filereader";

type Direction = 'U' | 'D' | 'R' | 'L';

type Move = {
	direction: Direction
	distance: number,
};

readInFile('./inputs/day-9/test-input.dat', (data) => {
	const orders = data.split('\n');
	let tailPoints: number[][] = [];
	const moves: Move[] = [];

	orders.forEach(order => {
		const [direction, rawDistance] = order.split(' ');
		const distance = Number(rawDistance);
		moves.push({
			direction: direction as Direction,
			distance,
		});
	});

	let tailX = 0, tailY = 0, headX = 0, headY = 0;
	console.log(moves);
});