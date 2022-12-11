import { readInFile } from "../filereader";
type Monkey = {
	inspectionCount: number;
	items: number[];
	test: (item: number) => number;
	operation: (item: number) => number;
};

const NUMBER_PATTERN = /\d+/g;

const reduceItemWorry = (item: number): number => Math.floor(item / 3);

readInFile('./inputs/day-11/input.dat', (data) => {
	const setup = data.split('\n\n');
	let monkeys: Monkey[] = []

	// Setup monkeys
	setup.forEach(entry => {
		const rules = entry.split('\n');
		const position = Number(rules[0].match(NUMBER_PATTERN)![0]);
		const items = rules[1].match(NUMBER_PATTERN)?.map(item => Number(item)) ?? [];

		// Operation
		const equation = rules[2].split('=')[1];
		const [_, leftHand, operand, rightHand] = equation.split(' ');

		// Test values
		const testvalue = Number(rules[3].match(NUMBER_PATTERN)![0]);
		const trueTestMonkey = Number(rules[4].match(NUMBER_PATTERN)![0]);
		const falseTestMonkey = Number(rules[5].match(NUMBER_PATTERN)![0]);

		console.log(testvalue, trueTestMonkey, falseTestMonkey);

		monkeys[position] = {
			inspectionCount: 0,
			items,
			test: (item: number) => item % testvalue === 0 ? trueTestMonkey : falseTestMonkey,
			operation: (item: number) => {
				const left = leftHand === 'old' ? item : Number(leftHand);
				const right = rightHand === 'old' ? item : Number(rightHand);
				return Number(eval(`${left} ${operand} ${right}`));
			}
		}
	});
	// Allow monkeys to throw to each other;
	let round = 0;
	while (round < 20) {
		for (let ii = 0; ii < monkeys.length; ii++) {
			const monkey = monkeys[ii];
			const { inspectionCount, test, operation, items } = monkey;

			items.forEach(item => {
				const newItem = reduceItemWorry(operation(item));
				const targetMonkey = test(newItem);
				monkeys[targetMonkey] = {
					...monkeys[targetMonkey],
					items: [
						...monkeys[targetMonkey].items,
						newItem,
					]
				};
			})

			monkeys[ii] = {
				...monkey,
				inspectionCount: inspectionCount + items.length,
				items: [],
			}
		}
		round++;
		console.log(monkeys.map(m => m.inspectionCount).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b, 1));
	}
});