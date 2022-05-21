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

/**
 * REDUCERS HELPERS
 */

/**
 * Finds the index of the incoming payload and meals data
 * @param mealsState
 * @param mealId
 * @returns
 */
const findIndexAndPayload = (
  mealsState: StateTypes,
  mealId: string
): [number, MealsData | undefined] => {
  const mealItemIndex = mealsState.cart.findIndex(meal => meal.id === mealId);
  const foundMealItem = mealsState.cart[mealItemIndex];

  return [mealItemIndex, foundMealItem];
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
    const [mealItemIndex, foundMealItem] = findIndexAndPayload(
      state,
      payload.id
    );

    /// If not item in the state, just add a new item
    if (!foundMealItem) {
      return {
        cart: [...state.cart, payload],
        totalAmount: payload.price + state.totalAmount,
      };
    }

    /// There was something in the cart -> Find it and replace it with the updates
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
  }

  /// Remove from Cart
  if (actions.type === 'REMOVE_MEAL') {
    const payload = actions.payload as string;

    /// Find the current meal item index and its ID
    const [mealItemIndex, foundMealItem] = findIndexAndPayload(state, payload);

    /// DO nothing if not meal is found with passed id
    if (!foundMealItem) return { ...state };

    /// Prep new total amount
    const updatedTotalAmount = state.totalAmount - foundMealItem.price;

    /// Handle only one item in the cart
    if (foundMealItem.quantity! === 1) {
      const newState = state.cart.filter(order => order.id !== payload);
      return {
        cart: newState,
        totalAmount: updatedTotalAmount,
      };
    }

    /// Handle case where the cart has more than 1 item (reduce cart by one)
    const updateMealItem = {
      ...foundMealItem,
      quantity: foundMealItem.quantity! - 1,
    };

    const cartCopy = [...state.cart];
    cartCopy[mealItemIndex] = updateMealItem;

    return {
      cart: cartCopy,
      totalAmount: updatedTotalAmount,
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
