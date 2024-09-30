import React, { useState, useRef, useEffect } from 'react';
import SmileVector from '../../assets/SmileVector.svg?react';
import ImageVector from '../../assets/ImageVector.svg?react';
import PaperIcon from '../../assets/PaperIcon.svg?react';

const ChatComponentInput: React.FC = () => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    return (
        <div className="fixed bottom-0 left-0 w-full p-4 h-auto" style={{ zIndex: 100 }}>

            {/* Stickers popup */}
            {isPopupVisible && (
                <div className="absolute bottom-16 left-0 bg-white ml-4 border border-dark-blue p-4 rounded-2xl shadow-lg z-50">
                    <div className="grid grid-cols-4 gap-2">
                        {/* Example grid similar to your image */}
                        {Array.from({ length: 12 }).map((_, idx) => (
                            <div key={idx} className="w-16 h-16 bg-blue-500 rounded-2xl"></div>
                        ))}
                    </div>
                </div>
            )}

            <div className="relative bg-transparent flex items-end w-full border-2 border-blue-500 rounded-2xl p-2 bg-white" style={{  bottom: 0 }}>
                {/* Icons on the left */}
                <div className="pr-2 flex">
                    <SmileVector className="w-6 h-6 mr-2 cursor-pointer" onClick={togglePopup} />
                    <ImageVector className="w-6 h-6 mr-2" />
                </div>

                {/* Textarea for the input */}
                <textarea
                    ref={textareaRef}
                    rows={1}
                    placeholder="Ваше повідомлення"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent resize-none text-almost-black text-pd font-montserratRegular placeholder-gray-500 focus:outline-none overflow-hidden"
                    style={{
                        maxHeight: '150px',
                        height: 'auto',
                        transition: 'height 0.5s ease',
                    }}
                />

                {/* Icon on the right */}
                <PaperIcon className="w-8 h-6 mr-2" />
            </div>
        </div>
    );
};

export default ChatComponentInput;
