import { FC } from "react"

import Link from 'next/link'
import clsx from "clsx"

interface MobileItemProps {
    icon: any
    href: string
    onClick?: () => void
    active?: boolean
}

const MobileItem: FC<MobileItemProps> = ({
    icon: Icon,
    href,
    onClick,
    active
}) => {
    const handleClick = () => {
        if(onClick){
            return onClick()
        }
    }

    return (
        <Link href={href} onClick={onClick} className={clsx(`
            group 
            flex
            gap-x-3
            text-sm
            leading-6
            font-semibold
            w-full
            justify-center
            p-4
            text-gray-500
            dark:text-gray-300
            hover:text-black
            dark:hover:text-gray-100
            hover:bg-gray-100
            dark:hover:bg-black
            cursor-pointer
        `,
            active && 'bg-gray-100 text-black dark:bg-black dark:text-gray-100'
        )}>
            <Icon className="h-6 w-6"/>
        </Link>
    )
}

export default MobileItem