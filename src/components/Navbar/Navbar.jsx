import { MdAdd } from "react-icons/md";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModal";
import { userState } from "../../atoms/userAtom";
import { FaUserCircle } from "react-icons/fa";
import { FiX, FiMenu } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthModal from "../Modals/AuthModal";
import { useState } from "react";

const Navbar = () => {
    const router = useRouter();
    const setAuthModalState = useSetRecoilState(authModalState);
    const [userStateValue, setUserStateValue] = useRecoilState(userState);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleAddEvent = () => {
        if (!userStateValue.name) {
            setAuthModalState({
                open: true,
            });
        } else {
            router.push("/add-event")
        }
    }

    const handleLogOut = () => {
        setUserStateValue({
            name: "",
            email: "",
        })
        router.push("/");
        setMenuOpen(false);
    }

    return (
        <>
            <AuthModal />
            <div className="w-full px-6 sm:px-10 py-4 md:py-6 border-b border-gray-200">
                <div className="max-w-7xl flex flex-row items-center justify-between mx-auto">
                    <Link href="/">
                        <p className="tracking-wide text-lg font-medium md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-400">Queer ESEA Events</p>
                    </Link>
                    <div className="relative">
                        <div className="flex flex-row items-center gap-3">
                            {userStateValue.name ? (
                                <>
                                    <div>
                                        <FaUserCircle className="text-2xl" />
                                    </div>
                                </>
                            ) : (
                                <div className="bg-white rounded-full p-3 cursor-pointer hover:bg-indigo-400 hover:text-white"
                                    onClick={handleAddEvent}
                                >
                                    <MdAdd className="text-xl" />
                                </div>
                            )}

                            {menuOpen ? (
                                <FiX className="text-2xl cursor-pointer hover:text-violet-600" onClick={() => setMenuOpen(false)} />
                            ) : (
                                <FiMenu className="text-2xl cursor-pointer hover:text-violet-600" onClick={() => setMenuOpen(true)} />
                            )}
                        </div>

                        {menuOpen &&
                            <ul className="w-32 md:w-48 lg:w-72 absolute top-10 md:top-12 right-0 flex flex-col bg-white border border-gray-700 rounded-xl">
                                <li className="border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer">
                                    <Link href="/add-event" onClick={() => setMenuOpen(false)}>Add event</Link>
                                </li>
                                <li className="border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer">
                                    See all queer organisations
                                </li>
                                {userStateValue.name &&
                                    <li className="py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer"
                                        onClick={handleLogOut}
                                    >
                                        Log Out
                                    </li>
                                }
                            </ul>
                        }
                    </div>
                </div>
            </div >
        </>
    )
}

export default Navbar