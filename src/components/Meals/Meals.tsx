import MealsAvailable from './MealsAvailable';
import MealsSummary from './MealsSummary';

const Meals = () => {
  return (
    <>
      {/* Meals Summary */}
      <MealsSummary />

      {/* Meals Items */}
      <MealsAvailable />
    </>
  );
};

export default Meals;
