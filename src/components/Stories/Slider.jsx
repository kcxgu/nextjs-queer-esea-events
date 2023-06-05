import { useState } from "react";
import Carouseltem from "./Carouseltem";
import Link from "next/link";
import Spinner from "../Loader/Spinner";

const Slider = ({ stories, loadingStories }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showStoryIndex, setShowStoryIndex] = useState(true);

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= stories.length) {
            newIndex = stories.length - 1;
        }
        setActiveIndex(newIndex);
    };

    const handleSelectedStory = (index) => {
        setActiveIndex(index);
        setShowStoryIndex(false);
    }

    return (
        <div className="overflow-hidden flex flex-col justify-center py-10">
            <div className="flex flex-row items-center justify-evenly pb-8 text-gray-800">
                <button
                    disabled={!activeIndex || showStoryIndex}
                    className="disabled:text-gray-200"
                    onClick={() => {
                        updateIndex(activeIndex - 1);
                    }}
                >
                    <span>❰</span>
                </button>
                <button
                    className="tracking-wider hover:opacity-60"
                    onClick={() => setShowStoryIndex(!showStoryIndex)}
                >
                    {showStoryIndex ? "Close Index" : "Open Index"}
                </button>
                <button
                    disabled={showStoryIndex || activeIndex + 1 === stories.length}
                    className="disabled:text-gray-200"
                    onClick={() => {
                        updateIndex(activeIndex + 1);
                    }}
                >
                    ❱
                </button>
            </div>
            {showStoryIndex ? (
                <div className="h-96 md:w-3/5 lg:w-1/2 mx-auto text-center text-lg tracking-wider">
                    <Link
                        href="/our-stories/add-new"
                        className="text-orange-500 hover:underline hover:underline-offset-2"
                    >
                        Add your story
                    </Link>
                    {loadingStories ? (
                        <div className="flex flex-row items-center justify-center gap-2">
                            <Spinner />
                            <p>Loading...</p>
                        </div>
                    ) : (<>
                        {stories && stories.map((item, i) =>
                            <p
                                key={i}
                                className="cursor-pointer overflow-y-auto hover:opacity-70"
                                onClick={() => handleSelectedStory(i)}
                            >
                                {i + 1}. {item.title}'s Story
                            </p>
                        )}
                    </>
                    )}
                </div>
            ) : (
                <div
                    className="whitespace-nowrap ease-in-out"
                    style={{
                        transform: `translate(-${activeIndex * 100}%)`
                    }}
                >
                    {stories.map((item, i) =>
                        <Carouseltem
                            key={i}
                            item={item}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default Slider