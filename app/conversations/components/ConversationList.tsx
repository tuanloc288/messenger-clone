'use client'

import clsx from "clsx"
import { useRouter } from "next/navigation"
import { FC, useEffect, useMemo, useState } from "react"
import { MdOutlineGroupAdd } from 'react-icons/md'

import useConversation from "@/app/hooks/useConversation"
import { FullConversationType } from "@/app/types"
import ConversationBox from "./ConversationBox"
import GroupChatModal from "./GroupChatModal"
import { User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { pusherClient } from "@/app/libs/pusher"
import { find } from "lodash"

interface ConversationListProps {
  // reason for this customized type but not the original Model
  // from schema can be found in conversations/layout
  initialItems: FullConversationType[]
  users: User[]
}

const ConversationList: FC<ConversationListProps> = ({
  initialItems,
  users
}) => {
  const [items, setItems] = useState(initialItems)

  const router = useRouter()
  const session = useSession()

  const { conversationId, isOpen } = useConversation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  useEffect(() => {
    if (!pusherKey) {
      return
    }

    // route: conversations, messages, seen
    pusherClient.subscribe(pusherKey)

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if(find(current, { id: conversation.id })) {
          return current
        }

        return [conversation, ...current]
      })
    }

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if(currentConversation.id === conversation.id){
          return {
            ...currentConversation,
            messages: conversation.messages
          }
        }

        return currentConversation
      }))
    }

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((single) => single.id !== conversation.id)]
      })

      if(conversationId === conversationId){
        router.push('/conversations')
      }
    }

    // conversations/route
    pusherClient.bind('conversation:new', newHandler)
    // [conversationId]/seen, /messages
    pusherClient.bind('conversation:update', updateHandler)
    // /[conversationId]
    pusherClient.bind('conversation:remove', removeHandler)
    
    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new', newHandler)
      pusherClient.unbind('conversation:update', updateHandler)
      pusherClient.unbind('conversation:remove', removeHandler)
    }
  }, [pusherKey, conversationId, router])

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(`
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
        dark:border-zinc-500
      `,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="
              text-2xl 
              font-bold 
              text-neutral-800 
              dark:text-neutral-200 
            ">
              Tin nhắn
            </div>
            <div
              className="
              rounded-full 
              p-2 
              bg-gray-100
              dark:bg-zinc-900/60
              text-gray-600
              dark:text-neutral-200 
              hover:opacity-75
              transition
              cursor-pointer
            "
              onClick={() => setIsModalOpen(true)}
            >
              <MdOutlineGroupAdd size={28} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  )
}

export default ConversationList