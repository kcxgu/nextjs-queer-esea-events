import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Slider from "@/components/Stories/Slider";

const OurStories = () => {
    const [stories, setStories] = useState([{}]);
    const [loadingStories, setLoadingStories] = useState(true);

    const getStories = async () => {
        const res = await axios.get("/api/stories/storiesAPI")
        setStories(res.data)
        setLoadingStories(false)
    }

    useEffect(() => {
        getStories()
    }, [])

    return (
        <div className="max-w-7xl mx-auto">
            <Head>
                <title>Our Stories - Hey Queer Asians</title>
            </Head>
            <h1 className="text-center text-4xl md:text-5xl py-4 md:pt-10 lg:pt-12 text-gray-800">Our Stories</h1>
            <Slider
                stories={stories}
                loadingStories={loadingStories}
            />
        </div>
    )
}

export default OurStories