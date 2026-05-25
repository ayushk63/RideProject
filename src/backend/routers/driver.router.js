import { Router } from "express";
import { 
    driverRegister,
    driverLogin,
    driverLogout
} from "../controllers/driver.controller.js";
import { verifyJWTDriver } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/register").post(driverRegister);
router.route("/login").post(driverLogin);
router.route("/logout").post(verifyJWTDriver, driverLogout);

export { router as driverRouter }