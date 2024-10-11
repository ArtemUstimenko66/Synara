import { useEffect } from "react";

interface JitsiMeetComponentProps {
    roomName: string;
    email: string;
}

const CallVictim = ({ roomName, email }: JitsiMeetComponentProps) => {
    useEffect(() => {
        const loadJitsiScript = () => {
            if (document.getElementById("jitsi-script")) {
                return Promise.resolve();
            }

            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = "https://meet.jit.si/external_api.js";
                script.async = true;
                script.onload = resolve;
                script.onerror = (event) => {
                    console.error("Script load error:", event);
                    setTimeout(() => loadJitsiScript().then(resolve).catch(reject), 5000);
                };

                document.body.appendChild(script);
            });
        };

        let jitsiApi: any;

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
                        prejoinPageEnabled: true,
                        disableProfile: true,
                    },
                    interfaceConfigOverwrite: {
                        TOOLBAR_BUTTONS: [
                            "microphone", "camera", "hangup", "profile", "chat",
                            "videoquality", "fullscreen", "fodeviceselection", "tileview",
                            "download", "help", "security",
                        ],
                    },
                    userInfo: {
                        email,
                        displayName: email?.split('@')[0],
                    },
                };
                localStorage.removeItem('jitsiLocalStorage');
                localStorage.removeItem('jitsiMeetRecentList');
                const JitsiMeetExternalAPI = (window as any).JitsiMeetExternalAPI;
                if (JitsiMeetExternalAPI) {
                    jitsiApi =
                        new JitsiMeetExternalAPI(domain, options);
                }
            })
            .catch((error) => console.error("Jitsi script loading failed:", error));

        return () => {
            if (jitsiApi) {
                jitsiApi.dispose();
            }
            const element = document.getElementById(roomName);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };

    }, [roomName, email]);

    return (<div id={roomName} style={{ margin: "20px 0" }} />);

};

export default CallVictim;
