'use client'

import { FC } from 'react'
import clsx from "clsx"
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from 'react-hook-form'

interface InputProps {
    label: string
    id: string
    type?: string
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    disabled?: boolean
}

const Input: FC<InputProps> = ({
    label,
    id,
    type,
    register,
    required,
    errors,
    disabled
}) => {
    return (
        <div>
            <label
                className='
                block
                text-sm
                font-medium
                leading-6
                text-gray-800
                dark:text-white
            '
                htmlFor={id}
            >
                {label}
            </label>
            <div
                className='mt-2'
            >
                <input
                    id={id}
                    type={type}
                    disabled={disabled}
                    {...register(id, { required })}
                    // form-input from @tailwindcss/forms
                    className={clsx(`
                        form-input
                        block
                        w-full
                        rounded-md
                        py-1.5
                        border-0
                        bg-transparent
                        text-gray-800
                        dark:text-white
                        shadow-md
                        ring-1
                        ring-inset
                        ring-gray-300
                        dark:ring-white
                        placeholder:text-gray-300
                        dark:placeholder:text-white
                        focus:ring-2 
                        focus:ring-inset 
                        focus:ring-sky-600
                        sm:text-sm
                        sm:leading-6
                    `,
                        errors[id] && "focus:ring-rose-500",
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                />
            </div>
        </div>
    )
}

export default Input