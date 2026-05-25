import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/RideProject");

const rideSchema = mongoose.Schema({
    fromText: {
        type: String,
        required: true
    },
    toText: {
        type: String,
        required: true
    },
    fromCoordinates: {
        type: Array,
        required: true
    },
    toCoordinates: {
        type: Array,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    driverName: {
        type: String
    },
    accepted: {
        type: Boolean,
        required: true,
        default: false
    },
    numRejected: {
        type: Number,
        required: true,
        default: 0
    }
});

export const Ride = await mongoose.model("Ride", rideSchema);