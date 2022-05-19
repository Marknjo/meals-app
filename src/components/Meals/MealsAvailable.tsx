import Card from '../UI/Card';
import MealsItem from './MealsItem/MealsItem';
import styles from './MealsAvailable.module.css';
import { useContext } from 'react';
import cartContext from '../../store/cart-context';

const MealsAvailable = () => {
  const ctx = useContext(cartContext);

  return (
    <section className={styles.meals}>
      <Card bgStyle="white">
        <ul>
          {ctx.items.map(meal => (
            <MealsItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default MealsAvailable;
