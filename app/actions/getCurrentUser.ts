import prisma from '@/app/libs/prismadb'

import getSession from './getSession'

const getCurrentUser = async () => {
    try {
        const session = await getSession()

        if(!session?.user?.email) {
            return null
        }

        const curUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if(!curUser){
            return null
        }

        return curUser
    } catch(error: any) {
        return null
    }
}

export default getCurrentUser