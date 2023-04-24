import connectdb from "@/utils/connectdb";
import UserModel from "@/models/userSchema";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            return getUser(req, res);
        }
        case "POST": {
            return addUser(req, res);
        }
    }
}

// async function getUser(req, res) {
//     try {
//         console.log("Connecting to MongoDB")
//         await connectdb();
//         console.log("Connected to MongoDB")

//         const user = await UserModel.find({});
//         res.json(user);
//     } catch (error) {
//         res.status(404).json({ error: "User not found" })
//         console.log(error)
//     }
// }

async function addUser(req, res) {
    try {
        console.log("Connecting to MongoDB, sign up")
        await connectdb();
        console.log("Connected to MongoDB, sign up")

        const { email } = req.body;
        const data = await UserModel.findOne({ email })
        if (data) {
            res.send({ message: "Account already exists" });
        } else {
            const newUser = new UserModel(req.body);
            newUser.save();
            res.send({ message: "Success!" })
        }
    } catch (error) {
        res.send({ message: "We are unable to register you at this time, please try again later." })
        console.log(error)
    }
}