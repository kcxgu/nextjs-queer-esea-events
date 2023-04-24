import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModal"
import { userState } from "../../atoms/userAtom";
import { useRouter } from "next/router";
import axios from "axios";
import AccountDetails from "./AccountDetails";
import EventsDetails from "./EventsDetails";

const Dashboard = () => {
    const router = useRouter();
    const setAuthModalState = useSetRecoilState(authModalState);
    const [userStateValue, setUserStateValue] = useRecoilState(userState);
    const [events, setEvents] = useState();
    const [getUserError, setGetUserError] = useState(false);

    const handleUserLogIn = () => {
        if (!userStateValue.id) {
            setAuthModalState({
                open: true,
            });
        }
    }

    const getUser = async (uid) => {
        const res = await axios.post("/api/user/userInfo", uid)

        if (res.data.message) {
            setGetUserError(true);
        } else {
            setUserStateValue(res.data);
        }
    }

    console.log(userStateValue)

    const getEvents = async () => {
        const res = await axios.post("/api/events/findEventsByUser", { name: userStateValue.name })
        if (res.data.message) {
            console.log(res.data.message);
        } else {
            setEvents(res.data)
        }
    }

    useEffect(() => {
        if (userStateValue.id) {
            getEvents()
        }
    }, [userStateValue.id])

    useEffect(() => {
        const { uid } = router.query

        if (!userStateValue.id) {
            getUser(uid);
        }

    }, [router.query])

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-14 md:text-lg tracking-wide">
            {getUserError &&
                <p className="text-center w-3/4 md:w-1/2 mx-auto py-10 text-lg tracking-wide">There was an error getting your information. Please try <span className="text-violet-500 underline underline-offset-4 hover:opacity-80" onClick={handleUserLogIn}>logging in</span> again.</p>
            }

            <div className="py-16 md:py-20 lg:py-24">
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-center">Hello {userStateValue.name} 👋</h1>
                <p className="text-center pt-4 lg:pt-8 w-11/12 md:w-2/3 lg:w-1/2 mx-auto lg:text-lg">We would just like to say a massive thank you on behalf of the community. You are incredible ❤️.</p>
            </div>

            <EventsDetails events={events} />

            <AccountDetails />

        </div>
    )
}

export default Dashboard