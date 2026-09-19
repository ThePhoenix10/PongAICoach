"use client";

import Link from "next/link";
import Image from "next/image";
import { AccountMenu } from "./account-menu";
import { useSession } from "./session-provider";
import { useUploadAction } from "@/lib/use-upload-action";

const navBtn = "rounded-lg px-3 py-1.5 font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors";

export function SiteHeader() {
  const { user, ready, signOut } = useSession();
  const uploadVideo = useUploadAction();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <a href="#main" className="focus:bg-brand focus:text-on-brand sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:px-3 focus:py-2 focus:text-sm">
        Skip to content
      </a>

      {/* Header container — h-[70px] is ~10% taller than h-16 (64px) */}
      <div className="flex w-full items-center gap-2 px-8" style={{ height: "70px" }}>

        {/* Logo — 10% larger: 198x66 up from 180x60 */}
        <Link href="/" className="flex items-center bg-white ml-4 shrink-0">
          <Image
            src="/PongAILogo.jpeg"
            alt="PongAI"
            width={198}
            height={66}
            className="w-auto object-contain"
            style={{ height: "70px" }}
            priority
          />
        </Link>

        {/* Nav buttons — left aligned after logo */}
        <nav className="flex items-center gap-1 ml-32" style={{ fontSize: "1.125rem" }}>
          <button
            type="button"
            onClick={uploadVideo}
            className={`${navBtn} cursor-pointer`}
          >
            Upload Video
          </button>

          {ready && user && (
            <Link href="/dashboard/" className={navBtn}>
              My Videos
            </Link>
          )}

          {ready && !user && (
            <Link href="/signin/?next=/dashboard/" className={navBtn}>
              My Videos
            </Link>
          )}

          <Link href="/analysis/game_1/" className={navBtn}>
            Demo Video
          </Link>

          <Link href="/how-it-works/" className={navBtn}>
            How it works
          </Link>

          <Link href="/about/" className={navBtn}>
            About Us
          </Link>
        </nav>

        {/* Sign in — pinned to far right */}
        <div className="ml-auto">
          {ready &&
            (user ? (
              <AccountMenu user={user} onSignOut={signOut} />
            ) : (
              <Link href="/signin/" className={navBtn}>
                Sign in
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
}