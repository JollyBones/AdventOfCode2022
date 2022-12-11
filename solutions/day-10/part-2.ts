import { readInFile } from "../filereader";

readInFile('./inputs/day-10/input.dat', (data) => {
	let cycle = 0;
	let x = 2;
	let crtRow: string[] = Array(40).fill(".");

	const inputs = data.split('\n');

	const printCrtRow = () => {
		console.log(crtRow.join(''));
		crtRow = Array(40).fill(".");
	};

	const getSignalPosition = (): number => (cycle) % 40;

	const isOverlap = (): boolean => [x - 1, x, x + 1].includes(getSignalPosition());

	const addLitPixel = () => {
		crtRow[(cycle - 1) % 40] = "#";
	};

	// ORDER
	//     BEGIN
	//     DRAW
	//     RESET
	//     MOVE

	const processInput = (count: number = 1 | 2) => {
		for (let ii = 0; ii < count; ii++) {
			cycle++;
			if (isOverlap()) {
				addLitPixel();
			}
			if (getSignalPosition() === 0) {
				//		console.log(x);
				printCrtRow();
			}
		}
	}

	inputs.forEach(input => {
		if (input === "noop") {
			processInput(1);
		} else {
			processInput(2);
			x += Number(input.split(' ')[1]);
		}
	});
});