'use client'

import { FC } from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface MessageInputProps {
    id: string
    placeholder?: string
    type?: string
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
}

const MessageInput: FC<MessageInputProps> = ({
    id,
    placeholder,
    type,
    required,
    register,
    errors
}) => {


    return (
        <div className="relative w-full">
            <input
                id={id}
                type={type} 
                autoComplete='off'
                {...register(id, { required })}
                placeholder={placeholder}
                className="
                    font-light
                    py-2
                    px-4
                    bg-neutral-100
                    text-black
                    dark:bg-zinc-900
                    dark:text-neutral-100
                    w-full
                    rounded-full
                    focus:outline-none
                "
            />
        </div>
    )
}

export default MessageInput