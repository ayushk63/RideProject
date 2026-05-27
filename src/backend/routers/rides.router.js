import { Router } from "express";
import { 
    createRide, 
    showRides, 
    getRide,
    acceptRide,
    deleteRide
} from "../controllers/rides.controller.js";

const router = Router();

router.route("/createride").post(createRide);
router.route("/showrides").get(showRides);
router.route("/getride").get(getRide);
router.route("/acceptride").post(acceptRide);
router.route("/deleteride").post(deleteRide);

export { router as rideRouter }