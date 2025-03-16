import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
        console.log("DB connected");
    } catch (error) {
        console.log("Connection failed")
    }
}