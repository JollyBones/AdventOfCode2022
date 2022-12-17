import { readInFile } from '../filereader.ts';

type DeepArray = number | number[] | DeepArray[];

function compare(left: DeepArray, right: DeepArray): number {
	if (Number.isFinite(left) && Number.isFinite(right)) {
		if (left > right) return -1;
		if (left < right) return 1;
	} else if (Number.isFinite(left)) return compare([left], right);
	else if (Number.isFinite(right)) return compare(left, [right]);
	else {
		if (!left) return 1;
		if (!right) return -1;
		const leftArr = left as number[];
		const rightArr = right as number[];

		const maxLength = Math.max(leftArr.length, rightArr.length);
		for (let ii = 0; ii < maxLength; ii++) {
			const comp = compare(leftArr[ii], rightArr[ii]);
			if (comp !== 0) return comp;
		}

		if (leftArr.length < rightArr.length) return 1;
		if (leftArr.length > rightArr.length) return -1;
	}
	return 0;
}

readInFile('./inputs/day-13/input.dat', (data) => {
	const pairs = data.split("\n\n");
	const rightOrder: number[] = [];
	pairs.forEach((pair, index) => {
		const [left, right] = pair.split("\n").map(pair => JSON.parse(pair));
		const comp = compare(left, right);
		if (comp > 0) rightOrder.push(index + 1);
	});

	console.log(`Correct indices: ${rightOrder}: ${rightOrder.reduce((a, b) => a + b, 0)}`);
});