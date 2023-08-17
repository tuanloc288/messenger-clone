import Image from 'next/image'
import AuthForm from './components/AuthForm'

export default function Home() {
    return (
        <div
            className='
                flex
                flex-col
                min-h-full
                justify-center
                py-12
                sm:px-6
                lg:px-8
                bg-gray-100
                dark:bg-gray-800/80
                '>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <Image
                    src="/images/logo.png"
                    alt='Logo'
                    height="48"
                    width="48"
                    className='w-auto mx-auto'
                />
                <h2
                    className='
                        mt-6
                        text-center
                        text-3xl
                        sm:text-2xl
                        font-bold
                        tracking-tight
                        text-gray-800
                        dark:text-gray-100
                    '
                >
                    Đăng nhập vào tài khoản của bạn
                </h2>
                <AuthForm />
            </div>
        </div>
    )
}
