import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
	#database = {};

	constructor() {
		fs.readFile(databasePath, 'utf8')
			.then(data => this.#database = JSON.parse(data))
			.catch(() => this.#persist());
	}

	#persist() {
		fs.writeFile(databasePath, JSON.stringify(this.#database));
	}

	select(tableName) {
		return this.#database[tableName] ?? [];
	}

	insert(tableName, data) {
		if (Array.isArray(this.#database[tableName])) {
			this.#database[tableName].push(data);
		} else {
			this.#database[tableName] = [data];
		}
		this.#persist();
		return data;
	}
}