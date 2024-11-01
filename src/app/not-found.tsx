import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='w-[90vw]  sm:w-[400px] rounded-xl shadow-lg p-6 bg-gradient-to-r from-blue-600 to-blue-600 via-sky-500 flex justify-center items-center flex-col text-black font-medium'>
      <p className=' text-sm'>Page not found.</p> <br />
      <Link href={'/login'} className=' text-sm underline font-medium' >Back to login</Link>
    </div>
  )
}
