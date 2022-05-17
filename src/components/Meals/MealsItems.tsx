import MealsItem from './MealsItem/MealsItem';
import styles from './MealsItems.module.css';

const MealsItems = () => {
  return (
    <section className={styles.meals}>
      <ul>
        <MealsItem />
      </ul>
    </section>
  );
};

export default MealsItems;
