import { menuModalState } from "../../atoms/menuModal";
import { authModalState } from "@/atoms/authModal";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../../atoms/userAtom";
import { useRouter } from "next/router";
import Link from "next/link";

const MenuModal = () => {
    const router = useRouter();
    const setAuthModal = useSetRecoilState(authModalState);
    const [menuModal, setMenuModal] = useRecoilState(menuModalState);
    const [userStateValue, setUserStateValue] = useRecoilState(userState);

    const handleLogIn = () => {
        if (!userStateValue.name) {
            setAuthModal({
                open: true,
            });
        }
    }

    const handleSignUp = () => {
        router.push("/signup")
        setMenuModal({ open: false })
    }

    const handleLogOut = () => {
        setUserStateValue({
            name: "",
            email: "",
        })
        router.replace("/");
        setMenuModal({ open: false });
    }


    return (
        <>
            {menuModal.open &&
                <ul className="w-32 md:w-48 lg:w-80 absolute top-10 md:top-14 lg:top-16 right-0 flex flex-col bg-white border border-gray-700 rounded-xl tracking-wide lg:tracking-wider">
                    {!userStateValue.name &&
                        <>
                            <li className="rounded-t-xl border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer"
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </li>
                            {/* <li className="md:hidden border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer"
                                onClick={handleLogIn}
                            >
                                Log In
                            </li> */}
                            <li className="border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer" onClick={() => setMenuModal({ open: false })}>
                                <Link href="/community/guidelines">See Our Guidelines</Link>
                            </li>
                        </>
                    }

                    {userStateValue.name &&
                        <>
                            <li className="border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer" onClick={() => setMenuModal({ open: false })}>
                                <Link href="/add-event">Add Event</Link>
                            </li>
                            <li className="border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer" onClick={() => setMenuModal({ open: false })}>
                                <Link href="/community/guidelines">See Our Guidelines</Link>
                            </li>
                            <li className="border-t border-gray-400 mx-4 md:mx-6 lg:mx-8 xl:mx-10 py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer"
                                onClick={handleLogOut}
                            >
                                Log Out
                            </li>
                        </>
                    }
                </ul>
            }
        </>
    )
}

export default MenuModal