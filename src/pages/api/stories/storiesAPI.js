import connectdb from "@/utils/connectdb";
import StoriesModel from "@/models/storiesSchema";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            return getStories(req, res);
        }
        case "POST": {
            return addStory(req, res);
        }
    }
}

async function getStories(req, res) {
    try {
        console.log("Connecting to MongoDB, getStories")
        await connectdb();
        console.log("Connected to MongoDB, getStories")

        const stories = await StoriesModel.find({});
        res.status(201).send(stories);

    } catch (error) {
        console.log(error);
        res.status(400)
    }
}

async function addStory(req, res) {
    try {
        console.log("Connecting to MongoDB, addStory")
        await connectdb();
        console.log("Connected to MongoDB, addStory")

        const newStory = new StoriesModel(req.body);

        await newStory.save();
        res.status(201).send({
            success: true
        });

    } catch (error) {
        console.log(error)
        res.status(400)
    }
}