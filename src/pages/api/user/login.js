import connectdb from "@/utils/connectdb";
import UserModel from "@/models/userSchema";

export default async function login(req, res) {
    try {
        console.log("Connecting to MongoDB")
        await connectdb();
        console.log("Connected to MongoDB")

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email })
        if (user && password === user.password) {
            return res.send({ user })
        } else {
            return res.send({ message: "Incorrect email or password" })
        }
    } catch (error) {
        console.log(error)
        return res.send({ message: "We are experiencing a server error, please try again later" })
    }
}