'use client'

import Avatar from "@/app/components/Avatar"
import { FullMessageType } from "@/app/types"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import { FC, useEffect, useState } from "react"
import { format } from 'date-fns'
import Image from "next/image"
import ImageModal from "./ImageModal"

interface MessageBoxProps {
    isLast?: boolean
    consecutive?: boolean
    data: FullMessageType
}

const MessageBox: FC<MessageBoxProps> = ({
    isLast,
    consecutive,
    data
}) => {
    const session = useSession()
    const [imageModalOpen, setImageModalOpen] = useState(false)

    const isOwn = session?.data?.user?.email === data?.sender?.email
    const seenList = (data.seen || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name)
        .join(', ')
    // remove the sender id from the list
    // join the rest by ,
    // e.g. 'Tuan loc, Alowf, Cillian Murphy'

    const container = clsx(
        "flex gap-3 p-4 -mt-6",
        isOwn && 'justify-end',
    )

    const avatar = clsx(isOwn && "order-2")

    const body = clsx(
        "flex flex-col gap-2",
        isOwn && "items-end"
    )

    const message = clsx(
        "text-sm w-fit overflow-hidden",
        isOwn ? 'bg-sky-500 text-white' : 'bg-neutral-100 text-black dark:bg-zinc-900 dark:text-neutral-100',
        data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3',
        consecutive ? isOwn  ? 'mr-[54px]' : 'ml-[54px]' 
                    : ''
    )

    return (
        <div className={container}>
            {
                !consecutive && (
                    <div className={avatar}>
                        <Avatar
                            user={data.sender}
                        />
                    </div>
                )
            }
            <div className={body}>
                {
                    !consecutive && (
                        <div className="flex items-center gap-1">
                            <div className={clsx(`
                                    text-sm 
                                    font-semibold 
                                    text-gray-900 
                                    dark:text-gray-100
                                `,
                                isOwn ? 'order-2' : 'order-1'
                            )}>
                                {data.sender.name}
                            </div>
                    
                            <div className={clsx(`
                                    text-xs 
                                    text-gray-800 
                                    dark:text-gray-200
                                `,
                                isOwn ? 'order-1' : 'order-2'
                            )}>
                                {format(new Date(data.createdAt), 'p')}
                            </div>
                        </div>
                    )
                }
                <div
                    className={message}
                >
                    <ImageModal
                        src={data.image}
                        isOpen={imageModalOpen}
                        onClose={() => setImageModalOpen(false)}
                    />
                    {data.image ? (
                        <Image
                            onClick={() => setImageModalOpen(true)}
                            alt="Msg Image"
                            height={300}
                            width={300}
                            src={data.image}
                            className="
                                object-cover
                                cursor-pointer
                                hover:scale-110
                                transition
                            "
                        />
                    ) : (
                        <div>
                            {data.body}
                        </div>
                    )}
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className="truncate max-w-[200px] text-xs font-light text-gray-800 dark:text-gray-200">
                        {`Đã xem bởi ${seenList}`}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MessageBox