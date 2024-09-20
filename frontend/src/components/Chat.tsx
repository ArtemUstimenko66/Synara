import React, { useEffect, useState } from 'react';
import { useWebSocket } from './WebSocketContext.tsx';

interface Message {
    content: string;
    senderId: number;
    chatId: number;
    type: 'text' | 'image';
}

const Chat: React.FC<{ chatId: number }> = ({ chatId }) => {
    const socket = useWebSocket();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (!socket) return;

        socket.emit('joinChat', chatId);

        socket.on('newMessage', (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('newMessage');
        };
    }, [socket, chatId]);

    const handleSendMessage = () => {
        if (socket && newMessage.trim()) {
            socket.emit('sendMessage', {
                chatId,
                content: newMessage,
                type: 'text',
            });
            setNewMessage('');
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSendFile = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('chatId', chatId.toString());

            try {
                const response = await fetch('http://localhost:8080/files/upload', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                });
                const data = await response.json();
                if (data.file) {
                    socket.emit('sendMessage', {
                        chatId,
                        content: data.file.fileUrl,
                        type: 'image',
                    });
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            } finally {
                setFile(null);
            }
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>Sender {msg.senderId}:</strong>
                        {msg.type === 'text' ? (
                            <p>{msg.content}</p>
                        ) : (
                            <img src={msg.content} alt="Sent image" style={{ maxWidth: '100%' }} />
                        )}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSendFile}>Send File</button>
        </div>
    );
};

export default Chat;
