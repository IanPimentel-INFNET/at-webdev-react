import { useProfileManagerContext } from "../contexts/ProfileManagerProvider"

const OnlineCount = () => {
    const { profiles } = useProfileManagerContext()
    const online = profiles.filter(p => p.active).length

    return (
        <span>{online} de {profiles.length} <span className={`text-${online ? 'green' : 'red'}-600`}>online</span>.</span>
    )
}

export default OnlineCount