import { readInFile } from '../filereader.ts';

type File = {
	name: string,
	size: number,
};

type DirectorySizes = {
	name: string,
	size: number
}
class Directory {
	name: string;
	private files: File[];
	private directories: Directory[];

	constructor(name: string) {
		this.name = name;
		this.files = [];
		this.directories = [];
	}

	public addFile(name: string, size: number) {
		this.files.push({name, size});
	}

	public addDirectory(d: Directory) {
		this.directories.push(d);
	}

	public getOrCreateDirectory(name: string): Directory {
		let dir = this.directories.find(dir => dir.name === name);
		if (!dir) {
			dir = new Directory(name);
			this.directories.push(dir);
		}
		return dir;
	}

	public getFiles() : File[] { return this.files; };
	public getDirectories() : Directory[] { return this.directories; };
}

const addFilesToDirectory = (dir: Directory, trace: string[], index: number): number => {
	let listedDir = false;
	while (!listedDir && index < trace.length) {
		const [size, name] = trace[index].split(' ');
		if (size === "$") {
			listedDir = true;
		} else {
			if (size !== 'dir') {
				dir.addFile(name, Number(size));
			}
			index++;
		}
	}
	return index;
}

const processCommands = (dir: Directory, trace: string[], index: number): number => {
	let shouldProcess = true;
	while (shouldProcess && index < trace.length) {
		const line = trace[index];
		if (line === '$ ls') {
			index = addFilesToDirectory(dir, trace, index + 1);
		} else {
			const [ _, command, target ] = line.split(' ');
			if (target === '..') {
				shouldProcess = false;
				index++;
			} else if (target === '/' && dir.name !== '/') {
				shouldProcess = false;
				// DON'T UPDATE INDEX!!!
			} else {
				const subDir = dir.getOrCreateDirectory(target);
				index = processCommands(subDir, trace, index + 1);
			}
		}
	}
	return index;
}

const getDirectorySizes = (dir: Directory): DirectorySizes[] =>  {
	const fileSize = dir.getFiles().map(file => file.size).reduce((a, b) => a + b, 0);
	const subDirsSizes = dir.getDirectories().map(subDir => getDirectorySizes(subDir)).reduce((a, b) => [...a, ...b], []);
	return [
		{
			name: dir.name,
			size: fileSize + subDirsSizes.map(sdr => sdr.size).reduce((a,b) => a + b, 0),
		},
		...subDirsSizes
	];
}

readInFile('./inputs/day-7/input.dat', (data) => {
	const trace = data.split('\n');

	// First command is always create a root dir. Start from there.
	const rootDir = new Directory("/");
	let index = 1;

	// Process commands
	processCommands(rootDir, trace, index);

	// Get sizes
	const directories = getDirectorySizes(rootDir);
	const size = directories.filter(size => size.size < 100_000).map(dir => dir.size).reduce((a, b) => a + b, 0);
	console.log(size);
});