import logo from '@/assets/logo.png'
import { getAuth } from '@/lib/getAuth'
import Image from "next/image"
import Link from 'next/link'
import { ModeToggle } from './ModeToggle'
import NavbarSearch from './NavbarSearch'
import { Button } from './ui/button'
import UserButton from './UserButton'



export default async function Navbar() {

  const user = await getAuth()

  return (
    <div className=' h-16 backdrop-blur-lg sticky top-0 left-0 border-b z-50 bg-[#010a1116] '>
      <div className=' container mx-auto flex items-center justify-between h-full px-2'>
        <div className='flex items-center h-full  gap-1 justify-center'>
          <Image alt="" src={logo} height={30} />
          <h1 className=' text-xl md:text-2xl font-bold'>Hotel booking.</h1>
        </div>
        <NavbarSearch className=' hidden md:block' />
        <div className=' flex items-center gap-4'>
          <ModeToggle />
          {
            !user && (
              <div className='flex items-center gap-3'>
                <Link href={'/login'}>
                  <Button>
                    Login
                  </Button>
                </Link>
                <Link href={'/sign-up'}>
                  <Button>
                    Sign Up
                  </Button>
                </Link>
              </div>
            )
          }
          {user && <UserButton />}
        </div>
      </div>
    </div>
  )
}
