import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/userAtom";
import axios from "axios";
import Link from "next/link";
import Spinner from "../Loader/Spinner";

const EditEventForm = () => {
    const router = useRouter();
    const [userStateValue, setUserStateValue] = useRecoilState(userState);
    const [format, setFormat] = useState("");
    const [eventInput, setEventInput] = useState({
        eventName: "",
        description: "",
        eventDate: "",
        startTime: "",
        endTime: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        postcode: "",
        eventURL: "",
        price: 0,
    });
    const [addEventErrorMsg, setAddEventErrorMsg] = useState("");
    const [inPerson, setInPerson] = useState(false);
    const [online, setOnline] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    const isValidUrl = (urlString) => {
        var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
        return regex.test(urlString);
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setEventInput({
            ...eventInput,
            [name]: value
        })
    }

    const getEvent = async (eid) => {
        const res = await axios.post("/api/events/findEventById", { id: eid })
        if (res.data.message) {
            console.log(res.data.message);
        } else {
            const data = res.data[0]

            if (data.format === "Online") {
                setOnline(true);
                setFormat(data.format);

                setEventInput({
                    ...eventInput,
                    eventName: data.eventName,
                    description: data.description,
                    eventDate: data.eventDate.split("T")[0],
                    startTime: data.startTime,
                    endTime: data.endTime,
                    addressLine1: "",
                    addressLine2: "",
                    city: "",
                    postcode: "",
                    eventURL: data.eventURL,
                    price: data.price,
                })
            }

            if (data.format === "In Person") {
                setInPerson(true)
                setFormat(data.format)

                setEventInput({
                    ...eventInput,
                    eventName: data.eventName,
                    description: data.description,
                    eventDate: data.eventDate.split("T")[0],
                    startTime: data.startTime,
                    endTime: data.endTime,
                    addressLine1: data.location.addressLine1,
                    addressLine2: data.location.addressLine2,
                    city: data.location.city,
                    postcode: data.location.postcode,
                    eventURL: data.eventURL,
                    price: data.price,
                })
            }
        }
    }

    const checkErrors = async () => {
        const { eventName, description, eventDate, startTime, endTime, eventURL } = eventInput;

        if (!isValidUrl(eventURL)) setAddEventErrorMsg("Please ensure you have entered a valid event details URL");

        if (format === "") setAddEventErrorMsg("Please ensure you have selected a format");

        if (endTime === "") setAddEventErrorMsg("Please ensure you have selected an end time");

        if (startTime === "") setAddEventErrorMsg("Please ensure you have selected a start time");

        if (eventDate === "") setAddEventErrorMsg("Please ensure you have selected a date for your event");

        if (description.length < 1) setAddEventErrorMsg("Please ensure you have a description for your event");

        if (eventName.length < 1) setAddEventErrorMsg("Please ensure you have a clear and descriptive event name");
    }

    const handleSetOnlineTrue = () => {
        setOnline(true)
        setInPerson(false)
        setFormat("Online")
        setEventInput({
            ...eventInput,
            addressLine1: "",
            addressLine2: "",
            city: "",
            postcode: "",
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        checkErrors();

        const { eventName, description, eventDate, startTime, endTime, addressLine1, addressLine2, city, postcode, eventURL, price } = eventInput;

        if (eventName.length >= 1 && description.length >= 1 && eventDate && startTime && endTime && format !== "" && isValidUrl(eventURL)) {
            setUpdateLoading(true);
            setAddEventErrorMsg("");

            const date = new Date(eventDate).toISOString();
            const event = {
                organisationName: userStateValue.name,
                eventName: eventName,
                description: description,
                eventDate: date,
                startTime: startTime,
                endTime: endTime,
                format: format,
                location: {
                    addressLine1: addressLine1,
                    addressLine2: addressLine2,
                    city: city,
                    postcode: postcode,
                },
                eventURL: eventURL,
                price: Number(price),
            }

            try {
                const res = await axios.put("/api/events/updateEvent", { id: router.query.eid, updatedEvent: event });
                if (res.data.message === "Success!") {
                    router.push(`/user/${userStateValue.id}`);
                }
                setUpdateLoading(false);
            } catch (error) {
                console.log(error);
                setServerError(true);
                setUpdateLoading(false);
            }
            setUpdateLoading(false);
        }
    }

    useEffect(() => {
        const { eid } = router.query

        try {
            if (eid) {
                getEvent(eid)
            }
        } catch (error) {
            console.log(error)
        }

    }, [router.query])

    return (
        <div className="max-w-7xl py-10 md:py-12 lg:py-14 md:mx-auto">

            {userStateValue.name && (
                <>
                    <div>
                        <h1 className="text-center text-xl md:text-2xl lg:text-3xl font-medium tracking-wider">Hey {userStateValue.name}</h1>
                        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-medium tracking-wider pt-6 pb-12">Edit your event</h1>
                    </div>
                    <form className="w-11/12 md:w-4/5 lg:w-2/3 mx-auto flex flex-col gap-6 md:gap-8 bg-white text-gray-700 py-6 md:py-14 px-8 md:px-12 rounded-xl text-lg shadow-lg">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="eventName"
                                className="font-medium text-gray-500"
                            >
                                Event Name*
                            </label>
                            <input
                                className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                id="eventName"
                                name="eventName"
                                type="text"
                                placeholder="A Queer Event"
                                value={eventInput.eventName}
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="description"
                                className="font-medium text-gray-500"
                            >
                                Brief Description*
                            </label>
                            <textarea
                                className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                id="description"
                                name="description"
                                rows={5}
                                placeholder="A brief but queer description"
                                value={eventInput.description}
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="eventDate"
                                className="font-medium text-gray-500"
                            >
                                Date of Event*
                            </label>
                            <input
                                className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                id="eventDate"
                                name="eventDate"
                                type="date"
                                value={eventInput.eventDate}
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-10">
                            <div className="w-1/2 flex flex-col gap-2">
                                <label
                                    htmlFor="startTime"
                                    className="font-medium text-gray-500"
                                >
                                    Start Time*
                                </label>
                                <input
                                    className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                    id="startTime"
                                    name="startTime"
                                    type="time"
                                    value={eventInput.startTime}
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                            <div className="w-1/2 flex flex-col gap-2">
                                <label
                                    htmlFor="endTime"
                                    className="font-medium text-gray-500"
                                >
                                    End Time*
                                </label>
                                <input
                                    className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                    id="endTime"
                                    name="endTime"
                                    type="time"
                                    value={eventInput.endTime}
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <p className="font-medium text-gray-500">The event is:*</p>

                                <div className="flex flex-row gap-6">
                                    {inPerson ? (
                                        <p className="w-fit border rounded-lg py-1 px-3.5 md:py-2 md:px-4 bg-white border-gray-700 cursor-pointer"
                                            onClick={() => { setInPerson(false), setOnline(false), setFormat("") }}
                                        >
                                            In Person
                                        </p>
                                    ) : (
                                        <p className="w-fit border rounded-lg py-1 px-3.5 md:py-2 md:px-4 shadow-inner bg-gray-100 cursor-pointer"
                                            onClick={() => { setInPerson(true), setOnline(false), setFormat("In Person") }}
                                        >
                                            In Person
                                        </p>
                                    )}

                                    {online ? (
                                        <p className="w-fit border rounded-lg py-1 px-5 md:py-2 md:px-4 bg-white border-gray-700 cursor-pointer"
                                            onClick={() => { setOnline(false), setInPerson(false), setFormat("") }}
                                        >
                                            Online
                                        </p>
                                    ) : (
                                        <p className="w-fit border rounded-lg py-1 px-5 md:py-2 md:px-4 shadow-inner bg-gray-100 cursor-pointer"
                                            onClick={handleSetOnlineTrue}
                                        >
                                            Online
                                        </p>
                                    )}

                                </div>
                            </div>

                            {inPerson &&
                                <div className="flex flex-col gap-4 pt-6">
                                    <label
                                        className="font-medium text-gray-500"
                                    >
                                        Address*
                                    </label>
                                    <input
                                        className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                        id="addressLine1"
                                        name="addressLine1"
                                        type="text"
                                        placeholder="Line 1 of Address"
                                        value={eventInput.addressLine1}
                                        onChange={handleInput}
                                        required
                                    />
                                    <input
                                        className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                        id="addressLine2"
                                        name="addressLine2"
                                        type="text"
                                        placeholder="Line 2 of Address"
                                        value={eventInput.addressLine2}
                                        onChange={handleInput}
                                    />
                                    <div className="flex flex-row gap-6 md:gap-10">
                                        <input
                                            className="w-1/2 border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                            id="city"
                                            name="city"
                                            type="text"
                                            placeholder="Town/City"
                                            value={eventInput.city}
                                            onChange={handleInput}
                                            required
                                        />
                                        <input
                                            className="w-1/2 border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                            id="postcode"
                                            name="postcode"
                                            type="text"
                                            placeholder="Postcode"
                                            value={eventInput.postcode}
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="eventURL"
                                className="font-medium text-gray-500"
                            >
                                Link to event details or registration*
                            </label>
                            <input
                                className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                id="eventURL"
                                name="eventURL"
                                type="url"
                                placeholder="Event Details URL"
                                value={eventInput.eventURL}
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="price"
                                className="font-medium text-gray-500"
                            >
                                Price*
                            </label>
                            <div className="flex flex-row items-center gap-2">
                                <div className="flex flex-row items-center gap-2">
                                    <p className="text-lg px-1 font-medium text-gray-500">£</p>
                                    <input
                                        className="w-4/5 border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                        id="price"
                                        name="price"
                                        type="number"
                                        min={0}
                                        placeholder={5}
                                        value={eventInput.price}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                                <p className="w-full text-gray-500 text-sm sm:text-lg pl-2">Enter 0 if event is free.</p>
                            </div>
                        </div>

                        {addEventErrorMsg && <p className="text-center text-red-500">{addEventErrorMsg}. If we've got this wrong, please <Link href="https://forms.gle/iGrrnA5tLXuEHjFR7" target="_blank" rel="noopener noreferrer" className="underline">let us know</Link>.</p>}

                        {serverError && <p className="text-center text-red-500">We cannot add your event at this time. Please <Link href="https://forms.gle/iGrrnA5tLXuEHjFR7" target="_blank" rel="noopener noreferrer" className="underline">contact us</Link>.</p>}

                        <div className="mx-auto">
                            {updateLoading ? (
                                <div className="flex flex-row items-center gap-4 w-fit mx-auto text-indigo-500 border border-indigo-500 tracking-wide rounded-lg py-3 px-6 my-4 md:mt-6 text-sm md:text-base lg:text-lg font-semibold hover:opacity-90 ease-linear transition-all duration-150">
                                    <Spinner />
                                    <p>Updating event...</p>
                                </div>
                            ) : (
                                <button
                                    className="w-fit mx-auto bg-indigo-500 text-white tracking-wider rounded-lg py-3 px-8 my-4 md:mt-6 font-semibold hover:opacity-90 ease-linear transition-all duration-150"
                                    onClick={handleUpdate}
                                >
                                    Update Event
                                </button>
                            )}
                        </div>
                    </form>
                </>
            )}

        </div>
    )
}

export default EditEventForm