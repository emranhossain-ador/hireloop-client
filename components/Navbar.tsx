
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "@/lib/auth-client";

const navLinks = [
    { name: "Browse Jobs", href: "/browse-jobs" },
    { name: "Company", href: "/company" },
    { name: "Pricing", href: "/pricing" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const session = useSession();
    const user = session.data?.user;

    if (pathname?.startsWith("/dashboard")) {
        return null;
    }

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="sticky top-2 z-40 bg-background/85 backdrop-blur">
            <nav className="flex section-container mx-auto min-h-18.5 w-full items-center justify-between rounded-[18px] bg-sidebar px-3 py-2 pl-6.5 shadow-md">

                {/* Logo */}
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="h-8 w-fit "
                >
                    <Image src={'/images/logo.png'} width={40} height={60} alt="logo" className="w-full h-full object-contain" />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <div className="flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[16px] transition-colors duration-200 hover:text-[#8076ff]"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="h-6.25 w-px bg-border" />

                    {
                        user ?
                            <>
                                <Link href={`/dashboard/${user?.role}`}
                                    className="flex items-center justify-center whitespace-nowrap rounded-[13px] bg-primary px-5.75 py-3 text-[16px] font-medium text-white shadow-md shadow-indigo-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-indigo-500/25"
                                >
                                    Dashboard
                                </Link>

                                <button type="button" onClick={() => signOut()} className="px-4 py-2.5 rounded-md bg-red-500 text-white text-sm font-medium tracking-wide cursor-pointer hover:bg-red-600 transition-all">Logout</button>
                            </>

                            :
                            (
                                <>
                                    <Link
                                        href="/sign-in"
                                        className="whitespace-nowrap text-[17px] font-medium text-primary transition-colors hover:text-[#a49cff]"
                                    >
                                        Sign In
                                    </Link>

                                    <Link
                                        href="/sign-up"
                                        className="flex items-center justify-center whitespace-nowrap rounded-[13px] bg-primary px-5.75 py-3 text-[16px] font-medium text-white shadow-md shadow-indigo-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-indigo-500/25"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )
                    }


                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    className="flex items-center justify-center rounded-lg p-2 text-foreground transition-colors hover:bg-white/10 md:hidden"
                >
                    {menuOpen ? (
                        <X size={25} />
                    ) : (
                        <Menu size={25} />
                    )}
                </button>
            </nav>

            {/* Mobile Navigation */}
            <div
                className={`absolute top-[calc(100%)] w-full flex flex-col gap-1 rounded-[15px] border border-border bg-muted p-4 shadow-xl transition-all duration-200 md:hidden ${menuOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                    }`}
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={closeMenu}
                        className="rounded-lg px-3 py-3 text-[15px] text-foreground transition-colors hover:bg-white/5 hover:text-[#8076ff]"
                    >
                        {link.name}
                    </Link>
                ))}

                <div className="my-2 h-px bg-border" />

                <Link
                    href="/sign-in"
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-3 text-[15px] font-medium text-[#8075ff] hover:bg-white/5"
                >
                    Sign In
                </Link>

                <Link
                    href="/sign-up"
                    onClick={closeMenu}
                    className="flex min-h-11.75 items-center justify-center rounded-[10px] bg-[#6255ff] text-[15px] font-medium text-white transition-colors hover:bg-[#5144ee]"
                >
                    Get Started
                </Link>
            </div>
        </header>
    );
}
