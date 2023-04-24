import connectdb from "@/utils/connectdb";
import UserModel from "@/models/userSchema";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            return getUsers(req, res);
        }
        case "POST": {
            return findUser(req, res);
        }
    }
}

async function getUsers(req, res) {
    try {
        await connectdb();

        const user = await UserModel.find({});
        const info = []
        if (user) {
            user.forEach(element => {
                info.push({
                    id: element._id,
                    email: element.email,
                    name: element.name,
                    website: element.website,
                    socialMedia: element.socialMedia
                })
            });
            return res.send(info)
        }
    } catch (error) {
        res.status(404).json({ error: "User not found" })
        console.log(error)
    }
}

async function findUser(req, res) {
    try {
        await connectdb();

        const { id } = req.body;
        const user = await UserModel.findOne({ id })

        if (user) {
            res.send({
                id: user._id,
                email: user.email,
                name: user.name,
                website: user.website,
                socialMedia: user.socialMedia,
            })
        }

    } catch (error) {
        res.send({ message: "We are unable to register you at this time, please try again later." })
        console.log(error)
    }
}