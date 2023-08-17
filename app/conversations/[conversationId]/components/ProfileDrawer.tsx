'use client'

import useOtherUser from "@/app/hooks/useOtherUser"
import { Conversation, User } from "@prisma/client"
import { FC, useMemo, Fragment, useState } from "react"
import { format } from 'date-fns'
import { Transition, Dialog } from "@headlessui/react"
import { IoClose, IoTrash } from 'react-icons/io5'
import Avatar from "@/app/components/Avatar"
import ConfirmModal from "./ConfirmModal"
import AvatarGroup from "@/app/components/AvatarGroup"
import useActiveList from "@/app/hooks/useActiveList"

interface ProfileDrawerProps {
    data: Conversation & {
        users: User[]
    }
    isOpen?: boolean
    onClose: () => void
}

const ProfileDrawer: FC<ProfileDrawerProps> = ({
    data,
    isOpen,
    onClose
}) => {
    const otherUser = useOtherUser(data)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const { members } = useActiveList()

    const isActive = members.indexOf(otherUser?.email!) !== -1

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP')
    }, [otherUser.createdAt])

    const title = useMemo(() => {
        return data.name || otherUser.name
    }, [data.name, otherUser.name])

    const statusText = useMemo(() => {
        if (data.isGroup) {
            return `${data.userIds.length} thành viên`
        }

        return isActive ? 'Đang hoạt động' : 'Ngoại tuyến'
    }, [data, isActive])

    return (
        <>
            <ConfirmModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
            />
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-20' onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration 300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className="
                                fixed
                                inset-0
                                bg-black
                                dark:bg-gray-400
                                bg-opacity-40
                                dark:bg-opacity-10
                            "
                        />
                    </Transition.Child>
                    <div className="
                        fixed
                        inset-0
                        overflow-hidden
                    ">
                        <div className="
                            absolute
                            inset-0
                            overflow-hidden
                        ">
                            {/*  */}
                            <div className="
                                pointer-events-none
                                fixed
                                inset-y-0
                                right-0
                                flex
                                max-w-full
                                pl-10
                            ">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-300"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration 300"
                                    leaveTo="translate-x-full"
                                >
                                    {/*  */}
                                    <Dialog.Panel
                                        className="
                                            pointer-events-auto
                                            w-screen
                                            max-w-md
                                        "
                                    >
                                        <div
                                            className="
                                                flex
                                                flex-col
                                                h-full
                                                overflow-y-scroll
                                                bg-white
                                                dark:bg-zinc-900
                                                py-6
                                                shadow-xl
                                        ">
                                            <div className="px-4 sm:px-6">
                                                <div className="
                                                    flex
                                                    items-start
                                                    justify-end    
                                                ">
                                                    <div className="flex items-center">
                                                        <button
                                                            onClick={onClose}
                                                            type="button"
                                                            className="
                                                                rounded-md
                                                                text-gray-700
                                                                dark:text-gray-300
                                                                hover:text-gray-500
                                                                focus:outline-none
                                                                focus:ring-2
                                                                focus:ring-sky-500
                                                                focus:ring-offset-2
                                                            "
                                                        >
                                                            <span className="sr-only"> Đóng </span>
                                                            <IoClose size={24} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="
                                                relative 
                                                mt-6
                                                flex-1
                                                px-4
                                                sm:px-6
                                            ">
                                                <div className="
                                                    flex
                                                    flex-col
                                                    items-center
                                                ">
                                                    <div className="mb-2">
                                                        {data.isGroup ? (
                                                            <AvatarGroup users={data.users} />
                                                        ) : (
                                                            <Avatar user={otherUser} />
                                                        )}
                                                    </div>
                                                    <div className="font-bold">
                                                        {title}
                                                    </div>
                                                    <div className="
                                                        text-sm
                                                        text-neutral-800
                                                        dark:text-neutral-200
                                                    ">
                                                        {statusText}
                                                    </div>
                                                    <div className="flex gap-10 my-8">
                                                        <div
                                                            onClick={() => setConfirmOpen(true)}
                                                            className="
                                                                flex
                                                                flex-col
                                                                gap-3
                                                                items-center
                                                                cursor-pointer
                                                                hover:opacity-75
                                                            "
                                                        >
                                                            <div className="
                                                                w-10
                                                                h-10
                                                                bg-neutral-100
                                                                text-black
                                                                rounded-full
                                                                flex
                                                                items-center
                                                                justify-center
                                                            ">
                                                                <IoTrash size={20} />
                                                            </div>
                                                            <div className="
                                                                text-sm
                                                                font-light
                                                                text-neutral-800
                                                                dark:text-neutral-200
                                                            ">
                                                                Xóa {/* Xóa lịch sử cuộc trò chuyện */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="
                                                        w-full
                                                        py-5
                                                        sm:px-0
                                                        sm:pt-0
                                                    ">
                                                        <dl
                                                            className="
                                                                space-y-8
                                                                px-4
                                                                sm:space-y-6
                                                                sm:px-6
                                                            "
                                                        >
                                                            {!data.isGroup ? (
                                                                <div>
                                                                    <dt
                                                                        className="
                                                                            text-sm
                                                                            font-bold
                                                                            text-neutral-600
                                                                            dark:text-neutral-400
                                                                            sm:w-40
                                                                            sm:flex-shrink-0
                                                                        "
                                                                    >
                                                                        Email
                                                                    </dt>
                                                                    <dd
                                                                        className="
                                                                            mt-1
                                                                            text-sm
                                                                            text-neutral-800
                                                                            dark:text-neutral-200
                                                                            sm:col-span-2
                                                                        ">
                                                                        {otherUser.email}
                                                                    </dd>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <dt
                                                                        className="
                                                                            text-sm
                                                                            font-bold
                                                                            text-neutral-600
                                                                            dark:text-neutral-400
                                                                            sm:w-40
                                                                            sm:flex-shrink-0
                                                                        "
                                                                    >
                                                                        Emails
                                                                    </dt>
                                                                    <dd
                                                                        className="
                                                                            mt-1
                                                                            text-sm
                                                                            text-neutral-800
                                                                            dark:text-neutral-200
                                                                            sm:col-span-2
                                                                        "
                                                                    >
                                                                        {data.users.map((user) => (
                                                                            <div 
                                                                                className="
                                                                                    flex
                                                                                    flex-col
                                                                                    py-1
                                                                                "
                                                                            >
                                                                                <span className="font-semibold"> {`${user.name}:`} </span>
                                                                                <span className="text-neutral-700 dark:text-neutral-300"> {user.email} </span>
                                                                            </div>
                                                                        ))}
                                                                    </dd>
                                                                </div>
                                                            )}
                                                            {!data.isGroup && (
                                                                <>
                                                                    <hr className="dark:border-neutral-600" />
                                                                    <div>
                                                                        <dt className="
                                                                            text-sm
                                                                            font-bold
                                                                            text-neutral-600
                                                                            dark:text-neutral-400
                                                                            sm:w-40
                                                                            sm:flex-shrink-0
                                                                        ">
                                                                            Gia nhập vào
                                                                        </dt>
                                                                        <dd className="
                                                                            mt-1
                                                                            text-sm
                                                                            text-gray-900
                                                                            sm:col-span-2
                                                                        ">
                                                                            <time
                                                                                dateTime={joinedDate}
                                                                                className="
                                                                                text-neutral-800
                                                                                dark:text-neutral-200
                                                                            ">
                                                                                {joinedDate}
                                                                            </time>
                                                                        </dd>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default ProfileDrawer