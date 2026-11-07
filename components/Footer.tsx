"use client";

import Link from "next/link";
import {
    PinIcon,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const productLinks = [
    "Job discovery",
    "Worker AI",
    "Companies",
    "Salary data",
];

const navigationLinks = [
    "Help center",
    "Career library",
    "Contact",
];

const resourceLinks = [
    "Brand Guideline",
    "Newsroom",
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden">
            <div className="relative border-t border-border">
                <div
                    className=" section-container px-5 py-12 sm:px-8 lg:px-10 lg:py-10">
                    {/* Main footer grid */}
                    <div
                        className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.7fr_0.8fr_0.8fr_0.8fr] lg:gap-12">
                        {/* Brand */}
                        <div>
                            <Link href="/">
                                <Image src={'/images/logo.png'} width={100} height={60} alt="logo" className="h-9 w-fit object-cover" />
                            </Link>

                            <p className=" mt-5 max-w-62.5 text-sm leading-5  text-foreground">
                                The AI-native career platform. Built for people who take
                                their work seriously.
                            </p>
                        </div>

                        {/* Product */}
                        <FooterColumn title="Product" links={productLinks} />

                        {/* Navigation */}
                        <FooterColumn title="Navigations" links={navigationLinks} />

                        {/* Resources */}
                        <FooterColumn title="Resources" links={resourceLinks} />
                    </div>

                    {/* Bottom footer */}
                    <div
                        className="mt-12 flex flex-col gap-6 border-t  border-border pt-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
                        {/* Social */}
                        <div className="flex items-center gap-2">
                            <SocialButton>
                                <FaFacebook size={18} />
                            </SocialButton>

                            <SocialButton active>
                                <PinIcon size={18} />
                            </SocialButton>

                            <SocialButton>
                                <FaInstagram size={18} />
                            </SocialButton>

                            <SocialButton>
                                <FaLinkedin size={18} />
                            </SocialButton>
                        </div>

                        {/* Copyright */}
                        <div
                            className="flex flex-col gap-2 text-xs text-foreground sm:flex-row sm:items-center sm:gap-6 sm:text-right"
                        >
                            <span>
                                Copyright 2024 — Programming Hero
                            </span>

                            <div className="flex gap-4">
                                <Link
                                    href="#"
                                    className="transition-colors hover:text-foreground text-foreground/90"
                                >
                                    Terms & Policy
                                </Link>

                                <Link
                                    href="#"
                                    className="transition-colors hover:text-foreground text-foreground/90"
                                >
                                    Privacy Guideline
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* =========================================================
FOOTER COLUMN
========================================================= */

function FooterColumn({
    title,
    links,
}: {
    title: string;
    links: string[];
}) {
    return (
        <div>
            <h3 className="text-sm font-medium text-[#6255ff]">
                {title}
            </h3>

            <ul className="mt-5 space-y-3">
                {links.map((link) => (
                    <li key={link}>
                        <Link href="#" className="text-xs text-foreground/90 transition-colors duration-200 hover:text-foreground">
                            {link}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* =========================================================
SOCIAL BUTTON
========================================================= */

function SocialButton({
    children,
    active = false,
}: {
    children: React.ReactNode;
    active?: boolean;
}) {
    return (
        <button type="button" className={`flex h-9 w-9 items-center justify-center rounded-md transition-all duration-200
        ${active
                ? "bg-[#6255ff] text-white"
                : "bg-white/6 text-white/40 hover:bg-primary hover:text-white"
            }`}
        >
            {children}
        </button>
    );
}