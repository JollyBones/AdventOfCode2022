import fs from 'fs';
// Rock     = A, X
// Paper    = B, Y
// Scissors = C, Z

type Results = {
	[key: string]: {
		[subkey: string]: number
	}
}

const results: Results = {
	'A': {
		'X': 4, // 1 + 3
		'Y': 8, // 2 + 6
		'Z': 3, // 3 + 0
	},
	'B': {
		'X': 1, // 1 + 0
		'Y': 5, // 2 + 3
		'Z': 9, // 3 + 6
	},
	'C': {
		'X': 7, // 1 + 6
		'Y': 2, // 2 + 0
		'Z': 6, // 3 + 3
	}
};

fs.readFile('./inputs/day-2/input.dat', 'utf-8', (err, data) => {
	let score = 0;
	const rows = data.toUpperCase().split("\n");

	rows.forEach(row => {
		const [ player1, player2 ] = row.split(" ");
		const result = results[player1][player2];
		console.log(player1, player2, result);
		score += result
	});

	console.log(score);
})