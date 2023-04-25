import { BsCaretDownFill, BsCaretUp } from "react-icons/bs"
import { useState } from "react"
import { FaBell } from "react-icons/fa";
import axios from "axios";

const Hero = ({ events, selectedCity, setSelectedCity }) => {
    const [dropdown, setDropdown] = useState(false);
    const [emailDropdown, setEmailDropdown] = useState(false)
    const [emailInput, setEmailInput] = useState("")
    const [emailError, setEmailError] = useState("")
    const [notificationSuccess, setNotificationSuccess] = useState(false);

    const location = [];

    const capitalise = (item) => {
        return item.charAt(0).toUpperCase() + item.slice(1)
    }

    events.forEach(item => {
        if (item.location.city !== "" && !location.includes(item.location.city.trim())) location.push(capitalise(item.location.city));
        if (item.format === "Online" && !location.includes("Online")) location.push(item.format);
    })

    const handleCitySelection = (item) => {
        setSelectedCity(item);
        setDropdown(false)
    }

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
        <div className="max-w-7xl mx-auto py-14 md:py-20 md:pl-14 lg:pt-20 lg:pb-32">
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
                            <>
                                <div className="pt-6 flex flex-row gap-2 md:gap-4 mx-4 lg:mr-20">
                                    <input
                                        name="email"
                                        id="email"
                                        className="border rounded-lg border-gray-400 text-gray-700 lg:text-lg px-4 md:py-3 md:w-80 tracking-wide lg:tracking-wider focus:outline-none focus:border-gray-500"
                                        placeholder="email@example.com"
                                        onChange={handleInput}
                                    />
                                    <button className="bg-black text-white lg:text-lg rounded-lg px-4 py-2 md:py-3 tracking-wide lg:tracking-wider hover:opacity-70"
                                        onClick={handleNotification}
                                    >
                                        Notify Me
                                    </button>
                                </div>
                                {emailError && <p className="text-center text-red-500 text-sm md:text-base px-12 pt-4 lg:mr-20">{emailError}</p>}
                            </>
                        }
                    </>
                )}

            </div>
            <div className="flex flex-row justify-between items-start lg:items-center xl:items-end">
                <div className="w-5/6 lg:w-11/12 mx-auto md:p-4 text-3xl lg:text-5xl text-black font-semibold tracking-wide md:text-justify">
                    <h1 className="leading-normal lg:tracking-wider lg:pr-10">Upcoming Queer East and Southeast Asian Events In:</h1>
                    {dropdown ? (
                        <>
                            <div className="relative max-w-max">
                                <div className="flex flex-row items-center gap-2 underline underline-offset-8 py-2 cursor-pointer hover:opacity-90 text-violet-300" onClick={() => { setDropdown(false) }}>
                                    <h1>Select Location</h1>
                                    <BsCaretUp className="mt-2" />
                                </div>
                                <div className="absolute z-10 top-18 w-full md:top-20 bg-white rounded-xl py-4 mt-1 text-violet-400">
                                    {location.map(item =>
                                        <p
                                            key={item}
                                            className="w-full hover:bg-gray-100 cursor-pointer px-6 py-3"
                                            onClick={() => handleCitySelection(item)}
                                        >
                                            {item}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-row items-center gap-2 underline underline-offset-8 py-2 cursor-pointer hover:opacity-90" onClick={() => { setDropdown(true) }}>
                            <h1>{selectedCity}</h1>
                            <BsCaretDownFill className="mt-2" />
                        </div>
                    )}
                </div>
                <div className="hidden md:block">
                    <img src="/pride.svg" className="w-1/2 lg:w-2/3 mx-auto" />
                </div>
            </div>
        </div>
    )
}

export default Hero