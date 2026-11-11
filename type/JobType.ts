export interface JobType {
    _id?: string;
    jobTitle: string;
    companyName: string;
    jobCategory: string;
    remote: boolean;
    jobLocation: string;
    deadline: string;
    jobType: string;
    minSalary: string;
    maxSalary: string;
    frequency: string;
    responsibilities: string;
    qualifications: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}