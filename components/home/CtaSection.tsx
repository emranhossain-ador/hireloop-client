import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CtaSection = () => {
    return (
        <section className="relative min-h-117.5 overflow-hidden sm:min-h-125 lg:min-h-135 mt-10">
            {/* Main curved globe */}
            <div className=" absolute left-1/2 top-16.25  h-162.5 w-262.5  -translate-x-1/2  rounded-[50%] border border-[#3933a8]/50 #000_72%)] shadow-[0_-20px_100px_rgba(75,65,255,0.18)] sm:top-17.5 sm:h-172.5 sm:w-[1200px] lg:top-[65px] lg:h-[760px] lg:w-350" />

            {/* Horizontal grid */}
            <div className=" pointer-events-none absolute left-1/2 top-[65px] h-[650px] w-[1050px] -translate-x-1/2 rounded-[50%] opacity-50 sm:top-[70px] sm:h-[690px] sm:w-[1200px] lg:top-[65px] lg:h-[760px] lg:w-[1400px]"
                style={{
                    backgroundImage: `
                        repeating-linear-gradient(
                            to bottom,
                            transparent 0px,
                            transparent 23px,
                            rgba(106, 96, 255, 0.24) 24px,
                            transparent 25px
                        )`,
                }} />

            {/* Vertical curved grid */}
            <div className=" pointer-events-none absolute left-1/2 top-[65px]  h-[650px] w-[1050px] -translate-x-1/2 rounded-[50%] opacity-50 sm:top-[70px] sm:h-[690px] sm:w-[1200px] lg:top-[65px] lg:h-[760px] lg:w-[1400px]"
                style={{
                    backgroundImage: `
                        repeating-radial-gradient(
                            ellipse at 50% 100%,
                            transparent 0px,
                            transparent 32px,
                            rgba(106, 96, 255, 0.22) 33px,
                            transparent 34px
                        )`}} />

            {/* Dark center fade */}
            <div className=" pointer-events-none absolute inset-x-0 bottom-0 h-65 bg-linear-to-t  from-black  via-black/80 to-transparent" />

            {/* Extra top glow */}
            <div className=" pointer-events-none absolute left-1/2 top-0 h-65 w-150 -translate-x-1/2 rounded-full  bg-[#6255ff]/10 blur-[100px]" />

            {/* =====================================================
            CTA CONTENT
        ====================================================== */}
            <div className=" relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 pt-41.25 text-center sm:pt-43.75 lg:pt-41.25">
                <h2 className="max-w-170 text-4xl font-medium leading-[1.1] tracking-[-0.035em]  text-white sm:text-5xl lg:text-[42px] " >
                    Your next role is
                    <br />
                    already looking for you
                </h2>

                <p className="mt-5 max-w-145 text-xs leading-6  text-foreground sm:text-sm">
                    Build a profile in three minutes. The matches start arriving
                    tomorrow morning.
                </p>

                {/* CTA buttons */}
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link href="/sign-up"
                        className=" group inline-flex h-10 items-center justify-center gap-2 rounded-lg  bg-white px-5 text-xs font-medium  text-black transition-all duration-300  hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]">
                        Create a free account
                        <ArrowRight
                            className="h-3.5 w-3.5  transition-transform group-hover:translate-x-0.5" />
                    </Link>

                    <Link
                        href="#pricing"
                        className=" inline-flex h-10  items-center justify-center  rounded-lg  border border-border  bg-white/3 px-5 text-xs font-medium  text-white backdrop-blur-sm transition-all duration-300  hover:border-border/30  hover:bg-white/[0.07]">
                        View pricing
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;