'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import AuthSocialButton from "./AuthSocialButton"
import Button from "@/app/components/Button"
import Input from "@/app/components/inputs/Input"

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const session = useSession()
    const router = useRouter()
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users')
        }
    }, [session?.status])

    const toggleVariant = () => {
        setVariant(variant === 'LOGIN' ? 'REGISTER' : 'LOGIN')
    }

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        if (variant === 'REGISTER') {
            axios.post('/api/register', data)
                .then(() => signIn('credentials', data))
                .catch(() => toast.error('Đã có lỗi xảy ra!'))
                .finally(() => setIsLoading(false))
        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Thông tin đăng nhập không hợp lệ!')
                    }

                    if (callback?.ok && !callback?.error) {
                        toast.success('Đăng nhập thành công')
                        router.push('/users')
                    }
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true)

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Thông tin đăng nhập không hợp lệ!!')
                }

                if (callback?.ok && !callback?.error) {
                    toast.success('Đăng nhập thành công')
                }
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <div
            className="
                mt-8
                sm:mx-auto
                sm:w-full
                sm:max-w-md
            "
        >
            <div
                className="
                    bg-white
                    dark:bg-gray-900
                    px-4
                    py-8
                    shadow
                    sm:rounded-lg
                    sm:px-10
                "
            >
                <form
                    className="space-y-6" // space-x,y-number add vertical space between children
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (
                        <Input
                            id="name"
                            label="Tên"
                            register={register}
                            errors={errors}
                        />
                    )}
                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        register={register}
                        errors={errors}
                    />
                    <Input
                        id="password"
                        label="Mật khẩu"
                        type="password"
                        register={register}
                        errors={errors}
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            gradient
                            type="submit"
                        >
                            {variant === 'LOGIN' ? 'Đăng nhập' : 'Đăng ký'}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="
                                absolute
                                inset-0
                                flex
                                items-center
                            ">
                            <div className="w-full border-t border-gray-300 dark:border-white" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-white">
                                Hoặc tiếp tục với
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>
                </div>
                <div className="
                    flex
                    gap-2
                    justify-center
                    text-sm
                    mt-6
                    px-2
                    text-gray-500
                    dark:text-white
                ">
                    <div>
                        {variant === 'LOGIN' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === 'LOGIN' ? 'Tạo tài khoản' : 'Đăng nhập'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm