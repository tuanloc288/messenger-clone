import getConversations from "../actions/getConversations"
import getUsers from "../actions/getUsers"
import Sidebar from "../components/sidebar/Sidebar"
import ConversationList from "./components/ConversationList"

export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode
}) {
    const conversations = await getConversations()
    const users = await getUsers()

    // the var conversations here is not exactly like the one
    // in the schema but more like a customized 
    // so in ConversationList we will need a type 
    // to represent this var, that what types/index use for
    // hover over the conversations var and have a look
    // at model Conversation in schema, u will figure this out
    
    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList
                    users={users}
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    )
}