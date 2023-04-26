import connectdb from "@/utils/connectdb";
import EventsModel from "@/models/eventsSchema";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            return getEvents(req, res);
        }
        case "POST": {
            return addEvent(req, res);
        }
        case 'PUT': {
            return updateEvent(req, res);
        }
    }
}

async function getEvents(req, res) {
    try {
        console.log("Connecting to MongoDB, getEvents")
        await connectdb();
        console.log("Connected to MongoDB, getEvents")

        const events = await EventsModel.find({});
        res.send(events);

    } catch (error) {
        console.log(error)
    }
}

async function addEvent(req, res) {
    try {
        console.log("Connecting to MongoDB, addEvent")
        await connectdb();
        console.log("Connected to MongoDB, addEvent")

        const newEvent = new EventsModel(req.body);
        const event = await newEvent.save();
        res.status(201).json(event);

    } catch (error) {
        res.status(422).json({ error: "Unable to add new event." })
    }
}

async function updateEvent(req, res) {
    try {
        console.log("Connecting to MongoDB, updateEvent")
        await connectdb();
        console.log("Connected to MongoDB, updateEvent")

        const { id, updatedEvent } = req.body;

        const event = await EventsModel.replaceOne({ _id: id }, { event: updatedEvent })

        return res.acknowledged

    } catch (error) {
        console.log(error)
    }

    // try {
    //     let { db } = await connectToDatabase();

    //     const { id, newComment } = JSON.parse(req.body);

    //     await db.collection('reviews').updateOne(
    //         {
    //             _id: new ObjectId(id),
    //         },
    //         { $set: { feedback: newComment } }
    //     );
    //     return res.json({
    //         message: 'Review updated successfully',
    //         success: true,
    //     });
    // } catch (error: any) {
    //     return res.json({
    //         message: error.message,
    //         success: false,
    //     });
    // }
}