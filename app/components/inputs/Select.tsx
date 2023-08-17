'use client'

import { useTheme } from "next-themes"
import { FC } from "react"
import ReactSelect from 'react-select'

interface SelectProps {
    disabled?: boolean
    label: string
    value?: Record<string, any>
    onChange: (value: Record<string, any>) => void
    options: Record<string, any>[]
}

const Select: FC<SelectProps> = ({
    disabled,
    label,
    value,
    onChange,
    options,
}) => {
    const { theme } = useTheme()

    return (
        <div className="z-50">
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
                {label}
            </label>
            <div className="mt-2">
                <ReactSelect
                    placeholder='Chọn thành viên...'
                    isDisabled={disabled}
                    value={value}
                    onChange={onChange}
                    isMulti // allow to select multiple options
                    options={options}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({
                            ...base,
                            zIndex: 50
                        }),
                        menu: (base) => ({
                            ...base,
                            backgroundColor: theme === 'dark' ? '#404040' : 'white',
                        }),
                        option: (base) => ({
                            ...base, // #262626
                            ":hover": {
                                backgroundColor: theme === 'dark' ? "#262626" : '#9ecff7',
                                cursor: 'pointer'
                            },
                            backgroundColor: theme === 'dark' ? '#404040' : 'white'
                        }),
                        multiValue: (base) => ({
                            ...base,
                            backgroundColor: theme === 'dark' ? "#262626" : '#9ecff7',
                            color: theme === 'dark' ? "white" : 'black'
                        }),
                        multiValueLabel: (base) => ({
                            ...base,
                            backgroundColor: theme === 'dark' ? "#262626" : '#9ecff7',
                            color: theme === 'dark' ? "white" : 'black',
                        }),
                        multiValueRemove: (base) => ({
                            ...base,
                            ":hover": {
                                opacity: .75
                            }
                        })
                    }}
                    classNames={{
                        control: () => "text-md"
                    }}
                    className="react-select-container"
                    classNamePrefix="react-select"
                />
            </div>
        </div>
    )
}

export default Select