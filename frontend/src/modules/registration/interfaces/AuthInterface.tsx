export enum Role {
    Volunteer = 'volunteer',
    Victim = 'victim',
    Guest = 'guest',
}

export interface RegisterPayload {
    username: string,
    email: string;
    phoneNumber: string;
    password: string;
    role: Role;
}