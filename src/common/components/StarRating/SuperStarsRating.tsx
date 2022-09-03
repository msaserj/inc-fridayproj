import React, {useState} from "react";
import Star from "./Star";
import css from "./SuperStarsRating.module.css"

// надо onChange добавить что-бы передавать наверх измененное значение

type StarRatingPropsType = {
    numTotalStars: number
    initialRating: number
}

export const SuperStarRating: React.FC<StarRatingPropsType> = (
    {
        numTotalStars,
        initialRating
    }) => {

    const [numSelectedStars, setNumSelectedStars] = useState(initialRating);
    const [numHoveringStars, setNumHoveringStars] = useState<null | number>(null);

    const [isUserHovering, setIsUserHovering] = useState(false);

    function getColor(isUserHovering: boolean, i: number, numSelectedStars: number, numHoveringStars: null | number) {
        const threshold = isUserHovering ? numHoveringStars : numSelectedStars;
        if (threshold) return i < threshold ? "orange" : "grey";
    }

    return (
        <div className={css.starRatingBlock}>
            <div className={css.starRating}>
                <div
                    onMouseEnter={() => setIsUserHovering(true)}
                    onMouseLeave={() => setIsUserHovering(false)}
                >
                    {Array.from({length: numTotalStars}).map((e, i) => (
                        <Star
                            key={i}
                            color={getColor(
                                isUserHovering,
                                i,
                                numSelectedStars,
                                numHoveringStars
                            )}
                            handleSelect={() => setNumSelectedStars(i + 1)}
                            handleHover={() => setNumHoveringStars(i + 1)}
                        />
                    ))}
                </div>
                <div className="label"> {numSelectedStars}</div>
            </div>

        </div>
    );
}

