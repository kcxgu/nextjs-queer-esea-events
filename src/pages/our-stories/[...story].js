import { collection } from "@/utils/collection";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Lora } from "next/font/google";

const bodyFont = Lora({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

const Story = () => {
    const router = useRouter();
    const [storyIndex, setStoryIndex] = useState(0);

    useEffect(() => {
        setStoryIndex(router.query.index)
    }, [router.query])

    return (
        <div className={`max-w-7xl min-h-screen mx-auto py-12 px-10 ${bodyFont.className}`}>
            <h1 className="text-center text-3xl py-4 md:pt-10 lg:pt-12 text-gray-800">{collection[storyIndex].title}</h1>
            <p className="text-center text-gray-400 text-sm">{collection[storyIndex].author} • {collection[storyIndex].date}</p>
            <p className="md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto py-8 break-words whitespace-pre-line text-lg">{collection[storyIndex].body}</p>
        </div>
    )
}

export default Story