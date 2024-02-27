import { IFavorite, IFavoriteState } from "@/interfaces/Favorites";
import { useReducer } from 'react';
import { AppContext } from "./AppContext";
import { appReducer } from "./AppReducer";

const INITIAL_STATE: IFavoriteState = {
    favsCount: 0,
    favsProducts: []
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const AppProvider = ({children}: Props) => {

    const [favoriteState, dispatch] = useReducer(appReducer, INITIAL_STATE)

    const addFavorite = ( product: IFavorite ) => {
        dispatch({ type: 'addFavorite', payload: product })
    }

    const removeFavorite = ( productId: string ) => {
        dispatch({ type: 'removeFavorite', payload: {id: productId} })
    }
    
    return (
        <AppContext.Provider value={{
            favoriteState,
            addFavorite,
            removeFavorite
        }}>
            {children}
        </AppContext.Provider>
    )
}