import { useState } from "react"
import { useProfileManagerContext } from "../contexts/ProfileManagerProvider"
import { Link } from "react-router"
import Chat from "./Chat"
import ChatProvider from "../contexts/ChatProvider"
import { LinkClasses } from "../styles/UIClasses"
import Header from "../components/Header"
import OnlineCount from "../components/OnlineCount"

function Home() {
  const [eg, setEg] = useState(false)
  const { profile, profiles } = useProfileManagerContext()

  const online = profiles.filter(p => p.active).length

  return (
    <>
      <Header
        titulo='Bem vindo ao Infnet Chat'
        subTitulo={(
          <div
            onMouseEnter={() => setEg(true)}
            onMouseLeave={() => setEg(false)}
            className={eg ? 'text-red-500' : ''}
          >
            {eg ? 'Se perceber que está passando muito tempo aqui, busque ajuda psiquiatra imediatamente!' : 'Um chat com nenhuma interação real com outras pessoas!'}
          </div>
        )} />
      {
        !online && (
          profiles.length >= 2 ? (
            <span>Abra uma outra janela para conversar consigo mesmo.</span>
          ) : (
            <span>Cadastre pelo menos 2 perfis para começar a conversar.</span>
          ))
      }
      <OnlineCount />
      {!profile && (
        <div>
          <Link to={'/login'} className={LinkClasses}>
            Logue
          </Link>
          {" "}para entrar no chat.
        </div>
      )}
      {profile && (
        <ChatProvider>
          <Chat />
        </ChatProvider>
      )}
    </>
  )
}

export default Home
