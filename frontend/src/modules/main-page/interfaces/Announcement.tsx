export interface Announcement {
    viewsCount: number;
    responsesCount: number;
    description: string;
    datePosted: string;
    helpTypes?: string[];
    documents?: File[];
    userId: number;
}