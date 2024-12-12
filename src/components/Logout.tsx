import { useEffect } from "react";
import { useProfileManagerContext } from "../contexts/ProfileManagerProvider"
import { useNavigate } from "react-router";

const Logout = () => {
    //memo aq provavelmente, teste dps
    const { logout } = useProfileManagerContext();
    const navigate = useNavigate();

    useEffect(() => {
        logout()
        navigate('/login')
    })

    return <></>
}
export default Logout