export enum PetitionTopic {
    ALL_PETITIONS = 'all_petitions',
    NO_SUBJECT = 'no_subject',
    INDUSTRY_TRADE_BUSINESS = 'industry_trade_business',
    AGRARIAN_POLICY = 'agrarian_policy',
    LAND_RELATIONS = 'land_relations',
    TRANSPORT = 'transport',
    COMMUNICATION = 'communication',
    ECONOMIC_PRICE_INVESTMENT = 'economic_price_investment',
    FINANCIAL_POLICY = 'financial_policy',
    TAX_POLICY = 'tax_policy',
    CUSTOMS_POLICY = 'customs_policy',
    SOCIAL_PROTECTION = 'social_protection',
    LABOR_SALARY = 'labor_salary',
}

export const ukrainianPetitionTopics: string[] = Object.values(PetitionTopic).filter(topic => topic !== 'all_petitions');

console.log(ukrainianPetitionTopics);
