import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModal";
import axios from "axios";

const ResetPasswordForm = ({ id }) => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [resetErrorMsg, setResetErrorMsg] = useState("");
    const [newPassword, setNewPassword] = useState({
        password: "",
        password2: "",
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setNewPassword({
            ...newPassword,
            [name]: value,
        })
    }

    const checkErrors = () => {
        const { password, password2 } = newPassword;

        if (password.length < 8) setResetErrorMsg("Please enter password of at least 8 characters in length");

        if (password !== password2) setResetErrorMsg("Please ensure the passwords match exactly");
    }

    const handleReset = async (e) => {
        e.preventDefault();

        checkErrors();

        const { password, password2 } = newPassword;

        if (password.length >= 8 && password === password2) {
            setResetErrorMsg("");
            try {
                const res = await axios.post("/api/user/resetPassword", { id: id, password: password })
                if (res.data.message === "Success!") {
                    setAuthModalState({
                        open: true,
                    })
                } else {
                    setResetErrorMsg(res.data.message);
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <div>
                <div className="w-full text-center pt-14 pb-4">
                    <h1 className="text-2xl font-medium tracking-wider leading-relaxed">Reset Password</h1>
                </div>
                <div className="py-10">
                    <form method="POST" className="max-w-4xl w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto flex flex-col gap-6 bg-white py-12 px-6 rounded-xl">
                        <div className="w-full flex flex-col gap-2">
                            <label
                                htmlFor="password"
                                className="text-gray-600 font-bold uppercase tracking-wide mb-2"
                            >
                                Password
                            </label>
                            <input
                                className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="***********"
                                autoComplete="current-password"
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label
                                htmlFor="password2"
                                className="text-gray-600 font-bold uppercase tracking-wide mb-2"
                            >
                                Confirm Password
                            </label>
                            <input
                                className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                id="password2"
                                name="password2"
                                type="password"
                                placeholder="***********"
                                autoComplete="current-password"
                                onChange={handleInput}
                                required
                            />
                        </div>
                        {resetErrorMsg && <p className="text-center text-red-500 py-2">{resetErrorMsg}</p>}
                        <div className="w-full flex justify-center mt-4 pt-10 border-t">
                            <button className="mx-auto bg-indigo-400 text-white font-bold uppercase px-8 py-3 rounded-lg shadow hover:shadow-lg hover:bg-indigo-500 outline-none tracking-wide ease-linear transition-all duration-150"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPasswordForm