import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/userAtom";
import { useRouter } from "next/router";
import { FaDiscord, FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";

const SignUpForm = () => {
    const router = useRouter();
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        website: "",
        password: "",
        twitter: "",
        instagram: "",
        facebook: "",
        discord: "",
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

        const { name, website, email, password, twitter, instagram, facebook, discord } = newUser;

        if (name && email.length >= 8 && password.length >= 8) {

            setSignUpErrorMsg("");

            try {
                const addUser = {
                    name: name,
                    website: website,
                    email: email,
                    password: password,
                    socialMedia: {
                        twitter: twitter,
                        instagram: instagram,
                        facebook: facebook,
                        discord: discord,
                    }
                }
                const res = await axios.post("/api/user/signup", addUser);

                if (res.data.message === "Success!") {
                    setUserStateValue({
                        name: name,
                        website: website,
                        email: email,
                        password: password,
                        socialMedia: {
                            twitter: twitter,
                            instagram: instagram,
                            facebook: facebook,
                            discord: discord,
                        }
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
        <div>
            <div className="w-full text-center pt-14 pb-4 mx-2 md:px-0">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium tracking-wider leading-relaxed xl:py-8">Sign Up</h1>
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse lg:py-20">
                    <div className="lg:w-5/6 mx-auto py-4 tracking-wide lg:tracking-wider">
                        <p className="pt-10 w-2/3 lg:w-4/5  mx-auto lg:text-lg">By signing up, you confirm that you are part of the queer ESEA community or an ally, intending to share details of any event you may host or organise that are relevant for the community.</p>
                        <p className="pt-4 w-2/3 lg:w-4/5 mx-auto lg:text-lg">If you see any inappropriate events, please help us to flag these. We will review all reported events and take action as necessary. See our <Link href="/community/guidelines" className="text-orange-500 underline underline-offset-4 hover:opacity-70">reporting guidelines</Link> for more detail.</p>
                        <img
                            src="/balloon.svg"
                            className="hidden lg:block pt-16 w-2/3 mx-auto"
                        />
                    </div>

                    <div className="pb-10 w-full max-w-4xl mx-auto lg:border lg:rounded-2xl lg:shadow">
                        <form method="POST" className="w-5/6 md:w-2/3 lg:w-3/4 mx-auto flex flex-col gap-6 bg-white py-12 px-6 rounded-xl tracking-wide">
                            <div className="w-full mx-auto flex flex-col justify-center">
                                <label
                                    htmlFor="name"
                                    className="text-gray-600 font-bold uppercase tracking-wide mb-2"
                                >
                                    Name of Organisation / Individual *
                                </label>
                                <p className="pt-1 pb-4 text-gray-700">If independent artist or organiser, the name you would like to appear alongside any event you may want to share</p>
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
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label
                                    htmlFor="email"
                                    className="text-gray-600 font-bold uppercase tracking-wide mb-2"
                                >
                                    Email Address *
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
                                    Password *
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
                            <div className="w-full mx-auto flex flex-col justify-center">
                                <p
                                    className="text-gray-600 font-bold uppercase tracking-wide py-4"
                                >
                                    Social Media
                                </p>
                                <p className="mb-4">Optional. You can fill it in later too.</p>
                                <div className="flex flex-row gap-2 items-center pb-6">
                                    <FaTwitter className="text-2xl mx-2" />
                                    <input
                                        className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                        id="twitter"
                                        name="twitter"
                                        placeholder="https://twitter.com/username"
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="flex flex-row gap-2 items-center pb-6">
                                    <FaInstagram className="text-2xl mx-2" />
                                    <input
                                        className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                        id="instagram"
                                        name="instagram"
                                        placeholder="https://instagram.com/username"
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="flex flex-row gap-2 items-center pb-6">
                                    <FaFacebookSquare className="text-2xl mx-2" />
                                    <input
                                        className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                        id="facebook"
                                        name="facebook"
                                        placeholder="https://facebook.com/username"
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <FaDiscord className="text-3xl mx-1.5" />
                                    <input
                                        className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                        id="discord"
                                        name="discord"
                                        placeholder="https://discord.com/channels/username"
                                        onChange={handleInput}
                                    />
                                </div>
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
            </div>
        </div>
    )
}

export default SignUpForm