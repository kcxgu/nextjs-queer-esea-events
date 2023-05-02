import { BsCaretDownFill, BsCaretUp } from "react-icons/bs"
import { useState } from "react"
import Notification from "./Notification";
import Banner from "./Banner";

const Hero = ({ events, selectedCity, setSelectedCity }) => {
    const [dropdown, setDropdown] = useState(false);
    const [notificationDropdown, setNotificationDropdown] = useState(false);

    const location = [];

    const capitalise = (item) => {
        return item.charAt(0).toUpperCase() + item.slice(1)
    }

    events.forEach(item => {
        if (item.location.city !== "" && !location.includes(capitalise(item.location.city).trim())) {
            location.push(capitalise(item.location.city))
        };
        if (item.format === "Online" && !location.includes("Online")) location.push(item.format);
    })

    const handleCitySelection = (item) => {
        setSelectedCity(item);
        setDropdown(false)
    }

    return (
        <div>
            <Banner
                setNotificationDropdown={setNotificationDropdown}
            />
            <Notification
                notificationDropdown={notificationDropdown}
                setNotificationDropdown={setNotificationDropdown}
            />
            <div className="max-w-7xl mx-auto py-10 md:py-16 lg:py-20 lg:pb-32">
                <div id="events" className="flex flex-row justify-between items-start lg:items-center xl:items-end">
                    <div className="px-8 md:pl-20 lg:pl-28 xl:pl-8 md:w-4/5 lg:w-3/4 xl:w-2/3 text-3xl md:text-4xl lg:text-5xl text-black font-semibold tracking-wide md:text-justify">
                        <h1 className="leading-normal lg:tracking-wider lg:pr-10">Upcoming Queer East and Southeast Asian Events In:</h1>
                        {dropdown ? (
                            <>
                                <div className="relative max-w-max">
                                    <div className="flex flex-row items-center gap-2 underline underline-offset-8 py-2 cursor-pointer hover:opacity-90 text-violet-300" onClick={() => { setDropdown(false) }}>
                                        <h1>Select Location</h1>
                                        <BsCaretUp className="mt-2" />
                                    </div>
                                    <div className="absolute z-10 top-18 w-full md:top-20 bg-white rounded-xl py-4 mt-1 text-violet-400">
                                        {location.map((item, i) =>
                                            <p
                                                key={i}
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
                            <div className="flex flex-row items-center gap-2">
                                <div className="flex flex-row items-center gap-2 underline underline-offset-8 py-2 cursor-pointer hover:opacity-90" onClick={() => { setDropdown(true) }}>
                                    <h1>{selectedCity}</h1>
                                    <BsCaretDownFill className="mt-2" />
                                </div>
                                <p className="text-sm uppercase font-semibold align-top bg-teal-500 text-white py-1 px-3 ml-1 rounded-lg no-underline">UK</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero