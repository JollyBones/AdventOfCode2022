import { readInFile } from '../filereader';
import { getPriority } from './utils';
// a = 1, b = ....
// A = 27, B = ....

readInFile('./inputs/day-3/input.dat', (data) => {
	let priorities = 0;
	const rucksacks = data.split("\n");
	console.log('A'.charCodeAt(0), 'a'.charCodeAt(0));
	rucksacks.forEach((rucksack, index) => {
		const items = rucksack.split("");
		const size = rucksack.length;
		const [ one, two ] = [
			new Set(items.slice(0, size / 2)),
			new Set(items.slice(size / 2))
		];
		two.forEach(item => {
			if (one.has(item)) {
				console.log(`${index}: Matching item ${item}`);
				priorities += getPriority(item);
			}
		})
	});
	console.log(`Final Sum: ${priorities}`);
});