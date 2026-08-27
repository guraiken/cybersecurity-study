import 'dotenv/config'; 

const PORT =  process.env.PORT ?? 3000;
const DB_HOST= process.env.DB_HOST ?? "localhost"
const DB_USER= process.env.DB_USER ?? "root"
const DB_PASS= process.env.DB_PASS ?? "senai"
const DB_NAME= process.env.DB_NAME ?? "desi_20251"

export {PORT, DB_HOST, DB_USER, DB_PASS, DB_NAME}

