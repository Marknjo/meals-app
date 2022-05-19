import styles from './CartItem.module.css';

interface CartItemProps {
  name: string;
  price: number;
  amount: number;
  onRemoveHandler: () => void;
  onAddHandler: () => void;
}

const CartItem = (props: CartItemProps) => {
  const { price, amount, onAddHandler, onRemoveHandler, name } = props;
  const transformedPrice = `$${price.toFixed(2)}`;

  return (
    <li className={styles['cart-item']}>
      <div>
        <h2>{name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{transformedPrice}</span>
          <span className={styles.amount}>x{amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={onRemoveHandler}>
          -
        </button>
        <button type="button" onClick={onAddHandler}>
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
