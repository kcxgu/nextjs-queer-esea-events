import connectdb from "@/utils/connectdb";
import UserModel from "@/models/userSchema";

export default async function resetPassword(req, res) {
    try {
        console.log("Connecting to MongoDB, resetPassword");
        await connectdb();
        console.log("Connected to MongoDB, resetPassword");

        const { id, password } = req.body;

        let doc = await UserModel.findOne({ _id: id });

        doc.password = password;
        await doc.save();

        return res.send({ message: "Success!" })

    } catch (error) {
        console.log(error)
        return res.send({ message: "We are unable to update your password at this time" })
    }
}