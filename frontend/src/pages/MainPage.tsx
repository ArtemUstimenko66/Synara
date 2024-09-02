import React from 'react';
import MainHeader from "../modules/main-page/components/MainHeader.tsx";
import SearchComponent from "../modules/main-page/components/SearchComponent.tsx";
import Announcement from "../modules/main-page/components/Announcement.tsx";
import Filters from "../modules/main-page/components/Filters.tsx";
import DownArrowIcon from '../modules/main-page/assets/Down_Arrow.svg?react';
import Wrapper from "../ui/Wrapper.tsx";
import {Button} from "../ui/Button.tsx";
import Footer from "../components/Footer.tsx";


const MainPage: React.FC = () => {
    return (
        <Wrapper>
            <div className="min-h-screen bg-almost-white">
                {/* Header */}
                <MainHeader />
                <div className="w-full mt-4 px-4">

                    <div className="flex flex-col md:flex-row md:space-x-4 md-8">

                        {/* Map of help */}
                        <div className="w-1/4 flex flex-col items-start justify-start ">
                            <Button hasBlue={true} className="uppercase px-8 py-3 w-full">Карта допомоги</Button>
                            <div className="w-full flex items-end justify-start">
                                <Button hasBlue={true} className="px-4 mt-8 w-3/6"><span className="text-montserratMedium text-relative-pd">Фільтрувати</span></Button>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="w-3/4 flex flex-col items-end justify-end ">
                            <SearchComponent/>
                            <div className="w-full flex items-end justify-end">
                                <Button hasBlue={true}
                                        className="px-2 mt-8 w-3/12 flex items-center justify-center space-x-2">
                                    <span className="text-montserratMedium text-relative-pd">Сортування за</span>
                                    <DownArrowIcon className="h-4 w-4 mt-1"/>
                                </Button>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:space-x-4">
                        {/* Filters */}

                        {/* Main part */}
                        <div className="w-full">
                            {/* Announcements */}
                            <div className="mt-4 flex space-x-4">
                                <Announcement/>
                                <Announcement/>
                                <Announcement/>
                            </div>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        </Wrapper>
    );
};

export default MainPage;
