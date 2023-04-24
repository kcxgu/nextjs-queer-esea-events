import { menuModalState } from "../../atoms/menuModal"
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/userAtom";
import Link from "next/link";

const MenuModal = () => {
    const [authModalState, setAuthModalState] = useRecoilState(menuModalState);
    const [userStateValue, setUserStateValue] = useRecoilState(userState);

    const handleLogIn = () => {
        if (!userStateValue.name) {
            setAuthModalState({
                open: true,
            });
        }
    }

    const handleSignUp = () => {
        router.push("/signup")
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
            {authModalState.open &&
                <ul className="w-32 md:w-48 lg:w-80 absolute top-10 md:top-12 right-0 flex flex-col bg-white border border-gray-700 rounded-xl tracking-wide lg:tracking-wider">
                    {!userStateValue.name &&
                        <>
                            <li className="rounded-t-xl border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer"
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </li>
                            <li className="md:hidden border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer"
                                onClick={handleLogIn}
                            >
                                Log In
                            </li>
                        </>
                    }
                    <li className="border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer">
                        <Link href="/community/partners">See all registered organisations / individuals</Link>
                    </li>
                    <li className="border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer">
                        <Link href="/community/guidelines">See our guidelines</Link>
                    </li>
                    {userStateValue.name &&
                        <>
                            <li className="border-b py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer">
                                <Link href="/add-event" onClick={() => setMenuOpen(false)}>Add event</Link>
                            </li>
                            <li className="py-5 text-center font-medium text-lg hover:opacity-50 cursor-pointer"
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