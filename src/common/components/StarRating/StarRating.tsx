import React, {useState} from 'react';
import {FaStar} from "react-icons/fa"
import privateClass from "./StarRating.module.css"

type StarRatingPropsType = {
    count?: number
    value: number
    onClick?: (value: number) => void
    size?: number
    edit?: boolean
}
export const StarRating: React.FC<StarRatingPropsType> = ({count = 5, value, onClick, edit, size = 20}) => {
    const [hover, setHover] = useState(0)
    return (
        <div>
            {[...Array(count)].map((star, i) => {
                const ratingValue = i + 1
                const onHoverEnter = () => edit && setHover(ratingValue)
                const onHoverOut = () => edit && setHover(0)
                return <label key={ratingValue}>
                    <input type="radio"
                           value={ratingValue}
                           onClick={() => edit && onClick && onClick(ratingValue)}
                           name={"rating"}/>
                    <FaStar
                        onMouseEnter={onHoverEnter}
                        onMouseLeave={onHoverOut}
                        color={ratingValue <= (hover || value) ? "#ffc107" : "#e4e5e9"}
                        className={privateClass.tar} size={size}/>
                </label>
            })}

        </div>
    );
};

