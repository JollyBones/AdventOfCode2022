import fs from 'fs';

export const readInFile = (fileName: string, callback: (data: string) => void) => {
	fs.readFile(fileName, 'utf-8', (err, data) => {
		if (err) {
			throw Error(`Unable to read file ${fileName}: ${err}`);
		}
		callback(data);
	})
};