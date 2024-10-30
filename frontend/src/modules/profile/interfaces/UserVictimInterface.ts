import {UserFile} from "./UserFileInterface.ts";

export interface UserVictim {
    role: 'victim';
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
    victim: {
        city: string;
        region: string;
        street: string;
        houseNumber: string;
        flatNumber: number;
    }
    files: UserFile[];
}
