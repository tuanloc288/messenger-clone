'use client'

import clsx from "clsx"
import { FC, useCallback, useMemo } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { format } from 'date-fns'

import Avatar from "@/app/components/Avatar"
import useOtherUser from "@/app/hooks/useOtherUser"
import { FullConversationType } from "@/app/types"
import AvatarGroup from "@/app/components/AvatarGroup"

interface ConversationBoxProps {
    data: FullConversationType
    selected?: boolean
}

const ConversationBox: FC<ConversationBoxProps> = ({
    data,
    selected
}) => {
    const otherUser = useOtherUser(data)
    const session = useSession()
    const router = useRouter()

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)
    }, [router, data.id])

    const lastMsg = useMemo(() => {
        const msgs = data.messages || []

        return msgs[msgs.length - 1]
    }, [data.messages])

    const userEmail = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])

    const hasSeen = useMemo(() => {
        if (!lastMsg) {
            return false
        }

        const seenArray = lastMsg.seen || []

        if (!userEmail) {
            return false
        }
        
        return seenArray.filter((user) => user.email === userEmail).length !== 0
    }, [userEmail, lastMsg])

    const lastMsgText = useMemo(() => {

        const isSender = lastMsg?.sender?.email === userEmail

        if(!data.isGroup) {
            // check if there is any msg as image
            if (lastMsg?.image) {
                return isSender
                ? 'Bạn: Đã gửi một ảnh' : 'Đã gửi một ảnh'
            }
    
            // check if there is any msg as text 
            if (lastMsg?.body) {
                return isSender 
                ? `Bạn: ${lastMsg.body}` : lastMsg.body 
            }
        } else {
            const senderName = data.users.filter((user) => user.id === lastMsg?.senderId)

            if (lastMsg?.image) {
                return isSender  
                ? 'Bạn: Đã gửi một ảnh' : `${senderName[0].name}: Đã gửi một ảnh`
            }
    
            if (lastMsg?.body) {
                return isSender  
                ? `Bạn: ${lastMsg.body}` : `${senderName[0].name}: ${lastMsg.body}` 
            }
        }

        // no msg found, so its a new one 
        return 'Bắt đầu cuộc trò chuyện'
    }, [lastMsg, userEmail])

    return (
        <div onClick={handleClick} className={clsx(`
            w-full
            relative
            flex
            items-center
            space-x-3 
            p-3
            hover:bg-neutral-100
            dark:hover:bg-zinc-900/50
            rounded-lg
            transition
            cursor-pointer
        `,
            selected ? 'bg-neutral-100 dark:bg-zinc-900/50' : 'bg-transparent'
        )}>
            {data.isGroup ? (
                <AvatarGroup users={data.users}/>
            ) : (
               <Avatar user={otherUser} />
            )}
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="
                        flex
                        justify-between
                        items-center
                        mb-1
                    ">
                        <p className="
                            text-md
                            font-medium
                            text-gray-900
                            dark:text-gray-100
                        ">
                            {data.name || otherUser.name}
                        </p>
                        {lastMsg?.createdAt && (
                            <p className="
                                text-xs
                                text-gray-800
                                dark:text-gray-200
                                font-light
                            ">
                                {format(new Date(lastMsg.createdAt), 'p')}
                            </p>
                        )}
                    </div>
                    <p className={clsx(`
                        truncate
                        text-sm
                    `,
                        hasSeen ? 'text-gray-800 dark:text-gray-200' : 'text-black dark:text-white font-medium'
                    )}>
                        {lastMsgText}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox