import { SearchInput } from "@/components";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from './Layout.module.scss';
import { Helmet } from 'react-helmet'
import logo from '../assets/logo_meli.png'
import { PATHS } from "@/constants";

const Layout = () => {

    const navigate = useNavigate();

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
            </header>
            <Outlet />
        </main>
    )
}

export default Layout