import React, { useState, useEffect } from 'react';

interface LazyLoadGifProps {
    gifSrc: string;
    placeholderSrc: string;
    altText: string;
    placeholderClassName?: string;
    gifClassName?: string;
    placeholderStyle?: React.CSSProperties;
    gifStyle?: React.CSSProperties;
}

const LazyLoadGif: React.FC<LazyLoadGifProps> = ({
                                                     gifSrc,
                                                     placeholderSrc,
                                                     altText,
                                                     placeholderClassName = '',
                                                     gifClassName = '',
                                                     placeholderStyle = {},
                                                     gifStyle = {}
                                                 }) => {
    const [isGifLoaded, setGifLoaded] = useState(false);

    useEffect(() => {
        const gifLoader = new Image();
        gifLoader.src = gifSrc;
        gifLoader.onload = () => {
            setGifLoaded(true);
        };
    }, [gifSrc]);

    return (
        <>
            <img
                src={placeholderSrc}
                alt={`${altText} Placeholder`}
                className={placeholderClassName}
                style={{ display: isGifLoaded ? 'none' : 'block', ...placeholderStyle }}
            />
            <img
                src={gifSrc}
                alt={altText}
                className={gifClassName}
                style={{ display: isGifLoaded ? 'block' : 'none', ...gifStyle }}
            />
        </>
    );
};

export default LazyLoadGif;
