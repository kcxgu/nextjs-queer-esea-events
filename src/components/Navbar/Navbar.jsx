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
                                <div className="bg-white rounded-full p-3 cursor-pointer hover:bg-indigo-400 hover:text-white">
                                    <MdAdd
                                        className="text-xl"
                                        onClick={handleAddEvent}
                                    />
                                </div>
                            )}

                            {menuOpen ? (
                                <FiX className="text-2xl cursor-pointer" onClick={() => setMenuOpen(false)} />
                            ) : (
                                <FiMenu className="text-2xl cursor-pointer" onClick={() => setMenuOpen(true)} />
                            )}
                        </div>

                        {menuOpen && userStateValue.name &&
                            <ul className="absolute top-10 right-0 flex flex-col gap-2 bg-white rounded-xl">
                                <li className="border rounded-lg py-3 w-32 text-center font-medium text-lg hover:opacity-80 cursor-pointer"
                                    onClick={handleLogOut}
                                >
                                    Log Out
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </div >
        </>
    )
}

export default Navbar