import connectdb from "@/utils/connectdb";
import NotificationsModel from "@/models/notificationSchema";

export default async function getUserEmails(req, res) {
    try {
        console.log("Connecting to MongoDB, getUserEmails")
        await connectdb();
        console.log("Connecting to MongoDB, getUserEmails")

        const { country, city } = req.body

        const users = await NotificationsModel.find({
            country: country,
            $or: [{ city: city }, { city: "" }]
        });

        const userEmails = [];

        if (users) {
            users.forEach(user => {
                userEmails.push(user.email)
            });
        }

        return res.send(userEmails)

    } catch (error) {
        res.status(404).json({ error: "Emails not found" })
        console.log(error)
    }
}