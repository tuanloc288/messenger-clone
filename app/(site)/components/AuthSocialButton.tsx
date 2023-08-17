'use client'

import { FC, useEffect } from "react"
import { IconType } from "react-icons"

interface AuthSocialButtonProps {
    icon: IconType,
    onClick: () => void
}

const AuthSocialButton: FC<AuthSocialButtonProps> = ({
    icon: Icon,
    onClick
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
                inline-flex
                w-full
                justify-center
                bg-white
                dark:bg-gray-900
                px-4
                py-2
                text-gray-500
                dark:text-white
                shadow-sm
                ring-1
                ring-inset
                ring-gray-300
                hover:bg-gray-50
                dark:hover:bg-gray-950/30
                focus:outline-offset-0
            "
        >
            <Icon/>
        </button>
    )
}

export default AuthSocialButton