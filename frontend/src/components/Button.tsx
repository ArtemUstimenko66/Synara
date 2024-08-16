const borderStyles= 'border-2 px-6 border-almost-white rounded-full text-almost-white md:text-ps';
const filledStyles = 'bg-perfect-yellow rounded-full py-2 xl:text-base xl:px-6 md:px-4 md:text-ps';

export const Button = ({
    children = '',
    hasBorder = false,
    isFilled = false,
    className = '',
}) => {
    return (
        <button className={`text-almost-black xl:text-pl md:text-ps px-5 py-2 ${hasBorder && borderStyles} ${isFilled && filledStyles} ${className}`}>
            {children}
        </button>
    );
}