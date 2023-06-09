import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModal"
import { userState } from "../../atoms/userAtom";
import { useRouter } from "next/router";
import { menuModalState } from "@/atoms/menuModal";
import axios from "axios";
import emailjs from "@emailjs/browser";
import Spinner from "../Loader/Spinner";

const AuthModal = () => {
    const router = useRouter();
    const [modalState, setModalState] = useRecoilState(authModalState);
    const setMenuModal = useSetRecoilState(menuModalState);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [logInErrorMsg, setLogInErrorMsg] = useState("");
    const [userStateValue, setUserStateValue] = useRecoilState(userState);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [forgotPasswordError, setForgotPasswordError] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        let regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    const handleClose = () => {
        setModalState(prev => ({
            ...prev,
            open: false,
        }))
        setUser({
            email: "",
            password: "",
        })
        if (emailSent) {
            router.push("/");
            setEmailSent(false);
            setForgotPassword(false);
        }

        if (forgotPassword) {
            setForgotPassword(false);
        }
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        })
    }

    const handleSignUp = () => {
        setModalState(prev => ({
            ...prev,
            open: false,
        }))
        router.push("/signup")
    }

    const checkErrors = () => {
        const { email, password } = user;

        if (!validateEmail(email)) setLogInErrorMsg("Please enter valid email address");

        if (password.length < 1) setLogInErrorMsg("Please enter a password to continue");

        if (!validateEmail(email) && password.length < 1) {
            setLogInErrorMsg("Please enter valid email address and password to continue")
        }
    }

    const handleLogIn = async (e) => {
        e.preventDefault();

        const { email, password } = user;

        checkErrors();

        if (validateEmail(email) && password.length >= 1) {

            setLogInErrorMsg("");

            const res = await axios.post("/api/user/login", user)

            if (res.data.message) {
                setLogInErrorMsg(res.data.message);
            } else {
                setUserStateValue({
                    id: res.data.id,
                    name: res.data.name,
                    email: res.data.email,
                    website: res.data.website,
                    socialMedia: res.data.socialMedia
                });
                localStorage.setItem("user", JSON.stringify({
                    id: res.data.id,
                    name: res.data.name,
                    email: res.data.email,
                    website: res.data.website,
                    socialMedia: res.data.socialMedia
                }))
                setModalState(prev => ({
                    ...prev,
                    open: false,
                }));
                setMenuModal({
                    open: false
                })
                if (modalState.toAdd) {
                    router.push("/add-event")
                }
            }
        }
    }

    const handleForgotPassword = () => {
        setForgotPassword(true);
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();

        const { email } = user;

        if (email.length < 8) setForgotPasswordError("Please enter a valid email address")

        if (email.length >= 8) {
            setForgotPasswordError("");

            const res = await axios.post("/api/user/forgotPassword", { email: email })
            if (res.data.message === "User Found") {
                setLoading(true)
                emailjs.send(
                    process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
                    process.env.NEXT_PUBLIC_EMAIL_FORGOT_TEMPLATE_ID,
                    {
                        user_email: email,
                        message: `Click here to reset your password: ${window.location.origin}/user/reset-password/${res.data.id}`
                    },
                    process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
                ).then(res => {
                    if (res.status === 200) {
                        setLoading(false);
                        setEmailSent(true)
                    }
                }, error => {
                    console.log(error)
                    setForgotPasswordError(res.data.message)
                })
            } else {
                setForgotPasswordError(res.data.message)
            }
        }
    }

    return (
        <>
            {modalState.open && (
                <div className="max-w-4xl mx-auto flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-gray-100/40 focus:outline-none">
                    {loading ?
                        <div className="my-5 mx-auto w-4/5 sm:w-1/2 h-96 bg-white flex flex-col rounded-2xl shadow-lg outline-none">
                            <div
                                className="cursor-pointer pt-8 pb-14"
                                onClick={handleClose}
                            >
                                <p className="text-right text-2xl text-gray-400 font-bold pr-12 hover:text-amber-500">✕</p>
                            </div>
                            <div className="text-center flex flex-col justify-center">
                                <p className="text-2xl lg:text-3xl font-semibold text-gray-600 tracking-wider pb-8">Sending Email</p>
                                <div className="flex flex-row items-center gap-2 mx-auto">
                                    <Spinner />
                                    <p className="text-lg px-4 text-gray-700 tracking-wider leading-relaxed">Please wait</p>
                                </div>
                            </div>
                        </div>
                        : (<>
                            {emailSent ? (
                                <div className="my-5 mx-auto w-4/5 sm:w-1/2 h-96 bg-white flex flex-col rounded-2xl shadow-lg outline-none">
                                    <div
                                        className="cursor-pointer pt-8 pb-14"
                                        onClick={handleClose}
                                    >
                                        <p className="text-right text-2xl text-gray-400 font-bold pr-12 hover:text-amber-500">✕</p>
                                    </div>
                                    <div className="text-center flex flex-col justify-center">
                                        <p className="text-2xl lg:text-3xl font-semibold text-gray-600 tracking-wider pb-8">Email Sent</p>
                                        <p className="text-lg px-4 text-gray-700 tracking-wider leading-relaxed">Please check your email to reset your password 💫</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="my-5 mx-auto w-4/5 sm:w-1/2 bg-white flex flex-col rounded-xl shadow-lg outline-none">
                                    {forgotPassword ? (
                                        <>
                                            <div className="flex flex-row items-center justify-between mx-4 px-4 py-10 border-b">
                                                <p className="text-2xl lg:text-3xl font-semibold text-gray-500 tracking-wider">Forgot Password</p>
                                                <div
                                                    className="cursor-pointer"
                                                    onClick={handleClose}
                                                >
                                                    <p className="text-2xl text-gray-400 font-bold pr-4 hover:text-amber-500">✕</p>
                                                </div>
                                            </div>
                                            <form className="py-6 px-10">
                                                <div className="w-full mx-auto flex flex-col gap-6 pt-10 pb-14">
                                                    <div className="w-full flex flex-col gap-2">
                                                        <label
                                                            htmlFor="email"
                                                            className="text-gray-600 font-bold uppercase tracking-wide"
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
                                                            onChange={handleInput}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                {forgotPasswordError && <p className="text-center text-red-500 pb-6">{forgotPasswordError}</p>}
                                                <div className="flex flex-col items-center justify-center pt-10 pb-6 px-1 border-t boder-slate-200">
                                                    <button
                                                        className="mx-auto bg-orange-400 text-white font-bold uppercase px-8 py-3 rounded-lg shadow hover:shadow-lg hover:opacity-90 outline-none tracking-wide ease-linear transition-all duration-150"
                                                        onClick={handleResetPassword}
                                                    >
                                                        Reset Password
                                                    </button>
                                                    <p
                                                        className="text-teal-600 tracking-wide text-center pt-8 cursor-pointer hover:underline underline-offset-4 decoration-2 decoration-teal-500"
                                                        onClick={handleSignUp}
                                                    >
                                                        Request to become a member
                                                    </p>
                                                </div>
                                            </form>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex flex-row items-center justify-between mx-4 px-4 pt-8 pb-6 lg:py-10 border-b">
                                                <p className="text-xl lg:text-2xl font-semibold text-gray-500 tracking-wider">Log In</p>
                                                <div
                                                    className="cursor-pointer"
                                                    onClick={handleClose}
                                                >
                                                    <p className="text-2xl text-gray-400 font-bold pr-4 hover:text-amber-500">✕</p>
                                                </div>
                                            </div>
                                            <form className="pb-4 lg:pb-6 px-8 md:px-10">
                                                <div className="w-full mx-auto flex flex-col gap-6 py-10 lg:py-12">
                                                    <div className="w-full flex flex-col gap-2">
                                                        <label
                                                            htmlFor="email"
                                                            className="text-gray-600 font-bold uppercase text-sm lg:text-base tracking-wide"
                                                        >
                                                            Email Address
                                                        </label>
                                                        <input
                                                            className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-3 lg:p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                                            id="email"
                                                            name="email"
                                                            type="text"
                                                            placeholder="example@email.com"
                                                            autoComplete="example@email.com"
                                                            onChange={handleInput}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="w-full flex flex-col gap-2">
                                                        <label
                                                            htmlFor="password"
                                                            className="text-gray-600 font-bold uppercase text-sm lg:text-base tracking-wide mb-2"
                                                        >
                                                            Password
                                                        </label>
                                                        <input
                                                            className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-3 lg:p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                                            id="password"
                                                            name="password"
                                                            type="password"
                                                            placeholder="***********"
                                                            autoComplete="current-password"
                                                            onChange={handleInput}
                                                            required
                                                        />
                                                    </div>
                                                    <p className="pl-1 -mt-2 border-gray-400 text-sm lg:text-base text-gray-500 tracking-wide cursor-pointer hover:text-gray-700"
                                                        onClick={handleForgotPassword}
                                                    >
                                                        Forgot password?
                                                    </p>
                                                </div>
                                                {logInErrorMsg && <p className="text-center text-red-500 pb-6 -mt-4 lg:px-4">{logInErrorMsg}</p>}
                                                <div className="flex flex-col items-center justify-center pt-8 pb-6 md:pb-4 px-1 border-t boder-slate-200 text-sm lg:text-base">
                                                    <button
                                                        className="mx-auto bg-violet-400 text-white font-bold uppercase px-8 py-3 rounded-lg shadow hover:shadow-lg hover:opacity-90 outline-none tracking-wide ease-linear transition-all duration-150"
                                                        onClick={handleLogIn}
                                                    >
                                                        Log In
                                                    </button>

                                                    <p className="text-violet-600 tracking-wide text-center pt-5 cursor-pointer hover:underline underline-offset-4 decoration-2 decoration-violet-500"
                                                        onClick={handleSignUp}
                                                    >
                                                        Sign Up
                                                    </p>

                                                </div>
                                            </form>
                                        </>
                                    )}
                                </div>
                            )}
                        </>)}
                </div>
            )}
        </>
    )
}

export default AuthModal