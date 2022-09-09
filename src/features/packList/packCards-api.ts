import {instance} from "../../api/api-instance";

export const packCardsApi = {
	getCardsPack(requestData: requestDataType) {
		return instance.get<PackListType>(`/cards/pack`,
			{params: {...requestData}})
			.then(res => res.data)
	},
	addNewPack(name: string, makePrivate: boolean) {
		return instance.post<AddPackType>(`/cards/pack`,
			{cardsPack: {name, private: makePrivate}})
	},
	deleteCardsPack(id: string) {
		return instance.delete<PacksType>(`/cards/pack/?id=${id}`)
	},
	updateCardsPack(_id: string, name: string, privatePack: boolean) {
		return instance.put<UpdatePackType>(`/cards/pack`, {cardsPack: {_id, name, private: privatePack}})
	},
}
// Response PackListType
type PackListType = {
	cardPacks: PacksType[]
	page: number
	pageCount: number
	cardPacksTotalCount: number
	minCardsCount: number
	maxCardsCount: number

	filter: string
	isMyPacks: false
	searchResult: string
};
export type PacksType = {
	_id: string
	user_id: string
	user_name: string
	private: boolean
	name: string
	path: string // не используется
	grade: number // используется - рейтинг
	shots: number
	deckCover: string
	cardsCount: number
	type: string
	rating: number // не используется
	created: string
	updated: string
	more_id: string
}
// Request Data for get request
export type requestDataType = {
	pageCount?: number
	page?: number
	packName?: string
	user_id?: string
	sortPacks?: string
	min?: number
	max?: number
}

export type AddPackType = {
	name: string
	deckCover: string
	private: boolean
}

export type UpdatePackType = {
	_id: string
	deckCover: string
	private: boolean
}

