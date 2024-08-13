import React, {useState} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';

//import JitsiMeetComponent from "./components/JitsiMeetComponent";
//import GoogleLoginButton from "./components/GoogleLoginButton";

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Wrapper from "./components/Wrapper";
import Footer from "./components/Footer";


import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import NotFoundPage from "./pages/NotFoundPage";

library.add(fab, fas);

function App() {

   // const [isVisibleCreateBtn, setIsVisibleCreateBtn] = useState(true);
   // const [room, setRoom] = useState("");
    // const [roomCount, setRoomCount] = useState(0);
   // const createConference = () => {
        // const roomName = `room-volunteer_name-${roomCount + 1}`;
       // const roomName = `room-volunteer_name`;
       // setRoom(roomName);
        // setRoomCount(roomCount + 1);
      //  setIsVisibleCreateBtn(!isVisibleCreateBtn);
   // };


    return (
        <div className="App">
            {/*<header className="App-header">*/}
            {/*  <img src={logo} className="App-logo" alt="logo" />*/}
            {/*  <p>*/}
            {/*    Edit <code>src/App.js</code> and save to reload.*/}
            {/*  </p>*/}
            {/*  <a*/}
            {/*    className="App-link"*/}
            {/*    href="https://reactjs.org"*/}
            {/*    target="_blank"*/}
            {/*    rel="noopener noreferrer"*/}
            {/*  >*/}
            {/*    Learn React*/}
            {/*  </a>*/}
            {/*</header>*/}

            {/*<GoogleLoginButton/>*/}
            {/*{isVisibleCreateBtn && (*/}
            {/*    <>*/}
            {/*        <button onClick={createConference}>Create</button>*/}
            {/*    </>*/}
            {/*)}*/}
            {/*<div>*/}
            {/*    /!*{*!/*/}
            {/*    /!*    // rooms.map((room, index) => (*!/*/}
            {/*    /!*    //     <div key={index}>*!/*/}
            {/*    /!*    //         <JitsiMeetComponent roomName={room}/>*!/*/}
            {/*    /!*    //     </div>*!/*/}
            {/*    /!*    // ))*!/*/}
            {/*    /!*    //     <div key={room}>*!/*/}
            {/*    /!*    //         <JitsiMeetComponent roomName={room}/>*!/*/}
            {/*    /!*    //     </div>*!/*/}
            {/*    /!*}*!/*/}

            {/*    {room && (*/}
            {/*        <div key={room}>*/}
            {/*            <JitsiMeetComponent key={room} roomName={room} />*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}


            <Router>
                <Wrapper>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" replace />} />

                        <Route path="/home" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/registration" element={<RegisterPage />} />

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>

                </Wrapper>
            </Router>

        </div>
    );
}

export default App;
