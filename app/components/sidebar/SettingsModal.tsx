'use client'

import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import Modal from "../Modal"
import Input from "../inputs/Input"
import Image from "next/image"
import { CldUploadButton } from "next-cloudinary"
import Button from "../Button"

interface SettingsModalProps {
    isOpen?: boolean
    onClose: () => void
    currentUser: User
}

const SettingsModal: FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    currentUser
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
            name: currentUser?.name,
            image: currentUser?.image
        }
    })

    const image = watch('image')

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, { 
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/settings', data)
            .then(() => {
                router.refresh()
                onClose()
            })
            .catch(() => {
                toast.error('Đã có lỗi xảy ra! Hãy thử lại sau.')
            })
            .finally(() => {
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
                            Hồ sơ cá nhân
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
                            Chỉnh sửa thông tin công khai của bạn
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
                                label="Tên"
                                id="name"
                                errors={errors}
                                register={register}
                                required
                            />
                            <div>
                                <label
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        leading-6
                                        text-gray-900
                                        dark:text-gray-100
                                    "
                                >
                                    Ảnh
                                </label>
                                <div
                                    className="
                                        mt-2
                                        flex
                                        items-center
                                        gap-x-3
                                    "
                                >
                                    <Image
                                        alt="profile avatar"
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                        src={image || currentUser?.image || '/images/placeholder.png'}
                                    />
                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleUpload}
                                        uploadPreset="zpod6krx"
                                    >
                                        <Button 
                                            disabled={isLoading}
                                            secondary
                                            type="button"
                                        >
                                            Thay đổi ảnh đại diện
                                        </Button>
                                    </CldUploadButton>
                                </div>
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
                            secondary
                            type="button"
                            border
                            onClick={onClose}
                        >
                            Hủy
                        </Button>
                        <Button 
                            disabled={isLoading}
                            type="submit"
                        >
                            Lưu thay đổi
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default SettingsModal