import styles from './SiteTitle.module.scss'

const SiteTitle = () => {
  return (
    <section className={styles.section}>
      <h1 className={styles.section__title}>Test assignment for front-end developer</h1>
      <p className={styles.section__discribe}>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
      <a href="#post-block"><button className={styles.button}>Sign up</button></a>
    </section>
  );
}

export default SiteTitle;