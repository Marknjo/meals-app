import { ReactNode, useCallback, useContext } from 'react';
import MealsData from '../../data/MealsData';
import cartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartItem from './CartItem';

interface CartProps {
  onCloseModal: () => void;
}

const Cart = (props: CartProps) => {
  const cartCtx = useContext(cartContext);

  const addNewItemOrder = useCallback((order: MealsData) => {
    cartCtx.addMealToCart({
      id: order.id,
      name: order.name,
      description: order.description,
      price: order.price,
      quantity: 1,
    });
  }, []);

  const reduceMealCount = (id: string) => {
    cartCtx.removeMeal(id);
  };

  return (
    <Modal onClickHandler={props.onCloseModal}>
      {/* Cart Items */}
      <ul className={styles['cart-items']}>
        {cartCtx.cart.map(order => (
          <CartItem
            name={order.name}
            price={order.price}
            quantity={order.quantity!}
            onAddHandler={addNewItemOrder.bind(null, order)}
            onRemoveHandler={reduceMealCount.bind(null, order.id)}
          />
        ))}
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
