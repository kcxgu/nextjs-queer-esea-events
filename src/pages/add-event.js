import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import AddEventForm from "@/components/Events/AddEventForm"
import { useRouter } from "next/router";

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
            <AddEventForm />
        </>
    )
}

export default AddEvent