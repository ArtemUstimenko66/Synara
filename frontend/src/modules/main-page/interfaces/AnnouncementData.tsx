export default interface AnnouncementData {
    datePosted: string | null;
    description: string;
    typeHelp: string;
    files?: string[];
    title: string;
    details: string;
    currentLocation: string;
}