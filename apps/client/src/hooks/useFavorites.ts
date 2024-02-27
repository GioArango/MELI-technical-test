import { AppContext } from "@/context/AppContext"
import { useContext } from 'react'

export const useFavorites = () => {
    const { favoriteState, addFavorite, removeFavorite } = useContext(AppContext)

    return {
        favorites: favoriteState.favsProducts,
        favsCount: favoriteState.favsProducts.length,
        addFavorite,
        removeFavorite
    }
}