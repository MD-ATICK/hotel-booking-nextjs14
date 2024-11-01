import { ReactNode } from 'react'

export default function ErrorMessage({ children }: { children: ReactNode }) {
    return (
        <div className=' h-20 text-lg font-bold w-full flex justify-center items-center text-center'>
            {children}
        </div>
    )
}
