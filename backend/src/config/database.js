import { createPool } from "mysql2/promise.js";
import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from "./config.js";

const db = createPool({
    host: DB_HOST,
    user: DB_USER, 
    password: DB_PASS,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default db