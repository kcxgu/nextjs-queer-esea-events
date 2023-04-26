import { useState } from "react";
import { BsCaretDownFill, BsCaretLeftFill, BsCaretUpFill } from "react-icons/bs";
import SimpleEventsCard from "../Events/Display/SimpleEventsCard";

const EventsDetails = ({ events }) => {
    const [eventsModal, setEventsModal] = useState(true);

    return (
        <div className="flex flex-col lg:flex-row pb-10">
            {eventsModal ? (
                <div className="lg:hidden cursor-pointer" onClick={() => setEventsModal(false)}>
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-xl md:text-2xl lg:text-3xl">Your Awesome Events</h2>
                        <BsCaretUpFill className="lg:hidden text-xl" />
                    </div>
                    {events && <p className="text-gray-700 py-2 md:py-4">You have {events.length} upcoming events 🎉</p>}
                </div>
            ) : (
                <div className="lg:hidden cursor-pointer" onClick={() => setEventsModal(true)}>
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-xl md:text-2xl lg:text-3xl">Your Awesome Events</h2>
                        <BsCaretDownFill className="lg:hidden text-xl" />
                    </div>
                    {events && <p className="text-gray-700 py-2 md:py-4">You have {events.length} upcoming events 🎉</p>}
                </div>
            )}

            {eventsModal ? (
                <div className="hidden lg:block ">
                    <div className="hidden lg:block cursor-pointer border-l-2 border-gray-800 pl-8" onClick={() => setEventsModal(false)}>
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-xl md:text-2xl lg:text-3xl">Your Awesome Events</h2>
                            <BsCaretUpFill className="lg:hidden text-xl" />
                        </div>
                        {events && <p className="text-gray-700 py-2 md:py-4">You have {events.length} upcoming events 🎉</p>}
                    </div>
                </div>
            ) : (
                <div className="hidden lg:block pb-10">
                    <div className="hidden lg:block cursor-pointer hover:border-l-2 hover:border-gray-800 hover:pl-8" onClick={() => setEventsModal(true)}>
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-xl md:text-2xl lg:text-3xl">Your Awesome Events</h2>
                            <BsCaretUpFill className="lg:hidden text-xl" />
                        </div>
                        {events && <p className="text-gray-700 py-2 md:py-4">You have {events.length} upcoming events 🎉</p>}
                    </div>
                </div>
            )}

            {eventsModal &&
                <div className="flex flex-col lg:pl-24 xl:pl-32 lg:ml-4">
                    <div className="hidden lg:flex flex-row gap-2 items-center text-gray-700 tracking-wider cursor-pointer hover:text-black"
                        onClick={() => setEventsModal(false)}
                    >
                        <BsCaretLeftFill />
                        <p>Hide</p>
                    </div>

                    {events &&
                        <div className="md:grid md:grid-cols-2 lg:gap-4 xl:gap-10">
                            {events.map(item =>
                                <SimpleEventsCard
                                    key={item._id}
                                    id={item._id}
                                    eventName={item.eventName}
                                    eventDate={item.eventDate}
                                    price={item.price}
                                />
                            )}
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default EventsDetails