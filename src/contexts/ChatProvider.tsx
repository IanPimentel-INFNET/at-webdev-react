import { createContext, PropsWithChildren, useContext } from "react"
import useChat from "../hooks/useChat";

const ChatContext = createContext<ReturnType<typeof useChat> | null>(null);

const ChatProvider = ({children}: PropsWithChildren) => {
    const values = useChat()
    return (
        <ChatContext.Provider value={values}>
        {children}
        </ChatContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useChatContext() {
    const ctx = useContext(ChatContext)
    if(!ctx) throw Error('useChatContext precisa estar dentro de um ChatProvider.')
    return ctx
}

export default ChatProvider