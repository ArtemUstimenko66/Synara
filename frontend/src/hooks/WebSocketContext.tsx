import React, { createContext, useContext, useState, ReactNode } from 'react';
import io from 'socket.io-client';

const WebSocketContext = createContext<any>(null);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [socket] = useState(() => io('https://synara.help', { withCredentials: true}));

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (context === null) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
