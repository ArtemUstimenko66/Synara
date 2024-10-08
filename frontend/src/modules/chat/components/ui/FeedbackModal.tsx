import React, { useState, useEffect } from 'react';
import { Button } from '../../../../ui/Button';
import {submitFeedback} from "../../api/chatService.ts";

interface FeedbackModalProps {
    isOpen: boolean;
    className?: string;
    name: string | undefined;
    memberId: number | undefined;
    onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, className, name, memberId, onClose }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const maxCommentLength = 250;

    useEffect(() => {
        if (isOpen) {
            setRating(0);
            setComment("");
        }
    }, [isOpen]);

    const handleRatingChange = (rate: React.SetStateAction<number>) => {
        setRating(rate);
    };

    const handleSubmit = async () => {
        const feedbackData = {
            description: comment,
            rating,
            volunteer: {
                id: memberId,
            },
        };

        try {
            const response = await submitFeedback(feedbackData);
            console.log('Server response:', response);

            onClose();
        } catch (error) {
            console.error('Failed to submit feedback:', error);
        }
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        if (text.length <= maxCommentLength) {
            setComment(text);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-100">
            <div className={`${className || 'h-auto rounded-3xl'} relative bg-white border-dark-blue border-2 p-6 w-full md:max-w-[60vw] xl:max-w-[32vw]`}>
                <button onClick={onClose} className="absolute top-0 right-4 text-h3 hover:text-gray-800">
                    ×
                </button>
                <h2 className="mt-6 text-h4 text-center font-kharkiv mb-4">Залиште відгук про {name}</h2>

                <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => handleRatingChange(star)}
                            className={`cursor-pointer text-3xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <p className="font-montserratMedium">Коментар</p>
                <textarea
                    className="w-full border resize-none border-light-blue font-montserratMedium rounded-lg p-2 mb-4"
                    rows={4}
                    placeholder="Ваш коментар"
                    value={comment}
                    onChange={handleCommentChange}
                />
                <p className="text-sm text-gray-500">{comment.length}/{maxCommentLength} символів</p>

                <div className="flex justify-center">
                    <Button isFilled={true} onClick={handleSubmit} className=" sm:w-full md:w-1/2 xl:w-1/2 uppercase bg-perfect-yellow text-almost-black">
                        Залишити відгук
                    </Button>
                </div>
            </div>
        </div>
    );
};
