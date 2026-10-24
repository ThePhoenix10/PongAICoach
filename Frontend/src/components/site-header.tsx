"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AccountMenu } from "./account-menu";
import { useSession } from "./session-provider";
import { useUploadAction } from "@/lib/use-upload-action";

const navBtn =
  "whitespace-nowrap rounded-lg px-2 py-1.5 font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors";
const mobileNavBtn =
  "block w-full text-left rounded-lg px-4 py-3 font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors";

export function SiteHeader() {
  const { user, ready, signOut } = useSession();
  const uploadVideo = useUploadAction();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = (mobile: boolean) => {
    const cls = mobile ? mobileNavBtn : navBtn;
    return (
      <>
        <Link
          href="/"
          className={cls}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>

        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            uploadVideo();
          }}
          className={`${cls} cursor-pointer`}
        >
          Upload Video
        </button>

        {ready && user && (
          <Link
            href="/dashboard/"
            className={cls}
            onClick={() => setMenuOpen(false)}
          >
            My Videos
          </Link>
        )}

        {ready && !user && (
          <Link
            href="/signin/?next=/dashboard/"
            className={cls}
            onClick={() => setMenuOpen(false)}
          >
            My Videos
          </Link>
        )}

        <Link
          href="/analysis/game_1/"
          className={cls}
          onClick={() => setMenuOpen(false)}
        >
          Demo Video
        </Link>

        <Link
          href="/how-it-works/"
          className={cls}
          onClick={() => setMenuOpen(false)}
        >
          How it works
        </Link>

        <Link
          href="/about/"
          className={cls}
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>
      </>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <a
        href="#main"
        className="focus:bg-brand focus:text-on-brand sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <div
        className="relative flex w-full items-center px-4 sm:px-8"
        style={{ height: "74px" }}
      >
        {/* Logo — absolutely positioned & sized independently so it doesn't
            drive the nav row's own layout; the bar is kept just tall enough to
            fully contain it so nothing pokes out past the white background */}
        <Link
          href="/"
          className="absolute left-0 sm:left-2 top-1/2 flex items-center"
          style={{ transform: "translateY(-57%)" }}
        >
          <Image
            src="/PongAILogo.png"
            alt="PongAI"
            width={1758}
            height={593}
            className="w-auto object-contain"
            style={{ height: "88px" }}
            priority
          />
        </Link>

        {/* Desktop nav — hidden below lg */}
        <nav
          className="absolute left-1/2 top-1/2 hidden lg:flex items-center gap-0"
          style={{
            fontSize: "1.125rem",
            transform: "translate(calc(-50% + 75px), -50%)",
          }}
        >
          {navLinks(false)}
        </nav>

        {/* Right side: sign-in + hamburger */}
        <div className="ml-auto flex items-center gap-2">
          {ready &&
            (user ? (
              <AccountMenu user={user} onSignOut={signOut} />
            ) : (
              <Link href="/signin/" className={`${navBtn} hidden lg:inline-flex`}>
                Sign in
              </Link>
            ))}

          {/* Hamburger — visible below lg */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <span
              className={`block h-0.5 w-5 bg-slate-700 transition-all duration-200 ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-slate-700 transition-all duration-200 mt-1 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-slate-700 transition-all duration-200 mt-1 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="lg:hidden border-t border-slate-200 bg-white px-4 py-2 shadow-lg">
          {navLinks(true)}

          {ready && !user && (
            <Link
              href="/signin/"
              className={mobileNavBtn}
              onClick={() => setMenuOpen(false)}
            >
              Sign in
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}