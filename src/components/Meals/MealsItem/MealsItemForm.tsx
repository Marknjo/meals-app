import styles from './MealsItemForm.module.css';

const MealsItemForm = () => {
  return (
    <form className={styles.form}>
      <input type="number" min="1" max="5" required aria-required />

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
