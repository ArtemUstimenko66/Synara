import React, { useState, useEffect } from 'react';
import { Button } from '../../../../ui/Button';
import {submitSynaraFeedback} from "../../api/mainPageService.ts";
import {useTranslation} from "react-i18next";


interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const FeedbackSynaraModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
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
            text: comment,
            rating,
        };

        try {
            const response = await submitSynaraFeedback(feedbackData);
            console.log('Server response:', response);

            onClose();
        } catch (error) {
            console.error('Failed to submit Synara feedback:', error);
        }
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        if (text.length <= maxCommentLength) {
            setComment(text);
        }
    };
    const {t} = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white sm:rounded-none md:rounded-3xl xl:rounded-3xl border-dark-blue border-2 p-6 w-full md:h-auto xl:h-auto sm:h-full md:max-w-[60vw] xl:max-w-[32vw]">
                <button onClick={onClose} className="absolute top-0 right-4 text-h3 hover:text-gray-800">
                    ×
                </button>
                <h2 className="mt-6 text-h4 text-center font-kharkiv mb-4">{t('leave_feedback_about_synara')}</h2>

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

                <p className="font-montserratMedium">{t('comment')}</p>
                <textarea
                    className="w-full border resize-none border-light-blue font-montserratMedium rounded-lg p-2 mb-4"
                    rows={4}
                    placeholder={t('your_comment')}
                    value={comment}
                    onChange={handleCommentChange}
                />
                <p className="text-sm text-gray-500">{comment.length}/{maxCommentLength} {t('symbols')}</p>

                <div className="flex justify-center">
                    <Button isFilled={true} onClick={handleSubmit} className=" sm:w-full md:w-1/2 xl:w-1/2 uppercase bg-perfect-yellow text-almost-black">
                        {t('leave_feedbackLOW')}
                    </Button>
                </div>
            </div>
        </div>
    );
};
