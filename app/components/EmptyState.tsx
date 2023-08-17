'use client'

const EmptyState = () => {
    return (
        <div className="
            px-4 
            py-10 
            sm:px-6 
            lg:px-8
            h-full
            flex
            justify-center
            items-center
            bg-gray-100
            dark:bg-zinc-900/60
        ">
            <div className="text-center items-center flex flex-col">
                <h3 className="
                    mt-2 
                    text-2xl
                    font-semibold
                    text-gray-800
                    dark:text-gray-100
                ">
                    Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới
                </h3>
            </div>
        </div>
    )
}

export default EmptyState