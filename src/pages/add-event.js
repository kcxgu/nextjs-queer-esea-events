import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { useRouter } from "next/router";
import Head from "next/head";
import AddEventForm from "@/components/Events/AddEventForm"

const AddEvent = () => {
    const router = useRouter();
    const [userStateValue, setUserStateValue] = useRecoilState(userState);

    const checkUser = () => {
        if (!userStateValue.name) router.push("/")
    }

    useEffect(() => {
        checkUser();
    }, [])

    return (
        <>
            <Head>
                <title>Hey Queer Asians | Add An Event</title>
            </Head>
            <AddEventForm />
        </>
    )
}

export default AddEvent