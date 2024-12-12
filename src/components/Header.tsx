import { H1Classes } from "../styles/UIClasses"

type Props = {
    titulo: string, subTitulo?: string | React.ReactNode, rigth?: React.ReactNode, left?: React.ReactNode
}

const Header = ({ titulo, subTitulo, rigth, left }: Props) => {
    return (
        <div className="flex justify-between gap-2 items-center mb-4">
            <div className="flex gap-2 items-center">
                {left}
                <div>
                    <h1 className={H1Classes}>
                        {titulo}
                    </h1>
                    <h2 className='opacity-80 text-sm text-pretty'>
                        {subTitulo}
                    </h2>
                </div>
            </div>
            <div>
                {rigth}
            </div>
        </div>
    )
}

export default Header