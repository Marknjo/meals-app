import { createContext } from 'react';
import MealsData from '../data/MealsData';

interface CartCtx {
  cart: MealsData[];
  meals: MealsData[];
  totalAmount: number;
  addMealToCart: (payload: MealsData) => void;
  removeMeal: (id: string) => void;
  clearCart: () => void;
}

const cartIntialState: CartCtx = {
  cart: [],
  meals: [],
  totalAmount: 0,
  addMealToCart: (_payload: MealsData) => {},
  removeMeal: (_id: string) => {},
  clearCart: () => {},
};

const cartContext = createContext(cartIntialState);

export default cartContext;
