'use client'

import useConversation from "@/app/hooks/useConversation"
import useRoutes from "@/app/hooks/useRoutes"
import MobileItem from "./MobileItem"


const MobileFooter = () => {
    const routes = useRoutes()
    const { isOpen } = useConversation()

    if (isOpen) {
        return null
    }

    return (
        <div className="
            fixed 
            justify-between
            w-full 
            bottom-0
            z-10
            flex
            items-center
            bg-white
            dark:bg-zinc-800/90
            border-t-[1px]
            lg:hidden
        ">
            {routes.map((route) => (
                <MobileItem
                    key={route.label}
                    href={route.href}
                    icon={route.icon}
                    active={route.active}
                    onClick={route.onClick}
                />
            ))}
        </div>
    )
}

export default MobileFooter