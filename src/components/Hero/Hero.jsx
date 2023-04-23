import { BsCaretDownFill, BsCaretUp } from "react-icons/bs"
import { useState } from "react"

const Hero = ({ events, selectedCity, setSelectedCity }) => {
    const [dropdown, setDropdown] = useState(false)

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

    return (
        <div className="max-w-7xl mx-auto py-14 px-8 md:py-20 md:pl-14 lg:pt-20 lg:pb-32 lg:px-10 flex flex-row justify-between items-start lg:items-center xl:items-end">
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
    )
}

export default Hero