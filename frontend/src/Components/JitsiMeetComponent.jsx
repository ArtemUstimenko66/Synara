import React, { useEffect } from "react";

const JitsiMeetComponent = ({ roomName }) => {
    useEffect(() => {
        const loadJitsiScript = () => {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = "https://meet.jit.si/external_api.js";
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        if (!window.JitsiMeetExternalAPI) {
            loadJitsiScript()
                .then(() => {
                    const domain = "meet.jit.si";
                    const options = {
                        roomName: roomName,
                        width: "100%",
                        height: 500,
                        parentNode: document.getElementById(roomName),
                        configOverwrite: {
                            startWithAudioMuted: true,
                            startWithVideoMuted: true,
                            enableWelcomePage: false,
                            prejoinPageEnabled: false, // Пропускает страницу ожидания
                        },
                        interfaceConfigOverwrite: {
                            TOOLBAR_BUTTONS: [
                                "microphone", "camera", "hangup", "profile", "chat", "recording",
                                "videoquality", "fullscreen", "fodeviceselection", "tileview",
                                "download", "help", "mute-everyone", "security"
                            ],
                        },
                        userInfo: {
                            email: 'crouser78@gmail.com',
                            displayName: "volunteer_name",
                        },
                    };

                    const api = new window.JitsiMeetExternalAPI(domain, options);

                    // Дополнительно можно настроить слушатели событий для дальнейшей кастомизации
                    api.addEventListener('participantRoleChanged', function(event) {
                        if (event.role === 'moderator') {
                            console.log("You are the moderator!");
                        }
                    });

                    return () => api.dispose();

                })
                .catch((error) => console.error("Jitsi script loading failed:", error));
        }
        else {
            console.error("Jitsi script not loaded");
        }
        return () => {
            const element = document.getElementById(roomName);
            if (element) {
                element.innerHTML = ""; // Очистка содержимого элемента
            }
        };
    }, []);



    return (<div id={roomName} style={{ margin: "20px 0" }} />);
};

export default JitsiMeetComponent;






//Для пострадавшего(надо в public/index.html подключить скрипт jitsi)
// src/JitsiMeetComponent.js
// import React, { useEffect } from "react";
//
// const JitsiMeetComponent = ({ roomName }) => {
//     useEffect(() => {
//         const domain = "meet.jit.si";
//         const options = {
//             roomName: roomName,
//             width: "100%",
//             height: 500,
//             parentNode: document.getElementById(roomName),
//         };
//
//         const api = new window.JitsiMeetExternalAPI(domain, options);
//
//         return () => api.dispose();
//     }, [roomName]);
//
//     return <div id={roomName} style={{ margin: "20px 0" }} />;
// };
//
// export default JitsiMeetComponent;
