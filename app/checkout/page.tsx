"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ShoppingBag,
    CreditCard,
    ChevronDown,
    CheckCircle2,
    Loader2,
    HelpCircle,
} from "lucide-react";

type Currency = "BDT" | "USD";

export default function CheckoutPage() {
    const [currency, setCurrency] = useState<Currency>("BDT");
    const [email, setEmail] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvc, setCardCvc] = useState("");
    const [cardholderName, setCardholderName] = useState("");
    const [country, setCountry] = useState("Bangladesh");
    const [saveInfo, setSaveInfo] = useState(false);
    const [isCountryOpen, setIsCountryOpen] = useState(false);

    const [isPaying, setIsPaying] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Format Card Number with spaces
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "").slice(0, 16);
        const formatted = val.match(/.{1,4}/g)?.join(" ") || val;
        setCardNumber(formatted);
    };

    // Format Expiry MM / YY
    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, "").slice(0, 4);
        if (val.length >= 3) {
            val = `${val.slice(0, 2)} / ${val.slice(2)}`;
        }
        setCardExpiry(val);
    };

    // Format CVC
    const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "").slice(0, 4);
        setCardCvc(val);
    };

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsPaying(true);
        setTimeout(() => {
            setIsPaying(false);
            setPaymentSuccess(true);
        }, 1500);
    };

    const countries = [
        "Bangladesh",
        "United States",
        "United Kingdom",
        "Canada",
        "Germany",
        "India",
        "Singapore",
        "Australia",
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                
                {/* ============================================================
                    TOP NAVIGATION BAR (Back, Storefront Icon, SANDBOX Badge)
                ============================================================ */}
                <div className="flex items-center justify-between pb-8">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/browse-jobs"
                            className="flex size-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="size-5" />
                        </Link>
                        <div className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-[#16161a] text-gray-300">
                            <ShoppingBag className="size-4" />
                        </div>
                    </div>

                    {/* SANDBOX Pill Badge */}
                    <div className="rounded-md border border-white/10 bg-[#16161a] px-2.5 py-1 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                        SANDBOX
                    </div>
                </div>

                {/* Success Banner if Paid */}
                {paymentSuccess && (
                    <div className="mb-8 flex items-center gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-emerald-400">
                        <CheckCircle2 className="size-5 shrink-0" />
                        <div>
                            <h4 className="text-sm font-bold text-white">Payment Successful!</h4>
                            <p className="text-xs text-emerald-300/80">
                                Thank you for subscribing to Hireloop Pro. A receipt and access link have been sent to your email.
                            </p>
                        </div>
                    </div>
                )}

                {/* ============================================================
                    MAIN CHECKOUT GRID (LEFT: ORDER SUMMARY / RIGHT: PAYMENT FORM)
                ============================================================ */}
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">

                    {/* --------------------------------------------------------
                        LEFT COLUMN: CURRENCY PICKER & ORDER SUMMARY
                    -------------------------------------------------------- */}
                    <div className="lg:col-span-5 lg:sticky lg:top-8">
                        {/* Choose a Currency */}
                        <div>
                            <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                                CHOOSE A CURRENCY:
                            </span>

                            <div className="mt-3 flex items-center gap-3">
                                {/* BDT Currency Card */}
                                <button
                                    type="button"
                                    onClick={() => setCurrency("BDT")}
                                    className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                                        currency === "BDT"
                                            ? "border-2 border-white bg-[#1a1a22] text-white shadow-md"
                                            : "border border-white/10 bg-[#141418] text-gray-400 hover:border-white/20 hover:text-gray-200"
                                    }`}
                                >
                                    <span className="text-base">🇧🇩</span>
                                    <span>BDT 2,553.33</span>
                                </button>

                                {/* USD Currency Card */}
                                <button
                                    type="button"
                                    onClick={() => setCurrency("USD")}
                                    className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                                        currency === "USD"
                                            ? "border-2 border-white bg-[#1a1a22] text-white shadow-md"
                                            : "border border-white/10 bg-[#141418] text-gray-400 hover:border-white/20 hover:text-gray-200"
                                    }`}
                                >
                                    <span className="text-base">🇺🇸</span>
                                    <span>$20.00</span>
                                </button>
                            </div>

                            <p className="mt-2 text-xs italic text-gray-500">
                                1 USD &asymp; 127.6665 BDT
                            </p>
                        </div>

                        {/* Thin Divider Line */}
                        <div className="my-8 border-t border-white/10" />

                        {/* Line Item: Hireloop Pro Plan */}
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-white sm:text-xl">
                                    Hireloop Pro Plan
                                </h2>
                                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                                    Access to all features
                                </p>
                            </div>

                            <div className="text-right text-lg font-bold text-white sm:text-xl">
                                {currency === "BDT" ? "BDT 2,553.33" : "$20.00"}
                            </div>
                        </div>

                        {/* Plan Features Preview List */}
                        <div className="mt-8 space-y-2.5 rounded-2xl border border-white/5 bg-[#121217] p-5">
                            <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                                INCLUDED IN PRO:
                            </span>
                            <ul className="mt-2 space-y-2 text-xs text-gray-300">
                                <li className="flex items-center gap-2">
                                    <span className="size-1.5 rounded-full bg-emerald-400" />
                                    <span>Direct messaging with hiring managers</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="size-1.5 rounded-full bg-emerald-400" />
                                    <span>AI Resume &amp; Portfolio match analysis</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="size-1.5 rounded-full bg-emerald-400" />
                                    <span>Verified salary insights &amp; benchmark stats</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* --------------------------------------------------------
                        RIGHT COLUMN: STRIPE PAYMENT FORM
                    -------------------------------------------------------- */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handlePaymentSubmit}>

                            {/* Stripe Link 1-Click Pay Button */}
                            <button
                                type="button"
                                className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-[#00d66f] py-3 text-sm font-bold text-black shadow-lg transition-all duration-200 hover:bg-[#00ea7a] active:scale-[0.99]"
                            >
                                <span className="flex items-center gap-1 font-bold">
                                    <span className="flex size-4 items-center justify-center rounded-full bg-black text-[10px] text-[#00d66f]">
                                        i
                                    </span>
                                    <span>link</span>
                                </span>

                                <span className="opacity-40">|</span>

                                <div className="flex items-center gap-1.5">
                                    <span className="rounded bg-black/15 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-black">
                                        VISA
                                    </span>
                                    <span className="font-mono text-xs font-semibold">4242</span>
                                </div>
                            </button>

                            {/* "OR" Divider */}
                            <div className="relative my-7 flex items-center justify-center">
                                <div className="w-full border-t border-white/10" />
                                <span className="absolute bg-[#0a0a0c] px-3 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                                    OR
                                </span>
                            </div>

                            {/* Contact Information */}
                            <div>
                                <h3 className="text-xs font-semibold text-gray-200 sm:text-sm">
                                    Contact information
                                </h3>
                                <div className="mt-2">
                                    <label
                                        htmlFor="email"
                                        className="block text-[11px] text-gray-400"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email@example.com"
                                        className="mt-1 w-full rounded-xl border border-white/10 bg-[#16161a] px-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 transition-colors focus:border-white/30 focus:outline-none sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="mt-6">
                                <h3 className="text-xs font-semibold text-gray-200 sm:text-sm">
                                    Payment method
                                </h3>

                                <div className="mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#16161a]">
                                    {/* Card Header Tab */}
                                    <div className="flex items-center gap-2 border-b border-white/10 bg-[#1e1e24] px-4 py-3 text-xs font-semibold text-white">
                                        <CreditCard className="size-4 text-gray-300" />
                                        <span>Card</span>
                                    </div>

                                    {/* Card Information Fields Container */}
                                    <div className="p-4 space-y-3.5">
                                        {/* Card Information Box */}
                                        <div>
                                            <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                                                CARD INFORMATION
                                            </span>

                                            <div className="mt-1.5 overflow-hidden rounded-xl border border-white/10 bg-[#121216]">
                                                {/* Card Number Row */}
                                                <div className="flex items-center justify-between px-3.5 py-2.5">
                                                    <input
                                                        type="text"
                                                        required
                                                        value={cardNumber}
                                                        onChange={handleCardNumberChange}
                                                        placeholder="1234 1234 1234 1234"
                                                        className="w-full bg-transparent text-xs font-mono text-white placeholder:text-gray-500 focus:outline-none sm:text-sm"
                                                    />
                                                    {/* Card Provider Logos */}
                                                    <div className="flex items-center gap-1 shrink-0 opacity-70">
                                                        <span className="flex h-4 w-6 items-center justify-center rounded bg-blue-600 text-[8px] font-bold text-white">
                                                            VISA
                                                        </span>
                                                        <span className="flex h-4 w-6 items-center justify-center rounded bg-amber-500 text-[8px] font-bold text-white">
                                                            MC
                                                        </span>
                                                        <span className="flex h-4 w-6 items-center justify-center rounded bg-cyan-700 text-[8px] font-bold text-white">
                                                            AMEX
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Expiry & CVC Row */}
                                                <div className="grid grid-cols-2 border-t border-white/10">
                                                    <div className="border-r border-white/10 px-3.5 py-2.5">
                                                        <input
                                                            type="text"
                                                            required
                                                            value={cardExpiry}
                                                            onChange={handleExpiryChange}
                                                            placeholder="MM / YY"
                                                            className="w-full bg-transparent text-xs font-mono text-white placeholder:text-gray-500 focus:outline-none sm:text-sm"
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between px-3.5 py-2.5">
                                                        <input
                                                            type="text"
                                                            required
                                                            value={cardCvc}
                                                            onChange={handleCvcChange}
                                                            placeholder="CVC"
                                                            className="w-full bg-transparent text-xs font-mono text-white placeholder:text-gray-500 focus:outline-none sm:text-sm"
                                                        />
                                                        <HelpCircle className="size-4 text-gray-500" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Cardholder Name */}
                                        <div>
                                            <label
                                                htmlFor="cardholder"
                                                className="block text-[10px] font-semibold tracking-wider text-gray-400 uppercase"
                                            >
                                                CARDHOLDER NAME
                                            </label>
                                            <input
                                                id="cardholder"
                                                type="text"
                                                required
                                                value={cardholderName}
                                                onChange={(e) => setCardholderName(e.target.value)}
                                                placeholder="Full name on card"
                                                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#121216] px-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 transition-colors focus:border-white/30 focus:outline-none sm:text-sm"
                                            />
                                        </div>

                                        {/* Country or Region Dropdown */}
                                        <div className="relative">
                                            <label
                                                htmlFor="country"
                                                className="block text-[10px] font-semibold tracking-wider text-gray-400 uppercase"
                                            >
                                                COUNTRY OR REGION
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => setIsCountryOpen(!isCountryOpen)}
                                                className="mt-1.5 flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#121216] px-3.5 py-2.5 text-xs text-white sm:text-sm"
                                            >
                                                <span>{country}</span>
                                                <ChevronDown
                                                    className={`size-4 text-gray-400 transition-transform ${
                                                        isCountryOpen ? "rotate-180" : ""
                                                    }`}
                                                />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {isCountryOpen && (
                                                <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-48 overflow-y-auto rounded-xl border border-white/10 bg-[#181820] py-1 shadow-2xl backdrop-blur-md">
                                                    {countries.map((c) => (
                                                        <button
                                                            key={c}
                                                            type="button"
                                                            onClick={() => {
                                                                setCountry(c);
                                                                setIsCountryOpen(false);
                                                            }}
                                                            className={`flex w-full items-center px-4 py-2 text-left text-xs transition-colors hover:bg-white/10 ${
                                                                country === c
                                                                    ? "font-semibold text-white bg-white/5"
                                                                    : "text-gray-300"
                                                            }`}
                                                        >
                                                            {c}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Save My Information Checkbox Card */}
                            <div className="mt-5 rounded-xl border border-white/10 bg-[#16161a] p-4">
                                <label className="flex cursor-pointer select-none items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={saveInfo}
                                        onChange={(e) => setSaveInfo(e.target.checked)}
                                        className="mt-0.5 size-4 rounded-sm border-white/20 bg-white/5 text-blue-600 accent-blue-600 focus:ring-2 focus:ring-blue-500/30"
                                    />
                                    <div>
                                        <div className="text-xs font-semibold text-gray-200 sm:text-sm">
                                            Save my information for faster checkout
                                        </div>
                                        <div className="mt-0.5 text-[11px] text-gray-400 sm:text-xs">
                                            Pay securely on this site and everywhere Link is accepted.
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {/* Blue Primary Pay Button */}
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={isPaying}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0070f3] py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:bg-[#0060df] active:scale-[0.99] disabled:opacity-60"
                                >
                                    {isPaying ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            <span>Processing Payment...</span>
                                        </>
                                    ) : (
                                        <span>
                                            Pay {currency === "BDT" ? "BDT 2,553.33" : "$20.00"}
                                        </span>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>

                {/* ============================================================
                    FOOTER (Powered by Stripe, Terms & Privacy)
                ============================================================ */}
                <footer className="mt-16 border-t border-white/5 pt-8 text-center text-xs text-gray-500">
                    <div className="flex items-center justify-center gap-1">
                        <span>Powered by</span>
                        <span className="font-semibold text-gray-400">Stripe</span>
                    </div>

                    <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-gray-500">
                        <Link href="#terms" className="hover:text-gray-300">
                            Terms
                        </Link>
                        <Link href="#privacy" className="hover:text-gray-300">
                            Privacy
                        </Link>
                    </div>
                </footer>

            </div>
        </div>
    );
}