import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <div className={styles.icons}>
          <img src="cat.svg" alt="cat" />
          <img src="testtask.svg" alt="testtask-text" />
        </div>
        <div className={styles.buttons}>
          <a href="#get-block"><button className={styles.button}>Users</button></a>
          <a href="#post-block"><button className={styles.button}>Sign up</button></a>
        </div>
      </nav>
    </header>
  );
}

export default Header;