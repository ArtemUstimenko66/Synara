import {User} from "../../interfaces/User.tsx";
import {helpTypesMap} from "../../../../data/helpTypesMap.ts";
import {genderMap} from "../../../../data/genderMap.ts";

export const prepareUserDataForBackend = (userData: User) => {

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
                supports: userData.helpTypes ? userData.helpTypes.map(type => helpTypesMap[type] || type) : [],
                volunteer_identification_number: userData.volunteerId,
            },
        };
    } else {
        throw new Error('Invalid user role');
    }
};