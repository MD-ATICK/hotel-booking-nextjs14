

import { auth } from '@/auth'
import Navbar from '@/components/Navbar'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

export default async function layout({ children }: { children: ReactNode }) {

    const session = await auth()

    return (
        <SessionProvider session={session}>
            <div>
                <Navbar />
                {children}
            </div>
        </SessionProvider>
    )
}
