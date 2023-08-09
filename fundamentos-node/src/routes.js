import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/route-path.js";

const database = new Database();
export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/users"),
        handler: (req, res) => {
            const { search } = req.query;

            const searchQuery = search ? {
                name: search,
                email: search
            } : null;

            const users = database.select('users', searchQuery);
            return res.end(JSON.stringify(users));
        }
    },
    {
        method: "POST",
        path: buildRoutePath("/users"),
        handler: (req, res) => {
            const { name, email } = req.body;
            const user = {
                id: randomUUID(),
                name,
                email
            }

            database.insert('users', user);

            return res.writeHead(201).end();
        }
    },
    {
        method: "DELETE",
        path: buildRoutePath("/users/:id"),
        handler: (req, res) => {
            const { id } = req.params;
            const status = database.delete('users', id);

            return res.writeHead(status).end();
        }
    },
    {
        method: "PUT",
        path: buildRoutePath("/users/:id"),
        handler: (req, res) => {
            const { id } = req.params;
            const { name, email } = req.body;
            database.update('users', id, { name, email });

            return res.writeHead(204).end();
        }
    }
]