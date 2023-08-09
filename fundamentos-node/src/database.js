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

	select(tableName, search) {
		const data = this.#database[tableName] ?? []

		if (search) {
			return data.filter(row => Object.entries(search).some(([key, value]) => {
				return row[key].toLowerCase().includes(value.toLowerCase())
			}));
		}

		return data;
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

	delete(tableName, id) {
		const rowIndex = this.#database[tableName].findIndex(row => row.id === id);

		if (rowIndex > -1) {
			this.#database[tableName].splice(rowIndex, 1);
			this.#persist();
		}

		return rowIndex > -1 ? 204 : 404;

	}

	update(tableName, id, data) {
		const rowIndex = this.#database[tableName].findIndex(row => row.id === id);

		if (rowIndex > -1) {
			this.#database[tableName][rowIndex] = { id, ...data };
			this.#persist();
		}
	}


}