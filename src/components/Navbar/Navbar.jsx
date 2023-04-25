import { MdAdd } from "react-icons/md";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModal";
import { menuModalState } from "../../atoms/menuModal";
import { userState } from "../../atoms/userAtom";
import { FaUserCircle } from "react-icons/fa";
import { FiX, FiMenu } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthModal from "../Modals/AuthModal";
import MenuModal from "../Modals/MenuModal";

const Navbar = () => {
    const router = useRouter();
    const setAuthModalState = useSetRecoilState(authModalState);
    const [menuModal, setMenuModal] = useRecoilState(menuModalState);
    const [userStateValue, setUserStateValue] = useRecoilState(userState);

    const handleAddEvent = () => {
        if (!userStateValue.name) {
            setAuthModalState({
                open: true,
            });
        } else {
            router.push("/add-event")
        }
        setMenuModal({ open: false })
    }

    const handleLogIn = () => {
        if (!userStateValue.name) {
            setAuthModalState({
                open: true,
            });
            setMenuModal({ open: false })
        }
    }

    const handleOpenMenuModal = () => {
        setMenuModal({ open: true })
    }
    const handleCloseMenuModal = () => {
        setMenuModal({ open: false })
    }

    const handleUser = () => {
        if (userStateValue.id) {
            router.push(`/user/${userStateValue.id}`);
        } else {
            setAuthModalState({
                open: true,
            });
        }
    }

    return (
        <>
            <AuthModal />
            <div className="w-full px-6 sm:px-10 py-4 md:py-6 border-b border-gray-200">
                <div className="max-w-7xl flex flex-row items-center justify-between mx-auto">
                    <Link href="/" onClick={() => setMenuModal({ open: false })}>
                        <p className="tracking-wide text-lg font-medium md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-400">Queer ESEA Events</p>
                    </Link>
                    <div className="relative">
                        <div className="flex flex-row items-center gap-3 lg:gap-4 cursor-pointer">
                            {userStateValue.name ? (
                                <>
                                    <div className="hover:opacity-70" onClick={handleUser}>
                                        <FaUserCircle className="text-2xl lg:text-3xl" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* <button className="hidden md:block bg-violet-400 text-white py-2 px-4 rounded-lg tracking-wider text-lg font-semibold hover:opacity-80"
                                        onClick={handleLogIn}
                                    >
                                            Log In
                                        </button> */}

                                    <div className="bg-white rounded-full p-3 hover:bg-indigo-400 hover:text-white text-xl lg:text-3xl"
                                        onClick={handleAddEvent}
                                    >
                                        <MdAdd />
                                    </div>
                                </>
                            )}

                            {menuModal.open ? (
                                <FiX className="text-2xl cursor-pointer hover:text-violet-600" onClick={handleCloseMenuModal} />
                            ) : (
                                <FiMenu className="text-2xl cursor-pointer hover:text-violet-600" onClick={handleOpenMenuModal} />
                            )}
                        </div>
                        <MenuModal />
                    </div>
                </div>
            </div >
        </>
    )
}

export default Navbar