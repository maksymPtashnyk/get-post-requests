import RegistrationForm from '../RegistrationForm/RegistrationForm';
import styles from './PostBlock.module.scss'

const PostBlock = () => {
  return (
  <section className={styles.section} id="post-block">
    <h2 className={styles.section__title}>Working with POST request</h2>
    <RegistrationForm/>
  </section>
  );
}

export default PostBlock;