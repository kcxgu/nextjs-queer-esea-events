import connectdb from "@/utils/connectdb";
import NotificationsModel from "@/models/notificationSchema";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            return getUserEmails(req, res);
        }
        case "POST": {
            return notification(req, res);
        }
    }
}


async function getUserEmails(req, res) {
    try {
        console.log("Connecting to MongoDB, getUserEmails")
        await connectdb();
        console.log("Connecting to MongoDB, getUserEmails")

        const users = await NotificationsModel.find({});
        const userEmails = [];

        if (users) {
            users.forEach(element => {
                userEmails.push(element.email)
            });
        }
        return res.send(userEmails)

    } catch (error) {
        res.status(404).json({ error: "Emails not found" })
        console.log(error)
    }
}

async function notification(req, res) {
    try {
        console.log("Connecting to MongoDB, notification")
        await connectdb();
        console.log("Connected to MongoDB, notification")

        const { email } = req.body;

        const data = await NotificationsModel.findOne({ email })
        if (data) {
            res.send({ message: "Email already exists" });
        } else {
            const newEmail = new NotificationsModel(req.body);
            newEmail.save();
            res.send({ message: "Success!" })
        }
    } catch (error) {
        console.log(error)
    }
}