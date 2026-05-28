import { Router } from "express";
import { 
    driverRegister,
    driverLogin,
    driverLogout,
    updateName,
    updatePassword
} from "../controllers/driver.controller.js";
import { verifyJWTDriver } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/register").post(driverRegister);
router.route("/login").post(driverLogin);
router.route("/logout").post(verifyJWTDriver, driverLogout);
router.route("/updatename").post(updateName);
router.route("/updatepassword").post(updatePassword);

export { router as driverRouter }