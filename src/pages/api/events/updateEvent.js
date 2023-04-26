import connectdb from "@/utils/connectdb";
import EventsModel from "@/models/eventsSchema";

export default async function updateEvent(req, res) {
    try {
        console.log("Connecting to MongoDB, updateEvent")
        await connectdb();
        console.log("Connected to MongoDB, updateEvent")

        const { id, updatedEvent } = req.body;

        console.log(updatedEvent)

        await EventsModel.updateOne({ _id: id }, {
            organisationName: updatedEvent.organisationName,
            eventName: updatedEvent.eventName,
            description: updatedEvent.description,
            eventDate: updatedEvent.eventDate,
            startTime: updatedEvent.startTime,
            endTime: updatedEvent.endTime,
            format: updatedEvent.format,
            location: {
                addressLine1: updatedEvent.location.addressLine1,
                addressLine2: updatedEvent.location.addressLine2,
                city: updatedEvent.location.city,
                postcode: updatedEvent.location.postcode,
            },
            eventURL: updatedEvent.eventURL,
            price: updatedEvent.price,
        });

        return res.send({ message: "Success!" })

    } catch (error) {
        console.log(error);
        return res.json({ message: `Unable to edit data` })
    }
}