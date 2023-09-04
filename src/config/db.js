// db connection
import mongoose from "mongoose";

export const dbCon = async (dbUri) => {
    await mongoose.connect(dbUri);
    return "db connected";
};
