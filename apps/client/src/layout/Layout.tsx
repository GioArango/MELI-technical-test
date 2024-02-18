import { SearchInput } from "@/components";
import { Outlet, useNavigate } from "react-router-dom";
import styles from './Layout.module.scss';
import { Helmet } from 'react-helmet'

const Layout = () => {

    const navigate = useNavigate();

    const handleSearch = (searchCriteria: string) => {
        console.log('Criterio de búsqueda', searchCriteria)

        navigate(`/items?search=${searchCriteria}`)
    }

    return (
        <main className={styles.app}>
            <Helmet>
                <title>MELI | Bucar producto</title>
            </Helmet>
            <header className={styles['header-container']}>
                <SearchInput onSearch={handleSearch} />
            </header>
            <Outlet />
        </main>
    )
}

export default Layout