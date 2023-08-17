'use client'

import useRoutes from "@/app/hooks/useRoutes"
import { FC, useState } from "react"
import DesktopItem from "./DesktopItem"
import { User } from "@prisma/client"
import Avatar from "../Avatar"
import SettingsModal from "./SettingsModal"

interface DesktopSidebarProps {
    currentUser: User
}

const DesktopSidebar: FC<DesktopSidebarProps> = ({
    currentUser
}) => {
    const routes = useRoutes()
    const [isOpen, setIsOpen] = useState(false)

    
    return (
        <>
            <SettingsModal
                currentUser={currentUser}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <div className="
                hidden
                lg:fixed
                lg:inset-y-0
                lg:left-0
                lg:z-10
                lg:w-20
                lg:overflow-y-auto
                lg:border-r
                dark:lg:border-zinc-900
                lg:pb-4
                xl:px-6
                lg:flex
                lg:flex-col
                justify-between
            ">
                <nav className="mt-4 flex flex-col justify-between">
                    <ul className="
                        flex
                        flex-col
                        items-center
                        space-y-1
                    ">
                        {routes.map((route) => (
                            <DesktopItem
                                key={route.label}
                                href={route.href}
                                label={route.label}
                                icon={route.icon}
                                active={route.active}
                                onClick={route.onClick}
                            />
                        ))}
                    </ul>
                </nav>
                <nav className="mt-4 flex flex-col justify-between items-center">
                    <div
                        onClick={() => setIsOpen(true)}
                        className="
                            cursor-pointer
                            hover:opacity-75
                            transition
                        "
                    >
                        <Avatar user={currentUser} />
                    </div>
                </nav>
            </div>
        </>
    )
}

export default DesktopSidebar