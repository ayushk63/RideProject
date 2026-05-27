import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh tokens");
    }
}

const userRegister = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;

    if (
        [name, username, email, password].some((field) => !field || field?.trim() === '')
    ) {
        throw new ApiError(401, "All fields are required");
    }

    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    });

    if (existingUser) {
        throw new ApiError(400, "User Already Exists with the given username or email");
    }

    const user = await User.create({
        name,
        username, 
        email,
        password
    });

    if (!user) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                createdUser: createdUser
            },
            "User Registered Successfully"
        )
    );
});

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || email?.trim() === '') {
        throw new ApiError(401, "Email empty or undefined");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = user.isPasswordCorrect(password);
    
    if (!isPasswordValid) {
        throw new ApiError(409, "Incorrect Password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

    const options = {
        secure: true,
        httpOnly: true,
        sameSite: 'none'
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser
            },
            "User logged in successfully"
        )
    )
});

const userLogout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
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
        sameSite: 'none',
        httpOnly: true,
        secure: true
    };

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User Logged Out Successfully"
        )
    );
});

export { userRegister, userLogin, userLogout }