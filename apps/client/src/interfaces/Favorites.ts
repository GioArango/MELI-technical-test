export interface IFavorite {
    id: string,
    name: string,
    price: string,
    picture: string
}

export interface IFavoriteState {
    favsCount: number,
    favsProducts: IFavorite[]
}