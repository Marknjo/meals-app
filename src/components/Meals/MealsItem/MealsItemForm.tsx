import { FormEvent, RefObject, useRef, useState } from 'react';
import Input from '../../UI/Input';
import styles from './MealsItemForm.module.css';

const MealsItemForm = () => {
  const amountInputRef = useRef<HTMLInputElement>(null);

  const [formHasErrors, setFormHasErrors] = useState(false);

  const submitMealItemHandler = (event: FormEvent) => {
    try {
      event.preventDefault();

      // Handle validations
      if (!amountInputRef.current) throw new Error('Please add a valid amount');

      // Const update store
      const amount = amountInputRef.current.value;

      // increase cart values

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
