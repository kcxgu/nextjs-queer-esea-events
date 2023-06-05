import { useState } from "react"
import Spinner from "@/components/Loader/Spinner";
import axios from "axios"
import Head from "next/head";

const Forum = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("I'm interested in a forum!");
    const [interested, setInterested] = useState(false);
    const [notInterested, setNotInterested] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [loading, setLoading] = useState(false);

    console.log(errorMsg)
    const validateEmail = (email) => {
        let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    }
    const checkErrors = () => {
        if (!validateEmail(email)) setErrorMsg("Please enter valid email address")
        if (message.length < 1) setErrorMsg("Please let us know your concerns")
    }

    const handleForumInterest = async () => {
        checkErrors()

        if (validateEmail(email) && message.length >= 1) {
            const interestedComment = `<strong>Interested Party Email:</strong> ${email} <br /><br /><strong>Reason:</strong> ${message}`

            setErrorMsg("")
            setLoading(true);

            try {
                const res = await axios.post("/api/sendEmail/emailReport", { message: interestedComment })

                if (res.data.error === "") {
                    setSuccess(true)
                } else {
                    setServerError(true)
                }
                setServerError(false)

            } catch (error) {
                setServerError(true)
                console.log(error)
            }
            setLoading(false);
        }
    }

    return (
        <div style={{ backgroundColor: "#FEF9F6" }} className="w-full mx-auto">
            <Head>
                <title>Our Forum - Hey Queer Asians</title>
            </Head>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-evenly md:gap-10 py-20 px-8">
                <div className="flex flex-col gap-6 md:w-5/6 lg:pr-20">
                    <h1 className="text-4xl lg:text-5xl font-medium tracking-wide leading-normal lg:leading-normal">Welcome To Our Community Forum!</h1>
                    <img
                        className="md:hidden py-6"
                        src="/forumSocial.svg"
                    />
                    <p className="text-lg lg:text-xl tracking-wide lg:leading-normal">We're thinking of opening up an online community forum.</p>
                    <p className="text-lg lg:text-xl tracking-wide lg:leading-normal">A space where you can openly express yourself, ask any questions you may have, check if a fellow queer Asian is in your city or if they're interested in an event you're attending</p>
                    <p className="text-lg lg:text-xl tracking-wide lg:leading-normal">And, of course, to meet like-minded people!</p>
                    <p className="text-lg lg:text-xl tracking-wide lg:leading-normal">Would this be something you're interested in? Let us know so we can update you if/when the forum goes live!</p>
                    <div className="w-full mx-auto flex flex-row items-center justify-evenly py-4">
                        <p className="py-2 px-6 bg-pink-400 rounded-lg text-white font-semibold text-xl lg:text-2xl tracking-wide cursor-pointer hover:opacity-80"
                            onClick={() => { setInterested(true), setNotInterested(false) }}
                        >
                            Yes!
                        </p>
                        <p className="border border-gray-800 rounded-lg py-2 px-4 text-xl lg:text-2xl tracking-wide font-semibold cursor-pointer hover:opacity-80"
                            onClick={() => { setNotInterested(true), setInterested(false) }}
                        >
                            Hmmm...
                        </p>
                    </div>


                    {interested &&
                        <div className="w-full mx-auto flex flex-row justify-center gap-4 py-4 text-lg lg:text-xl">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="border border-gray-800 md:w-72 text-lg rounded-lg lg:text-xl pl-3 py-3 md:pl-4"
                                placeholder="example@email.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className="w-fit py-2 px-4 bg-gray-800 rounded-lg text-white" onClick={handleForumInterest}>Notify Me!</button>
                        </div>
                    }

                    {notInterested &&
                        <div className="w-full mx-auto flex flex-col items-center justify-center gap-4 py-4 text-lg lg:text-xl">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="border border-gray-800 md:w-96 text-lg rounded-lg lg:text-xl pl-3 py-3 md:pl-4"
                                placeholder="example@email.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <textarea
                                id="message"
                                name="message"
                                type="text"
                                rows={3}
                                className="border border-gray-800 md:w-96 text-lg rounded-lg lg:text-xl pl-3 py-3 md:pl-4"
                                placeholder="Let us know your concerns"
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button className="w-fit h-fit py-2 px-4 bg-gray-800 rounded-lg text-white mt-2" onClick={handleForumInterest}>Send</button>
                        </div>
                    }

                    {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                    {loading &&
                        <div className="flex flex-row items-center gap-2 lg:gap-3 text-gray-600">
                            <Spinner />
                            <p>Sending...</p>
                        </div>
                    }
                    {success && <p>We got it, thanks!</p>}
                    {serverError && <p className="text-center text-red-500">We are experiencing a connection error, try contacting us <a href="" target="_blank" rel="noopener noreferrer preload"><span className="text-blue-600 underline underline-offset-2 decoration-2 decoration-blue-400 hover:opacity-80">here</span></a> instead.</p>}

                </div>
                <div className="md:w-1/2 pt-6">
                    <img
                        className="hidden md:block py-6"
                        src="/forumSocial.svg"
                    />
                </div>
            </div>
        </div>
    )
}

export default Forum