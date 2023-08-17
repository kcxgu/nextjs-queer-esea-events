import { useEffect, useState } from "react";
import { Lora } from "next/font/google"
import axios from "axios";
import Head from "next/head";
import { collection } from "@/utils/collection";
import { useRouter } from "next/router";

const bodyFont = Lora({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

const OurStories = () => {
    const router = useRouter();
    const [stories, setStories] = useState([{}]);
    const [loadingStories, setLoadingStories] = useState(true);

    const getStories = async () => {
        const res = await axios.get("/api/stories/storiesAPI")
        setStories(res.data)
        setLoadingStories(false)
    }

    const handleLink = (i) => {
        const slug = collection[i].title.replace(/ /g, "-")
        router.push({
            pathname: "/our-stories/" + slug,
            query: { index: i }
        })
    }

    useEffect(() => {
        getStories()
    }, [])

    return (
        <div className={`max-w-7xl min-h-screen mx-auto py-12 px-10 ${bodyFont.className}`}>
            <Head>
                <title>Our Stories - Hey Queer Asians</title>
            </Head>
            <h1 className="text-center text-4xl md:text-5xl py-4 md:pt-10 lg:pt-12 text-gray-800">Our Stories</h1>
            <div className="flex flex-col lg:w-3/4 mx-auto py-10 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.map((item, i) =>
                    <div key={i} className="border rounded-lg p-4 cursor-pointer hover:shadow-lg"
                        onClick={() => handleLink(i)}
                    >
                        <p className="pb-1 text-center">{item.title}</p>
                        <p className="text-center text-gray-400 text-sm">{item.author} • {item.date}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OurStories