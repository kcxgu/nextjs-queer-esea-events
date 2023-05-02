import { useEffect, useState } from "react"
import axios from "axios";
import Spinner from "../Loader/Spinner";

const Notification = ({ notificationDropdown, setNotificationDropdown }) => {
    const [emailInput, setEmailInput] = useState("")
    const [emailError, setEmailError] = useState("")
    const [notificationSuccess, setNotificationSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInput = e => {
        setEmailInput(e.target.value);
        if (emailInput.length > 0) setEmailError("");
    }

    const handleNotification = async () => {
        if (emailInput.length >= 8) {
            setEmailError("");
            setLoading(true);

            try {
                const res = await axios.post("/api/events/notification", { email: emailInput });

                if (res.data.message === "Success!") {
                    setNotificationSuccess(true);
                    setEmailInput("");
                    setEmailError("");
                } else {
                    setEmailError(res.data.message);
                }

            } catch (error) {
                console.log(error)
                setEmailError("We are unable to add your email at this time")
            }

            setLoading(false);

        } else {
            setEmailError("Please ensure your email address is complete and valid")
        }
    }

    const handleCloseNotification = () => {
        setNotificationDropdown(false)
        document.getElementById('homeOptions').scrollIntoView({
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        if (notificationDropdown) {
            document.getElementById('notify').scrollIntoView({
                behavior: 'smooth'
            })
        }
    }, [notificationDropdown])

    return (
        <>
            {notificationDropdown &&
                <div id="notify" className="max-w-7xl w-full mx-auto py-10 md:py-16 lg:py-20 lg:pb-32">
                    <div className="md:w-4/5 lg:w-3/4 xl:w-2/3">
                        <h2 className="px-8 md:pl-20 lg:pl-28 xl:pl-4 font-semibold tracking-wide md:leading-normal lg:leading-normal xl:leading-normal text-3xl md:text-4xl lg:text-5xl text-black md:text-justify">Notify Me When There Is A New Event</h2>

                        <p className="text-center md:text-left text-gray-700 tracking-wide px-10 md:pl-20 lg:pl-28 xl:pl-4 pt-8">We are working on a location-specific notification solution.</p>
                        <p className="text-center md:text-left text-gray-700 tracking-wide px-8 md:pl-20 lg:pl-28 xl:pl-4 pt-3">For now, you will be notified whenever a new event is posted.</p>

                        <div className="pt-8 flex flex-col items-center md:items-start md:pl-20 lg:pl-28 xl:pl-4 md:gap-4 mx-4 md:mx-auto">
                            <input
                                name="email"
                                id="email"
                                className="border rounded-lg border-gray-400 text-gray-700 lg:text-lg px-4 py-2 md:py-3 md:w-2/3 tracking-wide lg:tracking-wider focus:outline-none focus:border-gray-500"
                                placeholder="email@example.com"
                                onChange={handleInput}
                            />
                            {/* <div className="flex flex-row justify-evenly gap-4 pt-2">
                                    <input
                                        className="w-1/2 mx-auto border rounded-lg border-gray-400 text-gray-700 lg:text-lg px-4 py-2 md:py-3 md:w-2/3 tracking-wide lg:tracking-wider focus:outline-none focus:border-gray-500"
                                        placeholder="Country"
                                    />
                                    <input
                                        className="w-1/2 mx-auto border rounded-lg border-gray-400 text-gray-700 lg:text-lg px-4 py-2 md:py-3 md:w-2/3 tracking-wide lg:tracking-wider focus:outline-none focus:border-gray-500"
                                        placeholder="City"
                                    />
                                </div> */}
                            <div className="pt-8 flex flex-row items-center md:items-start justify-evenly md:justify-center gap-8 md:gap-10">
                                <p className="w-fit border border-gray-700 rounded-lg px-4 py-2 md:py-3 tracking-wide lg:tracking-wider text-gray-500 text-center lg:text-lg cursor-pointer hover:text-gray-900"
                                    onClick={handleCloseNotification}
                                >
                                    Collapse
                                </p>
                                <button className="bg-black text-white lg:text-lg rounded-lg px-4 py-2 md:py-3 tracking-wide lg:tracking-wider hover:opacity-70"
                                    onClick={handleNotification}
                                >
                                    Notify Me<span className="pl-2">^_^</span>
                                </button>
                            </div>
                        </div>

                        {loading && (
                            <div className="flex flex-row items-center justify-center md:justify-start  gap-2 md:gap-3 lg:gap-4 pt-8 md:pl-20 lg:pl-28 xl:pl-4 text-gray-600 text-center md:text-left lg:text-lg tracking-wide lg:tracking-wider">
                                <Spinner />
                                <p>Adding your email...</p>
                            </div>
                        )}

                        {notificationSuccess && (
                            <p className="pt-10 md:pl-20 lg:pl-28 xl:pl-4 text-violet-500 text-center md:text-left text-xl lg:text-2xl font-medium tracking-wide lg:tracking-wider">Got it! ✌️</p>
                        )}

                        {emailError && <p className="text-center md:text-left text-red-500 text-sm md:text-base px-12 pt-4 md:pl-20 lg:pl-28 xl:pl-4">{emailError}</p>}
                    </div>
                </div>
            }
        </>
    )
}

export default Notification