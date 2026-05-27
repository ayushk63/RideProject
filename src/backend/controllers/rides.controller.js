import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Ride } from '../models/rides.model.js';
import { Driver } from "../models/driver.model.js";

const createRide = asyncHandler(async (req, res) => {
    const {
        fromText,
        toText,
        fromCoordinates,
        toCoordinates,
        fare
    } = req.body;

    if (
        [fromText, toText, fromCoordinates, toCoordinates, fare].some((field) => !field)
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

const getRide = asyncHandler(async (req, res) => {
    const { rideId } = req.query;

    if (!rideId) {
        throw new ApiError(401, "Undefined Ride Id");
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
        throw new ApiError(404, "Ride Not Found");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                ride: ride
            },
            "Ride Found Successfully"
        )
    );
});

const acceptRide = asyncHandler(async () => {
    const { driverUsername, rideId } = req.body;

    if (
        [driverUsername, rideId].some((field) => !field || field?.trim() === "")
    ) {
        throw new ApiError(401, "Driver Username or Ride Id Undefined or Empty");
    }

    const driver = await Driver.findOne({ username: driverUsername });

    if (!driver) {
        throw new ApiError(404, "Driver Not Found");
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
        throw new ApiError(404, "Ride Not Found");
    }

    const updatedRide = await Ride.findByIdAndUpdate(
        ride._id,
        {
            $set: {
                driver: driver,
                accepted: true
            }
        },
        {
            new: true
        }
    );

    if (!updatedRide) {
        throw new ApiError(500, "Something went wrong while updating the ride");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                updatedRide: updatedRide,
            },
            "Ride Accepted Successfully"
        )
    );
});

export { 
    createRide,
    showRides,
    getRide,
    acceptRide
}