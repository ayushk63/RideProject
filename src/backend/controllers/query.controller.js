import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Query } from "../models/queries.model.js";

const createQuery = asyncHandler(async (req, res) => {
    const { name, email, query } = req.body;

    if (
        [name, email, query].some((field) => !field || field?.trim() === "")
    ) {
        throw new ApiError(401, "All fields are required");
    }

    const query = await Query.create({
        name,
        email, 
        query
    });

    if (!query) {
        throw new ApiError(404, "Something went wrong while submitting the query");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Query Submitted Successfully"
        )
    );
});

export { createQuery }