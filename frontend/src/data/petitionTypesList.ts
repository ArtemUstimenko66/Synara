export enum PetitionTypes{
    ALL_PETITIONS = 'c',
    NO_TYPE = 'Без типу',
    COMMUNITY_INITIATIVES = 'Громадські ініціативи',
    ORGANIZATIONAL_INITIATIVES = 'Організаційні ініціативи',
    OFFICIAL = 'Офіційні',
}

export const ukrainianPetitionTypes: string[] = Object.values(PetitionTypes).filter(topic => topic !== 'c');

console.log(ukrainianPetitionTypes);



