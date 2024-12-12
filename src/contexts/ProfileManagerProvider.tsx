import { createContext, PropsWithChildren, useContext } from "react"
import useProfileManager from "../hooks/useProfileManager";

const ProfileMngrContext = createContext<ReturnType<typeof useProfileManager> | null>(null);

const ProfileManagerProvider = ({children}: PropsWithChildren) => {
    const values = useProfileManager()
    return (
        <ProfileMngrContext.Provider value={values}>
        {children}
        </ProfileMngrContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProfileManagerContext() {
    const ctx = useContext(ProfileMngrContext)
    if(!ctx) throw Error('useProfileManagerContext precisa estar dentro de um ProfileManagerProvider.')
    return ctx
}

export default ProfileManagerProvider