import { useRecoilState } from "recoil";
import { userState } from "../../atoms/userAtom";
import { FaDiscord, FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import { BsCaretDownFill, BsCaretLeftFill, BsCaretUpFill } from "react-icons/bs";

const AccountDetails = () => {
    const [userStateValue, setUserStateValue] = useRecoilState(userState);
    const [accountModal, setAccountModal] = useState(false);
    console.log(userStateValue)
    const handleResetPassword = () => {

    }

    return (
        <div className="flex flex-col lg:flex-row pb-10">
            {accountModal ? (
                <div className="lg:hidden cursor-pointer" onClick={() => setAccountModal(false)}>
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-xl md:text-2xl lg:text-3xl">Your Account</h2>
                        <BsCaretUpFill className="lg:hidden text-xl" />
                    </div>
                </div>
            ) : (
                <div className="lg:hidden cursor-pointer" onClick={() => setAccountModal(true)}>
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-xl md:text-2xl lg:text-3xl">Your Account</h2>
                        <BsCaretDownFill className="lg:hidden text-xl" />
                    </div>
                </div>
            )}

            {accountModal ? (
                <div className="hidden lg:block ">
                    <div className="hidden lg:block cursor-pointer border-l-2 border-gray-800 pl-8" onClick={() => setAccountModal(false)}>
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-xl md:text-2xl lg:text-3xl">Your Account</h2>
                            <BsCaretUpFill className="lg:hidden text-xl" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="hidden lg:block pb-32">
                    <div className="hidden lg:block cursor-pointer hover:border-l-2 hover:border-gray-800 hover:pl-8" onClick={() => setAccountModal(true)}>
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-xl md:text-2xl lg:text-3xl">Your Account</h2>
                            <BsCaretUpFill className="lg:hidden text-xl" />
                        </div>
                    </div>
                </div>
            )}

            {accountModal &&
                <div className="lg:pl-24 xl:pl-32 lg:ml-16">
                    <div className="hidden lg:flex flex-row gap-2 items-center text-gray-700 tracking-wider cursor-pointer hover:text-black"
                        onClick={() => setAccountModal(false)}
                    >
                        <BsCaretLeftFill />
                        <p>Hide</p>
                    </div>
                    <p className="text-gray-700 py-3">Here's the information you have with us:</p>
                    <div className="py-4 flex flex-col gap-8">
                        <div className="w-full mx-auto flex flex-col justify-center">
                            <label
                                htmlFor="name"
                                className="text-gray-600 font-bold uppercase tracking-wide mb-2"
                            >
                                Name
                            </label>
                            <p className="pt-1 pb-4 text-gray-700">The name you would like to appear alongside any event you may want to share</p>
                            <input
                                className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                id="name"
                                name="name"
                                placeholder="BAQC ESEA"
                                value={userStateValue.name}
                                readOnly
                            />
                        </div>
                        <div className="w-full mx-auto flex flex-col justify-center">
                            <label
                                htmlFor="website"
                                className="text-gray-600 font-bold uppercase tracking-wide mb-2"
                            >
                                Official Website (if applicable)
                            </label>
                            <input
                                className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                id="website"
                                name="website"
                                placeholder="baqc-esea.tilda.ws"
                                value={userStateValue.website}
                                readOnly
                            />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label
                                htmlFor="email"
                                className="text-gray-600 font-bold uppercase tracking-wide mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                id="email"
                                name="email"
                                type="text"
                                placeholder="example@email.com"
                                autoComplete="example@email.com"
                                value={userStateValue.email}
                                readOnly
                            />
                        </div>
                        <div>
                            <p className="text-gray-600 font-bold uppercase tracking-wide mb-2">Password:</p>
                            <p className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500">***************</p>
                            <p className="pt-2" onClick={handleResetPassword}>Reset your password</p>
                        </div>
                        <div className="w-full mx-auto flex flex-col justify-center">
                            <p
                                className="text-gray-600 font-bold uppercase tracking-wide mb-4"
                            >
                                Social Media
                            </p>
                            <div className="flex flex-row gap-2 items-center pb-6">
                                <FaTwitter className="text-2xl mx-2" />
                                <input
                                    className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                    id="twitter"
                                    name="twitter"
                                    placeholder="https://twitter.com/CoursePilotCo"
                                    value={userStateValue.socialMedia.twitter || ""}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-row gap-2 items-center pb-6">
                                <FaInstagram className="text-2xl mx-2" />
                                <input
                                    className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                    id="instagram"
                                    name="instagram"
                                    placeholder="https://instagram.com/username"
                                    value={userStateValue.socialMedia.instagram || ""}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-row gap-2 items-center pb-6">
                                <FaFacebookSquare className="text-2xl mx-2" />
                                <input
                                    className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                    id="facebook"
                                    name="facebook"
                                    placeholder="https://facebook.com/username"
                                    value={userStateValue.socialMedia.facebook || ""}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <FaDiscord className="text-3xl mx-1.5" />
                                <input
                                    className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                    id="discord"
                                    name="discord"
                                    placeholder="https://discord.com/channels/username"
                                    value={userStateValue.socialMedia.discord || ""}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AccountDetails