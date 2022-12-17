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
	const packets = data.split("\n").filter(line => line.length > 0);
	const DIVIDERS = ["[[2]]", "[[6]]"]
	packets.push(...DIVIDERS);

	const sorted = packets.sort((leftStr, rightStr) => {
		const [left, right] = [
			JSON.parse(leftStr),
			JSON.parse(rightStr),
		];
		return compare(right, left);
	});

	const indexes = DIVIDERS.map(divider => (sorted.findIndex(s => s === divider) + 1));
	console.log(indexes.reduce((a, b) => a * b, 1));
});