import { useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/userAtom";
import axios from "axios";

const AddEventForm = ({ setUpdate }) => {
    const router = useRouter();
    const [userStateValue, setUserStateValue] = useRecoilState(userState);
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
    })
    const [addEventErrorMsg, setAddEventErrorMsg] = useState("");

    const handleInput = (e) => {
        const { name, value } = e.target;
        setEventInput({
            ...eventInput,
            [name]: value
        })
    }

    const checkErrors = () => {
        const { eventName, description, eventDate, startTime, endTime, addressLine1, city, postcode, eventURL } = eventInput;

        if (eventName.length < 4) setAddEventErrorMsg("Please ensure all fields are completed and are valid");

        if (description.length < 10) setAddEventErrorMsg("Please ensure all fields are completed and are valid");

        if (!eventDate || !startTime || !endTime) setAddEventErrorMsg("Please ensure all fields are completed and are valid");

        if (addressLine1.length < 4) {
            setAddEventErrorMsg("Please ensure all fields are completed and are valid")
        }
        if (city.length < 2) {
            setAddEventErrorMsg("Please ensure all fields are completed and are valid")
        }
        if (postcode.length < 6) {
            setAddEventErrorMsg("Please ensure all fields are completed and are valid")
        }
        if (eventURL.length < 8) {
            setAddEventErrorMsg("Please ensure all fields are completed and are valid")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        checkErrors();

        const { eventName, description, eventDate, startTime, endTime, addressLine1, addressLine2, city, postcode, eventURL, price } = eventInput;

        if (eventName.length >= 4 && description.length >= 10 && eventDate && startTime && endTime && addressLine1.length >= 4 && city.length >= 2 && postcode.length >= 6 && eventURL.length >= 8 && price) {
            setAddEventErrorMsg("");
            const date = new Date(eventDate).toISOString();
            const event = {
                organisationName: userStateValue.name,
                eventName: eventName,
                description: description,
                eventDate: date,
                startTime: startTime,
                endTime: endTime,
                location: {
                    addressLine1: addressLine1,
                    addressLine2: addressLine2,
                    city: city,
                    postcode: postcode,
                },
                eventURL: eventURL,
                price: price,
            }

            try {
                const res = await axios.post("/api/events/events", event);
                if (res.status === 201) {
                    setUpdate(true);
                    router.push("/");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <div className="max-w-7xl py-10 md:py-12 lg:py-14 md:mx-auto">

            {userStateValue.name && (
                <>
                    <div>
                        <h1 className="text-center text-xl md:text-2xl lg:text-3xl font-medium tracking-wider">Hey {userStateValue.name}</h1>
                        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-medium tracking-wider pt-6 pb-12">Add a new event!</h1>
                    </div>
                    <form className="w-11/12 md:w-4/5 lg:w-2/3 mx-auto flex flex-col gap-6 md:gap-8 bg-white text-gray-700 py-6 md:py-14 px-8 md:px-12 rounded-xl text-lg shadow-lg">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="eventName"
                                className="font-medium text-gray-500"
                            >
                                Event Name
                            </label>
                            <input
                                className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                id="eventName"
                                name="eventName"
                                type="text"
                                placeholder="A Queer Event"
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="description"
                                className="font-medium text-gray-500"
                            >
                                Brief Description
                            </label>
                            <textarea
                                className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                id="description"
                                name="description"
                                rows={5}
                                placeholder="A brief but queer description"
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="eventDate"
                                className="font-medium text-gray-500"
                            >
                                Date of Event
                            </label>
                            <input
                                className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                id="eventDate"
                                name="eventDate"
                                type="date"
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
                                    Start Time
                                </label>
                                <input
                                    className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                    id="startTime"
                                    name="startTime"
                                    type="time"
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                            <div className="w-1/2 flex flex-col gap-2">
                                <label
                                    htmlFor="endTime"
                                    className="font-medium text-gray-500"
                                >
                                    End Time
                                </label>
                                <input
                                    className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                    id="endTime"
                                    name="endTime"
                                    type="time"
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <label
                                className="font-medium text-gray-500"
                            >
                                Address
                            </label>
                            <input
                                className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                id="addressLine1"
                                name="addressLine1"
                                type="text"
                                placeholder="Line 1 of Address"
                                onChange={handleInput}
                                required
                            />
                            <input
                                className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                id="addressLine2"
                                name="addressLine2"
                                type="text"
                                placeholder="Line 2 of Address"
                                onChange={handleInput}
                            />
                            <div className="flex flex-row gap-6 md:gap-10">
                                <input
                                    className="w-1/2 border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                    id="city"
                                    name="city"
                                    type="text"
                                    placeholder="Town/City"
                                    onChange={handleInput}
                                    required
                                />
                                <input
                                    className="w-1/2 border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                    id="postcode"
                                    name="postcode"
                                    type="text"
                                    placeholder="Postcode"
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="eventURL"
                                className="font-medium text-gray-500"
                            >
                                Link to event details or registration
                            </label>
                            <input
                                className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner bg-gray-100 focus:bg-white"
                                id="eventURL"
                                name="eventURL"
                                type="url"
                                placeholder="Event Details URL"
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="price"
                                className="font-medium text-gray-500"
                            >
                                Price
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
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                                <p className="w-full text-gray-500 text-sm sm:text-lg pl-2">Enter 0 if event is free.</p>
                            </div>
                        </div>
                        {addEventErrorMsg && <p className="text-center text-red-500">{addEventErrorMsg}</p>}
                        <button
                            className="w-fit mx-auto bg-emerald-700 text-white tracking-wider rounded-lg py-3 px-8 my-4 md:mt-6 font-semibold hover:opacity-90"
                            onClick={handleSubmit}
                        >
                            Add Event
                        </button>
                    </form>
                </>
            )}

        </div>
    )
}

export default AddEventForm