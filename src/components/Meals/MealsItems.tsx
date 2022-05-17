import Card from '../UI/Card';
import MealsItem from './MealsItem/MealsItem';
import styles from './MealsItems.module.css';

const MealsItems = () => {
  return (
    <section className={styles.meals}>
      <Card bgStyle="white">
        <ul>
          <MealsItem />
          <MealsItem />
        </ul>
      </Card>
    </section>
  );
};

export default MealsItems;
