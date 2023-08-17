import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
    conversationId?: string
} 

export async function POST (
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser()

        const {
            conversationId
        } = params

        if(!currentUser?.email || !currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    }
                },
                users: true
            }
        })

        if(!conversation){
            return new NextResponse('Invalid conversation ID', { status: 400 })
        }

        const lastMsg = conversation.messages[conversation.messages.length - 1]
        if(!lastMsg){
            // first time messaging
            return NextResponse.json(conversation)
        }

        // update 'seen' status for last message
        const updatedMsg = await prisma.message.update({
            where: {
                id: lastMsg.id
            },
            include: {
                sender: true,
                seen: true
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        }) 

        await pusherServer.trigger(currentUser.email, 'conversation:update', {
            id: conversationId,
            messages: [updatedMsg]
        })

        if(lastMsg.seenIds.indexOf(currentUser.id) !== -1){
            return NextResponse.json(conversation)
        }
        
        await pusherServer.trigger(conversationId!, 'message:update', updatedMsg)

        return NextResponse.json(updatedMsg)
    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGES_SEEN');
        return new NextResponse('Internal error', { status: 500 })
    }
}