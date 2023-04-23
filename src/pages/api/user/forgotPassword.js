import connectdb from "@/utils/connectdb";
import UserModel from "@/models/userSchema";

export default async function forgotPassword(req, res) {
    try {
        console.log("Connecting to MongoDB, forgotPassword")
        await connectdb();
        console.log("Connected to MongoDB, forgotPassword")

        const { email } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            return res.send({
                message: "User Found",
                id: user._id
            })
        } else {
            return res.send({ message: "We cannot find your email address" })
        }
    } catch (error) {
        console.log(error)
        return res.send({ message: "We cannot find your email address" })
    }
}