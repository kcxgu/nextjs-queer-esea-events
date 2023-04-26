import { useState } from "react";
import { BsFlag } from "react-icons/bs";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Spinner from "../Loader/Spinner";

const ReportModal = ({ id, organisationName, eventName, description, eventURL }) => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [reason, setReason] = useState("");
    const [reportModal, setReportModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [serverError, setServerError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleGuidelines = () => {
        router.push("/community/guidelines")
    }

    const handleEmailAddress = (e) => {
        setEmail(e.target.value);
        if (email.length >= 8) setErrorMsg("")
    }

    const handleReason = (e) => {
        setReason(e.target.value);
        if (reason != "") setErrorMsg("")
    }

    const handleReport = async () => {
        if (reason.length > 5) {

            const reportComment = `<strong>Reporter Email:</strong> ${email} <br /><br /><strong>Reason:</strong> ${reason} <br /><br /><strong>Event ID:</strong> ${id} <br /><br /><strong>Organisation/Individual Name:</strong> ${organisationName} <br /><br /><strong>Event Name:</strong> ${eventName} <br /><br /><strong>Event Description:</strong> ${description}<br /><br /><strong>Event URL:</strong> ${eventURL}`

            try {
                setLoading(true);
                const res = await axios.post("/api/sendEmail/emailReport", { message: reportComment })

                if (res.data.error === "") {
                    setSuccess(true)
                } else {
                    setServerError(true)
                }

                setErrorMsg("")
                setServerError(false)

            } catch (error) {
                setServerError(true)
            }
            setLoading(false);
        } else {
            setErrorMsg("Please enter a valid reason to continue.")
        }
    }

    return (
        <>
            <div className="relative cursor-pointer text-gray-400 hover:text-gray-500" onClick={() => setReportModal(true)}>
                <div className="float-right flex flex-row items-center gap-2 tracking-wider">
                    <BsFlag />
                    <p>(Report)</p>
                </div>
            </div>

            {reportModal &&
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-gray-100/40 focus:outline-none">
                    <div className="relative max-w-xl mx-auto w-11/12 md:w-2/3 lg:w-1/2 my-5">
                        <div className="border rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="px-8 pt-10 pb-8 border-b border-solid border-slate-200">
                                <div className="flex flex-row items-center gap-3.5">
                                    <BsFlag className="text-xl" />
                                    <p className="text-xl md:text-2xl font-medium text-gray-600">
                                        Report This Event
                                    </p>
                                </div>
                            </div>
                            <div className="relative px-8 py-8 flex-auto">
                                {success ? (
                                    <>
                                        <div className="w-full md:px-4 flex flex-col items-center justify-center mx-auto gap-4 lg:gap-6 text-center lg:text-lg tracking-wider py-4">
                                            <p className="text-emerald-600 md:text-xl md:pb-2">We've logged your report!</p>
                                            <p>Thank you for being a hero and helping us to identify problematic events.</p>
                                            <p>We'll check your report as soon as we can to see if the event breached <span className="text-indigo-500 hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-indigo-500 cursor-pointer" onClick={handleGuidelines}
                                            >our guidelines</span>.</p>
                                            <p>And if they did, we'll take action immedately.</p>
                                            <div className="w-full flex justify-center md:justify-end pt-6 border-t mt-6 md:mt-10">
                                                <button
                                                    className="border border-gray-300 rounded-xl font-bold uppercase px-6 py-3 text-xs md:text-sm outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 hover:bg-gray-200"
                                                    type="button"
                                                    onClick={() => setReportModal(false)}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-full md:px-4 flex flex-col items-center justify-center mx-auto lg:mb-6">
                                            <div className="pb-4 lg:pb-6 xl:text-lg text-justify text-gray-600 tracking-wide">
                                                <p className="pb-2">Thank you for looking after the community!</p>
                                            </div>
                                            <div className="w-full mb-6">
                                                <label className="block tracking-wide xl:text-lg font-medium text-gray-700 mb-3" htmlFor="email">
                                                    Email Address*
                                                </label>
                                                <input
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 xl:text-lg border border-gray-200 rounded-lg py-3 px-4 leading-normal tracking-wide focus:outline-none focus:bg-white focus:border-gray-500"
                                                    name="email"
                                                    id="email"
                                                    type="email"
                                                    placeholder="example@email.com"
                                                    onChange={handleEmailAddress}
                                                    required />
                                            </div>
                                            <div className="w-full mb-6">
                                                <label className="block tracking-wide xl:text-lg font-medium text-gray-700 mb-3" htmlFor="report">
                                                    Reason*
                                                </label>
                                                <textarea
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 xl:text-lg border border-gray-200 rounded-lg py-3 px-4 leading-normal tracking-wide focus:outline-none focus:bg-white focus:border-gray-500"
                                                    name="report"
                                                    id="report"
                                                    rows={3}
                                                    placeholder="Why would you like to report this event?"
                                                    onChange={handleReason}
                                                    required />
                                            </div>
                                            {errorMsg && <p className="text-center text-red-500 pb-1">{errorMsg}</p>}
                                            {serverError && <p className="text-center text-red-500">We are experiencing a connection error, try contacting us <Link href="" target="_blank" rel="noopener noreferrer preload"><span className="text-blue-600 underline underline-offset-2 decoration-2 decoration-blue-400 hover:opacity-80">here</span></Link> instead.</p>}
                                        </div>
                                        <div className="flex flex-row items-center justify-between pt-6 border-t border-solid border-slate-200">
                                            <button
                                                className="border border-gray-300 rounded-xl font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 hover:bg-gray-200"
                                                type="button"
                                                onClick={() => setReportModal(false)}
                                            >
                                                Close
                                            </button>
                                            {loading ? (
                                                <div className="flex flex-row items-center gap-2 lg:gap-3 text-gray-600">
                                                    <Spinner />
                                                    <p>Sending...</p>
                                                </div>
                                            ) : (
                                                <button
                                                    className="bg-black text-white rounded-xl font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 hover:opacity-80"
                                                    onClick={handleReport}
                                                >
                                                    Report
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div >
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ReportModal