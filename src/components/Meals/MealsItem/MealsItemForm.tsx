import { FormEvent, RefObject, useRef, useState } from 'react';
import Input from '../../UI/Input';
import styles from './MealsItemForm.module.css';

interface MealsItemFormProps {
  addToCart: (enteredQuantity: number) => void;
}

const MealsItemForm = (props: MealsItemFormProps) => {
  const amountInputRef = useRef<HTMLInputElement>(null);

  const [formHasErrors, setFormHasErrors] = useState(false);

  const submitMealItemHandler = (event: FormEvent) => {
    try {
      event.preventDefault();

      // Handle validations
      if (!amountInputRef.current) throw new Error('Please add a valid amount');

      const enteredQuantity = parseInt(amountInputRef.current.value, 10);
      if (enteredQuantity <= 0 && enteredQuantity > 5)
        throw new Error(
          `Your meal quantity is ${enteredQuantity}. However, you can only order a meal for a max of 5 people or above one person`
        );

      // Const update store
      props.addToCart(enteredQuantity);

      // Clear input Value
      amountInputRef.current.value = '1';
    } catch (error) {
      setFormHasErrors(true);
    }
  };

  return (
    <form className={styles.form} onSubmit={submitMealItemHandler}>
      {/* <input type="number" min="1" max="5" required aria-required /> */}
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />

      <button
        type="submit"
        aria-roledescription="Increase number of meals in the cart"
      >
        + Add
      </button>
      {formHasErrors && (
        <p aria-errormessage="true">Please enter a valid amount (1 - 5)</p>
      )}
    </form>
  );
};

export default MealsItemForm;
