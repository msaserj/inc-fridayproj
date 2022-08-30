import {instanceLocal} from "../../api/api-instance";

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
export type cardPacksDataType = {
	cardPacks: PacksType[]

	// we need it types ?!
	cardPacksTotalCount: number
	maxCardsCount: number
	minCardsCount: number
	page: number
	pageCount: number
	token: string
	tokenDeathTime: Date
}

export type requestDataType = {
	pageCount?: number
	page?: number
	packName?: string
	user_id?: string
	sortPacks?: string
	min?: number
	max?: number
}

export const packCardsApi = {
	getCardsPack(requestData: requestDataType) {
		return instanceLocal.get<cardPacksDataType>(`/cards/pack`,
			{params: {...requestData}})
			.then(res => {
				return res.data
			})
	},
	addNewPack(name: string, makePrivate: boolean) {
		return instanceLocal.post<AddPackType>(`/cards/pack`,
			{cardsPack: {name, private: makePrivate}})
	},
	deleteCardsPack(id: string) {
		return instanceLocal.delete<cardPacksDataType>(`/cards/pack/?id=${id}`)
	},
	updateCardsPack(_id: string, name: string, makePrivate: boolean) {
		return instanceLocal.put<UpdatePackType>(`/cards/pack`, {cardsPack: {_id, name, private: makePrivate}})
	},
}
