import { Schema, models, model } from "mongoose";

const notificationsSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
})

const NotificationsModel = models.Notifications || model("Notifications", notificationsSchema);

export default NotificationsModel;