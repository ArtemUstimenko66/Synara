declare module 'react-rating-stars-component' {
    const ReactStars: React.FC<{
        count: number;
        onChange: (newRating: number) => void;
        size?: number;
        isHalf?: boolean;
        emptyIcon?: React.ReactNode;
        halfIcon?: React.ReactNode;
        fullIcon?: React.ReactNode;
        activeColor?: string;
    }>;
    export default ReactStars;
}
