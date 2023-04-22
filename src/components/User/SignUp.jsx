import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/userAtom";
import { useRouter } from "next/router";
import axios from "axios";

const SignUpForm = () => {
    const router = useRouter();
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [userStateValue, setUserStateValue] = useRecoilState(userState);
    const [signUpErrorMsg, setSignUpErrorMsg] = useState("");

    const handleInput = (e) => {
        const { name, value } = e.target
        setNewUser({
            ...newUser,
            [name]: value,
        })
    }

    const checkErrors = () => {
        const { name, email, password } = newUser;

        if (name === "") setSignUpErrorMsg("Please enter a name");

        if (email.length < 8) setSignUpErrorMsg("Please enter valid email address");

        if (password.length < 8) setSignUpErrorMsg("Please enter password of at least 8 characters in length");

        if (email.length < 8 && password.length < 8) {
            setSignUpErrorMsg("Please enter valid email address and password to continue")
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        checkErrors();

        const { name, email, password } = newUser;

        if (name && email.length >= 8 && password.length >= 8) {

            setSignUpErrorMsg("");

            try {
                const res = await axios.post("/api/user/signup", newUser);
                if (res.data.message === "Success!") {
                    setUserStateValue({
                        name: name,
                        email: email,
                    })
                    router.push("/add-event")
                } else {
                    setSignUpErrorMsg(res.data.message);
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            setSignUpErrorMsg("Please ensure all fields have valid input")
        }
    }

    return (
        <>
            <div>
                <div className="w-full text-center pt-14 pb-4">
                    <h1 className="text-2xl font-medium tracking-wider leading-relaxed">Sign Up</h1>
                    <p className="pt-4 w-2/3 mx-auto">By signing up, you confirm that you are part of the queer ESEA community or an ally, intending to share details of any event you may host or organise that may be relevant for the community.</p>
                </div>
                <div className="py-10">
                    <form method="POST" className="max-w-4xl w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto flex flex-col gap-6 bg-white py-12 px-6 rounded-xl">
                        <div className="w-full mx-auto flex flex-col justify-center">
                            <label
                                htmlFor="name"
                                className="text-gray-600 font-bold uppercase tracking-wide mb-2"
                            >
                                Name of Organisation
                            </label>
                            <p className="pt-1 pb-3 text-gray-700">If independent artist or organiser, the name you would like to appear alongside any event you may want to share</p>
                            <input
                                className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                id="name"
                                name="name"
                                placeholder="BAQC ESEA"
                                onChange={handleInput}
                                required
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
                                onChange={handleInput}
                                required
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
                                onChange={handleInput}
                                required
                            />
                        </div>
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
                        {signUpErrorMsg && <p className="text-center text-red-500 py-2">{signUpErrorMsg}</p>}
                        <div className="w-full flex justify-center mt-4 pt-10 border-t">
                            <button className="mx-auto bg-indigo-400 text-white font-bold uppercase px-8 py-3 rounded-lg shadow hover:shadow-lg hover:bg-indigo-500 outline-none tracking-wide ease-linear transition-all duration-150"
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUpForm