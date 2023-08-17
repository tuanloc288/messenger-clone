import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            // connect curUser id to the group
            // with member id and current user id
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        // get all info instead of just the id
        // of the member in a group chat
        include: {
          users: true,
        },
      });

      newConversation.users.forEach((user) => {
        if(user.email){
          pusherServer.trigger(user.email, 'conversation:new', newConversation)
        }
      })

      return NextResponse.json(newConversation);
    }

    /* 
        (for 1-1 conversation only)
        check if there is any conversation in the db
        that contain only the current user and the one
        that they try to start a new conversation with
        if it already exist, we not going to create a new one
        and since this way of comparison only work with findMany
        so we have to use findMany here
    */
    const existingConversation = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    // if the conversation that mention about
    // already exist, just take the first result from it
    const singleConversation = existingConversation[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    // if it not exist, create a new one
    // this conversation only contain 2 user id
    // the current user and the one they start
    // the conversation with
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    newConversation.users.map((user) => {
      if(user.email){
        pusherServer.trigger(user.email, 'conversation:new' , newConversation)
      }
    })

    return NextResponse.json(newConversation);
  } catch (error: any) {
    return new NextResponse("Internal error", { status: 500 });
  }
}