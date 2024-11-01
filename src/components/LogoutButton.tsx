"use client"
import { logout } from '@/lib/logout'
import { signOut } from 'next-auth/react'
import { DropdownMenuItem } from './ui/dropdown-menu'

export default function LogoutButton() {
    return (
        <DropdownMenuItem onClick={async () => {
            await logout()
            await signOut({ redirect: false })
        }}>
            Logout
        </DropdownMenuItem>
    )
}
