import styles from './GenericLoader.module.css';

export const GenericLoader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 120 }}>
        <span className={styles.loader}></span>
    </div>
  )
}
