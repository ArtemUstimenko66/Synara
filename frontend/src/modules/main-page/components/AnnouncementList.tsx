import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnnouncementList: React.FC = () => {
    const [announcements, setAnnouncements] = useState<any[]>([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await axios.get('/api/announcements');
                setAnnouncements(data);
            } catch (error) {
                console.error('Error fetching announcements', error);
            }
        };

        fetchAnnouncements();
    }, []);

    if (announcements.length === 0) return <div>Loading...</div>;

    return (
        <div>
            {announcements.map((announcement) => (
                <div key={announcement.id}>
                    <h1>{announcement.description}</h1>
                    <p>Posted on: {new Date(announcement.datePosted).toLocaleDateString()}</p>
                    {announcement.files && announcement.files.length > 0 && (
                        <div>
                            <h2>Files:</h2>
                            {announcement.files.map((file: any) => (
                                <div key={file.id}>
                                    <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                                        {file.fileName}
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AnnouncementList;