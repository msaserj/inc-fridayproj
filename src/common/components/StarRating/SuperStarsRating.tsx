import React, {useState} from "react";
import Star from "./Star";
import css from "./SuperStarsRating.module.css"

// надо onChange добавить что-бы передавать наверх измененное значение

type StarRatingPropsType = {

    initialRating: number
    onRate?: (rate: number) => void
}

export const SuperStarRating: React.FC<StarRatingPropsType> = (
    {
        initialRating ,
        onRate= t => t
    }) => {

    const numTotalStars = 5;
    const [numSelectedStars, setNumSelectedStars] = useState(initialRating);
    const [numHoveringStars, setNumHoveringStars] = useState<null | number>(null);
    console.log("numHoveringStars", numHoveringStars)
    console.log("numSelectedStars", numSelectedStars)

    const [isUserHovering, setIsUserHovering] = useState(false);

    function getColor(isUserHovering: boolean, i: number, numSelectedStars2: number, numHoveringStars: null | number) {
        const threshold = isUserHovering ? numHoveringStars : numSelectedStars2;
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
                                Math.round(numSelectedStars),
                                numHoveringStars
                            )}
                            handleSelect={() => {setNumSelectedStars(i + 1); onRate(i+1)}}
                            handleHover={() => setNumHoveringStars(i + 1)}
                        />
                    ))}
                </div>
                <div className={css.number}> {numSelectedStars}</div>
            </div>

        </div>
    );
}

