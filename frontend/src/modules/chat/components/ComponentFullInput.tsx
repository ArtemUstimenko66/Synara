import React, { useState, useRef, useEffect } from 'react';
import SmileVector from '../../../../../../../Downloads/chat/assets/SmileVector.svg?react';
import ImageVector from '../../../../../../../Downloads/chat/assets/ImageVector.svg?react';
import PaperIcon from '../../../../../../../Downloads/chat/assets/PaperIcon.svg?react';

const ComponentFullInput: React.FC = () => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset the height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust to fit content
        }
    }, [message]);

    return (
        <div className=" bg-transparent bottom-0 left-0 w-full p-4" style={{ zIndex: 100 }}>
            <div className="relative bg-transparent flex items-end w-full border-2 border-blue-500 rounded-2xl p-2 bg-white" style={{  bottom: 0 }}>
                {/* Icons on the left */}
                <div className="pr-2 flex">
                    <SmileVector className="w-6 h-6 mr-2" />
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

export default ComponentFullInput;