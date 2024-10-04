export enum PetitionTopic {
    ALL_PETITIONS = 'c',
    NO_SUBJECT = 'Без теми',
    INDUSTRY_TRADE_BUSINESS = 'Промисловість і торгівля',
    AGRARIAN_POLICY = 'Аграрна політика',
    LAND_RELATIONS = 'Земельні відносини',
    TRANSPORT = 'Транспорт',
    COMMUNICATION = 'Зв’язок',
    ECONOMIC_PRICE_INVESTMENT = 'Економічна та інвестиційна',
    FINANCIAL_POLICY = 'Фінансова політика',
    TAX_POLICY = 'Податкова політика',
    CUSTOMS_POLICY = 'Митна політика',
    SOCIAL_PROTECTION = 'Соціальний захист',
    LABOR_SALARY = 'Праця і зарплата',
}

export const ukrainianPetitionTopics: string[] = Object.values(PetitionTopic).filter(topic => topic !== 'c');

console.log(ukrainianPetitionTopics);
