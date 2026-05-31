import styles from './styles.module.css';
const Loader = () => (
  <div className={styles.loaderWrapper}>
    <div className={styles.loaderRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loader;
