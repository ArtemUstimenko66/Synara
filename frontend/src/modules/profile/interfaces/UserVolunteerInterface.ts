import {UserFile} from "./UserFileInterface.ts";

export interface UserVolunteer {
    role: 'volunteer';
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    gender: string;
    UNP: string;
    avatarUrl: string;
    volunteer: {
        city: string;
        region: string;
        supports: string[];
        support_description: string;
        userId: string;
        volunteer_identification_number: string;
        startTime: string;
        endTime: string;
        startWorkingDay: string;
        endWorkingDay: string;
        description: string;
        rating: string;
        is_show_my_profile: boolean;
        moderator_answer: string;
    }
    files: UserFile[];
}