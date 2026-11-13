import { ApplicationStatus } from "./ApplicationStatus";

export interface JobApplicationType {
    _id: string;
    jobId: string;
    userId: string;
    status: ApplicationStatus;
    appliedAt: string;
    jobList: {
        _id: string;
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
        createdAt?: string;
        updatedAt?: string;
    };
}

export interface JobApplicationsResponse {
    success: boolean;
    result: JobApplicationType[];
}