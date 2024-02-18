import Link from "next/link";

import { buttonVariants } from "./ui/button";

import { ArrowRight } from "lucide-react";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";
import { getServerAuthSession } from "~/server/auth";

async function Navbar() {
  const session = await getServerAuthSession();

  const { user } = session ?? {};

  if (!user) return null;

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <div className="flex h-14 items-center justify-between border-b border-zinc-200">
        <Link href="/" className="z-40 flex font-semibold">
          <span>FanLink</span>
        </Link>

        <MobileNav isAuth={!!user} />

        <div className="hidden items-center space-x-4 sm:flex">
          {!user ? (
            <>
              <Link
                href="/pricing"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Pricing
              </Link>
              <Link
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
                href={"/api/auth/signin"}
              >
                Sign in
              </Link>
              <Link
                className={buttonVariants({
                  size: "sm",
                })}
                href={"/api/auth/singin"}
              >
                Get started <ArrowRight className="ml-1.5 h-5 w-5" />
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Dashboard
              </Link>
              <Link
                href="/creators"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Creators
              </Link>

              <UserAccountNav
                name={user.name ?? ""}
                email={user.email ?? ""}
                imageUrl={user.image ?? ""}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
