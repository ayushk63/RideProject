import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Driver } from "../models/driver.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized Request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
});

const verifyJWTDriver = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized Request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const driver = await Driver.findById(decodedToken._id).select("-password -refreshToken");

    if (!driver) {
        throw new ApiError(401, "Invalid Access Token");
    }

    req.driver = driver;
    next();
});

export { verifyJWT, verifyJWTDriver }