import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = () => {
  return (
    <button type="button" className={styles.button}>
      {/* Button Icon */}
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>

      {/* Button Icon Count */}
      <span className={styles.badge}>3</span>
    </button>
  );
};

export default HeaderCartButton;
