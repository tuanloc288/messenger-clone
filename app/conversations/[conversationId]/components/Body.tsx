'use client'

import useConversation from "@/app/hooks/useConversation"
import { FullMessageType } from "@/app/types"
import { FC, useEffect, useRef, useState } from "react"
import MessageBox from "./MessageBox"
import axios from "axios"
import { pusherClient } from "@/app/libs/pusher"
import { find } from "lodash"

interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body: FC<BodyProps> = ({
  initialMessages
}) => {
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { conversationId } = useConversation()

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  useEffect(() => {
    pusherClient.subscribe(conversationId)

    bottomRef?.current?.scrollIntoView()

    // handle when receive new msg
    // messages/route
    const messageHandler = (newMsg: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`)
      // get the current msg list then compare
      // the find() method will compare if the new msg.id 
      // already appear in the current msg list
      // then return the current list (prevent duplicate msg)
      // this one here is to 'notify' everyone 
      // that we have seen the new msg which send by ourself
      // by add curUser id to the msg seen list
      // the main purpose is still to add the last msg to body
      setMessages((current) => {
        if (find(current, { id: newMsg.id })) {
          return current
        }

        return [...current, newMsg]
      })

      bottomRef?.current?.scrollIntoView()
    }

    // this one on the opposite
    // add the seen status on the last msg when other
    // user seen our new msg (which also is the last msg)
    // [conversationId]/seen
    const updateMessageHandler = (updatedMsg: FullMessageType) => {

      setMessages((current) => current.map((currentMsg) => {
        // replace the one that match with the updated
        if (currentMsg.id === updatedMsg.id) {
          return updatedMsg
        }

        return currentMsg
      }))
    }

    // messages/route, [conversationId]/seen/route
    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler)

    // unbind and unsubscribe
    // every time we unmount this component
    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }

  }, [conversationId])

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          consecutive={messages[i]?.senderId === messages[i - 1]?.senderId}
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-20" />
    </div>
  )
}

export default Body