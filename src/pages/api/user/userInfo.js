import connectdb from "@/utils/connectdb";
import UserModel from "@/models/userSchema";

export default async function findUser(req, res) {
    try {
        await connectdb();

        const { id } = req.body;
        const user = await UserModel.findOne({ _id: id })

        if (user) {
            return res.send({
                id: user._id,
                email: user.email,
                name: user.name,
                website: user.website,
                socialMedia: user.socialMedia,
            })
        }

    } catch (error) {
        console.log(error);
        return res.json({ message: "Cannot find user." });
    }
}