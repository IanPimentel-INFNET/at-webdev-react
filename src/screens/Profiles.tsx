import { Link } from "react-router"
import { useProfileManagerContext } from "../contexts/ProfileManagerProvider"
import ProfileImage from "../components/ProfileImage"
import { PressableClasses } from "../styles/UIClasses"
import Header from "../components/Header"
import OnlineCount from "../components/OnlineCount"

const ProfileSelection = () => {
    const { profiles, profile: currProfile } = useProfileManagerContext()

    return (
        <>
            <Header
                titulo="Perfis cadastrados"
                subTitulo="Perfis cadastrados na plataforma, podem ser acessados na tela de login."
                rigth={(
                    <Link className={PressableClasses} to={'/profiles/create'}>
                        Criar perfil
                    </Link>
                )}
            />
            <OnlineCount/>
            <ul
                className="flex flex-col divide-y-2"
            >
                {profiles.map((profile, _index) => {
                    const isMe = currProfile?.id === profile.id

                    return (
                        <li key={_index}>
                            <Link to={`${isMe ? '/me' : profile.id}`} className="flex items-center justify-between py-1">
                                <div
                                    className="flex items-center gap-2"
                                >
                                    <ProfileImage active={isMe || profile.active} image={profile.profileImg} username={profile.username} />
                                    <div className="flex gap-1">
                                        {profile.username}
                                        {isMe && (
                                            <span>
                                                (eu)
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-5xl font-light flex items-center">
                                    <span className="translate-y-[-10%] ">&rsaquo;</span>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default ProfileSelection