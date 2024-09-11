import React, { useEffect, useState } from 'react';
import MainHeader from "../modules/main-page/components/ui/MainHeader.tsx";
import SearchComponent from "../modules/main-page/components/ui/SearchComponent.tsx";
import Announcement from "../modules/main-page/components/Announcement.tsx";
import DownArrowIcon from '../modules/main-page/assets/Down_Arrow.svg?react';
import Wrapper from "../ui/Wrapper.tsx";
import { Button } from "../ui/Button.tsx";
import Footer from "../components/Footer.tsx";
import { SideBar } from "../modules/main-page/components/SideBar.tsx";
import { getFilteredAnnouncements } from "../modules/main-page/api/mainPageService.ts";
import { Link, useSearchParams } from "react-router-dom";
import { urgencyTranslations } from "../data/urgencyMap.ts";
import { Map } from "../modules/main-page/components/Map.tsx";
import ChatButton from "../modules/chat/components/ui/ChatButton.tsx";
import {SideBarChat} from "../modules/chat/components/SideBarChat.tsx";

const MainPage: React.FC = () => {
    const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMapMenuOpen, setIsMapMenuOpen] = useState(false);

    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [filteredAnnouncements, setFilteredAnnouncements] = useState<any[] | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const limit = 12;

    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);


    const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(false);


    const toggleChatSidebar = () => {
        setIsChatSidebarOpen(!isChatSidebarOpen);
    };

    // get announcements by search/filters
    useEffect(() => {
        const fetchAnnouncements = async () => {
            const query = searchParams.get('query') || '';
            const types = searchParams.getAll('type');
            const currentSortOrder = searchParams.get('sortOrder') as 'ASC' | 'DESC' || 'ASC';
            const urgencyParam = searchParams.get('isUrgent');
            const urgency = urgencyParam === 'true' ? true : (urgencyParam === 'false' ? false : undefined);

            setOffset(0);
            setSortOrder(currentSortOrder);

            try {
                const data = await getFilteredAnnouncements(query, types, limit, 0, sortOrder, urgency);
                setAnnouncements(data);
                setOffset(limit);

                if (data.length < limit) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchAnnouncements();
    }, [searchParams, sortOrder]);

    // sort
    const handleSort = (order: 'ASC' | 'DESC') => {
        setSortOrder(order);
        setOffset(0);
        toggleDropdown();
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('sortOrder', order);
            if (prev.has('isUrgent')) {
                newParams.set('isUrgent', prev.get('isUrgent')!);
            }
            return newParams;
        });
        window.location.reload();
    };

    // pagination
    const loadMoreAnnouncements = async () => {
        const types = searchParams.getAll('type');
        const query = searchParams.getAll('query');
        const urgencyParam = searchParams.get('isUrgent');
        const urgency = urgencyParam === 'true' ? true : (urgencyParam === 'false' ? false : undefined);
        try {
            const data = await getFilteredAnnouncements(query, types, limit, offset, sortOrder, urgency);
            setAnnouncements(prev => [...prev, ...data]);
            setOffset(offset + limit);
            if (data.length < limit) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error loading more announcements:', error);
        }
    };

    // apply filters
    const handleApplyFilters = (filtered: any[]) => {
        setFilteredAnnouncements(filtered);
        window.location.reload();
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOpenMap = () => {
        setIsMapMenuOpen(true);
        setIsMobileMenuOpen(false);
    };

    const backToFilters = () => {
        setIsMapMenuOpen(false);
        setIsMobileMenuOpen(true);
    };
    return (
        <Wrapper>
            <div className=" bg-almost-white">
                {/* Header */}
                <MainHeader />

                {/* Main content */}
                <div className="w-full mt-[5%] px-4">
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="w-1/4 flex flex-col items-start justify-start">
                            {/* Help Map Button */}
                            <Button hasBlue={true} className="uppercase px-8 py-3 w-full">Карта допомоги</Button>

                            {/* Filters Button */}
                            <div className="w-full flex items-end justify-start">
                                <Button
                                    hasBlue={true}
                                    className="px-4 mt-8 w-3/6"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    <span className="text-montserratMedium text-relative-ps">Фільтрувати</span>
                                </Button>
                            </div>
                        </div>

                        <div className="w-3/4 flex flex-col items-end justify-end">
                            {/* Search Component */}
                            <SearchComponent/>

                            <div className="w-full flex items-end justify-end relative">
                                {/* Add Announcement Button */}
                                <Link to="/add-announcement" className="mr-4">
                                    <Button hasBlue={true} className="px-4 mt-8 w-full">
                                        <span
                                            className="text-montserratMedium text-relative-ps">Додати оголошення</span>
                                    </Button>
                                </Link>

                                {/* Sort Button with Dropdown */}
                                <div className="w-3/12 relative">
                                    <Button
                                        hasBlue={true}
                                        className={`px-2 z-11 mt-8 w-3/4 flex items-center justify-center space-x-3
                                            transition-all duration-0 ${isDropdownOpen ? 'rounded-b-none rounded-t-3xl' : 'rounded-3xl'}`}
                                        onClick={toggleDropdown}
                                    >
                                        <span className="text-montserratMedium text-relative-ps">Сортування за</span>
                                        <DownArrowIcon
                                            className={`h-3 w-3 mt-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                        />
                                    </Button>

                                    {isDropdownOpen && (
                                        <div
                                            className="w-3/4 bg-white border-2 border-blue-500 rounded-b-3xl absolute left-0 top-full z-10 -mt-1"
                                        >
                                            <div
                                                className={`cursor-pointer py-2 px-4 border-b-2 border-blue-500 ${sortOrder === 'DESC' ? 'text-blue-500' : 'text-black'}`}
                                                onClick={() => handleSort('DESC')}
                                            >
                                                Спочатку нові
                                            </div>
                                            <div
                                                className={`cursor-pointer py-2 px-4 ${sortOrder === 'ASC' ? 'text-blue-500' : 'text-black'}`}
                                                onClick={() => handleSort('ASC')}
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
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full flex justify-between">
                            <div className="w-full mt-4 ml-4 flex flex-wrap justify-start">
                                {(filteredAnnouncements || announcements).length > 0 ? (
                                    (filteredAnnouncements || announcements).map((announcement, index) => (
                                        <div
                                            key={index}
                                            className={`w - full md:w-[32%] mr-[1vw] p-2 mt-4 ${(filteredAnnouncements || announcements).length === 2 ? (index === 0 ? 'md:justify-start' : 'md:justify-center') : 'md:justify-between'}`}
                                        >
                                            {console.log('Files for announcement:', announcement.files)}
                                            <Announcement
                                                userName={`${announcement.user.firstName} ${announcement.user.lastName}`}
                                                avatar={announcement.user.avatarUrl || 'https://via.placeholder.com/150'}
                                                datePosted={announcement.date_posted}
                                                description={announcement.description}
                                                typeHelp={announcement.type_help}
                                                viewsCount={announcement.viewsCount}
                                                respondedCount={announcement.respondedCount}
                                                urgency={urgencyTranslations[announcement.urgency] || announcement.urgency}
                                                isUkraine={announcement.isUkraine}
                                                address={announcement.address}
                                                images={(announcement.files && announcement.files.length > 0)
                                                    ? announcement.files.map((file: any) => file.fileUrl)
                                                    : ['https://via.placeholder.com/150']}
                                            />
                                        </div>

                                    ))
                                ) : (
                                    <div className="flex items-center justify-center my-[20%] w-full text-gray-500">
                                        <div className="text-center font-montserratMedium">
                                            Наразі немає оголошень за обраними фільтрами
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                        <div className="w-full flex justify-center mt-8">
                            <Button isFilled={true} className="uppercase" onClick={loadMoreAnnouncements}>
                                Показати ще
                            </Button>
                        </div>
                    )}

                </div>
            </div>

            {/* Sidebar */}
            <SideBar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                isFilters={true}
                onApplyFilters={handleApplyFilters}
                onOpenMap={handleOpenMap}
            />

            {/* Map */}
            <Map
                isOpen={isMapMenuOpen}
                onClose={() => setIsMapMenuOpen(false)}
                onBackToFilters={backToFilters}
            />

            {/* Footer */}
            <Footer/>

            {/* ChatButton */}
            <ChatButton onClick={toggleChatSidebar}/>

            {/* SideBarChat */}
            <SideBarChat isOpen={isChatSidebarOpen} onClose={toggleChatSidebar}/>
        </Wrapper>
    );
};

export default MainPage;
