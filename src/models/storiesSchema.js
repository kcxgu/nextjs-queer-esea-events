import { Schema, models, model } from "mongoose";

const storiesSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        required: true
    }
})

const StoriesModel = models.Story || model("Story", storiesSchema);

export default StoriesModel;