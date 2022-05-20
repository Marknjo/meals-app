import { ReactNode, useMemo, useReducer } from 'react';
import DUMMY_MEALS from '../data/meals-dummy-data';
import MealsData from '../data/MealsData';
import cartContext from './cart-context';

interface CartProviderProps {
  children: ReactNode;
}

interface StateTypes {
  cart: MealsData[];
  totalAmount: number;
}

interface ActionsTypes {
  payload?: MealsData | string;
  type: string;
}

const initialState = {
  cart: [],
  totalAmount: 0,
};

const cartActionsReducer = (
  state: StateTypes,
  actions: ActionsTypes
): StateTypes => {
  /// Add to Cart
  if (actions.type === 'ADD_MEAL') {
    const payload = actions.payload as MealsData;

    const updatedTotalAmount =
      payload.quantity! * payload.price + state.totalAmount;
    // find data in the cart
    const mealItemIndex = state.cart.findIndex(meal => meal.id === payload.id);
    const foundMealItem = state.cart[mealItemIndex];

    if (foundMealItem) {
      const updateMealItem = {
        ...foundMealItem,
        quantity: foundMealItem.quantity! + payload.quantity!,
      };

      const cartCopy = [...state.cart];
      cartCopy[mealItemIndex] = updateMealItem;

      return {
        cart: cartCopy,
        totalAmount: updatedTotalAmount,
      };
    } else {
      /// There is no meal with such id in the cart
      return {
        ...state,
        cart: [...state.cart, payload],
        totalAmount: payload.price + state.totalAmount,
      };
    }
  }

  /// Remove from Cart
  if (actions.type === 'REMOVE_MEAL') {
    const payload = actions.payload as string;
    //
    return {
      ...state,
    };
  }

  /// Clear Cart Items
  if (actions.type === 'CLEAR_CART') {
    return initialState;
  }

  return initialState;
};

function CartProvider(props: CartProviderProps) {
  // Get current items
  const meals = useMemo(() => DUMMY_MEALS, []);

  // Use reducer to handle cart business
  const [cartState, dispatch] = useReducer(cartActionsReducer, initialState);

  // Add items to cart
  const addMealToCartHandler = (payload: MealsData) => {
    dispatch({ type: 'ADD_MEAL', payload });
  };

  // Remove Item from the cart
  const removeMealHandler = (id: string) => {
    dispatch({ type: 'REMOVE_MEAL', payload: id });
  };

  // Remove items from the cart Hanlder
  const clearCartHandler = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // console.table(cartState.totalAmount);
  console.table(cartState.cart);

  return (
    <cartContext.Provider
      value={{
        cart: cartState.cart,
        meals,
        totalAmount: cartState.totalAmount,
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
