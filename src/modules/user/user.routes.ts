import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const ctrl = new UserController();

router.post("/register", ctrl.register.bind(ctrl));
router.post("/login", ctrl.login.bind(ctrl));
router.get("/profile", authMiddleware, ctrl.getProfile.bind(ctrl));

export default router;
