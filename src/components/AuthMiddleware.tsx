import { PropsWithChildren, useEffect } from "react"
import { useProfileManagerContext } from "../contexts/ProfileManagerProvider"
import { useNavigate } from "react-router"

const AuthMiddleware = ({ children }: PropsWithChildren) => {
    //memo aq provavelmente, teste dps
    const { profile } = useProfileManagerContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!profile) {
            navigate('/login')
        }
    })

    return children;
}
export default AuthMiddleware