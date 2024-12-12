import { PropsWithChildren, useEffect } from "react"
import { useProfileManagerContext } from "../contexts/ProfileManagerProvider"
import { useNavigate } from "react-router"

const ProfilesMiddleware = ({ children }: PropsWithChildren) => {
    //memo aq provavelmente, teste dps
    const { profiles } = useProfileManagerContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!profiles.length) {
            navigate('/profiles/create')
        }
    })

    return children;
}
export default ProfilesMiddleware