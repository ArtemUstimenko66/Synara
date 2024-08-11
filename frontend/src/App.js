import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import JitsiMeetComponent from "./Components/JitsiMeetComponent";
import GoogleLoginButton from "./Components/GoogleLoginButton";

function App() {

    const [isVisibleCreateBtn, setIsVisibleCreateBtn] = useState(true);
    const [room, setRoom] = useState("");
    // const [roomCount, setRoomCount] = useState(0);

    const createConference = () => {
        // const roomName = `room-volunteer_name-${roomCount + 1}`;
        const roomName = `room-volunteer_name`;
        setRoom(roomName);
        // setRoomCount(roomCount + 1);
        setIsVisibleCreateBtn(!isVisibleCreateBtn);
    };


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

            <GoogleLoginButton/>
            {isVisibleCreateBtn && (
                <>
                    <button onClick={createConference}>Create</button>
                </>
            )}
            <div>
                {/*{*/}
                {/*    // rooms.map((room, index) => (*/}
                {/*    //     <div key={index}>*/}
                {/*    //         <JitsiMeetComponent roomName={room}/>*/}
                {/*    //     </div>*/}
                {/*    // ))*/}
                {/*    //     <div key={room}>*/}
                {/*    //         <JitsiMeetComponent roomName={room}/>*/}
                {/*    //     </div>*/}
                {/*}*/}

                {room && (
                    <div key={room}>
                        <JitsiMeetComponent key={room} roomName={room} />
                    </div>
                )}
            </div>


        </div>
    );
}

export default App;
