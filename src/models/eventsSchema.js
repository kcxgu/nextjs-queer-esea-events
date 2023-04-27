import { Schema, models, model } from "mongoose";

const eventsSchema = new Schema({
    organisationName: {
        type: String,
        required: true,
        trim: true,
    },
    organiserWebsite: {
        type: String,
        trim: true,
    },
    eventName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    eventDate: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    format: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        addressLine1: {
            type: String,
            trim: true,
        },
        addressLine2: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        postcode: {
            type: String,
            trim: true,
        },
    },
    eventURL: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
})

const EventsModel = models.Event || model("Event", eventsSchema);

export default EventsModel;