import styles from './GenericContainer.module.scss';
import { ReactElement } from 'react';

interface Props {
    children: ReactElement | ReactElement[]
}

export const GenericContainer = ({ children }: Props) => {
    return (
        <section className={styles['main-container']}>
            <div className={styles.container}>
                { children }
            </div>
        </section>
    )
}
