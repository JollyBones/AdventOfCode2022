import { readInFile } from '../filereader.ts';

const VALVE_REGEX = /([A-Z]){2}/g;

type Tunnel = {
	name: string;
	distance: number;
}

type Valve = {
	flowRate: number;
	shortestPaths: Tunnel[];
};

function getInitialMap(valves: string[]): Map<string, Valve> {
	const network = new Map<string, Valve>();

	valves.forEach(row => {
		const [ valve, paths ] = row.split(';');
		const currValve = valve.match(VALVE_REGEX)![0];
		const flowRate = Number(valve.match(/\d+/g)![0]);
		
		const connections: Tunnel[] = paths.match(VALVE_REGEX)!.map(path => {
			return {
				name: path,
				distance: 1,
			}
		});

		network.set(currValve, {
			flowRate,
			shortestPaths: connections,
		});
	});

	return network;
}

readInFile('./inputs/day-16/test-input.dat', (data) => {
	const valves = data.split("\n");
	const network = getInitialMap(valves);

	const allValves = [...network.keys()];
	console.log(allValves);
});