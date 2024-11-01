import { auth } from "@/auth";
import Link from "next/link";

export default async function Home() {

  const session = await auth()
  console.log("user", session?.user)

  return (
    <div>
      <br /> <br />
      <Link href={'/test'}>Test</Link>
      <br />
      <br />
      {session?.user?.email || "no user logged in"}
    </div>
  );
}
