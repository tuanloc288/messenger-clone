'use client'

import Button from "@/app/components/Button"
import Modal from "@/app/components/Modal"
import Input from "@/app/components/inputs/Input"
import Select from "@/app/components/inputs/Select"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

interface GroupChatModalProps {
    isOpen?: boolean
    onClose: () => void
    users: User[]
}

const GroupChatModal: FC<GroupChatModalProps> = ({
    isOpen,
    onClose,
    users
}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: []
        }
    })

    const members = watch('members')

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/conversations', {
            ...data,
            isGroup: true
        })
            .then(() => {
                router.refresh()
                onClose()
            })
            .catch(() => {
                toast.error('Đã có lỗi xảy ra! Hãy thử lại sau.')
            })
            .finally(() => {
                toast.success('Tạo nhóm chat thành công.')
                setIsLoading(false)
            })
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 dark:border-gray-100/10 pb-12">
                        <h2
                            className="
                                text-base
                                font-semibold
                                leading-7
                                text-gray-900
                                dark:text-gray-100
                            "
                        >
                            Tạo cuộc trò chuyện nhóm
                        </h2>
                        <p
                            className="
                                mt-1
                                text-sm
                                leading-6
                                text-gray-600
                                dark:text-gray-400
                            "
                        >
                            Tạo một nhóm chat với hơn 2 thành viên
                        </p>
                        <div
                            className="
                                mt-10
                                flex
                                flex-col
                                gap-y-8
                            "
                        >
                            <Input
                                disabled={isLoading}
                                label="Tên nhóm"
                                id="name"
                                errors={errors}
                                register={register}
                                required
                            />
                            <Select
                                disabled={isLoading}
                                label='Thành viên'
                                options={users.map((user) => ({
                                    value: user.id,
                                    label: user.name
                                }))}
                                onChange={(value) => setValue('members', value, {
                                    shouldValidate: true
                                })}
                                value={members}
                            />
                        </div>
                    </div>
                </div>
                <div 
                    className="
                        mt-6
                        flex
                        items-center
                        justify-end
                        gap-x-6
                    "
                >
                    <Button
                        disabled={isLoading}
                        onClick={onClose}
                        type="button"
                        secondary
                        border
                    >
                        Hủy
                    </Button>
                    <Button
                        disabled={isLoading}
                        type="submit"
                    >
                        Tạo nhóm
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default GroupChatModal