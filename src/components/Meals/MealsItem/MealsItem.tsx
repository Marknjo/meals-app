import { v4 as uuidv4 } from 'uuid';

import { useContext } from 'react';
import MealsData from '../../../data/MealsData';
import cartContext from '../../../store/cart-context';
import styles from './MealsItem.module.css';
import MealsItemForm from './MealsItemForm';

const MealsItem = (props: MealsData) => {
  const transfromedPrice = `$${props.price.toFixed(2)}`;
  const { addMealToCart } = useContext(cartContext);

  /// Handle adding meals to cart
  const addMealsToCartHandler = (enteredQuantity: number) => {
    addMealToCart({
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
      quantity: enteredQuantity,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className="description">{props.description}</div>
        <div className="price">{transfromedPrice}</div>
      </div>

      {/* Meals Item Form */}
      <div>
        <MealsItemForm addToCart={addMealsToCartHandler} />
      </div>
    </li>
  );
};

export default MealsItem;
