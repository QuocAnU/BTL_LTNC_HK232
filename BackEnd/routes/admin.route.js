import { Router } from "express";
import { loginAdmin, addAdmin } from "../controllers/admin.controller.js";


const router = Router()

router
    .route("/login")
    .post(loginAdmin)
router.route("/create").post(addAdmin)

export const adminRouter = router;