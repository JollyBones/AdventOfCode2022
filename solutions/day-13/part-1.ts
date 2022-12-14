import { readInFile } from '../filereader.ts';

const SKIP_REGEX = /([,\]])/g;

function isRightOrder(leftString: string, rightString: string): boolean {
	const [ left, right ] = [
		leftString.charAt(0),
		rightString.charAt(0),
	];

	// Same character? Move on.
	if (left === right) {
		return isRightOrder(
			leftString.substring(1),
			rightString.substring(1)
		);
	}

	// Compare numbers first
	const leftNumber = Number(left);
	const rightNumber = Number(right);

	if (!isNaN(leftNumber) && !isNaN(rightNumber)) {
		if (leftNumber === rightNumber) {
			return isRightOrder(
				leftString.substring(1),
				rightString.substring(1)
			)
		}
		return leftNumber < rightNumber;
	}

	// Check different list starts
	if (left === "[") {
		if (right === "]") {
			return false;
		}

		// Left list ran out first.
		if (right === ",") {
			return true;
		}

		if (!isNaN(rightNumber)) {
			const newRight = right + "]" + rightString.substring(1);
			return isRightOrder(
				leftString.substring(1),
				newRight,
			);
		}
	}

	if (right === "[") {
		if (left === "]") {
			return true;
		}

		// Right list ran out first.
		if (left === ",") {
			return false;
		}
		
		if (!isNaN(leftNumber)) {
			const newLeft = left + "]" + leftString.substring(1);
			return isRightOrder(
				newLeft,
				rightString.substring(1),
			);
		}
	}

	if (left === ',') {
		if (right === ']') {
			return false;
		}
	}

	if (right === ',') {
		if (left === ']') {
			return true;
		}
	}

	if (left === ']') {
		if (!isNaN(rightNumber)) {
			return true;
		}
	}

	if (right === ']') {
		if (!isNaN(leftNumber)) {
			return false;
		}
	}

	throw Error(`Unable to match pairs ${left}, ${right}`);
}

readInFile('./inputs/day-13/input.dat', (data) => {
	const pairs = data.split("\n\n");
	const rightOrder: number[] = [];
	pairs.forEach((pair, index) => {
		const [left, right] = pair.split("\n");
		const res = isRightOrder(left, right);

		console.log(left, right, index + 1, res);

		if (res) {
			rightOrder.push(index + 1);
		}
	});

	console.log(`Right indices: ${rightOrder}: ${rightOrder.reduce((a, b) => a + b, 0)}`);
});