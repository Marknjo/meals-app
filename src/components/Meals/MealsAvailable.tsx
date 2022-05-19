import Card from '../UI/Card';
import MealsItem from './MealsItem/MealsItem';
import styles from './MealsAvailable.module.css';

const MealsAvailable = () => {
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

export default MealsAvailable;
