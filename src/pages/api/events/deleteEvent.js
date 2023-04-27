import connectdb from "@/utils/connectdb";
import EventsModel from "@/models/eventsSchema";

export default async function deleteEvent(req, res) {
    try {
        console.log("Connecting to MongoDB, deleteEvent")
        await connectdb();
        console.log("Connected to MongoDB, deleteEvent")

        const { _id } = req.body;

        await EventsModel.findOneAndRemove(
            { _id: _id }
        )

        res.json({ message: `Successfully Removed Event ${_id}` })

    } catch (error) {
        console.log(error)
    }
}