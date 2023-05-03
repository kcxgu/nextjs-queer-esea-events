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
                toAdd: true,
            });
        } else {
            router.push("/add-event")
        }
        setMenuModal({ open: false })
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
        setMenuModal({ open: false })
    }

    return (
        <div>
            <AuthModal />
            <div className="w-full px-6 sm:px-10 py-4 border-b border-gray-100">
                <div className="max-w-7xl flex flex-row items-center justify-between mx-auto">
                    <Link href="/" onClick={handleCloseMenuModal}>
                        <p className="tracking-wide text-lg font-medium md:text-xl">Hey Queer Asians</p>
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
        </div>
    )
}

export default Navbar