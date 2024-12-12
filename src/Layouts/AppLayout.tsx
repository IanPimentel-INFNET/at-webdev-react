import { Outlet, NavLink, Link } from "react-router"
import { useProfileManagerContext } from "../contexts/ProfileManagerProvider"

const AppLayoutClasses = {
    navLink: 'p-2 border-b-4 [&.active]:border-b-black'
}

const AppLayout = () => {
    const { profile } = useProfileManagerContext()

    return (
        <div className="h-screen flex flex-col">
            <header className='bg-gray-200 flex flex-row justify-between'>
                <nav className={'flex flex-row gap-x-4'}>

                    <NavLink to={'/'} className={AppLayoutClasses.navLink}>
                        Início
                    </NavLink>
                    
                    <NavLink to={'/profiles'} className={AppLayoutClasses.navLink}>
                        Perfis
                    </NavLink>

                    <NavLink to={'/me'} className={AppLayoutClasses.navLink}>
                        Meu Perfil
                    </NavLink>
                </nav>
                <div
                    className="p-2 ">
                    <Link to={profile ? "/logout" : "/login"} >
                        Olá, {profile?.username || 'Convidado'}!
                    </Link>
                </div>
            </header>
            <div className="p-4 flex flex-col flex-grow">
                <Outlet />
            </div>
        </div>
    )
}

export default AppLayout