import { IFavorite, IFavoriteState } from "@/interfaces/Favorites";

type FavoriteAction =
    | { type: 'addFavorite', payload: IFavorite }
    | { type: 'removeFavorite', payload: { id: string } }

export const appReducer = (state: IFavoriteState, action: FavoriteAction): IFavoriteState => {
    switch (action.type) {
        case 'addFavorite':
            return {
                ...state,
                favsCount: state.favsProducts.length,
                favsProducts: [...state.favsProducts, action.payload]
            }

        case 'removeFavorite':
            return {
                ...state,
                favsProducts: state.favsProducts.filter(p => p.id !== action.payload.id)
            }

        default:
            return state;
    }
}