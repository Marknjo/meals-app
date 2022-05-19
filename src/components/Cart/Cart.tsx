import { ReactNode } from 'react';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartItem from './CartItem';

interface CartProps {
  onCloseModal: () => void;
}

const Cart = (props: CartProps) => {
  return (
    <Modal onClickHandler={props.onCloseModal}>
      {/* Cart Items */}
      <ul className={styles['cart-items']}>
        <CartItem
          name="Test Item"
          price={200}
          amount={2}
          onAddHandler={() => null}
          onRemoveHandler={() => null}
        />
      </ul>

      {/* Cart Footer */}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${(12.5).toFixed(2)}</span>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles['button--alt']}
          onClick={props.onCloseModal}
        >
          Close
        </button>
        <button type="button" className={styles.button}>
          Order
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
