import {User} from "../../interfaces/User.tsx";

export const prepareUserDataForBackend = (userData: User) => {
    const genderMap: { [key: string]: string } = {
        'Чоловік': 'male',
        'Жінка': 'female',
        'Інше': 'other'
    };

    const helpTypesMap: { [key: string]: string } = {
        'Гуманітарна': 'humanitarian',
        'Інформаційна': 'informational',
        'Психологічна': 'psychological',
        'Матеріальна': 'material',
    };

    const baseData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: userData.password,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        role: userData.role,
        birthDate: userData.dateOfBirth,
        gender: genderMap[userData.gender] || 'other',
        UNP: userData.unp,
    };

    if (userData.role === 'victim') {
        return {
            ...baseData,
            victimDetails: {
                region: userData.region,
                city: userData.city,
                street: userData.street,
                houseNumber: userData.house,
                flatNumber: userData.apartment,
            },
        };
    } else if (userData.role === 'volunteer') {
        return {
            ...baseData,
            volunteerDetails: {
                region: userData.region,
                city: userData.city,
                supports: userData.helpTypes.map(type => helpTypesMap[type] || type),
                volunteer_identification_number: userData.volunteerId,
            },
        };
    } else {
        throw new Error('Invalid user role');
    }
};