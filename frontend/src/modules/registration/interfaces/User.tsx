export interface User {
    role: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateOfBirth: string;
    unp: number;
    gender: string;
    region: string;
    city: string;
    street?: string;
    house?: 0;
    apartment?: 0;
    helpTypes?: string[];
    //document?: string[];
    volunteerId?: 0;
}