export interface Announcement {
    //name: string;
    viewsCount: number;
    responsesCount: number;
    description: string;
    datePosted: string;
    helpTypes?: string[];
    documents?: File[];
    userId: number;
    title: string;
    details: string;
    currentLocation: string;
}