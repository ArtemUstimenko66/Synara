declare module 'react-rating-stars-component' {
    import React from "react";
    const ReactStars: React.FC<{
        count: number,
        onChange: (newRating: number) => void,
        size?: number,
        isHalf?: boolean,
        emptyIcon?: React.ReactNode,
        halfIcon?: React.ReactNode,
        fullIcon?: React.ReactNode,
        activeColor?: string,
        value?: number,
        edit?: boolean
    }>;
    export default ReactStars;
}
