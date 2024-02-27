
import { IFavorite, IFavoriteState } from '@/interfaces/Favorites';
import { createContext } from 'react'

export interface AppContextProps {
    favoriteState: IFavoriteState,
    addFavorite: (product: IFavorite) => void;
    removeFavorite: (productId: string) => void;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);