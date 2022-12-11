import { readInFile } from "../filereader";

readInFile('./inputs/day-10/input.dat', (data) => {
	let cycle = 1;
	let x = 1;

	const signalStrengths: number[] = [];
	const inputs = data.split('\n');

	const emitSignalStrength = () => signalStrengths.push(cycle * x);

	const getSignalPosition = (cycle: number): number => (cycle + 20) % 40;

	inputs.forEach(input => {
		if (input === "noop") {
			cycle++;
			if (getSignalPosition(cycle) === 0) {
				emitSignalStrength()
			}
		} else {
			const value = Number(input.split(' ')[1]);
			const futureSignalPosition = getSignalPosition(cycle + 2);
			if (futureSignalPosition === 1) {
				cycle++;
				emitSignalStrength();
				x += value;
				cycle++;
			} else {
				cycle += 2;
				x += value;
				if (futureSignalPosition === 0) {
					emitSignalStrength();
				}
			}
		}
	});

	console.log(signalStrengths);
	console.log(signalStrengths.reduce((a, b) => a + b, 0));
});