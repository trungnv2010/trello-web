import {Navigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {verifyUserAPI} from "~/apis/index.jsx";
import PageLoadingSpinner from "~/components/Loading/PageLoadingSpinner.jsx";

const AccountVerification = () => {
    let [searchParams] = useSearchParams()
    const {email, token} = Object.fromEntries([...searchParams])
    const [verified, setVerified] = useState(false)

    useEffect(() => {
        if (email && token) {
            verifyUserAPI({email, token}).then(() => setVerified(true))
        }
    }, [email, token])

    if (!email || !token) {
        return <Navigate to={'/404'} />
    }

    if (!verified) {
        return (<PageLoadingSpinner caption={'Verifying your account...'}/>)
    }

    return <Navigate to={`/login?verifiedEmail=${email}`} />

}
export default AccountVerification