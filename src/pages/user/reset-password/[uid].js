import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ResetPasswordForm from "@/components/User/ResetPassword"

const ResetPassword = () => {
    const router = useRouter();
    const [id, setId] = useState("");

    useEffect(() => {
        setId(router.query.uid)
    }, [router.query])

    return (
        <>
            <Head>
                <title>Hey Queer Asians | Reset Password</title>
            </Head>
            <ResetPasswordForm id={id} />
        </>
    )
}

export default ResetPassword