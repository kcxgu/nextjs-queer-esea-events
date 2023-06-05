import { menuModalState } from "../../atoms/menuModal";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../../atoms/userAtom";
import { useRouter } from "next/router";
import { authModalState } from "@/atoms/authModal";
import Link from "next/link";

const MenuModal = () => {
    const router = useRouter();
    const setAuthModal = useSetRecoilState(authModalState);
    const [menuModal, setMenuModal] = useRecoilState(menuModalState);
    const [userStateValue, setUserStateValue] = useRecoilState(userState);

    const handleLogIn = async (e) => {
        setAuthModal({
            open: true,
            toAdd: false,
        });
        setMenuModal({ open: false });
    }

    const handleSignUp = () => {
        router.push("/signup");
        setMenuModal({ open: false });
    }

    const handleLogOut = () => {
        setUserStateValue({
            name: "",
            email: "",
        })
        localStorage.clear();
        router.replace("/");
        setMenuModal({ open: false });
    }

    const handleAddEvent = () => {
        if (!userStateValue.name) {
            setAuthModal({
                open: true,
                toAdd: true,
            });
        } else {
            router.push("/add-event")
        }
        setMenuModal({ open: false })
    }

    return (
        <>
            {menuModal.open &&
                <ul className="w-32 md:w-48 lg:w-80 absolute top-10 md:top-14 lg:top-16 right-0 z-50 flex flex-col bg-white border border-gray-700 rounded-xl tracking-wide lg:tracking-wider">
                    {!userStateValue.name &&
                        <>
                            <li className="rounded-t-xl border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer"
                                onClick={handleLogIn}
                            >
                                Log In
                            </li>
                            <li className="rounded-t-xl border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer"
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </li>
                        </>
                    }
                    <Link href="/add-event">
                        <li className="border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer" onClick={handleAddEvent}>
                            Add Event
                        </li>
                    </Link>
                    <Link href="/our-stories" className="tracking-wide lg:text-lg">
                        <li className="border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer" onClick={() => setMenuModal({ open: false })}>
                            Read Our Stories
                        </li>
                    </Link>
                    <Link href="/community/guidelines">
                        <li className="border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer" onClick={() => setMenuModal({ open: false })}>
                            See Our Guidelines
                        </li>
                    </Link>
                    <Link href="/community/forum">
                        <li className="border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer" onClick={() => setMenuModal({ open: false })}>
                            Join Our Forum
                        </li>
                    </Link>
                    <Link href="/community/support-us">
                        <li className="border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer" onClick={() => setMenuModal({ open: false })}>
                            Support Us
                        </li>
                    </Link>
                    {userStateValue.name &&
                        <li className="border-t border-gray-400 mx-4 md:mx-6 lg:mx-8 xl:mx-10 py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer"
                            onClick={handleLogOut}
                        >
                            Log Out
                        </li>
                    }
                </ul>
            }
        </>
    )
}

export default MenuModal