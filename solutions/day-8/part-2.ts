import { readInFile } from '../filereader';

readInFile('./inputs/day-8/input.dat', (data) => {
	// Create grid
	const treeGrid = data.split('\n').map(row => row.split('').map(tree => Number(tree)));
	const gridWidth = treeGrid[0].length;
	const gridHeight = treeGrid.length;

	const LEFT_EDGE = 0;
	const RIGHT_EDGE = gridWidth - 1;

	let maxScenicScore = -1;


	const flattenedGrid = treeGrid.flatMap(tree => tree);
	// IGNORE EDGES; EDGES ARE ALWAYS VISIBLE;
	for (let index = gridWidth + 1; index < (gridWidth * (gridHeight - 1)); index++) {
		// Only check elements not on the edges
		if (![0,gridWidth - 1].includes(index % gridWidth)) {
			const tree = flattenedGrid[index];

			// Get left and right candidates
			const leftRowEdge = index - (index % gridWidth);
			const rightRowEdge = leftRowEdge + gridWidth - 1;
		
			const leftTrees = flattenedGrid.slice(leftRowEdge, index).reverse();
			const rightTrees = flattenedGrid.slice(index + 1, rightRowEdge + 1);

			const leftBlockedIndex = leftTrees.findIndex(lt => lt >= tree);
			const rightBlockedIndex = rightTrees.findIndex(rt => rt >= tree);

			const left = leftBlockedIndex === -1 ? leftTrees.length : leftBlockedIndex + 1;
			const right = rightBlockedIndex === -1 ? rightTrees.length : rightBlockedIndex + 1;

			// Get up and down candidates
			const columnIndex = Math.floor(index/gridWidth);
			const rowIndex = index % gridWidth;

			const column = flattenedGrid.filter((_, idx) => idx % gridWidth === rowIndex);
			const [ topTrees, bottomTrees ] = [
				column.slice(0, columnIndex).reverse(),
				column.slice(columnIndex + 1, column.length)
			];

			const topBlockedIndex = topTrees.findIndex(tt => tt >= tree);
			const bottomBlockedIndex = bottomTrees.findIndex(bt => bt >= tree);

			const top = topBlockedIndex === -1 ? topTrees.length : topBlockedIndex + 1;
			const bottom = bottomBlockedIndex === -1 ? bottomTrees.length : bottomBlockedIndex + 1;

			const scenicScore = left * right * bottom * top;
			if (scenicScore > maxScenicScore) {
				maxScenicScore = scenicScore;
			}
		}
	}
	console.log(maxScenicScore);
});