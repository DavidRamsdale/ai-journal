import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? "/journal" : "/new-user";

  return (
    <div className="w-screen h-screen bg-black text-white flex items-center">
      <div className="container max-w-[660px]">
        <h1 className="text-6xl pb-2">My personal AI Journal app</h1>
        <p className="text-2xl text-white/80 pb-3">
          Track your mood based on what you write!
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-800 p-3 rounded-lg text-xl">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
