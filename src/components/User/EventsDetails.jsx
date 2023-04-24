import { useState } from "react";
import { BsCaretDownFill, BsCaretLeftFill, BsCaretUpFill } from "react-icons/bs";

const EventsDetails = ({ events }) => {
    const [eventsModal, setEventsModal] = useState(true);

    const toDate = (eventDate) => {
        const date = new Date(eventDate).toLocaleDateString("en-UK", { day: "numeric", month: "long", year: "numeric" })
        return date
    }

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

                    {events ? (
                        <div className="md:grid md:grid-cols-2">
                            {events.map(item =>
                                <div key={item._id} className="md:w-5/6 lg:w-4/5 border rounded-lg py-4 md:py-6 my-4 px-4 md:px-5 tracking-wide">
                                    <p className="font-medium">{item.eventName}</p>
                                    <div className="flex flex-row justify-between pt-2">
                                        <p className="text-gray-500">{toDate(item.eventDate)}</p>
                                        {item.price === 0 ? <p className="text-orange-600 font-medium tracking-wider">Free</p> : <p className="text-blue-500  font-medium tracking-wider">£{item.price.toFixed(2)}</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <p>You don't seem to have posted an event yet</p>
                            <p>Let us know if you think we've got it wrong.</p>
                        </div>
                    )
                    }
                </div>
            }
        </div>
    )
}

export default EventsDetails