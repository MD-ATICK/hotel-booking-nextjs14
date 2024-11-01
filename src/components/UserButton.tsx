import userImage from '@/assets/girl.jpg';
import Image from "next/image";
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function UserButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className=' outline-none'>
                <Image alt="" src={userImage} className=" rounded-full shadow-sm aspect-square object-cover" width={40} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <Link href={'/profile'}>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                </Link>
                <Link href={'/hotel/new'}>
                    <DropdownMenuItem>
                        Add hotel
                    </DropdownMenuItem>
                </Link>
                <Link href={'/my-hotels'}>
                    <DropdownMenuItem>
                        My Hotels
                    </DropdownMenuItem>
                </Link>
                <Link href={'/my-bookings'}>
                    <DropdownMenuItem>
                        My Bookings
                    </DropdownMenuItem>
                </Link>
                <LogoutButton />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
