
interface Props {
    categories: string[] | undefined;
}

export const Categories = ({ categories }: Props) => {

    return (
        <section style={{ marginInline: 50, padding: 20 }}>
            <span>{categories && categories.join(' > ')}</span>
        </section>
    )
}
