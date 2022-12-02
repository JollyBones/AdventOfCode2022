import fs from 'fs';
// Rock     = A
// Paper    = B
// Scissors = C

// Lose     = X
// Draw     = Y
// Win      = Z

type Results = {
	[key: string]: {
		[subkey: string]: number
	}
}

const results: Results = {
	'A': {
		'X': 3, // 3 + 0
		'Y': 4, // 1 + 3
		'Z': 8, // 2 + 6
	},
	'B': {
		'X': 1, // 1 + 0
		'Y': 5, // 2 + 3
		'Z': 9, // 3 + 6
	},
	'C': {
		'X': 2, // 2 + 0
		'Y': 6, // 3 + 3
		'Z': 7, // 1 + 6
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