import { readInFile } from '../filereader';

readInFile('./inputs/day-5/input.dat', (data) => {
	const stacks = new Map<Number, string[]>();
	const rows = data.split("\n");
	const [ setup, commands ] = [
		rows.filter(row => row.includes("[")),
		rows.filter(row => row.includes("move")),
	]
	
	setup.forEach(row => {
		const elements = row.split("").forEach((element, index) => {
			// Find element we care about
			if (element.length > 0 && element !== '[' && element !== ']' && element !== ' ') {
				const relIndex = ((index - 1) / 4) + 1;
				const currStack = stacks.get(relIndex) ?? [];
				stacks.set(relIndex, [
					element,
					...currStack
				]);
			}
		});
	});

	commands.forEach((command, index) => {
		const [ amount, from, to ] = command.split(" ").filter(e => !isNaN(Number(e))).map(e => Number(e));
		const fromStack = stacks.get(from)!;
		const crates = fromStack.slice(-amount)!;
		stacks.set(from, fromStack.slice(0, -amount));

		const toStack = stacks.get(to)!;
		while (crates.length > 0) {
			toStack.push(crates.pop()!);
		}
		stacks.set(to, toStack);
	});
	const keys = [...stacks.keys()].sort();
	const topItems = keys.map(key => stacks.get(key)?.pop());
	console.log(topItems.join(''));
});