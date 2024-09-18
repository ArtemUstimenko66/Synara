// WebSocketContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import io from 'socket.io-client';

// Создание контекста
const WebSocketContext = createContext<any>(null);

// Создание провайдера
export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [socket] = useState(() => io('http://localhost:8080', { withCredentials: true})); // URL вашего сервера

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Хук для использования контекста
export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (context === null) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
