import { useRef } from 'react';
import Input from '../../UI/Input';
import styles from './MealsItemForm.module.css';

const MealsItemForm = () => {
  const amountInputRef = useRef(null);

  return (
    <form className={styles.form}>
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
      <p aria-errormessage="true">Please enter a valid amount (1 - 5)</p>
    </form>
  );
};

export default MealsItemForm;
