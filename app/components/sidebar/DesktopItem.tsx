
import clsx from "clsx"
import Link from "next/link"
import { FC } from "react"

interface DesktopItemProps {
    label: string
    icon: any
    href: string
    onClick?: () => void
    active?: boolean
}

const DesktopItem: FC<DesktopItemProps> = ({
    label,
    icon: Icon,
    href,
    onClick,
    active
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }

    return (
        <li onClick={handleClick} className={clsx(`
            group
            flex
            gap-x-3
            rounded-md
            p-3
            text-sm
            leading-6
            font-semibold
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
            <Link href={href}>
                <Icon className="h-6 w-6 shrink-0"/>
                <span className="sr-only"> {label} </span>
            </Link>
        </li>
    )
}

export default DesktopItem