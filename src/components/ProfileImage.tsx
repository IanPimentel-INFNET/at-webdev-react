import { memo } from "react"

type Props = {
    image?: string,
    username: string,
    active?: boolean
    size?: 'sm' | 'md' | 'lg' | 'Xlg'
}

const ProfileImage = ({ image, username, active, size = 'md' }: Props) => {
    // console.log('render profile image')
    let sizeClasses = ''
    switch (size) {
        case 'sm':
            sizeClasses = 'size-6'
            break;
        case 'lg':
            sizeClasses = 'size-10'
            break;
        case 'Xlg':
            sizeClasses = 'size-28'
            break;
        default:
            sizeClasses = 'size-8'
            break;
    }
    return (
        <div className={`rounded-full flex items-center justify-center ${sizeClasses} ${active ? 'bg-green-500' : 'bg-red-600'}`}>
            <img
                className={`rounded-full scale-95 aspect-square object-cover`}
                src={image || 'https://placehold.co/600?text=' + username[0].toUpperCase()}
                alt={`profile image for user ${username}`}
            />
        </div>
    )
}

export default memo(ProfileImage)