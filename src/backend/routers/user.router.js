import { Router } from "express";
import { 
    userRegister, 
    userLogin,
    userLogout,
    updateName,
    updatePassword
} from "../controllers/user.controller.js";
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/register").post(userRegister);
router.route('/login').post(userLogin);
router.route('/logout').post(verifyJWT, userLogout);
router.route("/updatename").post(updateName);
router.route("/updatepassword").post(updatePassword);

export { router as userRouter }