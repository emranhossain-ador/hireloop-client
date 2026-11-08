"use client";

import { signIn } from "@/lib/auth-client";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, TriangleExclamationPoint } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";


interface FormError {
    email?: string;
    password?: string;
}

const SigninForm = () => {

    const [error, setErrors] = useState<FormError>({});
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = String(formData.get('email') ?? "").trim();
        const password = String(formData.get('password') ?? "").trim();

        const newErrors: FormError = {};

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email.";
        }

        if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters!";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                setIsLoading(true);

                const { error } = await signIn.email({
                    email: email as string,
                    password: password as string,
                    rememberMe: rememberMe
                })

                if (error) {
                    toast.error(error.message);
                } else {
                    form.reset();
                    toast.success("Login successfull");
                    router.push('/')
                }


            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

    };


    return (
        <>
            {/* Social Login Buttons Section */}
            <div className="mt-6 space-y-2.5">
                {/* Google Social Button (Full Width) */}
                <button type="button"
                    className="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/4 px-4 py-2.5 text-xs font-medium text-foreground transition-all duration-200 hover:border-white/25 hover:bg-white/8 hover:shadow-md active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 sm:text-sm cursor-pointer"
                >
                    <FcGoogle className="size-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                    <span>Continue with Google</span>
                </button>
            </div>

            {/* Divider with Text */}
            <div className="relative my-6 flex items-center justify-center">
                <div className="w-full border-t border-border" />
                <span className="absolute bg-sidebar px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    or continue with email
                </span>
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-1.5">
                    <label
                        htmlFor="email"
                        className="block text-xs font-medium text-foreground sm:text-sm"
                    >
                        Email address
                    </label>
                    <div className="group relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground transition-colors group-focus-within:text-primary">
                            <Mail className="size-4" />
                        </div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="alex@example.com"
                            autoComplete="email"
                            className="input-field"
                        />
                    </div>

                    {error.email && <p className="text-sm text-red-500 flex items-center gap-1.5 pt-1"><TriangleExclamationPoint size={15} /> {error.email}.</p>}
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-xs font-medium text-foreground sm:text-sm"
                        >
                            Password
                        </label>
                        <Link
                            href="#forgot-password"
                            className="text-xs font-medium text-primary transition-colors hover:text-[#8076ff] hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <div className="group relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground transition-colors group-focus-within:text-primary">
                            <Lock className="size-4" />
                        </div>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            autoComplete="current-password"
                            className="input-field"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {showPassword ? (
                                <EyeOff className="size-4" />
                            ) : (
                                <Eye className="size-4" />
                            )}
                        </button>
                    </div>

                    {error.password && <p className="text-sm text-red-500 flex items-center gap-1.5 pt-1"><TriangleExclamationPoint size={15} /> {error.password}.</p>}
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                    <label className="flex cursor-pointer select-none items-center gap-2.5">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="size-4 rounded-sm border-white/20 bg-white/5 text-primary accent-primary transition-colors focus:ring-2 focus:ring-primary/30"
                        />
                        <span className="text-xs text-muted-foreground sm:text-sm">
                            Remember me for 30 days
                        </span>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/30 active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60 sm:text-sm cursor-pointer"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="size-4 animate-spin" />
                            <span>Signing in...</span>
                        </>
                    ) : (
                        <>
                            <span>Sign In</span>
                            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                    )}
                </button>
            </form>
        </>
    )
};

export default SigninForm;