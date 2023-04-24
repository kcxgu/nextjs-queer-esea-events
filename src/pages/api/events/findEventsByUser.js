import connectdb from "@/utils/connectdb";
import EventsModel from "@/models/eventsSchema";

export default async function findEvents(req, res) {
    try {
        await connectdb();

        const events = await EventsModel.find(
            { organisationName: req.body.name }
        ).sort({ eventDate: -1 })

        return res.send(events)

    } catch (error) {
        console.log(error)
    }
}