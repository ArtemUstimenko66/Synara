import React, {useEffect, useLayoutEffect, useState} from 'react';
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import SearchComponent from "../../modules/main-page/components/ui/SearchComponent.tsx";
import Announcement from "../../modules/main-page/components/Announcement.tsx";
import DownArrowIcon from '../../modules/main-page/assets/Down_Arrow_Main.svg?react';
import Wrapper from "../../ui/Wrapper.tsx";
import NothingFound from "../../assets/images/NothingFound.png"
import { Button } from "../../ui/Button.tsx";
import Footer from "../../components/Footer.tsx";
import { SideBar } from "../../modules/main-page/components/SideBar.tsx";
import { Link, useSearchParams } from "react-router-dom";
import { urgencyTranslations } from "../../data/urgencyMap.ts";
import { Map } from "../../modules/main-page/components/Map.tsx";
import ChatButton from "../../modules/chat/components/ui/ChatButton.tsx";
import {SideBarChat} from "../../modules/chat/components/SideBarChat.tsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../hooks/useAuth.ts";
import VolunteerCard from "../../modules/main-page/components/VolunteerCard.tsx";
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../assets/animations/logoLoading.json';
import {
    fetchAnnouncements
} from "../../redux/announcementsSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store.ts";
import Header from "../../components/Header.tsx";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
}

interface Announcement {
    id: string;
    user: User;
    userName: string;
    avatar: string;
    date_posted: Date;
    description: string;
    type_help: string;
    is_urgent: string;
}

interface Volunteer {
    user: User;
    name: string;
    rating: number;
    supports: string[];
    description: string;
    startWorkingDay: string;
    endWorkingDay: string;
    startTime: string;
    endTime: string;
    avatar: string;
}


const MainPage: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMapMenuOpen, setIsMapMenuOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const {t} = useTranslation();

    const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, limit } = useSelector((state: any) => state.announcements);
    const { isAuthenticated, role, isLoading: isAuthLoading } = useAuth();
    //console.log("role ->", role);

    const { announcements = [], hasMore = false } = useSelector(
        (state: RootState) => state.announcements || {}
    );

    const [, setAnnouncements] = useState<any[]>([]);
    const [filteredAnnouncements, setFilteredAnnouncements] = useState<any[] | null>(null);
    const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
    const [offset, setOffset] = useState(0);

    const [, setHasMore] = useState(true);


    const toggleChatSidebar = () => {
        setIsChatSidebarOpen(!isChatSidebarOpen);
    };
    const [scrollPosition, setScrollPosition] = useState(0);


    const saveScrollPosition = () => {
        setScrollPosition(window.scrollY);
    };

    useLayoutEffect(() => {
        window.scrollTo(0, scrollPosition);
    }, [filteredAnnouncements]);

    // get data from store
    useEffect(() => {
        const fetchAndSetAnnouncements = async () => {
            setIsLoadingData(true);
            const query = searchParams.get('query') || '';
            const types = searchParams.getAll('type');
            const urgencyParam = searchParams.get('isUrgent');
            const maxAge = Number(searchParams.get('maxAge'));
            const minAge = Number(searchParams.get('minAge'));
            const gender = searchParams.get('gender') || '';
            const urgency = urgencyParam === 'true' ? true : urgencyParam === 'false' ? false : undefined;

            try {
                const data = await dispatch(fetchAnnouncements({
                    query,
                    types,
                    urgency,
                    sortOrder,
                    role,
                    offset: 0,
                    limit,
                    genderParam: gender,
                    ageFrom: minAge,
                    ageTo: maxAge
                })).unwrap();

                setFilteredAnnouncements(data);
                setOffset(0);
                setHasMore(data.length === limit);

            } catch (error) {
                console.error('Error fetching announcements:', error);
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchAndSetAnnouncements();
    }, [dispatch, searchParams, sortOrder, role, isAuthLoading, limit]);


    if (isLoadingData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Player
                    autoplay
                    loop
                    src={loadingAnimation}
                    style={{ height: '200px', width: '200px' }}
                />
            </div>
        );
    }


    // sort
    const handleSort = (order: 'ASC' | 'DESC') => {
        setSortOrder(order);
        setOffset(0);
        setHasMore(true);
        saveScrollPosition();
        const query = searchParams.get('query') || '';
        const types = searchParams.getAll('type');
        const urgencyParam = searchParams.get('isUrgent');
        const maxAge = Number(searchParams.get('maxAge'));
        const minAge = Number(searchParams.get('minAge'));
        const gender = searchParams.get('gender')|| '';
        const urgency = urgencyParam === 'true' ? true : urgencyParam === 'false' ? false : undefined;

        dispatch(fetchAnnouncements({ query, types, urgency, sortOrder: order, role, offset: 0, limit, gender, minAge, maxAge }))
            .then((result) => {
                setFilteredAnnouncements(result.payload);
                if (result.payload.length < limit) {
                    setHasMore(false);
                }
                window.scrollTo(0, scrollPosition);
            });

        toggleDropdown();
    };

    // pagination
    const loadMoreAnnouncements = () => {
        saveScrollPosition();
        const newOffset = offset + limit;
        setOffset(newOffset);
        const query = searchParams.get('query') || '';
        const types = searchParams.getAll('type');
        const urgencyParam = searchParams.get('isUrgent');
        const maxAge = searchParams.get('maxAge');
        const minAge = searchParams.get('minAge');
        const gender = searchParams.get('gender');
        const urgency = urgencyParam === 'true' ? true : urgencyParam === 'false' ? false : undefined;

        dispatch(fetchAnnouncements({ query, types, urgency, sortOrder, role, offset: newOffset, limit, gender, minAge, maxAge }))
            .then((result) => {
                if (result.payload.length < limit) {
                    setHasMore(false);
                }
                // @ts-ignore
                setFilteredAnnouncements(prev => [...prev, ...result.payload]);
                window.scrollTo(0, scrollPosition);
            });
    };


    const handleApplyFilters = (filtered: any[]) => {
        setFilteredAnnouncements(filtered);
        setOffset(0);
        setHasMore(filtered.length > 0);
        window.scrollTo(0, scrollPosition);
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

    if (isAuthLoading || isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Player autoplay loop src={loadingAnimation} style={{ height: '200px', width: '200px' }} />
            </div>
        );
    }

    // filter by map
    const handleUsersByRadiusFound = (users: any[]) => {
        setAnnouncements(users);
        setIsMapMenuOpen(false);
    };


    return (
        <Wrapper>
            <div className=" bg-almost-white">
                {/* Header */}
                {
                    isAuthenticated
                        ?
                        <MainHeader />
                        :
                        <Header />
                }

                {/* Main content */}
                <div className="w-full mt-[8vh] px-4">
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="w-full md:w-1/2 xl:w-1/4 flex flex-col items-start justify-start">
                            {/* Help Map Button */}
                            <Link to="/map-help" className="w-full">
                                <Button hasBlue={true}
                                        className="uppercase text-relative-h5 px-8 py-3 mt-8 my-5 w-full xl:w-full">
                                    {t('map_of_help')}
                                </Button>
                            </Link>


                            {/* Filters Button */}
                            <div className="w-full flex items-start justify-start md:mt-0">
                                <Button
                                    hasBlue={true}
                                    className="px-4 text-relative-h5 w-full md:w-1/2 xl:w-3/6 xl:mb-0 md:mb-0 sm:mb-2"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    <span className="text-montserratMedium text-relative-h5">{t('filter')}</span>
                                </Button>
                            </div>
                        </div>

                        <div className="w-full  md:w-1/2 xl:w-3/4 flex flex-col items-end justify-end">
                            {/* Search Component */}
                            <div className="w-full mb-3 md:mt-0">
                                <SearchComponent/>
                            </div>

                            <div
                                className="w-full flex flex-col md:flex-row md:space-x-4 items-end justify-end mt-4 md:mt-0">
                                {/* Add Announcement Button */}
                                <Link to="/add-announcement" className="w-full md:w-1/2 xl:w-auto">
                                    <Button hasBlue={true} className="px-4 w-full md:w-auto xl:w-auto">
                                        <span
                                            className="text-montserratMediumtext-relative-h5">{t('add_announcement')}</span>
                                    </Button>
                                </Link>

                                {/* Sort Button with Dropdown */}
                                <div className="w-full md:w-1/2 xl:w-auto mt-4 md:mt-0 flex justify-end">
                                    <div className="relative w-full md:w-3/4 xl:w-auto">
                                        <Button
                                            hasBlue={true}
                                            className={`px-2 z-11 w-full md:w-auto xl:w-auto text-relative-h5 flex items-center justify-center space-x-3 transition-all duration-0 ${isDropdownOpen ? 'rounded-b-none rounded-t-3xl' : 'rounded-3xl'}`}
                                            onClick={toggleDropdown}
                                        >
                                            <span
                                                className="text-montserratMedium text-relative-h5">{t('sort_by')}</span>
                                            <DownArrowIcon
                                                className={`h-3 w-3 mt-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                            />
                                        </Button>

                                        {isDropdownOpen && (
                                            role === 'victim' ? (
                                                <div
                                                    className="w-full bg-white border-2 border-blue-500 rounded-b-3xl absolute left-0 top-full z-10 -mt-1">
                                                    <div
                                                        className={`cursor-pointer py-2 px-4  border-blue-500 ${sortOrder === 'DESC' ? 'text-blue-500' : 'text-black'}`}
                                                        onClick={() => handleSort('DESC')}
                                                    >
                                                        {t('by_rating')}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    className="w-full bg-white border-2 border-blue-500 rounded-b-3xl absolute left-0 top-full z-10 -mt-1">
                                                    <div
                                                        className={`cursor-pointer py-2 px-4 border-b-2 border-blue-500 ${sortOrder === 'DESC' ? 'text-blue-500' : 'text-black'}`}
                                                        onClick={() => handleSort('DESC')}
                                                    >
                                                        {t('firstly_new')}
                                                    </div>
                                                    <div
                                                        className={`cursor-pointer py-2 px-4 ${sortOrder === 'ASC' ? 'text-blue-500' : 'text-black'}`}
                                                        onClick={() => handleSort('ASC')}
                                                    >
                                                        {t('old_for_first')}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {role === 'volunteer' ?

                        <div className="flex flex-col md:flex-row">

                            {/* ? Announcements ? */}
                            <div className="w-full flex justify-between">
                                <div className="w-full mt-4 ml-4 flex flex-wrap justify-start">
                                    {(filteredAnnouncements || announcements).length > 0 ? (
                                        (filteredAnnouncements || announcements).map((announcement: Announcement, index: number) => (
                                            <div key={index} className="w-full md:w-[48%] xl:w-[32%] mr-[1vw] p-2 mt-4">
                                                <Announcement
                                                    id={`${announcement.id}`}
                                                    userName={`${announcement.user.firstName} ${announcement.user.lastName}`}
                                                    avatar={announcement.user.avatarUrl || 'https://via.placeholder.com/150'}
                                                    datePosted={announcement.date_posted}
                                                    description={announcement.description}
                                                    typeHelp={announcement.type_help}
                                                    is_urgent={urgencyTranslations[announcement.is_urgent] || announcement.is_urgent}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center  my-[10%] w-full text-gray-500">
                                            <img src={NothingFound} className="xl:w-[20vw] xl:h-auto sm:w-[50vw] md:w-[20vw] md:h-auto mb-4"/>
                                            <div className="text-center font-montserratMedium flex flex-col items-center justify-center">
                                                {t('no_announcements_by_this_filters')}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        :
                        <div className="w-full flex justify-between">
                            <div className="w-full mt-4 ml-4 flex flex-wrap justify-start">
                                {(filteredAnnouncements || announcements).length > 0 ? (
                                    (filteredAnnouncements || announcements).map((volunteer: Volunteer, index: number) => (
                                        <div
                                            key={index}
                                            className="w-full sm:w-full md:w-[48%] xl:w-[32%] mr-[1vw] p-2 mt-4"
                                        >
                                            <VolunteerCard
                                                key={index}
                                                id={Number(volunteer.user.id)}
                                                name={`${volunteer.user.firstName} ${volunteer.user.lastName}`}
                                                rating={volunteer.rating}
                                                supports={volunteer.supports}
                                                description={volunteer.description}
                                                startTime={volunteer.startTime}
                                                endTime={volunteer.endTime}
                                                startWorkingDay={volunteer.startWorkingDay}
                                                endWorkingDay={volunteer.endWorkingDay}
                                                avatar={volunteer.user.avatarUrl || 'https://via.placeholder.com/150'}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex items-center justify-center my-[10%] w-full text-gray-500">
                                        <div className="text-center font-montserratMedium">
                                            <img src={NothingFound} className="w-[20vw] h-auto"/>
                                            {t('no_announcements_by_this_filters')}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    }


                    {/* Load More Button */}
                    {hasMore && (
                        <div className="w-full flex justify-center mt-8">
                            <Button isFilled={true} className="uppercase" onClick={loadMoreAnnouncements}>
                                {t('show_more')}
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
                onUsersByRadiusFound={handleUsersByRadiusFound}
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