import { useContext } from 'react';
import cartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props: { onShowCart: () => void }) => {
  const { items } = useContext(cartContext);

  /// Calculate total meals items per the items in the Cart.
  const totalMeals = items.reduce((currQty, mealsData) => {
    if (mealsData.quantity) {
      currQty += mealsData.quantity;
    }
    return currQty;
  }, 0);

  return (
    <button type="button" className={styles.button} onClick={props.onShowCart}>
      {/* Button Icon */}
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>

      {/* Button Icon Count */}
      <span className={styles.badge}>{totalMeals}</span>
    </button>
  );
};

export default HeaderCartButton;
