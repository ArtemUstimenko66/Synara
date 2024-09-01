import React from 'react';
import MainHeader from "../modules/main-page/components/MainHeader.tsx";
import SearchComponent from "../modules/main-page/components/SearchComponent.tsx";
import Announcement from "../modules/main-page/components/Announcement.tsx";
import Filters from "../modules/main-page/components/Filters.tsx";
import Wrapper from "../ui/Wrapper.tsx";
import {Button} from "../ui/Button.tsx";


const MainPage: React.FC = () => {
    return (
        <Wrapper>
            <div className="min-h-screen bg-almost-white">
                {/* Header */}
                <MainHeader />
                <div className="w-full mt-4 px-4">

                    <div className="flex flex-col md:flex-row md:space-x-4 md-8">

                        {/* Map of help */}
                        <div className="w-1/4">
                            <Button hasBlue={true} className="uppercase px-8 mb-8 w-full" >Карта допомоги</Button>
                        </div>

                        {/* Search */}
                        <div className="w-3/4 ">
                            <SearchComponent />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:space-x-4">
                        {/* Filters */}
                        <aside className="w-1/4" >
                            <Filters/>
                        </aside>

                        {/* Main part */}
                        <div className="w-3/4">
                            {/* Announcements */}
                            <div className="mt-4 space-y-4">
                                <Announcement/>
                                <Announcement/>
                                <Announcement/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default MainPage;
