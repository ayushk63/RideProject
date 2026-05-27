import { Router } from "express";
import { 
    createRide, 
    showRides, 
    getRide,
    acceptRide
} from "../controllers/rides.controller.js";

const router = Router();

router.route("/createride").post(createRide);
router.route("/showrides").get(showRides);
router.route("/getride").get(getRide);
router.route("/acceptride").post(acceptRide);

export { router as rideRouter }