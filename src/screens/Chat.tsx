import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useProfileManagerContext } from "../contexts/ProfileManagerProvider";
import Message from "../components/Message";
import { useChatContext } from "../contexts/ChatProvider";
import { PressableClasses } from "../styles/UIClasses";

const Chat = () => {
    const { profile } = useProfileManagerContext();
    const { messages, sendMessage } = useChatContext();
    const [message, setMessage] = useState('')
    const messagesContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages])

    return (
        <div className="flex-grow flex flex-col gap-4">
            <div
                ref={messagesContainerRef}
                className="flex-grow h-20 overflow-y-scroll pr-4 flex flex-col gap-4 scroll-smooth"
            >
                {messages.map((msg, _index) => {
                    return (<Message key={_index} message={msg} />)
                })}
            </div>

            <form
                className="flex gap-4"
                onSubmit={(ev) => {
                    ev.preventDefault();
                    sendMessage(
                        {
                            id: moment().valueOf(),
                            senderId: profile?.id || 0,
                            message: message,
                            date: moment().toISOString()
                        }
                    )
                    setMessage('')
                }}
            >
                <input type="text" required placeholder="digite sua mensagem."
                    className="py-1 px-3 rounded-full flex-grow"
                    value={message}
                    onChange={ev => setMessage(ev.target.value)}
                />
                <div className={PressableClasses + 'flex flex-nowrap'}>
                    <button type="submit"
                    >
                        Enviar

                    </button>
                    <div className="text-4xl font-light flex items-center">
                        <span className="translate-y-[-10%] ">&rsaquo;</span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Chat;