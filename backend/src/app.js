import e from "express";
import cors from "cors"
import router from "./routes/router.js";

const app = e()

app.use(e.json())
app.use(cors())
app.use(router)


export default app

