"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/inputError";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "@/lib/actions/Jobs";
import { JobType } from "@/type/JobType";
import { BangladeshiTaka, Building2, CalendarIcon, ChevronDown, Globe, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

const fieldBase =
    "h-10 rounded-xl border-white/10 bg-[#16161a] text-sm text-white placeholder:text-gray-500 focus-visible:border-indigo-500/60 focus-visible:ring-2 focus-visible:ring-indigo-500/20";

const fieldClasses = `${fieldBase} px-4`;
const fieldIconClasses = `${fieldBase} pl-10 pr-4`;

const textareaClasses =
    "rounded-xl border-white/10 bg-[#16161a] px-4 py-3.5 text-sm leading-relaxed text-gray-300 placeholder:text-gray-500 focus-visible:border-indigo-500/60 focus-visible:ring-2 focus-visible:ring-indigo-500/20";

const labelClasses = "block text-xs leading-normal text-white sm:text-sm";

const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    });



type FormError = {
    jobTitle?: string
    companyName?: string
    jobCategory?: string
    jobType?: string
    jobLocation?: string
    deadline?: string
    minSalary?: string
    maxSalary?: string
    frequency?: string
    responsibilities?: string
    qualifications?: string
}


const AddJobForm = () => {
    const [error, setError] = useState<FormError>({});
    const [jobType, setJobType] = useState('Full-time');
    const [remote, setRemote] = useState<boolean>(true);

    const [deadline, setDeadline] = useState<Date | undefined>(
        new Date(2025, 4, 30),
    );
    const [deadlineOpen, setDeadlineOpen] = useState(false);


    const handleSubmit = async (events: React.FormEvent<HTMLFormElement>) => {
        events.preventDefault();
        const form = events.currentTarget;
        const formData = new FormData(form);
        const jobTitle = String(formData.get('jobTitle') ?? "").trim();
        const companyName = String(formData.get('companyName') ?? "").trim();
        const jobCategory = String(formData.get('jobCategory') ?? "").trim();
        const jobLocation = String(formData.get('jobLocation') ?? "").trim();
        const minSalary = String(formData.get('minSalary') ?? "").trim();
        const maxSalary = String(formData.get('maxSalary') ?? "").trim();
        const frequency = String(formData.get('frequency') ?? "").trim();
        const responsibilities = String(formData.get('responsibilities') ?? "").trim();
        const qualifications = String(formData.get('qualifications') ?? "").trim();


        const newError: FormError = {};

        if (!jobTitle) {
            newError.jobTitle = "Job title is required!";
        }
        if (!companyName) {
            newError.companyName = "Company Name is required!";
        }
        if (!jobCategory) {
            newError.jobCategory = "Job Category is required!";
        }
        if (!jobLocation) {
            newError.jobLocation = "Job location is required!";
        }
        if (!minSalary) {
            newError.minSalary = "Min salary is required!";
        }
        if (!maxSalary) {
            newError.maxSalary = "Max salary is required!";
        }
        if (!frequency) {
            newError.frequency = "Frequency is required!";
        }
        if (!responsibilities) {
            newError.responsibilities = "Responsibilities is required!";
        }
        if (!qualifications) {
            newError.qualifications = "Qualifications is required!";
        }

        setError(newError);

        if (Object.keys(newError).length === 0) {

            const jobData: JobType = {
                jobTitle,
                companyName,
                jobCategory,
                jobType,
                jobLocation,
                remote,
                deadline: deadline?.toISOString() ?? "",
                minSalary,
                maxSalary,
                frequency,
                responsibilities,
                qualifications,
                status: 'active'
            };

            const result = await createJob(jobData);
            if (result.insertedId) {
                form.reset();
                toast.success('Job Created successful');
            } else {
                toast.error('Failed to create job');
            }
        }

    }


    return (
        <form onSubmit={handleSubmit}>
            <section className="mt-10">
                {/* Section Heading */}
                <div className="flex items-center gap-2.5">
                    <span className="size-1.5 rounded-full bg-blue-500" />
                    <h2 className="text-sm font-bold text-white sm:text-base">
                        1. Basic Information
                    </h2>
                </div>

                <div className="mt-5 space-y-5">
                    {/* Job Title */}
                    <div>
                        <Label htmlFor="job-title" className={labelClasses}>
                            Job Title <span className="text-red-400">*</span>
                        </Label>
                        <Input
                            id="job-title"
                            type="text"
                            name="jobTitle"
                            placeholder="Enter job title"
                            className={`mt-2 ${fieldClasses}`}
                        />
                        <InputError message={error.jobTitle} />
                    </div>

                    {/* Company Name + Job Category */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="company-name" className={labelClasses}>
                                Company Name <span className="text-red-400">*</span>
                            </Label>
                            <div className="relative mt-2">
                                <Building2 className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-gray-500" />
                                <Input
                                    id="company-name"
                                    type="text"
                                    name="companyName"
                                    placeholder="Enter company name"
                                    className={fieldIconClasses}
                                />
                            </div>
                            <InputError message={error.companyName} />
                        </div>

                        <div>
                            <Label htmlFor="job-category" className={labelClasses}>
                                Job Category <span className="text-red-400">*</span>
                            </Label>
                            <div className="relative mt-2">
                                <select
                                    id="job-category"
                                    defaultValue="engineering"
                                    name="jobCategory"
                                    className="w-full appearance-none rounded-xl border border-white/10 bg-[#16161a] px-4 py-2.5 pr-10 text-sm text-white transition-all focus:border-indigo-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                >
                                    <option value="engineering">Engineering &amp; Tech</option>
                                    <option value="design">Design &amp; Creative</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="finance">Finance</option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                            </div>
                            <InputError message={error.jobCategory} />
                        </div>
                    </div>

                    {/* Job Type Segmented Control (interactive) */}
                    <div>
                        <span className="block text-xs font-medium leading-normal text-white sm:text-sm">
                            Job Type <span className="text-red-400">*</span>
                        </span>
                        <div
                            role="radiogroup"
                            aria-label="Job Type"
                            className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4"
                        >
                            {jobTypes.map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    role="radio"
                                    aria-checked={jobType === type}
                                    onClick={() => setJobType(type)}
                                    className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm ${jobType === type
                                        ? "border-indigo-500 bg-indigo-500/10 text-white shadow-sm"
                                        : "border-white/10 bg-[#16161a] text-gray-400 hover:border-white/20 hover:text-white"
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                3. SECTION 2: LOCATION, COMPENSATION & TIMELINE
            ============================================================ */}
            <section className="mt-10">
                {/* Section Heading */}
                <div className="flex items-center gap-2.5">
                    <span className="size-1.5 rounded-full bg-blue-500" />
                    <h2 className="text-sm font-bold text-white sm:text-base">
                        2. Location, Compensation &amp; Timeline
                    </h2>
                </div>

                <div className="mt-5 space-y-5">
                    {/* Remote Work Toggle Card (working switch) */}
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-[#16161a] p-4">
                        <div className="flex items-center gap-3.5">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#1c1c22] text-indigo-400">
                                <Globe className="size-4.5" />
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-white sm:text-sm">
                                    Remote Work Allowed (isRemote)
                                </div>
                                <div className="mt-0.5 text-[11px] text-muted-foreground">
                                    Enable remote-friendly or distributed candidate
                                    applications
                                </div>
                            </div>
                        </div>

                        <Switch
                            checked={remote}
                            onCheckedChange={setRemote}
                            aria-label="Remote work allowed"
                        />
                    </div>

                    {/* Job Location + Application Deadline */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="job-location" className={labelClasses}>
                                    Job Location (location)
                                </Label>
                                <span className="text-[11px] text-muted-foreground">
                                    Required
                                </span>
                            </div>
                            <div className="relative mt-2">
                                <MapPin className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-gray-500" />
                                <Input
                                    id="job-location"
                                    type="text"
                                    name="jobLocation"
                                    placeholder="Enter job location"
                                    className={fieldIconClasses}
                                />
                            </div>
                            <InputError message={error.jobLocation} />
                        </div>

                        <div>
                            <Label htmlFor="job-deadline" className={labelClasses}>
                                Application Deadline (deadline)
                            </Label>
                            {/* Working date picker */}
                            <Popover open={deadlineOpen} onOpenChange={setDeadlineOpen}>
                                <PopoverTrigger
                                    id="job-deadline"
                                    className="mt-2 flex h-10 w-full items-center gap-2.5 rounded-xl border border-white/10 bg-[#16161a] px-4 text-left text-sm text-white transition-all hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 data-popup-open:border-indigo-500/60"
                                >
                                    <CalendarIcon className="size-4 shrink-0 text-gray-500" />
                                    <span className="flex-1">
                                        {deadline ? formatDate(deadline) : "Select a date"}
                                    </span>
                                </PopoverTrigger>
                                <PopoverContent
                                    align="start"
                                    className="w-auto border border-white/10 bg-[#16161a] p-0 shadow-xl"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={deadline}
                                        defaultMonth={deadline}
                                        onSelect={(date) => {
                                            if (date) {
                                                setDeadline(date);
                                                setDeadlineOpen(false);
                                            }
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Salary + Frequency */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div>
                            <Label htmlFor="min-salary" className={labelClasses}>
                                Min Salary / Rate
                            </Label>
                            <div className="relative mt-2">
                                <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-sm text-gray-500">
                                    <BangladeshiTaka size={15} />
                                </span>
                                <Input
                                    id="min-salary"
                                    type="text"
                                    name="minSalary"
                                    className={`${fieldBase} pl-8 pr-4`}
                                />
                            </div>
                            <InputError message={error.minSalary} />
                        </div>

                        <div>
                            <Label htmlFor="max-salary" className={labelClasses}>
                                Max Salary / Rate
                            </Label>
                            <div className="relative mt-2">
                                <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-sm text-gray-500">
                                    <BangladeshiTaka size={15} />
                                </span>
                                <Input
                                    id="max-salary"
                                    type="text"
                                    name="maxSalary"
                                    className={`${fieldBase} pl-8 pr-4`}
                                />
                            </div>
                            <InputError message={error.maxSalary} />
                        </div>

                        <div>
                            <Label htmlFor="frequency" className={labelClasses}>
                                Frequency
                            </Label>
                            <div className="relative mt-2">
                                <select
                                    id="frequency"
                                    defaultValue="hour"
                                    name="frequency"
                                    className="w-full appearance-none rounded-xl border border-white/10 bg-[#16161a] px-4 py-2.5 pr-10 text-sm text-white transition-all focus:border-indigo-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                >
                                    <option value="hour">per hour</option>
                                    <option value="day">per day</option>
                                    <option value="month">per month</option>
                                    <option value="year">per year</option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                            </div>
                            <InputError message={error.frequency} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                4. SECTION 3: RESPONSIBILITIES & REQUIREMENTS
            ============================================================ */}
            <section className="mt-10">
                {/* Section Heading */}
                <div className="flex items-center gap-2.5">
                    <span className="size-1.5 rounded-full bg-blue-500" />
                    <h2 className="text-sm font-bold text-white sm:text-base">
                        3. Responsibilities &amp; Requirements
                    </h2>
                </div>

                <div className="mt-5 space-y-5">
                    {/* Key Responsibilities (working textarea) */}
                    <div>
                        <Label htmlFor="responsibilities" className={labelClasses}>
                            Key Responsibilities <span className="text-red-400">*</span>
                        </Label>
                        <Textarea
                            id="responsibilities"
                            rows={4}
                            name="responsibilities"
                            className={`${textareaClasses} mt-2 min-h-32`}
                        />
                        <InputError message={error.responsibilities} />
                    </div>

                    {/* Qualifications & Requirements (working textarea) */}
                    <div>
                        <Label htmlFor="qualifications" className={labelClasses}>
                            Qualifications &amp; Requirements{" "}
                            <span className="text-red-400">*</span>
                        </Label>
                        <Textarea
                            id="qualifications"
                            rows={4}
                            name="qualifications"
                            className={`${textareaClasses} mt-2 min-h-28`}
                        />
                        <InputError message={error.qualifications} />
                    </div>
                </div>
            </section>


            {/* Publish Button */}
            <div className="mt-5 text-end">
                <Button
                    type="submit"
                    className="py-5 shrink-0 self-start rounded-md cursor-pointer bg-indigo-600 px-6 font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 sm:w-fit w-full"
                >
                    <span>Publish Job</span>
                    <span aria-hidden="true">→</span>
                </Button>
            </div>
        </form>
    );
};

export default AddJobForm;