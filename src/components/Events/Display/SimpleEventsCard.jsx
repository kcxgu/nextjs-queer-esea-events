import { useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteSweep } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/router";

const SimpleEventsCard = ({ id, eventName, eventDate, price }) => {
    const router = useRouter();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const toDate = (eventDate) => {
        const date = new Date(eventDate).toLocaleDateString("en-UK", { day: "numeric", month: "long", year: "numeric" })
        return date
    }

    const handleConfirmDelete = () => {
        setConfirmDelete(true);
    }

    const handleDelete = async () => {
        setConfirmDelete(false);
        setDeleteLoading(true);
        const res = await axios.post("/api/events/deleteEvent", { _id: id });
        if (res.data.message) {
            setDeleteLoading(false);
            setDeleted(true)
        }
    }

    return (
        <>
            {!deleted &&
                <div className="md:w-5/6 lg:w-full border rounded-lg py-4 md:py-6 my-4 px-4 md:px-5 tracking-wide">
                    <p className="font-medium">{eventName}</p>
                    <div className="flex flex-row justify-between pt-2">
                        <p className="text-gray-500">{toDate(eventDate)}</p>
                        {price === 0 ? <p className="text-orange-600 font-medium tracking-wider">Free</p> : <p className="text-blue-500  font-medium tracking-wider">£{price.toFixed(2)}</p>}
                    </div>
                    <div>
                        <div className="pt-2 flex flex-row justify-between text-gray-400 cursor-pointer text-base">
                            <div className="flex flex-row items-center gap-2">
                                <BsPencilSquare />
                                <p>(Edit)</p>
                            </div>
                            <>
                                {confirmDelete ? (
                                    <div className="motion-safe:animate-bounce flex flex-row items-center gap-2 hover:text-gray-500 "
                                        onClick={handleDelete}
                                    >
                                        <MdOutlineDeleteSweep className="text-2xl" />
                                        <p>Yes, delete</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-row items-center gap-2 hover:text-gray-500 "
                                        onClick={handleConfirmDelete}
                                    >
                                        <BsTrash />
                                        <p>(Delete)</p>
                                    </div>
                                )}
                            </>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SimpleEventsCard