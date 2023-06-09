import { BsCaretDownFill, BsCaretUp } from "react-icons/bs"
import { useState } from "react";
import axios from "axios";
import EventsCard from "./EventsCard"

const EventsSchedule = ({ events, setEvents, selectedMonth, setSelectedMonth }) => {
    const [dropdown, setDropdown] = useState(false);

    const months = ["Any", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const selectedMonthNumber = months.indexOf(selectedMonth);

    let eventsThisMonth = [];
    let futureEvents = [];
    let selectedMonthEvents = [];

    const handleDelete = async (item) => {
        await axios.post("/api/events/deleteEvent", item)
    }

    events.forEach(item => {
        const currentDate = new Date().getDate();
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const itemDate = new Date(item.eventDate).getDate();
        const itemMonth = new Date(item.eventDate).getMonth();
        const itemYear = new Date(item.eventDate).getFullYear();

        if (itemMonth + itemYear === currentMonth + currentYear) {
            if (itemDate < currentDate) {
                handleDelete(item)
            } else {
                eventsThisMonth.push(item);
            }
        }

        if (itemYear >= currentYear && itemMonth > currentMonth) {
            futureEvents.push(item);
        }

        if (itemMonth + 1 === selectedMonthNumber) {
            selectedMonthEvents.push(item)
        }
    })

    const handleSelectMonth = (item) => {
        setSelectedMonth(item);
        setDropdown(false);
    }

    eventsThisMonth.sort(function (a, b) {
        return a.startTime.localeCompare(b.startTime);
    });

    futureEvents.sort(function (a, b) {
        return a.startTime.localeCompare(b.startTime);
    });

    selectedMonthEvents.sort(function (a, b) {
        return a.startTime.localeCompare(b.startTime);
    });

    return (
        <div className="bg-white pb-12 md:pb-24 lg:pb-32">
            <div className="max-w-7xl mx-auto py-8 md:py-0">
                <div className="w-full max-w-4xl lg:max-w-5xl flex flex-row items-center justify-between px-6 md:px-16 lg:pl-24 xl:pl-4 pt-4 pb-6 md:pt-8 md:pb-10">
                    <div className="md:hidden">
                        <h2 className="text-xl md:text-3xl tracking-wide">Currently:</h2>
                        <h2 className="text-xl md:text-3xl tracking-wide">{new Date().toLocaleString("default", { month: "long", year: "numeric" })}</h2>
                    </div>
                    <h2 className="hidden md:block md:pl-4 text-xl md:text-3xl tracking-wide">Currently: {new Date().toLocaleString("default", { month: "long", year: "numeric" })}</h2>

                    {dropdown ? (
                        <div className="relative">
                            <div className="w-fit mr-4 flex flex-row items-center border-b border-gray-300 cursor-pointer text-rose-300"
                                onClick={() => setDropdown(false)}
                            >
                                <p className="text-sm mr-2 md:text-2xl tracking-wide md:tracking-wider md:px-2">Select Month</p>
                                <BsCaretUp className="text-sm md:text-2xl" />
                            </div>
                            <div className="absolute z-10 max-w-max md:max-w-full top-8 right-2 md:top-12 bg-rose-300 rounded-xl py-4 mt-1 text-white text-lg md:text-xl font-semibold tracking-wider text-center">
                                {months.map(item =>
                                    <p
                                        key={item}
                                        className="w-full cursor-pointer px-6 md:px-12 py-3 hover:bg-rose-50 hover:text-rose-400"
                                        onClick={() => handleSelectMonth(item)}
                                    >
                                        {item}
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="w-fit mr-4 flex flex-row items-center border-b border-gray-300 cursor-pointer hover:border-rose-500"
                                onClick={() => setDropdown(true)}
                            >
                                <p className="text-xl md:text-2xl text-gray-500 tracking-wide md:tracking-wider px-2">{selectedMonth}</p>
                                <BsCaretDownFill className="text-gray-300 text-xl md:text-2xl" />
                            </div>
                        </>
                    )}

                </div>

                {selectedMonth === "Month" || selectedMonth === "Any" ? (
                    <>
                        {eventsThisMonth.length !== 0 ? (
                            <div className="w-full md:px-6 py-4">
                                {eventsThisMonth.map(item =>
                                    <EventsCard
                                        key={item._id}
                                        events={events}
                                        setEvents={setEvents}
                                        id={item._id}
                                        organisationName={item.organisationName}
                                        organiserWebsite={item.organiserWebsite}
                                        eventName={item.eventName}
                                        description={item.description}
                                        format={item.format}
                                        addressLine1={item.location.addressLine1}
                                        addressLine2={item.location.addressLine2}
                                        city={item.location.city}
                                        postcode={item.location.postcode}
                                        eventDate={item.eventDate}
                                        startTime={item.startTime}
                                        endTime={item.endTime}
                                        price={item.price}
                                        eventURL={item.eventURL}
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="max-w-5xl">
                                <p className="text-center text-2xl pt-10 pb-8 text-gray-400 font-medium tracking-wider leading-relaxed">(⋟﹏⋞)</p>
                                <p className="text-center text-2xl pb-8 text-gray-400 font-medium tracking-wider leading-relaxed px-8">There are currently no events this month</p>
                            </div>
                        )}


                        {futureEvents.length !== 0 &&
                            <>
                                <h3 className="px-6 md:pl-20 lg:pl-24 xl:pl-8 pt-4 pb-6 md:pt-8 md:pb-10 text-2xl md:text-3xl tracking-wide">Upcoming:</h3>
                                <div className="w-full md:px-6 py-4">
                                    {futureEvents.map(item =>
                                        <EventsCard
                                            key={item._id}
                                            id={item._id}
                                            organisationName={item.organisationName}
                                            organiserWebsite={item.organiserWebsite}
                                            eventName={item.eventName}
                                            description={item.description}
                                            format={item.format}
                                            addressLine1={item.location.addressLine1}
                                            addressLine2={item.location.addressLine2}
                                            city={item.location.city}
                                            postcode={item.location.postcode}
                                            eventDate={item.eventDate}
                                            startTime={item.startTime}
                                            endTime={item.endTime}
                                            price={item.price}
                                            eventURL={item.eventURL}
                                        />
                                    )}
                                </div>
                            </>
                        }
                    </>
                ) : (
                    <>
                        {selectedMonthEvents.length !== 0 ? (
                            <>
                                <h3 className="text-2xl md:text-3xl tracking-wide px-6 md:px-16 pt-4 pb-6 md:pt-8 md:pb-10">Events in {selectedMonth}:</h3>
                                <div className="w-full md:px-6 py-4">
                                    {selectedMonthEvents.map(item =>
                                        <EventsCard
                                            key={item._id}
                                            id={item._id}
                                            organisationName={item.organisationName}
                                            organiserWebsite={item.organiserWebsite}
                                            eventName={item.eventName}
                                            description={item.description}
                                            format={item.format}
                                            addressLine1={item.location.addressLine1}
                                            addressLine2={item.location.addressLine2}
                                            city={item.location.city}
                                            postcode={item.location.postcode}
                                            eventDate={item.eventDate}
                                            startTime={item.startTime}
                                            endTime={item.endTime}
                                            price={item.price}
                                            eventURL={item.eventURL}
                                        />
                                    )}
                                </div>
                            </>) : (

                            <div className="max-w-5xl py-10">
                                <p className="text-center text-2xl pt-10 pb-8 text-gray-400 font-medium tracking-wider leading-relaxed">(⋟﹏⋞)</p>
                                <p className="text-center text-2xl pb-8 lg:pb-20 text-gray-400 font-medium tracking-wider leading-relaxed px-8">There are currently no events in {selectedMonth}</p>
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    )
}

export default EventsSchedule