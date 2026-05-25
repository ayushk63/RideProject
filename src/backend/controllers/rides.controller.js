import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Ride } from '../models/rides.model.js';

const createRide = asyncHandler(async (req, res) => {
    const {
        fromText,
        toText,
        fromCoordinates,
        toCoordinates,
        fare
    } = req.body;

    if (
        [fromText, toText, fromCoordinates, toCoordinates, fare].some((field) => !field || field?.trim() === "")
    ) {
        throw new ApiError(401, "All fields are required");
    }

    const ride = await Ride.create({
        fromText,
        toText,
        fromCoordinates,
        toCoordinates,
        fare
    });

    if (!ride) {
        throw new ApiError(500, "Something went wrong while creating the ride");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                ride: ride
            },
            "Ride Created Successfully"
        )
    );
});

const showRides = asyncHandler(async (req, res) => {
    const rides = await Ride.find({ accepted: false });

    if (!rides) {
        throw new ApiError(500, "Something went wrong while finding rides");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                rides: rides
            },
            "Found Rides Successfully"
        )
    );
});

export { 
    createRide,
    showRides
}