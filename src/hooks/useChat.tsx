import { useEffect, useState } from "react"
import MessageType from "../types/MessageType"

const useChat = () => {
    const [messages, setMessages] = useState<MessageType[]>([])

    useEffect(() => {
        setMessages(getMessages())
        function StorageListener(event: StorageEvent) {
            // console.log('storage event!', event)
            if(event.key === 'messages'){
                setMessages(getMessages())
            }
        }

        addEventListener('storage', StorageListener);

        return () => {
            removeEventListener('storage', StorageListener)
        }
    }, [])

    function getMessages(): MessageType[] {
        return JSON.parse(localStorage.getItem('messages') || '[]')
    }
    function saveMessages(messages: MessageType[]) {
        localStorage.setItem('messages', JSON.stringify(messages))
        setMessages(messages)
    }

    function sendMessage(message: MessageType) {
        const msgs = getMessages()
        saveMessages([
            ...msgs,
            message
        ])
    }

    function removeMessage(id: number) {
        const msgs = getMessages()
        saveMessages(msgs.filter(msg => msg.id !== id))
        // setMessages(prev => {
        //     return prev.filter(msg => msg.id !== id)
        // })
    }

    return { messages, sendMessage, removeMessage }
}

export default useChat