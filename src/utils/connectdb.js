import mongoose from "mongoose";

const connectdb = async () => {
    await mongoose.connect(process.env.DB_URI);
}

export default connectdb;