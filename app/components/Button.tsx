'use client'

import clsx from 'clsx'
import { FC } from 'react'

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined
    fullWidth?: boolean
    children?: React.ReactNode
    onClick?: () => void
    secondary?: boolean
    danger?: boolean
    gradient?: boolean
    disabled?: boolean
    border?: boolean
}

const Button: FC<ButtonProps> = ({
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    gradient,
    disabled,
    border
}) => {


    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx(`
                flex
                justify-center
                rounded-md
                px-3
                py-2
                text-sm
                font-semibold
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                hover:opacity-75
            `,
                disabled && "opacity-50 cursor-not-allowed",
                fullWidth && "w-full",
                border && 'border border-gray-800 dark:border-gray-200',
                secondary ? ' text-gray-800 dark:text-gray-200' : 'text-white',
                danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
                gradient && 'bg-gradient-to-bl from-[#ff6f5d] via-[#db46b1] to-[#3478ff]',
                !secondary && !danger && !gradient && 'bg-sky-600 hover:bg-sky-600/90 focus-visible:bg-sky-600'
            )}
        >
            {children}
        </button>
    )
}

export default Button