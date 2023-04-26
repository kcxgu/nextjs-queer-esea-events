import { useState } from "react"
import { FaBell } from "react-icons/fa";
import axios from "axios";

const Notification = () => {
    const [emailDropdown, setEmailDropdown] = useState(false)
    const [emailInput, setEmailInput] = useState("")
    const [emailError, setEmailError] = useState("")
    const [notificationSuccess, setNotificationSuccess] = useState(false);

    const handleInput = e => {
        setEmailInput(e.target.value);
        if (emailInput.length > 0) setEmailError("");
    }

    const handleNotification = async () => {
        if (emailInput.length >= 8) {
            setEmailError("");
            try {
                const res = await axios.post("/api/events/notification", { email: emailInput });

                if (res.data.message === "Success!") {
                    setNotificationSuccess(true);
                } else {
                    setEmailError(res.data.message);
                }

            } catch (error) {
                console.log(error)
                setEmailError("We are unable to add your email at this time")
            }
        } else {
            setEmailError("Please ensure your email address is complete and valid")
        }
    }

    return (
        <div className="flex flex-col items-center pb-10 lg:pb-12">
            <div className="w-3/5 mx-auto flex flex-row items-center justify-center gap-4 text-gray-600 cursor-pointer hover:text-gray-800" onClick={() => setEmailDropdown(true)}>
                <FaBell className="text-xl md:text-lg" />
                <p className="md:pr-10 lg:pr-20 lg:text-xl tracking-wide lg:tracking-wider leading-normal">Get notified when there's a new event!</p>
            </div>
            {notificationSuccess ? (
                <div>
                    <p className="pt-4 text-fuchsia-600 text-xl lg:text-2xl font-semibold tracking-wide lg:tracking-wider">Got it! ✌️</p>
                </div>
            ) : (
                <>
                    {emailDropdown &&
                        <div className="lg:mr-20">
                            <p className="text-sm md:text-base text-center pt-4 text-gray-700 tracking-wide px-10">We are working on a location-specific notification solution.</p>
                            <p className="text-sm md:text-base text-center text-gray-700 tracking-wide px-10">For now, you will be notified whenever a new event is posted.</p>
                            <div className="pt-6 flex flex-row justify-center gap-2 md:gap-4 mx-4 md:mx-auto">
                                <input
                                    name="email"
                                    id="email"
                                    className="border rounded-lg border-gray-400 text-gray-700 lg:text-lg px-4 md:py-3 md:w-2/3 tracking-wide lg:tracking-wider focus:outline-none focus:border-gray-500"
                                    placeholder="email@example.com"
                                    onChange={handleInput}
                                />
                                <button className="bg-black text-white lg:text-lg rounded-lg px-4 py-2 md:py-3 tracking-wide lg:tracking-wider hover:opacity-70"
                                    onClick={handleNotification}
                                >
                                    Notify Me
                                </button>
                            </div>
                            {emailError && <p className="text-center text-red-500 text-sm md:text-base px-12 pt-4">{emailError}</p>}
                            <p className="mt-4 -mb-4 md:mb-0 lg:-mb-8 w-fit mx-auto pt-4 text-gray-500 text-center lg:text-lg cursor-pointer hover:text-gray-900"
                                onClick={() => setEmailDropdown(false)}
                            >Collapse<span className="pl-2 pr-4">^_^</span></p>
                        </div>
                    }
                </>
            )}
        </div>
    )
}

export default Notification