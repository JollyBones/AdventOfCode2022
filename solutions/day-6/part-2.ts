import { readInFile } from '../filereader';

readInFile('./inputs/day-6/input.dat', (data) => {
	const WINDOW_SIZE = 14;
	let index = 0;
	let startOfPacket = -1;
	console.log(data.length);
	while (startOfPacket < 0) {
		const substring = data.slice(index, index + WINDOW_SIZE);
		if (new Set(substring).size === WINDOW_SIZE) {
			startOfPacket = index + WINDOW_SIZE;
		} else {
			index++;
		}
	}
	console.log(startOfPacket)
});