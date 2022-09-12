import {useAppDispatch, useAppSelector} from "../../../../common/hooks/hooks";
import {sortCardsPackThunk} from "../../packList-reducer";
import css from "./TableHeaders.module.css"
import {SuperSmallButton} from "../../../../common/components/SmallButtons/SuperSmallButton/SuperSmallButton";
import React from "react";

export const TableHeaders = () => {

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector<boolean>(state => state.app.appIsLoading);
    const currentFilter = useAppSelector<string>(state => state.packsList.filter);


    //фильтрация колод по типу (тип передаем в виде строки)
    const sortCardsByTypeHandler = (sortType: string) => {
        if (currentFilter === "0" + sortType) {
            dispatch(sortCardsPackThunk(`1${sortType}`))
        } else {
            dispatch(sortCardsPackThunk(`0${sortType}`))
        }
    }

    return (
        <thead>
        <tr className={css.trStyle}>
            <th>
                <div className={css.sortBlock} onClick={() => !isLoading && sortCardsByTypeHandler('name')}>
                    <span>Name</span>
                    <SuperSmallButton style={{padding: "2px 8px"}} arrowUp={currentFilter === "1name"} />
                </div>
            </th>
            <th>
                <div className={css.sortBlock} onClick={() => !isLoading && sortCardsByTypeHandler('cardsCount')}>
                    <span>Cards</span>
                    <SuperSmallButton
                        style={{padding: "2px 8px"}}
                        arrowUp={currentFilter === "1cardsCount"} />
                </div>
            </th>
            <th>
                <div className={css.sortBlock} onClick={() => !isLoading && sortCardsByTypeHandler('updated')}>
                    <span>Last Updated</span>
                    <SuperSmallButton style={{padding: "2px 8px"}} arrowUp={currentFilter === "1updated"} />
                </div>
            </th>
            <th>Created by</th>
            <th>Actions</th>
        </tr>
        </thead>
    );
};
