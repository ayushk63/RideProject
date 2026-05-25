import { Router } from "express";
import { 
    driverRegister,
    driverLogin
} from "../controllers/driver.controller.js";

const router = Router();

router.route("/register").post(driverRegister);
router.route("/login").post(driverLogin);

export { router as driverRouter }