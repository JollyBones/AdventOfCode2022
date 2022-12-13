import { readInFile } from '../filereader.ts';
import { getPriority } from './utils.ts';

readInFile('./inputs/day-3/input.dat', (data) => {
	let priorities = 0;
	const rucksacks = data.split('\n');
	let index = 0;
	while (index < rucksacks.length) {
		const groupSacks = rucksacks.slice(index, index + 3);
		const [one, two, three] = [
			new Set(groupSacks[0].split('')),
			new Set(groupSacks[1].split('')),
			new Set(groupSacks[2].split('')),
		];

		const commonItem = [...one].find((item) =>
			two.has(item) && three.has(item)
		);
		console.log(`${index}: Found common item ${commonItem}`);
		priorities += getPriority(commonItem!);

		// Increase index
		index += 3;
	}
	console.log(`Priority Sum: ${priorities}`);
});
