import React, { useEffect, useState } from 'react';
import MainHeader from "../modules/main-page/components/ui/MainHeader.tsx";
import SearchComponent from "../modules/main-page/components/ui/SearchComponent.tsx";
import Announcement from "../modules/main-page/components/Announcement.tsx";
import DownArrowIcon from '../modules/main-page/assets/Down_Arrow.svg?react';
import Wrapper from "../ui/Wrapper.tsx";
import { Button } from "../ui/Button.tsx";
import Footer from "../components/Footer.tsx";
import { SideBar } from "../modules/main-page/components/SideBar.tsx";
import { getAnnouncements, searchAnnouncements, getFilteredAnnouncements } from "../modules/main-page/api/mainPageService.ts";
import { Link, useSearchParams } from "react-router-dom";
import { urgencyTranslations } from "../data/urgencyMap.ts";
import { Map } from "../modules/main-page/components/Map.tsx";
import ChatButton from "../modules/chat/components/ChatButton.tsx";
import {SideBarChat} from "../modules/chat/components/SideBarChat.tsx";

const MainPage: React.FC = () => {
    const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMapMenuOpen, setIsMapMenuOpen] = useState(false);

    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [filteredAnnouncements, setFilteredAnnouncements] = useState<any[] | null>(null);
    const [searchParams] = useSearchParams();
    const limit = 12;
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const [offsetFilter, setOffsetFilter] = useState(0);
    const [hasMoreFilter, setHasMoreFilter] = useState(true);
    const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(false);


    const toggleChatSidebar = () => {
        setIsChatSidebarOpen(!isChatSidebarOpen);
    };

    // get announcements by search/filters
    useEffect(() => {
        const fetchAnnouncements = async () => {
            const query = searchParams.get('query') || '';
            const types = searchParams.getAll('type');
            const urgency = searchParams.get('urgency');
            const isUkraineSelected = searchParams.get('ukraine') === 'true';

            try {
                let data;
                if (!query && types.length === 0 && !urgency && !isUkraineSelected) {
                    setHasMoreFilter(false);
                    data = await getAnnouncements(limit, offset);
                    setAnnouncements(data);
                    setOffset(offset + limit);
                    if (data.length < limit) {
                        setHasMore(false);
                    }
                } else if (query) {
                    data = await searchAnnouncements(query);
                } else {
                    setHasMore(false);
                    // Добавляем sortOrder в запрос
                    data = await getFilteredAnnouncements(types, limit, offsetFilter, sortOrder);
                    setAnnouncements(data);
                    setOffsetFilter(offsetFilter + limit);
                    if (data.length < limit) {
                        setHasMoreFilter(false);
                    }
                }

                if (urgency) {
                    const currentDate = new Date();
                    data = data.filter(announcement => {
                        const postedDate = new Date(announcement.datePosted);
                        const diffDays = Math.ceil(Math.abs(postedDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
                        return urgency === 'Urgent' ? diffDays <= 5 : diffDays > 5;
                    });
                }

                setAnnouncements(data);
                setFilteredAnnouncements(null);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchAnnouncements();
    }, [searchParams, sortOrder]);

    const handleSort = (order: 'ASC' | 'DESC') => {
        setSortOrder(order);
        setOffsetFilter(0);
        toggleDropdown();
    };

    const loadMoreAnnouncements = async () => {
        try {
            const data = await getAnnouncements(limit, offset);
            setAnnouncements(prev => [...prev, ...data]);
            setOffset(offset + limit);
            if (data.length < limit) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error loading more announcements:', error);
        }
    };


    const loadMoreAnnouncementsFilter = async () => {
        const types = searchParams.getAll('type');
        try {
            const data = await getFilteredAnnouncements(types, limit, offsetFilter);
            setAnnouncements(prev => [...prev, ...data]);
            setOffsetFilter(offsetFilter + limit);

            if (data.length < limit) {
                setHasMoreFilter(false);
            }
            console.log("offsetFilter -> ", offsetFilter);
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

    return (
        <Wrapper>
            <div className="min-h-screen bg-almost-white">
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
                            <SearchComponent />

                            <div className="w-full flex items-end justify-end relative">
                                {/* Add Announcement Button */}
                                <Link to="/add-announcement" className="mr-4">
                                    <Button hasBlue={true} className="px-4 mt-8 w-full">
                                        <span className="text-montserratMedium text-relative-ps">Додати оголошення</span>
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
                                            className={`w-full md:w-[32%] mr-[1vw] p-2 mt-4 ${(filteredAnnouncements || announcements).length === 2 ? (index === 0 ? 'md:justify-start' : 'md:justify-center') : 'md:justify-between'}`}
                                        >
                                            <Announcement
                                                userName={`${announcement.user.firstName} ${announcement.user.lastName}`}
                                                avatar={announcement.user.avatarUrl || 'https://via.placeholder.com/150'}
                                                datePosted={announcement.datePosted}
                                                description={announcement.description}
                                                typeHelp={announcement.typeHelp}
                                                viewsCount={announcement.viewsCount}
                                                respondedCount={announcement.respondedCount}
                                                urgency={urgencyTranslations[announcement.urgency] || announcement.urgency}
                                                isUkraine={announcement.isUkraine}
                                                address={announcement.address}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div>Немає оголошень</div>
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

                    {hasMoreFilter && (
                        <div className="w-full flex justify-center mt-8">
                            <Button isFilled={true} className="uppercase" onClick={loadMoreAnnouncementsFilter}>
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
            <Map
                isOpen={isMapMenuOpen}
                onClose={() => setIsMapMenuOpen(false)}
            />
            {/* Footer */}
            <Footer />
            <ChatButton onClick={toggleChatSidebar} /> {/* Передаем функцию открытия сайдбара */}

            {/* SideBarChat */}
            <SideBarChat isOpen={isChatSidebarOpen} onClose={toggleChatSidebar} /> {/* Передаем нужные пропсы */}
        </Wrapper>
    );
};

export default MainPage;
