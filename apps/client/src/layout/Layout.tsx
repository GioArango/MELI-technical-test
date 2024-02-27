import { SearchInput } from "@/components";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from './Layout.module.scss';
import { Helmet } from 'react-helmet'
import logo from '../assets/logo_meli.png'
import { PATHS } from "@/constants";
import { useFavorites } from "@/hooks/useFavorites";

const Layout = () => {

    const navigate = useNavigate();
    const { favsCount } = useFavorites()

    const handleSearch = (searchCriteria: string) => {

        navigate(`/items?search=${searchCriteria}`)
    }

    return (
        <main className={styles.app}>
            <Helmet>
                <title>MELI | Bucar producto</title>
            </Helmet>
            <header className={styles['header-container']}>
                <Link to={PATHS.SEARCH}>
                    <img src={logo} alt="Logo Mercado Libre" />                
                </Link>
                <SearchInput onSearch={handleSearch} />
                <span style={{ marginInline: 2 }}>Favoritos: {favsCount}</span>
            </header>
            <Outlet />
        </main>
    )
}

export default Layout