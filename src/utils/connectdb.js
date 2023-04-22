import mongoose from "mongoose";

const connectdb = async () => {
    mongoose.connect(process.env.DB_URI);
}

export default connectdb;