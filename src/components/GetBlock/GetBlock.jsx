import { useContext } from 'react';
import UserCard from '../UserCard/UserCard';
import styles from './GetBlock.module.scss';
import { UserContext } from '../../context/Context';
import UserAPI from '../UserApi/UserApi';

const GetBlock = () => {
  const { users, setPage, showMoreButton } = useContext(UserContext);

  const handleShowMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <section className={styles.section} id="get-block">
      <h2 className={styles.section__title}>Working with GET request</h2>
      <ul className={styles.section__cards}>
        {users.map(user => (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
      {showMoreButton && <button className={styles.button} onClick={handleShowMore}>Show more</button>}
      <UserAPI />
    </section>
  );
}

export default GetBlock;