import e from "express"
import { userController } from "../controller/userController.js"

const router = e.Router();

router.post('/create', userController.createUser)

export default router