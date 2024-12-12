import { useNavigate, useParams } from "react-router"
import { useProfileManagerContext } from "../contexts/ProfileManagerProvider";
import { useEffect, useState } from "react";
import ProfileType from "../types/ProfileType";
import Header from "../components/Header";
import { PressableClasses } from "../styles/UIClasses";
import ProfileImage from "../components/ProfileImage";

const Profile = ({ me = false }) => {
    const { pid } = useParams();
    const { getUserById, profile: currProfile } = useProfileManagerContext()
    const [profile, setProfile] = useState<ProfileType>()
    const [editing, setEditing] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (me) {
            if (!currProfile) navigate("/login")
            setProfile(currProfile)
            return
        }

        if (!pid) {
            throw Error('Usuário não encontrado.')
        }

        const profile = getUserById(+pid)
        if (!profile) throw Error('Usuário não encontrado.')

        setProfile(profile)
    }, [])

    function toggleEdit() {
        setEditing(!editing)
    }

    return profile && (
        <>
            <Header
                titulo={profile.username}
                subTitulo={profile.descricao || 'Sem descrição.'}
                left={
                    <ProfileImage size="lg" image={profile.profileImg} username={profile.username} active={me || profile.active}/>
                }
                rigth={me && (
                    <button className={PressableClasses} onClick={() => toggleEdit()}>
                        {editing ? "Salvar" : "Editar"}
                    </button>
                )}
            />

            <div>
                
            </div>
        </>
    )
}

export default Profile