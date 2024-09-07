import React, { useEffect, useState } from 'react';
import MainHeader from "../modules/main-page/components/MainHeader.tsx";
import SearchComponent from "../modules/main-page/components/SearchComponent.tsx";
import Announcement from "../modules/main-page/components/Announcement.tsx";

import DownArrowIcon from '../modules/main-page/assets/Down_Arrow.svg?react';
import Wrapper from "../ui/Wrapper.tsx";
import { Button } from "../ui/Button.tsx";
import Footer from "../components/Footer.tsx";
import { SideBar } from "../modules/main-page/components/SideBar.tsx";
import { getAnnouncements } from "../modules/main-page/api/mainPageService.ts";

import {Link} from "react-router-dom";

const MainPage: React.FC = () => {
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [announcements, setAnnouncements] = useState<any[]>([]);

    // get all announcements
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await getAnnouncements();
                setAnnouncements(data);
            } catch (error) {
                console.error('Error uploading announcements:', error);
            }
        };

        fetchAnnouncements();
    }, []);

    // sort announcements based on selected order
    const sortedAnnouncements = [...announcements].sort((a, b) => {
        const dateA = new Date(a.datePosted);
        dateA.setHours(0, 0, 0, 0);
        const dateB = new Date(b.datePosted);
        dateB.setHours(0, 0, 0, 0);

        return sortOrder === 'newest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
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

                {/* Main part */}
                <div className="w-full mt-[5%] px-4">
                    <div className="flex flex-col md:flex-row md:space-x-4 md-8">
                        <div className="w-1/4 flex flex-col items-start justify-start">

                            {/* Help Map */}
                            <Button hasBlue={true} className="uppercase px-8 py-3 w-full">Карта допомоги</Button>

                            {/* Filters */}
                            <div className="w-full flex items-end justify-start">
                                <Button hasBlue={true} className="px-4 mt-8 w-3/6"
                                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                    <span className="text-montserratMedium text-relative-ps">Фільтрувати</span>
                                </Button>
                            </div>
                        </div>

                        <div className="w-3/4 flex flex-col items-end justify-end">

                            {/* Search */}
                            <SearchComponent/>

                            <div className="w-full flex items-end justify-end relative">

                                {/* !!!!!!! удалить потом эту кнопку отсюда !!!!!!! */}

                                {/* Search  button */}
                                <Link to="/add-announcement" className="mr-4">
                                    <Button hasBlue={true} className="px-4 mt-8 w-full " >
                                        <span className="text-montserratMedium text-relative-ps">Додати оголошення</span>
                                    </Button>
                                </Link>

                                {/* Sort button */}
                                <div className="w-3/12 relative">
                                    <Button
                                        hasBlue={true}
                                        className={`px-2 z-11 mt-8 w-3/4 flex items-center justify-center space-x-3 transition-all duration-0 ${isDropdownOpen ? 'rounded-b-none rounded-t-3xl' : 'rounded-3xl'}`}
                                        onClick={toggleDropdown}
                                    >
                                        <span className={`text-montserratMedium text-relative-ps`}>Сортування за</span>
                                        <DownArrowIcon
                                            className={`h-3 w-3 mt-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                        />
                                    </Button>

                                    {isDropdownOpen && (
                                        <div
                                            className="w-3/4 bg-white border-2 border-blue-500 rounded-b-3xl absolute left-0 top-full z-10 -mt-1"
                                        >
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

                    {/* Announcements */}
                    <div className="flex flex-col md:flex-row ">
                        <div className="w-full flex justify-between">
                            <div className="w-full mt-4 ml-4 flex flex-wrap justify-start">
                                {sortedAnnouncements.map((announcement, index) => (
                                    <div
                                        key={index}
                                        className={`w-full md:w-[32%] mr-[1vw] p-2 mt-4 ${sortedAnnouncements.length === 2 ? (index === 0 ? 'md:justify-start' : 'md:justify-center') : 'md:justify-between'}`}
                                    >
                                        <Announcement
                                            userName={`${announcement.user.firstName} ${announcement.user.lastName}`}
                                            avatar={announcement.user.avatarUrl || 'https://via.placeholder.com/150'}
                                            datePosted={announcement.datePosted}
                                            description={announcement.description}
                                            typeHelp={announcement.typeHelp}
                                            viewsCount={announcement.viewsCount}
                                            respondedCount={announcement.responsesCount}
                                            images={(announcement.files && announcement.files.length > 0)
                                                ? announcement.files.map((file: any) => file.fileUrl)
                                                : ['https://via.placeholder.com/150']}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <SideBar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} isFilters={true}/>

                {/* Footer */}
                <Footer/>
            </div>
        </Wrapper>
    );
};

export default MainPage;
