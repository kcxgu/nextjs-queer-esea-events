import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";

const AddNew = () => {
    const router = useRouter();
    const [storyInput, setStoryInput] = useState({
        title: "",
        content: "",
        email: "",
        gender: "",
    })
    const [error, setError] = useState(false);
    console.log(storyInput)
    const handleInput = (e) => {
        const { name, value } = e.target;
        setStoryInput({
            ...storyInput,
            [name]: value
        })
    }

    const handleShareStory = async (e) => {
        e.preventDefault();

        const story = {
            title: storyInput.title,
            content: storyInput.content,
            email: storyInput.email,
            gender: storyInput.gender,
        }
        try {
            const res = await axios.post("/api/stories/storiesAPI", story);
            if (res.data.success) {
                router.push("/our-stories");
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    }
    return (
        <div className="py-10">
            <Head>
                <title>Add Your Story - Hey Queer Asians</title>
            </Head>
            <h1 className="text-center text-4xl md:text-5xl py-4 md:py-10 lg:py-12 text-gray-800">Add your story</h1>
            <form
                method="POST"
                onSubmit={handleShareStory}
                className="w-5/6 md:w-3/5 lg:w-2/5 mx-auto tracking-wide pb-4 lg:pb-8 md:text-lg lg:text-xl"
            >
                <div className="flex flex-col gap-2 my-4 lg:mb-8">
                    <label className="text-gray-800">Your name</label>
                    <p className="mb-2 text-gray-600 text-sm lg:text-base">(E.g. this will show up as "Alex's Story". Note: You are welcome to use an alias, if preferred.)</p>
                    <input
                        className="border rounded-lg py-2 px-4 tracking-wide placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg placeholder:tracking-wider focus:outline-violet-200"
                        id="title"
                        name="title"
                        onChange={handleInput}
                        placeholder="Alex"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2 mb-4 lg:mb-8">
                    <label className="text-gray-800">Your story</label>
                    <textarea
                        className="border rounded-lg p-4 tracking-wide placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg placeholder:tracking-wider focus:outline-violet-200"
                        id="content"
                        name="content"
                        onChange={handleInput}
                        rows={10}
                        placeholder="You can share any story you like. If you're unsure of a topic, here are some suggestions: What was it like coming out to yourself? How did you come out to your family and friends? How has your dating experience been? What are your highlights and lowlights of being queer? What has been your experiences building a family?"
                        required
                    />
                </div>
                <div className="flex flex-row items-center gap-4 mb-4 lg:mb-8">
                    <p>What is your gender?</p>
                    <div>
                        <input
                            className="mr-2"
                            type="radio"
                            name="gender"
                            id="female"
                            value="en-GB-SoniaNeural"
                            onClick={handleInput}
                        />
                        <label htmlFor="female">Female</label>
                    </div>
                    <div>
                        <input
                            className="mr-2"
                            type="radio"
                            name="gender"
                            id="male"
                            value="en-GB-RyanNeural"
                            onClick={handleInput}
                        />
                        <label htmlFor="male">Male</label>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mb-4 lg:mb-8">
                    <p className="text-gray-800">If someone wants to reach out to you, having read your story, would you like us to pass on your contact details?</p>
                    <label className="text-gray-800">If so, what's your email address?</label>
                    <input
                        className="border rounded-lg py-2 px-4 tracking-wide placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg placeholder:tracking-wider focus:outline-violet-200"
                        id="email"
                        name="email"
                        onChange={handleInput}
                        placeholder="example@email.com"
                    />
                </div>
                <button
                    disabled={!storyInput.title || !storyInput.content}
                    className="block mx-auto py-2 px-6 mt-4 lg:mt-8 bg-violet-600 rounded-lg text-white tracking-wide font-medium hover:bg-violet-500 disabled:bg-violet-50 disabled:text-violet-300"
                    type="submit"
                >
                    Share
                </button>
                {error && <p className="mt-4 text-center text-red-500 text-sm tracking-wide">There was an error adding your story. Please <Link href="https://forms.gle/iGrrnA5tLXuEHjFR7" target="_blank" rel="noreferrer noopener" className="underline underline-offset-2">contact us</Link>.</p>}
            </form>
        </div>
    )
}

export default AddNew