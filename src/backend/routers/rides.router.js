import { Router } from "express";
import { createRide, showRides } from "../controllers/rides.controller.js";

const router = Router();

router.route("/createride").post(createRide);
router.route("/showrides").get(showRides);

export { router as rideRouter }