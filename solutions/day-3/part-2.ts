import fs from 'fs';
import { getPriority } from './part-1';

fs.readFile('./inputs/day-3/input.dat', 'utf-8', (err, data) => {
	let priorities = 0;
	const rucksacks = data.split("\n");
	let index = 0;
	while (index < rucksacks.length) {
		const groupSacks = rucksacks.slice(index, index + 3);
		const [ one, two, three ] = [
			new Set(groupSacks[0].split("")),
			new Set(groupSacks[1].split("")),
			new Set(groupSacks[2].split(""))
		];

		one.forEach((item) => {
			if (two.has(item) && three.has(item)) {
				console.log(`${index}: Found common item ${item}`);
				priorities += getPriority(item);
			}
		});
		// Increase index
		index += 3;
	};
	console.log(`Priority Sum: ${priorities}`);
});