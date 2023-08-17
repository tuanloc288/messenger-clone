'use client'

import Button from "@/app/components/Button"
import Modal from "@/app/components/Modal"
import useConversation from "@/app/hooks/useConversation"
import { Dialog } from "@headlessui/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FC, useCallback, useState } from "react"
import { toast } from "react-hot-toast"
import { FiAlertTriangle } from 'react-icons/fi'

interface ConfirmModalProps {
    isOpen?: boolean
    onClose: () => void

}

const ConfirmModal: FC<ConfirmModalProps> = ({
    isOpen,
    onClose
}) => {
    const router = useRouter()
    const { conversationId } = useConversation()
    const [isLoading, setIsLoading] = useState(false)

    const onDelete = useCallback(() => {
        setIsLoading(true)
        axios.delete(`/api/conversations/${conversationId}`)
            .then(() => {
                onClose()
                router.push('/conversations')
                router.refresh()
            })
            .catch(() => {
                toast.error('Đã xảy ra lỗi! Hãy thử lại sau.')
            })
            .finally(() => {
                setIsLoading(false)
                toast.success('Xóa cuộc trò chuyện thành công.')
            })
    },[conversationId, router, onClose])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="sm:flex sm:items-start">
                <div className="
                    mx-auto
                    flex
                    items-center
                    justify-center
                    h-12
                    w-12
                    bg-red-100
                    shrink-0
                    rounded-full
                    sm:mx-0
                    sm:h-10
                    sm:w-10
                    self-center
                ">
                    <FiAlertTriangle size={24} className="text-red-600"/>
                </div>
                <div 
                    className="
                        mt-3
                        text-center
                        sm:ml-4
                        sm:mt-0
                        sm:text-left
                    ">
                    <Dialog.Title
                        as='h3'
                        className="
                            text-base
                            font-semibold
                            leading-6
                            text-gray-900
                            dark:text-gray-100
                        "
                    >
                        Xoá cuộc trò chuyện
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-neutral-700 dark:text-neutral-300">
                            Bạn có chắc muốn xóa cuộc trò chuyện này không? Hành động này không thể hoàn tác.
                        </p>
                    </div>
                </div>
            </div>
            <div 
                className="
                    mt-5
                    flex
                    flex-row-reverse
                    justify-center
                    sm:justify-start
                    gap-3
                    sm:mt-4

                "
            >
                <Button disabled={isLoading} danger onClick={onDelete}>
                    Xóa
                </Button>
                <Button disabled={isLoading} secondary border onClick={onClose}>
                    Hủy
                </Button>
            </div>
        </Modal>
    )
}

export default ConfirmModal