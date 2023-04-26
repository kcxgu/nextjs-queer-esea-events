import connectdb from "@/utils/connectdb";
import EventsModel from "@/models/eventsSchema";

export default async function findEvents(req, res) {
    try {
        await connectdb();

        const events = await EventsModel.find(
            { _id: req.body.id }
        )

        return res.send(events)

    } catch (error) {
        console.log(error)
        res.json({ message: `No event found` })
    }
}