import search from '@/assets/search.png';
import { cn } from '@/lib/utils';
import Image from "next/image";
import { Input } from "./ui/input";

export default function NavbarSearch({className}: {className?:string}) {
  return (
    <div className={cn(' h-2/3 w-2/5 group rounded-lg bg-background relative', className)}>
        <Input className=" w-full px-4 h-full" placeholder="Search" />
        <Image alt="" src={search} height={15} className=' absolute top-1/2 -translate-y-1/2 right-4 group-hover:invert invert-[50%] dark:invert-0' />
    </div>
  )
}
