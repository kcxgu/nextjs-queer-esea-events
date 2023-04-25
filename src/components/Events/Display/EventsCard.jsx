import { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import Link from "next/link";
import ReportModal from "@/components/Modals/ReportModal";
import { BsShareFill } from "react-icons/bs";

const EventsCard = ({ id, organisationName, eventName, description, format, addressLine1, addressLine2, city, postcode, eventDate, startTime, endTime, price, eventURL }) => {

    const [openModal, setOpenModal] = useState(false);
    const [shareSuccess, setShareSuccess] = useState(false);

    const date = new Date(eventDate).toLocaleDateString("en-UK", { day: "numeric", month: "long", year: "numeric" })

    const titleCap = (item) => {
        let capitaliseText = item.split(" ");
        for (let i = 0; i < capitaliseText.length; i++) {
            capitaliseText[i] = capitaliseText[i][0]?.toUpperCase() + capitaliseText[i].substring(1);
        }
        const text = capitaliseText.join(" ").trim();
        return text;
    }

    const capitalise = (item) => {
        return item.charAt(0).toUpperCase() + item.slice(1)
    }

    const handleShare = () => {

        const shareData = {
            title: "Hey, want to come to this?",
            text: { eventName },
            url: { eventURL },
        }

        if (navigator.share && navigator.canShare(shareData)) {
            navigator
                .share(shareData)
                .then(() => {
                    console.log("Successfully shared");
                    setShareSuccess(true)
                    setTimeout(() => {
                        setShareSuccess(false)
                    }, 4000)
                })
                .catch((error) => {
                    console.error("Something went wrong", error);
                    setShareSuccess(false)
                });
        } else {
            try {
                navigator.clipboard.writeText(`Hey, want to come to this? ${eventName}, ${eventURL}`)
                setShareSuccess(true)
                setTimeout(() => {
                    setShareSuccess(false)
                }, 5000)
            } catch (error) {
                setShareSuccess(false)
            }
        }
    }


    return (
        <div className="w-full max-w-3xl lg:max-w-4xl px-6 mb-10">
            <div className="md:flex md:flex-row">
                <div className="hidden md:block border-r border-gray-300 flex-row items-start mr-10">
                    <div className="text-center text-lg lg:text-xl text-gray-500 px-8">{new Date(eventDate).toLocaleString("default", { weekday: "short", day: "numeric", month: "short" })}</div>
                </div>

                <div className="w-full bg-white py-12 px-8 md:px-12 rounded-xl shadow-lg shadow-gray-200">
                    <div className="flex flex-row justify-between items-center gap-4 py-2 md:pb-4">
                        {shareSuccess ? (
                            <div className="flex flex-row items-center text-gray-800 gap-2 tracking-wide cursor-pointer hover:opacity-80">
                                <p className="md:text-lg animate-bounce">Copied!</p>
                            </div>

                        ) : (
                            <div className="flex flex-row items-center text-fuchsia-300 gap-2 tracking-wide cursor-pointer hover:text-fuchsia-400" onClick={handleShare}>
                                <BsShareFill className="text-sm" />
                                <p className="lg:text-lg">(Share)</p>
                            </div>
                        )}

                        <div className="text-right font-medium text-xl lg:text-2xl tracking-wider">
                            {price === 0 ? (
                                <p className="text-orange-600">FREE</p>
                            ) : (
                                <p className="text-blue-500">£{price.toFixed(2)}</p>
                            )}
                        </div>
                    </div>
                    <div className="text-slate-700 font-medium text-lg py-2 tracking-wide">
                        <div className="w-full flex flex-col md:flex-row md:items-center md:gap-0.5 justify-between pb-1 md:pb-2">
                            <p className="text-lg md:text-xl md:mr-4">{titleCap(eventName)}</p>

                            {openModal ? (
                                <>
                                    <div className="flex flex-row items-center gap-2 py-2 cursor-pointer hover:opacity-90"
                                        onClick={() => setOpenModal(false)}
                                    >
                                        <p className="text-gray-500 text-sm">See description</p>
                                        <AiOutlineUp className="text-sm" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-row items-center gap-2 py-2 text-blue-400 text-sm cursor-pointer hover:text-blue-500"
                                        onClick={() => setOpenModal(true)}
                                    >
                                        <p>See description</p>
                                        <AiOutlineDown />
                                    </div>
                                </>
                            )}

                        </div>
                        {openModal &&
                            <p className="pb-2 md:pt-4 md:pb-8">{capitalise(description)}</p>
                        }

                        <div className="flex flex-col md:flex-row items-start justify-between">
                            {format === "In Person" &&
                                <div className="text-gray-500 pb-2 md:pb-4">
                                    <p>{titleCap(addressLine1)}</p>
                                    {addressLine2 && <p>{titleCap(addressLine2)}</p>}
                                    <p>{capitalise(city)}</p>
                                    <p>{titleCap(postcode)}</p>
                                </div>
                            }

                            {format === "Online" &&
                                <div className="text-gray-500 pb-2 md:pb-4">
                                    <p>{format}</p>
                                </div>
                            }

                            <div className="flex flex-col gap-1 md:text-xl">
                                <p>{startTime}-{endTime}</p>
                                <p>{date}</p>
                                <p>{titleCap(organisationName)}</p>
                            </div>
                        </div>
                    </div>
                    <Link href={eventURL} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-2 md:hover:underline-offset-4 hover:decoration-indigo-400">
                        <p className="text-center text-slate-900 py-2 md:py-4 break-all">{eventURL}</p>
                    </Link>
                    <ReportModal
                        id={id}
                        organisationName={organisationName}
                        eventName={eventName}
                        description={eventName}
                        eventURL={eventURL}
                    />
                </div>
            </div>
        </div>
    )
}

export default EventsCard