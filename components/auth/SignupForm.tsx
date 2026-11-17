"use client";
import { signUp } from "@/lib/auth-client";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    User,
    Loader2,
    TriangleExclamationPoint,
    Building2,
    Shield,
    Users,
    Image as ImageIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface FormError {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

type RoleType = "seeker" | "recruiter";

const SignupForm = () => {

    const [role, setRole] = useState<RoleType>('seeker');
    const [error, setErrors] = useState<FormError>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>("");
    const [avatarError, setAvatarError] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const router = useRouter();

    // Clean up the object URL when the preview changes or the component unmounts
    useEffect(() => {
        return () => {
            if (avatarPreview) URL.revokeObjectURL(avatarPreview);
        };
    }, [avatarPreview]);

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setAvatarError("");

        if (!file) {
            setAvatarFile(null);
            setAvatarPreview("");
            return;
        }

        if (!file.type.startsWith("image/")) {
            setAvatarError("Please select an image file.");
            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setAvatarError("Image must be under 5 MB.");
            e.target.value = "";
            return;
        }

        setAvatarFile(file);
        setAvatarPreview((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(file);
        });

        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        const imgApi = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;
        const res = await fetch(imgApi, {
            method: 'POST',
            body: formData
        });

        const result = await res.json();
        setAvatarUrl(result.data.url);

    };

    const handleAvatarRemove = () => {
        setAvatarFile(null);
        setAvatarError("");
        setAvatarPreview((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return "";
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = String(formData.get('name') ?? "").trim();
        const email = String(formData.get('email') ?? "").trim();
        const password = String(formData.get('password') ?? "").trim();
        const confirmPassword = String(formData.get('confirmPassword') ?? "").trim();

        const newErrors: FormError = {};

        if (!name) {
            newErrors.name = "Name is required";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email.";
        }

        if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long!";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Password don't match!!";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                setIsLoading(true);

                const { error } = await signUp.email({
                    name: name as string,
                    email: email as string,
                    password: password as string,
                    role: role as RoleType,
                    image: avatarUrl as string
                })

                if (error) {
                    toast.error(error.message);
                } else {
                    form.reset();
                    handleAvatarRemove();
                    toast.success("Signup successfull");
                    router.push('/sign-in')
                }


            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3.5 mt-8">

            {/* Role Switcher Tabs */}
            <div className="mt-5 grid grid-cols-2 rounded-xl border border-white/10 bg-white/3 p-1">
                <button
                    type="button"
                    onClick={() => setRole("seeker")}
                    className={`flex items-center justify-center  cursor-pointer flex-col gap-2 rounded-lg py-2 text-xs font-medium transition-all duration-200 ${role === "seeker"
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Users className="size-4.5" />
                    <span>Job Seeker</span>
                </button>
                <button
                    type="button"
                    onClick={() => setRole("recruiter")}
                    className={`flex items-center justify-center  cursor-pointer flex-col gap-2 rounded-lg py-2 text-xs font-medium transition-all duration-200 ${role === "recruiter"
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Building2 className="size-4.5" />
                    <span>Recruiter</span>
                </button>
            </div>

            {/* Profile Image Upload Field with Avatar Preview */}
            <div className="space-y-1">
                <label
                    htmlFor="avatar"
                    className="block text-xs font-medium text-foreground sm:text-sm"
                >
                    Profile Photo
                </label>

                <div className="flex items-center gap-3">
                    {/* Avatar Preview */}
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
                        {avatarPreview ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={avatarPreview}
                                alt="Avatar preview"
                                className="size-full object-cover"
                            />
                        ) : (
                            <div className="flex size-full items-center justify-center text-muted-foreground">
                                <User className="size-5" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-1 flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 bg-white/4 px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-white/20 hover:bg-white/7 sm:text-sm"
                            >
                                <ImageIcon className="size-4" />
                                {avatarFile ? "Change photo" : "Upload photo"}
                            </button>

                            {avatarFile && (
                                <button
                                    type="button"
                                    onClick={handleAvatarRemove}
                                    className="cursor-pointer rounded-lg px-2 py-2 text-xs text-muted-foreground transition-colors hover:text-red-500 sm:text-sm"
                                >
                                    Remove
                                </button>
                            )}
                        </div>

                        <p className="truncate text-[11px] text-muted-foreground">
                            {avatarFile
                                ? avatarFile.name
                                : "JPG, PNG or WebP — up to 5 MB"}
                        </p>
                    </div>

                    {/* Hidden file input (accepts gallery/photos on mobile) */}
                    <input
                        ref={fileInputRef}
                        id="avatar"
                        name="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                    />
                </div>

                {avatarError && (
                    <p className="text-sm text-red-500 flex items-center gap-1.5 pt-1">
                        <TriangleExclamationPoint size={15} /> {avatarError}
                    </p>
                )}
            </div>

            {/* Name Field */}
            <div className="space-y-1">
                <label
                    htmlFor="name"
                    className="block text-xs font-medium text-foreground sm:text-sm"
                >
                    Full Name
                </label>
                <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground transition-colors group-focus-within:text-primary">
                        <User className="size-4" />
                    </div>
                    <input id="name" name="name" type="text" placeholder="Alex Morgan" autoComplete="name" className="input-field" />
                </div>
                {error.name && <p className="text-sm text-red-500 flex items-center gap-1.5 pt-1"><TriangleExclamationPoint size={15} /> {error.name}.</p>}
            </div>


            {/* Email Field */}
            <div className="space-y-1">
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
                    <input id="email" name="email" type="email" placeholder="alex@example.com" autoComplete="email" className="input-field" />
                </div>
                {error.email && <p className="text-sm text-red-500 flex items-center gap-1.5 pt-1"><TriangleExclamationPoint size={15} /> {error.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
                <label
                    htmlFor="password"
                    className="block text-xs font-medium text-foreground sm:text-sm"
                >
                    Password
                </label>
                <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground transition-colors group-focus-within:text-primary">
                        <Lock className="size-4" />
                    </div>
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        autoComplete="new-password"
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

                {error.password && <p className="text-sm text-red-500 flex items-center gap-1.5 pt-1"><TriangleExclamationPoint size={15} />{error.password}</p>}

            </div>

            {/* confirm Password Field */}
            <div className="space-y-1 mb-10">
                <label
                    htmlFor="confirm_password"
                    className="block text-xs font-medium text-foreground sm:text-sm"
                >
                    Confirm Password
                </label>
                <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground transition-colors group-focus-within:text-primary">
                        <Lock className="size-4" />
                    </div>
                    <input
                        id="confirm_password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        autoComplete="confirm-password"
                        className="input-field"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground transition-colors hover:text-foreground"
                    >
                        {showConfirmPassword ? (
                            <EyeOff className="size-4" />
                        ) : (
                            <Eye className="size-4" />
                        )}
                    </button>
                </div>

                {error.confirmPassword && <p className="text-sm text-red-500 pt-1 flex items-center gap-1.5"><TriangleExclamationPoint size={15} /> {error.confirmPassword}</p>}

            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/30 active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 sm:text-sm cursor-pointer"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>Creating account...</span>
                    </>
                ) : (
                    <>
                        <span>Create Free Account</span>
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                )}
            </button>
        </form>
    )
};

export default SignupForm;