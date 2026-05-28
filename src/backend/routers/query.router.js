import { Router } from "express";
import { createQuery } from "../controllers/query.controller.js";

const router = Router();

router.route("/createquery").post(createQuery);

export { router as queryRouter }