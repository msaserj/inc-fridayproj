import React, {useState} from 'react';
import s from "./PackList.module.css"
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {
	getCardsPackThunk,
	getMyCardsPackThunk,
	setCurrentFilterAC,
	setCurrentPageCardPacksAC, setSearchResultAC,
	setViewPacksAC
} from "./packList-reducer";
import {DebounceSearch} from "./DebounceSearch/DebounceSearch";
import SuperButton from "../../common/components/c2-Button/SuperButton";
import {PacksListTable} from "./PackListTable/PackListTable";
import reset_filter from "../../assets/img/resetFilter.svg";
import {Paginator} from "./Paginator/Paginator";


export const PackList = () => {

	const dispatch = useAppDispatch();

	const [name, setName] = useState<string>('');

	const isMyPacks = useAppSelector<boolean>(store => store.packsList.isMyPacks);
	const currentPage = useAppSelector<number>(store => store.packsList.page);
	const pageSize = useAppSelector<number>(store => store.packsList.pageCount);
	const totalCountPage = useAppSelector<number>(store => store.packsList.cardPacksTotalCount);

	//функция отображения своих колод
	function getMyPackHandler() {
		dispatch(setViewPacksAC(true));
		dispatch(getMyCardsPackThunk());
	}

	//функция отображения всех колод
	function getAllPackHandler() {
		dispatch(setViewPacksAC(false));
		dispatch(setCurrentFilterAC('0updated'));
		dispatch(getCardsPackThunk());
	}

	//будет функция добавления новой колоды через модальное окно
	function addCardsPackHandlerModal() {
		console.log('add new pack')
	}

	function onFocusHandler() {
		console.log(`onFocusHandler`, name)
		name ? setName(name) : setName("userNameStore")
	}

	function changePageHandler(page: number) {
		dispatch(setCurrentPageCardPacksAC(page))
		dispatch(getCardsPackThunk()); // ???
	}


	function resetFilterHandler() {
		dispatch(setSearchResultAC(``));
		console.log(`resetFilterHandler clicked`)
		dispatch(getCardsPackThunk()); // ???
	}

	return (
		<>
			<div className={s.mainBlock}>
				<div className={s.head}>
					<h1>Packs list</h1>
					<SuperButton onClick={addCardsPackHandlerModal}>Add new pack</SuperButton>
				</div>
				<div className={s.searchHeader}>
					<div>
						<h3>Search</h3>
						<DebounceSearch/>
					</div>
					<div>
						<h3>Show packs cards</h3>
						<div className={s.userChooseButton}>
							<span className={isMyPacks ? s.active : s.inactive} onClick={getMyPackHandler}>
								My
							</span>
							<span className={isMyPacks ? s.inactive : s.active} onClick={getAllPackHandler}>
              					All
            				</span>
						</div>
					</div>
					<div className={s.rangeBlock}>
						<h3>Number of cards</h3>
						<div> будет двойной ползунок</div>
					</div>

					<div className={s.reset_filter}>
						<img src={reset_filter} alt="reset_filter" onClick={resetFilterHandler}/>
					</div>

				</div>

				<section className={s.packList}>


					<PacksListTable name={name}
									setName={setName}
									onFocusHandler={onFocusHandler}/>

					<Paginator currentPage={currentPage}
							   pageSize={pageSize}
							   totalCount={totalCountPage}
							   onPageChange={changePageHandler}
							   siblingCount={2}
					/>
				</section>
			</div>
		</>

	);
};


