import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI);

const querySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    query: {
        type: String,
        required: true
    }
});

export const Query = mongoose.model("Query", querySchema);