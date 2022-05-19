import { ReactNode, useMemo } from 'react';
import DUMMY_MEALS from '../data/meals-dummy-data';
import MealsData from '../data/MealsData';
import cartContext from './cart-context';

interface CartProviderProps {
  children: ReactNode;
}

function CartProvider(props: CartProviderProps) {
  // Get current items
  const items = useMemo(() => DUMMY_MEALS, []);

  // Add items to cart
  const addMealToCartHandler = (payload: MealsData) => {};

  // Remove Item from the cart
  const removeMealHandler = (id: string) => {};

  // Remove items from the cart Hanlder
  const clearCartHandler = () => {};

  return (
    <cartContext.Provider
      value={{
        items,
        totalAmount: 0,
        addMealToCart: addMealToCartHandler,
        removeMeal: removeMealHandler,
        clearCart: clearCartHandler,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}

export default CartProvider;
