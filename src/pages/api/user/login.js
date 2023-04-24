import connectdb from "@/utils/connectdb";
import UserModel from "@/models/userSchema";

export default async function login(req, res) {
    try {
        console.log("Connecting to MongoDB, login")
        await connectdb();
        console.log("Connected to MongoDB, login")

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email })
        if (user) {
            user.comparePassword(password, function (matchError, isMatch) {
                if (matchError) {
                    return res.send({ message: "Incorrect email or password" })
                } else if (!isMatch) {
                    return res.send({ message: "Incorrect email or password" })
                } else {
                    return res.send({
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        website: user.website,
                        socialMedia: user.socialMedia,
                    })
                }
            })
            res.status(201)
        } else {
            return res.send({ message: "Incorrect email or password" })
        }
    } catch (error) {
        console.log(error)
        return res.send({ message: "We are experiencing a server error, please try again later" })
    }
}