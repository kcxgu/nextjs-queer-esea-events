import { Schema, models, model } from "mongoose";

const notificationsSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
})

const NotificationsModel = models.Notifications || model("Notifications", notificationsSchema);

export default NotificationsModel;