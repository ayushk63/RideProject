import { Driver } from "../models/driver.model.js";
import { driverRouter } from "../routers/driver.router.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshTokens = async (driverId) => {
    try {
        const driver = await Driver.findById(driverId);
        const accessToken = driver.generateAccessToken();
        const refreshToken = driver.generateRefreshToken();

        driver.refreshToken = refreshToken;
        driver.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh tokens");
    }
}

const driverRegister = asyncHandler(async(req, res) => {
    const { name, username, email, password, vehicleName, vehicleNumber, vehicleType } = req.body;

    if (
        [name, username, email, password, vehicleName, vehicleNumber, vehicleType]
        .some((field) => !field || field?.trim() === '')
    ) {
        throw new ApiError(401, "All fields are required");
    }

    const existingDriver = await Driver.findOne({
        $or: [{username}, {email}, {vehicleNumber}]
    });

    if (existingDriver) {
        throw new ApiError(400, "Driver with the given username, email or vehicle number already exists");
    }

    const driver = await Driver.create({
        name,
        username,
        email,
        password,
        vehicleName,
        vehicleNumber,
        vehicleType
    });

    if (!driver) {
        throw new ApiError(500, "Something went wrong while registering the driver");
    }

    const createdDriver = await Driver.findById(driver._id).select("-password -refreshToken");

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                createdDriver: createdDriver
            },
            "Driver Registered Successfully"
        )
    );
});

const driverLogin = asyncHandler(async(req, res) => {
    const { email } = req.body;

    if (!email || email?.trim === '') {
        throw new ApiError(401, "Email empty or undefined");
    }

    const driver = await Driver.findOne({ email });

    if (!driver) {
        throw new ApiError(404, "Driver does not exist");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(driver._id);

    const loggedInDriver = await Driver.findById(driver._id).select('-password -refreshToken');

    const options = {
        sameSite: 'lax',
        secure: false,
        httpOnly: true
    };

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                driver: loggedInDriver
            },
            "Driver logged in successfully"
        )
    );
});

const driverLogout = asyncHandler(async (req, res) => {
    await Driver.findByIdAndUpdate(
        req.driver._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    );

    const options = {
        sameSite: 'lax',
        httpOnly: true,
        secure: false
    };

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "Driver Logged Out Successfully"
        )
    );
});

export { driverRegister, driverLogin, driverLogout }