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

/**
 * This is a helper reducer with common data shared between ADD and REDUCE meal
 * @param state Meals state
 * @param foundMealItem Item found when there is an incoming request to increase or decrease items from the cart
 * @param updatedTotalAmount Totals after the current item is updated
 * @param mealItemIndex The index of the incoming item
 * @param newQuantity A value represeinting the amount to increase or reduce the state by. Only relevant to increase
 * @param action Sets wheather it is adding or removing item
 * @returns A new meals reducer state snapshot with updated meals state and the total amount
 */
const updateMealsState = (
  state: StateTypes,
  foundMealItem: MealsData,
  updatedTotalAmount: number,
  mealItemIndex: number,
  newQuantity?: number,
  action?: string
) => {
  let increaseTotals: number = 0; // It is never set
  let decreaseTotals = foundMealItem.quantity! - 1;

  if (newQuantity) {
    increaseTotals = foundMealItem.quantity! + newQuantity;
    decreaseTotals = foundMealItem.quantity! - newQuantity;
  }

  const updateMealItem = {
    ...foundMealItem,
    quantity: action === 'ADD_MEAL' ? increaseTotals : decreaseTotals,
  };

  const cartCopy = [...state.cart];
  cartCopy[mealItemIndex] = updateMealItem;

  return {
    cart: cartCopy,
    totalAmount: updatedTotalAmount,
  };
};

/**
 * Cart reducer for the cart provider
 * @param state contains Meals items snapshot in the cart
 * @param actions Handles action types and payload
 * @returns The snapshot of the cart depending on the (state and total amount)
 */
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
    return updateMealsState(
      state,
      foundMealItem,
      updatedTotalAmount,
      mealItemIndex,
      payload.quantity!,
      'ADD_MEAL'
    );
  }

  /// Remove from Cart
  if (actions.type === 'REMOVE_MEAL') {
    const payload = actions.payload as string;

    /// Find the current meal item index and its ID
    const [mealItemIndex, foundMealItem] = findIndexAndPayload(state, payload);

    /// Do nothing if a meal is not found - Almost useless. But a good guard if an invalid id is received
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
    return updateMealsState(
      state,
      foundMealItem,
      updatedTotalAmount,
      mealItemIndex
    );
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
