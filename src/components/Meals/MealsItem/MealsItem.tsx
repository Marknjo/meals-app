import styles from './MealsItem.module.css';
import MealsItemForm from './MealsItemForm';

const MealsItem = () => {
  return (
    <li className={styles.meal}>
      <div>
        <h3>Meals Item</h3>
        <div className="description">Susshi</div>
        <div className="price">$13.00</div>
      </div>

      {/* Meals Item Form */}
      <div>
        <MealsItemForm />
      </div>
    </li>
  );
};

export default MealsItem;
