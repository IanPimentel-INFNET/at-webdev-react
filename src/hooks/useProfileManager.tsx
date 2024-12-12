import { useEffect, useState } from "react"
import ProfileType from "../types/ProfileType"
import ResponseType from "../types/ResponseType"

function getProfiles() {
    const profiles: ProfileType[] = JSON.parse(localStorage.getItem('profiles') || '[]')
    return profiles
}

const useProfileManager = () => {
    const [profiles, _setProfiles] = useState<ProfileType[]>([])
    const [profile, _setProfile] = useState<ProfileType>()
    const [profileIndex, _setProfileIndex] = useState(-1)

    console.log(profileIndex)

    useEffect(() => {
        _setProfiles(getProfiles())

        function StorageListener(event: StorageEvent) {
            // console.log('storage event!', event)
            if (event.key === 'profiles') {
                _setProfiles(getProfiles())
            }
        }
        function UnloadListener(event: BeforeUnloadEvent) {
            event.preventDefault();
            const profilesTemp = getProfiles()
            console.log(profileIndex, profilesTemp[profileIndex])
            profileIndex !== -1 && (profilesTemp[profileIndex].active = false)
            localStorage.setItem('profiles', JSON.stringify( profilesTemp ))
            logout()
            return 'string';
        }
        addEventListener('beforeunload', UnloadListener)
        addEventListener('storage', StorageListener);

        return () => {

            removeEventListener('storage', StorageListener)
            removeEventListener('beforeunload', UnloadListener)
        }
    }, [profileIndex])

    function getUserByUsername(username: string) {
        return profiles.find((profile) => profile.username === username)
    }

    function getUserById(id: number) {
        return profiles.find((profile) => profile.id === id)
    }

    function changeProfile(profileData: ProfileType): ResponseType {
        const index = profiles.findIndex((profile) => (profile.username === profileData.username && profile.password === profileData.password))
        const exists = profiles[index]
        // console.log('novo', exists, 'atual:', profile)
        if (!exists) return { success: false, message: "Usuário ou senha incorretos." }

        if (exists.active) {
            return { success: false, message: "Não foi possível se conectar a este perfil." }
        }

        if (profile) updateProfile({ ...profile, active: false })
        updateProfile({ ...exists, active: true })
        _setProfile(exists)
        _setProfileIndex(index)

        return { success: true }
    }

    function updateProfile(profileData: ProfileType) {
        console.log('update')

        const index = profiles.findIndex((profile) => { return profile.id === profileData.id })

        if (index === -1) {
            throw Error("Esse usuário não existe.")
        }

        const temp = [...profiles]
        temp.splice(index, 1, profileData)

        saveProfiles(temp)
    }

    function logout() {
        console.log('logout')
        if (profile) updateProfile({ ...profile, active: false })
        _setProfile(undefined)
    }

    function addProfile(profileData: ProfileType) {
        if (getUserByUsername(profileData.username)) {
            throw Error("Esse nome de usuário já existe.")
        }

        saveProfiles([
            ...profiles,
            { ...profileData, id: Date.now(), active: false }
        ])
    }

    function saveProfiles(profiles: ProfileType[], updateState = true) {
        localStorage.setItem('profiles', JSON.stringify(profiles))
        if (updateState) _setProfiles(profiles)
    }

    return {
        profiles,
        profile,
        logout,
        changeProfile,
        addProfile,
        getUserById
    }
}

export default useProfileManager