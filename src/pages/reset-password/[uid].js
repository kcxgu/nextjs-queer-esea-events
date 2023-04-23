import { useEffect, useState } from "react";
import ResetPasswordForm from "@/components/User/ResetPassword"
import { useRouter } from "next/router";

const ResetPassword = () => {
    const router = useRouter();
    const [id, setId] = useState("");

    useEffect(() => {
        setId(router.query.uid)
    }, [router.query])

    return (
        <div>
            <ResetPasswordForm id={id} />
        </div>
    )
}

export default ResetPassword