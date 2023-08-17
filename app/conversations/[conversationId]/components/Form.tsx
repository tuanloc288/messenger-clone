'use client'

import useConversation from '@/app/hooks/useConversation'
import axios from 'axios'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2'
import MessageInput from './MessageInput'
import { CldUploadButton } from 'next-cloudinary'

const Form = () => {
    const { conversationId } = useConversation()
    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true })
        axios.post('/api/messages', {
            ...data,
            conversationId
        })
    }

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
    }

    return (
        <div className='
            py-4
            px-4
            border-t
            border-gray-200
            dark:border-zinc-900
            flex
            items-center
            gap-2
            lg:gap-4
            w-full
        '>
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset='zpod6krx'
            >
                <HiPhoto size={32} className="text-sky-500" />
            </CldUploadButton>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='
                    flex 
                    items-center
                    gap-2
                    lg:gap-4
                    w-full
                '
            >
                <MessageInput
                    id='message'
                    register={register}
                    errors={errors}
                    required
                    placeholder='Nhập tin nhắn ở đây'
                />
                <button
                    type="submit"
                    className="
                        rounded-full
                        p-2
                        bg-sky-500
                        cursor-pointer
                        hover:bg-sky-600
                        transition
                    "
                >
                    <HiPaperAirplane
                        size={18}
                        className='text-white dark:text-black'
                    />
                </button>
            </form>
        </div>
    )
}

export default Form