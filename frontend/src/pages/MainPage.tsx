import React, {useEffect, useState} from 'react';
import MainHeader from "../modules/main-page/components/MainHeader.tsx";
import SearchComponent from "../modules/main-page/components/SearchComponent.tsx";
import Announcement from "../modules/main-page/components/Announcement.tsx";
import Filters from "../modules/main-page/components/Filters.tsx";
import DownArrowIcon from '../modules/main-page/assets/Down_Arrow.svg?react';
import Wrapper from "../ui/Wrapper.tsx";
import { Button } from "../ui/Button.tsx";
import Footer from "../components/Footer.tsx";
import { SideBar } from "../modules/main-page/components/SideBar.tsx";
import {getAnnouncements} from "../modules/main-page/api/mainPageService.ts";

const MainPage: React.FC = () => {
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   // const [announcements, setAnnouncements] = useState<any[]>([]);

    // useEffect(() => {
    //     const fetchAnnouncements = async () => {
    //         try {
    //             const data = await getAnnouncements();
    //             setAnnouncements(data);
    //         } catch (error) {
    //             console.error('Ошибка при загрузке объявлений:', error);
    //         }
    //     };
    //
    //     fetchAnnouncements();
    // }, []);

    const announcements = [
        {
            id: 1,
            userId: 1,
            userName: 'Ольга Коваленко',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            datePosted: new Date('2024-08-27'),
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя...',
            typeHelp: 'Психологічна'
        },
        {
            id: 2,
            userId: 2,
            userName: 'Анна Иванова',
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
            datePosted: new Date('2024-08-28'),
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя...',
            typeHelp: 'Гуманітарна'
        },
        {
            id: 3,
            userId: 3,
            userName: 'Елена Смирнова',
            avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
            datePosted: new Date('2024-08-29'),
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя...',
            typeHelp: 'Психологічна'
        },
        {
            id: 4,
            userId: 4,
            userName: "Андрій Литвиненко",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
            datePosted: new Date('2024-08-29'),
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя...',
            typeHelp: "Інформаційна",
        },
        {
            id: 5,
            userId: 5,
            userName: "Марія Пономаренко",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
            datePosted: new Date('2024-08-30'),
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя...',
            typeHelp: "Гуманітарна",
        },
        {
            id: 6,
            userId: 6,
            userName: "Іван Іванов",
            avatar: "https://randomuser.me/api/portraits/men/5.jpg",
            datePosted: new Date('2024-09-01'),
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя...',
            typeHelp: "Матеріальна",
        },
        {
            id: 7,
            userId: 7,
            userName: "Світлана Кучер",
            avatar: "https://randomuser.me/api/portraits/women/6.jpg",
            datePosted: new Date('2024-09-02'),
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя...',
            typeHelp: "Матеріальна",
        }
    ];


    const sortedAnnouncements = announcements.sort((a, b) => {
        const dateA = new Date(a.datePosted).getTime();
        const dateB = new Date(b.datePosted).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSortOrderChange = (order: 'newest' | 'oldest') => {
        setSortOrder(order);
        setIsDropdownOpen(false);
    };

    return (
        <Wrapper>
            <div className="min-h-screen bg-almost-white">

                {/* Header */}
                <MainHeader />

                <div className="w-full mt-[5%] px-4">
                    <div className="flex flex-col md:flex-row md:space-x-4 md-8">

                        <div className="w-1/4 flex flex-col items-start justify-start ">
                            {/* Map of help */}
                            <Button hasBlue={true} className="uppercase px-8 py-3 w-full">Карта допомоги</Button>

                            {/* Filters button */}
                            <div className="w-full flex  items-end justify-start">
                                <Button hasBlue={true} className="px-4 mt-8 w-3/6" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                    <span className="text-montserratMedium text-relative-ps">Фільтрувати</span>
                                </Button>
                            </div>
                        </div>

                        <div className="w-3/4 flex flex-col items-end justify-end ">
                            {/* Search */}
                            <SearchComponent />

                            {/* Sort button */}
                            <div className="w-full flex items-end justify-end relative">
                                <div className="w-3/12">
                                    <Button
                                        hasBlue={true}
                                        className={`px-2 z-11 mt-8 w-full flex items-center justify-center space-x-3 transition-all duration-0 ${isDropdownOpen ? 'rounded-b-none rounded-t-3xl' : 'rounded-3xl'}`}
                                        onClick={toggleDropdown}
                                    >
                                        <span className={`text-montserratMedium text-relative-ps`}>Сортування за</span>
                                        <DownArrowIcon
                                            className={`h-4 w-4 mt-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 ' : ''}`}
                                        />
                                    </Button>
                                    {isDropdownOpen && (
                                        <div
                                            className="w-3/12 bg-white border-2 border-blue-500 rounded-b-3xl absolute top-full right-0 -mt-1 z-10">
                                            <div
                                                className={`cursor-pointer py-2 px-4 border-b-2 border-blue-500 ${sortOrder === 'newest' ? 'text-blue-500' : 'text-black'}`}
                                                onClick={() => handleSortOrderChange('newest')}
                                            >
                                                Спочатку нові
                                            </div>
                                            <div
                                                className={`cursor-pointer py-2 px-4 ${sortOrder === 'oldest' ? 'text-blue-500' : 'text-black'}`}
                                                onClick={() => handleSortOrderChange('oldest')}
                                            >
                                                Спочатку старі
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row space-x-8">
                        {/* Main part */}
                        <div className="w-full flex justify-between">
                            {/* Announcements */}
                            <div className="w-full mt-4 flex flex-wrap justify-between">
                                {sortedAnnouncements.map((announcement, index) => (
                                    <div key={index} className="w-full md:w-[32%] p-2 mt-4">
                                        <Announcement
                                            userName={announcement.userName}
                                            avatar={announcement.avatar}
                                            datePosted={announcement.datePosted}
                                            description={announcement.description}
                                            typeHelp={announcement.typeHelp}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <SideBar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} isFilters={true} />
                {/* Footer */}
                <Footer />
            </div>
        </Wrapper>
    );
};

export default MainPage;
