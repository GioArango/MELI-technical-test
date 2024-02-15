import { SearchInput } from "@/components";
import { Outlet, useNavigate } from "react-router-dom";
import styles from './Layout.module.css';

const Layout = () => {

    const navigate = useNavigate();

    const handleSearch = (searchCriteria: string) => {
        console.log('Criterio de búsqueda', searchCriteria)

        navigate(`/items?search=${searchCriteria}`)
    }

    return (
        <main className={styles['main']}>
            <header className={styles['header-container']}>
                <SearchInput onSearch={handleSearch} />
            </header>
            <section className={styles['main-container']}>
                <div className={styles.container}>
                    <Outlet />
                </div>
            </section>
        </main>
    )
}

export default Layout