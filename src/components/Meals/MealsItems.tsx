import MealsItem from './MealsItem/MealsItem';
import styles from './MealsItems.module.css';

const MealsItems = () => {
  return (
    <div className={styles.meals}>
      <ul>
        <MealsItem />
      </ul>
    </div>
  );
};

export default MealsItems;
