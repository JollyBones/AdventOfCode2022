import { readInFile } from '../filereader.ts';

readInFile('./inputs/day-8/input.dat', (data) => {
	// Create grid
	const treeGrid = data.split('\n').map((row) =>
		row.split('').map((tree) => Number(tree))
	);
	const gridWidth = treeGrid[0].length;
	const gridHeight = treeGrid.length;

	const LEFT_EDGE = 0;
	const RIGHT_EDGE = gridWidth - 1;

	let visibleTrees = (2 * gridHeight + 2 * gridWidth) - 4;

	const flattenedGrid = treeGrid.flatMap((tree) => tree);
	// IGNORE EDGES; EDGES ARE ALWAYS VISIBLE;
	for (
		let index = gridWidth + 1;
		index < (gridWidth * (gridHeight - 1));
		index++
	) {
		// Only check elements not on the edges
		if (![0, gridWidth - 1].includes(index % gridWidth)) {
			const tree = flattenedGrid[index];

			// Get left and right candidates
			const leftRowEdge = index - (index % gridWidth);
			const rightRowEdge = leftRowEdge + gridWidth - 1;

			const leftTrees = flattenedGrid.slice(leftRowEdge, index);
			const rightTrees = flattenedGrid.slice(index + 1, rightRowEdge + 1);

			const isHiddenLeft = leftTrees.findIndex((lt) => lt >= tree) > -1;
			const isHiddenRight = rightTrees.findIndex((rt) => rt >= tree) > -1;

			// Get up and down candidates
			const columnIndex = Math.floor(index / gridWidth);
			const rowIndex = index % gridWidth;

			const column = flattenedGrid.filter((_, idx) =>
				idx % gridWidth === rowIndex
			);
			const [top, bottom] = [
				column.slice(0, columnIndex),
				column.slice(columnIndex + 1, column.length),
			];

			const isHiddenTop = top.findIndex((tt) => tt >= tree) > -1;
			const isHiddenBottom = bottom.findIndex((bt) => bt >= tree) > -1;
			if (
				!(isHiddenLeft && isHiddenRight && isHiddenTop &&
					isHiddenBottom)
			) {
				visibleTrees++;
			}
		}
	}
	console.log(visibleTrees);
});
