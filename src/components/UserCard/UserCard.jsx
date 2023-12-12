import styles from './UserCard.module.scss'

const UserCard = ({ user }) => {
  return (
    <div className={styles.card}>
      <img src={user.photo} alt={`${user.name} avatar`} className={styles.card__image} />
      <p className={styles.card__name}>{user.name}</p>
      <div className={styles.card__info}>
        <p>{user.position}</p>
        <p>{user.phone}</p>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;