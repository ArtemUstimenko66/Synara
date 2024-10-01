import React, { useState, useRef, useEffect } from 'react';
import SmileVector from '../assets/SmileVector.svg?react';
import ImageVector from '../assets/ImageVector.svg?react';
import PaperIcon from '../assets/PaperIcon.svg?react';

import Sticker_1_1 from '../assets/stickers/Sticker_1_1.png';
import Sticker_1_2 from '../assets/stickers/Sticker_1_2.png';
import Sticker_1_3 from '../assets/stickers/Sticker_1_3.png';
import Sticker_1_4 from '../assets/stickers/Sticker_1_4.png';

import Sticker_2_1 from '../assets/stickers/Sticker_2_1.png';
import Sticker_2_2 from '../assets/stickers/Sticker_2_2.png';
import Sticker_2_3 from '../assets/stickers/Sticker_2_3.png';
import Sticker_2_4 from '../assets/stickers/Sticker_2_4.png';

import Sticker_3_1 from '../assets/stickers/Sticker_2_1.png';
import Sticker_3_2 from '../assets/stickers/Sticker_2_2.png';
import Sticker_3_3 from '../assets/stickers/Sticker_2_3.png';
import Sticker_3_4 from '../assets/stickers/Sticker_2_4.png';

const stickers = [
    { id: 1, src: Sticker_1_1 },
    { id: 2, src: Sticker_1_2 },
    { id: 3, src: Sticker_1_3 },
    { id: 4, src: Sticker_1_4 },

    { id: 5, src: Sticker_2_1},
    { id: 6, src: Sticker_2_2},
    { id: 7, src: Sticker_2_3},
    { id: 8, src: Sticker_2_4},

    { id: 9, src: Sticker_3_1},
    { id: 10, src: Sticker_3_2},
    { id: 11, src: Sticker_3_3},
    { id: 12, src: Sticker_3_4},
];

const ComponentFullInput: React.FC<{
    onSendMessage: (message: { content: string; type: string; }) => void;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSendFile: (selectedFile: File, chatId: number | null, socket: any) => Promise<void>;
    selectedChatId: number | null;
    socket: any;
}> = ({ onSendMessage, onFileChange, onSendFile, selectedChatId, socket }) => {
    const [message, setMessage] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            // @ts-ignore
            onSendMessage(message);
            setMessage('');
        }
    };

    const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            onFileChange(event);
            await onSendFile(selectedFile, selectedChatId, socket);
        }
    };

    const handleStickerClick = (src: string) => {
        fetch(src)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], `sticker_${Date.now()}.png`, { type: 'image/png' });
                onFileChange({target: {files: [file]}} as unknown as React.ChangeEvent<HTMLInputElement>);
                onSendFile(file, selectedChatId, socket);
                onSendMessage({ content: src, type: 'sticker' });
                setIsPopupVisible(false);
            });

        togglePopup();
    };

    return (
        <div className="relative h-auto bg-transparent bottom-0 left-0 w-full sm:p-0 xl:p-5">
            {/* Sticker popup */}
            {isPopupVisible && (
                <div className="absolute bottom-[8vh] left-0 bg-white xl:mb-0 md:mb-4 ml-4 border border-dark-blue p-4 rounded-2xl shadow-lg z-10">
                    <div className="grid grid-cols-4 gap-2">
                        {stickers.map((sticker) => (
                            <div
                                key={sticker.id}
                                className="w-16 h-16 cursor-pointer rounded-2xl"
                                onClick={() => handleStickerClick(sticker.src)}
                            >
                                <img src={sticker.src} alt={`sticker-${sticker.id}`} className="w-full h-full" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="relative bg-transparent h-auto flex items-center w-full border-2 border-blue-500 rounded-full p-3 bg-white">
                {/* Icons on the left */}
                <div className="pr-2 flex h-auto">
                    <SmileVector className="xl:w-6 xl:h-6 md:w-8 md:h-8 mr-4 cursor-pointer" onClick={togglePopup} />
                    <label htmlFor="fileInput" className="cursor-pointer">
                        <ImageVector className="xl:w-6 xl:h-6 md:w-8 md:h-8 mr-2" />
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                        ref={fileInputRef}
                    />
                </div>

                {/* Textarea for the input */}
                <textarea
                    ref={textareaRef}
                    rows={1}
                    placeholder="Ваше повідомлення"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent resize-none text-almost-black md:text-xs-pxl xl:text-pd font-montserratRegular placeholder-gray-500 focus:outline-none"
                    style={{
                        maxHeight: '90px',
                        height: 'auto',
                        overflowY: 'auto',
                        transition: 'height 0.2s ease',
                    }}
                />

                {/* Icon on the right */}
                <PaperIcon className="xl:w-8 xl:h-6 md:w-10 md:h-8 cursor-pointer" onClick={handleSendMessage} />
            </div>
        </div>
    );
};

export default ComponentFullInput;
