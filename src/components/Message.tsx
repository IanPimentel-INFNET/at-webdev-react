import { memo } from "react"
import { Link } from "react-router"
import MessageType from "../types/MessageType"
import ProfileImage from "./ProfileImage"
import moment from "moment"
import { useChatContext } from "../contexts/ChatProvider"
import { useProfileManagerContext } from "../contexts/ProfileManagerProvider"
// import { PressableClasses } from "../styles/UIClasses"

type Props = {
    message: MessageType
}

const Message = memo(({ message }: Props) => {
    const { removeMessage } = useChatContext();
    const { profile, getUserById } = useProfileManagerContext()

    const sender = getUserById(message.senderId);
    const me = message.senderId === profile?.id

    return (
        <div className="bg-slate-100 p-2 rounded-md">
            <div className="flex items-center justify-between pr-1">

                <Link to={me ? '/me' : '/profiles/' + sender?.id}>

                    <div className="flex gap-2 items-center">
                        <ProfileImage active={me || sender?.active} image={sender?.profileImg} username={sender?.username || "U"} />
                        <div
                            className="font-medium">
                            {me ? 'Eu' : sender?.username}
                        </div>
                    </div>
                </Link>
                {
                    me && (
                        <div>
                            <button type="button" onClick={() => removeMessage(message.id)}
                                className={"text-red-500"}>
                                &#128465;
                            </button>
                        </div>
                    )
                }
            </div>
            <div
                className="font-medium text-xl break-words"
            >
                {message.message}
            </div>
            <div
                className="text-xs font-medium opacity-60"
            >
                <time dateTime={moment(message.date).toISOString()}>{moment(message.date).calendar()}</time>
            </div>
        </div>
    )
})

export default Message