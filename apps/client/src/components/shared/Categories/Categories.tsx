import styles from './Categories.module.scss';
interface Props {
    categories: string[] | undefined;
}

export const Categories = ({ categories }: Props) => {

    return (
        <section className={styles.categories}>
            <span className={styles['categories__text-categories']}>{categories && categories.join(' > ')}</span>
        </section>
    )
}
